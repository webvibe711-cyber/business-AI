import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import type { 
  Customer, 
  Lead, 
  Invoice, 
  Payment, 
  Task, 
  AgentActivity, 
  BusinessSettings, 
  ConversationMessage,
  AgentType 
} from '../types';
import { localDb } from '../lib/supabase';
import { createPayPalOrder, capturePayPalPayment } from '../lib/paypal';
import { executeOrchestratorCommand, type AgentExecutionResult } from '../lib/gemini';

interface PendingApprovalState {
  isOpen: boolean;
  action: string;
  summary: string;
  payload: any;
  agent: AgentType;
}

interface BusinessContextType {
  customers: Customer[];
  leads: LeadsList;
  invoices: Invoice[];
  payments: Payment[];
  tasks: Task[];
  activities: AgentActivity[];
  settings: BusinessSettings;
  conversation: ConversationMessage[];
  isThinking: boolean;
  activeExecutingAgent: AgentType | null;
  pendingApproval: PendingApprovalState | null;

  // Actions
  refreshData: () => void;
  runCommand: (prompt: string) => Promise<AgentExecutionResult>;
  approvePendingAction: () => Promise<void>;
  rejectPendingAction: () => void;
  createManualInvoice: (invoiceData: Partial<Invoice> & { customer_name: string; total: number }) => Invoice;
  payInvoiceWithPayPal: (invoiceId: string, customOrderId?: string) => Promise<Payment>;
  addCustomer: (customerData: Omit<Customer, 'id' | 'created_at'>) => Customer;
  addLead: (leadData: Omit<Lead, 'id' | 'created_at'>) => Lead;
  updateLeadStatus: (leadId: string, status: Lead['status']) => void;
  addTask: (taskData: Omit<Task, 'id' | 'created_at'>) => Task;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  updateSettings: (updates: Partial<BusinessSettings>) => void;
  resetDemoData: () => void;
}

type LeadsList = Lead[];

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<AgentActivity[]>([]);
  const [settings, setSettings] = useState<BusinessSettings>(localDb.getSettings());
  const [conversation, setConversation] = useState<ConversationMessage[]>([
    {
      id: 'msg_welcome',
      role: 'assistant',
      agent: 'orchestrator',
      content: "Hello! I am your **Central AI Orchestrator**. Your 6 specialized AI agents (Sales, Finance, Support, Marketing, Operations, Analyst) are online and synchronized with your business data.\n\nTry giving me a command like: `Create an invoice for John for $500.`",
      created_at: new Date().toISOString(),
    }
  ]);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [activeExecutingAgent, setActiveExecutingAgent] = useState<AgentType | null>(null);
  const [pendingApproval, setPendingApproval] = useState<PendingApprovalState | null>(null);

  const refreshData = useCallback(() => {
    setCustomers(localDb.getCustomers());
    setLeads(localDb.getLeads());
    setInvoices(localDb.getInvoices());
    setPayments(localDb.getPayments());
    setTasks(localDb.getTasks());
    setActivities(localDb.getActivity());
    setSettings(localDb.getSettings());
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Orchestrator Command Execution
  const runCommand = async (prompt: string): Promise<AgentExecutionResult> => {
    setIsThinking(true);
    setActiveExecutingAgent('orchestrator');

    // Add user message
    const userMsg: ConversationMessage = {
      id: `usr_msg_${Date.now()}`,
      role: 'user',
      content: prompt,
      created_at: new Date().toISOString(),
    };
    setConversation(prev => [...prev, userMsg]);

    try {
      // Simulate real multi-agent step delays for lifelike UX
      const result = await executeOrchestratorCommand(prompt);
      setActiveExecutingAgent(result.agent);

      const assistantMsg: ConversationMessage = {
        id: `asst_msg_${Date.now()}`,
        role: 'assistant',
        agent: result.agent,
        content: result.content,
        steps: result.steps,
        approval_request: result.approval_request,
        created_at: new Date().toISOString(),
      };

      setConversation(prev => [...prev, assistantMsg]);

      // If approval is needed, surface the approval modal/state
      if (result.requires_approval && result.approval_request) {
        setPendingApproval({
          isOpen: true,
          action: result.approval_request.action,
          summary: result.approval_request.summary,
          payload: result.approval_request.payload,
          agent: result.agent,
        });
      }

      // Record activity
      localDb.addActivity({
        business_id: 'biz_01_riham',
        agent: result.agent,
        action: `Handled user command: "${prompt.slice(0, 32)}..."`,
        details: result.content.slice(0, 100),
        status: result.requires_approval ? 'pending_approval' : 'success',
        requires_approval: result.requires_approval,
      });

      refreshData();
      return result;
    } finally {
      setIsThinking(false);
    }
  };

  // Human in the Loop: Approve Pending Action
  const approvePendingAction = async () => {
    if (!pendingApproval) return;

    if (pendingApproval.action === 'create_invoice_and_paypal_order') {
      const payload = pendingApproval.payload;
      // 1. Create the invoice
      const invoice = localDb.addInvoice({
        customer_id: payload.customer_id,
        customer_name: payload.customer_name,
        customer_email: payload.customer_email,
        total: payload.total,
        subtotal: payload.subtotal,
        notes: payload.notes,
        items: payload.items,
        status: 'awaiting_payment',
      });

      // 2. Generate PayPal Sandbox Order
      const paypalOrderId = await createPayPalOrder(invoice);

      // 3. Inform user in conversation
      const approvalConfirmMsg: ConversationMessage = {
        id: `msg_approved_${Date.now()}`,
        role: 'assistant',
        agent: 'finance',
        content: `✅ **Invoice ${invoice.invoice_number} approved and created!**\n\n- **Amount:** $${invoice.total.toFixed(2)} USD\n- **Customer:** ${invoice.customer_name}\n- **PayPal Sandbox Order:** \`${paypalOrderId}\`\n\nThe customer can now pay directly via PayPal checkout or the hosted invoice payment link.`,
        created_at: new Date().toISOString(),
      };
      setConversation(prev => [...prev, approvalConfirmMsg]);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }

    setPendingApproval(null);
    refreshData();
  };

  const rejectPendingAction = () => {
    if (!pendingApproval) return;
    const rejectMsg: ConversationMessage = {
      id: `msg_rejected_${Date.now()}`,
      role: 'assistant',
      agent: pendingApproval.agent,
      content: `❌ The proposed action *"${pendingApproval.summary}"* was rejected by the business owner. Operation aborted.`,
      created_at: new Date().toISOString(),
    };
    setConversation(prev => [...prev, rejectMsg]);
    setPendingApproval(null);
  };

  // Manual Invoice Creator
  const createManualInvoice = (invoiceData: Partial<Invoice> & { customer_name: string; total: number }): Invoice => {
    const inv = localDb.addInvoice(invoiceData);
    refreshData();
    return inv;
  };

  // Capture PayPal Payment (The key hackathon verification workflow)
  const payInvoiceWithPayPal = async (invoiceId: string, customOrderId?: string): Promise<Payment> => {
    const inv = localDb.getInvoiceById(invoiceId);
    if (!inv) throw new Error('Invoice not found');

    const orderId = customOrderId || inv.paypal_order_id || `PAYID-SANDBOX-${Date.now()}`;
    const payment = await capturePayPalPayment(orderId, invoiceId, {
      payerName: inv.customer_name,
      payerEmail: inv.customer_email,
    });

    // Celebrate payment with confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Notify conversation
    setConversation(prev => [
      ...prev,
      {
        id: `msg_pay_${Date.now()}`,
        role: 'assistant',
        agent: 'finance',
        content: `🎉 **Verified Payment Received via PayPal Sandbox!**\n\n- **Invoice:** ${inv.invoice_number}\n- **Amount:** $${inv.total.toFixed(2)} USD\n- **Payer:** ${inv.customer_name} (${inv.customer_email})\n- **Capture ID:** \`${payment.paypal_capture_id}\`\n\nDatabase record updated and real-time revenue analytics refreshed.`,
        created_at: new Date().toISOString(),
      }
    ]);

    refreshData();
    return payment;
  };

  // CRM Actions
  const addCustomer = (customerData: Omit<Customer, 'id' | 'created_at'>): Customer => {
    const c = localDb.addCustomer(customerData);
    refreshData();
    return c;
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'created_at'>): Lead => {
    const l = localDb.addLead(leadData);
    refreshData();
    return l;
  };

  const updateLeadStatus = (leadId: string, status: Lead['status']) => {
    localDb.updateLead(leadId, { status });
    refreshData();
  };

  // Operations Actions
  const addTask = (taskData: Omit<Task, 'id' | 'created_at'>): Task => {
    const t = localDb.addTask(taskData);
    refreshData();
    return t;
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    localDb.updateTask(taskId, { status });
    refreshData();
  };

  // Settings
  const updateSettings = (updates: Partial<BusinessSettings>) => {
    const s = localDb.updateSettings(updates);
    setSettings(s);
  };

  const resetDemoData = () => {
    localDb.resetToDemo();
    refreshData();
  };

  return (
    <BusinessContext.Provider
      value={{
        customers,
        leads,
        invoices,
        payments,
        tasks,
        activities,
        settings,
        conversation,
        isThinking,
        activeExecutingAgent,
        pendingApproval,
        refreshData,
        runCommand,
        approvePendingAction,
        rejectPendingAction,
        createManualInvoice,
        payInvoiceWithPayPal,
        addCustomer,
        addLead,
        updateLeadStatus,
        addTask,
        updateTaskStatus,
        updateSettings,
        resetDemoData,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) throw new Error('useBusiness must be used within a BusinessProvider');
  return context;
};

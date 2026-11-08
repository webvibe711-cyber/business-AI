export type AgentType = 
  | 'sales' 
  | 'finance' 
  | 'support' 
  | 'marketing' 
  | 'operations' 
  | 'analyst' 
  | 'orchestrator';

export interface Business {
  id: string;
  name: string;
  industry: string;
  size: string;
  description: string;
  currency: string;
  created_at: string;
  goals?: string[];
  owner_id?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  business_id?: string;
}

export interface Customer {
  id: string;
  business_id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: 'active' | 'inactive' | 'vip';
  total_spent: number;
  last_interaction?: string;
  notes?: string;
  created_at: string;
}

export interface Lead {
  id: string;
  business_id: string;
  name: string;
  email: string;
  company?: string;
  value: number;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
  score: number; // 0-100
  source: string;
  last_contact?: string;
  notes?: string;
  created_at: string;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export type InvoiceStatus = 'draft' | 'pending_approval' | 'awaiting_payment' | 'paid' | 'cancelled';

export interface Invoice {
  id: string;
  invoice_number: string;
  business_id: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  discount: number;
  total: number;
  currency: string;
  notes?: string;
  paypal_order_id?: string;
  paypal_payment_id?: string;
  paid_at?: string;
  created_at: string;
  items: InvoiceItem[];
}

export interface Payment {
  id: string;
  business_id: string;
  invoice_id: string;
  customer_id: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  payment_method: 'paypal' | 'credit_card' | 'bank_transfer';
  paypal_order_id?: string;
  paypal_capture_id?: string;
  payer_email?: string;
  payer_name?: string;
  created_at: string;
}

export interface Task {
  id: string;
  business_id: string;
  title: string;
  description?: string;
  assigned_to: AgentType | 'human';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'completed';
  due_date?: string;
  created_at: string;
}

export interface AgentActivity {
  id: string;
  business_id: string;
  agent: AgentType;
  action: string;
  details: string;
  status: 'success' | 'pending_approval' | 'running' | 'failed';
  requires_approval: boolean;
  approval_payload?: any;
  created_at: string;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  agent?: AgentType;
  content: string;
  steps?: {
    step: string;
    detail: string;
    status: 'done' | 'active' | 'pending';
    tool_name?: string;
  }[];
  approval_request?: {
    action: string;
    summary: string;
    payload: any;
    status: 'pending' | 'approved' | 'rejected';
  };
  created_at: string;
}

export interface BusinessSettings {
  business_id: string;
  paypal_client_id: string;
  paypal_currency: string;
  paypal_mode: 'sandbox' | 'live';
  gemini_api_key?: string;
  auto_dispatch: boolean;
  notify_on_payment: boolean;
}


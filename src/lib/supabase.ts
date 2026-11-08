import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { 
  Business, 
  Customer, 
  Lead, 
  Invoice, 
  Payment, 
  Task, 
  AgentActivity, 
  BusinessSettings,
  UserProfile 
} from '../types';
import { 
  INITIAL_BUSINESS, 
  INITIAL_CUSTOMERS, 
  INITIAL_LEADS, 
  INITIAL_INVOICES, 
  INITIAL_PAYMENTS, 
  INITIAL_TASKS, 
  INITIAL_ACTIVITY, 
  INITIAL_SETTINGS 
} from './mockData';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co'
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==============================================================================
// LOCAL REACTIVE DATABASE REPOSITORY (Offline-first & Resilient Mock Engine)
// Stores records in LocalStorage so mutations persist across sessions
// ==============================================================================

const STORAGE_KEYS = {
  BUSINESS: 'bp_business',
  CUSTOMERS: 'bp_customers',
  LEADS: 'bp_leads',
  INVOICES: 'bp_invoices',
  PAYMENTS: 'bp_payments',
  TASKS: 'bp_tasks',
  ACTIVITY: 'bp_activity',
  SETTINGS: 'bp_settings',
  USER: 'bp_user',
};

class LocalDataStore {
  private get<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private set<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  // User Profile
  getUser(): UserProfile {
    return this.get<UserProfile>(STORAGE_KEYS.USER, {
      id: 'usr_riham_01',
      email: 'riham@businesspilot.ai',
      full_name: 'Riham',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      business_id: 'biz_01_riham',
    });
  }

  setUser(user: UserProfile) {
    this.set(STORAGE_KEYS.USER, user);
  }

  // Business
  getBusiness(): Business {
    return this.get<Business>(STORAGE_KEYS.BUSINESS, INITIAL_BUSINESS);
  }

  updateBusiness(business: Partial<Business>): Business {
    const current = this.getBusiness();
    const updated = { ...current, ...business };
    this.set(STORAGE_KEYS.BUSINESS, updated);
    return updated;
  }

  // Customers
  getCustomers(): Customer[] {
    return this.get<Customer[]>(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
  }

  addCustomer(customer: Omit<Customer, 'id' | 'created_at'>): Customer {
    const customers = this.getCustomers();
    const newCustomer: Customer = {
      ...customer,
      id: `cust_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.set(STORAGE_KEYS.CUSTOMERS, [newCustomer, ...customers]);
    return newCustomer;
  }

  updateCustomer(id: string, updates: Partial<Customer>): Customer | null {
    const customers = this.getCustomers();
    const idx = customers.findIndex(c => c.id === id);
    if (idx === -1) return null;
    customers[idx] = { ...customers[idx], ...updates };
    this.set(STORAGE_KEYS.CUSTOMERS, customers);
    return customers[idx];
  }

  // Leads
  getLeads(): Lead[] {
    return this.get<Lead[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS);
  }

  addLead(lead: Omit<Lead, 'id' | 'created_at'>): Lead {
    const leads = this.getLeads();
    const newLead: Lead = {
      ...lead,
      id: `lead_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.set(STORAGE_KEYS.LEADS, [newLead, ...leads]);
    return newLead;
  }

  updateLead(id: string, updates: Partial<Lead>): Lead | null {
    const leads = this.getLeads();
    const idx = leads.findIndex(l => l.id === id);
    if (idx === -1) return null;
    leads[idx] = { ...leads[idx], ...updates };
    this.set(STORAGE_KEYS.LEADS, leads);
    return leads[idx];
  }

  // Invoices
  getInvoices(): Invoice[] {
    return this.get<Invoice[]>(STORAGE_KEYS.INVOICES, INITIAL_INVOICES);
  }

  getInvoiceById(id: string): Invoice | undefined {
    return this.getInvoices().find(inv => inv.id === id);
  }

  addInvoice(invoiceData: Partial<Invoice> & { customer_name: string; total: number }): Invoice {
    const invoices = this.getInvoices();
    const nextNum = invoices.length + 1;
    const invoiceNumber = `INV-2026-${String(nextNum).padStart(3, '0')}`;
    
    const newInvoice: Invoice = {
      id: `inv_${Date.now()}`,
      invoice_number: invoiceData.invoice_number || invoiceNumber,
      business_id: 'biz_01_riham',
      customer_id: invoiceData.customer_id || 'cust_01_john',
      customer_name: invoiceData.customer_name,
      customer_email: invoiceData.customer_email || 'customer@example.com',
      status: invoiceData.status || 'draft',
      issue_date: invoiceData.issue_date || new Date().toISOString().split('T')[0],
      due_date: invoiceData.due_date || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      subtotal: invoiceData.subtotal || invoiceData.total,
      tax_rate: invoiceData.tax_rate || 0,
      tax_amount: invoiceData.tax_amount || 0,
      discount: invoiceData.discount || 0,
      total: invoiceData.total,
      currency: invoiceData.currency || 'USD',
      notes: invoiceData.notes || 'Created via BusinessPilot AI Orchestrator',
      items: invoiceData.items || [
        {
          id: `item_${Date.now()}`,
          invoice_id: `inv_${Date.now()}`,
          description: invoiceData.notes || 'Professional Business Consultation Services',
          quantity: 1,
          unit_price: invoiceData.total,
          total: invoiceData.total,
        }
      ],
      created_at: new Date().toISOString(),
    };

    this.set(STORAGE_KEYS.INVOICES, [newInvoice, ...invoices]);
    return newInvoice;
  }

  updateInvoice(id: string, updates: Partial<Invoice>): Invoice | null {
    const invoices = this.getInvoices();
    const idx = invoices.findIndex(i => i.id === id);
    if (idx === -1) return null;
    invoices[idx] = { ...invoices[idx], ...updates };
    this.set(STORAGE_KEYS.INVOICES, invoices);
    return invoices[idx];
  }

  // Payments
  getPayments(): Payment[] {
    return this.get<Payment[]>(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS);
  }

  addPayment(payment: Omit<Payment, 'id' | 'created_at'>): Payment {
    const payments = this.getPayments();
    const newPayment: Payment = {
      ...payment,
      id: `pay_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.set(STORAGE_KEYS.PAYMENTS, [newPayment, ...payments]);

    // Also update customer total spent
    if (payment.customer_id) {
      const customers = this.getCustomers();
      const cIdx = customers.findIndex(c => c.id === payment.customer_id);
      if (cIdx !== -1) {
        customers[cIdx].total_spent += payment.amount;
        customers[cIdx].last_interaction = new Date().toISOString();
        this.set(STORAGE_KEYS.CUSTOMERS, customers);
      }
    }

    return newPayment;
  }

  // Tasks
  getTasks(): Task[] {
    return this.get<Task[]>(STORAGE_KEYS.TASKS, INITIAL_TASKS);
  }

  addTask(task: Omit<Task, 'id' | 'created_at'>): Task {
    const tasks = this.getTasks();
    const newTask: Task = {
      ...task,
      id: `task_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.set(STORAGE_KEYS.TASKS, [newTask, ...tasks]);
    return newTask;
  }

  updateTask(id: string, updates: Partial<Task>): Task | null {
    const tasks = this.getTasks();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;
    tasks[idx] = { ...tasks[idx], ...updates };
    this.set(STORAGE_KEYS.TASKS, tasks);
    return tasks[idx];
  }

  // Agent Activity Logs
  getActivity(): AgentActivity[] {
    return this.get<AgentActivity[]>(STORAGE_KEYS.ACTIVITY, INITIAL_ACTIVITY);
  }

  addActivity(activity: Omit<AgentActivity, 'id' | 'created_at'>): AgentActivity {
    const activities = this.getActivity();
    const newActivity: AgentActivity = {
      ...activity,
      id: `act_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.set(STORAGE_KEYS.ACTIVITY, [newActivity, ...activities]);
    return newActivity;
  }

  // Settings
  getSettings(): BusinessSettings {
    return this.get<BusinessSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }

  updateSettings(settings: Partial<BusinessSettings>): BusinessSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    this.set(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  }

  // Reset to initial demo state
  resetToDemo(): void {
    localStorage.removeItem(STORAGE_KEYS.BUSINESS);
    localStorage.removeItem(STORAGE_KEYS.CUSTOMERS);
    localStorage.removeItem(STORAGE_KEYS.LEADS);
    localStorage.removeItem(STORAGE_KEYS.INVOICES);
    localStorage.removeItem(STORAGE_KEYS.PAYMENTS);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITY);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
}

export const localDb = new LocalDataStore();

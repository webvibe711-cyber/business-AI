import React, { useState } from 'react';
import { 
  Wallet, 
  Sparkles, 
  Receipt, 
  CreditCard, 
  Send, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Plus,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';
import { createPayPalOrder } from '../../lib/paypal';

export const FinanceAgentWorkspace: React.FC = () => {
  const { 
    invoices, 
    payments, 
    createManualInvoice, 
    payInvoiceWithPayPal,
    runCommand 
  } = useBusiness();

  const [customerName, setCustomerName] = useState('John Doe');
  const [customerEmail, setCustomerEmail] = useState('john.doe@example.com');
  const [amount, setAmount] = useState('500');
  const [description, setDescription] = useState('AI Strategic Architecture & Integration');
  const [isCreating, setIsCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
  const pendingInvoices = invoices.filter(i => i.status !== 'paid' && i.status !== 'cancelled');

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) return;

    setIsCreating(true);
    const newInv = createManualInvoice({
      customer_name: customerName,
      customer_email: customerEmail,
      total: val,
      subtotal: val,
      notes: description,
      status: 'awaiting_payment',
    });

    // Generate real sandbox order id
    const orderId = await createPayPalOrder(newInv);
    setIsCreating(false);
    setSuccessMessage(`Invoice ${newInv.invoice_number} created with PayPal Sandbox Order: ${orderId}`);
    setTimeout(() => setSuccessMessage(''), 6000);
  };

  return (
    <div className="space-y-6">
      
      {/* Finance Agent Header Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-[#F7F8FF] to-white rounded-3xl p-6 border border-emerald-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-extrabold text-[#15172B]">AI Finance Agent</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                Online • PayPal Sandbox Gateway
              </span>
            </div>
            <p className="text-xs text-[#687089]">
              Automates invoice generation, PayPal order initialization, payment reminder sequences, and transaction reconciliation.
            </p>
          </div>
        </div>

        <button
          onClick={() => runCommand('Create an invoice for customer John for $500.')}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Orchestrator Quick Flow ($500)</span>
        </button>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-5 border border-[#E9EAF2] shadow-sm">
          <span className="text-xs font-bold text-[#687089] uppercase">Verified Collected Volume</span>
          <div className="mt-2 text-2xl font-extrabold text-[#15172B]">
            ${totalCollected.toLocaleString()} USD
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            ✓ 100% Captured via PayPal REST API
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E9EAF2] shadow-sm">
          <span className="text-xs font-bold text-[#687089] uppercase">Pending Receivables</span>
          <div className="mt-2 text-2xl font-extrabold text-[#15172B]">
            ${pendingInvoices.reduce((s, i) => s + i.total, 0).toLocaleString()} USD
          </div>
          <span className="text-[11px] text-amber-600 font-semibold mt-1 block">
            {pendingInvoices.length} invoices awaiting payment
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E9EAF2] shadow-sm">
          <span className="text-xs font-bold text-[#687089] uppercase">PayPal Developer Mode</span>
          <div className="mt-2 text-2xl font-extrabold text-emerald-600">
            Sandbox Active
          </div>
          <span className="text-[11px] text-[#687089] mt-1 block">
            Orders v2 & Payments v2 enabled
          </span>
        </div>
      </div>

      {/* Main Split: Create Invoice Form + Active Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Direct Invoice & Order Generator */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E9EAF2] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E9EAF2]">
            <h4 className="text-sm font-bold text-[#15172B]">Generate New Invoice</h4>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              PayPal Order Auto-Init
            </span>
          </div>

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-medium">
              ✓ {successMessage}
            </div>
          )}

          <form onSubmit={handleCreateInvoice} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-[#15172B] block mb-1">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2] text-xs font-medium focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="font-bold text-[#15172B] block mb-1">Customer Email</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2] text-xs font-medium focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="font-bold text-[#15172B] block mb-1">Total Amount ($ USD)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2] text-xs font-medium focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="font-bold text-[#15172B] block mb-1">Description / Services</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2] text-xs font-medium focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={isCreating}
              className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-600/25 hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Issue Invoice & Generate PayPal Order</span>
            </button>
          </form>
        </div>

        {/* Right Column: Invoices & Payment Capture Simulation */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#E9EAF2] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E9EAF2]">
            <h4 className="text-sm font-bold text-[#15172B]">Invoices Ledger</h4>
            <span className="text-xs text-[#687089]">{invoices.length} total</span>
          </div>

          <div className="space-y-3 max-h-[460px] overflow-y-auto">
            {invoices.map(inv => (
              <div 
                key={inv.id}
                className="p-4 rounded-2xl bg-[#F7F8FF] border border-[#E9EAF2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-[#15172B]">{inv.invoice_number}</span>
                    <span className="text-[#687089]">({inv.customer_name})</span>
                  </div>
                  <div className="text-[11px] text-[#687089]">
                    Total: <strong className="text-[#15172B]">${inv.total.toFixed(2)} USD</strong> • Due: {inv.due_date}
                  </div>
                  {inv.paypal_order_id && (
                    <div className="text-[10px] font-mono text-[#059669]">
                      PayPal Order: {inv.paypal_order_id}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {inv.status === 'paid' ? (
                    <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Paid & Verified</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => payInvoiceWithPayPal(inv.id)}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white font-bold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center space-x-1"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Capture Payment (Sandbox)</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};


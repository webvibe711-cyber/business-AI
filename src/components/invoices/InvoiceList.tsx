import React, { useState } from 'react';
import { 
  Receipt, 
  Plus, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles,
  FileText,
  Printer
} from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';
import { createPayPalOrder } from '../../lib/paypal';
import type { Invoice } from '../../types';

export const InvoiceList: React.FC = () => {
  const { invoices, createManualInvoice, payInvoiceWithPayPal } = useBusiness();
  const [filter, setFilter] = useState<'all' | 'paid' | 'awaiting_payment'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states
  const [customerName, setCustomerName] = useState('John Doe');
  const [customerEmail, setCustomerEmail] = useState('john.doe@example.com');
  const [amount, setAmount] = useState('500');
  const [description, setDescription] = useState('AI Integration & Consultation Services');

  const filtered = invoices.filter(inv => {
    if (filter === 'paid') return inv.status === 'paid';
    if (filter === 'awaiting_payment') return inv.status === 'awaiting_payment' || inv.status === 'pending_approval';
    return true;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount) || 500;
    const inv = createManualInvoice({
      customer_name: customerName,
      customer_email: customerEmail,
      total: val,
      subtotal: val,
      notes: description,
      status: 'awaiting_payment',
    });
    await createPayPalOrder(inv);
    setShowCreateModal(false);
  };

  const handleCopyLink = (invId: string) => {
    const url = `${window.location.origin}/pay/${invId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(invId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E9EAF2] gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#15172B] tracking-tight">
            Invoices & Billing
          </h2>
          <p className="text-xs text-[#687089]">
            Full invoice lifecycle management integrated with PayPal Sandbox REST API
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white text-xs font-bold shadow-md shadow-[#633BFF]/25 hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Invoice</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 bg-[#F7F8FF] p-1.5 rounded-full border border-[#E9EAF2]">
          {(['all', 'awaiting_payment', 'paid'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                filter === tab
                  ? 'bg-white text-[#15172B] shadow-sm'
                  : 'text-[#687089] hover:text-[#15172B]'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        <span className="text-xs text-[#687089]">
          Showing <strong className="text-[#15172B]">{filtered.length}</strong> invoices
        </span>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-3xl border border-[#E9EAF2] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FF] border-b border-[#E9EAF2] text-[#687089] uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Invoice #</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Total ($ USD)</th>
                <th className="px-6 py-4">PayPal Order</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9EAF2]">
              {filtered.map(inv => (
                <tr key={inv.id} className="hover:bg-[#F7F8FF]/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#15172B]">
                    {inv.invoice_number}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-[#15172B] block">{inv.customer_name}</span>
                    <span className="text-[#687089] text-[11px]">{inv.customer_email}</span>
                  </td>
                  <td className="px-6 py-4 text-[#687089]">
                    {inv.due_date}
                  </td>
                  <td className="px-6 py-4 font-extrabold text-[#15172B] text-sm">
                    ${inv.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    {inv.paypal_order_id ? (
                      <span className="font-mono text-[10px] text-[#059669] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {inv.paypal_order_id}
                      </span>
                    ) : (
                      <span className="text-[#687089]">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      inv.status === 'paid' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inv.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {/* Copy hosted customer payment URL */}
                    <button
                      onClick={() => handleCopyLink(inv.id)}
                      className="px-2.5 py-1 rounded-lg bg-[#F7F8FF] hover:bg-[#E9E2FF] text-[#687089] hover:text-[#633BFF] font-medium transition-colors"
                      title="Copy customer checkout link"
                    >
                      {copiedId === inv.id ? <Check className="w-3.5 h-3.5 text-emerald-600 inline" /> : <Copy className="w-3.5 h-3.5 inline" />}
                    </button>

                    {/* View Invoice Modal */}
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-2.5 py-1 rounded-lg bg-[#F7F8FF] hover:bg-slate-200 text-[#15172B] font-medium transition-colors"
                      title="View printable invoice"
                    >
                      <FileText className="w-3.5 h-3.5 inline" />
                    </button>

                    {/* Direct PayPal Sandbox Capture */}
                    {inv.status !== 'paid' && (
                      <button
                        onClick={() => payInvoiceWithPayPal(inv.id)}
                        className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-[11px] shadow-xs hover:opacity-90 transition-opacity"
                      >
                        Simulate PayPal
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Printable View Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#E9EAF2] shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E9EAF2]">
              <div>
                <span className="text-[10px] font-bold text-[#633BFF] uppercase tracking-wider">Official Invoice</span>
                <h3 className="text-xl font-extrabold text-[#15172B]">{selectedInvoice.invoice_number}</h3>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#687089]"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#687089] block">Billed To:</span>
                <strong className="text-[#15172B] text-sm block mt-0.5">{selectedInvoice.customer_name}</strong>
                <span className="text-[#687089]">{selectedInvoice.customer_email}</span>
              </div>
              <div className="text-right">
                <span className="text-[#687089] block">Issue Date: {selectedInvoice.issue_date}</span>
                <span className="text-[#687089] block">Due Date: {selectedInvoice.due_date}</span>
                <span className="font-mono text-[10px] text-emerald-600 block mt-1">PayPal Order: {selectedInvoice.paypal_order_id || 'Pending'}</span>
              </div>
            </div>

            {/* Line Items */}
            <div className="border border-[#E9EAF2] rounded-2xl overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-[#F7F8FF] border-b border-[#E9EAF2] text-[#687089] font-bold">
                  <tr>
                    <th className="px-4 py-2.5 text-left">Description</th>
                    <th className="px-4 py-2.5 text-center">Qty</th>
                    <th className="px-4 py-2.5 text-right">Price</th>
                    <th className="px-4 py-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9EAF2]">
                  {selectedInvoice.items?.map(it => (
                    <tr key={it.id}>
                      <td className="px-4 py-2.5 font-medium text-[#15172B]">{it.description}</td>
                      <td className="px-4 py-2.5 text-center text-[#687089]">{it.quantity}</td>
                      <td className="px-4 py-2.5 text-right text-[#687089]">${it.unit_price.toFixed(2)}</td>
                      <td className="px-4 py-2.5 text-right font-bold text-[#15172B]">${it.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div className="flex justify-end pt-2">
              <div className="w-48 space-y-1 text-xs text-right">
                <div className="flex justify-between text-[#687089]">
                  <span>Subtotal:</span>
                  <span>${selectedInvoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-extrabold text-base text-[#15172B] pt-2 border-t border-[#E9EAF2]">
                  <span>Total:</span>
                  <span>${selectedInvoice.total.toFixed(2)} USD</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E9EAF2]">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-full border border-[#E9EAF2] text-xs font-semibold text-[#15172B] flex items-center space-x-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>

              {selectedInvoice.status !== 'paid' && (
                <button
                  onClick={() => {
                    payInvoiceWithPayPal(selectedInvoice.id);
                    setSelectedInvoice(null);
                  }}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-600/25"
                >
                  Simulate PayPal Sandbox Payment
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E9EAF2] shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-[#15172B]">Create Invoice</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#15172B] block mb-1">Customer Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#15172B] block mb-1">Customer Email</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#15172B] block mb-1">Amount ($ USD)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#15172B] block mb-1">Line Item Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-full border border-[#E9EAF2] text-[#687089] hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white font-bold shadow-sm"
                >
                  Create & Init PayPal Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};


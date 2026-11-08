import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Receipt, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft,
  Building,
  Lock,
  Sparkles
} from 'lucide-react';
import { localDb } from '../lib/supabase';
import { capturePayPalPayment } from '../lib/paypal';
import type { Invoice } from '../types';

export const PublicInvoicePayPage: React.FC = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [captureId, setCaptureId] = useState<string | null>(null);

  useEffect(() => {
    if (invoiceId) {
      const inv = localDb.getInvoiceById(invoiceId);
      if (inv) {
        setInvoice(inv);
        setIsPaid(inv.status === 'paid');
        if (inv.paypal_payment_id) setCaptureId(inv.paypal_payment_id);
      }
    }
  }, [invoiceId]);

  const handlePay = async () => {
    if (!invoice) return;
    setIsProcessing(true);

    try {
      // Simulate PayPal popup approval & capture
      const orderId = invoice.paypal_order_id || `PAYID-SANDBOX-${Date.now()}`;
      const payment = await capturePayPalPayment(orderId, invoice.id, {
        payerName: invoice.customer_name,
        payerEmail: invoice.customer_email,
      });

      setIsPaid(true);
      setCaptureId(payment.paypal_capture_id || 'CAP-VERIFIED');
      
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!invoice) {
    return (
      <div className="min-h-screen bg-[#F7F8FF] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-[#E9EAF2] text-center space-y-4">
          <Receipt className="w-12 h-12 text-[#687089] mx-auto" />
          <h2 className="text-lg font-bold text-[#15172B]">Invoice Not Found</h2>
          <p className="text-xs text-[#687089]">The requested invoice link does not exist or has expired.</p>
          <Link to="/" className="inline-block px-5 py-2 rounded-full bg-[#633BFF] text-white text-xs font-bold">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F7F8FF] to-white py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Brand Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E9EAF2]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#633BFF] via-[#4285FF] to-[#62D9ED] p-0.5 shadow-md shadow-[#633BFF]/20">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <span className="font-extrabold text-xl bg-gradient-to-br from-[#633BFF] to-[#4285FF] bg-clip-text text-transparent">
                  B
                </span>
              </div>
            </div>
            <div>
              <span className="font-extrabold text-base text-[#15172B]">BusinessPilot AI</span>
              <span className="text-[10px] text-[#687089] block -mt-0.5">Secure Customer Payment Gateway</span>
            </div>
          </div>

          <Link
            to="/"
            className="text-xs font-semibold text-[#687089] hover:text-[#633BFF] flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portal</span>
          </Link>
        </div>

        {/* Invoice Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9EAF2] shadow-xl space-y-8">
          
          {/* Status Header */}
          <div className="flex items-start justify-between pb-6 border-b border-[#E9EAF2]">
            <div>
              <span className="text-[10px] font-bold text-[#633BFF] uppercase tracking-wider">
                Invoice Details
              </span>
              <h2 className="text-2xl font-black text-[#15172B] mt-0.5">
                {invoice.invoice_number}
              </h2>
              <span className="text-xs text-[#687089]">
                Issued on {invoice.issue_date} • Due by {invoice.due_date}
              </span>
            </div>

            {isPaid ? (
              <div className="px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold flex items-center space-x-1.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>PAID & VERIFIED</span>
              </div>
            ) : (
              <div className="px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-extrabold uppercase">
                Awaiting Payment
              </div>
            )}
          </div>

          {/* Customer & Merchant Meta */}
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div>
              <span className="text-[#687089] font-medium block">Customer Information:</span>
              <strong className="text-sm font-bold text-[#15172B] block mt-1">{invoice.customer_name}</strong>
              <span className="text-[#687089] block">{invoice.customer_email}</span>
            </div>
            <div className="text-right">
              <span className="text-[#687089] font-medium block">Payment Terms:</span>
              <span className="font-semibold text-[#15172B] block mt-1">PayPal Sandbox Developer REST</span>
              {invoice.paypal_order_id && (
                <span className="font-mono text-[10px] text-[#059669] block mt-0.5">
                  Order: {invoice.paypal_order_id}
                </span>
              )}
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-[#E9EAF2] rounded-2xl overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-[#F7F8FF] border-b border-[#E9EAF2] text-[#687089] font-bold">
                <tr>
                  <th className="px-4 py-3 text-left">Item Description</th>
                  <th className="px-4 py-3 text-center">Qty</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9EAF2]">
                {invoice.items?.map(it => (
                  <tr key={it.id}>
                    <td className="px-4 py-3 font-medium text-[#15172B]">{it.description}</td>
                    <td className="px-4 py-3 text-center text-[#687089]">{it.quantity}</td>
                    <td className="px-4 py-3 text-right text-[#687089]">${it.unit_price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right font-bold text-[#15172B]">${it.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Breakdown */}
          <div className="flex justify-end pt-2">
            <div className="w-56 space-y-2 text-xs">
              <div className="flex justify-between text-[#687089]">
                <span>Subtotal:</span>
                <span>${invoice.subtotal.toFixed(2)} {invoice.currency}</span>
              </div>
              <div className="flex justify-between font-black text-lg text-[#15172B] pt-2 border-t border-[#E9EAF2]">
                <span>Total Due:</span>
                <span>${invoice.total.toFixed(2)} {invoice.currency}</span>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="pt-6 border-t border-[#E9EAF2] space-y-4">
            {isPaid ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-3xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-base text-emerald-900">
                  Payment Successfully Completed!
                </h4>
                <p className="text-xs text-emerald-700">
                  Thank you! Your payment of <strong>${invoice.total.toFixed(2)} USD</strong> has been captured and verified via PayPal Developer Sandbox.
                </p>
                {captureId && (
                  <span className="inline-block font-mono text-[11px] bg-white px-3 py-1 rounded-full text-emerald-800 border border-emerald-200 mt-2">
                    Capture ID: {captureId}
                  </span>
                )}
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <div className="p-4 bg-[#F7F8FF] rounded-2xl border border-[#E9EAF2] text-xs text-[#687089] flex items-center justify-center space-x-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <span>256-bit TLS Encrypted PayPal Sandbox Checkout</span>
                </div>

                {/* PayPal Checkout Button (Matching official PayPal visual styling) */}
                <button
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full py-4 rounded-full bg-[#FFC439] hover:bg-[#F2BA36] text-[#003087] font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  <span className="font-serif italic font-black text-base">Pay</span>
                  <span className="font-sans font-black text-base text-[#0079C1]">Pal</span>
                  <span className="text-xs font-semibold text-[#003087]/80 ml-2">
                    {isProcessing ? 'Processing Payment...' : `Sandbox Checkout ($${invoice.total.toFixed(2)})`}
                  </span>
                </button>

                <p className="text-[11px] text-[#687089]">
                  Upon clicking, the transaction will be authorized and verified by BusinessPilot AI's Finance Agent.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};


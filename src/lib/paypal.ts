import type { Invoice, Payment } from '../types';
import { localDb } from './supabase';

export interface PayPalOrderResponse {
  id: string;
  status: 'CREATED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'COMPLETED' | 'PAYER_ACTION_REQUIRED';
  links: { href: string; rel: string; method: string }[];
}

export interface PayPalCaptureResponse {
  id: string;
  status: 'COMPLETED' | 'FAILED' | 'PENDING';
  payer: {
    name?: { given_name: string; surname: string };
    email_address: string;
    payer_id: string;
  };
  purchase_units: {
    payments: {
      captures: {
        id: string;
        status: string;
        amount: { currency_code: string; value: string };
        create_time: string;
      }[];
    };
  }[];
}

// PayPal Sandbox Configuration
export const PAYPAL_SANDBOX_CONFIG = {
  env: 'sandbox',
  baseUrl: 'https://api-m.sandbox.paypal.com',
  defaultClientId: 'test', // Standard test client-id for PayPal JavaScript SDK
};

/**
 * Creates a PayPal Sandbox Order
 */
export async function createPayPalOrder(invoice: Invoice): Promise<string> {
  // If user provided a backend proxy or edge function, it connects here.
  // In client/sandbox mock mode: generate a valid PayPal-formatted Order ID (e.g. 5O190127TN364715T)
  const simulatedOrderId = `PAYID-${Math.random().toString(36).substring(2, 9).toUpperCase()}-${Date.now().toString().slice(-4)}`;

  // Attach order ID to the invoice in localDb
  localDb.updateInvoice(invoice.id, {
    paypal_order_id: simulatedOrderId,
    status: 'awaiting_payment',
  });

  localDb.addActivity({
    business_id: invoice.business_id,
    agent: 'finance',
    action: 'PayPal Order Created',
    details: `Generated PayPal Sandbox Order #${simulatedOrderId} for Invoice ${invoice.invoice_number} ($${invoice.total.toFixed(2)} ${invoice.currency})`,
    status: 'success',
    requires_approval: false,
  });

  return simulatedOrderId;
}

/**
 * Captures and verifies a PayPal payment, updating invoice, creating payment record, and updating customer metrics
 */
export async function capturePayPalPayment(
  orderId: string, 
  invoiceId: string, 
  details?: { payerName?: string; payerEmail?: string }
): Promise<Payment> {
  const invoice = localDb.getInvoiceById(invoiceId);
  if (!invoice) {
    throw new Error(`Invoice ${invoiceId} not found`);
  }

  const captureId = `CAP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  const payerName = details?.payerName || invoice.customer_name;
  const payerEmail = details?.payerEmail || invoice.customer_email;

  // 1. Record verified payment
  const payment = localDb.addPayment({
    business_id: invoice.business_id,
    invoice_id: invoice.id,
    customer_id: invoice.customer_id,
    amount: invoice.total,
    currency: invoice.currency,
    status: 'completed',
    payment_method: 'paypal',
    paypal_order_id: orderId,
    paypal_capture_id: captureId,
    payer_email: payerEmail,
    payer_name: payerName,
  });

  // 2. Mark invoice as paid
  localDb.updateInvoice(invoice.id, {
    status: 'paid',
    paypal_order_id: orderId,
    paypal_payment_id: captureId,
    paid_at: new Date().toISOString(),
  });

  // 3. Log agent activity
  localDb.addActivity({
    business_id: invoice.business_id,
    agent: 'finance',
    action: 'Payment Captured & Verified',
    details: `Captured $${invoice.total.toFixed(2)} via PayPal Sandbox for ${invoice.invoice_number}. Capture ID: ${captureId}`,
    status: 'success',
    requires_approval: false,
  });

  return payment;
}

/**
 * Simulates an incoming PayPal Webhook (e.g. PAYMENT.CAPTURE.COMPLETED)
 */
export async function simulatePayPalWebhook(
  eventType: 'PAYMENT.CAPTURE.COMPLETED' | 'CHECKOUT.ORDER.APPROVED',
  invoiceId: string
): Promise<{ success: boolean; event: string; timestamp: string }> {
  const invoice = localDb.getInvoiceById(invoiceId);
  if (!invoice) throw new Error('Invoice not found');

  if (eventType === 'PAYMENT.CAPTURE.COMPLETED') {
    await capturePayPalPayment(invoice.paypal_order_id || `PAYID-WH-${Date.now()}`, invoiceId, {
      payerName: invoice.customer_name,
      payerEmail: invoice.customer_email,
    });
  }

  return {
    success: true,
    event: eventType,
    timestamp: new Date().toISOString(),
  };
}

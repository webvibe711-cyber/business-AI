import React, { useState } from 'react';
import { 
  Headphones, 
  Sparkles, 
  Search, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';

interface SupportTicket {
  id: string;
  customerName: string;
  email: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  query: string;
  agentDraft?: string;
}

export const SupportAgentWorkspace: React.FC = () => {
  const { customers } = useBusiness();
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TICK-101',
      customerName: 'Sarah Jenkins',
      email: 'sarah.j@vertexlabs.io',
      subject: 'Inquiry on PayPal Sandbox Webhook verification endpoint',
      status: 'in_progress',
      priority: 'high',
      query: 'Hello! We are configuring our PayPal webhook listener for PAYMENT.CAPTURE.COMPLETED. How does BusinessPilot verify the CRC32 and webhook auth headers in production?',
      agentDraft: 'Hi Sarah, BusinessPilot AI verifies incoming PayPal webhooks by passing the transmission headers (PAYPAL-AUTH-ALGO, PAYPAL-CERT-URL, PAYPAL-TRANSMISSION-ID, PAYPAL-TRANSMISSION-SIG, and PAYPAL-TRANSMISSION-TIME) to the PayPal /v1/notifications/verify-webhook-signature REST endpoint before updating the internal database ledger. This prevents replay attacks.',
    },
    {
      id: 'TICK-102',
      customerName: 'Michael Chang',
      email: 'm.chang@novacraft.co',
      subject: 'Retainer invoice line-item customization',
      status: 'open',
      priority: 'medium',
      query: 'Can we add custom tax IDs to our monthly retainer invoice PDF?',
      agentDraft: 'Hi Michael, yes! You can specify your Tax ID under Settings > Business Profile, and the AI Finance Agent will automatically append it to all generated invoices and PayPal checkout notes.',
    },
    {
      id: 'TICK-103',
      customerName: 'Elena Rostova',
      email: 'elena@auroratech.org',
      subject: 'Adding 3 additional team seats to our workspace',
      status: 'resolved',
      priority: 'low',
      query: 'Where do we grant permissions to our ops team to review draft invoices?',
      agentDraft: 'Hi Elena, your additional team members can be added under Settings > Workspace Seats with role-based access to the Human Approval gate.',
    },
  ]);

  const [selectedTicketId, setSelectedTicketId] = useState<string>('TICK-101');
  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  const handleResolveTicket = () => {
    if (!selectedTicket) return;
    setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, status: 'resolved' } : t));
  };

  return (
    <div className="space-y-6">
      
      {/* Support Agent Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-[#F7F8FF] to-white rounded-3xl p-6 border border-blue-200/60 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-extrabold text-[#15172B]">AI Support Agent</h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                Online • 24/7 Knowledge Base Search
              </span>
            </div>
            <p className="text-xs text-[#687089]">
              Instant customer query resolution, knowledge base search, draft responses, and human escalation.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Ticket Queue */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E9EAF2] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E9EAF2]">
            <h4 className="text-sm font-bold text-[#15172B]">Support Ticket Queue</h4>
            <span className="text-xs text-[#687089]">{tickets.length} tickets</span>
          </div>

          <div className="space-y-2.5">
            {tickets.map(ticket => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicketId(ticket.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  ticket.id === selectedTicketId
                    ? 'border-blue-400 bg-blue-50/50 shadow-sm'
                    : 'border-[#E9EAF2] hover:border-blue-200 bg-[#F7F8FF]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#15172B]">{ticket.subject}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    ticket.status === 'resolved' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : ticket.status === 'in_progress' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-amber-100 text-amber-700'
                  }`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-[11px] text-[#687089] mt-1">
                  From: <strong className="text-[#15172B]">{ticket.customerName}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Ticket Detail & AI Resolution */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#E9EAF2] shadow-sm space-y-5">
          {selectedTicket ? (
            <>
              <div className="flex items-center justify-between pb-4 border-b border-[#E9EAF2]">
                <div>
                  <h4 className="text-base font-extrabold text-[#15172B]">{selectedTicket.subject}</h4>
                  <p className="text-xs text-[#687089]">
                    Client: {selectedTicket.customerName} ({selectedTicket.email})
                  </p>
                </div>

                {selectedTicket.status !== 'resolved' && (
                  <button
                    onClick={handleResolveTicket}
                    className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Resolved</span>
                  </button>
                )}
              </div>

              {/* Inquiry */}
              <div className="p-4 rounded-2xl bg-[#F7F8FF] border border-[#E9EAF2] space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#687089]">Customer Message:</span>
                <p className="text-xs text-[#15172B] leading-relaxed">{selectedTicket.query}</p>
              </div>

              {/* AI Draft */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#15172B] flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>AI Knowledge Search & Synthesized Reply</span>
                  </span>
                  <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md font-bold">
                    Confidence: 98%
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-200/80 text-xs text-[#15172B] leading-relaxed">
                  {selectedTicket.agentDraft}
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-xs text-[#687089]">
              Select a ticket.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};


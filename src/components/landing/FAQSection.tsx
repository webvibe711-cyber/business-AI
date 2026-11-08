import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does BusinessPilot AI integrate with PayPal Sandbox?',
      a: 'BusinessPilot AI integrates with the official PayPal Developer REST API. When your Finance Agent drafts an approved invoice, it automatically creates a PayPal Sandbox Order (v2/checkout/orders). Your customer can pay using native PayPal Sandbox buttons or via a hosted checkout link. Upon payment, the server captures the order, validates the transaction ID, marks the invoice as Paid in Supabase, and updates your revenue analytics in real-time.',
    },
    {
      q: 'What is the Central AI Orchestrator and how does multi-agent routing work?',
      a: 'The Central Orchestrator is the single conversational brain of BusinessPilot AI. When you provide a natural language instruction, it analyzes intent, extracts key entities (like customer names and monetary amounts), selects the appropriate specialized agent (Sales, Finance, Support, Marketing, Operations, or Analyst), executes verified database tools, and gates sensitive financial actions behind Human Approval.',
    },
    {
      q: 'Is human approval required for every action?',
      a: 'No. Read-only queries (such as checking revenue or scoring leads) execute instantly. High-impact operations—such as creating an invoice, issuing a PayPal payment link, or dispatching mass client emails—require explicit business owner confirmation to maintain complete fiduciary security.',
    },
    {
      q: 'How is data secured in Supabase?',
      a: 'BusinessPilot AI uses PostgreSQL Row Level Security (RLS) policies. Every business and its associated customers, leads, invoices, and payments are strictly partitioned by authenticated owner UUIDs, preventing cross-tenant data leakage.',
    },
    {
      q: 'Can I test the complete system without setting up external API keys?',
      a: 'Yes! BusinessPilot AI comes pre-loaded with an offline-first reactive persistence engine and pre-configured PayPal Sandbox test accounts. You can test the end-to-end workflow—from invoice generation to payment capture and analytics updates—out of the box immediately.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-[#F7F8FF]/60 border-t border-[#E9EAF2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E9E2FF]/80 text-[#633BFF] text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#15172B] tracking-tight">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-[#E9EAF2] overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-sm sm:text-base text-[#15172B] hover:text-[#633BFF] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#687089] transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180 text-[#633BFF]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#687089] leading-relaxed border-t border-[#E9EAF2]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};


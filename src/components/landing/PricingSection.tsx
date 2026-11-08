import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (plan: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter Pilot',
      description: 'Ideal for solo entrepreneurs & freelancers automating routine tasks.',
      price: annual ? 29 : 39,
      badge: null,
      highlight: false,
      features: [
        'Up to 2 Specialized AI Agents',
        'Natural Language Orchestrator',
        'Basic PayPal Sandbox & Invoicing',
        'Up to 500 Customers & Leads',
        'Community Support',
      ],
    },
    {
      name: 'Growth OS',
      description: 'Full workforce power for growing startups, agencies, and small businesses.',
      price: annual ? 79 : 99,
      badge: 'Most Popular',
      highlight: true,
      features: [
        'All 6 Specialized AI Agents (Full Suite)',
        'Unlimited AI Orchestrator Tool Calls',
        'Complete PayPal Checkout & Webhook Sync',
        'Unlimited CRM Leads & Invoices',
        'Predictive Business Analytics & Cohorts',
        'Supabase RLS Multi-tenant Database',
        'Priority 24/7 Agent Uptime SLA',
      ],
    },
    {
      name: 'Autonomous Enterprise',
      description: 'For scaling organizations demanding tailored agents and custom SLA.',
      price: annual ? 199 : 249,
      badge: 'Custom Agents',
      highlight: false,
      features: [
        'Dedicated Custom AI Agent Builder',
        'Custom Fine-tuned LLM Model Weights',
        'Enterprise PayPal REST API Gateway',
        'Multi-seat Human Approval Hierarchies',
        'Dedicated Account Architect',
        'Custom Database Connectors & Webhooks',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E9E2FF]/60 text-[#633BFF] text-xs font-semibold mb-3">
            <span>Simple, Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#15172B] tracking-tight">
            Invest in an AI Workforce That Pays for Itself
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#687089]">
            Scale your operations without adding overhead. Upgrade, downgrade, or cancel at any time.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-[#F7F8FF] border border-[#E9EAF2]">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                !annual ? 'bg-white text-[#15172B] shadow-sm' : 'text-[#687089]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 ${
                annual ? 'bg-[#633BFF] text-white shadow-sm shadow-[#633BFF]/25' : 'text-[#687089]'
              }`}
            >
              <span>Annual</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-400 text-[#15172B] text-[10px] font-extrabold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                p.highlight
                  ? 'bg-gradient-to-b from-white to-[#F7F8FF] border-2 border-[#633BFF] shadow-2xl shadow-[#633BFF]/15 scale-105 z-10'
                  : 'bg-white border border-[#E9EAF2] hover:border-[#633BFF]/30 shadow-sm'
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white text-[11px] font-extrabold shadow-md shadow-[#633BFF]/30 uppercase tracking-wider">
                  {p.badge}
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-[#15172B]">{p.name}</h3>
                <p className="mt-1 text-xs text-[#687089] min-h-[32px]">{p.description}</p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-[#15172B]">${p.price}</span>
                  <span className="text-xs text-[#687089] ml-1.5">/ month, billed {annual ? 'annually' : 'monthly'}</span>
                </div>

                <div className="mt-8 space-y-3 pt-6 border-t border-[#E9EAF2]/80">
                  <span className="text-xs font-bold text-[#15172B] uppercase tracking-wider">Included:</span>
                  <ul className="space-y-2.5">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center space-x-2 text-xs text-[#687089]">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => onSelectPlan(p.name)}
                className={`mt-8 w-full py-3 rounded-full text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                  p.highlight
                    ? 'bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white shadow-lg shadow-[#633BFF]/30 hover:shadow-xl hover:shadow-[#633BFF]/40 hover:-translate-y-0.5'
                    : 'bg-[#F7F8FF] hover:bg-[#E9E2FF]/40 text-[#15172B] border border-[#E9EAF2]'
                }`}
              >
                <span>Get Started with {p.name.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};


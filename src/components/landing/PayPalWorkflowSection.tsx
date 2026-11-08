import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  CreditCard, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  RefreshCw, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface PayPalWorkflowSectionProps {
  onTryWorkflow: () => void;
}

const STEPS = [
  {
    step: '01',
    title: 'Natural AI Command',
    description: 'Owner instructs: "Create an invoice for John for $500."',
    agent: 'Finance Agent',
    badge: 'AI Intent Parsing',
  },
  {
    step: '02',
    title: 'Customer Resolution',
    description: 'Retrieves John Doe record from Supabase & drafts itemized invoice.',
    agent: 'Supabase DB',
    badge: 'Data Integrity',
  },
  {
    step: '03',
    title: 'Human-in-the-Loop Approval',
    description: 'Owner reviews the proposed bill; zero unauthorized charges.',
    agent: 'Owner Approval',
    badge: 'Security Gate',
  },
  {
    step: '04',
    title: 'PayPal Sandbox Order',
    description: 'Generates real PayPal REST API order with secure checkout link.',
    agent: 'PayPal Orders v2',
    badge: 'Sandbox REST API',
  },
  {
    step: '05',
    title: 'Capture & Verification',
    description: 'Customer approves via PayPal; server captures & validates transaction ID.',
    agent: 'Payment Engine',
    badge: 'Verified Capture',
  },
  {
    step: '06',
    title: 'Real-time Ledger & Analytics',
    description: 'Invoice marked Paid; Revenue charts & customer lifetime value update.',
    agent: 'Business Analytics',
    badge: 'Instant Sync',
  },
];

export const PayPalWorkflowSection: React.FC<PayPalWorkflowSectionProps> = ({ onTryWorkflow }) => {
  return (
    <section id="paypal" className="py-20 lg:py-28 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#34D399]/15 border border-[#10B981]/30 text-[#059669] text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4 text-[#059669]" />
            <span>Official PayPal Developer Sandbox Integration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#15172B] tracking-tight">
            From Natural Language to Verified PayPal Payment
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#687089]">
            Never copy-paste invoice details again. Watch your Finance Agent collaborate with PayPal Sandbox to automate billing with complete human authorization controls.
          </p>
        </div>

        {/* 6-Step Workflow Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-[#F7F8FF]/80 hover:bg-white rounded-3xl p-6 border border-[#E9EAF2] hover:border-[#633BFF]/30 shadow-sm hover:shadow-xl hover:shadow-[#633BFF]/8 transition-all group relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[#633BFF]/30 group-hover:text-[#633BFF] transition-colors font-mono">
                    {item.step}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white border border-[#E9EAF2] text-[10px] font-bold text-[#687089] uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#15172B] mb-2 group-hover:text-[#633BFF] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#687089] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#E9EAF2]/60 flex items-center justify-between text-[11px] font-semibold text-[#15172B]">
                <span className="text-[#687089]">Executed by:</span>
                <span className="text-[#633BFF] bg-[#E9E2FF]/40 px-2 py-0.5 rounded-md">
                  {item.agent}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Try Live Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#15172B] to-[#25284B] rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Hackathon Demonstration</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Test the $500 John Doe Invoice Workflow Now
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Execute the command in the Central Orchestrator, approve the draft, and simulate payment capture with instant database and revenue sync.
            </p>
          </div>

          <button
            onClick={onTryWorkflow}
            className="shrink-0 inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] hover:from-[#7B52FF] hover:to-[#5595FF] text-white font-bold text-sm shadow-lg shadow-[#633BFF]/40 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch Hackathon Demo</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

      </div>
    </section>
  );
};


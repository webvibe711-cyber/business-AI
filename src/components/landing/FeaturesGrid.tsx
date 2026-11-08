import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  CreditCard, 
  Database, 
  Users, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  BarChart4
} from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: Bot,
      title: 'Central Multi-Agent Orchestrator',
      description: 'Understands plain language requests, routes to domain-specialized agents, and executes operations with human approval gates.',
      color: 'text-[#633BFF]',
      bg: 'bg-[#633BFF]/10',
    },
    {
      icon: CreditCard,
      title: 'PayPal Sandbox Orders & Capture',
      description: 'End-to-end payment creation, server-verified captures, transaction logging, and automatic invoice settlement.',
      color: 'text-[#059669]',
      bg: 'bg-[#059669]/10',
    },
    {
      icon: Database,
      title: 'Secure Supabase Architecture',
      description: 'PostgreSQL relational backend equipped with strict Row Level Security (RLS) ensuring strict multi-tenant isolation.',
      color: 'text-[#2563EB]',
      bg: 'bg-[#2563EB]/10',
    },
    {
      icon: Users,
      title: 'Autonomous CRM & Lead Scoring',
      description: 'Track deals across pipeline stages, calculate predictive closing scores, and generate hyper-tailored sales outreach.',
      color: 'text-[#D97706]',
      bg: 'bg-[#D97706]/10',
    },
    {
      icon: BarChart4,
      title: 'Predictive Business Analytics',
      description: 'Interactive Recharts dashboard tracking MRR expansion, collection efficiency, customer retention, and AI agent workloads.',
      color: 'text-[#7C3AED]',
      bg: 'bg-[#7C3AED]/10',
    },
    {
      icon: ShieldCheck,
      title: 'Human-in-the-Loop Security',
      description: 'Sensitive business actions like billing, payment links, and mass messaging never execute without explicit owner sign-off.',
      color: 'text-[#0891B2]',
      bg: 'bg-[#0891B2]/10',
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-[#F7F8FF]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#E9E2FF]/80 text-[#633BFF] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Business Operating System</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#15172B] tracking-tight">
            Engineered for High-Growth Modern Enterprises
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#687089]">
            Everything you need to orchestrate sales, finances, customer support, marketing, and operations under one unified roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white rounded-3xl p-7 border border-[#E9EAF2] hover:border-[#633BFF]/30 shadow-sm hover:shadow-xl hover:shadow-[#633BFF]/8 transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl ${feat.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${feat.color}`} />
                </div>
                <h3 className="text-lg font-bold text-[#15172B] mb-2 group-hover:text-[#633BFF] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#687089] leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};


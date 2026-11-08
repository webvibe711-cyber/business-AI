import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Wallet, 
  Headphones, 
  Megaphone, 
  Cog, 
  BarChart2, 
  ArrowRight 
} from 'lucide-react';
import type { AgentType } from '../../types';

interface AgentCardsSectionProps {
  onSelectAgent: (agent: AgentType) => void;
  onMeetAllAgents: () => void;
}

interface AgentCardData {
  id: AgentType;
  title: string;
  description: string;
  icon: React.ElementType;
  auraGradient: string;
  iconColor: string;
  buttonBorder: string;
  buttonHover: string;
  badgeText: string;
}

const AGENTS: AgentCardData[] = [
  {
    id: 'sales',
    title: 'Sales Agent',
    description: 'Turn leads into customers.',
    icon: TrendingUp,
    auraGradient: 'from-[#FF80B5]/25 via-[#E9E2FF]/30 to-white',
    iconColor: 'text-[#E11D48]',
    buttonBorder: 'border-[#FF80B5]/40 text-[#E11D48]',
    buttonHover: 'hover:bg-[#FFF1F2]',
    badgeText: 'CRM & Pipeline',
  },
  {
    id: 'finance',
    title: 'Finance Agent',
    description: 'Manage payments and invoices.',
    icon: Wallet,
    auraGradient: 'from-[#34D399]/25 via-[#D1FAE5]/30 to-white',
    iconColor: 'text-[#059669]',
    buttonBorder: 'border-[#34D399]/40 text-[#059669]',
    buttonHover: 'hover:bg-[#ECFDF5]',
    badgeText: 'PayPal & Invoicing',
  },
  {
    id: 'support',
    title: 'Support Agent',
    description: 'Answer queries & help customers.',
    icon: Headphones,
    auraGradient: 'from-[#60A5FA]/25 via-[#DBEAFE]/30 to-white',
    iconColor: 'text-[#2563EB]',
    buttonBorder: 'border-[#60A5FA]/40 text-[#2563EB]',
    buttonHover: 'hover:bg-[#EFF6FF]',
    badgeText: '24/7 Knowledge Base',
  },
  {
    id: 'marketing',
    title: 'Marketing Agent',
    description: 'Grow your brand with AI.',
    icon: Megaphone,
    auraGradient: 'from-[#FBBF24]/25 via-[#FEF3C7]/30 to-white',
    iconColor: 'text-[#D97706]',
    buttonBorder: 'border-[#FBBF24]/40 text-[#D97706]',
    buttonHover: 'hover:bg-[#FFFBEB]',
    badgeText: 'Social & Copy Studio',
  },
  {
    id: 'operations',
    title: 'Operations Agent',
    description: 'Organize tasks and workflows.',
    icon: Cog,
    auraGradient: 'from-[#22D3EE]/25 via-[#CFFAFE]/30 to-white',
    iconColor: 'text-[#0891B2]',
    buttonBorder: 'border-[#22D3EE]/40 text-[#0891B2]',
    buttonHover: 'hover:bg-[#ECFEFF]',
    badgeText: 'Task & Schedule Sync',
  },
  {
    id: 'analyst',
    title: 'Analyst Agent',
    description: 'Get insights & make better decisions.',
    icon: BarChart2,
    auraGradient: 'from-[#A78BFA]/25 via-[#EDE9FE]/30 to-white',
    iconColor: 'text-[#7C3AED]',
    buttonBorder: 'border-[#A78BFA]/40 text-[#7C3AED]',
    buttonHover: 'hover:bg-[#F5F3FF]',
    badgeText: 'Predictive Intelligence',
  },
];

export const AgentCardsSection: React.FC<AgentCardsSectionProps> = ({
  onSelectAgent,
  onMeetAllAgents,
}) => {
  return (
    <section id="workforce" className="py-20 lg:py-28 bg-[#FFFFFF] relative overflow-hidden">
      {/* Decorative backdrop elements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference image */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-[#633BFF] text-xs font-bold tracking-wider uppercase mb-2">
              <span>◆ AI WORKFORCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#15172B] tracking-tight">
              6 Powerful AI Agents<br className="hidden sm:inline" /> for Your Business
            </h2>
            <p className="mt-3 text-base text-[#687089] max-w-xl">
              Your dedicated AI team, working 24/7 to help you succeed.
            </p>
          </div>

          <button
            onClick={onMeetAllAgents}
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-[#633BFF] hover:text-[#4285FF] font-bold text-sm group transition-colors"
          >
            <span>Meet All Agents</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Frosted Agent Cards Grid matching reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {AGENTS.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => onSelectAgent(agent.id)}
                className="group cursor-pointer relative bg-white rounded-3xl p-5 border border-[#E9EAF2] hover:border-[#633BFF]/40 shadow-sm hover:shadow-xl hover:shadow-[#633BFF]/10 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Soft Pastel Aura Header matching reference */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${agent.auraGradient} pointer-events-none -z-0 opacity-80 group-hover:opacity-100 transition-opacity`}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-start space-y-4">
                  {/* Icon badge */}
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-md shadow-black/5 border border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Icon className={`w-6 h-6 ${agent.iconColor}`} />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#15172B] tracking-tight group-hover:text-[#633BFF] transition-colors">
                      {agent.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#687089] leading-relaxed">
                      {agent.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Circular Arrow Button matching reference */}
                <div className="relative z-10 pt-6 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#687089]/80 uppercase tracking-wider">
                    {agent.badgeText}
                  </span>
                  <div className={`w-8 h-8 rounded-full border ${agent.buttonBorder} ${agent.buttonHover} flex items-center justify-center transition-all group-hover:translate-x-0.5 group-hover:shadow-sm`}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};


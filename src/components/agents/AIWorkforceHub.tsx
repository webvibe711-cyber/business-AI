import React, { useState } from 'react';
import { 
  Bot, 
  TrendingUp, 
  Wallet, 
  Headphones, 
  Megaphone, 
  Cog, 
  BarChart2, 
  Sparkles, 
  LayoutGrid,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import type { AgentType } from '../../types';
import { SalesAgentWorkspace } from './SalesAgentWorkspace';
import { FinanceAgentWorkspace } from './FinanceAgentWorkspace';
import { SupportAgentWorkspace } from './SupportAgentWorkspace';
import { MarketingAgentWorkspace } from './MarketingAgentWorkspace';
import { OperationsAgentWorkspace } from './OperationsAgentWorkspace';
import { AnalystAgentWorkspace } from './AnalystAgentWorkspace';

interface AIWorkforceHubProps {
  initialAgent?: AgentType;
  onOpenCommandCenter: () => void;
}

export const AIWorkforceHub: React.FC<AIWorkforceHubProps> = ({ 
  initialAgent = 'sales',
  onOpenCommandCenter 
}) => {
  const [activeTab, setActiveTab] = useState<AgentType | 'overview'>(initialAgent);

  const tabs: { id: AgentType; name: string; icon: React.ElementType; color: string }[] = [
    { id: 'sales', name: 'Sales Agent', icon: TrendingUp, color: 'text-rose-600' },
    { id: 'finance', name: 'Finance Agent', icon: Wallet, color: 'text-emerald-600' },
    { id: 'support', name: 'Support Agent', icon: Headphones, color: 'text-blue-600' },
    { id: 'marketing', name: 'Marketing Agent', icon: Megaphone, color: 'text-amber-600' },
    { id: 'operations', name: 'Operations Agent', icon: Cog, color: 'text-cyan-600' },
    { id: 'analyst', name: 'Analyst Agent', icon: BarChart2, color: 'text-purple-600' },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#E9EAF2] gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#15172B] tracking-tight">
            AI Workforce Workspaces
          </h2>
          <p className="text-xs text-[#687089]">
            6 autonomous specialized agents operating under the Central AI Orchestrator
          </p>
        </div>

        <button
          onClick={onOpenCommandCenter}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white text-xs font-bold shadow-md shadow-[#633BFF]/25 hover:shadow-lg transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Open AI Command Center</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Agent Selector Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-[#E9EAF2]/60 no-scrollbar">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 flex items-center space-x-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#15172B] text-white shadow-sm'
                  : 'bg-[#F7F8FF] text-[#687089] hover:bg-slate-100 hover:text-[#15172B]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : tab.color}`} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Render Selected Agent Workspace */}
      <div className="pt-2">
        {activeTab === 'sales' && <SalesAgentWorkspace />}
        {activeTab === 'finance' && <FinanceAgentWorkspace />}
        {activeTab === 'support' && <SupportAgentWorkspace />}
        {activeTab === 'marketing' && <MarketingAgentWorkspace />}
        {activeTab === 'operations' && <OperationsAgentWorkspace />}
        {activeTab === 'analyst' && <AnalystAgentWorkspace />}
      </div>

    </div>
  );
};


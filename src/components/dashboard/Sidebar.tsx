import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Terminal, 
  Users, 
  Target, 
  Receipt, 
  CreditCard, 
  Megaphone, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  ArrowLeft,
  Sparkles,
  Zap
} from 'lucide-react';
import type { AgentType } from '../../types';

export type DashboardView = 
  | 'overview' 
  | 'workforce' 
  | 'command' 
  | 'customers' 
  | 'leads' 
  | 'invoices' 
  | 'payments' 
  | 'marketing' 
  | 'operations' 
  | 'analytics' 
  | 'settings';

interface SidebarProps {
  currentView: DashboardView;
  onNavigate: (view: DashboardView, agent?: AgentType) => void;
  onBackToLanding: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onBackToLanding,
  isOpenMobile,
  onCloseMobile,
}) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'workforce', label: 'AI Workforce', icon: Bot, badge: '6 Active' },
    { id: 'command', label: 'AI Command Center', icon: Terminal, badge: 'Orchestrator' },
    { id: 'customers', label: 'Customers', icon: Users, badge: null },
    { id: 'leads', label: 'CRM & Leads', icon: Target, badge: null },
    { id: 'invoices', label: 'Invoices', icon: Receipt, badge: null },
    { id: 'payments', label: 'Payments (PayPal)', icon: CreditCard, badge: 'Sandbox' },
    { id: 'marketing', label: 'Marketing', icon: Megaphone, badge: null },
    { id: 'operations', label: 'Operations', icon: CheckSquare, badge: null },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-[#E9EAF2] flex flex-col justify-between transition-transform duration-300 ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div>
          {/* Logo Bar */}
          <div className="h-20 px-6 border-b border-[#E9EAF2] flex items-center justify-between">
            <div 
              onClick={onBackToLanding}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#633BFF] via-[#4285FF] to-[#62D9ED] p-0.5 shadow-md shadow-[#633BFF]/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <span className="font-extrabold text-xl bg-gradient-to-br from-[#633BFF] to-[#4285FF] bg-clip-text text-transparent">
                    B
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base text-[#15172B] tracking-tight group-hover:text-[#633BFF] transition-colors">
                  BusinessPilot
                </span>
                <span className="text-[10px] font-medium text-[#687089] -mt-1 tracking-wide">
                  AI Business OS
                </span>
              </div>
            </div>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id as DashboardView);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white shadow-md shadow-[#633BFF]/20 font-bold'
                      : 'text-[#687089] hover:bg-[#F7F8FF] hover:text-[#15172B]'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#687089]'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : item.badge === 'Sandbox' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-[#E9E2FF] text-[#633BFF]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Bar: Back to Home & Sandbox Info */}
        <div className="p-4 border-t border-[#E9EAF2] space-y-3">
          <div className="p-3 bg-[#F7F8FF] rounded-2xl border border-[#E9EAF2]">
            <div className="flex items-center space-x-2 text-[11px] font-bold text-[#15172B]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>PayPal Sandbox Active</span>
            </div>
            <p className="text-[10px] text-[#687089] mt-0.5">
              Live REST API Order & Capture enabled
            </p>
          </div>

          <button
            onClick={onBackToLanding}
            className="w-full flex items-center justify-center space-x-2 py-2 text-xs font-medium text-[#687089] hover:text-[#15172B] hover:bg-[#F7F8FF] rounded-xl transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Landing Page</span>
          </button>
        </div>
      </aside>
    </>
  );
};


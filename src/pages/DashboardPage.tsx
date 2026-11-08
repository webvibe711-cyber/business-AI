import React, { useState } from 'react';
import { Sidebar, type DashboardView } from '../components/dashboard/Sidebar';
import { TopHeader } from '../components/dashboard/TopHeader';
import { ApprovalModal } from '../components/dashboard/ApprovalModal';
import { OverviewView } from '../components/dashboard/OverviewView';
import { AIWorkforceHub } from '../components/agents/AIWorkforceHub';
import { CommandCenter } from '../components/orchestrator/CommandCenter';
import { CustomerList } from '../components/crm/CustomerList';
import { LeadPipeline } from '../components/crm/LeadPipeline';
import { InvoiceList } from '../components/invoices/InvoiceList';
import { PaymentsList } from '../components/payments/PaymentsList';
import { MarketingAgentWorkspace } from '../components/agents/MarketingAgentWorkspace';
import { OperationsAgentWorkspace } from '../components/agents/OperationsAgentWorkspace';
import { AnalyticsDashboard } from '../components/analytics/AnalyticsDashboard';
import { SettingsView } from '../components/settings/SettingsView';
import type { AgentType } from '../types';

interface DashboardPageProps {
  initialView?: DashboardView;
  initialAgent?: AgentType;
  onBackToLanding: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  initialView = 'overview',
  initialAgent = 'sales',
  onBackToLanding,
}) => {
  const [currentView, setCurrentView] = useState<DashboardView>(initialView);
  const [selectedAgent, setSelectedAgent] = useState<AgentType>(initialAgent);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (view: DashboardView, agent?: AgentType) => {
    setCurrentView(view);
    if (agent) setSelectedAgent(agent);
  };

  return (
    <div className="flex h-screen bg-[#F7F8FF] overflow-hidden">
      
      {/* 1. Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        onBackToLanding={onBackToLanding}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Main Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <TopHeader
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenCommandCenter={() => setCurrentView('command')}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 overflow-y-auto bg-[#F7F8FF]">
          {currentView === 'overview' && (
            <OverviewView onNavigate={handleNavigate} />
          )}

          {currentView === 'workforce' && (
            <AIWorkforceHub 
              initialAgent={selectedAgent} 
              onOpenCommandCenter={() => setCurrentView('command')} 
            />
          )}

          {currentView === 'command' && (
            <CommandCenter />
          )}

          {currentView === 'customers' && (
            <CustomerList />
          )}

          {currentView === 'leads' && (
            <LeadPipeline />
          )}

          {currentView === 'invoices' && (
            <InvoiceList />
          )}

          {currentView === 'payments' && (
            <PaymentsList />
          )}

          {currentView === 'marketing' && (
            <div className="p-4 sm:p-8 max-w-7xl mx-auto">
              <MarketingAgentWorkspace />
            </div>
          )}

          {currentView === 'operations' && (
            <div className="p-4 sm:p-8 max-w-7xl mx-auto">
              <OperationsAgentWorkspace />
            </div>
          )}

          {currentView === 'analytics' && (
            <AnalyticsDashboard />
          )}

          {currentView === 'settings' && (
            <SettingsView />
          )}
        </main>

      </div>

      {/* 3. Global Human-in-the-Loop Approval Modal */}
      <ApprovalModal />

    </div>
  );
};

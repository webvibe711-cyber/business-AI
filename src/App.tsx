import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BusinessProvider } from './context/BusinessContext';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { PublicInvoicePayPage } from './pages/PublicInvoicePayPage';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingModal } from './components/auth/OnboardingModal';
import type { DashboardView } from './components/dashboard/Sidebar';
import type { AgentType } from './types';

const MainApplication: React.FC = () => {
  const { isAuthenticated, isOnboarded } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'dashboard'>('landing');
  const [initialDashboardView, setInitialDashboardView] = useState<DashboardView>('overview');
  const [initialAgent, setInitialAgent] = useState<AgentType>('sales');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

  const handleOpenDashboard = (view: string = 'overview', agent?: AgentType) => {
    setInitialDashboardView(view as DashboardView);
    if (agent) setInitialAgent(agent);
    setCurrentScreen('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setCurrentScreen('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {currentScreen === 'landing' ? (
        <LandingPage
          onOpenDashboard={handleOpenDashboard}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
      ) : (
        <DashboardPage
          initialView={initialDashboardView}
          initialAgent={initialAgent}
          onBackToLanding={handleBackToLanding}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          if (!isOnboarded) {
            setIsOnboardingModalOpen(true);
          } else {
            setCurrentScreen('dashboard');
          }
        }}
      />

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingModalOpen}
        onComplete={() => {
          setIsOnboardingModalOpen(false);
          setCurrentScreen('dashboard');
        }}
      />
    </>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BusinessProvider>
          <Routes>
            {/* Customer hosted checkout route: /pay/:invoiceId */}
            <Route path="/pay/:invoiceId" element={<PublicInvoicePayPage />} />
            
            {/* Main Application */}
            <Route path="*" element={<MainApplication />} />
          </Routes>
        </BusinessProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

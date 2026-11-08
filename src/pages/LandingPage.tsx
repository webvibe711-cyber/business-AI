import React, { useState } from 'react';
import { Navbar } from '../components/common/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { AgentCardsSection } from '../components/landing/AgentCardsSection';
import { BusinessOSSection } from '../components/landing/BusinessOSSection';
import { PayPalWorkflowSection } from '../components/landing/PayPalWorkflowSection';
import { FeaturesGrid } from '../components/landing/FeaturesGrid';
import { PricingSection } from '../components/landing/PricingSection';
import { FAQSection } from '../components/landing/FAQSection';
import { Footer } from '../components/common/Footer';
import { DemoModal } from '../components/landing/DemoModal';
import type { AgentType } from '../types';

interface LandingPageProps {
  onOpenDashboard: (initialView?: string, initialAgent?: AgentType) => void;
  onOpenAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenDashboard,
  onOpenAuth,
}) => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleSelectAgent = (agent: AgentType) => {
    onOpenDashboard('workforce', agent);
  };

  const handleMeetAllAgents = () => {
    onOpenDashboard('workforce');
  };

  const handleLaunchHackathonDemo = () => {
    onOpenDashboard('command');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15172B]">
      {/* Global Navbar */}
      <Navbar
        onOpenAuth={onOpenAuth}
        onOpenDashboard={() => onOpenDashboard('overview')}
      />

      {/* Main Landing Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section matching reference image */}
        <HeroSection
          onExploreWorkforce={handleMeetAllAgents}
          onWatchDemo={() => setIsDemoModalOpen(true)}
          onLaunchOS={() => onOpenDashboard('overview')}
        />

        {/* 2. 6 Agent Cards Section matching reference image */}
        <AgentCardsSection
          onSelectAgent={handleSelectAgent}
          onMeetAllAgents={handleMeetAllAgents}
        />

        {/* 3. The Business OS Architecture & Metrics Section matching reference image */}
        <BusinessOSSection
          onDiscoverMore={() => onOpenDashboard('overview')}
          onWatchVideo={() => setIsDemoModalOpen(true)}
        />

        {/* 4. PayPal Sandbox Integration & End-to-End Workflow Showcase */}
        <PayPalWorkflowSection
          onTryWorkflow={handleLaunchHackathonDemo}
        />

        {/* 5. Comprehensive Platform Features Grid */}
        <FeaturesGrid />

        {/* 6. Transparent Pricing */}
        <PricingSection
          onSelectPlan={() => onOpenDashboard('overview')}
        />

        {/* 7. FAQ Accordion */}
        <FAQSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Demo Tour Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onLaunchDemoWorkflow={handleLaunchHackathonDemo}
      />
    </div>
  );
};


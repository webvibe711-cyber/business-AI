import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  ArrowRight, 
  Search, 
  Bell, 
  TrendingUp, 
  Users, 
  Zap, 
  LayoutDashboard, 
  Sparkles, 
  Receipt, 
  BarChart3, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

interface HeroSectionProps {
  onExploreWorkforce: () => void;
  onWatchDemo: () => void;
  onLaunchOS: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWorkforce,
  onWatchDemo,
  onLaunchOS,
}) => {
  return (
    <section id="home" className="relative pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden bg-gradient-to-b from-white via-[#F7F8FF]/50 to-white">
      {/* Background Ambient Aura Blurs matching reference image */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#633BFF]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-36 right-10 w-[32rem] h-[32rem] bg-gradient-to-br from-[#4285FF]/15 via-[#62D9ED]/15 to-[#E9E2FF]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start space-y-6"
          >
            {/* Pill Badge matching reference */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#E9E2FF]/60 border border-[#633BFF]/20 text-[#633BFF] text-xs font-semibold backdrop-blur-sm shadow-sm shadow-[#633BFF]/5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Next-Gen Business OS</span>
              <span className="text-[#633BFF]/60 font-mono">+</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#15172B] tracking-tight leading-[1.08]">
              Your Business.<br />
              <span className="bg-gradient-to-r from-[#633BFF] via-[#4285FF] to-[#62D9ED] bg-clip-text text-transparent">
                Reimagined
              </span>{' '}
              with AI.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#687089] leading-relaxed max-w-xl font-normal">
              Meet your intelligent AI workforce. Automate, manage and grow your business from one powerful platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={onExploreWorkforce}
                className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#633BFF] via-[#7B52FF] to-[#4285FF] text-white font-semibold text-sm shadow-lg shadow-[#633BFF]/30 hover:shadow-xl hover:shadow-[#633BFF]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span>Explore AI Workforce</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onWatchDemo}
                className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-[#F7F8FF] border border-[#E9EAF2] text-[#15172B] font-semibold text-sm shadow-sm hover:shadow hover:border-[#633BFF]/30 transition-all duration-200 group"
              >
                <div className="w-6 h-6 rounded-full bg-[#F7F8FF] group-hover:bg-[#E9E2FF] flex items-center justify-center text-[#633BFF] transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Social Proof Avatars */}
            <div className="flex items-center space-x-3 pt-4 border-t border-[#E9EAF2]/80 w-full sm:w-auto">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Avatar"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Avatar"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                  alt="Avatar"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                  alt="Avatar"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-bold text-[#15172B]">10K+ Businesses</span>
                </div>
                <span className="text-[11px] text-[#687089]">Trust BusinessPilot AI</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Floating Dashboard Preview Mockup matching reference */}
          <div className="lg:col-span-7 relative">
            
            {/* Playful top-right upward doodle arrow */}
            <div className="absolute -top-10 right-6 hidden sm:block text-[#633BFF]/60 select-none pointer-events-none">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 36C20 28 32 18 36 12M36 12L24 13M36 12L35 24" stroke="#633BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Floating Top-Left Mini Badge: Purple Bar Chart badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -left-4 sm:left-4 z-20 bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-xl shadow-[#633BFF]/15 border border-[#E9EAF2] hidden sm:flex items-center space-x-2.5"
            >
              <div className="flex items-end space-x-1 h-6 px-1">
                <div className="w-1.5 h-3 bg-[#E9E2FF] rounded-t-sm" />
                <div className="w-1.5 h-4.5 bg-[#633BFF]/50 rounded-t-sm" />
                <div className="w-1.5 h-6 bg-[#633BFF] rounded-t-sm" />
              </div>
              <span className="text-xs font-semibold text-[#15172B]">AI Yield: +34%</span>
            </motion.div>

            {/* The Main Rounded Floating Dashboard Slab */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={onLaunchOS}
              className="cursor-pointer group relative bg-white/95 backdrop-blur-xl rounded-[28px] border border-[#E9EAF2] p-4 sm:p-6 shadow-2xl shadow-[#633BFF]/12 transition-all duration-300 hover:shadow-3xl hover:shadow-[#633BFF]/20 hover:-translate-y-1"
            >
              {/* Internal Dashboard Mockup */}
              <div className="flex rounded-2xl overflow-hidden bg-[#F7F8FF]/60 border border-[#E9EAF2]/60">
                
                {/* Left Mini Sidebar */}
                <div className="w-14 sm:w-36 bg-white border-r border-[#E9EAF2] p-2 sm:p-3 flex flex-col justify-between hidden sm:flex">
                  <div className="space-y-4">
                    {/* Logo inside dashboard */}
                    <div className="flex items-center space-x-2 px-1">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#633BFF] to-[#4285FF] flex items-center justify-center text-white text-xs font-extrabold shadow-sm">
                        B
                      </div>
                      <span className="text-xs font-bold text-[#15172B] hidden sm:inline">Pilot OS</span>
                    </div>

                    {/* Nav Items */}
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-[#633BFF] text-white text-[11px] font-semibold shadow-sm shadow-[#633BFF]/30">
                        <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
                        <span className="hidden sm:inline">Dashboard</span>
                      </div>
                      <div className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-[#687089] hover:bg-[#F7F8FF] text-[11px] font-medium">
                        <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#633BFF]" />
                        <span className="hidden sm:inline">Workforce</span>
                      </div>
                      <div className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-[#687089] hover:bg-[#F7F8FF] text-[11px] font-medium">
                        <Receipt className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                        <span className="hidden sm:inline">Invoices</span>
                      </div>
                      <div className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-[#687089] hover:bg-[#F7F8FF] text-[11px] font-medium">
                        <BarChart3 className="w-3.5 h-3.5 shrink-0 text-[#4285FF]" />
                        <span className="hidden sm:inline">Analytics</span>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar bottom */}
                  <div className="space-y-1 pt-4 border-t border-[#E9EAF2]">
                    <div className="flex items-center space-x-2 px-2.5 py-1 rounded-lg text-[#687089] text-[11px]">
                      <Settings className="w-3.5 h-3.5 shrink-0" />
                      <span className="hidden sm:inline">Settings</span>
                    </div>
                    <div className="flex items-center space-x-2 px-2.5 py-1 rounded-lg text-[#687089] text-[11px]">
                      <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                      <span className="hidden sm:inline">Help</span>
                    </div>
                  </div>
                </div>

                {/* Main Dashboard Canvas */}
                <div className="flex-1 p-4 sm:p-5 flex flex-col space-y-4 bg-white">
                  
                  {/* Top Bar inside mockup */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#E9EAF2]/70">
                    <div className="flex items-center space-x-2 bg-[#F7F8FF] px-3 py-1.5 rounded-full border border-[#E9EAF2]/70 w-44 sm:w-56 text-[#687089] text-[11px]">
                      <Search className="w-3.5 h-3.5" />
                      <span>Search anything...</span>
                    </div>

                    <div className="flex items-center space-x-2.5">
                      <div className="relative w-7 h-7 rounded-full bg-[#F7F8FF] border border-[#E9EAF2] flex items-center justify-center text-[#687089]">
                        <Bell className="w-3.5 h-3.5" />
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#633BFF]" />
                      </div>
                      <div className="flex items-center space-x-1.5 pl-1">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                          alt="Riham"
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-[#633BFF]/30"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Welcome Greeting */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-[#15172B]">
                        Welcome back, Riham! 👋
                      </h4>
                      <p className="text-xs text-[#687089]">
                        Your business is growing <span className="text-[#633BFF] font-semibold">28% faster</span> this month.
                      </p>
                    </div>
                    <div className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold">
                      <span>+28%</span>
                      <TrendingUp className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Curving SVG Line Chart with lavender fill matching reference image */}
                  <div className="h-24 sm:h-28 w-full relative pt-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#633BFF" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#633BFF" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Area Fill */}
                      <path
                        d="M0,70 Q70,75 140,55 T280,45 T420,25 T500,20 L500,100 L0,100 Z"
                        fill="url(#chartGradient)"
                      />
                      {/* Stroke Line */}
                      <path
                        d="M0,70 Q70,75 140,55 T280,45 T420,25 T500,20"
                        fill="none"
                        stroke="#633BFF"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Live Data Point */}
                      <circle cx="500" cy="20" r="5" fill="#633BFF" stroke="#FFFFFF" strokeWidth="2" />
                    </svg>
                  </div>

                  {/* 3 Metric Cards matching reference image */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                    {/* Revenue Card */}
                    <div className="bg-[#F7F8FF] rounded-xl p-2.5 sm:p-3 border border-[#E9EAF2] hover:border-[#633BFF]/30 transition-all">
                      <div className="flex items-center justify-between text-[#687089] text-[10px] sm:text-xs font-medium">
                        <span>Revenue</span>
                        <div className="w-4 h-4 rounded-md bg-[#4285FF]/10 text-[#4285FF] flex items-center justify-center">
                          <TrendingUp className="w-2.5 h-2.5" />
                        </div>
                      </div>
                      <div className="text-sm sm:text-base font-extrabold text-[#15172B] mt-0.5">
                        $24,780
                      </div>
                      <div className="text-[10px] text-emerald-600 font-semibold flex items-center space-x-0.5 mt-0.5">
                        <span>↑ +28.5%</span>
                      </div>
                    </div>

                    {/* Customers Card */}
                    <div className="bg-[#F7F8FF] rounded-xl p-2.5 sm:p-3 border border-[#E9EAF2] hover:border-[#633BFF]/30 transition-all">
                      <div className="flex items-center justify-between text-[#687089] text-[10px] sm:text-xs font-medium">
                        <span>Customers</span>
                        <div className="w-4 h-4 rounded-md bg-[#633BFF]/10 text-[#633BFF] flex items-center justify-center">
                          <Users className="w-2.5 h-2.5" />
                        </div>
                      </div>
                      <div className="text-sm sm:text-base font-extrabold text-[#15172B] mt-0.5">
                        3,240
                      </div>
                      <div className="text-[10px] text-emerald-600 font-semibold flex items-center space-x-0.5 mt-0.5">
                        <span>↑ +12.5%</span>
                      </div>
                    </div>

                    {/* Active Agents Card */}
                    <div className="bg-[#F7F8FF] rounded-xl p-2.5 sm:p-3 border border-[#E9EAF2] hover:border-[#633BFF]/30 transition-all">
                      <div className="flex items-center justify-between text-[#687089] text-[10px] sm:text-xs font-medium">
                        <span>Active Agents</span>
                        <div className="w-4 h-4 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                          <Zap className="w-2.5 h-2.5" />
                        </div>
                      </div>
                      <div className="text-sm sm:text-base font-extrabold text-[#15172B] mt-0.5">
                        6
                      </div>
                      <div className="text-[10px] text-emerald-600 font-semibold flex items-center space-x-0.5 mt-0.5">
                        <span>↑ +20.0%</span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              {/* Click to open overlay badge */}
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-[#687089]">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-medium text-[#15172B]">All 6 AI Agents Online</span>
                  <span className="text-[#687089]">• Real-time Supabase Sync</span>
                </div>
                <div className="flex items-center space-x-1 text-[#633BFF] font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Open Live OS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};


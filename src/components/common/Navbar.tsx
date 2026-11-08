import React, { useState } from 'react';
import { Sparkles, ArrowRight, Sun, Moon, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onOpenAuth?: () => void;
  onOpenDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenDashboard }) => {
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-[#E9EAF2] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo matching reference */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#633BFF] via-[#4285FF] to-[#62D9ED] p-0.5 shadow-md shadow-[#633BFF]/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <span className="font-extrabold text-2xl bg-gradient-to-br from-[#633BFF] to-[#4285FF] bg-clip-text text-transparent">
                B
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-[#15172B] tracking-tight group-hover:text-[#633BFF] transition-colors">
              BusinessPilot AI
            </span>
            <span className="text-[11px] font-medium text-[#687089] -mt-1 tracking-wide">
              Your Business. Your AI Workforce.
            </span>
          </div>
        </div>

        {/* Navigation Pills */}
        <nav className="hidden md:flex items-center space-x-1 bg-[#F7F8FF] p-1.5 rounded-full border border-[#E9EAF2]/80">
          <a
            href="#home"
            className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#633BFF] text-white shadow-sm shadow-[#633BFF]/25 transition-all"
          >
            Home
          </a>
          <a
            href="#workforce"
            className="px-4 py-1.5 rounded-full text-xs font-medium text-[#687089] hover:text-[#15172B] hover:bg-white/80 transition-all"
          >
            AI Workforce
          </a>
          <a
            href="#features"
            className="px-4 py-1.5 rounded-full text-xs font-medium text-[#687089] hover:text-[#15172B] hover:bg-white/80 transition-all"
          >
            Features
          </a>
          <a
            href="#paypal"
            className="px-4 py-1.5 rounded-full text-xs font-medium text-[#687089] hover:text-[#15172B] hover:bg-white/80 transition-all"
          >
            PayPal Sandbox
          </a>
          <a
            href="#pricing"
            className="px-4 py-1.5 rounded-full text-xs font-medium text-[#687089] hover:text-[#15172B] hover:bg-white/80 transition-all"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="px-4 py-1.5 rounded-full text-xs font-medium text-[#687089] hover:text-[#15172B] hover:bg-white/80 transition-all"
          >
            FAQ
          </a>
        </nav>

        {/* Right CTA & Controls */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full bg-[#F7F8FF] hover:bg-[#E9E2FF]/40 border border-[#E9EAF2] flex items-center justify-center text-[#687089] hover:text-[#633BFF] transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User profile / Get Started */}
          {user ? (
            <button
              onClick={onOpenDashboard}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white shadow-md shadow-[#633BFF]/25 hover:shadow-lg hover:shadow-[#633BFF]/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Launch Business OS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white shadow-md shadow-[#633BFF]/25 hover:shadow-lg hover:shadow-[#633BFF]/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </header>
  );
};


import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Check, 
  CheckCircle2,
  Building
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';

interface TopHeaderProps {
  onOpenMobileMenu: () => void;
  onOpenCommandCenter: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenMobileMenu,
  onOpenCommandCenter,
}) => {
  const { user, business } = useAuth();
  const { activities, runCommand, isThinking } = useBusiness();
  const [quickInput, setQuickInput] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    runCommand(quickInput);
    setQuickInput('');
    onOpenCommandCenter();
  };

  return (
    <header className="h-20 bg-white border-b border-[#E9EAF2] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      
      {/* Left: Mobile hamburger & Quick Omnibar */}
      <div className="flex items-center space-x-3 flex-1 max-w-2xl">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-[#687089] hover:bg-[#F7F8FF]"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Omnibar Form */}
        <form onSubmit={handleQuickSubmit} className="relative w-full max-w-lg hidden sm:block">
          <div className="relative flex items-center">
            <Sparkles className="w-4 h-4 text-[#633BFF] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder='Ask AI anything, e.g. "Create invoice for John for $500"...'
              className="w-full pl-10 pr-24 py-2.5 rounded-full bg-[#F7F8FF] border border-[#E9EAF2] text-xs font-medium text-[#15172B] placeholder:text-[#687089] focus:outline-none focus:border-[#633BFF] focus:bg-white focus:ring-2 focus:ring-[#633BFF]/10 transition-all"
            />
            <button
              type="submit"
              disabled={isThinking || !quickInput.trim()}
              className="absolute right-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white text-[10px] font-bold shadow-sm disabled:opacity-40 hover:opacity-90 transition-opacity flex items-center space-x-1"
            >
              <span>Dispatch</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </form>

        {/* Mobile Command button */}
        <button
          onClick={onOpenCommandCenter}
          className="sm:hidden flex items-center space-x-1 px-3 py-1.5 rounded-full bg-[#F7F8FF] border border-[#E9EAF2] text-xs font-semibold text-[#633BFF]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Command</span>
        </button>
      </div>

      {/* Right Controls: Business pill, Notifications, Profile */}
      <div className="flex items-center space-x-4">
        
        {/* Business Entity Badge */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#F7F8FF] border border-[#E9EAF2] text-xs font-semibold text-[#15172B]">
          <Building className="w-3.5 h-3.5 text-[#633BFF]" />
          <span className="truncate max-w-[140px]">{business?.name || "Riham's Studio"}</span>
          <span className="px-1.5 py-0.5 rounded-md bg-[#E9E2FF] text-[#633BFF] text-[10px] font-bold">USD</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-full bg-[#F7F8FF] hover:bg-[#E9E2FF]/40 border border-[#E9EAF2] flex items-center justify-center text-[#687089] hover:text-[#633BFF] transition-colors relative"
            aria-label="Agent notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#633BFF] ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-3xl border border-[#E9EAF2] shadow-2xl p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-[#E9EAF2]">
                <h4 className="text-xs font-bold text-[#15172B] uppercase tracking-wider">
                  Agent Activity Stream
                </h4>
                <span className="text-[10px] font-semibold text-[#633BFF] bg-[#E9E2FF]/60 px-2 py-0.5 rounded-full">
                  Live Sync
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2.5 py-2">
                {activities.slice(0, 5).map(act => (
                  <div key={act.id} className="p-2.5 rounded-2xl bg-[#F7F8FF] border border-[#E9EAF2]/60 text-xs flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#15172B] capitalize">
                        {act.agent} Agent
                      </span>
                      <span className="text-[10px] text-[#687089]">
                        {new Date(act.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <span className="font-medium text-[#633BFF] text-[11px]">{act.action}</span>
                    <p className="text-[11px] text-[#687089] leading-snug">{act.details}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#E9EAF2] text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] font-bold text-[#633BFF] hover:underline"
                >
                  Close Stream
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Name matching reference ("Welcome back, Riham! 👋") */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-[#E9EAF2]">
          <div className="relative">
            <img
              src={user?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#633BFF]/20 shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-[#15172B] tracking-tight">
              {user?.full_name || "Riham"}
            </span>
            <span className="text-[10px] text-[#687089]">
              Business Owner
            </span>
          </div>
        </div>

      </div>

    </header>
  );
};


import React from 'react';
import { Sparkles, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E9EAF2] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#E9EAF2]">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#633BFF] via-[#4285FF] to-[#62D9ED] p-0.5 shadow-md shadow-[#633BFF]/20">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <span className="font-extrabold text-xl bg-gradient-to-br from-[#633BFF] to-[#4285FF] bg-clip-text text-transparent">
                    B
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base text-[#15172B] tracking-tight">
                  BusinessPilot AI
                </span>
                <span className="text-[11px] font-medium text-[#687089] -mt-0.5">
                  Your Business. Your AI Workforce.
                </span>
              </div>
            </div>

            <p className="text-xs text-[#687089] max-w-sm leading-relaxed">
              The next-generation AI business operating system uniting conversational orchestration, specialized autonomous agents, and real PayPal developer sandbox settlements.
            </p>

            {/* Live Status indicator */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All 6 AI Agents Operational</span>
            </div>
          </div>

          {/* Col 2: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#15172B] uppercase tracking-wider">AI Workforce</h4>
            <ul className="space-y-2 text-xs text-[#687089]">
              <li><a href="#workforce" className="hover:text-[#633BFF] transition-colors">Sales Agent</a></li>
              <li><a href="#workforce" className="hover:text-[#633BFF] transition-colors">Finance Agent</a></li>
              <li><a href="#workforce" className="hover:text-[#633BFF] transition-colors">Support Agent</a></li>
              <li><a href="#workforce" className="hover:text-[#633BFF] transition-colors">Marketing Agent</a></li>
              <li><a href="#workforce" className="hover:text-[#633BFF] transition-colors">Operations Agent</a></li>
              <li><a href="#workforce" className="hover:text-[#633BFF] transition-colors">Business Analyst</a></li>
            </ul>
          </div>

          {/* Col 3: Integrations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#15172B] uppercase tracking-wider">Integrations</h4>
            <ul className="space-y-2 text-xs text-[#687089]">
              <li><a href="#paypal" className="hover:text-[#633BFF] transition-colors">PayPal REST API</a></li>
              <li><a href="#paypal" className="hover:text-[#633BFF] transition-colors">PayPal Sandbox Orders</a></li>
              <li><a href="#paypal" className="hover:text-[#633BFF] transition-colors">Webhook Verification</a></li>
              <li><span className="text-[#687089]/60">Supabase PostgreSQL</span></li>
              <li><span className="text-[#687089]/60">Gemini 1.5 Multi-Agent</span></li>
            </ul>
          </div>

          {/* Col 4: Legal & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#15172B] uppercase tracking-wider">Security & Trust</h4>
            <ul className="space-y-2 text-xs text-[#687089]">
              <li className="flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Supabase RLS</span>
              </li>
              <li><span>Human Approval Gates</span></li>
              <li><span>Encrypted Credentials</span></li>
              <li><span>Audit Activity Logs</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#687089] gap-4">
          <p>© 2026 BusinessPilot AI. Designed for elite AI business operations.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-[#633BFF] cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#633BFF] cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-[#633BFF] cursor-pointer">Sandbox Documentation</span>
          </div>
        </div>

      </div>
    </footer>
  );
};


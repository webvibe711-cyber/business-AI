import React, { useState } from 'react';
import { 
  Megaphone, 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  Calendar, 
  TrendingUp, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';

export const MarketingAgentWorkspace: React.FC = () => {
  const [topic, setTopic] = useState('Autonomous AI Business Operating System & PayPal Integration');
  const [platform, setPlatform] = useState<'linkedin' | 'x' | 'newsletter'>('linkedin');
  const [generatedContent, setGeneratedContent] = useState<string>(
    `🚀 Running a modern business shouldn't feel like stitching together 12 disconnected tools.\n\nToday, we're unveiling how BusinessPilot AI connects:\n1️⃣ Multi-Agent AI Dispatching (Sales, Finance, Support, Ops)\n2️⃣ Official PayPal Sandbox REST API billing & instant capture\n3️⃣ True Row Level Security on Supabase PostgreSQL\n\nWhen your AI Finance Agent can draft an invoice, request owner approval, and capture PayPal payment in under 60 seconds, you realize the future of SaaS isn't another dashboard — it's an AI operating system.\n\n#BusinessPilotAI #AIAgents #Fintech #Automation #PayPal #Startups`
  );
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      if (platform === 'x') {
        setGeneratedContent(
          `Stop wasting 15+ hrs/week creating manual invoices and chasing leads.\n\nMeet @BusinessPilotAI — your multi-agent workforce.\n\n- Natural language orchestrator\n- PayPal Sandbox order & capture\n- Autonomous CRM pipeline scoring\n\nScale operations without scaling overhead. ⚡`
        );
      } else if (platform === 'newsletter') {
        setGeneratedContent(
          `Subject: How Autonomous AI Workforces are Redefining SMB Operations in 2026\n\nDear Founder,\n\nLast month, our customers saw an average revenue velocity jump of +28.5%. The reason? Eliminating context switching.\n\nInstead of jumping between Stripe, Salesforce, Zendesk, and Notion, BusinessPilot AI centralizes all workflows through specialized autonomous agents.\n\nKey takeaways inside this week's briefing:\n• Why Human-in-the-Loop approval is essential for fiduciary security\n• How real-time PayPal REST order capture accelerates cash flow\n\nRead the full playbook on our website.`
        );
      } else {
        setGeneratedContent(
          `🚀 Running a modern business shouldn't feel like stitching together 12 disconnected tools.\n\nToday, we're unveiling how BusinessPilot AI connects:\n1️⃣ Multi-Agent AI Dispatching (Sales, Finance, Support, Ops)\n2️⃣ Official PayPal Sandbox REST API billing & instant capture\n3️⃣ True Row Level Security on Supabase PostgreSQL\n\nWhen your AI Finance Agent can draft an invoice, request owner approval, and capture PayPal payment in under 60 seconds, you realize the future of SaaS isn't another dashboard — it's an AI operating system.\n\n#BusinessPilotAI #AIAgents #Fintech #Automation #PayPal #Startups`
        );
      }
      setIsGenerating(false);
    }, 500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Marketing Agent Header */}
      <div className="bg-gradient-to-r from-amber-50 via-[#F7F8FF] to-white rounded-3xl p-6 border border-amber-200/60 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
            <Megaphone className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-extrabold text-[#15172B]">AI Marketing Agent</h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                Online • Content Studio
              </span>
            </div>
            <p className="text-xs text-[#687089]">
              Produce high-converting promotional copy, social campaigns, thought leadership, and campaign schedules.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Campaign Controls */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E9EAF2] shadow-sm space-y-4">
          <h4 className="text-sm font-bold text-[#15172B] pb-3 border-b border-[#E9EAF2]">
            Campaign Configuration
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-[#15172B] block mb-1">Target Platform</label>
              <div className="grid grid-cols-3 gap-2">
                {(['linkedin', 'x', 'newsletter'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                      platform === p
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-[#F7F8FF] text-[#687089] hover:bg-slate-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-bold text-[#15172B] block mb-1">Campaign Topic / Focus</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2] text-xs font-medium focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-md shadow-amber-500/20 hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Synthesizing Copy...' : 'Generate High-Conversion Copy'}</span>
            </button>
          </div>
        </div>

        {/* Right: Output Canvas */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#E9EAF2] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E9EAF2]">
            <span className="text-xs font-bold text-[#15172B] uppercase tracking-wider">
              Generated Copy ({platform.toUpperCase()})
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#F7F8FF] hover:bg-slate-100 text-[#15172B] text-xs font-bold border border-[#E9EAF2] transition-colors"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied!' : 'Copy Copy'}</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[#F7F8FF] border border-[#E9EAF2] text-xs sm:text-sm text-[#15172B] whitespace-pre-wrap leading-relaxed font-sans min-h-[260px]">
            {generatedContent}
          </div>
        </div>

      </div>

    </div>
  );
};


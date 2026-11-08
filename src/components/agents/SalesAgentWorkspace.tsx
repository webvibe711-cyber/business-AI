import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  Target, 
  Send, 
  UserCheck, 
  Mail, 
  Flame, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';

export const SalesAgentWorkspace: React.FC = () => {
  const { leads, updateLeadStatus, runCommand, isThinking } = useBusiness();
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || '');
  const [generatedPitch, setGeneratedPitch] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const selectedLead = leads.find(l => l.id === selectedLeadId) || leads[0];

  const handleGenerateOutreach = () => {
    if (!selectedLead) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedPitch(
        `Hi ${selectedLead.name.split(' ')[0]},\n\nI noticed ${selectedLead.company || 'your team'} has been expanding its operations. At BusinessPilot AI, we deploy autonomous multi-agent workforces that eliminate 80% of routine invoicing, CRM pipeline tracking, and customer triage.\n\nGiven your ${selectedLead.source} inquiry, I'd love to share how teams in your sector achieved +28.5% faster MRR velocity within 30 days.\n\nWould you have 10 minutes this Thursday afternoon for a focused demonstration?\n\nBest regards,\nRiham\nBusinessPilot AI`
      );
      setIsGenerating(false);
    }, 600);
  };

  const handleAdvanceStatus = (status: any) => {
    if (selectedLead) {
      updateLeadStatus(selectedLead.id, status);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Agent Header Banner */}
      <div className="bg-gradient-to-r from-rose-50 via-[#F7F8FF] to-white rounded-3xl p-6 border border-rose-200/60 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-extrabold text-[#15172B]">AI Sales Agent</h3>
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                Online • Lead Scoring Engine
              </span>
            </div>
            <p className="text-xs text-[#687089]">
              Turn leads into paying accounts with predictive qualification scores & tailored sales sequences.
            </p>
          </div>
        </div>

        <button
          onClick={() => runCommand('Find my most promising leads in the CRM pipeline.')}
          disabled={isThinking}
          className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Score All Pipeline Leads</span>
        </button>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Lead Selector & Scoring */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E9EAF2] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E9EAF2]">
            <h4 className="text-sm font-bold text-[#15172B]">Active CRM Pipeline</h4>
            <span className="text-xs font-semibold text-[#687089]">{leads.length} leads</span>
          </div>

          <div className="space-y-2.5 max-h-[460px] overflow-y-auto">
            {leads.map(lead => {
              const isSelected = lead.id === selectedLeadId;
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-rose-400 bg-rose-50/50 shadow-sm'
                      : 'border-[#E9EAF2] hover:border-rose-200 bg-[#F7F8FF]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#15172B]">{lead.name}</span>
                    <div className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-white border border-[#E9EAF2] text-[10px] font-bold text-rose-600">
                      <Flame className="w-3 h-3 text-rose-500 fill-current" />
                      <span>{lead.score}/100</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 text-[11px] text-[#687089]">
                    <span>{lead.company}</span>
                    <span className="font-bold text-[#15172B]">${lead.value.toLocaleString()}</span>
                  </div>

                  <div className="mt-2 flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white border border-[#E9EAF2] text-[#687089]">
                      {lead.status}
                    </span>
                    <span className="text-[10px] text-[#687089] truncate">
                      Source: {lead.source}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: AI Outreach Generator & Lead Deep Dive */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#E9EAF2] shadow-sm space-y-5">
          {selectedLead ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E9EAF2] gap-3">
                <div>
                  <h4 className="text-base font-extrabold text-[#15172B]">
                    {selectedLead.name}
                  </h4>
                  <p className="text-xs text-[#687089]">
                    {selectedLead.company} • {selectedLead.email}
                  </p>
                </div>

                {/* Pipeline Stage Transitions */}
                <div className="flex items-center space-x-1.5 overflow-x-auto">
                  {(['new', 'contacted', 'qualified', 'proposal', 'won'] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => handleAdvanceStatus(st)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize transition-colors ${
                        selectedLead.status === st
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-[#F7F8FF] text-[#687089] hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lead Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-[#F7F8FF] border border-[#E9EAF2]">
                  <span className="text-[10px] text-[#687089] uppercase font-bold">Deal Size</span>
                  <p className="text-sm font-extrabold text-[#15172B] mt-0.5">
                    ${selectedLead.value.toLocaleString()} USD
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-[#F7F8FF] border border-[#E9EAF2]">
                  <span className="text-[10px] text-[#687089] uppercase font-bold">Intent Score</span>
                  <p className="text-sm font-extrabold text-rose-600 mt-0.5">
                    {selectedLead.score} / 100
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-[#F7F8FF] border border-[#E9EAF2]">
                  <span className="text-[10px] text-[#687089] uppercase font-bold">Lead Source</span>
                  <p className="text-sm font-bold text-[#15172B] mt-0.5 truncate">
                    {selectedLead.source}
                  </p>
                </div>
              </div>

              {/* AI Outreach Generator */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#15172B] flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-rose-600" />
                    <span>Personalized AI Sales Pitch</span>
                  </span>
                  <button
                    onClick={handleGenerateOutreach}
                    disabled={isGenerating}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold border border-rose-200 transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{generatedPitch ? 'Regenerate Pitch' : 'Generate Outreach Pitch'}</span>
                  </button>
                </div>

                {generatedPitch ? (
                  <div className="p-4 rounded-2xl bg-[#F7F8FF] border border-[#E9EAF2] text-xs text-[#15172B] whitespace-pre-wrap leading-relaxed">
                    {generatedPitch}
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-[#F7F8FF]/60 border border-dashed border-[#E9EAF2] text-center text-xs text-[#687089]">
                    Click "Generate Outreach Pitch" to draft an autonomous sales pitch customized to {selectedLead.name}'s industry and intent signals.
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-xs text-[#687089]">
              No leads selected.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};


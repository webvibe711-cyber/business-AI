import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Flame, 
  ArrowRight, 
  DollarSign, 
  CheckCircle2, 
  Sparkles,
  User
} from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';
import type { Lead } from '../../types';

const STAGES: { id: Lead['status']; title: string; color: string }[] = [
  { id: 'new', title: 'New Leads', color: 'border-blue-400 bg-blue-50/50' },
  { id: 'contacted', title: 'Contacted', color: 'border-cyan-400 bg-cyan-50/50' },
  { id: 'qualified', title: 'Qualified', color: 'border-purple-400 bg-purple-50/50' },
  { id: 'proposal', title: 'Proposal Sent', color: 'border-amber-400 bg-amber-50/50' },
  { id: 'won', title: 'Closed Won', color: 'border-emerald-400 bg-emerald-50/50' },
];

export const LeadPipeline: React.FC = () => {
  const { leads, addLead, updateLeadStatus } = useBusiness();
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [value, setValue] = useState('5000');
  const [source, setSource] = useState('Website');

  const totalPipelineValue = leads
    .filter(l => l.status !== 'lost')
    .reduce((sum, l) => sum + l.value, 0);

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addLead({
      business_id: 'biz_01_riham',
      name,
      email,
      company,
      value: parseFloat(value) || 3000,
      status: 'new',
      score: 75,
      source,
      notes: 'Added to CRM pipeline',
    });
    setName('');
    setEmail('');
    setCompany('');
    setShowAddModal(false);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E9EAF2] gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#15172B] tracking-tight">
            CRM & Lead Pipeline
          </h2>
          <p className="text-xs text-[#687089]">
            Autonomous deal qualification, predictive lead scores, and sales stage progression
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-3.5 py-1.5 rounded-full bg-[#E9E2FF] text-[#633BFF] text-xs font-bold">
            Total Pipeline: ${totalPipelineValue.toLocaleString()} USD
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white text-xs font-bold shadow-md shadow-[#633BFF]/25 hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Lead</span>
          </button>
        </div>
      </div>

      {/* Kanban Pipeline Board */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {STAGES.map(stage => {
          const stageLeads = leads.filter(l => l.status === stage.id);
          const stageValue = stageLeads.reduce((s, l) => s + l.value, 0);

          return (
            <div key={stage.id} className="bg-[#F7F8FF]/70 rounded-3xl p-4 border border-[#E9EAF2] flex flex-col justify-between min-h-[500px]">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E9EAF2]">
                  <span className="font-extrabold text-xs text-[#15172B] uppercase tracking-wider">
                    {stage.title}
                  </span>
                  <span className="w-5 h-5 rounded-full bg-white text-[#687089] text-[10px] font-bold flex items-center justify-center border border-[#E9EAF2]">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="text-[11px] font-semibold text-[#687089] mb-3">
                  ${stageValue.toLocaleString()} USD
                </div>

                {/* Cards */}
                <div className="space-y-3">
                  {stageLeads.map(lead => (
                    <div
                      key={lead.id}
                      className="bg-white rounded-2xl p-3.5 border border-[#E9EAF2] hover:border-[#633BFF]/40 shadow-xs hover:shadow-md transition-all space-y-2 group"
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-bold text-xs text-[#15172B] leading-tight">
                          {lead.name}
                        </span>
                        <div className="flex items-center space-x-0.5 text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                          <Flame className="w-3 h-3 fill-current" />
                          <span>{lead.score}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-[#687089] truncate">
                        {lead.company || lead.email}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#E9EAF2]/60 text-xs">
                        <span className="font-extrabold text-[#15172B]">
                          ${lead.value.toLocaleString()}
                        </span>
                        
                        {/* Quick Advance button */}
                        {stage.id !== 'won' && (
                          <button
                            onClick={() => {
                              const order: Lead['status'][] = ['new', 'contacted', 'qualified', 'proposal', 'won'];
                              const nextIdx = order.indexOf(lead.status) + 1;
                              if (nextIdx < order.length) {
                                updateLeadStatus(lead.id, order[nextIdx]);
                              }
                            }}
                            className="w-6 h-6 rounded-full bg-[#F7F8FF] hover:bg-[#633BFF] hover:text-white flex items-center justify-center text-[#687089] transition-colors"
                            title="Advance Stage"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E9EAF2] shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-[#15172B]">Add Prospect Lead</h3>
            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#15172B] block mb-1">Lead Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alexander Hayes"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#15172B] block mb-1">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Hyperion Analytics"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
                />
              </div>

              <div>
                <label className="font-bold text-[#15172B] block mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@hyperion.dev"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
                />
              </div>

              <div>
                <label className="font-bold text-[#15172B] block mb-1">Estimated Value ($ USD)</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full border border-[#E9EAF2] text-[#687089] hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white font-bold shadow-sm"
                >
                  Add to Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Sparkles, Target, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete }) => {
  const { completeOnboarding, business } = useAuth();
  const [name, setName] = useState(business?.name || "Riham's Digital Studio");
  const [industry, setIndustry] = useState(business?.industry || 'Creative Tech & AI Services');
  const [size, setSize] = useState(business?.size || '11-50 employees');
  const [description, setDescription] = useState(business?.description || 'Full-service digital engineering & AI product consultancy.');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    'Scale recurring retainer revenue',
    'Automate invoice collection',
    'Accelerate CRM pipeline with AI agents',
  ]);

  if (!isOpen) return null;

  const availableGoals = [
    'Scale recurring retainer revenue',
    'Automate invoice collection',
    'Accelerate CRM pipeline with AI agents',
    'Provide 24/7 autonomous customer triage',
    'Optimize cashflow with PayPal Sandbox',
  ];

  const toggleGoal = (g: string) => {
    if (selectedGoals.includes(g)) {
      setSelectedGoals(selectedGoals.filter(x => x !== g));
    } else {
      setSelectedGoals([...selectedGoals, g]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeOnboarding({
      name,
      industry,
      size,
      description,
      goals: selectedGoals,
    });
    onComplete();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#15172B]/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl max-w-lg w-full border border-[#E9EAF2] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 bg-[#F7F8FF] border-b border-[#E9EAF2] flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#633BFF] to-[#4285FF] flex items-center justify-center text-white shadow-md shadow-[#633BFF]/20">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#633BFF] bg-[#E9E2FF]/80 px-2 py-0.5 rounded-full">
                Setup Business Profile
              </span>
              <h3 className="text-base font-extrabold text-[#15172B] mt-0.5">
                Onboard Your Company
              </h3>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div>
              <label className="font-bold text-[#15172B] block mb-1">Company / Business Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2] font-semibold text-[#15172B]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[#15172B] block mb-1">Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
                >
                  <option value="Creative Tech & AI Services">Creative Tech & AI</option>
                  <option value="SaaS & Digital Products">SaaS & Software</option>
                  <option value="Agency & Consulting">Agency & Consulting</option>
                  <option value="E-Commerce & Retail">E-Commerce</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#15172B] block mb-1">Team Size</label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
                >
                  <option value="1-10 employees">1-10 employees</option>
                  <option value="11-50 employees">11-50 employees</option>
                  <option value="50+ employees">50+ employees</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-[#15172B] block mb-1">Mission / Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
              />
            </div>

            <div>
              <label className="font-bold text-[#15172B] block mb-2">Key Business Objectives</label>
              <div className="space-y-1.5">
                {availableGoals.map(goal => {
                  const isChecked = selectedGoals.includes(goal);
                  return (
                    <div
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                        isChecked
                          ? 'border-[#633BFF] bg-[#E9E2FF]/30 text-[#15172B] font-semibold'
                          : 'border-[#E9EAF2] text-[#687089] hover:bg-slate-50'
                      }`}
                    >
                      <span>{goal}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-[#633BFF]" />}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white font-bold text-xs shadow-md shadow-[#633BFF]/25 hover:shadow-lg transition-all flex items-center justify-center space-x-1.5 mt-4"
            >
              <span>Synchronize AI Workforce & Launch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


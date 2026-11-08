import React from 'react';
import { 
  BarChart2, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  DollarSign, 
  Users 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { useBusiness } from '../../context/BusinessContext';

const PIPELINE_DISTRIBUTION = [
  { stage: 'New', count: 1, value: 3200 },
  { stage: 'Contacted', count: 1, value: 7500 },
  { stage: 'Qualified', count: 1, value: 12500 },
  { stage: 'Proposal', count: 1, value: 4800 },
  { stage: 'Won', count: 1, value: 9400 },
];

export const AnalystAgentWorkspace: React.FC = () => {
  const { invoices, payments, customers, leads, runCommand } = useBusiness();

  const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalBilled = invoices.reduce((sum, i) => sum + i.total, 0);
  const collectionRate = totalBilled > 0 ? ((totalCollected / totalBilled) * 100).toFixed(1) : '100';

  return (
    <div className="space-y-6">
      
      {/* Analyst Header */}
      <div className="bg-gradient-to-r from-purple-50 via-[#F7F8FF] to-white rounded-3xl p-6 border border-purple-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-extrabold text-[#15172B]">AI Business Analyst Agent</h3>
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                Online • Predictive Intelligence
              </span>
            </div>
            <p className="text-xs text-[#687089]">
              Reconciles revenue streams, computes cohort health metrics, and generates strategic growth recommendations.
            </p>
          </div>
        </div>

        <button
          onClick={() => runCommand('Analyse my monthly revenue and growth trajectory.')}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate Executive Briefing</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-5 border border-[#E9EAF2] shadow-sm">
          <span className="text-[11px] font-bold text-[#687089] uppercase">Collection Efficiency</span>
          <div className="mt-2 text-2xl font-extrabold text-[#15172B]">{collectionRate}%</div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">PayPal Sandbox reconciled</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E9EAF2] shadow-sm">
          <span className="text-[11px] font-bold text-[#687089] uppercase">MoM Revenue Pace</span>
          <div className="mt-2 text-2xl font-extrabold text-[#633BFF]">+28.5%</div>
          <span className="text-[10px] text-[#687089] mt-1 block">Above Q4 baseline forecast</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E9EAF2] shadow-sm">
          <span className="text-[11px] font-bold text-[#687089] uppercase">Avg Deal Size</span>
          <div className="mt-2 text-2xl font-extrabold text-[#15172B]">
            ${(totalBilled / (invoices.length || 1)).toFixed(0)} USD
          </div>
          <span className="text-[10px] text-[#687089] mt-1 block">Across active accounts</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E9EAF2] shadow-sm">
          <span className="text-[11px] font-bold text-[#687089] uppercase">Client Retention</span>
          <div className="mt-2 text-2xl font-extrabold text-emerald-600">94.2%</div>
          <span className="text-[10px] text-[#687089] mt-1 block">Zero enterprise churn</span>
        </div>
      </div>

      {/* Chart & Actionable Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recharts Pipeline Stage Distribution */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#E9EAF2] shadow-sm space-y-4">
          <h4 className="text-sm font-bold text-[#15172B]">
            Pipeline Value Distribution by Stage ($ USD)
          </h4>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PIPELINE_DISTRIBUTION}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F2F6" vertical={false} />
                <XAxis dataKey="stage" stroke="#8E95A9" fontSize={11} tickLine={false} />
                <YAxis stroke="#8E95A9" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E9EAF2' }}
                  formatter={(val: any) => [`$${val.toLocaleString()}`, 'Pipeline Value']}
                />
                <Bar dataKey="value" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Actionable Analyst Insights */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E9EAF2] shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-[#15172B] pb-3 border-b border-[#E9EAF2]">
              Actionable AI Insights
            </h4>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#F7F8FF] border border-[#E9EAF2] space-y-1">
                <span className="font-bold text-[#15172B] block">1. Accelerate Aurora Tech Receivables</span>
                <p className="text-[11px] text-[#687089] leading-snug">
                  Invoice INV-2026-003 ($2,500.00) is awaiting payment. Having Finance Agent dispatch an automated PayPal link will secure 100% of November targets.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F8FF] border border-[#E9EAF2] space-y-1">
                <span className="font-bold text-[#15172B] block">2. High-Yield Prospect: Alexander Hayes</span>
                <p className="text-[11px] text-[#687089] leading-snug">
                  Intent score stands at 92/100 with an estimated value of $12,500.00. Assigning a dedicated sales cadence is recommended.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200/80 text-[11px] text-purple-900 font-medium">
            💡 <strong>Forecast:</strong> Maintaining current velocity projects Q4 close at <strong>$32,400.00 USD</strong>.
          </div>
        </div>

      </div>

    </div>
  );
};


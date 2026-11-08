import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Zap, 
  Calendar,
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useBusiness } from '../../context/BusinessContext';

const MONTHLY_TREND = [
  { month: 'Jun', billed: 15000, collected: 14200 },
  { month: 'Jul', billed: 17500, collected: 16800 },
  { month: 'Aug', billed: 19000, collected: 18400 },
  { month: 'Sep', billed: 21000, collected: 19900 },
  { month: 'Oct', billed: 23500, collected: 22100 },
  { month: 'Nov (Current)', billed: 27280, collected: 24780 },
];

const AGENT_WORKLOAD = [
  { agent: 'Finance', toolCalls: 48, fill: '#10B981' },
  { agent: 'Sales', toolCalls: 39, fill: '#F43F5E' },
  { agent: 'Operations', toolCalls: 31, fill: '#06B6D4' },
  { agent: 'Support', toolCalls: 27, fill: '#3B82F6' },
  { agent: 'Marketing', toolCalls: 22, fill: '#F59E0B' },
  { agent: 'Analyst', toolCalls: 19, fill: '#8B5CF6' },
];

export const AnalyticsDashboard: React.FC = () => {
  const { invoices, payments, leads, customers } = useBusiness();
  const [timeframe, setTimeframe] = useState<'6m' | '1y'>('6m');

  const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalBilled = invoices.reduce((sum, i) => sum + i.total, 0);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E9EAF2] gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#15172B] tracking-tight">
            Executive Business Analytics
          </h2>
          <p className="text-xs text-[#687089]">
            Reconciled revenue trends, pipeline conversion rates, and autonomous workforce telemetry
          </p>
        </div>

        <div className="inline-flex items-center p-1 rounded-full bg-[#F7F8FF] border border-[#E9EAF2]">
          <button
            onClick={() => setTimeframe('6m')}
            className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
              timeframe === '6m' ? 'bg-white text-[#15172B] shadow-sm' : 'text-[#687089]'
            }`}
          >
            Last 6 Months
          </button>
          <button
            onClick={() => setTimeframe('1y')}
            className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
              timeframe === '1y' ? 'bg-white text-[#15172B] shadow-sm' : 'text-[#687089]'
            }`}
          >
            Trailing 12M
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-5 border border-[#E9EAF2] shadow-sm">
          <span className="text-xs font-bold text-[#687089] uppercase">Reconciled MRR</span>
          <div className="mt-2 text-2xl font-extrabold text-[#15172B]">$24,780 USD</div>
          <div className="mt-1 flex items-center space-x-1 text-xs text-emerald-600 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+28.5% Growth Pace</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E9EAF2] shadow-sm">
          <span className="text-xs font-bold text-[#687089] uppercase">PayPal Capture Rate</span>
          <div className="mt-2 text-2xl font-extrabold text-[#059669]">96.8%</div>
          <span className="mt-1 text-xs text-[#687089] block">Frictionless Sandbox checkout</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E9EAF2] shadow-sm">
          <span className="text-xs font-bold text-[#687089] uppercase">Customer Lifetime Value</span>
          <div className="mt-2 text-2xl font-extrabold text-[#633BFF]">$6,195 USD</div>
          <span className="mt-1 text-xs text-[#687089] block">Across VIP accounts</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E9EAF2] shadow-sm">
          <span className="text-xs font-bold text-[#687089] uppercase">Total AI Tool Calls</span>
          <div className="mt-2 text-2xl font-extrabold text-[#15172B]">186 Executions</div>
          <span className="mt-1 text-xs text-emerald-600 font-semibold block">100% Audit logged</span>
        </div>
      </div>

      {/* Main Chart: Billed vs Collected Volume */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9EAF2] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E9EAF2] gap-3">
          <div>
            <h3 className="text-base font-extrabold text-[#15172B]">Billed vs. Collected Cashflow ($ USD)</h3>
            <p className="text-xs text-[#687089]">Monthly gross volume compared to captured PayPal Sandbox payments</p>
          </div>

          <div className="flex items-center space-x-4 text-xs font-medium">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#633BFF]" />
              <span>Collected (PayPal)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#E9E2FF]" />
              <span>Billed Invoices</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MONTHLY_TREND}>
              <defs>
                <linearGradient id="colGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#633BFF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#633BFF" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F2F6" vertical={false} />
              <XAxis dataKey="month" stroke="#8E95A9" fontSize={12} tickLine={false} />
              <YAxis stroke="#8E95A9" fontSize={12} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E9EAF2' }}
                formatter={(val: any) => [`$${val.toLocaleString()}`, '']}
              />
              <Area type="monotone" dataKey="billed" stroke="#C4B5FD" strokeWidth={2} fillOpacity={0.2} fill="#E9E2FF" />
              <Area type="monotone" dataKey="collected" stroke="#633BFF" strokeWidth={3} fillOpacity={1} fill="url(#colGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row: AI Workforce Utilization */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9EAF2] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E9EAF2]">
          <div>
            <h3 className="text-base font-extrabold text-[#15172B]">AI Agent Workload Distribution</h3>
            <p className="text-xs text-[#687089]">Autonomous tool execution breakdown across specialized agents</p>
          </div>
          <span className="text-xs font-bold text-[#633BFF] bg-[#E9E2FF]/60 px-3 py-1 rounded-full">
            All 6 Active
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={AGENT_WORKLOAD}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F2F6" vertical={false} />
              <XAxis dataKey="agent" stroke="#8E95A9" fontSize={12} tickLine={false} />
              <YAxis stroke="#8E95A9" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E9EAF2' }}
                formatter={(val: any) => [`${val} tool calls`, 'Volume']}
              />
              <Bar dataKey="toolCalls" radius={[8, 8, 0, 0]}>
                {AGENT_WORKLOAD.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};


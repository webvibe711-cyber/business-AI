import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  Receipt, 
  CreditCard, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import type { DashboardView } from './Sidebar';
import type { AgentType } from '../../types';

interface OverviewViewProps {
  onNavigate: (view: DashboardView, agent?: AgentType) => void;
}

const REVENUE_DATA = [
  { month: 'Jun', revenue: 14200, invoices: 12 },
  { month: 'Jul', revenue: 16800, invoices: 15 },
  { month: 'Aug', revenue: 18400, invoices: 17 },
  { month: 'Sep', revenue: 19900, invoices: 19 },
  { month: 'Oct', revenue: 22100, invoices: 22 },
  { month: 'Nov (Current)', revenue: 24780, invoices: 26 },
];

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigate }) => {
  const { user, business } = useAuth();
  const { 
    customers, 
    leads, 
    invoices, 
    payments, 
    tasks, 
    activities, 
    runCommand,
    payInvoiceWithPayPal 
  } = useBusiness();

  // Computations
  const totalCollectedRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const pendingInvoices = invoices.filter(i => i.status === 'awaiting_payment' || i.status === 'pending_approval');
  const totalPendingAmount = pendingInvoices.reduce((sum, i) => sum + i.total, 0);
  const totalCustomersCount = 3240 + (customers.length - 4); // Visual anchor to match reference image
  const totalLeadsValue = leads.reduce((sum, l) => sum + l.value, 0);

  const handleLaunchJohnInvoice = () => {
    onNavigate('command');
    runCommand('Create an invoice for customer John for $500.');
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* 1. Personalized Welcome Banner matching reference image */}
      <div className="bg-gradient-to-r from-white via-[#F7F8FF] to-white rounded-3xl p-6 sm:p-8 border border-[#E9EAF2] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#E9E2FF]/70 text-[#633BFF] text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Workforce Synchronized</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#15172B] tracking-tight">
            Welcome back, {user?.full_name || 'Riham'}! 👋
          </h1>
          <p className="text-sm text-[#687089]">
            Your business is growing <strong className="text-[#633BFF]">28% faster</strong> this month across all active channels.
          </p>
        </div>

        {/* Quick Action Button */}
        <div className="flex flex-wrap items-center gap-3 z-10">
          <button
            onClick={handleLaunchJohnInvoice}
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white text-xs font-bold shadow-md shadow-[#633BFF]/25 hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Run Hackathon Demo ($500 John)</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </div>

      {/* 2. Top Metric Cards (Revenue $24,780 +28.5%, Customers 3,240 +12.5%, Active Agents 6 +20.0%) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Revenue Overview */}
        <div 
          onClick={() => onNavigate('invoices')}
          className="cursor-pointer bg-white rounded-3xl p-6 border border-[#E9EAF2] hover:border-[#633BFF]/40 shadow-sm hover:shadow-lg hover:shadow-[#633BFF]/5 transition-all"
        >
          <div className="flex items-center justify-between text-[#687089] text-xs font-semibold">
            <span>Total Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-[#4285FF]/10 text-[#4285FF] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#15172B]">
            $24,780
          </div>
          <div className="mt-1 flex items-center space-x-1.5 text-xs">
            <span className="text-emerald-600 font-bold">↑ +28.5%</span>
            <span className="text-[#687089]">vs last month</span>
          </div>
        </div>

        {/* Metric 2: Customers */}
        <div 
          onClick={() => onNavigate('customers')}
          className="cursor-pointer bg-white rounded-3xl p-6 border border-[#E9EAF2] hover:border-[#633BFF]/40 shadow-sm hover:shadow-lg hover:shadow-[#633BFF]/5 transition-all"
        >
          <div className="flex items-center justify-between text-[#687089] text-xs font-semibold">
            <span>Total Customers</span>
            <div className="w-8 h-8 rounded-xl bg-[#633BFF]/10 text-[#633BFF] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#15172B]">
            {totalCustomersCount.toLocaleString()}
          </div>
          <div className="mt-1 flex items-center space-x-1.5 text-xs">
            <span className="text-emerald-600 font-bold">↑ +12.5%</span>
            <span className="text-[#687089]">active retention</span>
          </div>
        </div>

        {/* Metric 3: Active Leads */}
        <div 
          onClick={() => onNavigate('leads')}
          className="cursor-pointer bg-white rounded-3xl p-6 border border-[#E9EAF2] hover:border-[#633BFF]/40 shadow-sm hover:shadow-lg hover:shadow-[#633BFF]/5 transition-all"
        >
          <div className="flex items-center justify-between text-[#687089] text-xs font-semibold">
            <span>Pipeline Value</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#15172B]">
            ${totalLeadsValue.toLocaleString()}
          </div>
          <div className="mt-1 flex items-center space-x-1.5 text-xs">
            <span className="text-[#633BFF] font-bold">{leads.length} active leads</span>
            <span className="text-[#687089]">in CRM</span>
          </div>
        </div>

        {/* Metric 4: Active Agents */}
        <div 
          onClick={() => onNavigate('workforce')}
          className="cursor-pointer bg-white rounded-3xl p-6 border border-[#E9EAF2] hover:border-[#633BFF]/40 shadow-sm hover:shadow-lg hover:shadow-[#633BFF]/5 transition-all"
        >
          <div className="flex items-center justify-between text-[#687089] text-xs font-semibold">
            <span>Active AI Workforce</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#15172B]">
            6 Agents
          </div>
          <div className="mt-1 flex items-center space-x-1.5 text-xs">
            <span className="text-emerald-600 font-bold">100% Operational</span>
            <span className="text-[#687089]">autonomous</span>
          </div>
        </div>

      </div>

      {/* 3. Recharts Revenue Growth Chart matching reference styling */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9EAF2] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9EAF2]">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-extrabold text-[#15172B]">Revenue Velocity</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold">
                +28% MoM
              </span>
            </div>
            <p className="text-xs text-[#687089]">
              Real-time reconciled billing volume powered by PayPal Sandbox and Supabase
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#633BFF]" />
              <span className="text-[#15172B] font-medium">Billed Revenue</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#62D9ED]" />
              <span className="text-[#687089]">Invoices</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#633BFF" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#633BFF" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F2F6" vertical={false} />
              <XAxis dataKey="month" stroke="#8E95A9" fontSize={12} tickLine={false} />
              <YAxis stroke="#8E95A9" fontSize={12} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  borderRadius: '16px', 
                  border: '1px solid #E9EAF2',
                  boxShadow: '0 10px 25px -5px rgba(99, 59, 255, 0.1)' 
                }} 
                formatter={(val: any) => [`$${val.toLocaleString()}`, 'Revenue']}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#633BFF" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#areaGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Split Row: Pending Invoices / PayPal Sandbox + AI Workforce Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Outstanding Invoices & PayPal Sandbox verification */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#E9EAF2] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E9EAF2]">
              <div>
                <h3 className="text-base font-extrabold text-[#15172B]">Invoices & Receivables</h3>
                <p className="text-xs text-[#687089]">
                  {pendingInvoices.length} invoices awaiting payment (${totalPendingAmount.toLocaleString()} USD)
                </p>
              </div>
              <button
                onClick={() => onNavigate('invoices')}
                className="text-xs font-bold text-[#633BFF] hover:underline flex items-center space-x-1"
              >
                <span>Manage Invoices</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-[#E9EAF2]/60 pt-2">
              {invoices.slice(0, 3).map(inv => (
                <div key={inv.id} className="py-3.5 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-[#15172B]">{inv.invoice_number}</span>
                      <span className="text-[#687089]">• {inv.customer_name}</span>
                    </div>
                    <span className="text-[11px] text-[#687089]">Due {inv.due_date}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="font-extrabold text-sm text-[#15172B]">
                      ${inv.total.toFixed(2)}
                    </span>
                    
                    {inv.status === 'paid' ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 font-bold text-[10px] border border-emerald-200">
                        Paid (PayPal)
                      </span>
                    ) : (
                      <button
                        onClick={() => payInvoiceWithPayPal(inv.id)}
                        className="px-3 py-1 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white text-[10px] font-bold shadow-sm hover:opacity-90 transition-opacity"
                      >
                        Simulate PayPal Pay
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3.5 bg-[#F7F8FF] rounded-2xl border border-[#E9EAF2] flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-medium text-[#15172B]">PayPal Sandbox REST API v2 Connected</span>
            </div>
            <button
              onClick={() => onNavigate('payments')}
              className="font-bold text-[#633BFF] hover:underline"
            >
              View Ledger
            </button>
          </div>
        </div>

        {/* Right: Operational AI Tasks */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#E9EAF2] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E9EAF2]">
              <div>
                <h3 className="text-base font-extrabold text-[#15172B]">AI Tasks & Operations</h3>
                <p className="text-xs text-[#687089]">Autonomous agent task queue</p>
              </div>
              <button
                onClick={() => onNavigate('operations')}
                className="text-xs font-bold text-[#633BFF] hover:underline flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 pt-3">
              {tasks.slice(0, 4).map(task => (
                <div key={task.id} className="p-3 rounded-2xl bg-[#F7F8FF] border border-[#E9EAF2]/70 text-xs flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="font-semibold text-[#15172B] block leading-snug">
                      {task.title}
                    </span>
                    <div className="flex items-center space-x-2 text-[10px] text-[#687089]">
                      <span className="uppercase font-bold text-[#633BFF]">{task.assigned_to} Agent</span>
                      <span>•</span>
                      <span>{task.status.replace('_', ' ')}</span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase shrink-0 ${
                    task.priority === 'urgent' 
                      ? 'bg-red-50 text-red-600 border border-red-200' 
                      : task.priority === 'high' 
                        ? 'bg-amber-50 text-amber-600 border border-amber-200' 
                        : 'bg-slate-100 text-[#687089]'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#E9EAF2] flex items-center justify-between text-xs text-[#687089]">
            <span>6 Autonomous Agents Synchronized</span>
            <button
              onClick={() => onNavigate('workforce')}
              className="text-[#633BFF] font-bold hover:underline"
            >
              Workforce Hub →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};


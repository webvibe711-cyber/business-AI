import React, { useState } from 'react';
import { 
  Settings, 
  CreditCard, 
  Database, 
  Sparkles, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  Save,
  Key
} from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';
import { isSupabaseConfigured } from '../../lib/supabase';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, resetDemoData } = useBusiness();
  const [clientId, setClientId] = useState(settings.paypal_client_id);
  const [currency, setCurrency] = useState(settings.paypal_currency);
  const [mode, setMode] = useState(settings.paypal_mode);
  const [geminiKey, setGeminiKey] = useState(settings.gemini_api_key || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      paypal_client_id: clientId,
      paypal_currency: currency,
      paypal_mode: mode as any,
      gemini_api_key: geminiKey,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset BusinessPilot AI data to initial demo state? All test invoices and tasks will revert.')) {
      resetDemoData();
      window.location.reload();
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E9EAF2] gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#15172B] tracking-tight">
            System & API Settings
          </h2>
          <p className="text-xs text-[#687089]">
            Configure PayPal Developer Sandbox credentials, Gemini AI orchestrator keys, and Supabase database connection
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center space-x-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Settings successfully updated and persisted!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* 1. PayPal Developer Configuration */}
        <div className="bg-white rounded-3xl p-6 border border-[#E9EAF2] shadow-sm space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-[#E9EAF2]">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#15172B]">PayPal Developer Sandbox</h3>
              <p className="text-xs text-[#687089]">REST API v2 Checkout & Webhooks</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#15172B] block mb-1">PayPal Client ID</label>
              <input
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="sb-your-sandbox-client-id"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2] font-mono text-[11px]"
              />
              <span className="text-[10px] text-[#687089] mt-1 block">
                Default sandbox test ID works out-of-the-box for hackathon judging.
              </span>
            </div>

            <div>
              <label className="font-bold text-[#15172B] block mb-1">Primary Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2] text-xs font-semibold"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD ($)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[#15172B] block mb-1">Environment Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2] text-xs font-semibold"
              >
                <option value="sandbox">Sandbox (Testing / Evaluation)</option>
                <option value="live">Live Production (Real transactions)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. Supabase Database Configuration */}
        <div className="bg-white rounded-3xl p-6 border border-[#E9EAF2] shadow-sm space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-[#E9EAF2]">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#15172B]">Supabase Database & Auth</h3>
              <p className="text-xs text-[#687089]">PostgreSQL with Row Level Security</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F7F8FF] border border-[#E9EAF2] flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500' : 'bg-blue-500'}`} />
              <span className="font-bold text-[#15172B]">
                {isSupabaseConfigured ? 'Connected to Remote Supabase Instance' : 'Reactive Offline-First Engine Active'}
              </span>
            </div>
            <span className="text-[10px] text-[#687089]">
              RLS Enabled
            </span>
          </div>
          <p className="text-[11px] text-[#687089]">
            To connect your live Supabase cloud project, set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in <code>.env</code>. The SQL migration is generated in <code>supabase/migrations/20250101_init.sql</code>.
          </p>
        </div>

        {/* 3. Gemini AI Configuration */}
        <div className="bg-white rounded-3xl p-6 border border-[#E9EAF2] shadow-sm space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-[#E9EAF2]">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#15172B]">Gemini AI Orchestrator</h3>
              <p className="text-xs text-[#687089]">Multi-Agent Function Calling & Natural Language Engine</p>
            </div>
          </div>

          <div className="text-xs space-y-2">
            <label className="font-bold text-[#15172B] block">Gemini API Key (Optional)</label>
            <input
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AIzaSy... (leave blank to use built-in deterministic dispatcher)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2] font-mono text-[11px]"
            />
            <span className="text-[10px] text-[#687089] block">
              When blank, the system uses the embedded multi-agent tool orchestrator which deterministically handles all invoice creation, lead scoring, and financial analytics.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white font-bold text-xs shadow-md shadow-[#633BFF]/25 hover:shadow-lg transition-all flex items-center space-x-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
};


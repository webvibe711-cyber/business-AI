import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  ArrowRight,
  TrendingUp,
  Receipt,
  Users,
  Target,
  RefreshCw,
  Zap
} from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';
import type { AgentType } from '../../types';

export const CommandCenter: React.FC = () => {
  const { 
    conversation, 
    runCommand, 
    isThinking, 
    activeExecutingAgent,
    pendingApproval,
    approvePendingAction,
    rejectPendingAction
  } = useBusiness();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation, isThinking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;
    const prompt = input;
    setInput('');
    runCommand(prompt);
  };

  const handleQuickPrompt = (prompt: string) => {
    if (isThinking) return;
    runCommand(prompt);
  };

  const quickPrompts = [
    { label: 'Create an invoice for John for $500', prompt: 'Create an invoice for customer John for $500.' },
    { label: 'Show pending payments', prompt: 'Show my pending payments and outstanding invoices.' },
    { label: 'Find promising leads', prompt: 'Find my most promising leads in the CRM pipeline.' },
    { label: 'Prepare customer follow-ups', prompt: 'Prepare follow-up messages for customers.' },
    { label: 'Analyse monthly revenue', prompt: 'Analyse my monthly revenue and growth trajectory.' },
  ];

  const getAgentColor = (agent?: AgentType) => {
    switch (agent) {
      case 'finance': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'sales': return 'bg-rose-50 text-rose-600 border-rose-200';
      case 'marketing': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'support': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'operations': return 'bg-cyan-50 text-cyan-600 border-cyan-200';
      case 'analyst': return 'bg-purple-50 text-purple-600 border-purple-200';
      default: return 'bg-[#E9E2FF] text-[#633BFF] border-[#633BFF]/30';
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col bg-white">
      
      {/* Command Center Header */}
      <div className="px-6 py-4 border-b border-[#E9EAF2] bg-[#F7F8FF]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#633BFF] to-[#4285FF] flex items-center justify-center text-white shadow-md shadow-[#633BFF]/20">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-extrabold text-[#15172B]">Central AI Orchestrator</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-[#059669]">Online</span>
            </div>
            <p className="text-xs text-[#687089]">
              Multi-Agent Routing • Structured Tool Calling • PayPal Sandbox Gateway
            </p>
          </div>
        </div>

        {/* Active Dispatch Status */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#687089]">Active Agent:</span>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border capitalize ${getAgentColor(activeExecutingAgent || 'orchestrator')}`}>
            {activeExecutingAgent || 'Orchestrator'}
          </span>
        </div>
      </div>

      {/* Quick Action Suggestion Bar */}
      <div className="px-6 py-2.5 bg-white border-b border-[#E9EAF2] flex items-center space-x-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-bold text-[#687089] uppercase tracking-wider shrink-0 flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-[#633BFF]" />
          <span>Quick Actions:</span>
        </span>
        {quickPrompts.map(qp => (
          <button
            key={qp.label}
            onClick={() => handleQuickPrompt(qp.prompt)}
            disabled={isThinking}
            className="shrink-0 px-3 py-1 rounded-full bg-[#F7F8FF] hover:bg-[#E9E2FF]/60 hover:text-[#633BFF] text-[#15172B] text-xs font-medium border border-[#E9EAF2] transition-colors disabled:opacity-50"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Conversation Thread */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {conversation.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start space-x-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse space-x-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                isUser 
                  ? 'bg-gradient-to-br from-[#15172B] to-[#3B4261] text-white' 
                  : 'bg-gradient-to-br from-[#633BFF] to-[#4285FF] text-white'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble & Execution Steps */}
              <div className={`flex flex-col space-y-2 max-w-2xl ${isUser ? 'items-end' : 'items-start'}`}>
                
                {/* Agent Tag if assistant */}
                {!isUser && msg.agent && (
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${getAgentColor(msg.agent)}`}>
                      {msg.agent} Agent
                    </span>
                    <span className="text-[10px] text-[#687089]">
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}

                {/* Bubble Content */}
                <div className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#15172B] text-white rounded-tr-sm'
                    : 'bg-[#F7F8FF] text-[#15172B] border border-[#E9EAF2] rounded-tl-sm'
                }`}>
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.content}
                  </div>
                </div>

                {/* Execution Steps Accordion (if present) */}
                {msg.steps && msg.steps.length > 0 && (
                  <div className="w-full bg-white rounded-2xl border border-[#E9EAF2] p-3 shadow-xs space-y-2 mt-2">
                    <div className="text-[11px] font-bold text-[#687089] uppercase tracking-wider flex items-center space-x-1.5 pb-1 border-b border-[#E9EAF2]/60">
                      <Zap className="w-3.5 h-3.5 text-[#633BFF]" />
                      <span>Tool Execution Trace ({msg.steps.length} Steps)</span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {msg.steps.map((st, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <div className="flex flex-col">
                            <span className="font-semibold text-[#15172B]">
                              {st.step} <span className="font-mono text-[10px] text-[#633BFF] bg-[#E9E2FF]/40 px-1 rounded ml-1">tool: {st.tool_name}</span>
                            </span>
                            <span className="text-[11px] text-[#687089]">{st.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Approval Prompt Box (if pending) */}
                {msg.approval_request && pendingApproval?.isOpen && (
                  <div className="w-full bg-amber-50 rounded-2xl border border-amber-200 p-4 shadow-sm space-y-3 mt-2">
                    <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold">
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      <span>Human Approval Pending</span>
                    </div>
                    <p className="text-xs text-amber-900 leading-snug font-medium">
                      {msg.approval_request.summary}
                    </p>
                    <div className="flex items-center space-x-2 pt-1">
                      <button
                        onClick={approvePendingAction}
                        className="px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center space-x-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve & Create PayPal Order</span>
                      </button>
                      <button
                        onClick={rejectPendingAction}
                        className="px-3 py-1.5 rounded-full bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-semibold transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          );
        })}

        {/* Thinking Indicator */}
        {isThinking && (
          <div className="flex items-start space-x-3 max-w-xl">
            <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-[#633BFF] to-[#4285FF] flex items-center justify-center text-white shrink-0 shadow-sm animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-3xl bg-[#F7F8FF] border border-[#E9EAF2] rounded-tl-sm flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-[#633BFF] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#4285FF] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#62D9ED] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs font-medium text-[#687089]">
                Orchestrator analyzing intent and selecting specialized agent...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 sm:p-6 border-t border-[#E9EAF2] bg-white">
        <form onSubmit={handleSubmit} className="relative flex items-center max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isThinking}
            placeholder='Give your AI workforce an instruction, e.g. "Create an invoice for John for $500"...'
            className="w-full pl-5 pr-28 py-3.5 rounded-full bg-[#F7F8FF] border border-[#E9EAF2] text-xs sm:text-sm font-medium text-[#15172B] placeholder:text-[#687089] focus:outline-none focus:border-[#633BFF] focus:bg-white focus:ring-2 focus:ring-[#633BFF]/10 transition-all disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={isThinking || !input.trim()}
            className="absolute right-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white font-bold text-xs shadow-md shadow-[#633BFF]/25 hover:shadow-lg disabled:opacity-40 transition-all flex items-center space-x-1.5"
          >
            <span>Execute</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-2 text-center text-[11px] text-[#687089]">
          Protected by Supabase Row Level Security • All financial operations require Owner Approval
        </div>
      </div>

    </div>
  );
};


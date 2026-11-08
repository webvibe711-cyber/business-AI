import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchDemoWorkflow: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, onLaunchDemoWorkflow }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#15172B]/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl max-w-2xl w-full border border-[#E9EAF2] shadow-2xl overflow-hidden relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#E9EAF2] bg-[#F7F8FF]/60">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#633BFF] to-[#4285FF] flex items-center justify-center text-white">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#15172B]">BusinessPilot AI — Guided Demo</h3>
                <p className="text-xs text-[#687089]">Interactive Multi-Agent Operating System Tour</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-[#687089] border border-[#E9EAF2] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            <div className="bg-gradient-to-br from-[#E9E2FF]/40 to-[#F7F8FF] rounded-2xl p-5 border border-[#633BFF]/20">
              <h4 className="font-extrabold text-sm text-[#15172B] flex items-center space-x-2">
                <Zap className="w-4 h-4 text-[#633BFF]" />
                <span>The Hackathon Core Showcase Flow</span>
              </h4>
              <p className="mt-1 text-xs text-[#687089] leading-relaxed">
                Experience the seamless interaction between natural conversational commands, multi-agent dispatch, human-in-the-loop security gates, and verified PayPal Sandbox capture.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-xs">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">1</div>
                <div>
                  <strong className="text-[#15172B]">Central Command Input:</strong>
                  <span className="text-[#687089] ml-1">Type or click <em>"Create an invoice for John for $500."</em></span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">2</div>
                <div>
                  <strong className="text-[#15172B]">Multi-Agent Dispatch:</strong>
                  <span className="text-[#687089] ml-1">Orchestrator routes the request to Finance Agent, which queries John Doe's record in Supabase.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">3</div>
                <div>
                  <strong className="text-[#15172B]">Approval Gate:</strong>
                  <span className="text-[#687089] ml-1">The system presents a Human Approval modal before any real order is initialized.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">4</div>
                <div>
                  <strong className="text-[#15172B]">PayPal Sandbox Order:</strong>
                  <span className="text-[#687089] ml-1">Upon owner approval, a verified PayPal Sandbox Order ID is generated with live checkout capability.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">5</div>
                <div>
                  <strong className="text-[#15172B]">Capture & Real-time Sync:</strong>
                  <span className="text-[#687089] ml-1">Payment is verified, recorded in the database, and reflected immediately on the live revenue chart.</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#687089] hover:bg-[#F7F8FF] border border-[#E9EAF2] transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onLaunchDemoWorkflow();
                }}
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white shadow-md shadow-[#633BFF]/25 hover:shadow-lg transition-all"
              >
                <span>Try This Workflow Live</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


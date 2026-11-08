import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle2, XCircle, ArrowRight, Wallet, User, DollarSign, Calendar } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';

export const ApprovalModal: React.FC = () => {
  const { pendingApproval, approvePendingAction, rejectPendingAction } = useBusiness();

  if (!pendingApproval || !pendingApproval.isOpen) return null;

  const payload = pendingApproval.payload || {};

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#15172B]/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl max-w-lg w-full border border-[#E9EAF2] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
                Human-in-the-Loop Security Gate
              </span>
              <h3 className="text-base font-extrabold text-[#15172B] mt-0.5">
                Authorization Required
              </h3>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 space-y-5">
            <p className="text-xs sm:text-sm text-[#687089] leading-relaxed">
              Your <strong className="text-[#633BFF] capitalize">{pendingApproval.agent} Agent</strong> has generated a sensitive business operation that requires your explicit approval prior to database persistence and PayPal order initialization.
            </p>

            {/* Proposal Card */}
            <div className="bg-[#F7F8FF] rounded-2xl p-4 border border-[#E9EAF2] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E9EAF2]">
                <span className="text-xs font-bold text-[#15172B]">Operation Details</span>
                <span className="text-[11px] font-semibold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  PayPal Sandbox Ready
                </span>
              </div>

              {/* Items in payload */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#687089]">
                  <span className="flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-[#633BFF]" />
                    <span>Customer:</span>
                  </span>
                  <span className="font-bold text-[#15172B]">
                    {payload.customer_name || 'John Doe'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#687089]">
                  <span className="flex items-center space-x-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Total Amount:</span>
                  </span>
                  <span className="font-extrabold text-base text-[#15172B]">
                    ${payload.total ? payload.total.toFixed(2) : '500.00'} {payload.currency || 'USD'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#687089]">
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#4285FF]" />
                    <span>Payment Terms:</span>
                  </span>
                  <span className="font-medium text-[#15172B]">Net 14 Days</span>
                </div>

                {payload.notes && (
                  <div className="pt-2 border-t border-[#E9EAF2]/60 text-[11px] text-[#687089]">
                    <span className="font-semibold text-[#15172B]">Line Item: </span>
                    {payload.notes}
                  </div>
                )}
              </div>
            </div>

            {/* Approval Controls */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={rejectPendingAction}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-[#687089] hover:bg-slate-100 hover:text-[#15172B] border border-[#E9EAF2] transition-colors flex items-center space-x-1.5"
              >
                <XCircle className="w-4 h-4 text-red-500" />
                <span>Reject Action</span>
              </button>

              <button
                onClick={approvePendingAction}
                className="px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Create PayPal Order</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


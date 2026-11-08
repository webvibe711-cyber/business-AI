import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('Riham');
  const [email, setEmail] = useState('riham@businesspilot.ai');
  const [password, setPassword] = useState('password123');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, name);
    } else {
      await signup(email, name);
    }
    onSuccess();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#15172B]/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl max-w-md w-full border border-[#E9EAF2] shadow-2xl overflow-hidden relative"
        >
          {/* Header */}
          <div className="p-6 bg-[#F7F8FF]/80 border-b border-[#E9EAF2] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#633BFF] to-[#4285FF] flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
                B
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#15172B]">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h3>
                <p className="text-[11px] text-[#687089]">
                  Access your BusinessPilot AI Operating System
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-[#687089] border border-[#E9EAF2]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {!isLogin && (
              <div>
                <label className="font-bold text-[#15172B] block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#687089] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Riham"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2] text-xs font-medium focus:outline-none focus:border-[#633BFF]"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="font-bold text-[#15172B] block mb-1">Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#687089] absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@business.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2] text-xs font-medium focus:outline-none focus:border-[#633BFF]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-[#15172B] block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#687089] absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2] text-xs font-medium focus:outline-none focus:border-[#633BFF]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white font-bold text-xs shadow-md shadow-[#633BFF]/25 hover:shadow-lg transition-all flex items-center justify-center space-x-1.5 mt-2"
            >
              <span>{isLogin ? 'Enter Business OS' : 'Get Started'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="pt-2 text-center text-xs text-[#687089]">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#633BFF] font-bold hover:underline"
              >
                {isLogin ? 'Sign up free' : 'Log in'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


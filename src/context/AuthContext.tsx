import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, Business } from '../types';
import { localDb } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  business: Business | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  login: (email: string, name?: string) => Promise<void>;
  signup: (email: string, name: string) => Promise<void>;
  logout: () => void;
  updateBusiness: (updates: Partial<Business>) => void;
  completeOnboarding: (bizData: { name: string; industry: string; size: string; description: string; goals: string[] }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(true);

  useEffect(() => {
    // Load initial user and business from local persistence
    const savedUser = localDb.getUser();
    const savedBiz = localDb.getBusiness();
    setUser(savedUser);
    setBusiness(savedBiz);
    setIsOnboarded(Boolean(savedBiz && savedBiz.name));
  }, []);

  const login = async (email: string, name: string = 'Riham') => {
    const profile: UserProfile = {
      id: `usr_${Date.now()}`,
      email,
      full_name: name,
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      business_id: business?.id || 'biz_01_riham',
    };
    localDb.setUser(profile);
    setUser(profile);
  };

  const signup = async (email: string, name: string) => {
    await login(email, name);
  };

  const logout = () => {
    setUser(null);
  };

  const updateBusiness = (updates: Partial<Business>) => {
    const updated = localDb.updateBusiness(updates);
    setBusiness(updated);
  };

  const completeOnboarding = (bizData: { name: string; industry: string; size: string; description: string; goals: string[] }) => {
    const updated = localDb.updateBusiness({
      ...bizData,
      currency: 'USD',
    });
    setBusiness(updated);
    setIsOnboarded(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        business,
        isAuthenticated: Boolean(user),
        isOnboarded,
        login,
        signup,
        logout,
        updateBusiness,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

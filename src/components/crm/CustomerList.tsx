import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  Building, 
  DollarSign, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';
import type { Customer } from '../../types';

export const CustomerList: React.FC = () => {
  const { customers, addCustomer } = useBusiness();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    addCustomer({
      business_id: 'biz_01_riham',
      name,
      email,
      company,
      phone,
      status: 'active',
      total_spent: 0,
      notes: 'Added through CRM directory',
    });
    setName('');
    setEmail('');
    setCompany('');
    setPhone('');
    setShowAddModal(false);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E9EAF2] gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#15172B] tracking-tight">
            Customer Directory
          </h2>
          <p className="text-xs text-[#687089]">
            Managed client accounts, lifetime revenue metrics, and engagement history
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white text-xs font-bold shadow-md shadow-[#633BFF]/25 hover:shadow-lg transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Customer</span>
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#687089] absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers or company..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#F7F8FF] border border-[#E9EAF2] text-xs font-medium focus:outline-none focus:border-[#633BFF]"
          />
        </div>

        <div className="flex items-center space-x-3 text-xs text-[#687089]">
          <span>Showing <strong className="text-[#15172B]">{filtered.length}</strong> of {customers.length} accounts</span>
        </div>
      </div>

      {/* Customers Cards / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(cust => (
          <div
            key={cust.id}
            className="bg-white rounded-3xl p-5 border border-[#E9EAF2] hover:border-[#633BFF]/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-[#15172B]">{cust.name}</h4>
                  <span className="text-xs text-[#687089] font-medium">{cust.company || 'Private Client'}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  cust.status === 'vip' 
                    ? 'bg-[#E9E2FF] text-[#633BFF]' 
                    : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {cust.status}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs text-[#687089]">
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-[#633BFF]" />
                  <span className="truncate">{cust.email}</span>
                </div>
                {cust.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{cust.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E9EAF2]/80 flex items-center justify-between text-xs">
              <span className="text-[#687089]">Total Spent:</span>
              <span className="font-extrabold text-sm text-[#15172B]">
                ${cust.total_spent.toLocaleString()} USD
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E9EAF2] shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-[#15172B]">Add New Customer</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#15172B] block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#15172B] block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. john.doe@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#15172B] block mb-1">Company (Optional)</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Doe Enterprises"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
                />
              </div>

              <div>
                <label className="font-bold text-[#15172B] block mb-1">Phone (Optional)</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +1 (555) 000-0000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full border border-[#E9EAF2] text-[#687089] hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white font-bold shadow-sm"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};


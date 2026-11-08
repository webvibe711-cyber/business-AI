import React, { useState } from 'react';
import { 
  Cog, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  AlertCircle,
  Filter
} from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';
import type { AgentType, Task } from '../../types';

export const OperationsAgentWorkspace: React.FC = () => {
  const { tasks, addTask, updateTaskStatus } = useBusiness();
  const [filterAgent, setFilterAgent] = useState<string>('all');
  const [newTitle, setNewTitle] = useState('');
  const [assignedAgent, setAssignedAgent] = useState<AgentType | 'human'>('operations');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredTasks = tasks.filter(t => filterAgent === 'all' || t.assigned_to === filterAgent);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTask({
      business_id: 'biz_01_riham',
      title: newTitle,
      assigned_to: assignedAgent,
      priority,
      status: 'todo',
    });
    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Operations Header */}
      <div className="bg-gradient-to-r from-cyan-50 via-[#F7F8FF] to-white rounded-3xl p-6 border border-cyan-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Cog className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-extrabold text-[#15172B]">AI Operations Agent</h3>
              <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[10px] font-bold">
                Online • Workflow Engine
              </span>
            </div>
            <p className="text-xs text-[#687089]">
              Coordinate task queues, track scheduling commitments, and synchronize operational workflows across agents.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition-all shadow-sm shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Task Item</span>
        </button>
      </div>

      {/* Task Filters */}
      <div className="bg-white rounded-3xl p-6 border border-[#E9EAF2] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E9EAF2]">
          <h4 className="text-sm font-bold text-[#15172B]">Operations Queue ({filteredTasks.length})</h4>
          
          <div className="flex items-center space-x-2 overflow-x-auto text-xs">
            {['all', 'sales', 'finance', 'support', 'marketing', 'operations', 'analyst', 'human'].map(ag => (
              <button
                key={ag}
                onClick={() => setFilterAgent(ag)}
                className={`px-3 py-1 rounded-full font-bold capitalize transition-all ${
                  filterAgent === ag
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'bg-[#F7F8FF] text-[#687089] hover:bg-slate-100'
                }`}
              >
                {ag}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.map(task => (
            <div 
              key={task.id}
              className="p-4 rounded-2xl bg-[#F7F8FF] border border-[#E9EAF2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => updateTaskStatus(task.id, task.status === 'completed' ? 'todo' : 'completed')}
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    task.status === 'completed'
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-[#E9EAF2] bg-white hover:border-cyan-500'
                  }`}
                >
                  {task.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
                <div>
                  <span className={`font-bold text-[#15172B] block ${task.status === 'completed' ? 'line-through text-[#687089]' : ''}`}>
                    {task.title}
                  </span>
                  <div className="flex items-center space-x-2 text-[10px] text-[#687089] mt-1">
                    <span className="uppercase font-bold text-cyan-700 bg-cyan-100/70 px-1.5 py-0.5 rounded">
                      {task.assigned_to} Agent
                    </span>
                    <span>•</span>
                    <span>Status: {task.status.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase shrink-0 ${
                task.priority === 'urgent'
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : task.priority === 'high'
                    ? 'bg-amber-50 text-amber-600 border border-amber-200'
                    : 'bg-white text-[#687089] border border-[#E9EAF2]'
              }`}>
                {task.priority} Priority
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E9EAF2] shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-[#15172B]">Create Operational Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#15172B] block mb-1">Task Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Follow up on Q4 retainer invoice"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#15172B] block mb-1">Assign To</label>
                <select
                  value={assignedAgent}
                  onChange={(e) => setAssignedAgent(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
                >
                  <option value="operations">Operations Agent</option>
                  <option value="sales">Sales Agent</option>
                  <option value="finance">Finance Agent</option>
                  <option value="support">Support Agent</option>
                  <option value="marketing">Marketing Agent</option>
                  <option value="analyst">Analyst Agent</option>
                  <option value="human">Human Team</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#15172B] block mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F8FF] border border-[#E9EAF2]"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
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
                  className="px-5 py-2 rounded-full bg-cyan-600 text-white font-bold shadow-sm"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};


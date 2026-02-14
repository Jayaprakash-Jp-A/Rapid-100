
import React from 'react';
import { EmergencyIncident, SystemMetrics } from '../types';

export const ReportsAnalytics: React.FC<{ incidents: EmergencyIncident[]; metrics: SystemMetrics }> = ({ incidents, metrics }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
       <div className="flex justify-between items-end mb-16 border-b border-white/5 pb-10">
          <div>
             <h2 className="tactical-header text-5xl font-black text-white tracking-tighter uppercase">Incident History & Reports</h2>
             <p className="text-sm text-slate-500 mono mt-2">Aggregate Sector Telemetry Archive</p>
          </div>
          <div className="flex gap-6">
             <div className="text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Mean Response</p>
                <p className="text-2xl font-black text-cyan-400 mono">{metrics.avgResponseTime}</p>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Resolution Rate</p>
                <p className="text-2xl font-black text-emerald-400 mono">{metrics.successRate}%</p>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 glass rounded-[3rem] border-white/10 overflow-hidden">
             <table className="w-full text-left border-separate border-spacing-0">
                <thead>
                   <tr className="bg-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <th className="py-6 px-10">ID</th>
                      <th className="py-6 px-10">Type</th>
                      <th className="py-6 px-10">Priority</th>
                      <th className="py-6 px-10">Status</th>
                      <th className="py-6 px-10">Duration</th>
                      <th className="py-6 px-10">Outcome</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {incidents.slice(0, 10).map((inc, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer group">
                         <td className="py-6 px-10 mono text-xs text-cyan-500 font-bold">#{inc.IncidentID}</td>
                         <td className="py-6 px-10 font-bold text-sm text-slate-200">{inc.EmergencyType}</td>
                         <td className="py-6 px-10">
                            <span className={`px-4 py-1 rounded-full text-[9px] font-black ${inc.PriorityLevel === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-500'}`}>{inc.PriorityLevel}</span>
                         </td>
                         <td className="py-6 px-10 text-[10px] font-black text-slate-500 uppercase">{inc.LiveTracking.CurrentStatus}</td>
                         <td className="py-6 px-10 mono text-xs text-slate-400">08m 12s</td>
                         <td className="py-6 px-10">
                            <span className="text-[10px] font-black text-emerald-500 flex items-center gap-2">✓ COMPLETED</span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>

          <div className="lg:col-span-4 space-y-10">
             <div className="glass p-10 rounded-[3rem] border-white/5 text-center">
                <h4 className="text-[11px] font-black text-slate-500 uppercase mb-10">Resolution Distribution</h4>
                <div className="relative w-48 h-48 mx-auto mb-10 flex items-center justify-center">
                   <div className="absolute inset-0 rounded-full border-[20px] border-white/5"></div>
                   <div className="absolute inset-0 rounded-full border-[20px] border-emerald-500 border-r-transparent border-b-transparent rotate-12 shadow-[0_0_30px_rgba(16,185,129,0.3)]"></div>
                   <div className="flex flex-col items-center">
                      <span className="text-5xl font-black text-white mono">1,428</span>
                      <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Total Resolved</span>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-500"><span>Verified Successful</span><span className="text-emerald-400">92%</span></div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[92%]"></div></div>
                </div>
             </div>

             <div className="glass p-10 rounded-[3rem] border-white/5">
                <h4 className="text-[11px] font-black text-slate-500 uppercase mb-8">Performance Indices</h4>
                <div className="space-y-6">
                   {[
                     { label: 'Dispatch Precision', val: '98.4%' },
                     { label: 'Tactical Deployment', val: '94.2%' },
                     { label: 'Neural Accuracy', val: '99.1%' }
                   ].map((idx, i) => (
                     <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4">
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{idx.label}</span>
                        <span className="text-xl font-black text-white mono">{idx.val}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

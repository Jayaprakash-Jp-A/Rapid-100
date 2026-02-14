
import React from 'react';
import { EmergencyIncident, SystemMetrics } from '../types';

export const IncidentHistory: React.FC<{ incidents: EmergencyIncident[] }> = ({ incidents }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-700 p-2">
      {/* Header Filters */}
      <div className="flex justify-between items-end mb-14 border-b border-white/5 pb-10 px-6">
         <div>
            <h2 className="tactical-header text-5xl font-black text-white uppercase tracking-tighter">Incident History & Reports</h2>
            <p className="text-sm font-black text-slate-500 mono mt-2 uppercase tracking-widest italic">Global Triage Metadata Archive // System_RX</p>
         </div>
         <div className="flex gap-6 items-center">
            <div className="flex gap-4">
               <select className="bg-white/5 px-8 py-3 rounded-2xl text-[10px] font-black text-slate-400 focus:outline-none border border-white/10 hover:border-white/20 transition-all uppercase tracking-widest"><option>Last 30 Days</option></select>
               <select className="bg-white/5 px-8 py-3 rounded-2xl text-[10px] font-black text-slate-400 focus:outline-none border border-white/10 hover:border-white/20 transition-all uppercase tracking-widest"><option>Category: All</option></select>
            </div>
            <button className="px-10 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-cyan-500/10 transition-all active:scale-95">Export Signal Intel</button>
         </div>
      </div>

      {/* Main Table */}
      <div className="glass-panel rounded-[3.5rem] border border-white/5 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] bg-slate-900/20">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
               <thead>
                  <tr className="bg-white/5 text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">
                     <th className="py-8 px-10">Case ID</th>
                     <th className="py-8 px-10">Signal Nature</th>
                     <th className="py-8 px-10">Severity</th>
                     <th className="py-8 px-10">Lifecycle</th>
                     <th className="py-8 px-10">Node Time</th>
                     <th className="py-8 px-10">Outcome</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {incidents.map((inc, i) => (
                     <tr key={i} className="hover:bg-white/5 transition-all cursor-pointer group">
                        <td className="py-8 px-10 mono text-xs text-cyan-500 font-black">#{inc.IncidentID}</td>
                        <td className="py-8 px-10 font-black text-base text-slate-200 uppercase tracking-tighter italic">{inc.EmergencyType}</td>
                        <td className="py-8 px-10">
                           <span className={`px-6 py-1.5 rounded-xl text-[10px] font-black border transition-all ${
                             inc.PriorityLevel === 'CRITICAL' ? 'bg-rose-500/10 border-rose-500/30 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.2)]' : 
                             inc.PriorityLevel === 'HIGH' ? 'bg-orange-500/10 border-orange-500/30 text-orange-500' :
                             'bg-slate-800 text-slate-400 border-white/10'
                           }`}>
                              {inc.PriorityLevel}
                           </span>
                        </td>
                        <td className="py-8 px-10">
                           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-lg border border-white/5">{inc.LiveTracking.CurrentStatus}</span>
                        </td>
                        <td className="py-8 px-10 mono text-xs text-slate-400 font-bold">{new Date(inc.Timestamp).toLocaleTimeString([], {hour12: false})}</td>
                        <td className="py-8 px-10">
                           <div className="flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
                              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Validated</span>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {incidents.length === 0 && (
                     <tr><td colSpan={6} className="py-20 text-center opacity-20 tactical-header text-xl uppercase tracking-widest">No Archived Signals Found</td></tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* Analytics Summary Footer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
         <div className="glass-panel p-12 rounded-[4rem] border border-white/5 text-center group hover:border-cyan-500/30 transition-all bg-slate-900/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5"><span className="text-6xl italic font-black mono">RX</span></div>
            <p className="text-[12px] font-black text-slate-500 uppercase tracking-[0.5em] mb-8">System Resolved Cases</p>
            <div className="flex justify-center items-center gap-10">
               <span className="text-7xl font-black text-white mono tracking-tighter">1,428</span>
               <div className="relative w-24 h-24">
                  <svg className="w-full h-full -rotate-90">
                     <circle cx="48" cy="48" r="40" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                     <circle cx="48" cy="48" r="40" fill="transparent" stroke="#10b981" strokeWidth="8" strokeDasharray="251" strokeDashoffset="20" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-base font-black text-emerald-500 mono">92%</div>
               </div>
            </div>
         </div>
         
         <div className="glass-panel p-12 rounded-[4rem] border border-white/5 text-center group hover:border-cyan-500/30 transition-all bg-slate-900/40 shadow-2xl">
            <p className="text-[12px] font-black text-slate-500 uppercase tracking-[0.5em] mb-8">Mean Response Latency</p>
            <p className="text-6xl font-black text-cyan-400 mono tracking-tighter">07<span className="text-2xl text-slate-600">m</span> 12<span className="text-2xl text-slate-600">s</span></p>
            <div className="mt-8 flex justify-center gap-2 h-4 items-end opacity-20 group-hover:opacity-60 transition-opacity">
               {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => <div key={i} className="w-1.5 bg-cyan-500 rounded-full h-full animate-v-bar" style={{animationDelay: `${i*0.05}s`}}></div>)}
            </div>
         </div>
         
         <div className="glass-panel p-12 rounded-[4rem] border border-white/5 text-center group hover:border-emerald-500/30 transition-all relative overflow-hidden bg-slate-900/40 shadow-2xl">
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <p className="text-[12px] font-black text-slate-500 uppercase tracking-[0.5em] mb-8">Success Outcome Rate</p>
            <p className="text-6xl font-black text-emerald-500 mono tracking-tighter">98.4<span className="text-2xl text-slate-700">%</span></p>
            <p className="text-[10px] font-black text-emerald-800 mt-8 uppercase tracking-[0.3em] italic">Exceeding Sector Baseline_A2</p>
         </div>
      </div>
    </div>
  );
};

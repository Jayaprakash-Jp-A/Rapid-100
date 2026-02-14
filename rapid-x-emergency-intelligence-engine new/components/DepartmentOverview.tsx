
import React from 'react';
import { SystemMetrics } from '../types';

export const DepartmentOverview: React.FC<{ metrics: SystemMetrics; department: string }> = ({ metrics, department }) => {
  return (
    <div className="space-y-8 animate-in zoom-in-[0.98] duration-700">
      <div className="flex justify-between items-center mb-10">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(37,99,235,0.4)]">🚓</div>
            <h2 className="tactical-header text-4xl font-black text-white uppercase tracking-tighter">{department} Sector Overview</h2>
         </div>
         <div className="flex gap-4">
            {['Fire Dept', 'Medical', 'Cyber Crime'].map(d => (
              <button key={d} className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black text-slate-500 border border-white/5 transition-all uppercase tracking-widest">{d}</button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-8">
            <div className="glass p-10 rounded-[3rem] border-white/5">
               <div className="flex justify-between items-center mb-10">
                  <h4 className="text-[12px] font-black text-slate-500 uppercase tracking-widest">{department} Activity Stream</h4>
                  <span className="text-[10px] font-bold text-slate-600 italic">Historical 24H Matrix</span>
               </div>
               {/* Activity Chart Simulation */}
               <div className="h-64 flex items-end justify-between gap-4 px-4">
                  {[40, 65, 30, 85, 45, 95, 20, 55, 75, 40, 80, 50].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-600/20 border-t border-blue-400/30 rounded-t-xl group relative hover:bg-blue-600/40 transition-all" style={{ height: `${h}%` }}>
                       <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-[9px] opacity-0 group-hover:opacity-100 transition-opacity mono text-white">{h} Inc.</div>
                    </div>
                  ))}
               </div>
               <div className="flex justify-between mt-6 px-4 text-[9px] font-black text-slate-700 uppercase mono">
                  <span>06:00</span><span>12:00</span><span>18:00</span><span>00:00</span>
               </div>
            </div>

            <div className="glass p-10 rounded-[3rem] border-white/5">
               <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-8">Currently Active Cases</h4>
               <div className="space-y-4">
                  {[
                    { type: 'Burglary', status: 'Dispatched', resp: '1m 20s', level: 'MEDIUM' },
                    { type: 'Assault', status: 'Dispatched', resp: '1m 20s', level: 'HIGH' },
                    { type: 'Missing Person', status: 'Searching', resp: '1m 20s', level: 'HIGH' }
                  ].map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                       <div className="flex items-center gap-6">
                          <span className="text-xl">⚠️</span>
                          <div>
                             <p className="text-sm font-black text-white">{c.type}</p>
                             <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Sector Alert Zone 07</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-10">
                          <span className="text-[10px] font-black text-emerald-500 mono">{c.status}</span>
                          <span className="text-[10px] font-black text-slate-500 mono">{c.resp}</span>
                          <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black border ${c.level === 'HIGH' ? 'bg-orange-500/10 border-orange-500/30 text-orange-500' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'}`}>{c.level}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-8">
            <div className="glass p-10 rounded-[3rem] border-white/5 text-center">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Sector 07 Summary</p>
               <div className="relative w-48 h-48 mx-auto mb-10">
                  <div className="absolute inset-0 rounded-full border-[12px] border-white/5"></div>
                  <div className="absolute inset-0 rounded-full border-[12px] border-t-blue-500 border-l-blue-500 rotate-45"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-5xl font-black text-white mono">256</span>
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Total Calls</span>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5"><p className="text-[10px] font-black text-slate-600 uppercase">Responded</p><p className="text-xl font-black text-emerald-400 mono">94%</p></div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5"><p className="text-[10px] font-black text-slate-600 uppercase">Pending</p><p className="text-xl font-black text-orange-400 mono">6%</p></div>
               </div>
            </div>

            <div className="glass p-10 rounded-[3rem] border-white/5">
               <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-6 text-center">Sector Resource Stress</h4>
               <div className="space-y-6">
                  {['Command', 'Response', 'Intelligence', 'Field Operations'].map(r => (
                    <div key={r}>
                       <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase mb-2"><span>{r}</span><span>72%</span></div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[72%]"></div></div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

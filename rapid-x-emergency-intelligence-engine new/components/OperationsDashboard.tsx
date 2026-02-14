
import React, { useState } from 'react';
import { SystemMetrics, EmergencyIncident, CaseStatus } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const OperationsDashboard: React.FC<{ metrics: SystemMetrics; incidents: EmergencyIncident[] }> = ({ metrics, incidents }) => {
  const [activeDept, setActiveDept] = useState('Police');

  const chartData = [
    { time: '08:00', load: 30 }, { time: '10:00', load: 85 }, { time: '12:00', load: 45 },
    { time: '14:00', load: 95 }, { time: '16:00', load: 60 }, { time: '18:00', load: 20 },
    { time: '20:00', load: 55 }, { time: '22:00', load: 88 }
  ];

  return (
    <div className="h-full grid grid-cols-12 gap-8 animate-in zoom-in-[0.98] duration-700 p-2">
      <div className="col-span-8 space-y-8">
         {/* Department Header */}
         <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40">
            <div className="flex justify-between items-center mb-10">
               <h2 className="tactical-header text-3xl font-black text-white uppercase tracking-tighter">Department Overview</h2>
               <div className="flex gap-3 bg-white/5 p-1 rounded-2xl border border-white/5">
                  {['Police', 'Fire Dept', 'Medical'].map(d => (
                    <button 
                      key={d} 
                      onClick={() => setActiveDept(d)}
                      className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeDept === d ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      {d}
                    </button>
                  ))}
               </div>
            </div>
            
            <div className="grid grid-cols-4 gap-6">
               <div className="bg-blue-600/10 p-6 rounded-3xl border border-blue-500/20 text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><span className="text-4xl">🚓</span></div>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 relative z-10">Total Calls Today</p>
                  <p className="text-5xl font-black text-white mono relative z-10">{activeDept === 'Police' ? metrics.totalCallsToday : Math.floor(metrics.totalCallsToday * 0.4)}</p>
               </div>
               <div className="bg-rose-600/10 p-6 rounded-3xl border border-rose-500/20 text-center group">
                  <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2">Critical Active</p>
                  <p className="text-5xl font-black text-white mono">{metrics.criticalCases}</p>
               </div>
               <div className="bg-emerald-600/10 p-6 rounded-3xl border border-emerald-500/20 text-center">
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Solved Cases</p>
                  <p className="text-5xl font-black text-white mono">142</p>
               </div>
               <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-center">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Force Units</p>
                  <p className="text-5xl font-black text-white mono">24</p>
               </div>
            </div>
         </div>

         {/* Activity Chart Area */}
         <div className="glass-panel p-10 rounded-[2.5rem] h-[400px] border border-white/5 bg-slate-900/40">
            <div className="flex justify-between items-center mb-10">
               <h4 className="text-[12px] font-black text-slate-500 uppercase tracking-widest">{activeDept} Sector Activity Stream</h4>
               <span className="text-[9px] font-black text-slate-700">SAMPLING: 100Hz</span>
            </div>
            <div className="h-full flex-1">
               <ResponsiveContainer width="100%" height="80%">
                  <AreaChart data={chartData}>
                     <defs>
                        <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                     <XAxis dataKey="time" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                     <Tooltip />
                     <Area type="monotone" dataKey="load" stroke="#3b82f6" strokeWidth={3} fill="url(#areaGlow)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Current Active Cases Mini-List */}
         <div className="glass-panel p-10 rounded-[2.5rem] border border-white/5 bg-slate-900/40">
            <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-8">Active Sector Deployment</h4>
            <div className="space-y-4">
               {incidents.filter(i => i.LiveTracking.CurrentStatus !== CaseStatus.RESOLVED).slice(0, 3).map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                     <div className="flex items-center gap-6">
                        <span className="text-2xl">{c.PriorityLevel === 'CRITICAL' ? '🚨' : '⚠️'}</span>
                        <div>
                           <p className="text-sm font-black text-white">{c.EmergencyType}</p>
                           <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Sector: {c.Location.split(',')[1] || 'Downtown'}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-10">
                        <span className="text-[10px] font-black text-emerald-400 mono px-3 py-1 bg-emerald-500/10 rounded-lg">{c.LiveTracking.CurrentStatus}</span>
                        <span className="text-[10px] font-black text-slate-500 mono">{c.LiveTracking.EstimatedArrivalTime} ETA</span>
                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black border ${c.PriorityLevel === 'CRITICAL' ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'}`}>{c.PriorityLevel}</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className="col-span-4 space-y-8">
         {/* Incident Distribution Gauge */}
         <div className="glass-panel p-10 rounded-[2.5rem] border border-white/5 bg-slate-900/40 flex flex-col items-center">
            <h4 className="text-[12px] font-black text-slate-500 uppercase tracking-widest mb-10">Incident Status Distribution</h4>
            <div className="relative w-56 h-56 mb-12 flex items-center justify-center">
               <svg className="w-full h-full -rotate-90">
                  <circle cx="112" cy="112" r="95" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="18" />
                  <circle cx="112" cy="112" r="95" fill="transparent" stroke="#06b6d4" strokeWidth="18" strokeDasharray="596" strokeDashoffset="180" strokeLinecap="round" />
                  <circle cx="112" cy="112" r="95" fill="transparent" stroke="#f43f5e" strokeWidth="18" strokeDasharray="596" strokeDashoffset="500" strokeLinecap="round" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-black text-white mono">84%</span>
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Load Factor</span>
               </div>
            </div>
            <div className="w-full space-y-4">
               <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border-l-4 border-l-cyan-500">
                  <span className="text-xs font-bold text-slate-400">Dispatched</span>
                  <span className="text-sm font-black text-white mono">148 Units</span>
               </div>
               <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border-l-4 border-l-rose-500">
                  <span className="text-xs font-bold text-slate-400">On Scene</span>
                  <span className="text-sm font-black text-white mono">42 Cases</span>
               </div>
            </div>
         </div>

         {/* Sector Mini-Map with Live Pins */}
         <div className="glass-panel rounded-[2.5rem] h-[380px] relative overflow-hidden border border-white/5 bg-slate-900/40">
            <img src="https://images.unsplash.com/photo-1449156006073-95101183e533?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 grayscale" />
            <div className="absolute inset-0 bg-slate-950/40"></div>
            {/* Heatmap Simulation */}
            <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="relative">
                  <div className="w-12 h-12 bg-rose-500/30 rounded-full animate-ping"></div>
                  <div className="w-4 h-4 bg-rose-500 rounded-full border-2 border-white shadow-[0_0_15px_rose]"></div>
               </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8 p-6 glass-panel rounded-3xl bg-black/80 backdrop-blur-3xl text-center border border-white/10 shadow-2xl">
               <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-1">Live Grid Monitor</p>
               <p className="text-[9px] font-black text-slate-600 mono uppercase italic">Grid: 45.28N // 122.31W</p>
            </div>
         </div>
      </div>
    </div>
  );
};

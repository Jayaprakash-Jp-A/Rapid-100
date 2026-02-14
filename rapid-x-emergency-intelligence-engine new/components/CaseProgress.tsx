
import React, { useState, useEffect } from 'react';
import { EmergencyIncident } from '../types';

export const CaseProgress: React.FC<{ incident: EmergencyIncident }> = ({ incident }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  if (!incident) return (
    <div className="h-full flex items-center justify-center opacity-20 py-20">
       <div className="text-center">
          <div className="text-8xl mb-8">⚡</div>
          <p className="tactical-header text-3xl font-black text-slate-500 tracking-[0.5em] uppercase">Awaiting Active Execution Pipeline</p>
       </div>
    </div>
  );

  return (
    <div className="glass-panel p-12 rounded-[4rem] border border-white/10 h-full animate-in zoom-in-[0.98] duration-700 bg-slate-950/40 p-2">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-16 border-b border-white/5 pb-12 px-8">
         <div>
            <div className="flex items-center gap-6 mb-4">
               <h2 className="tactical-header text-5xl font-black text-white uppercase tracking-tighter">Current Case Progress</h2>
               <span className={`px-6 py-2 rounded-xl font-black text-[10px] tracking-[0.2em] shadow-lg ${
                 incident.PriorityLevel === 'CRITICAL' ? 'bg-rose-600 text-white animate-pulse' : 'bg-cyan-600 text-white'
               }`}>
                 {incident.PriorityLevel}
               </span>
            </div>
            <p className="text-2xl font-black text-slate-500 mono tracking-tighter uppercase italic">
               Case: {incident.EmergencyType} <span className="text-slate-700 mx-4">//</span> RX-NODE_{incident.IncidentID}
            </p>
         </div>
         <div className="text-right">
            <h4 className="text-[12px] font-black text-slate-500 uppercase tracking-widest mb-4">Live Execution Intelligence</h4>
            <div className="flex flex-col gap-2">
               <span className="text-[11px] font-bold text-slate-400 flex items-center justify-end gap-3">• Perimeter Lock: <span className="text-emerald-500">ACTIVE</span></span>
               <span className="text-[11px] font-bold text-slate-400 flex items-center justify-end gap-3">• Dispatch Relay: <span className="text-emerald-500">CONFIRMED</span></span>
               <span className="text-[11px] font-bold text-slate-400 flex items-center justify-end gap-3">• Ground Interrogation: <span className="text-cyan-500">IN_PROGRESS</span></span>
            </div>
         </div>
      </div>

      {/* Progress Timeline */}
      <div className="mb-24 px-12">
         <h4 className="text-[14px] font-black text-slate-500 uppercase tracking-[0.5em] mb-16 text-center">Progress Execution Timeline</h4>
         <div className="relative flex justify-between max-w-6xl mx-auto items-center">
            {/* Background Line */}
            <div className="absolute top-[32px] left-0 w-full h-1 bg-white/5 -z-10 rounded-full">
               <div className="h-full bg-cyan-600 shadow-[0_0_10px_cyan] transition-all duration-1000" style={{width: '60%'}}></div>
            </div>
            
            {[
              { label: 'Call Received', time: '10:02', icon: '📞', status: 'done' },
              { label: 'Signal Analyzed', time: '10:05', icon: '🧠', status: 'done' },
              { label: 'Unit Dispatched', time: '10:05', icon: '🚨', status: 'done' },
              { label: 'On Scene Reach', time: '10:18', icon: '📍', status: 'current' },
              { label: 'Final Resolution', time: 'TBD', icon: '🔍', status: 'pending' }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-8 relative group">
                 <div className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center text-3xl transition-all duration-700 border-4 ${
                   step.status === 'done' ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 
                   step.status === 'current' ? 'bg-emerald-600/40 border-emerald-400 animate-pulse shadow-[0_0_50px_#10b981]' : 
                   'bg-slate-900/60 border-white/5 opacity-40'
                 }`}>
                   {step.icon}
                 </div>
                 <div className="text-center group-hover:scale-110 transition-transform">
                    <p className={`text-sm font-black mono ${step.status === 'pending' ? 'text-slate-700' : 'text-white'}`}>{step.time}</p>
                    <p className={`text-[10px] font-black uppercase tracking-widest mt-2 ${step.status === 'pending' ? 'text-slate-600' : 'text-slate-400'}`}>{step.label}</p>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Bottom Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 px-8">
         {/* Detail Card */}
         <div className="lg:col-span-5 glass-panel p-10 rounded-[3.5rem] border border-white/5 relative overflow-hidden flex items-center gap-10 group shadow-2xl">
            <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-all duration-700"></div>
            <div className="text-8xl group-hover:scale-110 transition-transform duration-1000 drop-shadow-[0_0_30px_rgba(37,99,235,0.4)]">🚓</div>
            <div className="flex-1">
               <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Status Deployment Report</p>
               <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-6">Actively Searching</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                     <span className="text-[10px] font-black text-slate-600 uppercase">Unit Resources</span>
                     <span className="text-sm font-bold text-slate-300">3 Police Units, K9 Tactical</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-slate-600 uppercase">Mission Elapsed</span>
                     <span className="text-2xl font-black text-cyan-400 mono tracking-tighter">{formatTime(elapsed)}</span>
                  </div>
               </div>
            </div>
         </div>
         
         {/* Live Feed Card */}
         <div className="lg:col-span-7 rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] relative group h-80">
            <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            <div className="absolute top-8 right-8">
               <span className="px-5 py-2 bg-rose-600 text-white font-black text-[10px] rounded-full animate-pulse shadow-[0_0_30px_rose] uppercase tracking-widest">Live Channel_04_Secured</span>
            </div>
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
               <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Optical Stream</p>
                  <p className="text-lg font-black text-white italic">QUAD_SECTOR_GRID_7</p>
               </div>
               <div className="flex gap-2 h-4 items-end opacity-40">
                  {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="w-1 bg-cyan-500 rounded-full h-full animate-v-bar" style={{animationDelay: `${i*0.1}s`}}></div>)}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

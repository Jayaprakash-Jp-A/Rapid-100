
import React, { useState, useEffect } from 'react';
import { EmergencyIncident, CaseStatus } from '../types';

export const IncidentTracking: React.FC<{ incident: EmergencyIncident }> = ({ incident }) => {
  const [distance, setDistance] = useState(2.1);
  
  useEffect(() => {
    if (incident?.LiveTracking.CurrentStatus === CaseStatus.ON_SCENE) {
      setDistance(0);
    } else {
      const interval = setInterval(() => {
        setDistance(prev => Math.max(0, parseFloat((prev - 0.1).toFixed(1))));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [incident?.LiveTracking.CurrentStatus]);

  if (!incident) return (
    <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
       <div className="text-8xl mb-8">🛰️</div>
       <p className="tactical-header text-3xl font-black text-slate-500 tracking-[0.5em] uppercase">No Active Target Signal</p>
    </div>
  );

  return (
    <div className="h-full grid grid-cols-12 gap-8 animate-in slide-in-from-right-10 duration-700 p-2">
      {/* Left Telemetry Column */}
      <div className="col-span-4 space-y-8 flex flex-col">
         <div className="glass-panel p-10 rounded-[3rem] border border-white/5 bg-slate-900/40 shadow-2xl">
            <h2 className="tactical-header text-4xl font-black text-white uppercase tracking-tighter mb-4">Live Incident Tracking</h2>
            <div className="flex gap-3 mb-12">
               <span className="px-4 py-1.5 bg-rose-500/10 text-rose-500 border border-rose-500/30 text-[10px] font-black rounded-xl uppercase tracking-widest">{incident.EmergencyType}</span>
               <span className="px-4 py-1.5 bg-white/5 text-slate-400 border border-white/10 text-[10px] font-black rounded-xl uppercase tracking-widest">Unit: Delta-12</span>
            </div>
            
            <div className="space-y-8">
               {[
                 { label: 'Signal Received', status: 'completed', time: '20:42' },
                 { label: 'Unit Dispatched', status: 'completed', time: '20:45' },
                 { label: 'En Route to Scene', status: 'completed', time: '20:48' },
                 { label: `${distance} km to Target`, status: 'current', time: 'LIVE' },
                 { label: 'Arriving Soon...', status: 'pending', time: 'T-2m' }
               ].map((step, i) => (
                 <div key={i} className="flex items-center gap-6 group">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                       step.status === 'completed' ? 'border-emerald-500 bg-emerald-500 shadow-[0_0_15px_#10b981]' : 
                       step.status === 'current' ? 'border-cyan-500 animate-pulse shadow-[0_0_20px_cyan]' : 'border-white/10 bg-slate-800'
                    }`}>
                       {step.status === 'completed' && <span className="text-xs text-white">✓</span>}
                       {step.status === 'current' && <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>}
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between items-center mb-0.5">
                          <span className={`text-sm font-black uppercase tracking-wider ${step.status === 'pending' ? 'text-slate-600' : 'text-white'}`}>{step.label}</span>
                          <span className="text-[10px] font-bold text-slate-500 mono">{step.time}</span>
                       </div>
                       <div className={`h-1 w-full rounded-full bg-white/5 overflow-hidden ${step.status === 'completed' ? 'opacity-100' : 'opacity-20'}`}>
                          <div className="h-full bg-cyan-500" style={{width: '100%'}}></div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="glass-panel p-10 rounded-[3rem] flex-1 border border-white/5 bg-slate-900/40 h-fit flex flex-col overflow-hidden shadow-2xl">
            <h4 className="text-[12px] font-black text-slate-500 uppercase tracking-widest mb-10 flex justify-between items-center">
               Live Updates Stream
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_emerald]"></span>
            </h4>
            <div className="flex-1 overflow-y-auto custom-scroll space-y-5 pr-2">
               {(incident.LiveTracking.Timeline || []).slice().reverse().map((t, i) => (
                 <div key={i} className="p-5 bg-black/30 rounded-3xl border border-white/5 flex flex-col gap-2 group hover:bg-white/5 transition-all">
                    <div className="flex justify-between items-center">
                       <span className="mono text-[10px] font-black text-cyan-500 uppercase tracking-widest">Tele_Sync: {t.time}</span>
                       <span className="text-[8px] font-black text-emerald-500 uppercase border border-emerald-500/20 px-2 rounded-full">OK</span>
                    </div>
                    <p className="text-xs font-bold text-slate-300 leading-tight">EVENT_{i}: {t.event}</p>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* Main Map Visualization */}
      <div className="col-span-8 glass-panel rounded-[4rem] relative overflow-hidden border border-white/10 group shadow-[0_0_100px_rgba(0,0,0,0.5)]">
         <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-[0.5] transition-all duration-1000 scale-110 group-hover:scale-100" />
         <div className="absolute inset-0 bg-slate-950/20"></div>
         <div className="absolute inset-0 grid-overlay opacity-30"></div>

         {/* Animated Path Simulation */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1000">
            <path d="M200,800 L400,600 L600,600 L800,200" fill="none" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="6" strokeDasharray="15 15" className="animate-pulse" />
            <path d="M200,800 L400,600" fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round" strokeDasharray="500" strokeDashoffset="500" className="animate-in fade-in duration-1000" />
         </svg>

         {/* Unit Marker */}
         <div className="absolute top-[40%] left-[45%]">
            <div className="relative group/marker scale-125">
               <div className="w-20 h-20 bg-cyan-500/20 rounded-full animate-ping"></div>
               <div className="absolute inset-0 m-auto w-10 h-10 bg-cyan-600 border-4 border-white/20 rounded-2xl rotate-45 flex items-center justify-center shadow-2xl">
                  <span className="-rotate-45 text-lg">🚓</span>
               </div>
               <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-3xl px-6 py-3 rounded-2xl border border-white/20 text-center min-w-[200px] shadow-2xl animate-in slide-in-from-top-4 duration-500">
                  <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-1">Asset: Delta-12</p>
                  <div className="flex justify-between items-center text-[9px] font-black text-slate-500 mono border-t border-white/10 pt-2 mt-1">
                     <span>V: 74 KM/H</span>
                     <span>SIG: 98%</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Target Pulse */}
         <div className="absolute top-[20%] right-[20%]">
            <div className="w-16 h-16 bg-rose-500/30 rounded-full animate-ping"></div>
            <div className="absolute inset-0 m-auto w-6 h-6 bg-rose-500 border-4 border-white rounded-full shadow-[0_0_30px_rose]"></div>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-rose-500 font-black text-[10px] uppercase tracking-widest whitespace-nowrap bg-black/60 px-3 py-1 rounded-full border border-rose-500/30">Target Vector</div>
         </div>

         {/* Bottom Data Overlay */}
         <div className="absolute bottom-12 left-12 right-12 z-20">
            <div className="glass-panel p-10 rounded-[3.5rem] bg-black/80 backdrop-blur-3xl border border-white/10 flex justify-between items-center shadow-[0_0_60px_rgba(0,0,0,0.4)]">
               <div className="flex gap-16">
                  <div>
                     <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Network Telemetry</p>
                     <p className="text-2xl font-black text-white italic tracking-tighter">ENCRYPTED_FLOW_SECURE</p>
                  </div>
                  <div className="w-px h-12 bg-white/10"></div>
                  <div>
                     <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Grid Sync</p>
                     <p className="text-2xl font-black text-emerald-400 mono tracking-tighter">99.2% OPTIMAL</p>
                  </div>
               </div>
               <div className="flex gap-6">
                  <button className="px-12 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] transition-all active:scale-95">Expand Scan</button>
                  <button className="px-12 py-5 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-2xl shadow-xl shadow-cyan-500/20 active:scale-95 transition-all">Intercept Command</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

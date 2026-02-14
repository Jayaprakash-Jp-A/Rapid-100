
import React from 'react';
import { EmergencyIncident } from '../types';

export const MobileDispatch: React.FC<{ incident: EmergencyIncident | null }> = ({ incident }) => {
  if (!incident) return (
    <div className="h-full flex flex-col items-center justify-center opacity-20 py-20 p-2">
       <div className="text-8xl mb-8">📱</div>
       <p className="tactical-header text-3xl font-black text-slate-500 tracking-[0.5em] uppercase">No Dispatch Signal Detected</p>
    </div>
  );

  return (
    <div className="h-full max-w-5xl mx-auto flex flex-col p-4 animate-in zoom-in-[0.98] duration-700">
      <div className="flex-1 glass-panel rounded-[4rem] border-[16px] border-slate-900 bg-[#010409] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)] relative">
        <div className="absolute inset-0 grid-overlay opacity-5 pointer-events-none"></div>
        
        {/* Device Header Bar */}
        <div className="h-14 bg-slate-950/80 border-b border-white/5 flex items-center justify-between px-12 z-20">
           <div className="flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
              <span className="mono text-[10px] font-black text-slate-500 uppercase tracking-widest">5G_ENCRYPTED // UNIT_07</span>
           </div>
           <div className="flex items-center gap-6">
              <span className="mono text-[10px] font-black text-slate-600">BAT: 94%</span>
              <span className="mono text-[11px] font-black text-slate-400">20:57:42</span>
           </div>
        </div>

        {/* Dynamic Alert Banner */}
        <div className="p-12 bg-rose-600/10 border-b-8 border-rose-600/80 relative overflow-hidden group">
           <div className="absolute inset-0 bg-rose-600/5 animate-pulse"></div>
           <div className="relative z-10">
              <h4 className="text-[14px] font-black text-rose-500 uppercase tracking-[0.5em] mb-4">Urgent Dispatch Authorized</h4>
              <h2 className="tactical-header text-6xl font-black text-white italic tracking-tighter mb-4 uppercase">Bravo Unit 7</h2>
              <p className="text-2xl font-bold text-slate-300 uppercase tracking-widest">{incident.EmergencyType} // SECTOR_ACTIVE</p>
           </div>
        </div>

        {/* Content Matrix */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-10 p-12 z-10 overflow-y-auto">
           <div className="space-y-10">
              <div className="glass-panel p-10 rounded-[3rem] border border-white/5 bg-slate-900/40 hover:bg-slate-900/60 transition-all shadow-inner">
                 <p className="text-[12px] font-black text-slate-600 uppercase tracking-[0.4em] mb-6">Target Location Point</p>
                 <p className="text-3xl font-black text-white italic tracking-tighter leading-tight">{incident.Location}</p>
                 <div className="mt-8 pt-8 border-t border-white/5">
                    <p className="text-sm font-black text-rose-500 uppercase tracking-widest underline underline-offset-8">Immediate Response Required</p>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                 <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40 text-center">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3">Air Distance</p>
                    <p className="text-4xl font-black text-white mono tracking-tighter">2.5 <span className="text-sm">KM</span></p>
                 </div>
                 <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40 text-center">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3">Est. Target ETA</p>
                    <p className="text-4xl font-black text-cyan-400 mono tracking-tighter">04:12 <span className="text-sm">M</span></p>
                 </div>
              </div>
           </div>

           <div className="glass-panel rounded-[3.5rem] border border-white/5 overflow-hidden relative shadow-2xl bg-slate-900/20">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 grayscale" />
              <div className="absolute inset-0 bg-slate-950/40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 bg-blue-500/20 rounded-full animate-ping"></div>
                 <div className="w-6 h-6 bg-blue-600 border-4 border-white/80 rounded-full shadow-[0_0_20px_blue]"></div>
              </div>
              <div className="absolute bottom-10 left-10 right-10 bg-black/90 p-5 rounded-3xl text-center border border-white/10 backdrop-blur-3xl shadow-2xl">
                 <p className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-1">Live Tele_Relay Stream</p>
                 <p className="text-[9px] font-bold text-slate-600 mono uppercase tracking-widest">Lat: 45.28 // Lon: 122.3W</p>
              </div>
           </div>
        </div>

        {/* Tactical Footer Action Bar */}
        <div className="p-10 bg-slate-950/90 border-t border-white/10 flex gap-8 z-20">
           <button className="flex-1 py-10 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-2xl uppercase tracking-[0.5em] rounded-[2.5rem] shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all active:scale-95 border-t border-white/20">Response OK</button>
           <button className="px-16 py-10 bg-white/5 hover:bg-white/10 text-slate-500 hover:text-slate-300 font-black text-2xl uppercase tracking-widest rounded-[2.5rem] transition-all border border-white/10 active:scale-95">REJECT</button>
        </div>
      </div>
      <div className="text-center mt-8">
         <p className="text-[11px] font-black text-slate-700 uppercase tracking-[0.8em] animate-pulse">Vehicle Command Terminal v5.2 // NODE_SYNCED</p>
      </div>
    </div>
  );
};

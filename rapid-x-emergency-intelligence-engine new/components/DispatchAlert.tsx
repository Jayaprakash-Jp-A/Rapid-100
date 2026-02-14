
import React from 'react';
import { EmergencyIncident } from '../types';

export const DispatchAlert: React.FC<{ incident: EmergencyIncident | null }> = ({ incident }) => {
  if (!incident) return (
    <div className="h-full flex items-center justify-center opacity-20 py-20">
       <div className="text-center">
          <div className="text-8xl mb-8">🏢</div>
          <p className="tactical-header text-3xl font-black text-slate-500 tracking-[0.5em] uppercase">No Unit Selected For Detail</p>
       </div>
    </div>
  );

  const personnel = [
    { name: 'Officer D. Hale', badge: 'B-3342', role: 'Command', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hale' },
    { name: 'Sergeant J. Roe', badge: 'S-7128', role: 'Support', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roe' },
    { name: 'Officer K. Chen', badge: 'B-4402', role: 'Field', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chen' }
  ];

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-700 p-2">
      <div className="lg:col-span-4 space-y-10">
        {/* Alert Header Panel */}
        <div className="glass-panel p-10 rounded-[3rem] border-blue-500/30 bg-blue-500/5 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><span className="text-8xl">🚨</span></div>
           <h4 className="text-[12px] font-black text-slate-500 uppercase tracking-widest mb-10">Department Response Alert</h4>
           <h2 className="tactical-header text-5xl font-black text-white italic tracking-tighter mb-4 uppercase">Bravo Unit 7</h2>
           <p className="text-xl font-black text-blue-400 uppercase tracking-[0.2em]">{incident.EmergencyType}</p>
           <div className="mt-12 space-y-4">
              <div className="flex justify-between items-center text-sm font-bold border-b border-white/5 pb-5">
                 <span className="text-slate-500 uppercase text-[10px]">Signal Status</span>
                 <span className="text-emerald-400 mono px-3 py-1 bg-emerald-500/10 rounded-lg">IMMEDIATE_DEPLOY</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold border-b border-white/5 pb-5">
                 <span className="text-slate-500 uppercase text-[10px]">Coordinates</span>
                 <span className="text-white mono">45.28N // 122.3W</span>
              </div>
           </div>
        </div>

        {/* Personnel Panel */}
        <div className="glass-panel p-10 rounded-[3rem] border-white/5 bg-slate-900/40">
           <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-10">Assigned Tactical Team</h4>
           <div className="space-y-6">
              {personnel.map((p, i) => (
                <div key={i} className="flex items-center gap-6 p-5 hover:bg-white/5 rounded-3xl transition-all group border border-transparent hover:border-white/5">
                   <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-white/10 overflow-hidden group-hover:scale-110 transition-transform shadow-xl">
                      <img src={p.avatar} className="w-full h-full" alt="" />
                   </div>
                   <div>
                      <p className="text-sm font-black text-white">{p.name}</p>
                      <p className="text-[10px] font-bold text-slate-600 uppercase mono">{p.badge} // {p.role}</p>
                   </div>
                   <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="lg:col-span-8 flex flex-col gap-10">
         {/* Integrated Map View */}
         <div className="flex-1 glass-panel rounded-[4rem] border-white/5 overflow-hidden relative shadow-2xl">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 grayscale" />
            <div className="absolute inset-0 bg-[#0f172a]/60"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="relative">
                  <div className="w-24 h-24 bg-blue-500/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 m-auto w-8 h-8 bg-blue-600 border-4 border-white/40 rounded-full shadow-[0_0_40px_blue]"></div>
                  <div className="absolute -top-20 -left-28 bg-black/95 p-6 rounded-[2rem] border border-white/20 text-center min-w-[240px] shadow-2xl">
                     <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2">Target Vector</p>
                     <p className="text-sm font-bold text-white uppercase italic leading-tight">{incident.Location}</p>
                     <p className="text-[9px] font-black text-slate-600 mono mt-3 uppercase tracking-widest italic">Authorization Required</p>
                  </div>
               </div>
            </div>
            
            <div className="absolute bottom-12 left-12 right-12 flex gap-8">
               <div className="flex-1 glass-panel p-8 rounded-3xl bg-black/80 backdrop-blur-3xl text-center border border-white/10">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Target Distance</p>
                  <p className="text-3xl font-black text-white mono">2.5 <span className="text-sm text-slate-600">KM</span></p>
               </div>
               <div className="flex-1 glass-panel p-8 rounded-3xl bg-black/80 backdrop-blur-3xl text-center border border-white/10">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Calculated ETA</p>
                  <p className="text-3xl font-black text-cyan-400 mono">04:12 <span className="text-sm text-slate-600">M</span></p>
               </div>
            </div>
         </div>

         {/* Command Footer */}
         <div className="glass-panel p-10 rounded-[3rem] border border-white/5 bg-slate-900/40 flex items-center gap-12">
            <div className="flex-1">
               <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4">Command Directive Nodes</h4>
               <p className="text-base font-medium text-slate-300 leading-relaxed italic pr-10">
                 "Execute dynamic perimeter search in Sector 7. Maintain thermal locks on all subjects. Direct neural feed required."
               </p>
            </div>
            <div className="flex gap-4">
               <button className="px-12 py-5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-2xl shadow-xl transition-all active:scale-95">Accept Protocol</button>
               <button className="px-12 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] transition-all active:scale-95 text-slate-400">Request Intel</button>
            </div>
         </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';

interface FleetUnit {
  id: string;
  type: 'AMBULANCE' | 'FIRE' | 'POLICE';
  status: 'RESPONDING' | 'IDLE' | 'ON_SCENE' | 'ESCALATED';
  pos: { x: number; y: number };
  target: { x: number; y: number };
  speed: number;
  health: number;
  battery: number;
}

export const FleetTracking: React.FC = () => {
  const [units, setUnits] = useState<FleetUnit[]>([
    { id: 'AMB-01', type: 'AMBULANCE', status: 'RESPONDING', pos: { x: 10, y: 10 }, target: { x: 70, y: 80 }, speed: 0.5, health: 100, battery: 84 },
    { id: 'FIRE-04', type: 'FIRE', status: 'RESPONDING', pos: { x: 90, y: 10 }, target: { x: 20, y: 60 }, speed: 0.3, health: 100, battery: 92 },
    { id: 'POL-12', type: 'POLICE', status: 'ESCALATED', pos: { x: 50, y: 50 }, target: { x: 85, y: 15 }, speed: 0.8, health: 95, battery: 45 },
    { id: 'AMB-02', type: 'AMBULANCE', status: 'IDLE', pos: { x: 30, y: 40 }, target: { x: 30, y: 40 }, speed: 0, health: 100, battery: 98 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setUnits(prev => prev.map(u => {
        if (u.status !== 'RESPONDING' && u.status !== 'ESCALATED') return u;
        
        const dx = u.target.x - u.pos.x;
        const dy = u.target.y - u.pos.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 1) return { ...u, status: 'ON_SCENE' as const };
        
        return {
          ...u,
          pos: {
            x: u.pos.x + (dx / dist) * u.speed,
            y: u.pos.y + (dy / dist) * u.speed
          }
        };
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col gap-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="tactical-header text-3xl font-black text-white uppercase tracking-tighter">Fleet Command & Orchestration</h2>
           <p className="text-[10px] font-black text-slate-500 uppercase mono tracking-widest mt-1">Global Asset Network: 142 Connected Units</p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> System Resolution: 98%
          </div>
          <button className="px-6 py-2 bg-blue-600 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20">Pre-Position Assets</button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Map View */}
        <div className="lg:col-span-8 glass rounded-[3.5rem] border-white/10 relative overflow-hidden bg-slate-950/40">
           <div className="absolute inset-0 z-0 pointer-events-none opacity-5" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
           
           <svg className="absolute inset-0 w-full h-full z-10 p-10" viewBox="0 0 100 100">
             {units.map(u => (
               <g key={u.id}>
                 <circle cx={u.pos.x} cy={u.pos.y} r="1.5" fill={u.status === 'ESCALATED' ? '#f43f5e' : u.type === 'FIRE' ? '#f43f5e' : u.type === 'AMBULANCE' ? '#10b981' : '#3b82f6'} className={u.status !== 'IDLE' ? 'animate-pulse' : ''} />
                 <text x={u.pos.x + 2} y={u.pos.y} fontSize="2.5" fill="white" className="mono font-black">{u.id}</text>
               </g>
             ))}
           </svg>

           {/* Predictive Surge Zone Suggestion */}
           <div className="absolute top-10 right-10 p-6 glass border-cyan-500/40 bg-cyan-500/5 rounded-[2rem] max-w-xs animate-in slide-in-from-right-10 duration-1000">
              <h5 className="text-[10px] font-black text-cyan-500 uppercase mb-2">Predictive Logic Suggestion</h5>
              <p className="text-[11px] text-slate-300 italic mb-4">"Surge detected in Sector 4 (Downtown). Probability of Medical call rising to 82% in next 30 mins."</p>
              <button className="w-full py-3 bg-cyan-500/20 border border-cyan-500/40 rounded-xl text-cyan-400 text-[9px] font-black uppercase">Approve Pre-Positioning</button>
           </div>
        </div>

        {/* Asset Performance Feed */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
           <div className="glass p-8 rounded-[2.5rem] border-white/10 flex-1 overflow-y-auto custom-scroll">
              <h4 className="text-[12px] font-black text-slate-500 uppercase tracking-widest mb-8">Asset Performance Telemetry</h4>
              <div className="space-y-4">
                 {units.map(u => (
                   <div key={u.id} className={`p-6 bg-white/5 rounded-3xl border border-white/5 transition-all ${u.status === 'ESCALATED' ? 'border-rose-500/50 bg-rose-500/5 shadow-[0_0_20px_rgba(244,63,94,0.1)]' : 'hover:bg-white/10'}`}>
                      <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-4">
                            <span className="text-xl">{u.type === 'FIRE' ? '🚒' : u.type === 'AMBULANCE' ? '🚑' : '🚓'}</span>
                            <p className="text-sm font-black text-white">{u.id}</p>
                         </div>
                         <span className={`px-2 py-0.5 rounded text-[8px] font-black mono ${u.status === 'ESCALATED' ? 'bg-rose-500 text-white' : 'bg-white/10 text-slate-400'}`}>{u.status}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Battery</p>
                            <div className="h-1 w-full bg-white/5 rounded-full"><div className={`h-full ${u.battery < 50 ? 'bg-orange-500' : 'bg-emerald-500'}`} style={{ width: `${u.battery}%` }}></div></div>
                         </div>
                         <div>
                            <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Field Health</p>
                            <div className="h-1 w-full bg-white/5 rounded-full"><div className="h-full bg-cyan-500" style={{ width: `${u.health}%` }}></div></div>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

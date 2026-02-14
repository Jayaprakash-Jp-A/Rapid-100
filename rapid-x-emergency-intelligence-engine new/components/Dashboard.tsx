
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, ComposedChart, Line } from 'recharts';
import { EmergencyIncident, PriorityLevel } from '../types';

interface DashboardProps {
  incidents: EmergencyIncident[];
}

export const Dashboard: React.FC<DashboardProps> = ({ incidents }) => {
  const priorityData = [
    { name: 'CRITICAL', value: incidents.filter(i => i.PriorityLevel === PriorityLevel.CRITICAL).length, color: '#f43f5e', glow: 'shadow-rose-500/20' },
    { name: 'HIGH', value: incidents.filter(i => i.PriorityLevel === PriorityLevel.HIGH).length, color: '#f97316', glow: 'shadow-orange-500/20' },
    { name: 'MEDIUM', value: incidents.filter(i => i.PriorityLevel === PriorityLevel.MEDIUM).length, color: '#3b82f6', glow: 'shadow-blue-500/20' },
    { name: 'LOW', value: incidents.filter(i => i.PriorityLevel === PriorityLevel.LOW).length, color: '#64748b', glow: 'shadow-slate-500/20' },
  ];

  const trendData = incidents.map((inc, i) => ({
    time: i,
    risk: inc.LifeRiskScore,
    distress: inc.DistressScore,
    priority: inc.PriorityScore
  })).reverse();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-4 rounded-xl border border-white/10 shadow-2xl">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Signal Data</p>
          {payload.map((p: any, i: number) => (
            <div key={i} className="flex justify-between items-center gap-8 mb-1">
              <span className="text-[10px] text-slate-400">{p.name}</span>
              <span className="text-xs font-bold mono" style={{ color: p.color }}>{p.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 space-y-8 overflow-y-auto max-h-full pb-32">
      {/* Header telemetry cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Streams', value: incidents.length, sub: 'LIVE FEED', color: 'text-cyan-400', icon: '📡' },
          { label: 'Mean Distress', value: incidents.length ? Math.round(incidents.reduce((a,b)=>a+b.DistressScore,0)/incidents.length) : '0', sub: 'SYSTEM AVG %', color: 'text-orange-500', icon: '🧠' },
          { label: 'Critical Alert', value: incidents.filter(i=>i.PriorityLevel===PriorityLevel.CRITICAL).length, sub: 'IMMEDIATE', color: 'text-rose-500', icon: '🚨' },
          { label: 'Network Strain', value: `${Math.min(100, Math.floor(incidents.length * 14.2))}%`, sub: 'RESOURCE LOAD', color: 'text-emerald-400', icon: '⚡' }
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl border border-white/5 transition-all duration-500 hover:border-white/20 group hover-glow">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
              <span className="text-xl opacity-20 group-hover:opacity-100 transition-opacity duration-500">{stat.icon}</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className={`text-4xl font-black mono tracking-tighter ${stat.color}`}>{stat.value}</span>
              <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Area Chart */}
        <div className="lg:col-span-8 glass p-8 rounded-3xl h-[500px] border border-white/5 flex flex-col relative overflow-hidden group">
          <div className="scanline"></div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Integrated Intelligence Stream</h3>
              <p className="text-[9px] text-slate-500 mt-1 uppercase tracking-widest">Cross-Signal Temporal Matrix</p>
            </div>
            <div className="flex gap-6">
              {[
                { label: 'RISK', color: '#f43f5e' },
                { label: 'DISTRESS', color: '#06b6d4' },
                { label: 'PRIORITY', color: '#fbbf24' }
              ].map(l => (
                <span key={l.label} className="flex items-center gap-2 text-[10px] font-black text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: l.color }}></span> {l.label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDist" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" name="RISK" dataKey="risk" stroke="#f43f5e" fillOpacity={1} fill="url(#colorRisk)" strokeWidth={3} activeDot={{ r: 6, fill: '#f43f5e' }} />
                <Area type="monotone" name="DISTRESS" dataKey="distress" stroke="#06b6d4" fillOpacity={1} fill="url(#colorDist)" strokeWidth={3} activeDot={{ r: 6, fill: '#06b6d4' }} />
                <Area type="monotone" name="PRIORITY" dataKey="priority" stroke="#fbbf24" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Radar / Bar Chart */}
        <div className="lg:col-span-4 glass p-8 rounded-3xl h-[500px] border border-white/5 flex flex-col">
          <div className="text-center mb-10">
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Network Severity Radar</h3>
            <p className="text-[9px] text-slate-500 mt-1 uppercase tracking-widest">Case Distribution by Weighted Priority</p>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData} layout="vertical" margin={{ left: -20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} width={80} className="font-black" />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={35}>
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest italic leading-relaxed">
              Neural Weighting Protocol Active // <span className="text-cyan-500">Auto-Calibration Enabled</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

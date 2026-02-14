
import React from 'react';
import { EmergencyIncident, PriorityLevel, CaseStatus } from '../types';

interface IncidentCardProps {
  incident: EmergencyIncident;
  onExecuteDeployment?: () => void;
}

export const IncidentCard: React.FC<IncidentCardProps> = ({ incident, onExecuteDeployment }) => {
  const isCritical = incident.PriorityLevel === PriorityLevel.CRITICAL;
  const currentStatus = incident.LiveTracking?.CurrentStatus || CaseStatus.RECEIVED;
  const isDeployed = currentStatus !== CaseStatus.RECEIVED && currentStatus !== CaseStatus.UNDER_ANALYSIS;

  return (
    <div className={`glass rounded-3xl overflow-hidden mb-8 transition-all duration-700 hover:border-white/20 relative group ${isCritical ? 'glow-red border-rose-500/40 animate-pulse-subtle' : 'glow-cyan border-cyan-500/20'}`}>
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/10 rounded-tl-3xl"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/10 rounded-br-3xl"></div>

      {/* Header Panel */}
      <div className={`px-8 py-4 flex justify-between items-center ${isCritical ? 'bg-rose-500/5' : 'bg-cyan-500/5'} border-b border-white/5`}>
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="mono text-[9px] font-bold text-slate-500 tracking-widest uppercase">Incident Vector</span>
            <h3 className="mono text-xl font-black text-white">{incident.IncidentID}</h3>
          </div>
          <div className="h-8 w-[1px] bg-white/10"></div>
          <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-lg ${
            isCritical ? 'border-rose-500 text-rose-500 bg-rose-500/10 shadow-rose-500/20' : 'border-cyan-500 text-cyan-500 bg-cyan-500/10 shadow-cyan-500/10'
          }`}>
            {incident.PriorityLevel}
          </span>
          <div className="h-8 w-[1px] bg-white/10"></div>
          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
            isDeployed ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' : 'border-slate-500/30 text-slate-500'
          }`}>
            Status: {currentStatus}
          </span>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right mr-4">
             <span className="mono text-[9px] text-slate-500 block uppercase">Surge Risk</span>
             {/* Fix: accessing ClusterID instead of undefined DashboardModules */}
             <span className={`text-xs font-bold ${incident.PriorityLevel === PriorityLevel.CRITICAL ? 'text-rose-500' : 'text-cyan-400'}`}>{incident.Clustering.IsMasterIncident ? 'Master Incident' : 'Independent Call'}</span>
           </div>
           <div className="h-8 w-[1px] bg-white/10"></div>
           <div className="text-right ml-4">
            <span className="mono text-[9px] text-slate-500 block uppercase tracking-widest">Network Timestamp</span>
            <span className="mono text-sm text-slate-300 font-bold">{new Date(incident.Timestamp).toLocaleTimeString([], { hour12: false })}</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Signal Stream Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Live Transcription Feed</span>
                <span className="text-[10px] px-2 py-0.5 bg-cyan-500/10 rounded border border-cyan-500/30 text-cyan-400 mono">{incident.DetectedLanguage}</span>
              </div>
              <div className="bg-black/40 p-5 rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors">
                <p className="text-sm text-slate-200 italic leading-relaxed font-light">
                  "{incident.Transcript}"
                </p>
                {incident.Translation && (
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-[11px] text-cyan-200/60 leading-relaxed">
                      <span className="text-cyan-500 font-bold mr-2">INTELLIGENT_TRANSLATION:</span>
                      {incident.Translation}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Acoustic Intelligence */}
            <div className="space-y-4">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Acoustic Fingerprinting</span>
              <div className="flex flex-wrap gap-2">
                {incident.AcousticAnalysis.DetectedSounds.map((sound, i) => (
                  <span key={i} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-[10px] text-indigo-300 mono">
                    🔊 {sound}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
                <span>Ambient: {incident.AcousticAnalysis.EnvironmentType}</span>
                <span className="text-orange-400">Noise: {incident.AcousticAnalysis.BackgroundNoiseLevel}</span>
              </div>
            </div>
          </div>

          {/* Intelligence Matrix Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="grid grid-cols-2 gap-4">
               {[
                 { label: 'Distress Index', value: incident.DistressScore, color: 'text-orange-400', bar: true },
                 { label: 'Fatality Risk', value: incident.LifeRiskScore, color: 'text-rose-500', bar: true },
                 { label: 'Survival Rate', value: incident.SurvivalProbability, color: 'text-emerald-400' },
                 { label: 'Demographic', value: `${incident.Demographics.EstimatedGender}/${incident.Demographics.EstimatedAgeGroup}`, color: 'text-blue-400' }
               ].map((stat, i) => (
                 <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
                   <p className={`text-xl font-black ${stat.color} mono mb-2`}>{stat.value}{typeof stat.value === 'number' ? '%' : ''}</p>
                   {stat.bar && typeof stat.value === 'number' && (
                     <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className={`h-full ${stat.color.replace('text-', 'bg-')} shadow-[0_0_8px_currentColor]`} style={{ width: `${stat.value}%` }}></div>
                     </div>
                   )}
                 </div>
               ))}
            </div>

            {/* Vulnerability Status */}
            <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
              incident.Demographics.VulnerabilityStatus === 'Critical' ? 'bg-rose-500/10 border-rose-500/30' : 'bg-white/5 border-white/5'
            }`}>
              <div className={`w-3 h-3 rounded-full animate-pulse ${
                incident.Demographics.VulnerabilityStatus === 'Critical' ? 'bg-rose-500' : 'bg-cyan-500'
              }`}></div>
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase">Vulnerability Profile</p>
                <p className="text-xs font-bold text-white">{incident.Demographics.VulnerabilityStatus} Alert</p>
                {/* Fix: removed reference to undefined VulnerabilityReason */}
              </div>
            </div>

            {/* Distress Markers */}
            <div className="space-y-2">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Aural Distress Markers</span>
               <div className="flex flex-wrap gap-2">
                 {incident.DistressMarkers.map((m, i) => (
                   <span key={i} className="px-2 py-1 bg-rose-500/10 border border-rose-500/20 text-[9px] text-rose-400 font-bold uppercase rounded-md">
                     {m}
                   </span>
                 ))}
               </div>
            </div>
          </div>

          {/* Dispatch Command Column */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="bg-cyan-500/5 p-6 rounded-3xl border border-cyan-500/20 flex-1 flex flex-col">
              <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <span className="p-1 bg-cyan-500 rounded text-white text-[8px]">CMD</span> Orchestration Plan
              </h4>
              
              <div className="space-y-5 flex-1">
                <div className="flex justify-between items-center group/row">
                  <span className="text-xs text-slate-500 uppercase tracking-tighter">Assigned Department</span>
                  <span className="text-xs font-black text-white px-3 py-1 bg-white/5 rounded border border-white/10 group-hover/row:border-cyan-500/30 transition-colors">{incident.DepartmentClassification.PrimaryDepartment}</span>
                </div>
                <div className="flex justify-between items-center group/row">
                  <span className="text-xs text-slate-500 uppercase tracking-tighter">Unit Allocation</span>
                  <span className="text-xs font-black text-white">{incident.LiveTracking.AssignedUnit}</span>
                </div>
                <div className="flex justify-between items-center group/row">
                  <span className="text-xs text-slate-500 uppercase tracking-tighter">Arrival ETA</span>
                  <span className="text-sm font-black text-emerald-400 mono tracking-tighter">{incident.LiveTracking.EstimatedArrivalTime}</span>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">Adaptive Protocols</span>
                  <div className="space-y-3">
                    {/* Fix: AdaptiveQuestions instead of FollowUpQuestions */}
                    {incident.AdaptiveQuestions.map((q, i) => (
                      <div key={i} className="group/q flex gap-3 items-start p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
                        <span className="text-[10px] font-black text-cyan-500/40 mono mt-1">0{i+1}</span>
                        <p className="text-[11px] text-slate-300 leading-tight group-hover/q:text-white transition-colors">{q}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={onExecuteDeployment}
                disabled={isDeployed}
                className={`w-full mt-8 py-4 font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl transition-all shadow-xl active:scale-95 ${
                  isDeployed 
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 cursor-default' 
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white hover:shadow-cyan-500/20 hover-glow'
                }`}
              >
                {isDeployed ? 'Operation In Progress' : 'Execute Deployment'}
              </button>
            </div>
          </div>

        </div>
      </div>
      
      {/* Risk Summary Footer */}
      <div className="px-8 py-4 bg-black/40 border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
               <span className="text-[9px] font-black text-slate-500 uppercase">Life Prob.</span>
               <span className="text-[10px] font-bold text-white mono">{incident.LifeRiskScore}%</span>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-[9px] font-black text-slate-500 uppercase">Clustered Case</span>
               {/* Fix: access ClusterID from Clustering directly */}
               <span className="text-[10px] font-bold text-cyan-400 mono">{incident.Clustering.ClusterID || 'N/A'}</span>
            </div>
         </div>
         <p className="text-[10px] text-slate-500 italic font-medium max-w-xl truncate">
            {incident.ExplainabilitySummary}
         </p>
      </div>
    </div>
  );
};

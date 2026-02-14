
import React, { useState, useRef } from 'react';
import { EmergencyIncident, PriorityLevel, CaseStatus } from '../types';
import { SAMPLE_TRANSCRIPTS } from '../constants';

interface CentralizedAnalysisProps {
  incident: EmergencyIncident | null;
  onDeploy: () => void;
  onProcessSample: (text: string) => void;
  onProcessAudio: (audioData: { data: string; mimeType: string }) => void;
  onReset: () => void;
}

export const CentralizedAnalysis: React.FC<CentralizedAnalysisProps> = ({ 
  incident, onDeploy, onProcessSample, onProcessAudio, onReset 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];
      mediaRecorder.current.ondataavailable = (e) => audioChunks.current.push(e.data);
      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = (reader.result as string).split(',')[1];
          onProcessAudio({ data: base64data, mimeType: 'audio/webm' });
        };
      };
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) { console.error(err); }
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
  };

  if (!incident) return (
    <div className="h-full flex flex-col items-center justify-center space-y-12 py-20 animate-in fade-in duration-1000">
      <div className="text-center space-y-4">
        <h2 className="tactical-header text-6xl font-black tracking-tighter uppercase text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">Centralized Call Analysis</h2>
        <p className="text-slate-500 mono text-xs uppercase tracking-[0.8em] animate-pulse">Awaiting Input Pulse</p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <button 
          onMouseDown={startRecording} onMouseUp={stopRecording}
          className={`w-40 h-40 rounded-full border-8 transition-all duration-500 flex flex-col items-center justify-center ${isRecording ? 'border-rose-500 bg-rose-500/20 shadow-[0_0_70px_rgba(244,63,94,0.4)]' : 'border-cyan-500/20 bg-white/5 hover:border-cyan-500/40'}`}
        >
          <span className="text-5xl mb-2">{isRecording ? '⏺️' : '🎙️'}</span>
          <span className="text-[9px] font-black uppercase tracking-widest">{isRecording ? 'Listening...' : 'Hold to Speak'}</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full px-10">
        {SAMPLE_TRANSCRIPTS.map((transcript, idx) => (
          <button key={idx} onClick={() => onProcessSample(transcript)} className="glass-panel p-8 rounded-[2.5rem] text-left hover:border-cyan-500/40 transition-all border border-white/5 hover:bg-cyan-500/5 group">
            <div className="flex justify-between items-center mb-4">
               <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Signal Stream 0{idx+1}</p>
               <span className="text-xs group-hover:scale-125 transition-transform">🎧</span>
            </div>
            <p className="text-sm text-slate-400 italic line-clamp-2">"{transcript}"</p>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full grid grid-cols-12 gap-8 animate-in slide-in-from-bottom-10 duration-700 p-2 pb-24">
      {/* LEFT COLUMN */}
      <div className="col-span-4 space-y-8">
        {/* Caller Information */}
        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40 shadow-2xl">
           <h4 className="text-[12px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8 flex justify-between items-center">
             Caller Information
             <span className="text-[9px] text-emerald-500 mono">VERIFIED</span>
           </h4>
           <div className="flex items-center gap-8">
              <div className="w-24 h-24 rounded-[2rem] bg-cyan-600/10 flex items-center justify-center text-5xl border-2 border-cyan-500/20 shadow-inner">
                 {incident.Demographics.EstimatedGender === 'Female' ? '👩' : '👨'}
              </div>
              <div className="flex-1 grid grid-cols-2 gap-y-6 gap-x-8">
                 <div><p className="text-[10px] font-black text-slate-600 uppercase mb-1">Gender</p><p className="text-lg font-black text-white">{incident.Demographics.EstimatedGender}</p></div>
                 <div><p className="text-[10px] font-black text-slate-600 uppercase mb-1">Approx Age</p><p className="text-lg font-black text-white mono">{incident.Demographics.EstimatedAgeGroup}</p></div>
                 <div className="col-span-2"><p className="text-[10px] font-black text-slate-600 uppercase mb-1">Relationship Profile</p><p className="text-base font-black text-cyan-400">{incident.Demographics.Relationship || 'Direct Subject'}</p></div>
              </div>
           </div>
        </div>

        {/* Transcript Analysis */}
        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40 flex-1 flex flex-col min-h-[400px]">
           <div className="flex justify-between items-center mb-8">
              <h4 className="text-[12px] font-black text-slate-500 uppercase tracking-[0.3em]">Signal Decryption</h4>
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 text-[10px] font-black rounded-lg border border-cyan-500/20">{incident.DetectedLanguage}</span>
           </div>
           <div className="space-y-8 overflow-y-auto custom-scroll pr-4 flex-1">
              <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                 <p className="text-[10px] font-black text-slate-600 uppercase mb-3 tracking-widest">Original Transmission:</p>
                 <p className="text-base text-slate-300 italic leading-relaxed">"{incident.Transcript}"</p>
              </div>
              {incident.Translation && (
                <div className="p-6 bg-cyan-500/5 rounded-3xl border border-cyan-500/10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10"><span className="text-4xl">🌐</span></div>
                   <p className="text-[10px] font-black text-cyan-500/80 uppercase mb-3 tracking-widest">Neural Translation Synthesis:</p>
                   <p className="text-lg text-white font-medium leading-relaxed">"{incident.Translation}"</p>
                </div>
              )}
           </div>
        </div>

        {/* Personnel allocation */}
        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40 shadow-xl">
           <h4 className="text-[12px] font-black text-slate-500 uppercase tracking-[0.3em] mb-10 text-center">Assigned Interception Team</h4>
           <div className="grid grid-cols-3 gap-8">
              {[
                { name: 'Officer D. Hale', badge: 'RX-566', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Officer1' },
                { name: 'Officer J. Medon', badge: 'RX-6EE', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Officer2' },
                { name: 'Officer K. Chen', badge: 'RX-422', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Officer3' }
              ].map((p, i) => (
                <div key={i} className="flex flex-col items-center group">
                   <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/5 mb-3 group-hover:border-cyan-500/30 transition-all shadow-2xl">
                      <img src={p.avatar} alt="" />
                   </div>
                   <p className="text-[10px] font-black text-white group-hover:text-cyan-400 transition-colors uppercase">{p.name.split(' ')[1]}</p>
                   <p className="text-[9px] font-bold text-slate-600 mono">{p.badge}</p>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* MIDDLE COLUMN */}
      <div className="col-span-5 space-y-8">
        {/* Intelligence Summary Panel */}
        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5"><span className="text-8xl">📊</span></div>
           <div className="flex justify-between items-center mb-8">
              <h4 className="text-[12px] font-black text-slate-500 uppercase tracking-[0.3em]">Signal Analytics Matrix</h4>
              <span className="text-[10px] text-slate-500 italic mono tracking-widest">UTF-8 // ENCRYPTED</span>
           </div>
           <p className="text-lg text-slate-200 leading-relaxed font-medium mb-8 pr-12">
             {incident.ExplainabilitySummary}
           </p>
           <div className="grid grid-cols-2 gap-10">
              <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                 <p className="text-[10px] font-black text-slate-600 uppercase mb-1 tracking-widest">Primary Nature</p>
                 <p className="text-xl font-black text-cyan-400 uppercase italic">{incident.EmergencyType}</p>
              </div>
              <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                 <p className="text-[10px] font-black text-slate-600 uppercase mb-1 tracking-widest">Dispatcher Node</p>
                 <p className="text-xl font-black text-white mono uppercase">RX_NODE_07</p>
              </div>
           </div>
        </div>

        {/* Tactical Gauges */}
        <div className="grid grid-cols-2 gap-8">
           <div className="glass-panel p-10 rounded-[3rem] border border-white/5 bg-slate-900/40 flex flex-col items-center text-center shadow-inner group">
              <h4 className="text-[12px] font-black text-slate-500 uppercase tracking-widest mb-8">Emotional Stress Index</h4>
              <div className="relative w-40 h-40 mb-6">
                 <svg className="w-full h-full -rotate-90">
                    <circle cx="80" cy="80" r="74" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                    <circle cx="80" cy="80" r="74" fill="transparent" stroke="#f97316" strokeWidth="12" strokeDasharray="465" strokeDashoffset={465 - (465 * incident.EmotionalIntensity / 100)} className="transition-all duration-1000" strokeLinecap="round" />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-white mono">{incident.EmotionalIntensity}</span>
                    <span className="text-[9px] font-black text-slate-600 uppercase">Intensity</span>
                 </div>
              </div>
              <p className="text-sm font-black text-orange-400 uppercase tracking-[0.3em] italic">{incident.EmotionalState}</p>
           </div>
           
           <div className="glass-panel p-10 rounded-[3rem] border border-white/5 bg-slate-900/40 flex flex-col items-center text-center shadow-inner group">
              <h4 className="text-[12px] font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span> Lethality Risk Score
              </h4>
              <div className="flex items-center gap-6 mb-8">
                 <span className="text-8xl font-black text-rose-500 mono drop-shadow-[0_0_20px_rgba(244,63,94,0.3)]">{incident.LifeRiskScore}</span>
                 <div className="text-left border-l-2 border-rose-500/20 pl-4">
                    <p className="text-[10px] font-black text-slate-600 uppercase">Risk Index</p>
                    <p className="text-xs font-black text-rose-500 animate-pulse tracking-widest">CRITICAL_VITAL</p>
                 </div>
              </div>
              <p className="text-[11px] font-medium text-slate-400 italic leading-relaxed pr-2">
                 "Distress markers indicate significant trauma. Immediate intervention authorized."
              </p>
           </div>
        </div>

        {/* Analysis Data Matrix Table */}
        <div className="glass-panel p-10 rounded-[3rem] border border-white/5 bg-slate-900/40 shadow-2xl">
           <h4 className="text-[12px] font-black text-slate-500 uppercase tracking-[0.3em] mb-10">Neural Analysis Matrix</h4>
           <div className="space-y-6">
              <div className="grid grid-cols-12 gap-6 items-center border-b border-white/5 pb-6 hover:bg-white/5 transition-colors p-2 rounded-xl">
                 <div className="col-span-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Grid Coordinates:</div>
                 <div className="col-span-8 text-lg font-black text-white italic truncate">{incident.Location}</div>
              </div>
              <div className="grid grid-cols-12 gap-6 items-center border-b border-white/5 pb-6 hover:bg-white/5 transition-colors p-2 rounded-xl">
                 <div className="col-span-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Signal Confidence:</div>
                 <div className="col-span-8 text-lg font-black text-cyan-400 mono">HIGH {incident.LocationConfidence}</div>
              </div>
              <div className="grid grid-cols-2 gap-12 pt-6">
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] font-black text-slate-700 uppercase mb-3">False Call Probability</p>
                    <div className="flex items-center gap-6">
                       <span className="text-2xl font-black text-emerald-500 mono">{incident.FalseCallProbabilityIndex}%</span>
                       <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden shadow-inner">
                          <div className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" style={{width: `${incident.FalseCallProbabilityIndex}%`}}></div>
                       </div>
                    </div>
                 </div>
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] font-black text-slate-700 uppercase mb-3">Tactical Priority Score</p>
                    <div className="flex items-center gap-6">
                       <span className="text-2xl font-black text-rose-500 mono">{incident.PriorityScore}%</span>
                       <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden shadow-inner">
                          <div className="h-full bg-rose-500 shadow-[0_0_10px_#f43f9e] animate-pulse" style={{width: `${incident.PriorityScore}%`}}></div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="col-span-3 space-y-8">
        {/* Satellite Map */}
        <div className="glass-panel rounded-[3rem] h-80 relative overflow-hidden group border border-white/5 shadow-2xl">
           <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
           <div className="absolute inset-0 bg-slate-950/30"></div>
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                 <div className="w-20 h-20 bg-rose-500/20 rounded-full animate-ping"></div>
                 <div className="absolute inset-0 m-auto w-6 h-6 bg-rose-500 border-4 border-white/40 rounded-full shadow-[0_0_30px_rose]"></div>
              </div>
           </div>
           <div className="absolute bottom-6 right-6 bg-black/90 px-5 py-2 rounded-full text-[10px] font-black text-slate-500 uppercase mono border border-white/10 shadow-2xl">GPS_FIX_SECURE</div>
           <div className="absolute top-6 left-6 flex gap-2">
              <span className="w-3 h-3 bg-rose-500 rounded-full animate-pulse shadow-[0_0_10px_rose]"></span>
              <span className="text-[9px] font-black text-white mono uppercase tracking-widest bg-black/40 px-2 rounded backdrop-blur-sm">LIVE FEED_04</span>
           </div>
        </div>

        {/* Emergency Deployment Panel */}
        <div className="glass-panel p-10 rounded-[3rem] border border-white/5 bg-slate-900/40 flex-1 flex flex-col shadow-2xl">
           <h4 className="text-[12px] font-black text-slate-500 uppercase tracking-[0.3em] mb-12 flex justify-between items-center">
             Emergency Protocol
             <span className="text-[10px] font-black text-rose-500 animate-pulse tracking-[0.2em]">ALERT_LVL_5</span>
           </h4>
           <div className="space-y-8 flex-1">
              <div className="flex items-center gap-6 border-b border-white/5 pb-8 group">
                 <span className="text-5xl group-hover:scale-110 transition-transform duration-500">🚑</span>
                 <div>
                    <p className="text-[11px] font-black text-rose-500 uppercase tracking-widest mb-1">Target Category</p>
                    <p className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight">{incident.EmergencyType}</p>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-6 border-b border-white/5 pb-8">
                 <div><p className="text-[10px] font-black text-slate-600 uppercase mb-2 tracking-widest">Vocal Tone</p><p className="text-base font-black text-white uppercase italic">{incident.EmotionalState}</p></div>
                 <div><p className="text-[10px] font-black text-slate-600 uppercase mb-2 tracking-widest">Cluster ID</p><p className="text-base font-black text-white mono">3208-RX</p></div>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5 shadow-inner">
                 <p className="text-[11px] font-black text-slate-700 uppercase mb-5 tracking-[0.3em] text-center underline underline-offset-8">Directive Checklist</p>
                 <ul className="space-y-4">
                    {(incident.AdaptiveQuestions || []).slice(0, 3).map((q, i) => (
                      <li key={i} className="flex gap-4 text-[11px] text-slate-400 group cursor-default hover:text-white transition-all">
                         <span className="text-emerald-500 font-black">✓</span> {q}
                      </li>
                    ))}
                 </ul>
              </div>
              <button 
                onClick={onDeploy} 
                className="w-full mt-auto py-6 bg-gradient-to-br from-rose-600 to-rose-800 hover:from-rose-500 hover:to-rose-700 text-white font-black text-sm uppercase tracking-[0.5em] rounded-[2rem] shadow-[0_0_50px_rgba(244,63,94,0.3)] transition-all active:scale-95 border-t border-white/20"
              >
                Authorize Deployment
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

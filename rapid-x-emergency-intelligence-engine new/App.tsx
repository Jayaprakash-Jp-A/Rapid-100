
import React, { useState, useEffect, useRef } from 'react';
import { GeminiService } from './services/geminiService';
import { EmergencyIncident, CaseStatus, SystemMetrics, PriorityLevel, TimelineEvent } from './types';
import { SAMPLE_TRANSCRIPTS } from './constants';

// Modular Dashboard Components
import { CentralizedAnalysis } from './components/CentralizedAnalysis';
import { OperationsDashboard } from './components/OperationsDashboard';
import { IncidentTracking } from './components/IncidentTracking';
import { IncidentHistory } from './components/IncidentHistory';
import { CaseProgress } from './components/CaseProgress';
import { ReportsAnalytics } from './components/ReportsAnalytics';
import { FleetTracking } from './components/FleetTracking';
import { DispatchAlert } from './components/DispatchAlert';
import { MobileDispatch } from './components/MobileDispatch';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('ANALYSIS');
  const [incidents, setIncidents] = useState<EmergencyIncident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<EmergencyIncident | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  
  // Real-time Simulation State
  const [metrics, setMetrics] = useState<SystemMetrics>({
    totalCallsToday: 256,
    criticalCases: 18,
    avgResponseTime: "05m 42s",
    successRate: 92,
    departmentStats: { police: 7, fire: 5, medical: 6, cyber: 3 },
    networkStrain: 34,
    activeUnits: 24,
    surgeLevel: 'NORMAL',
    predictionAccuracy: '99.1%'
  });

  const geminiService = useRef(new GeminiService());

  useEffect(() => {
    // Live Telemetry Simulation
    const simInterval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        networkStrain: Math.max(10, Math.min(100, prev.networkStrain + (Math.random() * 4 - 2))),
        totalCallsToday: prev.totalCallsToday + (Math.random() > 0.95 ? 1 : 0),
        surgeLevel: prev.networkStrain > 80 ? 'CRITICAL_SURGE' : prev.networkStrain > 60 ? 'ELEVATED' : 'NORMAL'
      }));
    }, 3000);

    return () => clearInterval(simInterval);
  }, []);

  const handleProcessInput = async (input: string | { data: string; mimeType: string }) => {
    setIsProcessing(true);
    setErrorState(null);
    try {
      const incident = await geminiService.current.processInput(input);
      incident.LiveTracking.Timeline = [
        { time: new Date().toLocaleTimeString([], {hour12:false}), event: 'Signal Locked', status: 'completed' as const, actor: 'SYSTEM' },
        { time: new Date().toLocaleTimeString([], {hour12:false}), event: 'Neural Synthesis Complete', status: 'completed' as const, actor: 'AI_NODE' }
      ];
      incident.LiveTracking.CurrentStatus = CaseStatus.UNDER_ANALYSIS;
      
      setIncidents(prev => [incident, ...prev]);
      setSelectedIncident(incident);
      setActiveTab('ANALYSIS');
    } catch (e: any) {
      console.error("Synthesis failed:", e);
      setErrorState(e.message || "Synthesis Failed. Ensure API Key is valid.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExecuteDispatch = (incident: EmergencyIncident) => {
    const updated: EmergencyIncident = {
      ...incident,
      LiveTracking: {
        ...incident.LiveTracking,
        CurrentStatus: CaseStatus.DISPATCHED,
        Timeline: [
          ...(incident.LiveTracking.Timeline || []),
          { 
            time: new Date().toLocaleTimeString([], {hour12:false}), 
            event: 'Unit Deployed: Bravo-07', 
            status: 'completed' as const, 
            actor: 'CMDR' 
          }
        ]
      }
    };
    setIncidents(prev => prev.map(i => i.IncidentID === updated.IncidentID ? updated : i));
    setSelectedIncident(updated);
    setActiveTab('TRACKING');
  };

  const renderActiveDashboard = () => {
    const inc = selectedIncident || incidents[0];
    
    switch(activeTab) {
      case 'ANALYSIS': return (
        <CentralizedAnalysis 
          incident={selectedIncident} 
          onProcessSample={handleProcessInput} 
          onProcessAudio={handleProcessInput}
          onDeploy={() => handleExecuteDispatch(selectedIncident!)} 
          onReset={() => setSelectedIncident(null)} 
        />
      );
      case 'OPERATIONS': return <OperationsDashboard metrics={metrics} incidents={incidents} />;
      case 'FLEET': return <FleetTracking />;
      case 'TRACKING': return <IncidentTracking incident={inc} />;
      case 'HISTORY': return <IncidentHistory incidents={incidents} />;
      case 'PROGRESS': return <CaseProgress incident={inc} />;
      case 'DEPT_VIEW': return <DispatchAlert incident={inc} />;
      case 'MOBILE': return <MobileDispatch incident={inc} />;
      case 'REPORTS': return <ReportsAnalytics incidents={incidents} metrics={metrics} />;
      default: return <OperationsDashboard metrics={metrics} incidents={incidents} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 font-sans relative overflow-hidden">
      <div className="scanline"></div>

      {errorState && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-top-4">
           <div className="bg-rose-500/20 backdrop-blur-xl border border-rose-500/50 px-8 py-4 rounded-2xl flex items-center gap-4 shadow-2xl">
              <span className="text-xl">⚠️</span>
              <p className="text-xs font-black uppercase tracking-widest text-rose-200">{errorState}</p>
              <button onClick={() => setErrorState(null)} className="ml-4 text-rose-500 hover:text-rose-300">✕</button>
           </div>
        </div>
      )}
      
      {/* Tactical Sidebar */}
      <nav className="w-20 md:w-64 border-r border-white/5 bg-[#010409]/95 backdrop-blur-3xl flex flex-col items-center py-10 z-50">
        <div className="mb-14 px-6 flex flex-col items-center w-full">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center shadow-2xl relative">
            <span className="mono font-black text-3xl text-white">RX</span>
            {metrics.surgeLevel !== 'NORMAL' && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full animate-ping"></span>
            )}
          </div>
          <div className="hidden md:block mt-6 text-center">
            <h1 className="tactical-header font-black text-lg tracking-[0.2em]">RAPID-X</h1>
            <p className="text-[9px] font-black text-cyan-500/60 uppercase tracking-[0.4em] mt-1.5 mono italic">Node_Orchestrator_v5</p>
          </div>
        </div>

        <div className="flex-1 w-full px-4 space-y-2 overflow-y-auto custom-scroll">
          {[
            { id: 'OPERATIONS', label: 'Sector Hub', icon: '📊' },
            { id: 'ANALYSIS', label: 'Intake Lab', icon: '🎧' },
            { id: 'FLEET', label: 'Fleet Ops', icon: '🚑' },
            { id: 'TRACKING', label: 'Live Map', icon: '📍' },
            { id: 'PROGRESS', label: 'Execution', icon: '⚡' },
            { id: 'DEPT_VIEW', label: 'Unit Detail', icon: '🏢' },
            { id: 'HISTORY', label: 'History', icon: '📜' },
            { id: 'REPORTS', label: 'Analytics', icon: '📈' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-center md:justify-start gap-4 p-4 rounded-xl transition-all border ${
                activeTab === item.id 
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]' 
                  : 'text-slate-500 border-transparent hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="hidden md:block font-black text-[10px] tracking-widest uppercase truncate">{item.label}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-10 px-6 w-full hidden md:block">
           <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[9px] font-black text-slate-500 uppercase mb-2">Network Stability</p>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                 <div className={`h-full transition-all duration-1000 ${metrics.surgeLevel === 'CRITICAL_SURGE' ? 'bg-rose-500 shadow-[0_0_10px_#f43f9e]' : 'bg-cyan-500 shadow-[0_0_10px_cyan]'}`} style={{ width: `${metrics.networkStrain}%` }}></div>
              </div>
           </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between backdrop-blur-3xl bg-slate-950/40 z-50">
          <div className="flex items-center gap-6">
             <div className="h-8 w-1 bg-cyan-500 rounded-full shadow-[0_0_15px_cyan]"></div>
             <h2 className="tactical-header text-sm font-black text-white tracking-widest uppercase">{activeTab} // COMMAND_MATRIX</h2>
          </div>
          <div className="flex items-center gap-8">
             <div className="flex flex-col text-right">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Prediction Fidelity</span>
                <span className="text-sm font-black mono text-emerald-400">99.1% // OPTIMAL</span>
             </div>
             <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner hover:bg-white/10 transition-colors cursor-pointer">🔔</div>
          </div>
        </header>

        <section className="flex-1 overflow-hidden relative p-8">
          <div className="h-full w-full overflow-y-auto custom-scroll">
            {isProcessing ? (
              <div className="h-full flex flex-col items-center justify-center">
                 <div className="w-32 h-32 border-4 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin mb-10 shadow-[0_0_50px_rgba(6,182,212,0.2)]"></div>
                 <h2 className="tactical-header font-black text-2xl text-cyan-500 tracking-[0.4em] animate-pulse uppercase">Synthesizing Tactical Intel...</h2>
                 <p className="text-[10px] text-slate-500 mono mt-4 uppercase">Applying Multilingual NLP + Emotional Forensics</p>
              </div>
            ) : renderActiveDashboard()}
          </div>
        </section>

        {/* Global Surge Warning */}
        <div className="fixed bottom-10 right-10 z-[100] pointer-events-none">
           <div className={`glass-panel p-6 rounded-[2rem] border ${metrics.surgeLevel === 'CRITICAL_SURGE' ? 'border-rose-500/40 bg-rose-500/5' : 'border-cyan-500/30'} flex items-center gap-6 animate-in slide-in-from-right-10 duration-700 shadow-2xl`}>
              <div className={`w-4 h-4 rounded-full ${metrics.surgeLevel === 'CRITICAL_SURGE' ? 'bg-rose-500 animate-ping' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'}`}></div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Status Monitor</p>
                 <p className="text-sm font-black text-white mono uppercase">{metrics.surgeLevel} ACTIVE</p>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;

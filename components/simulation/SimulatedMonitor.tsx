'use client';

import React, { useState, useEffect } from 'react';
import { SimulatedMonitorConfig } from '../../lib/simulation-models';
import { Power, Activity, HeartPulse, ShieldAlert } from 'lucide-react';

interface SimulatedMonitorProps {
  config: SimulatedMonitorConfig;
  onInterventionSelect: (actionId: string) => void;
  vitals?: { hr: number; spo2: number; bp: { systolic: number; diastolic: number } };
}

export function SimulatedMonitor({ 
  config, 
  onInterventionSelect,
  vitals = { hr: 80, spo2: 98, bp: { systolic: 120, diastolic: 80 } }
}: SimulatedMonitorProps) {
  
  const [isPowered, setIsPowered] = useState(false);
  const [booting, setBooting] = useState(false);
  const [leads, setLeads] = useState({
    ecg: false,
    spo2: false,
    nibp: false
  });
  
  // Fake animated ECG path
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      setOffset((prev) => (prev + 3) % 1000);
      animationFrame = requestAnimationFrame(animate);
    };
    if (isPowered && leads.ecg) {
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isPowered, leads.ecg]);

  const togglePower = () => {
    if (!isPowered) {
      setIsPowered(true);
      setBooting(true);
      setTimeout(() => setBooting(false), 2000);
    } else {
      setIsPowered(false);
      setLeads({ ecg: false, spo2: false, nibp: false });
    }
  };

  const handleAttach = (sensor: keyof typeof leads) => {
    if (!isPowered || booting) return;
    setLeads(prev => ({ ...prev, [sensor]: !prev[sensor] }));
  };

  // Generate a continuous looking wave by repeating a pattern
  const wavePattern = "M0,50 L20,50 L25,40 L30,50 L50,50 L55,20 L60,80 L65,50 L80,50 L85,45 L95,45 L100,50";
  const fullWave = Array.from({length: 15}).map((_, i) => 
    wavePattern.replace(/(\d+),(\d+)/g, (match, x, y) => `${parseInt(x) + (i * 100)},${y}`)
  ).join(" ");

  return (
    <div className="flex flex-col bg-black rounded-xl border-4 border-slate-700 w-full overflow-hidden font-mono shadow-2xl relative">
      
      {/* Hardware Bezel & Power Button */}
      <div className="bg-slate-800 p-2 flex justify-between items-center border-b border-black shadow">
        <div className="flex gap-2 items-center">
          <Activity className="w-5 h-5 text-slate-500" />
          <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">LIFE-SYNC 4000 ALS</span>
        </div>
        <button 
          onClick={togglePower}
          className={`p-2 rounded-full transition-all shadow-inner ${
            isPowered 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
              : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
          }`}
        >
          <Power className="w-4 h-4" />
        </button>
      </div>

      {/* Screen Area */}
      <div className="flex h-72 w-full bg-[#050505] relative">
        {!isPowered ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            {/* Screen Off */}
          </div>
        ) : booting ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] z-10">
            <Activity className="w-12 h-12 text-slate-700 animate-pulse mb-4" />
            <div className="text-slate-500 text-sm tracking-widest animate-pulse">SYSTEM BOOT...</div>
          </div>
        ) : (
          <>
            {/* Waveform Area */}
            <div className="flex-1 flex flex-col justify-between pt-10 pb-4 px-2 border-r border-slate-900 relative overflow-hidden">
              
              {/* Top info strip overlay */}
              <div className="absolute top-0 left-0 w-full flex justify-between px-4 py-2 bg-gradient-to-b from-black/80 to-transparent z-10">
                <div className="text-emerald-500 text-sm font-bold flex gap-4">
                  <span>{leads.ecg ? config.initialRhythmText : 'NO RHYTHM DETECTED'}</span>
                  <span>Adult</span>
                </div>
                <div className="flex gap-2">
                   <button 
                    onClick={() => handleAttach('ecg')}
                    className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold transition-all ${
                      leads.ecg 
                        ? 'bg-emerald-950/50 text-emerald-400 border-emerald-900' 
                        : 'bg-slate-900 text-slate-500 border-slate-700 hover:bg-slate-800 hover:text-slate-300 animate-pulse'
                    }`}
                   >
                     {leads.ecg ? 'ECG ON' : 'Attach ECG'}
                   </button>
                </div>
              </div>

              {/* Simulated ECG Line */}
              <div className="absolute inset-0 flex items-center px-0 overflow-hidden pointer-events-none">
                {leads.ecg ? (
                  <svg 
                    viewBox={`0 0 1000 100`} 
                    className="h-[60%] stroke-emerald-500 w-[200%] max-w-none transition-transform" 
                    strokeWidth="2" 
                    fill="none" 
                    style={{ transform: `translateX(-${offset}px)` }}
                  >
                    <path d={fullWave} style={{ filter: 'drop-shadow(0 0 2px rgba(16, 185, 129, 0.8))' }} />
                  </svg>
                ) : (
                  <div className="w-full flex items-center">
                     <div className="w-full h-[2px] bg-slate-800"></div>
                  </div>
                )}
              </div>
              
              <div className="text-emerald-600 text-xs mt-auto self-start z-10">Lead II - x1.0 - 25mm/s</div>
            </div>

            {/* Vitals Sidebar */}
            <div className="w-48 bg-[#0a0a0a] flex flex-col p-3 gap-3 border-l border-slate-800/50">
              
              {/* HR Block */}
              <div className="flex flex-col bg-[#050505] p-2 rounded border border-slate-900">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-emerald-500 text-[10px] font-bold">HR</div>
                  <HeartPulse className={`w-3 h-3 text-emerald-500 ${leads.ecg ? 'animate-pulse' : 'opacity-20'}`} />
                </div>
                <div className="text-emerald-400 text-4xl font-bold tracking-tighter text-right">
                  {leads.ecg ? vitals.hr : '--'}
                </div>
              </div>

              {/* SpO2 Block */}
              <div 
                onClick={() => handleAttach('spo2')}
                className={`flex flex-col p-2 rounded border cursor-pointer transition-all ${
                  leads.spo2 
                    ? 'bg-[#050505] border-slate-900 hover:border-cyan-900' 
                    : 'bg-slate-900/30 border-slate-800 border-dashed hover:bg-slate-800/50'
                }`}
              >
                <div className="text-cyan-400 text-[10px] font-bold mb-1 flex justify-between">
                  SpO2 
                  {!leads.spo2 && <span className="text-slate-500 animate-pulse">CLICK TO ATTACH</span>}
                </div>
                <div className="text-cyan-400 text-3xl font-bold tracking-tighter text-right">
                  {leads.spo2 ? (
                    <>{vitals.spo2}<span className="text-sm opacity-50">%</span></>
                  ) : '--'}
                </div>
              </div>

              {/* NIBP Block */}
              <div 
                onClick={() => handleAttach('nibp')}
                className={`flex flex-col p-2 rounded border cursor-pointer transition-all ${
                  leads.nibp
                    ? 'bg-[#050505] border-slate-900 hover:border-slate-700' 
                    : 'bg-slate-900/30 border-slate-800 border-dashed hover:bg-slate-800/50'
                }`}
              >
                <div className="text-slate-400 text-[10px] font-bold mb-1 flex justify-between">
                  NIBP 
                  {!leads.nibp && <span className="text-slate-500 animate-pulse">CLICK CUFF</span>}
                </div>
                <div className="text-slate-200 text-2xl font-bold tracking-tighter text-right leading-none">
                  {leads.nibp ? `${vitals.bp.systolic}/${vitals.bp.diastolic}` : '-/-'}
                </div>
                <div className="text-slate-500 text-[10px] text-right mt-1">
                  {leads.nibp ? `MAP ${(vitals.bp.systolic + 2 * vitals.bp.diastolic) / 3 | 0}` : 'MAP -'}
                </div>
              </div>

            </div>
          </>
        )}
      </div>

      {/* Bottom Physical Buttons (simulated) */}
      <div className="flex bg-slate-800 p-2 gap-2 border-t border-black">
        {config.supports12Lead && (
          <button 
            disabled={!isPowered || !leads.ecg}
            onClick={() => onInterventionSelect('12lead')} // Placeholder direct emit
            className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[10px] font-bold py-2 rounded uppercase transition-colors shadow-sm"
          >
            12-Lead
          </button>
        )}
        {config.supportsDefibrillation && (
          <button 
            disabled={!isPowered}
            className="flex-1 bg-rose-900 hover:bg-rose-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[10px] font-bold py-2 rounded uppercase transition-colors shadow-sm flex items-center justify-center gap-1"
          >
            <ShieldAlert className="w-3 h-3" />
            Charge
          </button>
        )}
        {config.supportsSynchronizedCardioversion && (
          <button 
            disabled={!isPowered || !leads.ecg}
            className="flex-1 bg-amber-900 hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[10px] font-bold py-2 rounded uppercase transition-colors shadow-sm"
          >
            Sync
          </button>
        )}
        {config.supportsPacing && (
          <button 
            disabled={!isPowered || !leads.ecg}
            className="flex-1 bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[10px] font-bold py-2 rounded uppercase transition-colors shadow-sm"
          >
            Pacer
          </button>
        )}
      </div>
    </div>
  );
}

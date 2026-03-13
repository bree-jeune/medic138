'use client';

import React from 'react';
import { SimulatedMonitorConfig } from '../../lib/simulation-models';

interface SimulatedMonitorProps {
  config: SimulatedMonitorConfig;
  onInterventionSelect: (actionId: string) => void;
}

export function SimulatedMonitor({ config, onInterventionSelect }: SimulatedMonitorProps) {
  
  return (
    <div className="flex flex-col bg-black rounded-xl border-4 border-slate-800 w-full overflow-hidden font-mono shadow-2xl">
      {/* Top Banner */}
      <div className="flex justify-between items-center bg-zinc-900 px-4 py-2 border-b border-zinc-800">
        <div className="flex space-x-4 text-emerald-500 text-sm font-bold">
          <span>{config.initialRhythmText}</span>
          <span>Adult</span>
        </div>
        <div className="text-zinc-500 text-xs">
          12-Lead {config.supports12Lead ? 'Available' : 'N/A'}
        </div>
      </div>

      {/* Screen Area */}
      <div className="flex h-64 w-full">
        {/* Waveform Area */}
        <div className="flex-1 flex flex-col justify-between p-4 border-r border-zinc-800 relative">
          {/* Simulated ECG Line */}
          <div className="absolute inset-0 flex items-center px-4 overflow-hidden pointer-events-none">
            <svg viewBox="0 0 1000 100" className="w-full h-full stroke-emerald-500" strokeWidth="2" fill="none" preserveAspectRatio="none">
              {/* Fake generic waveform path for visual flair, real implementation would animate this */}
              <path d="M0,50 L50,50 L60,30 L70,70 L80,50 L100,50 L120,50 L130,40 L140,50 L160,50 L170,10 L190,90 L200,50 L300,50" />
            </svg>
          </div>
          
          <div className="text-emerald-500 text-xs mt-auto">Lead II - x1.0 - 25mm/s</div>
        </div>

        {/* Vitals Sidebar */}
        <div className="w-48 bg-zinc-950 flex flex-col pt-4">
          {/* HR */}
          <div className="flex justify-between px-4 pb-2 border-b border-zinc-900">
            <div className="text-emerald-500 text-xs">HR</div>
            <div className="text-emerald-500 text-4xl font-bold tracking-tighter">132</div>
          </div>
          {/* SpO2 */}
          <div className="flex justify-between px-4 py-4 border-b border-zinc-900">
            <div className="text-cyan-400 text-xs">SpO2</div>
            <div className="text-cyan-400 text-3xl font-bold tracking-tighter">91<span className="text-sm">%</span></div>
          </div>
          {/* NIBP */}
          <div className="flex flex-col px-4 py-4 border-b border-zinc-900">
            <div className="text-zinc-400 text-xs mb-1">NIBP Auto 5m</div>
            <div className="text-white text-2xl font-bold tracking-tighter self-end">118/74</div>
            <div className="text-zinc-500 text-xs self-end mt-1">(88)</div>
          </div>
        </div>
      </div>

      {/* Bottom Physical Buttons (simulated) */}
      <div className="flex bg-zinc-800 p-3 space-x-2">
        {config.supports12Lead && (
          <button className="flex-1 bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-500 text-white text-xs font-bold py-3 rounded uppercase transition-colors">
            12-Lead
          </button>
        )}
        {config.supportsDefibrillation && (
          <button className="flex-1 bg-red-800 hover:bg-red-700 active:bg-red-600 text-white text-xs font-bold py-3 rounded uppercase transition-colors">
            Charge
          </button>
        )}
        {config.supportsSynchronizedCardioversion && (
          <button className="flex-1 bg-amber-700 hover:bg-amber-600 active:bg-amber-500 text-white text-xs font-bold py-3 rounded uppercase transition-colors">
            Sync
          </button>
        )}
        {config.supportsPacing && (
          <button className="flex-1 bg-green-800 hover:bg-green-700 active:bg-green-600 text-white text-xs font-bold py-3 rounded uppercase transition-colors">
            Pacer
          </button>
        )}
      </div>
    </div>
  );
}

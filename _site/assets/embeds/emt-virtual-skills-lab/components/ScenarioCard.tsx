import React from 'react';
import { Scenario } from '../types';

interface ScenarioCardProps {
  scenario: Scenario;
  onRefresh: () => void;
  isLoading: boolean;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onRefresh, isLoading }) => {
  const vitals = [
    { label: 'HR', value: scenario.vitals.hr, unit: 'BPM', color: 'text-zinc-300' },
    { label: 'BP', value: scenario.vitals.bp, unit: 'mmHg', color: 'text-zinc-300' },
    { label: 'RR', value: scenario.vitals.rr, unit: '/min', color: 'text-amber-400' },
    { label: 'SpO2', value: `${scenario.vitals.spO2}%`, unit: '', color: 'text-accent-blood' },
  ];

  return (
    <div className="card p-0 overflow-hidden card-reveal">
      {/* Header */}
      <div className="px-6 py-3 border-b border-zinc-800/50 flex items-center justify-between bg-surface-raised/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-1 h-2 bg-accent-clay/40 radius-full" />
            ))}
          </div>
          <span className="text-xs mono text-zinc-500 uppercase tracking-wider">
            Dispatch Terminal
          </span>
        </div>
        <button 
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2 radius-8 hover:bg-surface-highlight transition-colors text-zinc-500 hover:text-zinc-300 disabled:opacity-50"
          title="Generate new scenario"
        >
          <svg 
            className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Patient Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Demographics */}
            <div className="flex flex-wrap gap-6">
              <div>
                <span className="label block mb-1">Patient</span>
                <p className="heading-tactical text-xl text-white leading-tight">
                  {scenario.patientDemographics}
                </p>
              </div>
              <div>
                <span className="label block mb-1">Chief Complaint</span>
                <p className="heading-tactical text-xl text-accent-clay leading-tight">
                  {scenario.chiefComplaint}
                </p>
              </div>
            </div>

            {/* Narrative */}
            <div className="relative pl-4 border-l-2 border-accent-blood/30">
              <p className="text-base text-zinc-400 leading-relaxed italic">
                "{scenario.narrative}"
              </p>
            </div>

            {/* Environment Factors (if present) */}
            {scenario.environmentalFactors && (
              <div className="flex items-center gap-2 p-3 bg-amber-950/20 border border-amber-900/30 radius-12">
                <span className="text-amber-500">⚠️</span>
                <span className="text-sm text-amber-300">{scenario.environmentalFactors}</span>
              </div>
            )}
          </div>
          
          {/* Vitals Panel */}
          <div className="bg-surface-raised radius-16 p-4 border border-zinc-800/50">
            <span className="label text-center block mb-4 mono">
              Telemetry
            </span>
            <div className="grid grid-cols-2 gap-3">
              {vitals.map((vital, i) => (
                <div 
                  key={i} 
                  className="bg-surface-base/50 p-3 radius-12 border border-zinc-800/50 text-center"
                >
                  <span className="text-[10px] font-semibold text-zinc-600 uppercase tracking-wider block mb-1">
                    {vital.label}
                  </span>
                  <span className={`text-lg mono font-bold ${vital.color}`}>
                    {vital.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;

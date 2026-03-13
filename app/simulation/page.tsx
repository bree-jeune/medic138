'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { INITIAL_SCENARIOS } from '@/lib/simulation-scenarios';
import { CertificationLevel, ClinicalDomain } from '@/lib/simulation-models';
import { Activity, ShieldCheck, Stethoscope, ArrowRight, Dna } from 'lucide-react';

const CERT_LEVELS: CertificationLevel[] = ['EMR', 'EMT', 'AEMT', 'Paramedic', 'Critical Care'];
const CATEGORIES: ClinicalDomain[] = [
  'Airway, Respiration & Ventilation',
  'Cardiology & Resuscitation',
  'Trauma',
  'Medical/Obstetrics/Gynecology',
  'EMS Operations'
];

export default function SimulationHubPage() {
  const router = useRouter();
  
  // Guided Selection State
  const [selectedLevel, setSelectedLevel] = useState<CertificationLevel | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ClinicalDomain | null>(null);

  // Determine which categories actually have scenarios for the selected level
  const availableCategories = useMemo(() => {
    if (!selectedLevel) return [];
    const domains = new Set<ClinicalDomain>();
    INITIAL_SCENARIOS.map(s => s()).forEach(scenario => {
      if (scenario.targetCertification.includes(selectedLevel)) {
        domains.add(scenario.clinicalDomain);
      }
    });
    return Array.from(domains);
  }, [selectedLevel]);

  // Handle the Random Launch logic
  const handleLaunch = () => {
    if (!selectedLevel || !selectedCategory) return;
    
    // Filter scenarios matching both level and category
    const viableScenarios = INITIAL_SCENARIOS.map(s => s()).filter(
      s => s.targetCertification.includes(selectedLevel) && s.clinicalDomain === selectedCategory
    );

    if (viableScenarios.length > 0) {
      // Pick random scenario from the filtered pool
      const randomIdx = Math.floor(Math.random() * viableScenarios.length);
      const chosen = viableScenarios[randomIdx];
      router.push(`/simulation/${chosen.id}?level=${selectedLevel}`);
    } else {
      alert("No pre-built scenarios match this specific combination yet! We are constantly adding more.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <header className="px-6 py-8 border-b border-slate-800 bg-[#020617]/90 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.1),transparent_60%)] pointer-events-none"></div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2 relative z-10">
          NREMT Clinical Simulation Lab
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto relative z-10">
          Prepare for the registry with real-world complexities. Select your target certification, pick a domain, and the engine will generate a randomized scenario.
        </p>
      </header>

      <main className="max-w-4xl mx-auto p-8 font-sans">
        
        {/* Step 1: Select Certification Level */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6 border-b border-slate-800 pb-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-950 text-cyan-400 text-sm border border-cyan-900">1</span>
            Select Target Certification
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CERT_LEVELS.map(level => {
              const isActive = selectedLevel === level;
              return (
                <button
                  key={level}
                  onClick={() => {
                    setSelectedLevel(level);
                    setSelectedCategory(null); // reset category on level change
                  }}
                  className={`p-4 rounded-xl border text-sm font-bold tracking-wider uppercase transition-all flex flex-col items-center justify-center gap-2
                    ${isActive 
                      ? 'bg-cyan-900/40 border-cyan-500/80 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                      : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                    }`}
                >
                  <ShieldCheck className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-600'}`} />
                  {level}
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 2: Select Clinical Domain (Category) */}
        <section className={`mb-12 transition-all duration-500 ${selectedLevel ? 'opacity-100 translate-y-0' : 'opacity-30 pointer-events-none translate-y-4'}`}>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6 border-b border-slate-800 pb-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-950 text-blue-400 text-sm border border-blue-900">2</span>
            Select NREMT Category
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {CATEGORIES.map(category => {
              const isAvailable = availableCategories.includes(category);
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  disabled={!isAvailable}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-5 rounded-xl border text-left flex flex-col justify-between h-32 transition-all
                    ${!isAvailable 
                      ? 'bg-slate-900/30 border-slate-900/50 text-slate-700 cursor-not-allowed hidden' // hide empty categories to avoid clutter, or keep disabled
                      : isActive
                        ? 'bg-blue-900/40 border-blue-500/80 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-blue-900/50 hover:bg-slate-800'
                    }`}
                >
                  <span className="font-semibold leading-snug">{category}</span>
                  {isAvailable && (
                    <span className={`text-[10px] uppercase tracking-wider font-bold mt-2 inline-block px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-950 text-blue-400 border border-blue-900' : 'bg-slate-800 text-slate-500'}`}>
                      Available
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {selectedLevel && availableCategories.length === 0 && (
            <p className="text-emerald-500 text-sm mt-4 bg-emerald-950/30 border border-emerald-900/50 p-4 rounded-lg flex items-center gap-2">
              <Activity className="w-4 h-4" /> Building NREMT-aligned content for {selectedLevel} right now. Check back soon.
            </p>
          )}
        </section>

        {/* Step 3: Launch Command */}
        <div className={`flex justify-end transition-all duration-500 ${selectedLevel && selectedCategory ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button
            onClick={handleLaunch}
            className="group px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-emerald-900/30 flex items-center gap-3 transition-all hover:scale-105"
          >
            <Dna className="w-5 h-5 group-hover:animate-pulse" />
            Generate Random {selectedLevel} Scenario
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </main>
    </div>
  );
}

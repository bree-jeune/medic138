'use client';

import React, { useState } from 'react';

const COMMON_MEDICATIONS = [
  'Adenosine', 'Albuterol', 'Amiodarone', 'Aspirin', 'Atropine',
  'Dextrose 10%', 'Dextrose 50%', 'Epinephrine 1:1,000', 'Epinephrine 1:10,000',
  'Fentanyl', 'Glucagon', 'Ipratropium', 'Ketamine', 'Lidocaine',
  'Midazolam', 'Naloxone', 'Nitroglycerin', 'Ondansetron', 'Oxygen'
];

const COMMON_DOSES = [
  '0.4 mg', '1 mg', '2 mg', '2.5 mg', '5 mg', '6 mg', '12 mg', '50 mcg', '100 mcg', '150 mg', '300 mg', '324 mg', '15 L/min'
];

const COMMON_ROUTES = [
  'IV', 'IO', 'IM', 'IN', 'PO', 'SL', 'Nebulized', 'NRB'
];

interface MedicationPanelProps {
  onAdminister: (drug: string, dose: string, route: string) => void;
}

export function MedicationPanel({ onAdminister }: MedicationPanelProps) {
  const [selectedDrug, setSelectedDrug] = useState('');
  const [selectedDose, setSelectedDose] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDrug && selectedDose && selectedRoute) {
      onAdminister(selectedDrug, selectedDose, selectedRoute);
      setSelectedDrug('');
      setSelectedDose('');
      setSelectedRoute('');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 w-full">
      <h3 className="text-lg font-bold text-slate-100 flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-rose-500">
          <path d="M10.5 20.5 4 14l6.5-6.5a7.07 7.07 0 0 1 10 10Z"/><path d="M12 12 8 16"/>
        </svg>
        Medication Administration
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Drug</label>
          <select 
            value={selectedDrug} 
            onChange={e => setSelectedDrug(e.target.value)}
            className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select Drug...</option>
            {COMMON_MEDICATIONS.map(drug => (
              <option key={drug} value={drug}>{drug}</option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Dose</label>
            <select 
              value={selectedDose} 
              onChange={e => setSelectedDose(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>Dose...</option>
              {COMMON_DOSES.map(dose => (
                <option key={dose} value={dose}>{dose}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Route</label>
            <select 
              value={selectedRoute} 
              onChange={e => setSelectedRoute(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>Route...</option>
              {COMMON_ROUTES.map(route => (
                <option key={route} value={route}>{route}</option>
              ))}
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={!selectedDrug || !selectedDose || !selectedRoute}
          className="w-full bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md py-2 font-bold uppercase transition-colors"
        >
          Push Medication
        </button>
      </form>
    </div>
  );
}

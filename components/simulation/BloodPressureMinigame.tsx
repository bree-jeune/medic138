'use client';

import React, { useState, useEffect } from 'react';
import { SphygmomanometerConfig } from '../../lib/simulation-models';

interface BloodPressureMinigameProps {
  config: SphygmomanometerConfig;
  onComplete: (systolic: number, diastolic: number, isAccurate: boolean) => void;
}

export function BloodPressureMinigame({ config, onComplete }: BloodPressureMinigameProps) {
  const [pressureDeflating, setPressureDeflating] = useState(false);
  const [currentPressure, setCurrentPressure] = useState(0);
  const [userSystolic, setUserSystolic] = useState<number | ''>('');
  const [userDiastolic, setUserDiastolic] = useState<number | ''>('');
  
  // Visual simulation for Korotkoff sounds
  const isKorotkoffActive = pressureDeflating && 
                            currentPressure <= config.actualSystolic && 
                            currentPressure >= config.actualDiastolic;
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pressureDeflating && currentPressure > 0) {
      interval = setInterval(() => {
        setCurrentPressure((prev) => Math.max(0, prev - 2)); 
      }, 50); // Deflates about 40 mmHg per second while button is held
    }
    return () => clearInterval(interval);
  }, [pressureDeflating, currentPressure]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userSystolic === '' || userDiastolic === '') return;
    
    const sysDiff = Math.abs(userSystolic - config.actualSystolic);
    const diaDiff = Math.abs(userDiastolic - config.actualDiastolic);
    
    // Check if user is within the acceptable margin of error (+/- 4 mmHg typical NREMT standard)
    const isAccurate = sysDiff <= config.marginOfErrorAllowed && diaDiff <= config.marginOfErrorAllowed;
    
    onComplete(userSystolic, userDiastolic, isAccurate);
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 rounded-xl p-6 border border-slate-700 w-full max-w-md">
      <h3 className="text-xl font-bold text-slate-100 mb-2">Blood Pressure Assessment</h3>
      <p className="text-sm text-slate-400 text-center mb-6">
        Operate the manual sphygmomanometer. Listen closely for the Korotkoff sounds.
      </p>
      
      {/* Gauge Visual */}
      <div className="relative w-48 h-48 rounded-full border-8 border-slate-800 bg-slate-100 flex items-center justify-center shadow-inner mb-8">
        <div className="absolute inset-0 rounded-full border border-slate-300 m-2"></div>
        {/* Needle */}
        <div 
          className={`absolute w-1 origin-bottom transition-all duration-75 ${
            isKorotkoffActive ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)] animate-ping' : 'bg-red-600'
          }`}
          style={{ height: '40%', bottom: '50%', transform: `rotate(${currentPressure - 135}deg)` }}
        ></div>
        
        <div className="absolute top-1/4 text-center w-full text-slate-400 text-xs font-bold uppercase tracking-widest">mmHg</div>
        <div className="w-4 h-4 rounded-full bg-slate-800 z-10"></div>
        <div className="absolute bottom-6 font-mono text-2xl font-bold text-slate-800 flex flex-col items-center">
           {currentPressure}
           {isKorotkoffActive && <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mt-1 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>}
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex w-full space-x-4 mb-8">
        <button 
          onClick={() => setCurrentPressure(prev => Math.min(300, prev + 20))}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg py-3 font-semibold transition-colors flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          Pump
        </button>
        <button 
          onMouseDown={() => setPressureDeflating(true)}
          onMouseUp={() => setPressureDeflating(false)}
          onMouseLeave={() => setPressureDeflating(false)}
          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-3 font-semibold transition-colors flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
          Release Valve
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="w-full bg-slate-800 p-4 rounded-lg border border-slate-700">
        <div className="flex items-center justify-center space-x-2">
          <input 
            type="number" 
            placeholder="SYS"
            value={userSystolic}
            onChange={(e) => setUserSystolic(e.target.value ? parseInt(e.target.value) : '')}
            className="w-24 bg-slate-900 border border-slate-600 rounded-md py-2 px-3 text-white text-center font-mono text-lg focus:outline-none focus:border-blue-500"
            min="0"
            max="300"
          />
          <span className="text-slate-400 text-2xl">/</span>
          <input 
            type="number" 
            placeholder="DIA"
            value={userDiastolic}
            onChange={(e) => setUserDiastolic(e.target.value ? parseInt(e.target.value) : '')}
            className="w-24 bg-slate-900 border border-slate-600 rounded-md py-2 px-3 text-white text-center font-mono text-lg focus:outline-none focus:border-blue-500"
            min="0"
            max="300"
          />
        </div>
        <button 
          type="submit"
          className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md py-2 font-semibold transition-colors"
        >
          Submit Reading
        </button>
      </form>
    </div>
  );
}

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { UserLevel, Skill, SessionState, Scenario, FeedbackItem, User } from './types';
import { SKILLS } from './constants';
import SkillSelector from './components/SkillSelector';
import FeedbackDisplay from './components/FeedbackDisplay';
import SkillChecklist from './components/SkillChecklist';
import HistoryChart from './components/HistoryChart';
import HandPositionOverlay from './components/HandPositionOverlay';
import UserAuth from './components/UserAuth';
import ScenarioCard from './components/ScenarioCard';
import InstructorDashboard from './components/InstructorDashboard';
import { analyzeSkillWithContext, generateScenario, speakText, decodeAudioData } from './services/geminiService';

// ============================================================================
// DISTRACTION SYSTEM
// ============================================================================
const DISTRACTIONS = {
  [UserLevel.BEGINNER]: [],
  [UserLevel.INTERMEDIATE]: [
    "🚨 SIREN NOISE",
    "📻 RADIO STATIC",
    "🐕 DOG BARKING",
    "💨 WIND NOISE"
  ],
  [UserLevel.ADVANCED]: [
    "🚨 SIREN NOISE",
    "🗣️ BYSTANDER INTERFERENCE",
    "⚠️ MONITOR FAILURE",
    "📻 RADIO CHATTER",
    "🚑 AMBULANCE SWAY",
    "🛑 EQUIPMENT MALFUNCTION",
    "👮 OFFICER INTERRUPTION",
    "📵 TELEMETRY LOSS"
  ]
};

// ============================================================================
// ICON COMPONENTS
// ============================================================================
const Icons = {
  Refresh: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Close: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Logout: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Play: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  ChevronRight: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
const App: React.FC = () => {
  const [session, setSession] = useState<SessionState>(() => {
    const saved = localStorage.getItem('emt_lab_history');
    return {
      currentUser: null,
      userLevel: null,
      activeSkill: null,
      isRecording: false,
      isPaused: false,
      isLiveMode: false,
      history: saved ? JSON.parse(saved) : [],
      currentScenario: null,
      lightingIntensity: 1.0,
      showOverlays: true,
      activeDistraction: null
    };
  });

  const [view, setView] = useState<'lab' | 'dashboard' | 'auth'>('auth');
  const [realTimeFeedback, setRealTimeFeedback] = useState<string>('');
  const [fullAssessment, setFullAssessment] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingScenario, setIsGeneratingScenario] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analysisIntervalRef = useRef<number | null>(null);
  const distractionIntervalRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastSpokenRef = useRef<string>("");
  const isSpeakingRef = useRef<boolean>(false);
  const activeDistractionRef = useRef<string | null>(null);

  useEffect(() => {
    localStorage.setItem('emt_lab_history', JSON.stringify(session.history));
  }, [session.history]);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const handleTTS = async (text: string) => {
    if (text === lastSpokenRef.current || !text || isSpeakingRef.current) return;
    lastSpokenRef.current = text;
    isSpeakingRef.current = true;
    initAudio();
    if (!audioCtxRef.current) {
      isSpeakingRef.current = false;
      return;
    }
    const audioData = await speakText(text);
    if (audioData) {
      const buffer = await decodeAudioData(audioData, audioCtxRef.current);
      const source = audioCtxRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtxRef.current.destination);
      source.onended = () => { isSpeakingRef.current = false; };
      source.start();
    } else {
      isSpeakingRef.current = false;
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720, facingMode: 'user' },
        audio: true 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      return stream;
    } catch (err) {
      alert("Camera access required for simulation.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (analysisIntervalRef.current) { clearInterval(analysisIntervalRef.current); }
    if (distractionIntervalRef.current) { clearInterval(distractionIntervalRef.current); }
  };

  const togglePractice = async () => {
    if (session.isRecording) {
      setSession(prev => ({ ...prev, isRecording: false, activeDistraction: null }));
      activeDistractionRef.current = null;
      stopCamera();
      setIsAnalyzing(true);
      if (session.activeSkill && session.userLevel) {
        const result = await analyzeSkillWithContext("", session.activeSkill, session.userLevel, session.currentScenario, false);
        const item: FeedbackItem = {
          id: Math.random().toString(36),
          skillId: session.activeSkill.id,
          skillName: session.activeSkill.name,
          assessmentType: (result.assessmentType as any) || 'Proficient',
          score: result.score || 85,
          timestamp: Date.now(),
          fullText: result.text,
          userLevel: session.userLevel
        };
        setFullAssessment(result.text);
        setSession(prev => ({ ...prev, history: [...prev.history, item] }));
      }
      setIsAnalyzing(false);
    } else {
      if (!session.activeSkill) return;
      setFullAssessment('');
      setRealTimeFeedback('');
      setSession(prev => ({ ...prev, isRecording: true }));
      await startCamera();
      
      // Analysis loop
      analysisIntervalRef.current = window.setInterval(async () => {
        if (videoRef.current && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
          ctx?.drawImage(videoRef.current, 0, 0);
          const frame = canvasRef.current.toDataURL('image/jpeg').split(',')[1];
          
          const currentDistraction = activeDistractionRef.current;
          const distractionPrompt = currentDistraction ? ` (ACTIVE DISTRACTION: ${currentDistraction})` : '';
          
          const feedback = await analyzeSkillWithContext(
            frame, 
            session.activeSkill!, 
            session.userLevel!, 
            session.currentScenario, 
            true,
            distractionPrompt
          );
          
          setRealTimeFeedback(feedback.text);
          handleTTS(feedback.text);
        }
      }, 1000);

      // Distraction system
      distractionIntervalRef.current = window.setInterval(() => {
        const levelDistractions = DISTRACTIONS[session.userLevel!] || [];
        if (levelDistractions.length === 0) return;

        const baseChance = session.userLevel === UserLevel.ADVANCED ? 0.4 : 0.15;
        if (Math.random() < baseChance && !activeDistractionRef.current) {
          const noise = levelDistractions[Math.floor(Math.random() * levelDistractions.length)];
          setSession(prev => ({ ...prev, activeDistraction: noise }));
          activeDistractionRef.current = noise;
          
          // Visual impact for equipment failures
          if (noise.includes('FAILURE') || noise.includes('MALFUNCTION')) {
            setSession(p => ({ ...p, lightingIntensity: 0.2 }));
            setTimeout(() => setSession(p => ({ ...p, lightingIntensity: 1.0 })), 2000);
          }

          setTimeout(() => {
            setSession(prev => ({ ...prev, activeDistraction: null }));
            activeDistractionRef.current = null;
          }, 5000);
        }
      }, 8000);
    }
  };

  const handleGenerateScenario = useCallback(async () => {
    if (!session.activeSkill || !session.userLevel) return;
    setIsGeneratingScenario(true);
    try {
      const scenario = await generateScenario(session.activeSkill, session.userLevel);
      setSession(prev => ({ ...prev, currentScenario: scenario }));
    } catch (err) {
      console.error("Scenario generation failed:", err);
    } finally {
      setIsGeneratingScenario(false);
    }
  }, [session.activeSkill, session.userLevel]);

  const handleNextPhase = useCallback(async () => {
    if (!session.currentScenario || !session.userLevel) return;
    setIsGeneratingScenario(true);
    try {
      const nextSkillId = session.activeSkill?.category === 'Trauma' ? 'bvm-ventilation' : 'pulse-check';
      const nextSkill = SKILLS.find(s => s.id === nextSkillId) || session.activeSkill;
      
      const scenario = await generateScenario(nextSkill!, session.userLevel, session.currentScenario);
      setSession(prev => ({ ...prev, currentScenario: scenario, activeSkill: nextSkill }));
      setFullAssessment('');
      setRealTimeFeedback('');
    } catch (err) {
      console.error("Scenario chaining failed:", err);
    } finally {
      setIsGeneratingScenario(false);
    }
  }, [session.currentScenario, session.userLevel, session.activeSkill]);

  // ==========================================================================
  // RENDER: Level Selection
  // ==========================================================================
  const LevelSelection = () => (
    <div className="max-w-4xl mx-auto py-16 px-6 text-center">
      <div className="mb-12 card-reveal">
        <span className="label label-accent block mb-3">Training Mode</span>
        <h2 className="heading-tactical text-4xl md:text-5xl text-white mb-4">
          Select Your Level
        </h2>
        <p className="text-lg text-zinc-400 max-w-xl mx-auto">
          AI will calibrate feedback and scenario difficulty based on your experience.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.values(UserLevel).map((level, idx) => (
          <button
            key={level}
            onClick={() => setSession(p => ({ ...p, userLevel: level }))}
            className="group card card-interactive p-8 text-left card-reveal"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-6">
              <span className="label label-accent">Sector 0{idx + 1}</span>
              <div className="w-3 h-3 radius-full bg-accent-blood/30 group-hover:bg-accent-blood transition-colors" />
            </div>
            
            <h3 className="heading-tactical text-2xl text-white mb-3">{level}</h3>
            
            <p className="text-sm text-zinc-500 leading-relaxed mb-6">
              {level === UserLevel.BEGINNER && "Foundation building with detailed guidance."}
              {level === UserLevel.INTERMEDIATE && "Realistic scenarios with environmental noise."}
              {level === UserLevel.ADVANCED && "High-stress environments and equipment failures."}
            </p>
            
            <div className="h-1.5 bg-zinc-800 radius-full overflow-hidden">
              <div 
                className="h-full bg-accent-blood transition-all duration-500 group-hover:w-full"
                style={{ width: `${(idx + 1) * 33}%` }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // ==========================================================================
  // RENDER: Lab View
  // ==========================================================================
  const LabView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto px-4">
      
      {/* Left Column: Controls + History */}
      <aside className="lg:col-span-3 space-y-6 order-2 lg:order-1 lg:sticky lg:top-24 lg:self-start">
        
        {/* Environment Controls */}
        <div className="card p-6 accent-glow">
          <div className="flex items-center justify-between mb-6">
            <span className="label">Environment</span>
            <button 
              onClick={() => setSession(p => ({ ...p, userLevel: null, currentScenario: null, activeSkill: null }))}
              className="text-xs text-zinc-500 hover:text-white transition-colors"
            >
              Reset
            </button>
          </div>
          
          {/* Lighting Control */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-medium text-zinc-400">Lighting</label>
              <span className="text-xs mono text-zinc-300">{(session.lightingIntensity * 100).toFixed(0)}%</span>
            </div>
            <input 
              type="range" min="0.1" max="1" step="0.1" 
              value={session.lightingIntensity} 
              onChange={(e) => setSession(prev => ({...prev, lightingIntensity: parseFloat(e.target.value)}))}
              className="w-full"
            />
          </div>

          {/* Overlay Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Position Guides</span>
            <button 
              onClick={() => setSession(prev => ({...prev, showOverlays: !prev.showOverlays}))}
              className={`w-11 h-6 radius-full transition-all p-1 ${session.showOverlays ? 'bg-accent-blood' : 'bg-zinc-800'}`}
            >
              <div className={`w-4 h-4 bg-white radius-full transition-transform ${session.showOverlays ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Current Level */}
          <div className="mt-6 pt-6 border-t border-zinc-800/50">
            <span className="label block mb-2">Active Track</span>
            <p className="heading-tactical text-lg text-white">{session.userLevel}</p>
          </div>
        </div>

        {/* Performance Chart */}
        <HistoryChart history={session.history} />
        
        {/* Skill Checklist */}
        {session.activeSkill && (
          <SkillChecklist skill={session.activeSkill} active={session.isRecording} statusMap={{}} />
        )}
      </aside>

      {/* Center: Main Stage */}
      <section className="lg:col-span-6 space-y-6 order-1 lg:order-2">
        
        <SkillSelector 
          selectedId={session.activeSkill?.id} 
          onSelect={(s) => setSession(p => ({...p, activeSkill: s, currentScenario: null}))} 
        />
        
        {session.activeSkill && (
          <div className="space-y-6">
            
            {/* Scenario Generator */}
            {!session.currentScenario ? (
              <div className="panel p-12 text-center card-reveal">
                <div className="w-16 h-16 bg-surface-raised radius-16 flex items-center justify-center text-3xl mx-auto mb-6 border border-zinc-800/50">
                  📡
                </div>
                <h3 className="heading-tactical text-2xl text-white mb-3">
                  Ready for Dispatch
                </h3>
                <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
                  Generate a patient scenario tailored to your skill and level.
                </p>
                <button
                  onClick={handleGenerateScenario}
                  disabled={isGeneratingScenario}
                  className="btn btn-primary btn-lg"
                >
                  {isGeneratingScenario ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white radius-full animate-spin" />
                      Syncing...
                    </>
                  ) : 'Open Dispatch'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Scenario Card with Phase Indicator */}
                <div className="relative">
                  <ScenarioCard 
                    scenario={session.currentScenario} 
                    onRefresh={handleGenerateScenario} 
                    isLoading={isGeneratingScenario} 
                  />
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1.5 bg-accent-blood/30 border border-accent-blood/50 radius-8">
                      <span className="text-xs font-bold text-white mono uppercase">
                        Phase {session.currentScenario.phase}/{session.currentScenario.totalPhases}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Video Stage */}
                <div className="relative aspect-video bg-black radius-24 overflow-hidden border-4 border-surface-base shadow-xl">
                  
                  {/* Lighting overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none transition-all duration-500 z-10"
                    style={{ backgroundColor: `rgba(0,0,0, ${1 - session.lightingIntensity})` }}
                  />

                  {/* Hand Position Overlay */}
                  {session.showOverlays && session.isRecording && (
                    <HandPositionOverlay skillId={session.activeSkill.id} />
                  )}
                  
                  {/* Distraction Alert */}
                  {session.activeDistraction && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
                      <div className="bg-accent-blood/90 border border-accent-clay px-8 py-4 radius-16 backdrop-blur-md shadow-2xl animate-pulse">
                        <span className="text-xl font-bold text-white heading-tactical tracking-widest">
                          {session.activeDistraction}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Video Feed */}
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className={`w-full h-full object-cover ${session.isRecording ? 'grayscale opacity-60' : 'hidden'}`} 
                  />
                  <canvas ref={canvasRef} className="hidden" />

                  {/* Recording UI */}
                  {session.isRecording && (
                    <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between pointer-events-none">
                      <div className="flex justify-between items-start pointer-events-auto">
                        <div className="flex items-center gap-3 glass px-4 py-2 radius-full border border-zinc-800/50">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full radius-full bg-accent-blood opacity-75" />
                            <span className="relative inline-flex h-2.5 w-2.5 radius-full bg-accent-blood" />
                          </span>
                          <span className="text-xs font-bold uppercase tracking-widest text-zinc-100 mono">Recording</span>
                        </div>
                        <button 
                          onClick={togglePractice} 
                          className="btn btn-primary btn-sm"
                        >
                          End Session
                        </button>
                      </div>
                      
                      {realTimeFeedback && (
                        <div className="max-w-sm pointer-events-auto">
                          <FeedbackDisplay content={realTimeFeedback} isRealTime={true} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Idle State */}
                  {!session.isRecording && !isAnalyzing && (
                    <div className="absolute inset-0 z-40 glass flex flex-col items-center justify-center p-12 text-center">
                      <div className="w-16 h-16 bg-accent-blood radius-16 flex items-center justify-center text-3xl mb-6">
                        ⚡
                      </div>
                      <h3 className="heading-tactical text-2xl text-white mb-2">Simulation Ready</h3>
                      <p className="text-sm text-zinc-400 mb-8">
                        Level: <span className="text-accent-clay">{session.userLevel}</span>
                      </p>
                      <button 
                        onClick={togglePractice} 
                        className="btn btn-primary btn-lg"
                      >
                        <Icons.Play className="w-5 h-5" />
                        Start Procedure
                      </button>
                    </div>
                  )}

                  {/* Analyzing State */}
                  {isAnalyzing && (
                    <div className="absolute inset-0 z-40 glass flex flex-col items-center justify-center">
                      <div className="w-12 h-12 border-3 border-accent-blood/30 border-t-accent-blood radius-full animate-spin mb-6" />
                      <h3 className="heading-tactical text-xl text-white mb-2">Analyzing</h3>
                      <p className="text-sm text-zinc-400">Compiling clinical findings...</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Right Column: Assessment */}
      <aside className="lg:col-span-3 space-y-6 order-3 lg:sticky lg:top-24 lg:self-start">
        {fullAssessment ? (
          <div className="space-y-6 card-reveal">
            <FeedbackDisplay content={fullAssessment} />
            
            {/* Phase Chaining Button */}
            {session.currentScenario && session.currentScenario.phase < session.currentScenario.totalPhases && (
              <button 
                onClick={handleNextPhase} 
                disabled={isGeneratingScenario}
                className="btn btn-primary w-full py-4"
              >
                {isGeneratingScenario ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white radius-full animate-spin" />
                    Syncing Phase {session.currentScenario.phase + 1}...
                  </>
                ) : (
                  <>
                    Next Phase
                    <Icons.ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        ) : (
          <div className="card p-8 text-center opacity-50">
            <div className="text-3xl mb-4">📋</div>
            <span className="label block mb-2">Assessment</span>
            <p className="text-sm text-zinc-500">
              Complete a simulation to receive your debrief.
            </p>
          </div>
        )}
      </aside>
    </div>
  );

  // ==========================================================================
  // RENDER: Active View
  // ==========================================================================
  const activeView = useMemo(() => {
    if (view === 'auth') {
      return (
        <UserAuth 
          onLogin={(u) => { 
            setSession(p => ({ ...p, currentUser: u })); 
            setView(u.role === 'instructor' ? 'dashboard' : 'lab'); 
          }} 
        />
      );
    }
    if (view === 'dashboard') {
      return <InstructorDashboard history={session.history} />;
    }
    if (session.userLevel === null) {
      return <LevelSelection />;
    }
    return <LabView />;
  }, [view, session, isAnalyzing, isGeneratingScenario, realTimeFeedback, fullAssessment, handleGenerateScenario, handleNextPhase]);

  // ==========================================================================
  // RENDER: Main Layout
  // ==========================================================================
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface-void/95 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-accent-blood radius-12 flex items-center justify-center text-xl shadow-lg shadow-accent-blood/30">
              🚑
            </div>
            <div>
              <h1 className="heading-tactical text-lg text-white leading-none">
                Skills Lab <span className="text-zinc-500">AI</span>
              </h1>
              <p className="text-xs text-zinc-600 mono">v4.6</p>
            </div>
          </div>

          {/* Navigation */}
          {session.currentUser && (
            <nav className="hidden md:flex items-center bg-surface-base p-1 radius-12 border border-zinc-800/50">
              {session.currentUser.role === 'instructor' && (
                <button 
                  onClick={() => setView('dashboard')} 
                  className={`px-6 py-2 text-xs font-semibold uppercase tracking-wider radius-8 transition-all ${
                    view === 'dashboard' 
                      ? 'bg-accent-blood text-white' 
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  Dashboard
                </button>
              )}
              <button 
                onClick={() => setView('lab')} 
                className={`px-6 py-2 text-xs font-semibold uppercase tracking-wider radius-8 transition-all ${
                  view === 'lab' 
                    ? 'bg-accent-blood text-white' 
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                Lab Floor
              </button>
            </nav>
          )}

          {/* User Menu */}
          {session.currentUser && (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setView('auth')} 
                className="btn btn-ghost p-2"
              >
                <Icons.Logout className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 bg-surface-base radius-16 px-4 py-2 border border-zinc-800/50">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-white leading-none">
                    {session.currentUser.name}
                  </p>
                  <p className="text-xs text-accent-clay capitalize mono">
                    {session.currentUser.role}
                  </p>
                </div>
                <span className="text-2xl bg-surface-raised w-10 h-10 flex items-center justify-center radius-12">
                  {session.currentUser.avatar}
                </span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        {activeView}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-6">
        <div className="max-w-[1600px] mx-auto px-6 flex flex-wrap items-center justify-center gap-8 text-xs text-zinc-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent-blood radius-6" />
            <span className="mono uppercase tracking-wider">Tactical-Med 25</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-zinc-700 radius-6" />
            <span className="mono uppercase tracking-wider">Vision-Logic AI</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent-void radius-6" />
            <span className="mono uppercase tracking-wider">NREMT Protocol</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

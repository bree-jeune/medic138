"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { useClinicalSimulation } from "@/hooks/useClinicalSimulation";
import { SimulationAction } from "@/lib/simulation-models";
import { INITIAL_SCENARIOS } from "@/lib/simulation-scenarios";
import { PatientAvatar } from "./PatientAvatar";
import { BloodPressureMinigame } from "./BloodPressureMinigame";
import { SimulatedMonitor } from "./SimulatedMonitor";
import { MedicationPanel } from "./MedicationPanel";
import {
  Activity,
  CheckCircle,
  Clock,
  Navigation,
  Stethoscope,
  Syringe,
  HeartPulse,
  ExternalLink,
  AlertTriangle,
  PenTool,
  XCircle,
  ChevronRight,
  Map,
} from "lucide-react";

// The full sequence to display in the stepper
const ALL_PHASES = [
  "Dispatch",
  "PreArrival",
  "SceneArrival",
  "Assessment",
  "Treatment",
  "TransportDecision",
  "Destination",
];

interface SimulationCockpitProps {
  scenarioId: string;
  activeLevel?: string;
  onComplete?: (score: number, time: number) => void;
}

export function SimulationCockpit({
  scenarioId,
  activeLevel = "Paramedic",
  onComplete,
}: SimulationCockpitProps) {
  const [scratchpad, setScratchpad] = React.useState("");

  const {
    scenarioMetadata,
    currentPhase,
    simulatedTimeRemainingMs,
    readinessScore,
    isComplete,
    completedActionIds,
    actionHistory,
    penaltyLockoutMs,
    executeAction,
    canAdvancePhase,
    advancePhase,
  } = useClinicalSimulation(scenarioId);

  const feedEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of feed when new items arrive
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [completedActionIds, currentPhase]);

  // Format MS to MM:SS
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const activePhaseData = currentPhase;
  const availableActions = currentPhase.availableActions;
  const currentPhaseIndex = ALL_PHASES.indexOf(currentPhase.phaseName);

  // Helper to determine what to show in the right pane
  const renderInteractiveTool = () => {
    if (isComplete) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-900 border border-slate-700/50 rounded-xl">
          <CheckCircle className="w-16 h-16 text-emerald-400 mb-4" />
          <h3 className="text-2xl font-bold text-slate-100 mb-2">
            Scenario Completed
          </h3>
          <p className="text-slate-400 mb-6">
            Readiness Score:{" "}
            <span className="text-white font-mono">{readinessScore}</span>
          </p>
          <div className="w-full max-w-sm">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2 text-left border-b border-slate-700 pb-2">
              Clinical Sources
            </h4>
            <ul className="text-xs text-slate-500 text-left space-y-2 list-disc pl-4">
              {scenarioMetadata.sourceFootnotes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    if (activePhaseData.assessmentData) {
      const isALS =
        activeLevel === "Paramedic" || activeLevel === "Critical Care";

      return (
        <div className="space-y-6">
          {isALS && (
            <SimulatedMonitor
              config={
                activePhaseData.assessmentData.monitorConfig || {
                  supports12Lead: true,
                  supportsDefibrillation: true,
                  supportsPacing: true,
                  supportsSynchronizedCardioversion: true,
                  initialRhythmText: "Sinus Tachycardia",
                }
              }
              onInterventionSelect={(id) => executeAction(id)}
            />
          )}

          <div
            className={`grid gap-4 ${isALS ? "grid-cols-2" : "grid-cols-1"}`}
          >
            <PatientAvatar
              assessmentData={activePhaseData.assessmentData}
              onAuscultate={(point) => console.log(point)}
            />

            <div className="space-y-4 flex flex-col h-full">
              {isALS && (
                <MedicationPanel
                  onAdminister={(drug, dose, route) => {
                    console.log(`Administered ${drug} ${dose} ${route}`);
                  }}
                />
              )}

              {!isALS && activePhaseData.assessmentData.bpConfig && (
                <BloodPressureMinigame
                  config={activePhaseData.assessmentData.bpConfig}
                  onComplete={(sys, dia, isAccurate) => {
                    console.log("BP Checked:", sys, dia, isAccurate);
                  }}
                />
              )}

              {/* Provider Notes Scratchpad */}
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 flex-1 flex flex-col min-h-[250px] shadow-lg">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-700/50 text-slate-300">
                  <PenTool className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-semibold text-sm tracking-wider uppercase">
                    Provider Notes
                  </h3>
                </div>
                <textarea
                  className="flex-1 bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-sm text-slate-300 resize-none focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono placeholder:text-slate-600 custom-scrollbar"
                  placeholder="Type notes, vital signs, or findings here..."
                  value={scratchpad}
                  onChange={(e) => setScratchpad(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default empty state for the right pane until assessment phase
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-900/40 border border-slate-800/50 rounded-xl">
        <Activity className="w-12 h-12 text-slate-700 mb-4" />
        <p className="text-slate-500">
          Interactive assessments will appear here when you arrive on scene and
          begin evaluating the patient.
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-[85vh] w-full max-w-[1500px] mx-auto bg-[#020617] text-slate-200 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
      {/* Background Gradient Overlays (Legacy Design Throwback) */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.1),transparent_50%)] pointer-events-none"></div>

      {/* Far Left Sidebar: Active Phase Timeline (Activity Tab) */}
      <div className="hidden md:flex flex-col w-56 border-r border-slate-800 bg-[#020617]/90 backdrop-blur-md relative z-10 pt-6">
        <h3 className="px-5 text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
          Activity Timeline
        </h3>
        <div className="flex-1 overflow-y-auto px-3 space-y-2 no-scrollbar">
          {ALL_PHASES.map((p, i) => {
            const isPast = i < currentPhaseIndex;
            const isCurrent = i === currentPhaseIndex;

            const label = p
              .replace("Arrival", " Arrival")
              .replace("Decision", " Decision");

            return (
              <div
                key={p}
                className={`relative flex items-center p-3 rounded-xl transition-all ${
                  isCurrent
                    ? "bg-cyan-950/40 border border-cyan-900/50 shadow-sm"
                    : "border border-transparent"
                }`}
              >
                {/* Connecting Line */}
                {i < ALL_PHASES.length - 1 && (
                  <div
                    className={`absolute left-[21px] top-11 w-[3px] h-8 -z-10 ${isPast ? "bg-cyan-800" : "bg-slate-800"}`}
                  />
                )}

                {/* Bullet */}
                <div
                  className={`w-4 h-4 rounded-full flex-shrink-0 border-2 z-10 ${
                    isPast
                      ? "bg-cyan-900 border-cyan-700"
                      : isCurrent
                        ? "bg-cyan-500 border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.9)]"
                        : "bg-slate-900 border-slate-700"
                  }`}
                />

                {/* Label */}
                <span
                  className={`ml-4 text-sm font-semibold tracking-wide ${
                    isPast
                      ? "text-slate-400"
                      : isCurrent
                        ? "text-cyan-400"
                        : "text-slate-600"
                  }`}
                >
                  {label}
                </span>

                {isCurrent && (
                  <ChevronRight className="w-5 h-5 text-cyan-500 ml-auto animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Middle Pane: Incident Log & Actions */}
      <div className="flex-[1.2] flex flex-col border-r border-slate-800 bg-[#020617]/80 backdrop-blur-md relative z-10">
        {/* Cockpit Header */}
        <header className="flex flex-col p-5 border-b border-slate-800 bg-slate-900/70">
          <div className="flex items-center justify-between w-full">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                {scenarioMetadata.title}
              </h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 focus:outline-none">
                  <Clock className="w-4 h-4 text-slate-300" />{" "}
                  <span className="font-mono text-slate-200">
                    {formatTime(simulatedTimeRemainingMs)}
                  </span>
                </span>
                <span className="flex items-center gap-1.5 text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-900/50 uppercase tracking-wider text-xs font-bold">
                  <Map className="w-3.5 h-3.5" /> {currentPhase.phaseName}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">
                Readiness Score
              </div>
              <div
                className={
                  readinessScore < 100
                    ? "text-4xl font-mono text-rose-400 font-bold tracking-tight drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]"
                    : "text-4xl font-mono text-emerald-400 font-bold tracking-tight drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                }
              >
                {readinessScore}
              </div>
            </div>
          </div>
        </header>

        {/* Scenario Feed (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans no-scrollbar">
          {/* Always show current phase prompt at top if not completed */}
          {!isComplete && (
            <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700/50 text-slate-300 shadow-inner">
              <p className="leading-relaxed">{activePhaseData?.scenarioText}</p>
            </div>
          )}

          {/* Render Completed Action Log */}
          {actionHistory.map((historyItem, i) => {
            const act = historyItem.action;
            const foundText = act.text;
            const foundFeedback = act.feedback || "";
            const foundCompetency = act.competencyRef
              ? `${act.competencyRef.source}: ${act.competencyRef.standardId}`
              : "";

            return (
              <div
                key={i}
                className="pl-4 border-l-2 border-cyan-800/50 space-y-2"
              >
                <div className="text-sm font-semibold text-cyan-500 flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" />
                  Action Taken: {foundText}
                </div>
                {foundFeedback && (
                  <div className="text-sm text-slate-400 bg-slate-900/30 p-3 rounded-r-lg border border-slate-800/50 leading-relaxed italic">
                    {foundFeedback}
                    {foundCompetency && (
                      <div className="mt-2 text-xs text-slate-600 font-medium not-italic">
                        Ref: {foundCompetency}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          <div ref={feedEndRef} />
        </div>

        {/* Action Button Deck */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 backdrop-blur-md">
          {isComplete ? (
            <button
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg uppercase tracking-wider transition-colors shadow-lg shadow-emerald-900/20"
              onClick={() =>
                onComplete?.(readinessScore, simulatedTimeRemainingMs)
              }
            >
              Finish Scenario
            </button>
          ) : (
            <div className="flex flex-col gap-2 relative">
              {/* Lockout Overlay */}
              {penaltyLockoutMs > 0 && (
                <div className="absolute inset-0 z-20 bg-slate-950/80 backdrop-blur-[2px] rounded-lg flex flex-col items-center justify-center border border-rose-900/50">
                  <div className="flex items-center gap-2 text-rose-500 font-bold tracking-widest uppercase mb-1 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]">
                    <XCircle className="w-5 h-5 animate-pulse" />
                    Incorrect Action Penalty
                  </div>
                  <div className="text-3xl font-mono text-white font-bold tracking-tighter">
                    {(penaltyLockoutMs / 1000).toFixed(0)}s
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Available Interventions
                </div>
                {canAdvancePhase && (
                  <button
                    onClick={advancePhase}
                    disabled={penaltyLockoutMs > 0}
                    className="text-xs font-bold text-cyan-400 bg-cyan-950/50 hover:bg-cyan-900/80 px-3 py-1 rounded border border-cyan-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Advance to Next Phase →
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {availableActions.map((action) => {
                  const isCompleted = completedActionIds.includes(action.id);
                  return (
                    <button
                      key={action.id}
                      onClick={() => executeAction(action.id)}
                      disabled={isCompleted || penaltyLockoutMs > 0}
                      className={`flex flex-col items-start p-3 border rounded-xl transition-all text-left text-sm font-medium relative overflow-hidden ${
                        isCompleted
                          ? action.isCorrect
                            ? "bg-emerald-950/40 border-emerald-900/50 text-emerald-500/80 cursor-not-allowed"
                            : "bg-rose-950/40 border-rose-900/50 text-rose-500/80 cursor-not-allowed"
                          : "bg-slate-800/80 hover:bg-slate-700 border-slate-700 hover:border-cyan-500/80 text-slate-200 group shadow-lg drop-shadow-md"
                      }`}
                    >
                      <span className="flex items-center justify-between w-full relative z-10">
                        {action.text}
                        {isCompleted && action.isCorrect && (
                          <CheckCircle className="w-4 h-4 text-emerald-500/50" />
                        )}
                        {isCompleted && !action.isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-500/50" />
                        )}
                      </span>
                      {!isCompleted && (
                        <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider group-hover:text-cyan-400/70 transition-colors relative z-10">
                          +{(action.timeCostMs / 1000).toFixed(0)}s Time Cost
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Pane: Interactive Tools (Flex 1) */}
      <div className="flex-1 bg-[#040914] relative z-10 overflow-y-auto p-4 custom-scrollbar">
        {renderInteractiveTool()}
      </div>
    </div>
  );
}

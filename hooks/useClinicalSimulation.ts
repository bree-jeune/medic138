import { useState, useCallback, useMemo, useEffect } from "react";
import {
  SimulationPhase,
  SimulationPhaseName,
  SimulationAction,
} from "../lib/simulation-models";
import { INITIAL_SCENARIOS } from "../lib/simulation-scenarios";

interface SimulationState {
  currentPhaseName: SimulationPhaseName;
  completedActionIds: string[];
  simulatedTimeRemainingMs: number;
  readinessScore: number;
  isComplete: boolean;
  history: {
    action: SimulationAction;
    timestampAtExecutionMs: number;
  }[];
}

const PHASE_ORDER: SimulationPhaseName[] = [
  "Dispatch",
  "PreArrival",
  "SceneArrival",
  "Assessment",
  "Treatment",
  "TransportDecision",
  "Destination",
];

export function useClinicalSimulation(scenarioId: string, seed?: number) {
  // 1. Generate the static scenario structure on mount
  const scenarioDefinition = useMemo(() => {
    const builder = INITIAL_SCENARIOS.find((s) => s().id === scenarioId);
    if (!builder) throw new Error("Scenario not found");
    return builder();
  }, [scenarioId]);

  const { phases, initialVitals } = useMemo(
    () => scenarioDefinition.generateSimulation(seed),
    [scenarioDefinition, seed],
  );

  // 2. Initialize dynamic state
  const [state, setState] = useState<SimulationState>({
    currentPhaseName: "Dispatch",
    completedActionIds: [],
    simulatedTimeRemainingMs: scenarioDefinition.estimatedDurationMs,
    readinessScore: 100, // Start at 100, deduct for mistakes/inefficiencies
    isComplete: false,
    history: [],
  });

  // Current phase data block for components to render
  const currentPhase: SimulationPhase = phases[state.currentPhaseName];

  // 3. Ticking Clock Logic (Real time vs Simulated Time is loosely coupled here)
  const [penaltyLockoutMs, setPenaltyLockoutMs] = useState(0);

  // Tick down the penalty
  useEffect(() => {
    if (penaltyLockoutMs <= 0) return;
    const interval = setInterval(() => {
      setPenaltyLockoutMs((prev) => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [penaltyLockoutMs]);

  // Real-time Simulation Clock
  useEffect(() => {
    // Only tick the clock if we are past Dispatch and not completed
    if (state.currentPhaseName === "Dispatch" || state.isComplete) return;

    const interval = setInterval(() => {
      setState((prev) => {
        if (prev.isComplete) return prev;
        const newTime = prev.simulatedTimeRemainingMs - 1000;
        if (newTime <= 0) {
          return {
            ...prev,
            simulatedTimeRemainingMs: 0,
            isComplete: true,
          };
        }
        return { ...prev, simulatedTimeRemainingMs: newTime };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.currentPhaseName, state.isComplete]);

  // 4. Action Execution
  const executeAction = useCallback(
    (actionId: string) => {
      if (state.isComplete || penaltyLockoutMs > 0) return;

      const action = currentPhase.availableActions.find(
        (a) => a.id === actionId,
      );
      if (!action) return;

      if (state.completedActionIds.includes(actionId)) {
        // Prevent duplicate executions
        return;
      }

      setState((prev) => {
        let newScore = prev.readinessScore;
        let newTime = prev.simulatedTimeRemainingMs;

        // Apply consequences
        if (!action.isCorrect) {
          newScore -= 5; // Configurable penalty
          setPenaltyLockoutMs(5000); // 5 second lockout wait
        }

        newTime -= action.timeCostMs;

        // Fail condition: out of simulated time
        if (newTime <= 0) {
          return {
            ...prev,
            simulatedTimeRemainingMs: 0,
            isComplete: true,
            history: [
              ...prev.history,
              { action, timestampAtExecutionMs: newTime },
            ],
          };
        }

        return {
          ...prev,
          completedActionIds: [...prev.completedActionIds, actionId],
          simulatedTimeRemainingMs: newTime,
          readinessScore: Math.max(0, newScore),
          history: [
            ...prev.history,
            { action, timestampAtExecutionMs: newTime },
          ],
        };
      });
    },
    [currentPhase, state.isComplete, state.completedActionIds],
  );

  // 5. Phase Progression
  const canAdvancePhase = useCallback(() => {
    // Check if all required actions for the current phase have been executed
    return currentPhase.requiredActionsToAdvance.every((reqId) =>
      state.completedActionIds.includes(reqId),
    );
  }, [currentPhase, state.completedActionIds]);

  const advancePhase = useCallback(() => {
    if (!canAdvancePhase() || state.isComplete) return;

    setState((prev) => {
      const currentIndex = PHASE_ORDER.indexOf(prev.currentPhaseName);
      if (currentIndex === PHASE_ORDER.length - 1) {
        // We reached the end
        return { ...prev, isComplete: true };
      }

      const nextPhaseName = PHASE_ORDER[currentIndex + 1];

      return {
        ...prev,
        currentPhaseName: nextPhaseName,
        // Optional: clear completed actions for the new phase, or keep a running tally
      };
    });
  }, [canAdvancePhase, state.isComplete]);

  return {
    // Static References
    scenarioMetadata: {
      id: scenarioDefinition.id,
      title: scenarioDefinition.title,
      targetCertification: scenarioDefinition.targetCertification,
      walkthrough: scenarioDefinition.walkthrough,
      sourceFootnotes: scenarioDefinition.sourceFootnotes,
    },
    initialVitals,

    // Dynamic State
    currentPhase,
    simulatedTimeRemainingMs: state.simulatedTimeRemainingMs,
    readinessScore: state.readinessScore,
    isComplete: state.isComplete,
    completedActionIds: state.completedActionIds,
    actionHistory: state.history,
    penaltyLockoutMs,

    // Controls
    executeAction,
    canAdvancePhase: canAdvancePhase(),
    advancePhase,
  };
}

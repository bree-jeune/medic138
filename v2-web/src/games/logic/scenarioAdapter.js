// Normalizes different data structures into a standard Scenario format
// Standard Format:
// [
//   {
//      title: "Scenario Title",
//      description: "Brief presentation...",
//      vitals: { hr: 90, ... },
//      steps: [
//          {
//              question: "What is your next move?",
//              options: [ { text: "Intubate", isCorrect: true, feedback: "Yes..." } ]
//          }
//      ]
//   }
// ]

export const adaptAirwayScenarios = (rawScenarios) => {
    return rawScenarios.map(s => ({
        title: s.title,
        description: `${s.presentation.age}yo ${s.presentation.gender} - ${s.presentation.chiefComplaint}\n${s.presentation.scene}\nAirway: ${s.presentation.airway}`,
        vitals: s.presentation.vitals,
        steps: s.decisionTree.map(step => ({
            question: step.question,
            options: step.options.map(opt => ({
                text: opt.text,
                isCorrect: opt.correct,
                feedback: opt.feedback
            }))
        }))
    }));
};

export const adaptTriageScenarios = (rawScenarios) => {
    return rawScenarios.map(s => ({
        title: "MCI Triage",
        description: s.scenario,
        vitals: null,
        steps: s.patients.map(p => ({
            question: `Patient #${p.id}: ${p.presentation}`,
            options: [
                { text: 'GREEN (Minor)', isCorrect: p.correctTriage === 'GREEN', feedback: p.explanation },
                { text: 'YELLOW (Delayed)', isCorrect: p.correctTriage === 'YELLOW', feedback: p.explanation },
                { text: 'RED (Immediate)', isCorrect: p.correctTriage === 'RED', feedback: p.explanation },
                { text: 'BLACK (Deceased)', isCorrect: p.correctTriage === 'BLACK', feedback: p.explanation },
            ]
        }))
    }));
};

export const adaptTraumaScenarios = (rawScenarios) => {
    // This one is trickier as it's just "findings" and "lifeThreats"
    // We'll synthesise steps: 1. Identify Priority Threat, 2. Identify Intervention
    return rawScenarios.map(s => ({
        title: "Trauma Assessment",
        description: s.scenario + "\n\n" + s.findings.join("\n"),
        vitals: null, // Vitals usually embedded in presentation or similar
        steps: [
            // Step 1: Priority
            {
                question: "What is the highest priority life threat?",
                options: s.lifeThreats.map(t => ({
                    text: t.threat,
                    isCorrect: t.priority === 1,
                    feedback: t.priority === 1 ? "Correct, this kills fastest." : `Incorrect. ${t.threat} is priority ${t.priority}.`
                }))
            },
            // Step 2: Intervention (for the priority threat)
            {
                question: `What is the correct intervention for the priority threat?`,
                options: s.lifeThreats.map(t => ({
                    text: t.intervention,
                    isCorrect: t.priority === 1,
                    feedback: t.priority === 1 ? "Correct." : "That intervention matches a lower priority threat."
                }))
            }
        ]
    }));
};

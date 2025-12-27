import React, { useState, useEffect } from 'react';
import GameShell from './GameShell'; // Fixed import
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Activity } from 'lucide-react';

const ScenarioGame = ({ game, data, normalizeData }) => {
    const [scenarios, setScenarios] = useState([]);
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [stepIndex, setStepIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState('playing'); // playing, feedback, summary
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState(null);

    // Initialize normalized data
    useEffect(() => {
        if (data && normalizeData) {
            const normalized = normalizeData(data);
            setScenarios(normalized);
        }
    }, [data, normalizeData]);

    const currentScenario = scenarios[currentScenarioIndex];
    const currentStep = currentScenario?.steps[stepIndex];

    const handleOptionSelect = (option) => {
        if (gameState !== 'playing') return;

        setSelectedOption(option);
        setGameState('feedback');

        if (option.isCorrect) {
            setScore(s => s + 100);
            setFeedback({ type: 'success', text: option.feedback || 'Correct!' });
        } else {
            setFeedback({ type: 'error', text: option.feedback || 'Incorrect.' });
        }
    };

    const nextStep = () => {
        setSelectedOption(null);
        setFeedback(null);
        setGameState('playing');

        // Check if more steps in this scenario
        if (stepIndex < currentScenario.steps.length - 1) {
            setStepIndex(s => s + 1);
        } else {
            // Scenario Complete
            if (currentScenarioIndex < scenarios.length - 1) {
                setCurrentScenarioIndex(c => c + 1);
                setStepIndex(0);
            } else {
                // Game Over
                setGameState('gameOver');
            }
        }
    };

    if (!currentScenario) return <div>Loading...</div>;

    return (
        <GameShell
            title={game.title}
            score={score}
            totalQuestions={scenarios.reduce((acc, s) => acc + s.steps.length, 0)}
            currentQuestion={currentScenarioIndex + 1} // Simplified progress
        >
            <div className="max-w-3xl mx-auto p-4">
                {/* Scenario Header (Patient Info) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Activity className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{currentScenario.title}</h2>
                            <p className="text-gray-600 whitespace-pre-line">{currentScenario.description}</p>

                            {/* Vitals Grid if available */}
                            {currentScenario.vitals && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
                                    {Object.entries(currentScenario.vitals).map(([key, value]) => (
                                        <div key={key} className="bg-gray-50 p-2 rounded">
                                            <span className="text-xs uppercase text-gray-500 font-bold block">{key}</span>
                                            <span className="font-mono font-medium">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Question Area */}
                {gameState === 'gameOver' ? (
                    <div className="text-center p-12 bg-white rounded-xl shadow">
                        <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
                        <h2 className="text-2xl font-bold mb-2">Simulation Complete</h2>
                        <p className="text-gray-600 mb-6">Final Score: {score}</p>
                        <button className="btn btn-primary" onClick={() => window.location.reload()}>Replay</button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-gray-50">
                                <h3 className="text-lg font-bold text-gray-800">
                                    Step {stepIndex + 1}: {currentStep.question}
                                </h3>
                            </div>

                            <div className="p-4 space-y-3">
                                {currentStep.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionSelect(option)}
                                        disabled={gameState !== 'playing'}
                                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedOption === option
                                            ? option.isCorrect
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-red-500 bg-red-50'
                                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span>{option.text}</span>
                                            {gameState !== 'playing' && selectedOption === option && (
                                                option.isCorrect ? <CheckCircle className="text-green-600" size={20} /> : <XCircle className="text-red-600" size={20} />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Feedback Area */}
                            {gameState === 'feedback' && (
                                <div className={`p-6 border-t ${feedback.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                                    <h4 className={`font-bold mb-2 ${feedback.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                                        {feedback.type === 'success' ? 'Correct' : 'Incorrect'}
                                    </h4>
                                    <p className="text-gray-800 mb-4">{feedback.text}</p>
                                    <button
                                        onClick={nextStep}
                                        className="btn bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2"
                                    >
                                        Next Step <ArrowRight size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </GameShell>
    );
};

export default ScenarioGame;

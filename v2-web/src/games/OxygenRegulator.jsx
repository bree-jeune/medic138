import React, { useState, useEffect } from 'react';
import GameShell from './components/GameShell';
import { useGameEngine } from '../hooks/useGameEngine';
import { GAME_DATA } from '../data/gameData';

const LEVELS = ['EMT-Basic', 'Paramedic', 'Critical Care'];

const OxygenRegulator = ({ game, onExit }) => {
    const [config, setConfig] = useState(null);

    // Game Engine Hook
    const {
        gameState,
        currentScenario,
        initGame,
        submitAnswer,
        nextQuestion
    } = useGameEngine('oxygen_regulator', config || {});

    // Start Game handler
    const handleStart = (difficulty) => {
        const selectedConfig = { difficulty, mode: 'Free Practice', subMode: 'flow_calculations' }; // Defaulting for MVP
        setConfig(selectedConfig);

        // Filter scenarios
        const questions = GAME_DATA.oxygenScenarios.flow_calculations.filter(q =>
            q.difficulty === difficulty || difficulty === 'All'
        );

        // Shuffle and init
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        initGame(shuffled);
    };

    // Handlers
    const handleSubmit = (val) => {
        if (gameState.history.some(h => h.scenario === currentScenario)) return; // Prevent double submit

        const answer = parseFloat(val);
        const correct = currentScenario.answer;
        // Tolerance check logic similar to original
        const isCorrect = Math.abs(answer - correct) <= 1;

        submitAnswer(isCorrect, answer, correct);
    };

    // -- RENDER: CONFIG SCREEN --
    if (!config) {
        return (
            <div className="max-w-2xl mx-auto bg-surface p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
                <p className="text-gray-600 mb-8">{game.description}</p>

                <h3 className="font-semibold mb-4 text-primary uppercase text-sm tracking-wider">Select Difficulty</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {LEVELS.map(level => (
                        <button
                            key={level}
                            onClick={() => handleStart(level)}
                            className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-red-50 transition text-left group"
                        >
                            <span className="font-bold group-hover:text-primary">{level}</span>
                        </button>
                    ))}
                </div>

                <button onClick={onExit} className="text-gray-500 hover:text-gray-900">
                    Cancel
                </button>
            </div>
        );
    }

    // -- RENDER: GAME OVER --
    if (gameState.isGameOver) {
        return (
            <GameShell
                title={game.title}
                score={gameState.score}
                total={gameState.totalQuestions}
                onExit={onExit}
            >
                <div className="text-center py-12">
                    <h2 className="text-3xl font-bold mb-4">Simulation Complete</h2>
                    <div className="text-6xl font-black text-primary mb-2">{gameState.score}/{gameState.totalQuestions}</div>
                    <p className="text-gray-600 mb-8">Accuracy: {Math.round((gameState.score / gameState.totalQuestions) * 100)}%</p>
                    <button onClick={() => setConfig(null)} className="btn bg-primary text-white px-8 py-3 rounded-lg">
                        Play Again
                    </button>
                </div>
            </GameShell>
        );
    }

    // -- RENDER: QUESTION --
    if (!currentScenario) return <div>Loading...</div>;

    const currentHistory = gameState.history.find(h => h.scenario === currentScenario);
    const isAnswered = !!currentHistory;
    const tankFactor = GAME_DATA.tankFactors[currentScenario.tank];

    return (
        <GameShell
            title={game.title}
            subtitle={`${config.difficulty} • Question ${gameState.currentQuestionIndex + 1}`}
            score={gameState.score}
            total={gameState.totalQuestions}
            onExit={onExit}
        >
            <div className="max-w-xl mx-auto">
                <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-100">
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="bg-white p-3 rounded border border-gray-200">
                            <span className="block text-gray-500 text-xs uppercase font-bold">Tank Type</span>
                            <span className="font-mono text-lg font-bold">{currentScenario.tank}</span>
                            <span className="text-gray-400 ml-1">(Factor: {tankFactor})</span>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-200">
                            <span className="block text-gray-500 text-xs uppercase font-bold">Pressure</span>
                            <span className="font-mono text-lg font-bold">{currentScenario.psi} PSI</span>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-200">
                            <span className="block text-gray-500 text-xs uppercase font-bold">Flow Rate</span>
                            <span className="font-mono text-lg font-bold">{currentScenario.flowRate} L/min</span>
                        </div>
                    </div>
                    <p className="font-medium text-lg text-center mt-6">How many minutes will this tank last?</p>
                </div>

                {!isAnswered ? (
                    <div className="space-y-4">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(e.target.elements.answer.value);
                        }}>
                            <input
                                name="answer"
                                type="number"
                                step="1"
                                placeholder="Enter minutes..."
                                className="w-full text-center text-2xl p-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                                autoFocus
                            />
                            <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl mt-4 hover:bg-red-700 transition">
                                Submit
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className={`p-6 rounded-xl border-2 ${currentHistory.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <h3 className={`font-bold text-lg mb-2 ${currentHistory.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                            {currentHistory.isCorrect ? 'Correct!' : 'Incorrect'}
                        </h3>
                        <div className="space-y-1 mb-4">
                            <p>Your Answer: <strong>{currentHistory.userAnswer}</strong></p>
                            <p>Correct Answer: <strong>{currentHistory.correctAnswer}</strong></p>
                            <p className="text-sm text-gray-600 mt-2 font-mono bg-white/50 p-2 rounded">
                                Calculation: ({currentScenario.psi} × {tankFactor}) / {currentScenario.flowRate} = {Math.floor((currentScenario.psi * tankFactor) / currentScenario.flowRate)}
                            </p>
                        </div>

                        <button
                            onClick={nextQuestion}
                            className="w-full bg-white border border-gray-300 font-bold py-3 rounded-lg hover:bg-gray-50 text-gray-700"
                        >
                            Next Question
                        </button>
                    </div>
                )}
            </div>
        </GameShell>
    );
};

export default OxygenRegulator;

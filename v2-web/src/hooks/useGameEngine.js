import { useState, useCallback, useEffect } from 'react';

export const useGameEngine = (gameId, initialConfig = {}) => {
    const [gameState, setGameState] = useState({
        isPlaying: false,
        score: 0,
        currentQuestionIndex: 0,
        totalQuestions: 0,
        isGameOver: false,
        history: [], // { question, userAnswer, isCorrect }
        startTime: null,
        elapsedTime: 0
    });

    const [scenarios, setScenarios] = useState([]);
    const [currentScenario, setCurrentScenario] = useState(null);

    // Timer logic
    useEffect(() => {
        let interval;
        if (gameState.isPlaying && !gameState.isGameOver && initialConfig.mode === 'Timed Challenge') {
            interval = setInterval(() => {
                setGameState(prev => ({
                    ...prev,
                    elapsedTime: Math.floor((Date.now() - prev.startTime) / 1000)
                }));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameState.isPlaying, gameState.isGameOver, initialConfig.mode, gameState.startTime]);

    const initGame = useCallback((scenarioList) => {
        setScenarios(scenarioList);
        setGameState({
            isPlaying: true,
            score: 0,
            currentQuestionIndex: 0,
            totalQuestions: scenarioList.length,
            isGameOver: false,
            history: [],
            startTime: Date.now(),
            elapsedTime: 0
        });
        setCurrentScenario(scenarioList[0]);
    }, []);

    const submitAnswer = useCallback((isCorrect, userAnswer, correctAnswer) => {
        setGameState(prev => {
            const newScore = isCorrect ? prev.score + 1 : prev.score;
            const historyItem = {
                scenario: scenarios[prev.currentQuestionIndex],
                userAnswer,
                correctAnswer,
                isCorrect
            };

            return {
                ...prev,
                score: newScore,
                history: [...prev.history, historyItem]
            };
        });
        return isCorrect;
    }, [scenarios]);

    const nextQuestion = useCallback(() => {
        setGameState(prev => {
            const nextIndex = prev.currentQuestionIndex + 1;
            if (nextIndex >= prev.totalQuestions) {
                return { ...prev, isGameOver: true, isPlaying: false };
            }
            setCurrentScenario(scenarios[nextIndex]);
            return { ...prev, currentQuestionIndex: nextIndex };
        });
    }, [scenarios]);

    const restartGame = useCallback(() => {
        // Re-shuffle or just reset? For now reset using same list or caller re-inits
        // We will ask caller to re-init
        setGameState(prev => ({ ...prev, isPlaying: false }));
    }, []);

    return {
        gameState,
        currentScenario,
        initGame,
        submitAnswer,
        nextQuestion,
        restartGame
    };
};

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import OxygenRegulator from '../games/OxygenRegulator';
import ScenarioGame from '../games/components/ScenarioGame';
import { adaptAirwayScenarios, adaptTriageScenarios, adaptTraumaScenarios } from '../games/logic/scenarioAdapter';
import { GAMES, GAME_DATA, AIRWAY_SCENARIOS } from '../data/gameData';

const GamePlayer = () => {
    const { gameId } = useParams();
    const game = GAMES.find(g => g.id === gameId);

    if (!game) {
        return <div className="p-8">Game not found</div>;
    }

    // Render Logic
    const renderGame = () => {
        switch (gameId) {
            case 'oxygen_regulator':
                return <OxygenRegulator game={game} onExit={() => window.history.back()} />;

            // Scenario Games
            case 'airway_management':
                return <ScenarioGame
                    game={game}
                    data={AIRWAY_SCENARIOS}
                    normalizeData={adaptAirwayScenarios}
                />;

            case 'triage_scenarios':
                return <ScenarioGame
                    game={game}
                    data={GAME_DATA.triageScenarios}
                    normalizeData={adaptTriageScenarios}
                />;

            case 'trauma_assessment':
                return <ScenarioGame
                    game={game}
                    data={GAME_DATA.traumaScenarios}
                    normalizeData={adaptTraumaScenarios}
                />;

            default:
                // Temporary placeholder for un-ported games
                return (
                    <div className="text-center p-12">
                        <h2 className="text-2xl font-bold mb-4">{game.title}</h2>
                        <p className="text-gray-600 mb-8">This module is coming soon!</p>
                        <Link to="/games" className="btn btn-primary">Back to Games</Link>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Game Content */}
            {renderGame()}
        </div>
    );
};

export default GamePlayer;

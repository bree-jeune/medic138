import React from 'react';
import { GAMES } from '../data/gameData';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Games = () => {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">Skills Lab</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Interactive simulations to build muscle memory and clinical precision.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {GAMES.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    );
};

const GameCard = ({ game }) => {
    return (
        <Link
            to={`/games/${game.id}`}
            className="block bg-surface p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group relative overflow-hidden"
        >
            <div className="mb-4 text-4xl">{game.icon}</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{game.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{game.description}</p>

            {game.isPremium && (
                <div className="absolute top-4 right-4 bg-gray-100 p-1.5 rounded-full text-gray-500" title="Premium Content">
                    <Lock size={16} />
                </div>
            )}

            <div className="flex gap-2 mt-4 text-xs font-medium text-gray-500">
                {game.hasDifficulty && <span className="bg-gray-100 px-2 py-1 rounded">Levels</span>}
                {game.mode === 'Timed Challenge' && <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded">Timed</span>}
            </div>
        </Link>
    );
};

export default Games;

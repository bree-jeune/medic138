import React from 'react';
import { ArrowLeft, RefreshCw, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

const GameShell = ({
    title,
    subtitle,
    score,
    total,
    elapsedTime,
    onExit,
    onRestart,
    children
}) => {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Game Header */}
            <div className="bg-surface rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button onClick={onExit} className="text-gray-500 hover:text-gray-900 transition">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h2 className="font-bold text-lg leading-tight">{title}</h2>
                        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {elapsedTime !== undefined && (
                        <div className="flex items-center gap-2 text-gray-600 font-mono">
                            <Timer size={18} />
                            <span>{Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <div className="text-right">
                            <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider">Score</span>
                            <span className="font-mono font-bold text-xl text-primary">{score}<span className="text-gray-300">/</span>{total}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Game Content */}
            <div className="bg-surface rounded-xl shadow-sm border border-gray-100 min-h-[500px] p-6 relative">
                {children}
            </div>
        </div>
    );
};

export default GameShell;

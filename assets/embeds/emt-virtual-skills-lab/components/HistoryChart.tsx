import React from 'react';
import { FeedbackItem } from '../types';

interface HistoryChartProps {
  history: FeedbackItem[];
}

const HistoryChart: React.FC<HistoryChartProps> = ({ history }) => {
  const recentHistory = history.slice(-10);
  const maxScore = 100;
  
  // Calculate average score
  const avgScore = recentHistory.length > 0 
    ? Math.round(recentHistory.reduce((acc, h) => acc + (h.score || 0), 0) / recentHistory.length)
    : 0;
  
  // Get trend
  const trend = recentHistory.length >= 2 
    ? (recentHistory[recentHistory.length - 1]?.score || 0) - (recentHistory[recentHistory.length - 2]?.score || 0)
    : 0;

  if (history.length === 0) {
    return (
      <div className="card p-6 text-center animate-slide-up">
        <div className="text-3xl mb-3 opacity-40">📊</div>
        <span className="label block mb-1">Performance</span>
        <p className="text-sm text-zinc-500">
          Complete simulations to track your progress
        </p>
      </div>
    );
  }

  return (
    <div className="card p-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="label block">Performance</span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl text-white">{avgScore}</span>
            <span className="text-sm text-zinc-500">avg</span>
          </div>
        </div>
        
        {/* Trend Indicator */}
        {trend !== 0 && (
          <div className={`
            flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium
            ${trend > 0 
              ? 'bg-emerald-950/30 text-emerald-400' 
              : 'bg-red-950/30 text-red-400'
            }
          `}>
            <svg 
              className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="h-24 flex items-end gap-1">
        {recentHistory.map((item, i) => {
          const height = Math.max(8, (item.score / maxScore) * 100);
          const isLatest = i === recentHistory.length - 1;
          
          return (
            <div
              key={item.id}
              className="flex-1 flex flex-col items-center gap-1"
              title={`${item.skillName}: ${item.score}%`}
            >
              {/* Bar */}
              <div 
                className={`
                  w-full rounded-t transition-all duration-500
                  ${isLatest 
                    ? 'bg-accent-blood' 
                    : item.score >= 80 
                      ? 'bg-emerald-800/60' 
                      : item.score >= 60 
                        ? 'bg-amber-800/60' 
                        : 'bg-red-800/60'
                  }
                `}
                style={{ 
                  height: `${height}%`,
                  animationDelay: `${i * 50}ms`
                }}
              />
            </div>
          );
        })}
        
        {/* Fill empty slots */}
        {Array.from({ length: Math.max(0, 10 - recentHistory.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="flex-1">
            <div className="w-full h-2 bg-zinc-800/50 rounded-t" />
          </div>
        ))}
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-2 text-xs text-zinc-600">
        <span>Oldest</span>
        <span>Latest</span>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-zinc-800">
        <div className="text-center">
          <span className="text-lg font-bold text-white">{history.length}</span>
          <span className="text-xs text-zinc-500 block">Sessions</span>
        </div>
        <div className="text-center">
          <span className="text-lg font-bold text-emerald-400">
            {history.filter(h => h.score >= 80).length}
          </span>
          <span className="text-xs text-zinc-500 block">Passed</span>
        </div>
        <div className="text-center">
          <span className="text-lg font-bold text-accent-clay">
            {new Set(history.map(h => h.skillId)).size}
          </span>
          <span className="text-xs text-zinc-500 block">Skills</span>
        </div>
      </div>
    </div>
  );
};

export default HistoryChart;

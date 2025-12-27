import React from 'react';
import { Skill } from '../types';

interface SkillChecklistProps {
  skill: Skill;
  active: boolean;
  statusMap: Record<string, 'pass' | 'fail' | 'pending'>;
}

const SkillChecklist: React.FC<SkillChecklistProps> = ({ skill, active, statusMap }) => {
  return (
    <div className="card p-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{skill.icon}</span>
        <div className="flex-1 min-w-0">
          <span className="label block">Active Skill</span>
          <h3 className="font-display text-base text-white truncate">
            {skill.name}
          </h3>
        </div>
        {active && (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-accent-blood/20 rounded-full">
            <div className="w-1.5 h-1.5 bg-accent-blood rounded-full animate-pulse" />
            <span className="text-xs font-medium text-accent-clay">Live</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-zinc-800 mb-4" />

      {/* Checklist */}
      <div className="space-y-2">
        <span className="label block mb-3">Critical Criteria</span>
        
        {skill.criticalCriteria.map((criterion, i) => {
          const status = statusMap[criterion] || 'pending';
          
          return (
            <div 
              key={i}
              className={`
                flex items-start gap-3 p-3 rounded-lg border transition-all
                ${status === 'pass' 
                  ? 'bg-emerald-950/20 border-emerald-900/30' 
                  : status === 'fail' 
                    ? 'bg-red-950/20 border-red-900/30' 
                    : 'bg-surface-raised/50 border-zinc-800/50'
                }
              `}
            >
              {/* Status Indicator */}
              <div className={`
                w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5
                ${status === 'pass' 
                  ? 'bg-emerald-900/50 text-emerald-400' 
                  : status === 'fail' 
                    ? 'bg-red-900/50 text-red-400' 
                    : 'bg-zinc-800 text-zinc-500'
                }
              `}>
                {status === 'pass' ? '✓' : status === 'fail' ? '✗' : (i + 1)}
              </div>
              
              {/* Criterion Text */}
              <p className={`
                text-sm leading-relaxed
                ${status === 'pass' 
                  ? 'text-emerald-300' 
                  : status === 'fail' 
                    ? 'text-red-300' 
                    : 'text-zinc-400'
                }
              `}>
                {criterion}
              </p>
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="mt-4 pt-4 border-t border-zinc-800">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-500">Progress</span>
          <span className="font-mono text-zinc-400">
            {Object.values(statusMap).filter(s => s === 'pass').length} / {skill.criticalCriteria.length}
          </span>
        </div>
        <div className="mt-2 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent-blood transition-all duration-500"
            style={{ 
              width: `${(Object.values(statusMap).filter(s => s === 'pass').length / skill.criticalCriteria.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillChecklist;

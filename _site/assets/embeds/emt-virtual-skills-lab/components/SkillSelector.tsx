import React from 'react';
import { SKILLS } from '../constants';
import { Skill } from '../types';

interface SkillSelectorProps {
  onSelect: (skill: Skill) => void;
  selectedId?: string;
}

const SkillSelector: React.FC<SkillSelectorProps> = ({ onSelect, selectedId }) => {
  return (
    <div className="relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-surface-void to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-surface-void to-transparent z-10 pointer-events-none" />
      
      {/* Scrollable container */}
      <div className="flex gap-4 overflow-x-auto pb-4 px-2 no-scrollbar">
        {SKILLS.map((skill, idx) => {
          const isActive = selectedId === skill.id;
          
          return (
            <button
              key={skill.id}
              onClick={() => onSelect(skill)}
              className={`
                flex-shrink-0 w-52 p-5 radius-24 text-left relative
                transition-all duration-300 ease-out
                border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blood
                card-reveal
                ${isActive
                  ? 'bg-surface-raised border-zinc-700 shadow-lg'
                  : 'bg-surface-base border-zinc-800/50 hover:bg-surface-raised hover:border-zinc-700'
                }
              `}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Icon */}
              <div className={`
                text-3xl mb-4 transition-all duration-300
                ${isActive ? 'scale-110' : 'grayscale opacity-50'}
              `}>
                {skill.icon}
              </div>
              
              {/* Content */}
              <div className="space-y-1 mb-4">
                <span className={`
                  text-xs font-semibold uppercase tracking-wider block
                  ${isActive ? 'text-accent-clay' : 'text-zinc-600'}
                `}>
                  {skill.category}
                </span>
                <h3 className={`
                  heading-tactical text-base leading-tight
                  ${isActive ? 'text-white' : 'text-zinc-400'}
                `}>
                  {skill.name}
                </h3>
              </div>
              
              {/* Vision Compatibility */}
              <div className="flex items-center gap-2">
                <div className={`
                  w-2 h-2 radius-full transition-colors
                  ${isActive ? 'bg-accent-blood' : 'bg-zinc-700'}
                `} />
                <span className="text-xs text-zinc-500">
                  {skill.visionCompatibility} precision
                </span>
              </div>

              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-4 right-4 flex gap-0.5">
                  <div className="w-1 h-3 bg-accent-blood radius-full" />
                  <div className="w-1 h-3 bg-accent-clay radius-full" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SkillSelector;

import React from 'react';

interface HandPositionOverlayProps {
  skillId: string;
}

const HandPositionOverlay: React.FC<HandPositionOverlayProps> = ({ skillId }) => {
  // Define overlay guides based on skill type
  const getOverlayContent = () => {
    switch (skillId) {
      case 'cpr-adult':
        return (
          <>
            {/* Sternum target zone */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-24 h-16 border-2 border-dashed border-accent-blood/60 rounded-lg flex items-center justify-center">
              <span className="text-xs text-accent-blood font-medium bg-black/60 px-2 py-0.5 rounded">
                Hand Position
              </span>
            </div>
            
            {/* Depth indicator */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
              <div className="w-1 h-20 bg-zinc-700 rounded-full relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-1/2 bg-accent-blood/80 rounded-full animate-pulse" />
              </div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Depth</span>
            </div>
          </>
        );
        
      case 'bvm-ventilation':
        return (
          <>
            {/* Mask seal zone */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-20 border-2 border-dashed border-blue-500/60 rounded-full flex items-center justify-center">
              <span className="text-xs text-blue-400 font-medium bg-black/60 px-2 py-0.5 rounded">
                C-E Grip
              </span>
            </div>
            
            {/* Chest rise indicator */}
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 text-emerald-400/80">
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span className="text-xs uppercase tracking-wider">Chest Rise</span>
              </div>
            </div>
          </>
        );
        
      case 'bleeding-control':
        return (
          <>
            {/* Wound zone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-dashed border-red-500/60 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-full animate-pulse" />
            </div>
            
            {/* Pressure indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs text-red-400 uppercase tracking-wider">Direct Pressure</span>
            </div>
          </>
        );
        
      case 'pulse-check':
        return (
          <>
            {/* Carotid zone */}
            <div className="absolute top-1/4 left-1/3 w-8 h-12 border-2 border-dashed border-amber-500/60 rounded-lg flex items-center justify-center">
              <span className="text-[10px] text-amber-400 font-medium">SCM</span>
            </div>
            
            {/* Radial zone */}
            <div className="absolute bottom-1/3 right-1/4 w-10 h-10 border-2 border-dashed border-amber-500/60 rounded-full flex items-center justify-center">
              <span className="text-[10px] text-amber-400 font-medium">Radial</span>
            </div>
            
            {/* Timer */}
            <div className="absolute top-6 right-6 bg-black/60 px-3 py-1.5 rounded-full">
              <span className="text-sm text-white font-mono">5-10s</span>
            </div>
          </>
        );
        
      case 'spinal-immobilization':
        return (
          <>
            {/* C-spine zone */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-16 h-24 border-2 border-dashed border-purple-500/60 rounded-lg flex items-center justify-center">
              <span className="text-xs text-purple-400 font-medium bg-black/60 px-2 py-0.5 rounded">
                Manual Hold
              </span>
            </div>
            
            {/* Mastoid indicators */}
            <div className="absolute top-[18%] left-[35%] w-4 h-4 border-2 border-purple-500/60 rounded-full" />
            <div className="absolute top-[18%] right-[35%] w-4 h-4 border-2 border-purple-500/60 rounded-full" />
          </>
        );
        
      default:
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/60 px-4 py-2 rounded-lg">
              <span className="text-sm text-zinc-400">Position tracking active</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* Corner indicators */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent-blood/40 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent-blood/40 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent-blood/40 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-accent-blood/40 rounded-br-lg" />
      
      {/* Skill-specific overlay */}
      {getOverlayContent()}
      
      {/* Grid overlay (subtle) */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

export default HandPositionOverlay;

import React from 'react';

interface FeedbackDisplayProps {
  content: string;
  isRealTime?: boolean;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ content, isRealTime }) => {
  
  // Real-time feedback (compact, urgent)
  if (isRealTime) {
    const isStop = content.includes('🛑') || content.toUpperCase().includes('STOP');
    const isPositive = content.includes('✓') || content.toUpperCase().includes('GOOD') || content.toUpperCase().includes('GREAT');
    
    return (
      <div className={`
        p-4 rounded-xl border backdrop-blur-xl
        animate-slide-up
        ${isStop 
          ? 'bg-red-950/80 border-red-800/50 text-white' 
          : isPositive 
            ? 'bg-emerald-950/80 border-emerald-800/50 text-white' 
            : 'bg-surface-base/90 border-zinc-800 text-white'
        }
      `}>
        <div className="flex items-start gap-3">
          {/* Status Icon */}
          <div className={`
            w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 text-sm
            ${isStop 
              ? 'bg-red-900/50' 
              : isPositive 
                ? 'bg-emerald-900/50' 
                : 'bg-zinc-800/50'
            }
          `}>
            {isStop ? '🛑' : isPositive ? '✓' : '⚡'}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider block mb-1">
              Live Feedback
            </span>
            <p className="text-base font-medium leading-snug">
              {content.replace(/[🛑✓🎙️⚡]/g, '').trim()}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Full assessment (detailed, formatted)
  const formatMarkdown = (text: string) => {
    return text.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={i} className="h-3" />;

      // Section headers
      if (trimmed.startsWith('###') || trimmed.startsWith('═') || trimmed.toUpperCase().includes('ASSESSMENT')) {
        return (
          <div key={i} className="mt-8 mb-4 first:mt-0">
            <div className="flex items-center gap-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 whitespace-nowrap">
                {trimmed.replace(/[#═]/g, '').trim()}
              </h3>
              <div className="h-px flex-1 bg-zinc-800" />
            </div>
          </div>
        );
      }
      
      // Success items
      if (trimmed.startsWith('✓') || (trimmed.startsWith('*') && !trimmed.startsWith('**'))) {
        return (
          <div key={i} className="flex items-start gap-3 my-2 p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-lg">
            <div className="w-5 h-5 rounded bg-emerald-900/50 flex items-center justify-center text-emerald-400 text-xs flex-shrink-0 mt-0.5">
              ✓
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {trimmed.replace(/^[✓\*]\s*/, '').trim()}
            </p>
          </div>
        );
      }
      
      // Warning/Error items
      if (trimmed.startsWith('⚠️') || trimmed.startsWith('🛑') || trimmed.startsWith('!')) {
        return (
          <div key={i} className="flex items-start gap-3 my-2 p-3 bg-red-950/20 border border-red-900/30 rounded-lg">
            <div className="w-5 h-5 rounded bg-red-900/50 flex items-center justify-center text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
              !
            </div>
            <div className="flex-1">
              <p className="text-sm text-zinc-200 leading-relaxed font-medium">
                {trimmed.replace(/^[⚠️🛑!]\s*/, '').trim()}
              </p>
            </div>
          </div>
        );
      }

      // Table-like content (pipe separated)
      if (trimmed.includes('|')) {
        return (
          <div key={i} className="my-2 p-3 bg-zinc-900/50 border-l-2 border-accent-blood rounded-r-lg overflow-x-auto">
            <code className="text-xs font-mono text-zinc-400 whitespace-pre">
              {trimmed}
            </code>
          </div>
        );
      }

      // Bold text
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        return (
          <p key={i} className="text-sm font-semibold text-white mt-4 mb-2">
            {trimmed.replace(/\*\*/g, '')}
          </p>
        );
      }

      // Regular paragraph
      return (
        <p key={i} className="text-sm text-zinc-400 leading-relaxed mb-2">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="card p-6 h-full flex flex-col animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-zinc-800">
        <div className="w-10 h-10 bg-accent-void/50 border border-accent-blood/30 rounded-xl flex items-center justify-center text-xl">
          📄
        </div>
        <div>
          <h2 className="font-display text-lg text-white leading-none mb-1">
            Performance Debrief
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-blood animate-pulse" />
            <span className="text-xs text-zinc-500 font-mono">Analysis Complete</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pr-2 -mr-2">
        {formatMarkdown(content)}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between text-zinc-600">
        <span className="text-xs font-mono uppercase tracking-wider">
          Instructor Review
        </span>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackDisplay;

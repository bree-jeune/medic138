import React, { useMemo } from 'react';
import { FeedbackItem } from '../types';

interface InstructorDashboardProps {
  history: FeedbackItem[];
}

const InstructorDashboard: React.FC<InstructorDashboardProps> = ({ history }) => {
  // Calculate stats
  const stats = useMemo(() => {
    if (history.length === 0) return null;
    
    const totalSessions = history.length;
    const avgScore = Math.round(history.reduce((acc, h) => acc + (h.score || 0), 0) / totalSessions);
    const passRate = Math.round((history.filter(h => h.score >= 80).length / totalSessions) * 100);
    const uniqueSkills = new Set(history.map(h => h.skillId)).size;
    
    // Group by skill
    const bySkill: Record<string, { count: number; avgScore: number; scores: number[] }> = {};
    history.forEach(h => {
      if (!bySkill[h.skillName]) {
        bySkill[h.skillName] = { count: 0, avgScore: 0, scores: [] };
      }
      bySkill[h.skillName].count++;
      bySkill[h.skillName].scores.push(h.score);
    });
    
    Object.keys(bySkill).forEach(skill => {
      bySkill[skill].avgScore = Math.round(
        bySkill[skill].scores.reduce((a, b) => a + b, 0) / bySkill[skill].scores.length
      );
    });
    
    // Recent sessions
    const recentSessions = history.slice(-5).reverse();
    
    return { totalSessions, avgScore, passRate, uniqueSkills, bySkill, recentSessions };
  }, [history]);

  if (!stats) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6 text-center animate-slide-up">
        <div className="text-6xl mb-6 opacity-40">📊</div>
        <h2 className="font-display text-3xl text-white mb-4">No Data Yet</h2>
        <p className="text-zinc-400 max-w-md mx-auto">
          Student performance data will appear here after training sessions are completed.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-slide-up">
      {/* Header */}
      <div className="mb-8">
        <span className="label label-accent">Instructor View</span>
        <h2 className="font-display text-3xl text-white mt-2">
          Performance Dashboard
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Sessions', value: stats.totalSessions, color: 'text-white' },
          { label: 'Average Score', value: `${stats.avgScore}%`, color: 'text-white' },
          { label: 'Pass Rate', value: `${stats.passRate}%`, color: stats.passRate >= 80 ? 'text-emerald-400' : 'text-amber-400' },
          { label: 'Skills Practiced', value: stats.uniqueSkills, color: 'text-accent-clay' },
        ].map((stat, i) => (
          <div 
            key={stat.label} 
            className="card p-6 text-center animate-slide-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span className={`font-display text-4xl ${stat.color}`}>
              {stat.value}
            </span>
            <span className="label block mt-2">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Skill Breakdown */}
        <div className="card p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h3 className="font-display text-lg text-white mb-6">Skill Performance</h3>
          
          <div className="space-y-4">
            {Object.entries(stats.bySkill).map(([skillName, data]) => (
              <div key={skillName}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-300">{skillName}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-500">{data.count} sessions</span>
                    <span className={`text-sm font-bold ${
                      data.avgScore >= 80 ? 'text-emerald-400' : 
                      data.avgScore >= 60 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {data.avgScore}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      data.avgScore >= 80 ? 'bg-emerald-600' : 
                      data.avgScore >= 60 ? 'bg-amber-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${data.avgScore}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="card p-6 animate-slide-up" style={{ animationDelay: '250ms' }}>
          <h3 className="font-display text-lg text-white mb-6">Recent Sessions</h3>
          
          <div className="space-y-3">
            {stats.recentSessions.map((session, i) => (
              <div 
                key={session.id} 
                className="flex items-center gap-4 p-3 bg-surface-raised rounded-lg border border-zinc-800/50"
              >
                {/* Score badge */}
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg
                  ${session.score >= 80 
                    ? 'bg-emerald-950/50 text-emerald-400' 
                    : session.score >= 60 
                      ? 'bg-amber-950/50 text-amber-400' 
                      : 'bg-red-950/50 text-red-400'
                  }
                `}>
                  {session.score}
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {session.skillName}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {new Date(session.timestamp).toLocaleDateString()} • {session.userLevel}
                  </p>
                </div>
                
                {/* Assessment type */}
                <span className={`
                  text-xs px-2 py-1 rounded-full
                  ${session.assessmentType === 'Excellent' 
                    ? 'bg-emerald-950/30 text-emerald-400' 
                    : session.assessmentType === 'Proficient'
                      ? 'bg-blue-950/30 text-blue-400'
                      : 'bg-amber-950/30 text-amber-400'
                  }
                `}>
                  {session.assessmentType}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Actions */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center animate-slide-up" style={{ animationDelay: '300ms' }}>
        <button className="btn btn-secondary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Report
        </button>
        <button className="btn btn-secondary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset Data
        </button>
      </div>
    </div>
  );
};

export default InstructorDashboard;

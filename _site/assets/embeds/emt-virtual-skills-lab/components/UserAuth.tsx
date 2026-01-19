import React from 'react';
import { User } from '../types';

interface UserAuthProps {
  onLogin: (user: User) => void;
}

const MOCK_USERS: User[] = [
  { id: '1', name: 'Student J. Miller', role: 'student', avatar: '🧑‍🎓' },
  { id: '2', name: 'Student S. Chen', role: 'student', avatar: '👩‍🎓' },
  { id: '3', name: 'Instructor Dr. K', role: 'instructor', avatar: '🩺' },
];

const UserAuth: React.FC<UserAuthProps> = ({ onLogin }) => {
  return (
    <div className="fixed inset-0 z-50 bg-surface-void/95 backdrop-blur-xl flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-scale-in">
        <div className="card p-8 text-center">
          
          {/* Logo */}
          <div className="w-16 h-16 bg-accent-blood/20 border border-accent-blood/30 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-lg shadow-accent-blood/10">
            🚑
          </div>
          
          {/* Title */}
          <h1 className="font-display text-3xl text-white mb-2">
            Skills Lab
          </h1>
          <p className="text-sm text-zinc-500 mb-8">
            Select your profile to continue
          </p>
          
          {/* User List */}
          <div className="space-y-3">
            {MOCK_USERS.map((user, idx) => (
              <button
                key={user.id}
                onClick={() => onLogin(user)}
                className="
                  w-full group flex items-center gap-4 p-4 
                  bg-surface-raised border border-zinc-800 rounded-xl 
                  hover:border-zinc-600 hover:bg-surface-highlight 
                  transition-all duration-200 text-left
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blood focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base
                  animate-slide-up
                "
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Avatar */}
                <div className="text-2xl bg-surface-base w-12 h-12 flex items-center justify-center rounded-lg group-hover:bg-surface-raised transition-colors">
                  {user.avatar}
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-zinc-200 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-zinc-500 capitalize group-hover:text-accent-clay transition-colors">
                    {user.role}
                  </p>
                </div>
                
                {/* Arrow */}
                <svg 
                  className="w-5 h-5 text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
          
          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <p className="text-xs font-mono text-zinc-600 uppercase tracking-wider">
              EMT Training Simulator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuth;

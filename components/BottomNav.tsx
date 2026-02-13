
import React from 'react';
import { ViewType } from '../types';

interface BottomNavProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onViewChange }) => {
  const items = [
    { type: ViewType.DASHBOARD, label: 'Home', icon: '🏠' },
    { type: ViewType.CHAT, label: 'Chat', icon: '💬' },
    { type: ViewType.DISCOVER, label: 'Discover', icon: '🌍' },
    { type: ViewType.PROFILE, label: 'Profile', icon: '👤' },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 flex justify-around items-center px-4 pb-6 pt-3 z-50">
      {items.map((item) => (
        <button
          key={item.type}
          onClick={() => onViewChange(item.type)}
          className={`flex flex-col items-center transition-colors ${
            activeView === item.type ? 'text-indigo-600' : 'text-slate-400'
          }`}
        >
          <span className="text-xl mb-1">{item.icon}</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider">
            {item.label}
          </span>
          {activeView === item.type && (
            <div className="w-1 h-1 bg-indigo-600 rounded-full mt-1"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;

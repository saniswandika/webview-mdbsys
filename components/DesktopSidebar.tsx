
import React from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const DesktopSidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const items = [
    { type: ViewType.DASHBOARD, label: 'Control Center', icon: '📊', desc: 'System overview' },
    { type: ViewType.CHAT, label: 'Gemini AI Lab', icon: '🧠', desc: 'Real-time assistant' },
    { type: ViewType.DISCOVER, label: 'Market Intelligence', icon: '📈', desc: 'Global insights' },
    { type: ViewType.PROFILE, label: 'Organization Settings', icon: '🏢', desc: 'Account & team' },
  ];

  return (
    <aside className="w-80 bg-slate-900 text-white flex flex-col shrink-0 h-screen sticky top-0 border-r border-slate-800">
      <div className="p-8">
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/30">💎</div>
          <div>
            <span className="font-black text-xl tracking-tighter block leading-none">MIMS BIMS</span>
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.3em]">MOBILE & WEBSITE APLICATION</span>
          </div>
        </div>
        
        <nav className="space-y-3">
          {items.map((item) => (
            <button
              key={item.type}
              onClick={() => onViewChange(item.type)}
              className={`w-full flex items-center space-x-4 px-5 py-4 rounded-[1.5rem] transition-all group ${
                activeView === item.type 
                  ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-500/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-2xl transition-transform group-hover:scale-110">{item.icon}</span>
              <div className="text-left">
                <span className="font-bold text-sm block leading-none mb-1">{item.label}</span>
                <span className={`text-[10px] font-medium block uppercase tracking-tighter ${activeView === item.type ? 'text-indigo-200' : 'text-slate-500'}`}>
                  {item.desc}
                </span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8">
        <div className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700/50">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">System Health</p>
          <div className="space-y-3">
            <HealthBar label="Network Latency" percent={85} color="bg-green-500" />
            <HealthBar label="AI Process Load" percent={42} color="bg-indigo-400" />
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-800 flex items-center justify-between text-slate-500">
           <span className="text-[10px] font-bold tracking-widest uppercase">v2.4.0-Web</span>
           <div className="flex space-x-3">
             <span className="cursor-pointer hover:text-white transition-colors">📄</span>
             <span className="cursor-pointer hover:text-white transition-colors">💬</span>
           </div>
        </div>
      </div>
    </aside>
  );
};

const HealthBar: React.FC<{ label: string; percent: number; color: string }> = ({ label, percent, color }) => (
  <div>
    <div className="flex justify-between text-[9px] font-black uppercase mb-1">
      <span>{label}</span>
      <span className="text-slate-300">{percent}%</span>
    </div>
    <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

export default DesktopSidebar;

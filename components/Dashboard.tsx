
import React from 'react';

interface DashboardProps {
  isMobile?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isMobile }) => {
  const stats = [
    { label: 'AI Power', value: '98%', icon: '🔥', color: 'from-orange-400 to-rose-500' },
    { label: 'Active Tasks', value: '42', icon: '⚡', color: 'from-blue-400 to-indigo-500' },
    { label: 'Storage', value: '1.2TB', icon: '📁', color: 'from-emerald-400 to-teal-500' },
    { label: 'Uptime', value: '99.9%', icon: '🛰️', color: 'from-purple-400 to-violet-500' },
  ];

  return (
    <div className={`space-y-8 animate-fadeIn ${isMobile ? 'p-6' : 'p-0'}`}>
      <header className={`flex justify-between items-start ${isMobile ? '' : 'mb-10'}`}>
        <div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-2">STMIK AMIK BANDUNG</p>
          <h1 className={`${isMobile ? 'text-3xl' : 'text-5xl'} font-black text-slate-800 tracking-tighter`}>
            {isMobile ? 'Selamat Datang Di ' : 'MIMS BIMS Mobile'} 👋
          </h1>
        </div>
        {isMobile && (
          <button className="w-14 h-14 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center justify-center text-2xl transition-transform active:scale-90">
            🔔
          </button>
        )}
      </header>

      {/* Stats Row */}
      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-5`}>
        {stats.map((stat, i) => (
          <div key={i} className={`p-6 rounded-[2.5rem] bg-gradient-to-br ${stat.color} text-white shadow-2xl shadow-slate-200/40 transform transition-all hover:scale-[1.02] cursor-default`}>
            <div className="text-3xl mb-4">{stat.icon}</div>
            <p className="text-3xl font-black mb-1">{stat.value}</p>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1' : ''} gap-8`}>
        {/* Main Content Card */}
        {/* <section className={`${isMobile ? '' : 'col-span-2'} bg-indigo-600 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-300 group`}>
          <div className="relative z-10">
            <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase mb-6 backdrop-blur-md border border-white/10 tracking-widest">Enterprise Feature</span>
            <h3 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-black mb-4 leading-tight tracking-tighter`}>
              Generate Visual Assets <br/> with Advanced Gemini 2.5
            </h3>
            <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-indigo-100 mb-8 max-w-xl opacity-90 leading-relaxed font-medium`}>
              Unlock next-generation image generation capabilities directly within your mobile or desktop instance. High-fidelity results in seconds.
            </p>
            <button className="bg-white text-indigo-700 text-xs font-black py-4 px-10 rounded-[1.5rem] shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 active:scale-95 tracking-widest uppercase">
              Activate Module
            </button>
          </div>
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-1000"></div>
          <div className="absolute right-10 bottom-10 text-9xl opacity-10 rotate-12 grayscale brightness-200 pointer-events-none">🎨</div>
        </section> */}

        {/* Secondary Info */}
        <section className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/20">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Menu Safety</h3>
          <div className="grid grid-cols-4 gap-4">
             <QuickActionItem icon="📝" label="Izin Kerja" color="bg-blue-50" />
             <QuickActionItem icon="⚙️" label="penilaian dan evaluasi pjo" color="bg-blue-50" />
             <QuickActionItem icon="📑" label="komisioning" color="bg-blue-50" />
             <QuickActionItem icon="🖼️" label="SPIP - Phase 1 (database-admin)" color="bg-purple-50" />
             <QuickActionItem icon="📑" label="MOC" color="bg-emerald-50" />
             <QuickActionItem icon="⚙️" label="JSA" color="bg-amber-50" />

              <QuickActionItem icon="📝" label="kimper" color="bg-blue-50" />
             <QuickActionItem icon="⚙️" label="SPIP - Phase 2 (end-user)" color="bg-blue-50" />
             <QuickActionItem icon="📑" label="Pengajuan APD" color="bg-blue-50" />
             <QuickActionItem icon="🖼️" label="Event & Strava" color="bg-purple-50" />
             <QuickActionItem icon="📑" label="Inspeksi" color="bg-emerald-50" />
             <QuickActionItem icon="⚙️" label="Hazob" color="bg-amber-50" />
          </div>
          <div className="mt-8 pt-8 border-t border-slate-50">
             <p className="text-[11px] font-bold text-slate-400 uppercase mb-4 tracking-widest">Current Status</p>
             <div className="flex items-center space-x-2">
               <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
               <span className="text-sm font-bold text-slate-700">All systems operational</span>
             </div>
          </div>
        </section>
      </div>

      {/* Activity Section */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-2">Recent Intelligence Streams</h3>
          <button className="text-indigo-600 text-[11px] font-black uppercase tracking-widest hover:underline">View History</button>
        </div>
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
          <ActivityItem 
            title="Structural Pattern Analysis" 
            time="2 mins ago" 
            icon="🧠" 
            category="Neural Engine"
          />
          <ActivityItem 
            title="Automated Data Backup" 
            time="15 mins ago" 
            icon="💾" 
            category="System Core"
          />
        </div>
      </section>
    </div>
  );
};

const QuickActionItem: React.FC<{ icon: string; label: string; color: string }> = ({ icon, label, color }) => (
  <div className={`${color} p-4 rounded-3xl flex flex-col items-center justify-center space-y-2 cursor-pointer transition-all hover:scale-[1.05] active:scale-95 border border-white/50 shadow-sm`}>
    <span className="text-2xl">{icon}</span>
    <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">{label}</span>
  </div>
);

const ActivityItem: React.FC<{ title: string; time: string; icon: string; category: string }> = ({ title, time, icon, category }) => (
  <div className="flex items-center p-6 bg-white rounded-[2.5rem] border border-slate-50 shadow-xl shadow-slate-200/10 transition-all hover:border-indigo-100 hover:shadow-indigo-100/20 active:scale-[0.99] group">
    <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-3xl mr-6 group-hover:bg-indigo-50 transition-colors">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-[10px] font-black text-indigo-500 uppercase mb-1 tracking-widest">{category}</p>
      <p className="font-black text-base text-slate-800 tracking-tight">{title}</p>
      <p className="text-xs text-slate-400 font-medium">{time}</p>
    </div>
    <span className="text-slate-200 text-xl font-thin opacity-0 group-hover:opacity-100 transition-opacity">❯</span>
  </div>
);

export default Dashboard;

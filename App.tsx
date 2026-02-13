
import React, { useState, useEffect } from 'react';
import { ViewType } from './types';
import Dashboard from './components/Dashboard';
import ChatRoom from './components/ChatRoom';
import Discover from './components/Discover';
import BottomNav from './components/BottomNav';
import DesktopSidebar from './components/DesktopSidebar';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);
  const [isSplashActive, setIsSplashActive] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    // Deteksi apakah ini Android WebView
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('wv') || ua.includes('android')) {
      setIsWebView(true);
    }

    if (isMobile) {
      const timer = setTimeout(() => setIsSplashActive(false), 2000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    } else {
      setIsSplashActive(false);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isMobile]);

  if (isSplashActive && isMobile) {
    return (
      <div className="h-screen w-full bg-indigo-600 flex flex-col items-center justify-center text-white animate-pulse">
        <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-4 backdrop-blur-md shadow-2xl">
          <span className="text-4xl">💎</span>
        </div>
        <h1 className="text-2xl font-black tracking-tighter italic">NEXUS ANDROID</h1>
        <p className="text-indigo-200 text-[10px] mt-2 font-bold uppercase tracking-[0.3em]">Powered by Flutter</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case ViewType.DASHBOARD: return <Dashboard isMobile={isMobile} />;
      case ViewType.CHAT: return <ChatRoom isMobile={isMobile} />;
      case ViewType.DISCOVER: return <Discover isMobile={isMobile} />;
      case ViewType.PROFILE: return (
        <div className={`flex flex-col items-center ${isMobile ? 'pt-12' : 'pt-10'} p-6 animate-fadeIn`}>
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full p-1.5 shadow-2xl">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                <span className="text-5xl">👤</span>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-black text-slate-800">Admin Nexus</h2>
          <p className="text-slate-500 mb-10 font-bold italic tracking-wide uppercase text-xs">
            {isWebView ? 'Running on Android Native' : 'Premium Enterprise Plan'}
          </p>
          <div className={`w-full ${isMobile ? '' : 'max-w-4xl grid grid-cols-2 gap-4'} space-y-3 lg:space-y-0`}>
            <SectionButton icon="⚙️" label="App Settings" />
            <SectionButton icon="🛡️" label="Security" />
          </div>
        </div>
      );
      default: return <Dashboard isMobile={isMobile} />;
    }
  };

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-slate-50 overflow-hidden relative selection:bg-indigo-100">
        <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
          {renderContent()}
        </main>
        <BottomNav activeView={activeView} onViewChange={setActiveView} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden selection:bg-indigo-100">
      <DesktopSidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-10 shrink-0 sticky top-0 z-40">
          <div className="flex items-center space-x-2">
             <h2 className="text-sm font-black text-indigo-600 uppercase tracking-widest">{activeView}</h2>
          </div>
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl text-white flex items-center justify-center font-black shadow-lg">A</div>
        </header>
        <main className="flex-1 overflow-y-auto p-10 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

const SectionButton: React.FC<{ icon: string; label: string }> = ({ icon, label }) => (
  <button className="w-full py-5 px-6 bg-white border border-slate-100 rounded-[2rem] text-left font-bold flex items-center justify-between shadow-sm transition-all hover:shadow-md active:scale-[0.98]">
    <div className="flex items-center">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mr-4 text-xl">{icon}</div>
      <span className="text-slate-700">{label}</span>
    </div>
    <span className="text-slate-300">❯</span>
  </button>
);

export default App;

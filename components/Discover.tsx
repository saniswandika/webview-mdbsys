
import React, { useState, useEffect } from 'react';
import { getDailyBriefing } from '../services/geminiService';

// Added interface for Discover component props to fix isMobile error
interface DiscoverProps {
  isMobile?: boolean;
}

const Discover: React.FC<DiscoverProps> = ({ isMobile }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ text: string, sources: any[] } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const briefing = await getDailyBriefing();
        setData(briefing);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Discover</h2>

      <div className="mb-8">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Cari berita, tempat, atau tren..."
            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:border-indigo-400"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 flex items-center">
            <span className="mr-2">🗞️</span> Berita Hari Ini
          </h3>
          <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Live</span>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="h-4 bg-slate-100 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-slate-100 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-slate-100 rounded animate-pulse w-2/3"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
              {data?.text}
            </div>
            
            {data?.sources && data.sources.length > 0 && (
              <div className="pt-4 border-t border-slate-50">
                <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Sumber Terkait</p>
                <div className="flex flex-wrap gap-2">
                  {data.sources.slice(0, 3).map((chunk: any, i: number) => (
                    chunk.web && (
                      <a 
                        key={i} 
                        href={chunk.web.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        {chunk.web.title || 'Link Berita'}
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-slate-800 mb-4">Topik Populer</h3>
        <div className="grid grid-cols-2 gap-3">
          {['#TeknologiAI', '#PialaDunia', '#WisataBali', '#ResepSehat'].map((tag) => (
            <div key={tag} className="bg-indigo-50 text-indigo-700 p-3 rounded-2xl text-center text-xs font-semibold">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;

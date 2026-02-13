
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { chatWithGemini } from '../services/geminiService';

interface ChatRoomProps {
  isMobile?: boolean;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ isMobile }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', content: 'Halo! Saya asisten AI Anda dalam mode Enterprise. Ada yang bisa saya bantu hari ini?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const aiResponse = await chatWithGemini(input, history);
      
      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: aiResponse || "Maaf, sistem sedang mengalami kendala. Coba sesaat lagi.",
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: 'err',
        role: 'model',
        content: "Terjadi kesalahan koneksi sistem. Harap periksa jaringan Anda.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full bg-slate-50/30 ${isMobile ? '' : 'max-w-5xl mx-auto rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl h-[calc(100vh-140px)]'}`}>
      <header className={`p-6 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between sticky top-0 z-10`}>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl mr-4 shadow-lg shadow-indigo-100">
            🤖
          </div>
          <div>
            <h2 className="font-black text-slate-800 leading-none tracking-tight">Gemini Neural Processor</h2>
            <span className="text-[10px] text-green-500 font-black uppercase tracking-widest flex items-center mt-1">
              <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
              Encrypted Session Active
            </span>
          </div>
        </div>
        {!isMobile && (
          <div className="flex space-x-2">
             <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">🗑️</button>
             <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">📑</button>
          </div>
        )}
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-5 rounded-[2rem] shadow-xl ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-100/50' 
                : 'bg-white text-slate-800 border border-slate-50 rounded-tl-none shadow-slate-100/50'
            }`}>
              <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
              <p className={`text-[9px] font-black mt-3 opacity-60 text-right uppercase tracking-tighter`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-50 p-4 rounded-[1.5rem] rounded-tl-none flex space-x-1.5 shadow-sm">
              <div className="w-2 h-2 bg-indigo-200 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex items-center space-x-3 bg-slate-50 rounded-[2rem] px-6 py-3 border border-slate-100 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-100 transition-all">
          <button className="text-slate-400 hover:text-indigo-600 text-xl">📎</button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ketik instruksi atau pertanyaan Anda..."
            className="flex-1 bg-transparent border-none outline-none text-sm py-3 font-medium placeholder:text-slate-400"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-2xl transition-all ${
              input.trim() && !isLoading 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:scale-105 active:scale-90' 
                : 'text-slate-300'
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;

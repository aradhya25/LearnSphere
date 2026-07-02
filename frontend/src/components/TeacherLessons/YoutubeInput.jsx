import React from 'react';
import { FaYoutube } from 'react-icons/fa';
export default function YoutubeInput({ url, setUrl, error }) {
  return (
    <div className="space-y-1.5 animate-fadeIn">
      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
        YouTube Video URL *
      </label>
      <div className="relative">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className={`w-full pl-11 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white ${
            error ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
          }`}
        />
        <FaYoutube className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 w-4 h-4" />
      </div>
      {error && (
        <p className="text-[10px] text-red-500 font-bold">{error}</p>
      )}
    </div>
  );
}
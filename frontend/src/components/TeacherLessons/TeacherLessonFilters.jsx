import React from 'react';
import { FaSearch } from 'react-icons/fa';
export default function TeacherLessonFilters({ search, setSearch, sortBy, setSortBy }) {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-premium flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn">
      
      {/* Search Input */}
      <div className="relative flex-1">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search lessons..."
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white"
        />
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
      </div>
      {/* Sorting select */}
      <div className="relative min-w-[180px] w-full sm:w-auto">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full pl-4 pr-10 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary text-xs font-bold text-darkGray bg-[#F8FAFC] focus:bg-white appearance-none cursor-pointer"
        >
          <option value="order">Sort: Lesson Order</option>
          <option value="newest">Sort: Newest</option>
          <option value="oldest">Sort: Oldest</option>
          <option value="az">Sort: A-Z</option>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
          ▼
        </div>
      </div>
    </div>
  );
}
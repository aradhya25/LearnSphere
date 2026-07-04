import React from 'react';
export default function TeacherAttemptsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      
      {/* 1. Header Skeleton */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-50">
        <div className="space-y-2.5 w-1/3">
          <div className="w-16 h-3 bg-slate-200 rounded" />
          <div className="w-36 h-7 bg-slate-200 rounded-lg" />
          <div className="w-56 h-4 bg-slate-200 rounded" />
        </div>
      </div>
      {/* 2. Search and Filters Skeleton */}
      <div className="w-full h-16 bg-slate-200 rounded-3xl" />
      {/* 3. Table Rows Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-5 space-y-4">
        {/* Table Head Shimmer */}
        <div className="grid grid-cols-6 gap-4 pb-3.5 border-b border-slate-50">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-3.5 bg-slate-200 rounded w-20" />
          ))}
        </div>
        
        {/* Table Row Shimmer List */}
        {[1, 2, 3, 4].map((row) => (
          <div 
            key={row} 
            className="grid grid-cols-6 gap-4 py-3 border-b border-slate-50 last:border-none items-center"
          >
            <div className="h-4.5 bg-slate-200 rounded w-24" />
            <div className="h-4 bg-slate-200 rounded w-28" />
            <div className="h-4 bg-slate-200 rounded w-20" />
            <div className="h-4 bg-slate-200 rounded w-16" />
            <div className="h-5 bg-slate-200 rounded-full w-12 mx-auto" />
            <div className="h-8 bg-slate-200 rounded-lg w-20 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
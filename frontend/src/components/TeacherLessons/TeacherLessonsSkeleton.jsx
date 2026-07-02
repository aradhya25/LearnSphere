import React from 'react';
export default function TeacherLessonsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      
      {/* 1. Header Skeleton */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-50">
        <div className="space-y-2.5 w-1/3">
          <div className="w-16 h-3 bg-slate-200 rounded" />
          <div className="w-36 h-7 bg-slate-200 rounded-lg" />
          <div className="w-56 h-4 bg-slate-200 rounded" />
        </div>
        <div className="w-28 h-10 bg-slate-200 rounded-xl" />
      </div>
      {/* 2. Course Summary Card Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-5 md:p-6 flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-44 h-32 bg-slate-200 rounded-2xl flex-shrink-0" />
        <div className="flex-grow space-y-3.5">
          <div className="w-1/2 h-5.5 bg-slate-200 rounded" />
          <div className="w-full h-3.5 bg-slate-200 rounded" />
          <div className="w-5/6 h-3.5 bg-slate-200 rounded" />
          <div className="w-40 h-3 bg-slate-200 rounded" />
        </div>
      </div>
      {/* 3. Search and Filters Skeleton */}
      <div className="w-full h-16 bg-slate-200 rounded-3xl" />
      {/* 4. Lesson Card Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <div 
            key={n} 
            className="bg-white rounded-3xl border border-slate-100 p-5 space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="w-16 h-5 bg-slate-200 rounded-full" />
              <div className="w-14 h-5 bg-slate-200 rounded-full" />
            </div>
            <div className="space-y-2.5">
              <div className="w-3/4 h-4.5 bg-slate-200 rounded" />
              <div className="w-full h-3.5 bg-slate-200 rounded" />
              <div className="w-5/6 h-3.5 bg-slate-200 rounded" />
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-50">
              <div className="w-16 h-3 bg-slate-200 rounded" />
              <div className="w-16 h-3 bg-slate-200 rounded" />
            </div>
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-50">
              <div className="h-8 bg-slate-200 rounded-xl" />
              <div className="h-8 bg-slate-200 rounded-xl" />
              <div className="h-8 bg-slate-200 rounded-xl" />
              <div className="h-8 bg-slate-200 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
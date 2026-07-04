import React from 'react';
export default function EditQuestionSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      
      {/* Header Skeleton */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-55 border-slate-50">
        <div className="space-y-2.5 w-1/3">
          <div className="w-16 h-3 bg-slate-200 rounded" />
          <div className="w-36 h-7 bg-slate-200 rounded-lg" />
          <div className="w-56 h-4 bg-slate-200 rounded" />
        </div>
        <div className="w-24 h-10 bg-slate-200 rounded-xl" />
      </div>
      {/* Grid: Form (65%) | Preview (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form area (65%) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 p-6 md:p-8 space-y-6">
          <div className="w-28 h-5 bg-slate-200 rounded" />
          <div className="space-y-5">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="space-y-2">
                <div className="w-16 h-3 bg-slate-200 rounded" />
                <div className="w-full h-11 bg-slate-200 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
        {/* Live preview (35%) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="w-24 h-4 bg-slate-200 rounded" />
          <div className="bg-[#F8FAFC] rounded-3xl border border-slate-100 p-5 space-y-4 h-80" />
        </div>
      </div>
    </div>
  );
}

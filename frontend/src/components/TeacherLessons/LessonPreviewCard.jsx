import React from 'react';
import { FaPlay, FaVideo, FaYoutube, FaHourglassHalf, FaRegEye } from 'react-icons/fa';
export default function LessonPreviewCard({
  title,
  description,
  orderNo,
  videoSource,
  courseTitle = 'Course Syllabus'
}) {
  return (
    <div className="space-y-4">
      {/* Live Preview label */}
      <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider select-none">
        <FaRegEye className="w-3.5 h-3.5" />
        <span>Live Preview</span>
      </div>
      {/* Premium Card layout */}
      <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-premium hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[380px]">
        
        <div className="space-y-4">
          
          {/* Video player placeholder */}
          <div className="w-full h-40 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-950 overflow-hidden relative flex items-center justify-center flex-shrink-0 select-none shadow-inner group">
            
            {/* Play overlay button */}
            <div className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md group-hover:scale-105 active:scale-95">
              <FaPlay className="w-4 h-4 translate-x-0.5" />
            </div>
            {/* Source indicator */}
            <span className="absolute bottom-3 left-3 inline-flex items-center space-x-1.5 bg-slate-900/60 backdrop-blur-sm text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-slate-800/40">
              {videoSource === 'youtube' ? (
                <>
                  <FaYoutube className="w-3 h-3 text-red-500" />
                  <span>YouTube</span>
                </>
              ) : (
                <>
                  <FaVideo className="w-3 h-3 text-primary" />
                  <span>Upload Box</span>
                </>
              )}
            </span>
            {/* Status indicator */}
            <span className="absolute top-3 right-3 inline-flex items-center space-x-1 bg-white/90 backdrop-blur-sm text-slate-500 text-[8px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-slate-150">
              <FaHourglassHalf className="w-2.5 h-2.5" />
              <span>Draft</span>
            </span>
          </div>
          {/* Details metadata */}
          <div className="space-y-2">
            
            <div className="flex items-center space-x-2">
              <span className="bg-primary/10 text-primary text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                Lesson {orderNo || 1}
              </span>
              <span className="text-[10px] text-slate-400 font-bold max-w-[120px] truncate">
                {courseTitle}
              </span>
            </div>
            <h4 className="text-sm font-extrabold text-darkGray line-clamp-1 leading-tight">
              {title || 'Untitled Lesson'}
            </h4>
            <p className="text-xs text-darkGray-light font-normal leading-relaxed line-clamp-2 min-h-[2.5rem] whitespace-pre-line">
              {description || 'Write a lesson description to preview it here.'}
            </p>
          </div>
        </div>
        {/* Footer label details */}
        <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold text-slate-400">
          <span className="uppercase text-[9px] tracking-wide text-slate-400 font-black">Draft Preview</span>
        </div>
      </div>
    </div>
  );
}

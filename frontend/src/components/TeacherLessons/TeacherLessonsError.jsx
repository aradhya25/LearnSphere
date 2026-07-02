import React from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';
export default function TeacherLessonsError({ onRetry }) {
  return (
    <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-premium text-center space-y-6 max-w-md mx-auto animate-fadeIn">
      <div className="p-4 bg-red-50 text-red-500 rounded-2xl inline-block">
        <FaExclamationTriangle className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Unable to load lessons
        </h3>
        <p className="text-xs text-slate-400 font-normal leading-relaxed">
          Something went wrong while loading lessons for this course. Please check your connection and try again.
        </p>
      </div>
      
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 mx-auto active:scale-95"
      >
        <FaRedo className="w-3 h-3" />
        <span>Retry</span>
      </button>
    </div>
  );
}

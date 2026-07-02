import React from 'react';
import { FaTrash, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
export default function DeleteLessonModal({ isOpen, onClose, onConfirm, lessonTitle }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Container */}
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full border border-slate-100 shadow-2xl space-y-6 relative animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4.5 top-4.5 p-1 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-darkGray transition-all"
        >
          <FaTimes className="w-4 h-4" />
        </button>
        {/* Warning Icon & Headers */}
        <div className="text-center space-y-3.5 pt-2">
          <div className="p-4.5 bg-red-50 text-red-500 rounded-3xl inline-block shadow-sm">
            <FaExclamationTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-black text-darkGray font-sans">
              Delete Lesson
            </h3>
            {lessonTitle && (
              <span className="text-[10px] font-bold text-red-500 bg-red-50/50 px-2 py-0.5 rounded uppercase tracking-wider">
                {lessonTitle}
              </span>
            )}
          </div>
          <p className="text-xs text-darkGray-light font-normal leading-relaxed max-w-xs mx-auto">
            Are you sure you want to delete this lesson? This action cannot be undone.
          </p>
        </div>
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          {/* Cancel */}
          <button
            onClick={onClose}
            className="w-full py-3 px-5 border border-slate-200 hover:border-slate-350 text-darkGray font-bold rounded-xl text-xs transition-all active:scale-95"
          >
            Cancel
          </button>
          {/* Confirm Delete */}
          <button
            onClick={onConfirm}
            className="w-full py-3 px-5 bg-red-500 hover:bg-red-600 text-white font-extrabold rounded-xl text-xs shadow-md shadow-red-500/10 transition-all flex items-center justify-center space-x-1.5 active:scale-95"
          >
            <FaTrash className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

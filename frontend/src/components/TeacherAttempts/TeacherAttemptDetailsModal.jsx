import React from 'react';
import { FaTimes, FaGraduationCap, FaCalendarAlt, FaEnvelope, FaBookOpen, FaUser, FaRegQuestionCircle } from 'react-icons/fa';
export default function TeacherAttemptDetailsModal({ isOpen, onClose, attempt = {} }) {
  if (!isOpen || !attempt) return null;
  const isPass = (attempt.percentage || 0) >= 40;
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const dateObj = new Date(dateStr);
      return dateObj.toLocaleString(undefined, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return dateStr;
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Container Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full border border-slate-100 shadow-2xl space-y-6 relative animate-scaleUp">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-darkGray transition-all"
          title="Close Details"
        >
          <FaTimes className="w-4 h-4" />
        </button>
        {/* Header Summary */}
        <div className="space-y-1.5 border-b border-slate-50 pb-4 pr-6">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-black uppercase bg-primary/10 text-primary px-2.5 py-0.5 rounded">
              Attempt Details
            </span>
            {isPass ? (
              <span className="inline-flex items-center bg-emerald-50 text-secondary text-[9px] font-black px-2.5 py-0.5 rounded uppercase border border-emerald-100/50 shadow-sm">
                PASS
              </span>
            ) : (
              <span className="inline-flex items-center bg-red-50 text-red-500 text-[9px] font-black px-2.5 py-0.5 rounded uppercase border border-red-100/50 shadow-sm">
                FAIL
              </span>
            )}
          </div>
          <h3 className="text-base font-black text-darkGray font-sans">
            Quiz Result Review
          </h3>
        </div>
        {/* Content details grid */}
        <div className="space-y-4 text-xs font-semibold text-slate-600">
          
          {/* Section: Student Profile */}
          <div className="bg-[#F8FAFC]/60 rounded-2xl p-4 border border-slate-100/80 space-y-3.5">
            <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
              Student Details
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex items-center space-x-2.5 min-w-0">
                <FaUser className="w-4 h-4 text-slate-350 flex-shrink-0" />
                <div className="min-w-0 leading-none">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Name</p>
                  <p className="font-extrabold text-darkGray truncate">{attempt.student_name || 'Anonymous'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2.5 min-w-0">
                <FaEnvelope className="w-4 h-4 text-slate-350 flex-shrink-0" />
                <div className="min-w-0 leading-none">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Email</p>
                  <p className="font-medium text-slate-500 truncate">{attempt.student_email || '—'}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Section: Quiz Course hierarchy */}
          <div className="bg-[#F8FAFC]/60 rounded-2xl p-4 border border-slate-100/80 space-y-3.5">
            <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
              Lesson / Course Map
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2.5">
                <FaBookOpen className="w-4 h-4 text-slate-350 mt-0.5 flex-shrink-0" />
                <div className="leading-tight">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Course & Lesson</p>
                  <p className="font-extrabold text-darkGray">{attempt.course_title || '—'}</p>
                  <p className="font-medium text-slate-450 mt-0.5">{attempt.lesson_title || '—'}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <FaRegQuestionCircle className="w-4 h-4 text-slate-350 mt-0.5 flex-shrink-0" />
                <div className="leading-tight">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Target Quiz</p>
                  <p className="font-bold text-darkGray">{attempt.quiz_title || '—'}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Section: Score Metrics */}
          <div className="grid grid-cols-2 gap-4">
            
            <div className="bg-[#F8FAFC]/60 border border-slate-100 p-4 rounded-2xl flex flex-col justify-center items-center text-center">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Quiz Score</span>
              <p className="text-xl font-black text-darkGray mt-1.5 leading-none">
                {attempt.score || 0}
                <span className="text-xs text-slate-350 font-normal"> / {attempt.total_questions || 0}</span>
              </p>
            </div>
            <div className="bg-[#F8FAFC]/60 border border-slate-100 p-4 rounded-2xl flex flex-col justify-center items-center text-center">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Percentage Score</span>
              <p className="text-xl font-black text-primary mt-1.5 leading-none">
                {attempt.percentage || 0}%
              </p>
            </div>
          </div>
          {/* Date stamp footer */}
          <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-bold justify-start pt-2 px-1">
            <FaCalendarAlt className="w-3.5 h-3.5 text-slate-350" />
            <span>Attempt Stamp: {formatDate(attempt.attempted_at)}</span>
          </div>
        </div>
        {/* Close action bottom trigger */}
        <div className="pt-2 border-t border-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-6 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95"
          >
            Close Result
          </button>
        </div>
      </div>
    </div>
  );
}
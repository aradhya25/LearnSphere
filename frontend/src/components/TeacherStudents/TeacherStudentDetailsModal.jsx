import React from 'react';
import { FaTimes, FaGraduationCap, FaClipboardList, FaFileAlt, FaBookOpen, FaUser, FaEnvelope } from 'react-icons/fa';
export default function TeacherStudentDetailsModal({ isOpen = false, onClose, student = {} }) {
  if (!isOpen || !student) return null;
  const getInitials = (name = '') => {
    return name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'ST';
  };
  const getScoreBadgeStyle = (score) => {
    const numScore = parseFloat(score) || 0;
    if (numScore >= 80) {
      return "bg-emerald-50 text-secondary border-emerald-100/50";
    }
    if (numScore >= 60) {
      return "bg-blue-50 text-primary border-blue-100/50";
    }
    if (numScore >= 40) {
      return "bg-yellow-50 text-yellow-600 border-yellow-100/50";
    }
    return "bg-red-50 text-red-500 border-red-100/50";
  };
  const stats = [
    {
      label: "Enrolled Courses",
      value: student.enrolled_courses || 0,
      icon: <FaBookOpen className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50/40 border-blue-100/30"
    },
    {
      label: "Lessons Completed",
      value: student.completed_lessons || 0,
      icon: <FaFileAlt className="w-5 h-5 text-indigo-600" />,
      bg: "bg-indigo-50/40 border-indigo-100/30"
    },
    {
      label: "Quiz Attempts",
      value: student.quiz_attempts || 0,
      icon: <FaClipboardList className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50/40 border-emerald-100/30"
    },
    {
      label: "Average Quiz Score",
      value: `${parseFloat(student.average_score || 0).toFixed(1)}%`,
      icon: <FaGraduationCap className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-50/40 border-purple-100/30"
    }
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Card Layout container */}
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full border border-slate-100 shadow-2xl space-y-6 relative animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-darkGray transition-all z-10"
        >
          <FaTimes className="w-4 h-4" />
        </button>
        {/* Header: Student profile header details */}
        <div className="flex items-center space-x-4 border-b border-slate-50 pb-5 pr-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-50 to-blue-100 border border-slate-200/50 flex items-center justify-center text-sm font-black text-primary select-none flex-shrink-0">
            {getInitials(student.name)}
          </div>
          
          <div className="leading-tight min-w-0">
            <span className="text-[10px] font-black uppercase bg-primary/10 text-primary px-2.5 py-0.5 rounded leading-none">
              Student Profile
            </span>
            <h3 className="text-base font-black text-darkGray font-sans mt-1.5 truncate">
              {student.name || 'Anonymous Student'}
            </h3>
            <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5 flex items-center gap-1.5">
              <FaEnvelope className="w-3 h-3 text-slate-350" />
              <span>{student.email || '—'}</span>
            </p>
          </div>
        </div>
        {/* Modal Stats Grid details */}
        <div className="space-y-4 text-xs font-semibold text-slate-650">
          
          <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
            Learning Progress Metrics
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`border p-4 rounded-2xl flex items-center space-x-3.5 shadow-sm bg-white hover:shadow-md transition-all duration-300 ${stat.bg}`}
              >
                <div className="p-2.5 bg-white border border-slate-100 rounded-xl shadow-sm">
                  {stat.icon}
                </div>
                <div className="leading-tight">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                    {stat.label}
                  </span>
                  <p className="text-base font-black text-darkGray mt-0.5 leading-none">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Modal Footer action button */}
        <div className="pt-2 border-t border-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-700/40 active:translate-y-0 active:scale-95"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
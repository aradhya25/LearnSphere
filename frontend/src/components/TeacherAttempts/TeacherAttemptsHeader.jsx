import React from 'react';
import { Link } from 'react-router-dom';
export default function TeacherAttemptsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-50 animate-fadeIn">
      <div className="space-y-1">
        {/* Breadcrumb Links */}
        <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider select-none">
          <Link to="/teacher/dashboard" className="hover:text-primary transition-colors">LearnSphere LMS</Link>
          <span>/</span>
          <Link to="/teacher/dashboard" className="hover:text-primary transition-colors">Teacher Dashboard</Link>
          <span>/</span>
          <span className="text-slate-455 font-black">Quiz Attempts</span>
        </div>
        {/* Heading */}
        <div className="space-y-0.5">
          <h1 className="text-3xl font-extrabold text-darkGray tracking-tight font-sans">
            Student Quiz Attempts
          </h1>
          <p className="text-xs text-darkGray-light font-medium mt-1 leading-relaxed">
            View student quiz performance for your courses.
          </p>
        </div>
      </div>
    </div>
  );
}

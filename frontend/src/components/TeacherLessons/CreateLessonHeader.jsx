import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
export default function CreateLessonHeader({ courseId }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-50 animate-fadeIn">
      <div className="space-y-1">
        {/* Breadcrumb links */}
        <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider select-none">
          <Link to="/teacher/dashboard" className="hover:text-primary transition-colors">STEMVerse LMS</Link>
          <span>/</span>
          <Link to="/teacher/courses" className="hover:text-primary transition-colors">My Courses</Link>
          <span>/</span>
          <Link to={`/teacher/course/${courseId}/lessons`} className="hover:text-primary transition-colors">Manage Lessons</Link>
          <span>/</span>
          <span className="text-slate-450 font-black">Create Lesson</span>
        </div>
        {/* Heading */}
        <div className="space-y-0.5">
          <h1 className="text-3xl font-extrabold text-darkGray tracking-tight font-sans">
            Create New Lesson
          </h1>
          <p className="text-xs text-darkGray-light font-medium mt-1 leading-relaxed">
            Create a lesson, upload a video or attach a YouTube video.
          </p>
        </div>
      </div>
      {/* Back button */}
      <button
        onClick={() => navigate(`/teacher/course/${courseId}/lessons`)}
        className="inline-flex items-center space-x-2 text-xs font-bold text-darkGray hover:text-primary transition-all self-start sm:self-auto"
      >
        <FaArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Lessons</span>
      </button>
    </div>
  );
}
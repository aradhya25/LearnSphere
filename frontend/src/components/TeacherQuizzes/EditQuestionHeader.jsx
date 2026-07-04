import React from 'react';
import { Link } from 'react-router-dom';
import { FaSave, FaSpinner, FaTimes } from 'react-icons/fa';
export default function EditQuestionHeader({
  quizId,
  lessonId,
  courseId,
  loading = false,
  onSubmit,
  onCancel
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-50 animate-fadeIn">
      <div className="space-y-1">
        {/* Breadcrumb Links */}
        <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider select-none">
          <Link to="/teacher/dashboard" className="hover:text-primary transition-colors">STEMVerse LMS</Link>
          <span>/</span>
          <Link to="/teacher/dashboard" className="hover:text-primary transition-colors">Teacher Dashboard</Link>
          <span>/</span>
          <Link to="/teacher/courses" className="hover:text-primary transition-colors">My Courses</Link>
          <span>/</span>
          {courseId ? (
            <Link to={`/teacher/course/${courseId}/lessons`} className="hover:text-primary transition-colors">Manage Lessons</Link>
          ) : (
            <span className="text-slate-350">Manage Lessons</span>
          )}
          <span>/</span>
          {lessonId ? (
            <Link to={`/teacher/lesson/${lessonId}/quiz`} className="hover:text-primary transition-colors">Manage Quiz</Link>
          ) : (
            <span className="text-slate-350">Manage Quiz</span>
          )}
          <span>/</span>
          {quizId ? (
            <Link to={`/teacher/quiz/${quizId}/questions`} className="hover:text-primary transition-colors">Manage Questions</Link>
          ) : (
            <span className="text-slate-350">Manage Questions</span>
          )}
          <span>/</span>
          <span className="text-slate-455 font-black">Edit Question</span>
        </div>
        {/* Heading */}
        <div className="space-y-0.5">
          <h1 className="text-3xl font-extrabold text-darkGray tracking-tight font-sans">
            Edit Question
          </h1>
          <p className="text-xs text-darkGray-light font-medium mt-1 leading-relaxed">
            Update question details and option parameters for this quiz.
          </p>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center space-x-2.5 self-start sm:self-auto">
        <button
          onClick={onCancel}
          disabled={loading}
          className="inline-flex items-center justify-center space-x-1.5 py-3 px-4.5 border border-slate-200 hover:border-slate-355 text-darkGray font-bold rounded-xl text-xs transition-all active:scale-95 disabled:pointer-events-none"
        >
          <FaTimes className="w-3 h-3 text-slate-455" />
          <span>Cancel</span>
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="inline-flex items-center justify-center space-x-2 py-3 px-5 bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs shadow-md shadow-primary/10 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin w-3.5 h-3.5" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <FaSave className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
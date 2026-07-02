import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
export default function TeacherLessonsEmpty({ courseId }) {
  return (
    <div className="bg-white rounded-3xl p-12 md:p-16 border border-slate-100 shadow-premium flex flex-col items-center justify-center text-center max-w-md mx-auto animate-fadeIn">
      {/* 📖 Emoji */}
      <span className="text-5xl mb-6 select-none animate-bounce" role="img" aria-label="Book open">
        📖
      </span>
      <h3 className="text-lg font-bold text-darkGray font-sans">
        No Lessons Yet
      </h3>
      
      <p className="text-xs text-darkGray-light font-normal leading-relaxed mt-2 max-w-xs">
        Start by creating your first lesson to publish learning content.
      </p>
      {/* Action Button */}
      <Link
        to={`/teacher/course/${courseId}/lesson/create`}
        className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold rounded-xl text-xs shadow-md shadow-primary/10 transition-all active:scale-95 space-x-2"
      >
        <FaPlusCircle className="w-3.5 h-3.5" />
        <span>Create First Lesson</span>
      </Link>
    </div>
  );
}

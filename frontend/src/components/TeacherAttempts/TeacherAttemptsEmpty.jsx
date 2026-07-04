import React from 'react';
export default function TeacherAttemptsEmpty() {
  return (
    <div className="bg-white rounded-3xl p-12 md:p-16 border border-slate-100 shadow-premium flex flex-col items-center justify-center text-center max-w-md mx-auto animate-fadeIn">
      {/* 📊 Icon */}
      <span className="text-5xl mb-6 select-none animate-bounce" role="img" aria-label="No attempts chart">
        📊
      </span>
      <h3 className="text-lg font-bold text-darkGray font-sans">
        No quiz attempts found.
      </h3>
      
      <p className="text-xs text-darkGray-light font-normal leading-relaxed mt-2 max-w-xs">
        Students have not attempted any quizzes for your courses yet. Once students complete their attempts, their marks will record here.
      </p>
    </div>
  );
}

import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';
export default function TeacherAttemptsTable({ attempts = [], onViewDetails }) {
  
  const formatDate = (dateStr) => {
    if (!dateStr) return { date: '—', time: '—' };
    try {
      const dateObj = new Date(dateStr);
      const datePart = dateObj.toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      const timePart = dateObj.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      return { date: datePart, time: timePart };
    } catch (e) {
      return { date: dateStr, time: '' };
    }
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-premium overflow-hidden animate-fadeIn">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          
          {/* Table Headers */}
          <thead>
            <tr className="border-b border-slate-100 bg-[#F8FAFC]/50 text-[10px] font-black uppercase text-slate-400 tracking-wider select-none">
              <th className="py-4.5 px-6">Student</th>
              <th className="py-4.5 px-6">Email</th>
              <th className="py-4.5 px-6">Course</th>
              <th className="py-4.5 px-6">Lesson</th>
              <th className="py-4.5 px-6">Quiz</th>
              <th className="py-4.5 px-6 text-center">Score</th>
              <th className="py-4.5 px-6 text-center">Percentage</th>
              <th className="py-4.5 px-6 text-center">Status</th>
              <th className="py-4.5 px-6">Attempt Date</th>
              <th className="py-4.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="divide-y divide-slate-50 text-xs font-semibold text-darkGray">
            {attempts.map((attempt) => {
              const { date, time } = formatDate(attempt.attempted_at);
              const isPass = (attempt.percentage || 0) >= 40;
              return (
                <tr
                  key={attempt.id}
                  className="hover:bg-slate-50/50 transition-colors duration-150 group"
                >
                  {/* Student Name */}
                  <td className="py-4 px-6 font-bold text-darkGray truncate max-w-[150px]">
                    {attempt.student_name || 'Anonymous Student'}
                  </td>
                  {/* Student Email */}
                  <td className="py-4 px-6 text-slate-500 font-medium truncate max-w-[150px]">
                    {attempt.student_email || '—'}
                  </td>
                  {/* Course Title */}
                  <td className="py-4 px-6 font-medium text-slate-600 truncate max-w-[160px]">
                    {attempt.course_title || '—'}
                  </td>
                  {/* Lesson Title */}
                  <td className="py-4 px-6 font-medium text-slate-500 truncate max-w-[140px]">
                    {attempt.lesson_title || '—'}
                  </td>
                  {/* Quiz Title */}
                  <td className="py-4 px-6 font-bold text-slate-600 truncate max-w-[140px]">
                    {attempt.quiz_title || '—'}
                  </td>
                  {/* Score */}
                  <td className="py-4 px-6 text-center font-extrabold text-slate-700">
                    {attempt.score || 0} <span className="text-slate-350 text-[10px] font-normal">/ {attempt.total_questions || 0}</span>
                  </td>
                  {/* Percentage */}
                  <td className="py-4 px-6 text-center font-black text-slate-700">
                    {attempt.percentage || 0}%
                  </td>
                  {/* Status Badge */}
                  <td className="py-4 px-6 text-center">
                    {isPass ? (
                      <span className="inline-flex items-center space-x-1 bg-emerald-50 text-secondary text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-100/50 shadow-sm">
                        <FaCheckCircle className="w-2.5 h-2.5" />
                        <span>Pass</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 bg-red-50 text-red-500 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border border-red-100/50 shadow-sm">
                        <FaTimesCircle className="w-2.5 h-2.5" />
                        <span>Fail</span>
                      </span>
                    )}
                  </td>
                  {/* Attempt Date */}
                  <td className="py-4 px-6">
                    <div className="space-y-0.5 leading-none">
                      <p className="text-[11px] font-bold text-darkGray">{date}</p>
                      <p className="text-[9px] font-medium text-slate-400">{time}</p>
                    </div>
                  </td>
                  {/* Action */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => onViewDetails(attempt)}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 border border-slate-100 hover:border-slate-300 text-darkGray-light hover:text-primary rounded-lg text-[10px] font-extrabold uppercase tracking-wide transition-all shadow-sm active:scale-95 bg-white"
                    >
                      <FaEye className="w-3 h-3" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
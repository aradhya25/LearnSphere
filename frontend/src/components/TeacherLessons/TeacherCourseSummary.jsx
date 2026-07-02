import React from "react";
import { FaLanguage, FaCalendarAlt, FaBookOpen } from "react-icons/fa";
export default function TeacherCourseSummary({
  course = {},
  totalLessons = 0,
}) {
  const { title, description, language, thumbnail, created_at } = course || {};
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 md:p-6 shadow-premium flex flex-col md:flex-row gap-5 items-stretch animate-fadeIn">
      {/* Course Thumbnail or Placeholder */}
      <div className="w-full md:w-44 h-32 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-100 border border-slate-100 flex-shrink-0 flex items-center justify-center overflow-hidden relative select-none">
        {thumbnail ? (
          <img
            src={
              course.thumbnail
                ? `http://localhost:5000${course.thumbnail}`
                : "/placeholder-course.png"
            }
            alt={course.title}
            onError={(e) => {
              e.target.src = "/placeholder-course.png";
            }}
          />
        ) : (
          <span className="text-4xl">📚</span>
        )}
        {/* Language Badge */}
        <span className="absolute top-2.5 right-2.5 inline-flex items-center space-x-1 bg-white/90 backdrop-blur-sm text-primary text-[8px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm border border-slate-100/50">
          <FaLanguage className="w-2.5 h-2.5" />
          <span>{language || "English"}</span>
        </span>
      </div>
      {/* Details content */}
      <div className="flex-1 flex flex-col justify-between min-w-0 space-y-3">
        <div className="space-y-1.5">
          <h2 className="text-lg font-black text-darkGray leading-tight">
            {title || "Course Details"}
          </h2>
          <p className="text-xs text-darkGray-light font-normal leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
        {/* Metrics details */}
        <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-slate-450 pt-2 border-t border-slate-50">
          <div className="flex items-center space-x-1.5">
            <FaBookOpen className="w-3.5 h-3.5 text-primary" />
            <span>Total Lessons: {totalLessons}</span>
          </div>
          <div className="h-3 w-px bg-slate-200" />
          <div className="flex items-center space-x-1.5">
            <FaCalendarAlt className="w-3.5 h-3.5 text-slate-350" />
            <span>Published: {formatDate(created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

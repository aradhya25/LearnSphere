import React from "react";
import { FaGraduationCap, FaCalendarAlt, FaUser } from "react-icons/fa";
export default function CourseCard({ course, onViewCourse }) {
  const {
    title,
    description,
    language,
    thumbnail,
    instructor_name,
    created_at,
  } = course;
  // Format Date Helper
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-premium hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-50 flex-shrink-0">
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
        ) : null}

        {/* Fallback Icon */}
        <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex-col items-center justify-center p-4">
          <FaGraduationCap className="w-10 h-10 text-primary-light animate-pulse" />
        </div>
        {/* Floating Language Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-slate-800 shadow-lg border border-white/50">
            🌐 {language}
          </span>
        </div>
      </div>
      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Header row: creator info */}
          <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-semibold">
            <FaUser className="w-3 h-3 text-slate-350" />
            <span className="truncate">
              Created by: {instructor_name || "Staff"}
            </span>
          </div>
          {/* Title */}
          <h3 className="text-base font-extrabold text-darkGray tracking-tight leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          {/* Description clamped to 2 lines */}
          <p className="text-xs text-darkGray-light font-normal leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
        {/* Date Row & View Button */}
        <div className="space-y-4 pt-3 border-t border-slate-50">
          {/* Created Date */}
          <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-bold">
            <FaCalendarAlt className="w-3 h-3" />
            <span>Created on {formatDate(created_at)}</span>
          </div>
          {/* View Course Button */}
          <button
            onClick={() => onViewCourse(id)}
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
          >
            View Course →
          </button>
        </div>
      </div>
    </div>
  );
}

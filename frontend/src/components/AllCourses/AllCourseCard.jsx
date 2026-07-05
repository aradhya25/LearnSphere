import React, { useState } from "react";
import {
  FaGraduationCap,
  FaCalendarAlt,
  FaUser,
  FaCheck,
  FaSpinner,
} from "react-icons/fa";
export default function AllCourseCard({ course, isEnrolled, onEnroll }) {
  const {
    id,
    title,
    description,
    language,
    thumbnail,
    instructor_name,
    created_at,
  } = course;
  const [isEnrolling, setIsEnrolling] = useState(false);
  // Date Formatter helper
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
  const handleEnrollClick = async () => {
    setIsEnrolling(true);
    await onEnroll(id);
    setIsEnrolling(false);
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

        {/* Fallback Graphic */}
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
          {/* Created By */}
          <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-semibold">
            <FaUser className="w-3 h-3 text-slate-350" />
            <span className="truncate">
              Instructor: {instructor_name || "Staff"}
            </span>
          </div>
          {/* Course Title */}
          <h3 className="text-base font-extrabold text-darkGray tracking-tight leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          {/* Description clamped to 2 lines */}
          <p className="text-xs text-darkGray-light font-normal leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
        {/* Date Row & Enroll CTA */}
        <div className="space-y-4 pt-3 border-t border-slate-50">
          <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-bold">
            <FaCalendarAlt className="w-3 h-3" />
            <span>Created on {formatDate(created_at)}</span>
          </div>
          {/* Action Enroll Button */}
          {isEnrolled ? (
            <button
              disabled
              className="w-full py-3.5 px-4 bg-slate-100 border border-slate-200 text-slate-400 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 cursor-not-allowed"
            >
              <FaCheck className="w-3 h-3 text-secondary" />
              <span>Enrolled</span>
            </button>
          ) : (
            <button
              onClick={handleEnrollClick}
              disabled={isEnrolling}
              className="inline-flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-700/40 active:translate-y-0 disabled:pointer-events-none"
            >
              {isEnrolling ? (
                <>
                  <FaSpinner className="animate-spin w-3 h-3" />
                  <span>Enrolling...</span>
                </>
              ) : (
                <span>Enroll Now</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

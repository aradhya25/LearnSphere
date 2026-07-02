import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlayCircle,
  FaCalendarAlt,
  FaEdit,
  FaQuestionCircle,
  FaTrash,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";
export default function TeacherLessonCard({ lesson, onDeleteInit }) {
  const navigate = useNavigate();
  const {
    id,
    title,
    content,
    video_url,
    video_type,
    order_no,
    status,
    created_at,
  } = lesson || {};
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-premium hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between space-y-4 animate-fadeIn">
      <div className="space-y-3">
        {/* Header: Lesson number & status */}
        <div className="flex items-center justify-between">
          <span className="bg-primary/10 text-primary text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Lesson {order_no || 1}
          </span>
          {/* Status Badge */}
          {status === "published" || !status ? (
            <span className="inline-flex items-center space-x-1 bg-emerald-50 text-secondary text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              <FaCheckCircle className="w-2 h-2" />
              <span>Published</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1 bg-slate-100 text-slate-455 text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              <FaHourglassHalf className="w-2 h-2" />
              <span>Draft</span>
            </span>
          )}
        </div>
        {/* Title */}
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-sm font-extrabold text-darkGray leading-tight line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h4>
          <FaPlayCircle className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
        </div>
        {/* Short Description */}
        <p className="text-xs text-darkGray-light font-normal leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {content || "No description provided."}
        </p>
        {/* Lesson meta parameters */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-[10px] font-bold text-slate-400">
            <span className="inline-flex items-center space-x-1">
              <FaPlayCircle className="w-3.5 h-3.5 text-slate-350 mr-1" />
              <span>
                {video_url
                  ? video_type === "youtube"
                    ? "YouTube Video"
                    : "Uploaded Video"
                  : "No Video"}
              </span>
            </span>
          
          <span className="inline-flex items-center space-x-1">
            <FaCalendarAlt className="w-3.5 h-3.5 text-slate-350" />
            <span>{formatDate(created_at)}</span>
          </span>
        </div>
      </div>
      {/* Action buttons (Edit, Manage Quiz, Preview, Delete) */}
      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-50">
        {/* Edit */}
        <button
          onClick={() =>navigate(`/teacher/lesson/${id}/edit`)}
          className="inline-flex flex-col items-center justify-center p-2 border border-slate-100 hover:border-slate-300 text-darkGray-light hover:text-primary rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all"
          title="Edit Lesson"
        >
          <FaEdit className="w-3.5 h-3.5 mb-1" />
          <span>Edit</span>
        </button>
        {/* Manage Quiz */}
        <button
          onClick={() => navigate(`/teacher/lesson/${id}/quiz`)}
          className="inline-flex flex-col items-center justify-center p-2 border border-slate-100 hover:border-slate-300 text-darkGray-light hover:text-purple-600 rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all"
          title="Manage Quiz"
        >
          <FaQuestionCircle className="w-3.5 h-3.5 mb-1" />
          <span>Quiz</span>
        </button>
        {/* Preview */}
        <button
          onClick={() => navigate(`/teacher/lesson/preview/${id}`)}
          className="inline-flex flex-col items-center justify-center p-2 border border-slate-100 hover:border-slate-300 text-darkGray-light hover:text-emerald-600 rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all"
          title="Preview Lesson"
        >
          <FaPlayCircle className="w-3.5 h-3.5 mb-1" />
          <span>Preview</span>
        </button>
        {/* Delete */}
        <button
          onClick={() => onDeleteInit(lesson)}
          className="inline-flex flex-col items-center justify-center p-2 border border-slate-100 hover:border-red-200 text-darkGray-light hover:text-red-500 rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all"
          title="Delete Lesson"
        >
          <FaTrash className="w-3.5 h-3.5 mb-1" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

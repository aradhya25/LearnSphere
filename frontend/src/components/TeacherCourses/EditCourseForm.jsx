import React, { useRef, useState } from "react";
import {
  FaSave,
  FaSpinner,
  FaCloudUploadAlt,
  FaImage,
  FaTrash,
} from "react-icons/fa";
export default function EditCourseForm({
  title,
  setTitle,
  description,
  setDescription,
  language,
  setLanguage,
  thumbnailFile,
  setThumbnailFile,
  currentThumbnail,
  previewUrl,
  setPreviewUrl,
  errors = {},
  loading = false,
  onSubmit,
  onCancel,
}) {
  const titleLimit = 100;
  const descLimit = 1000;
  const fileInputRef = useRef();
  const [isDragOver, setIsDragOver] = useState(false);
  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      validateAndSetFile(selected);
    }
  };
  const validateAndSetFile = (selected) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (!allowedTypes.includes(selected.type)) {
      alert(
        "Invalid file type. Only JPG, JPEG, PNG, and WEBP images are allowed.",
      );
      return;
    }
    if (selected.size > maxSize) {
      alert("File size exceeds the 5 MB limit.");
      return;
    }
    setThumbnailFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const selected = e.dataTransfer.files?.[0];
    if (selected) {
      validateAndSetFile(selected);
    }
  };
  const handleRemoveNewFile = () => {
    setThumbnailFile(null);
    setPreviewUrl(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  const thumbnailUrl =
    currentThumbnail && currentThumbnail.startsWith("http")
      ? currentThumbnail
      : currentThumbnail
        ? `http://localhost:5000${currentThumbnail}`
        : "";
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium space-y-6 animate-fadeIn">
      <div className="border-b border-slate-50 pb-4">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Course Specifications
        </h3>
        <p className="text-[10px] text-slate-455 font-bold uppercase tracking-wider">
          Modify the specifications and metadata of your course
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 1. Course Title */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-400">Course Title *</span>
            <span className="text-slate-400">
              {title.length} / {titleLimit}
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, titleLimit))}
            placeholder="Enter course title"
            disabled={loading}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 ${
              errors.title
                ? "border-red-400 focus:border-red-500"
                : "border-slate-200 focus:border-primary"
            }`}
          />
          {errors.title && (
            <p className="text-[10px] text-red-500 font-bold">{errors.title}</p>
          )}
        </div>
        {/* 2. Course Description */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-400">Course Description *</span>
            <span className="text-slate-400">
              {description.length} / {descLimit}
            </span>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, descLimit))}
            placeholder="Write a detailed course description..."
            rows="5"
            disabled={loading}
            className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 resize-none ${
              errors.description
                ? "border-red-400 focus:border-red-500"
                : "border-slate-200 focus:border-primary"
            }`}
          />
          {errors.description && (
            <p className="text-[10px] text-red-500 font-bold">
              {errors.description}
            </p>
          )}
        </div>
        {/* 3. Language Dropdown */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Language *
          </label>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={loading}
              className={`w-full pl-4 pr-10 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 cursor-pointer appearance-none ${
                errors.language
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-200 focus:border-primary"
              }`}
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
          {errors.language && (
            <p className="text-[10px] text-red-500 font-bold">
              {errors.language}
            </p>
          )}
        </div>
        {/* 4. Thumbnail Upload Section */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Course Thumbnail
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".png,.jpg,.jpeg,.webp"
            className="hidden"
            disabled={loading}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Left Box: Current thumbnail display */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-[#F8FAFC] flex flex-col justify-center items-center text-center space-y-2.5">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                Current Thumbnail
              </span>
              <div className="w-28 h-20 bg-white border border-slate-100 rounded-xl overflow-hidden relative flex items-center justify-center select-none shadow-sm">
                {currentThumbnail ? (
                  <img
                    src={thumbnailUrl}
                    alt="Current Course Thumbnail"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.log("Image failed:", thumbnailUrl);
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <FaImage className="w-6 h-6 text-slate-300" />
                )}
              </div>
            </div>
            {/* Right Box: Selection dropzone or selected replacement preview */}
            {!previewUrl ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`rounded-2xl border-2 border-dashed py-4 px-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-1.5 ${
                  isDragOver
                    ? "border-primary bg-primary/5"
                    : errors.thumbnail
                      ? "border-red-300 bg-red-50/10 hover:border-red-400"
                      : "border-slate-200 bg-[#F8FAFC] hover:border-primary hover:bg-white"
                }`}
              >
                <FaCloudUploadAlt className="w-5 h-5 text-primary" />
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-darkGray leading-tight">
                    Upload replacement thumbnail
                  </p>
                  <p className="text-[8px] text-slate-400 font-medium leading-none">
                    JPG, PNG, WEBP up to 5 MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl border border-primary bg-primary/5 flex flex-col justify-center items-center text-center space-y-2.5 relative">
                <span className="text-[9px] uppercase font-bold text-primary tracking-wider">
                  New Replacement
                </span>
                <div className="w-28 h-20 bg-white border border-slate-150 rounded-xl overflow-hidden shadow-sm">
                  <img
                    src={previewUrl}
                    alt="New Thumbnail Preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleRemoveNewFile}
                  disabled={loading}
                  className="absolute top-2 right-2 p-1.5 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 rounded-lg transition-colors disabled:opacity-50"
                  title="Remove Replacement"
                >
                  <FaTrash className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
          {errors.thumbnail && (
            <p className="text-[10px] text-red-500 font-bold">
              {errors.thumbnail}
            </p>
          )}
        </div>
        {/* Bottom Actions Row */}
        <div className="flex items-center justify-end space-x-3.5 pt-4 border-t border-slate-50">
          {/* Cancel */}
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="py-3 px-5 border border-slate-200 hover:border-slate-350 text-darkGray font-bold rounded-xl text-xs transition-all active:scale-95 disabled:pointer-events-none"
          >
            Cancel
          </button>
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-primary to-blue-750 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs shadow-md shadow-primary/10 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin w-3.5 h-3.5" />
                <span>Saving Course...</span>
              </>
            ) : (
              <>
                <FaSave className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

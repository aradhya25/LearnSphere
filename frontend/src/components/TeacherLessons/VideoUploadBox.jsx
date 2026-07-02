import React, { useRef, useState } from 'react';
import { FaCloudUploadAlt, FaVideo, FaTrash, FaCheckCircle, FaSpinner } from 'react-icons/fa';
export default function VideoUploadBox({
  file,
  setFile,
  progress = 0,
  loading = false,
  error = null
}) {
  const fileInputRef = useRef();
  const [isDragOver, setIsDragOver] = useState(false);
  const formatSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };
  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      validateAndSetFile(selected);
    }
  };
  const validateAndSetFile = (selected) => {
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo']; // MP4, MOV, AVI
    const maxSize = 500 * 1024 * 1024; // 500 MB
    if (selected.size > maxSize) {
      alert("File size exceeds the maximum 500 MB limit.");
      return;
    }
    setFile(selected);
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
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
        Upload Video File *
      </label>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".mp4,.mov,.avi,video/mp4,video/quicktime,video/x-msvideo"
        className="hidden"
        disabled={loading}
      />
      {!file ? (
        /* 1. Drag & Drop box */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full rounded-2xl border-2 border-dashed py-8 px-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 ${
            isDragOver 
              ? 'border-primary bg-primary/5' 
              : error 
                ? 'border-red-300 bg-red-50/10 hover:border-red-400' 
                : 'border-slate-200 bg-[#F8FAFC] hover:border-primary hover:bg-white'
          }`}
        >
          <div className="p-3 bg-white shadow-sm border border-slate-100 rounded-xl text-slate-400">
            <FaCloudUploadAlt className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-darkGray">
              Drag & drop your video file here, or{' '}
              <span className="text-primary hover:underline">browse</span>
            </p>
            <p className="text-[10px] text-slate-400 font-medium">
              Accepts MP4, MOV, AVI up to 500 MB
            </p>
          </div>
        </div>
      ) : (
        /* 2. File metadata & progress displays */
        <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-150 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="p-2.5 bg-white border border-slate-100 rounded-xl text-primary flex-shrink-0">
                <FaVideo className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-darkGray truncate">
                  {file.name}
                </p>
                <p className="text-[9px] text-slate-400 font-bold">
                  {formatSize(file.size)}
                </p>
              </div>
            </div>
            {/* Remove file button */}
            <button
              type="button"
              onClick={() => setFile(null)}
              disabled={loading}
              className="p-2 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 rounded-lg transition-colors flex-shrink-0 disabled:opacity-50"
              title="Remove Video"
            >
              <FaTrash className="w-3.5 h-3.5" />
            </button>
          </div>
          {/* Progress bar container (active when loading is true) */}
          {loading && progress > 0 && (
            <div className="space-y-1.5 pt-1 border-t border-slate-50">
              <div className="flex justify-between items-center text-[9px] font-bold text-slate-450">
                <span className="flex items-center space-x-1.5">
                  <FaSpinner className="animate-spin text-primary" />
                  <span>Uploading to server...</span>
                </span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {error && (
        <p className="text-[10px] text-red-500 font-bold">{error}</p>
      )}
    </div>
  );
}

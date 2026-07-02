import React from 'react';
import { FaSave, FaSpinner } from 'react-icons/fa';
import VideoUploadBox from './VideoUploadBox';
import YoutubeInput from './YoutubeInput';
export default function CreateLessonForm({
  title,
  setTitle,
  description,
  setDescription,
  orderNo,
  setOrderNo,
  videoSource,
  setVideoSource,
  file,
  setFile,
  youtubeUrl,
  setYoutubeUrl,
  progress = 0,
  errors = {},
  loading = false,
  onSubmit,
  onCancel
}) {
  const titleLimit = 100;
  const descLimit = 1000;
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium space-y-6 animate-fadeIn">
      
      <div className="border-b border-slate-50 pb-4">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Lesson Specifications
        </h3>
        <p className="text-[10px] text-slate-455 font-bold uppercase tracking-wider">
          Provide specifications to build this lesson module
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* 1. Lesson Title */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-400">Lesson Title *</span>
            <span className="text-slate-400">
              {title.length} / {titleLimit}
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, titleLimit))}
            placeholder="Enter lesson title"
            disabled={loading}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 ${
              errors.title ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
            }`}
          />
          {errors.title && (
            <p className="text-[10px] text-red-500 font-bold">{errors.title}</p>
          )}
        </div>
        {/* 2. Lesson Description */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-400">Description *</span>
            <span className="text-slate-400">
              {description.length} / {descLimit}
            </span>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, descLimit))}
            placeholder="Write a short lesson description..."
            rows="4"
            disabled={loading}
            className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 resize-none ${
              errors.description ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
            }`}
          />
          {errors.description && (
            <p className="text-[10px] text-red-500 font-bold">{errors.description}</p>
          )}
        </div>
        {/* 3. Lesson Order */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Lesson Order *
          </label>
          <input
            type="number"
            min="1"
            value={orderNo}
            onChange={(e) => setOrderNo(Math.max(1, parseInt(e.target.value) || ''))}
            placeholder="e.g. 1"
            disabled={loading}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 ${
              errors.orderNo ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
            }`}
          />
          {errors.orderNo && (
            <p className="text-[10px] text-red-500 font-bold">{errors.orderNo}</p>
          )}
        </div>
        {/* 4. Video Source Segmented selector */}
        <div className="space-y-2.5">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Video Source *
          </label>
          
          <div className="grid grid-cols-2 p-1.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl">
            <button
              type="button"
              disabled={loading}
              onClick={() => setVideoSource('upload')}
              className={`py-3 px-4 rounded-xl text-xs font-extrabold transition-all ${
                videoSource === 'upload'
                  ? 'bg-white text-primary shadow-sm border border-slate-100'
                  : 'text-slate-450 hover:text-darkGray'
              }`}
            >
              Upload Video
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => setVideoSource('youtube')}
              className={`py-3 px-4 rounded-xl text-xs font-extrabold transition-all ${
                videoSource === 'youtube'
                  ? 'bg-white text-primary shadow-sm border border-slate-100'
                  : 'text-slate-450 hover:text-darkGray'
              }`}
            >
              YouTube Video
            </button>
          </div>
        </div>
        {/* 5. Conditional Source Inputs */}
        <div className="pt-2">
          {videoSource === 'youtube' ? (
            <YoutubeInput
              url={youtubeUrl}
              setUrl={setYoutubeUrl}
              error={errors.youtubeUrl}
            />
          ) : (
            <VideoUploadBox
              file={file}
              setFile={setFile}
              progress={progress}
              loading={loading}
              error={errors.file}
            />
          )}
        </div>
        {/* Bottom Actions buttons row */}
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
                <span>Creating Lesson...</span>
              </>
            ) : (
              <>
                <FaSave className="w-3.5 h-3.5" />
                <span>Create Lesson</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

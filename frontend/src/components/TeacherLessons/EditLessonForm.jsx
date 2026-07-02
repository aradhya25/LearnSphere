import React from 'react';
import { FaSave, FaSpinner, FaCloudUploadAlt, FaYoutube } from 'react-icons/fa';
import VideoUploadBox from './VideoUploadBox';
import YoutubeInput from './YoutubeInput';
export default function EditLessonForm({
  title,
  setTitle,
  content,
  setContent,
  orderNo,
  setOrderNo,
  videoType,
  setVideoType,
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
  const contentLimit = 1000;
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium space-y-6 animate-fadeIn">
      
      <div className="border-b border-slate-50 pb-4">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Lesson Details & Material
        </h3>
        <p className="text-[10px] text-slate-455 font-bold uppercase tracking-wider">
          Update the metadata structure and files for this lesson module
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
        {/* 2. Content / Description */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-400">Content / Description *</span>
            <span className="text-slate-400">
              {content.length} / {contentLimit}
            </span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, contentLimit))}
            placeholder="Write the lesson content description..."
            rows="5"
            disabled={loading}
            className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 resize-none ${
              errors.content ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
            }`}
          />
          {errors.content && (
            <p className="text-[10px] text-red-500 font-bold">{errors.content}</p>
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
        {/* 4. Video Source Selector (Radio styled selection) */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Video Source *
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Upload Video Radio */}
            <label
              className={`p-4 rounded-2xl border flex items-center space-x-3 cursor-pointer transition-all ${
                videoType === 'upload' || videoType === 'video'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-slate-200 bg-[#F8FAFC] hover:bg-white text-slate-500'
              }`}
            >
              <input
                type="radio"
                name="videoType"
                value="upload"
                checked={videoType === 'upload' || videoType === 'video'}
                onChange={() => setVideoType('upload')}
                disabled={loading}
                className="text-primary focus:ring-primary"
              />
              <FaCloudUploadAlt className="w-5 h-5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs font-extrabold leading-none">Upload Video</p>
                <p className="text-[9px] opacity-75 mt-0.5">MP4, MOV, AVI up to 500 MB</p>
              </div>
            </label>
            {/* YouTube URL Radio */}
            <label
              className={`p-4 rounded-2xl border flex items-center space-x-3 cursor-pointer transition-all ${
                videoType === 'youtube'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-slate-200 bg-[#F8FAFC] hover:bg-white text-slate-500'
              }`}
            >
              <input
                type="radio"
                name="videoType"
                value="youtube"
                checked={videoType === 'youtube'}
                onChange={() => setVideoType('youtube')}
                disabled={loading}
                className="text-primary focus:ring-primary"
              />
              <FaYoutube className="w-5 h-5 flex-shrink-0 text-red-500" />
              <div className="text-left">
                <p className="text-xs font-extrabold leading-none">YouTube Video</p>
                <p className="text-[9px] opacity-75 mt-0.5">Attach watch linkages</p>
              </div>
            </label>
          </div>
        </div>
        {/* 5. Conditional Source Inputs */}
        <div className="pt-2">
          {videoType === 'youtube' ? (
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
                <span>Saving Lesson...</span>
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
import React from 'react';
import { FaSave, FaSpinner } from 'react-icons/fa';
export default function EditQuestionForm({
  questionText,
  setQuestionText,
  optionA,
  setOptionA,
  optionB,
  setOptionB,
  optionC,
  setOptionC,
  optionD,
  setOptionD,
  correctAnswer,
  setCorrectAnswer,
  errors = {},
  loading = false,
  onSubmit,
  onCancel
}) {
  const questionLimit = 500;
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium space-y-6 animate-fadeIn">
      
      <div className="border-b border-slate-50 pb-4">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Question Specifications
        </h3>
        <p className="text-[10px] text-slate-455 font-bold uppercase tracking-wider">
          Update multiple-choice question layout details
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* 1. Question Text */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-400">Question Text *</span>
            <span className="text-slate-400">
              {questionText.length} / {questionLimit}
            </span>
          </div>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value.slice(0, questionLimit))}
            placeholder="e.g. What is the quantum superposition state representation notation?"
            rows="4"
            disabled={loading}
            className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 resize-none ${
              errors.questionText ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
            }`}
          />
          {errors.questionText && (
            <p className="text-[10px] text-red-500 font-bold">{errors.questionText}</p>
          )}
        </div>
        {/* 2. Multiple Choice Options (A, B, C, D) */}
        <div className="space-y-4">
          <label className="text-[10px] uppercase font-bold text-slate-450 block tracking-wider block">
            Multiple Choice Options *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Option A */}
            <div className="space-y-1.5">
              <span className="text-[9px] uppercase font-black text-slate-400 block">Option A *</span>
              <input
                type="text"
                value={optionA}
                onChange={(e) => setOptionA(e.target.value)}
                placeholder="Option A"
                disabled={loading}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-semibold bg-[#F8FAFC] focus:bg-white disabled:opacity-75 ${
                  errors.optionA ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
                }`}
              />
              {errors.optionA && (
                <p className="text-[10px] text-red-500 font-bold">{errors.optionA}</p>
              )}
            </div>
            {/* Option B */}
            <div className="space-y-1.5">
              <span className="text-[9px] uppercase font-black text-slate-400 block">Option B *</span>
              <input
                type="text"
                value={optionB}
                onChange={(e) => setOptionB(e.target.value)}
                placeholder="Option B"
                disabled={loading}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-semibold bg-[#F8FAFC] focus:bg-white disabled:opacity-75 ${
                  errors.optionB ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
                }`}
              />
              {errors.optionB && (
                <p className="text-[10px] text-red-500 font-bold">{errors.optionB}</p>
              )}
            </div>
            {/* Option C */}
            <div className="space-y-1.5">
              <span className="text-[9px] uppercase font-black text-slate-400 block">Option C *</span>
              <input
                type="text"
                value={optionC}
                onChange={(e) => setOptionC(e.target.value)}
                placeholder="Option C"
                disabled={loading}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-semibold bg-[#F8FAFC] focus:bg-white disabled:opacity-75 ${
                  errors.optionC ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
                }`}
              />
              {errors.optionC && (
                <p className="text-[10px] text-red-500 font-bold">{errors.optionC}</p>
              )}
            </div>
            {/* Option D */}
            <div className="space-y-1.5">
              <span className="text-[9px] uppercase font-black text-slate-400 block">Option D *</span>
              <input
                type="text"
                value={optionD}
                onChange={(e) => setOptionD(e.target.value)}
                placeholder="Option D"
                disabled={loading}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-semibold bg-[#F8FAFC] focus:bg-white disabled:opacity-75 ${
                  errors.optionD ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
                }`}
              />
              {errors.optionD && (
                <p className="text-[10px] text-red-500 font-bold">{errors.optionD}</p>
              )}
            </div>
          </div>
        </div>
        {/* 3. Correct Answer Dropdown */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Correct Answer *
          </label>
          <div className="relative">
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              disabled={loading}
              className={`w-full pl-4 pr-10 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-bold text-darkGray bg-[#F8FAFC] focus:bg-white disabled:opacity-75 cursor-pointer appearance-none ${
                errors.correctAnswer ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
              }`}
            >
              <option value="">Select Correct Option</option>
              <option value="A">Option A</option>
              <option value="B">Option B</option>
              <option value="C">Option C</option>
              <option value="D">Option D</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs font-semibold">
              ▼
            </div>
          </div>
          {errors.correctAnswer && (
            <p className="text-[10px] text-red-500 font-bold">{errors.correctAnswer}</p>
          )}
        </div>
        {/* Bottom Form Actions row */}
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
                <span>Saving Changes...</span>
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

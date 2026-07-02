import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaBookOpen, FaBook, FaMagic } from 'react-icons/fa';
export default function QuickActions() {
  const navigate = useNavigate();
  const actions = [
    {
      title: 'Create Course',
      desc: 'Build a new student syllabus',
      icon: <FaPlusCircle className="w-6 h-6 text-white" />,
      path: '/teacher/courses/create',
      gradient: 'from-blue-600 to-indigo-700 hover:from-blue-750 hover:to-indigo-800',
    },
    {
      title: 'Manage Courses',
      desc: 'Edit and manage syllabus',
      icon: <FaBook className="w-6 h-6 text-white" />,
      path: '/teacher/courses',
      gradient: 'from-indigo-650 to-violet-700 hover:from-indigo-700 hover:to-violet-800',
    },
    // {
    //   title: 'Manage Lessons',
    //   desc: 'Add and edit course lessons',
    //   icon: <FaBookOpen className="w-6 h-6 text-white" />,
    //   path: '/teacher/course/${courseId}/lessons',
    //   gradient: 'from-blue-600 to-indigo-700 hover:from-blue-750 hover:to-indigo-800',
    // },
    {
      title: 'Manage Quizzes',
      desc: 'Edit and manage syllabus',
      icon: <FaBook className="w-6 h-6 text-white" />,
      path: '/teacher/quizzes',
      gradient: 'from-indigo-650 to-violet-700 hover:from-indigo-700 hover:to-violet-800',
    },
    {
      title: 'AI Quiz Generator',
      desc: 'Instantly build quizzes using AI',
      icon: <FaMagic className="w-6 h-6 text-white animate-pulse" />,
      path: '/teacher/ai-quiz',
      gradient: 'from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800',
    }
  ];
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-50 pb-2">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Quick Actions
        </h3>
        <p className="text-[10px] text-slate-455 font-bold uppercase tracking-wider">
          Publish curriculum modules instantly
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
        {actions.map((act, idx) => (
          <button
            key={idx}
            onClick={() => navigate(act.path)}
            className={`bg-gradient-to-tr ${act.gradient} p-6 rounded-3xl text-left shadow-lg shadow-indigo-500/10 text-white transition-all duration-350 hover:-translate-y-1 hover:shadow-xl active:scale-98 flex items-start justify-between group`}
          >
            <div className="space-y-1.5 pr-2">
              <h4 className="text-sm font-extrabold tracking-tight group-hover:underline">
                {act.title}
              </h4>
              <p className="text-[10px] text-white/80 font-medium leading-relaxed">
                {act.desc}
              </p>
            </div>
            
            <div className="p-3 bg-white/10 rounded-2xl flex-shrink-0 group-hover:rotate-6 transition-transform">
              {act.icon}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

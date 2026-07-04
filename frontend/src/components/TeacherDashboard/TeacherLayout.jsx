import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaBrain,
  FaHome,
  FaBook,
  FaPlusCircle,
  FaRegQuestionCircle,
  FaUserGraduate,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaBars,
  FaTimes,
} from "react-icons/fa";
export default function TeacherLayout({ children }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome className="w-4 h-4" />,
      path: "/teacher/dashboard",
    },
    {
      name: "My Courses",
      icon: <FaBook className="w-4 h-4" />,
      path: "/teacher/courses",
    },
    {
      name: "Create Course",
      icon: <FaPlusCircle className="w-4 h-4" />,
      path: "/teacher/courses/create",
    },
    {
      name: "Quiz Attempts",
      icon: <FaRegQuestionCircle className="w-4 h-4" />,
      path: "/teacher/attempts",
    },
    {
      name: "Students",
      icon: <FaUserGraduate className="w-4 h-4" />,
      path: "/teacher/students",
    },
    {
      name: "Profile",
      icon: <FaUser className="w-4 h-4" />,
      path: "/teacher/profile",
    },
    {
      name: "Settings",
      icon: <FaCog className="w-4 h-4" />,
      path: "#settings",
    },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* MOBILE HEADER (TOP) */}
      <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-primary p-1.5 rounded-lg text-white">
            <FaBrain className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-darkGray">
            STEM<span className="text-primary font-bold">Verse</span>{" "}
            <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
              Teacher
            </span>
          </span>
        </Link>

        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg text-darkGray hover:text-primary hover:bg-slate-50 transition-colors"
          aria-label="Open sidebar"
        >
          <FaBars className="w-5 h-5" />
        </button>
      </header>
      <div className="flex flex-1 relative">
        {/* SIDEBAR CONTAINER (DESKTOP) */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-150 p-6 sticky top-0 h-screen justify-between z-30">
          <div className="space-y-8">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-primary p-2 rounded-xl text-white group-hover:scale-105 transition-transform shadow-md shadow-primary/20">
                <FaBrain className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-darkGray font-sans">
                STEM<span className="text-primary">Verse</span>
                <span className="block text-[8px] uppercase font-bold text-slate-400 mt-0.5 tracking-widest text-right">
                  Teacher Console
                </span>
              </span>
            </Link>
            {/* Menu Items */}
            <nav className="space-y-1">
              {menuItems.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={idx}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-darkGray-light hover:bg-slate-50 hover:text-darkGray"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          {/* Footer Actions */}
          <div className="border-t border-slate-100 pt-4 space-y-2">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold text-red-500 hover:bg-red-50 transition-colors w-full cursor-pointer"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>
        {/* MOBILE DRAWER MODAL */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden animate-fadeIn">
            <div className="w-64 bg-white h-full p-6 flex flex-col justify-between animate-slideRight">
              <div className="space-y-8">
                {/* Drawer Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="bg-primary p-1.5 rounded-lg text-white">
                      <FaBrain className="w-4 h-4" />
                    </div>
                    <span className="text-base font-bold text-darkGray">
                      STEMVerse
                    </span>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 rounded-lg text-darkGray hover:bg-slate-100 transition-colors"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>
                {/* Drawer Menu */}
                <nav className="space-y-1">
                  {menuItems.map((item, idx) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={idx}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-darkGray-light hover:bg-slate-50 hover:text-darkGray"
                        }`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
              {/* Drawer Footer */}
              <div className="border-t border-slate-100 pt-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold text-red-500 hover:bg-red-50 transition-colors w-full "
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}
        {/* MAIN DISPLAY VIEWPORT */}
        <main className="flex-1 flex flex-col min-h-0 bg-[#F8FAFC]">
          {/* Header toolbar */}
          <header className="hidden lg:flex items-center justify-between px-8 py-5 bg-white border-b border-slate-150 sticky top-0 z-20">
            <div className="flex items-center space-x-3 text-xs text-slate-400 font-bold uppercase tracking-wider select-none">
              <span>STEMVerse LMS</span>
              <span>/</span>
              <span className="text-primary">Teacher Dashboard</span>
            </div>

            {/* Action Indicators */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-slate-50 transition-all relative">
                <FaBell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
              </button>
              <div className="h-6 w-px bg-slate-200" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm">
                  T
                </div>
              </div>
            </div>
          </header>
          {/* Child content viewport */}
          <div className="flex-grow p-6 md:p-8 overflow-y-auto max-w-[1400px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

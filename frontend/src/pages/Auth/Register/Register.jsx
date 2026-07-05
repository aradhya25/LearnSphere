import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBrain, FaEye, FaEyeSlash, FaArrowLeft, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { registerUser } from "../../../services/authApi";
import { toast } from "react-toastify";
export default function RegisterPage() {
    
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student'); // 'student' or 'teacher'
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Toggles for showing passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Validation States
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  // Loading State
  const [isLoading, setIsLoading] = useState(false);
  // Simple Password Strength Logic (UI Only)
  const getPasswordStrength = () => {
    if (!password) return { label: '', color: 'bg-slate-200', text: 'text-slate-400', width: 'w-0' };
    if (password.length < 6) return { label: 'Weak', color: 'bg-red-500', text: 'text-red-500', width: 'w-1/3' };
    if (password.length < 10) return { label: 'Medium', color: 'bg-amber-500', text: 'text-amber-600', width: 'w-2/3' };
    return { label: 'Strong', color: 'bg-[#22C55E]', text: 'text-[#22C55E]', width: 'w-full' };
  };
  const strength = getPasswordStrength();
  const validateEmail = (val) => {
    if (!val) return 'Email is required';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) return 'Please enter a valid email address';
    return '';
  };
  const handleNameChange = (e) => {
    setFullName(e.target.value);
    if (nameError) setNameError(e.target.value ? '' : 'Name is required');
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(validateEmail(e.target.value));
  };
  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (passwordError) {
      if (!val) {
        setPasswordError('Password is required');
      } else if (val.length < 6) {
        setPasswordError('Password must be at least 6 characters');
      } else {
        setPasswordError('');
      }
    }
    if (confirmPasswordError && confirmPassword && val === confirmPassword) {
      setConfirmPasswordError('');
    }
  };
  const handleConfirmPasswordChange = (e) => {
    const val = e.target.value;
    setConfirmPassword(val);
    if (confirmPasswordError) {
      if (val !== password) {
        setConfirmPasswordError('Passwords do not match');
      } else {
        setConfirmPasswordError('');
      }
    }
  };
 const handleSubmit = async (e) => {
  e.preventDefault();

  const nameErr = !fullName ? "Name is required" : "";
  const mailErr = validateEmail(email);
  const passErr =
    !password
      ? "Password is required"
      : password.length < 6
      ? "Password must be at least 6 characters"
      : "";

  const confirmErr =
    confirmPassword !== password
      ? "Passwords do not match"
      : "";

  if (nameErr || mailErr || passErr || confirmErr) {
    setNameError(nameErr);
    setEmailError(mailErr);
    setPasswordError(passErr);
    setConfirmPasswordError(confirmErr);
    return;
  }

  setNameError("");
  setEmailError("");
  setPasswordError("");
  setConfirmPasswordError("");

  try {
    setIsLoading(true);

    const response = await registerUser({
      name: fullName,
      email,
      password,
      role,
    });

    toast.success(
      response.data.message || "Registration Successful"
    );

    navigate("/login");

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Registration Failed"
    );
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#F8FAFC]">
      
      {/* LEFT COLUMN: Brand Panel (Hidden on Mobile/Tablet) */}
      <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#15803D] relative overflow-hidden flex-col justify-between p-12 text-white border-r border-white/10">
        
        {/* Network Grid Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Glow Elements */}
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-[#22C55E]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[250px] h-[250px] bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />
        {/* Back Link */}
        <div className="relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-sm font-semibold text-blue-100 hover:text-white transition-colors"
          >
            <FaArrowLeft className="w-3.5 h-3.5" />
            <span>Back to LearnSphere</span>
          </Link>
        </div>
        {/* Welcome Text */}
        <div className="relative z-10 space-y-6 my-auto max-w-md">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur px-3.5 py-1.5 rounded-2xl border border-white/10 shadow-sm">
            <FaBrain className="w-4 h-4 text-[#4ADE80]" />
            <span className="text-xs font-bold uppercase tracking-wider">AI Platform Core</span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight font-sans leading-tight">
            Start Your Learning Journey
          </h1>
          <p className="text-blue-100 leading-relaxed font-normal">
            Create your STEMVerse account and begin learning through AI-powered courses, interactive lessons, and smart quizzes.
          </p>
          {/* Premium Illustration Panel mockup */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl border border-white/15 bg-white/5 backdrop-blur-xs p-1.5 group transition-transform duration-500 hover:scale-[1.02]">
            <img 
              src="/hero_illustration.jpg" 
              alt="STEMVerse Register Illustration"
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback panel */}
            <div className="hidden absolute inset-0 flex-col items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md rounded-xl text-center space-y-4">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
              <p className="text-sm font-bold text-slate-100">LearnSphere Interactive Console</p>
              <div className="bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-left w-5/6 text-blue-200">
                <code>ai_module.load("math_calculus")</code>
                <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#22C55E] h-full w-[94%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer info */}
        <div className="relative z-10 text-xs text-blue-200/80">
          <p>© 2026 LearnSphere. All Rights Reserved.</p>
        </div>
      </div>
      {/* RIGHT COLUMN: Interactive Form Panel */}
      <div className="col-span-1 lg:col-span-7 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        
        {/* Floating Mobile Home Button */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 lg:hidden inline-flex items-center space-x-2 text-sm font-semibold text-darkGray-light hover:text-primary transition-colors"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <div className="max-w-md w-full space-y-7 bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-premium transition-all duration-300 hover:shadow-2xl relative z-10">
          
          {/* Mobile brand logo */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start space-y-2">
            <Link to="/" className="flex items-center space-x-2 group inline-block lg:hidden mb-2">
              <div className="bg-[#2563EB] p-2 rounded-xl text-white group-hover:scale-105 transition-transform shadow-md">
                <FaBrain className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-darkGray">
                Learn<span className="text-[#2563EB]">Sphere</span>
              </span>
            </Link>
            <h2 className="text-3xl font-extrabold text-darkGray tracking-tight font-sans">
              Create Account
            </h2>
            <p className="text-sm text-darkGray-light font-medium">
              Join LearnSphere and unlock your personalized learning experience.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label htmlFor="name" className="text-xs font-bold text-darkGray uppercase tracking-wider">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                disabled={isLoading}
                value={fullName}
                onChange={handleNameChange}
                placeholder="Alex Johnson"
                className={`w-full px-4 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all bg-[#F8FAFC] focus:bg-white ${
                  nameError ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-primary'
                }`}
              />
              {nameError && (
                <p className="text-[11px] font-bold text-red-500 pt-0.5">{nameError}</p>
              )}
            </div>
            {/* Email Address */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-bold text-darkGray uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                disabled={isLoading}
                value={email}
                onChange={handleEmailChange}
                placeholder="alex@domain.com"
                className={`w-full px-4 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all bg-[#F8FAFC] focus:bg-white ${
                  emailError ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-primary'
                }`}
              />
              {emailError && (
                <p className="text-[11px] font-bold text-red-500 pt-0.5">{emailError}</p>
              )}
            </div>
            {/* Role Selection Grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-darkGray uppercase tracking-wider block">
                Select Your Role
              </span>
              <div className="grid grid-cols-2 gap-4">
                {/* Student Card */}
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => setRole('student')}
                  className={`flex items-center space-x-3 p-3.5 rounded-xl border transition-all text-left ${
                    role === 'student'
                      ? 'border-[#2563EB] bg-blue-50/50 shadow-md ring-2 ring-[#2563EB]/15'
                      : 'border-slate-200 hover:border-slate-300 bg-[#F8FAFC]'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg transition-colors ${role === 'student' ? 'bg-[#2563EB] text-white' : 'bg-slate-200 text-slate-500'}`}>
                    <FaUserGraduate className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-darkGray">Student</p>
                    <p className="text-[10px] text-slate-400 font-medium">To learn STEM</p>
                  </div>
                </button>
                {/* Teacher Card */}
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => setRole('teacher')}
                  className={`flex items-center space-x-3 p-3.5 rounded-xl border transition-all text-left ${
                    role === 'teacher'
                      ? 'border-[#2563EB] bg-blue-50/50 shadow-md ring-2 ring-[#2563EB]/15'
                      : 'border-slate-200 hover:border-slate-300 bg-[#F8FAFC]'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg transition-colors ${role === 'teacher' ? 'bg-[#2563EB] text-white' : 'bg-slate-200 text-slate-500'}`}>
                    <FaChalkboardTeacher className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-darkGray">Teacher</p>
                    <p className="text-[10px] text-slate-400 font-medium">To instruct modules</p>
                  </div>
                </button>
              </div>
            </div>
            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-xs font-bold text-darkGray uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  disabled={isLoading}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className={`w-full pl-4 pr-11 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all bg-[#F8FAFC] focus:bg-white ${
                    passwordError ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-primary'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-darkGray focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-[11px] font-bold text-red-500 pt-0.5">{passwordError}</p>
              )}
              {/* Password Strength UI Bar */}
              {password && (
                <div className="pt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wide">
                    <span className="text-slate-400">Password Strength</span>
                    <span className={strength.text}>{strength.label}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                  </div>
                </div>
              )}
            </div>
            {/* Confirm Password */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="text-xs font-bold text-darkGray uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  disabled={isLoading}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="••••••••"
                  className={`w-full pl-4 pr-11 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all bg-[#F8FAFC] focus:bg-white ${
                    confirmPasswordError ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-primary'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-darkGray focus:outline-none"
                >
                  {showConfirmPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPasswordError && (
                <p className="text-[11px] font-bold text-red-500 pt-0.5">{confirmPasswordError}</p>
              )}
            </div>
            {/* Submit Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3.5 px-4 bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg shadow-[#2563EB]/20 hover:shadow-[#2563EB]/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-sm disabled:opacity-75 disabled:pointer-events-none mt-2"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>
          {/* Already have an account text link */}
          <div className="text-center pt-2">
            <p className="text-sm text-darkGray-light font-medium font-sans">
              Already have an account?{' '}
              <Link to="/login" className="font-extrabold text-[#2563EB] hover:underline transition-all">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

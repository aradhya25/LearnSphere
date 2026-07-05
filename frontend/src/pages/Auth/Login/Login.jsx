import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBrain, FaGoogle, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import { loginUser } from "../../../services/authApi";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Validation States
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  
  // Loading State
  const [isLoading, setIsLoading] = useState(false);
  // Email Validation regex
  const validateEmail = (val) => {
    if (!val) {
      return 'Email is required';
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) {
      return 'Please enter a valid email address';
    }
    return '';
  };
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (emailError) setEmailError(validateEmail(val));
  };
  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (passwordError) {
      if (!val) {
        setPasswordError('Password is required');
      } else {
        setPasswordError('');
      }
    }
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    setIsLoading(true);

    const response = await loginUser({
      email,
      password,
    });

    const { token, user } = response.data;

    login(user, token);

    toast.success("Login Successful");

    if (user.role === "teacher") {
      navigate("/teacher/dashboard");
    } else {
      navigate("/student/dashboard");
    }

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Invalid Email or Password"
    );

  } finally {

    setIsLoading(false);

  }
};
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#F8FAFC]">
      
      {/* LEFT SIDE: Brand Branding & Tech Illustration (Hidden on Mobile/Tablet) */}
      <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#15803D] relative overflow-hidden flex-col justify-between p-12 text-white border-r border-white/10">
        
        {/* Grid Net Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Glow Elements */}
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-[#22C55E]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[250px] h-[250px] bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />
        {/* Back navigation & Logo */}
        <div className="relative z-10 flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-sm font-semibold text-blue-100 hover:text-white transition-colors"
          >
            <FaArrowLeft className="w-3.5 h-3.5" />
            <span>Back to LearnSphere</span>
          </Link>
        </div>
        {/* Dynamic Welcome Message */}
        <div className="relative z-10 space-y-6 my-auto max-w-md">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/10 shadow-sm">
            <FaBrain className="w-4 h-4 text-[#4ADE80]" />
            <span className="text-xs font-bold uppercase tracking-wider">AI Workspace Ready</span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight font-sans leading-tight">
            Welcome Back
          </h1>
          <p className="text-blue-100 leading-relaxed font-normal">
            Continue your learning journey with AI-powered education. Access custom courses, track your metrics, and test concepts with intelligent systems.
          </p>
          {/* Premium Illustration Container mockup */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl border border-white/15 bg-white/5 backdrop-blur-xs p-1.5 group transition-transform duration-500 hover:scale-[1.02]">
            <img 
              src="/hero_illustration.jpg" 
              alt="STEMVerse Login Illustration"
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback interactive panel */}
            <div className="hidden absolute inset-0 flex-col items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md rounded-xl text-center space-y-4">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
              <p className="text-sm font-bold text-slate-100">LearnSphere Interactive Console</p>
              <div className="bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-left w-5/6 text-blue-200">
                <code>ai_module.load("physics_quantum")</code>
                <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#22C55E] h-full w-[88%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom copyright notice */}
        <div className="relative z-10 text-xs text-blue-200/80">
          <p>© 2026 LearnSphere. All Rights Reserved.</p>
        </div>
      </div>
      {/* RIGHT SIDE: Interactive Login Card Form */}
      <div className="col-span-1 lg:col-span-7 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        
        {/* Floating Mobile Home Button */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 lg:hidden inline-flex items-center space-x-2 text-sm font-semibold text-darkGray-light hover:text-primary transition-colors"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <div className="max-w-md w-full space-y-8 bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-premium transition-all duration-300 hover:shadow-2xl relative z-10">
          
          {/* Logo representation on Mobile/Tablet */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start space-y-3">
            <Link to="/" className="flex items-center space-x-2 group inline-block lg:hidden">
              <div className="bg-[#2563EB] p-2 rounded-xl text-white group-hover:scale-105 transition-transform shadow-md">
                <FaBrain className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-darkGray">
                Learn<span className="text-[#2563EB]">Sphere</span>
              </span>
            </Link>
            <h2 className="text-3xl font-extrabold text-darkGray tracking-tight font-sans">
              Sign In
            </h2>
            <p className="text-sm text-darkGray-light font-medium">
              Login to access your LearnSphere account.
            </p>
          </div>
          {/* Validation Banner (General Error) */}
          {generalError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-semibold animate-pulse">
              {generalError}
            </div>
          )}
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
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
                placeholder="admin@stemverse.com"
                className={`w-full px-4 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all bg-[#F8FAFC] focus:bg-white ${
                  emailError ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-primary'
                }`}
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : undefined}
              />
              {emailError && (
                <p id="email-error" className="text-[11px] font-bold text-red-500 pt-0.5">
                  {emailError}
                </p>
              )}
            </div>
            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-xs font-bold text-darkGray uppercase tracking-wider">
                  Password
                </label>
                <a 
                  href="#forgot" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset link has been dispatched in UI simulation mode.');
                  }}
                  className="text-xs font-semibold text-[#2563EB] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
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
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? "password-error" : undefined}
                />
                {/* Hide / Show password button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-darkGray focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && (
                <p id="password-error" className="text-[11px] font-bold text-red-500 pt-0.5">
                  {passwordError}
                </p>
              )}
            </div>
            {/* Remember Me Box */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  disabled={isLoading}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4.5 w-4.5 text-primary border-slate-300 rounded focus:ring-primary/20 bg-[#F8FAFC]"
                />
                <label htmlFor="remember-me" className="ml-2 text-xs font-semibold text-darkGray-light">
                  Remember me
                </label>
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3.5 px-4 bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg shadow-[#2563EB]/20 hover:shadow-[#2563EB]/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-sm disabled:opacity-75 disabled:pointer-events-none"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  {/* Tailwind Spinner */}
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-slate-100 w-full" />
            <span className="bg-white px-3 text-[10px] text-slate-400 font-extrabold uppercase tracking-wider absolute">
              OR
            </span>
          </div>
          {/* Google Sign In (Secondary) */}
          <button
            type="button"
            onClick={() => alert('Google authentication is integrated in mockup UI mode.')}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 font-bold text-sm text-darkGray transition-all duration-200"
          >
            <FaGoogle className="text-red-500 w-4 h-4" />
            <span>Continue with Google</span>
          </button>
          {/* Registration Redirect Link */}
          <div className="text-center pt-2">
            <p className="text-sm text-darkGray-light font-medium font-sans">
              Don't have an account?{' '}
              <Link to="/register" className="font-extrabold text-[#2563EB] hover:underline transition-all">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail, Lock, Eye, EyeOff, User, Sparkles, ArrowRight,
  Github, Chrome, GraduationCap, BookOpen, CheckCircle
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

function RegisterForm() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") === "teacher" ? "teacher" : "student";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"student" | "teacher">(defaultRole);
  const { signUpWithEmail, signInWithGoogle, signInWithGithub } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return;
    setLoading(true);
    try {
      await signUpWithEmail(email, password, name, role);
      router.push(role === "teacher" ? "/teacher/dashboard" : "/student/dashboard");
    } catch {
      // error handled in context
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await signInWithGoogle(role);
      router.push(role === "teacher" ? "/teacher/dashboard" : "/student/dashboard");
    } catch {
      // error handled in context
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignup = async () => {
    setLoading(true);
    try {
      await signInWithGithub(role);
      router.push(role === "teacher" ? "/teacher/dashboard" : "/student/dashboard");
    } catch {
      // error handled in context
    } finally {
      setLoading(false);
    }
  };

  const PERKS = role === "student"
    ? ["Access 850+ free courses", "Track your progress", "Earn XP & badges", "Connect with teachers"]
    : ["Create & sell courses", "Manage your students", "Analytics dashboard", "Build your brand"];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:block"
        >
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">EduNexa</span>
          </Link>

          <h2 className="text-4xl font-bold text-white mb-4">
            {role === "student" ? "Start Your Learning Journey" : "Share Your Expertise"}
          </h2>
          <p className="text-white/50 mb-8">
            {role === "student"
              ? "Join thousands of students mastering new skills every day."
              : "Reach thousands of eager learners and build your teaching career."}
          </p>

          <div className="space-y-3">
            {PERKS.map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-white/70">{perk}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {role === "student" ? "S" : "T"}
              </div>
              <div>
                <div className="text-white font-medium text-sm">
                  {role === "student" ? "Arjun Kumar" : "Dr. Priya Sharma"}
                </div>
                <div className="text-white/40 text-xs">
                  {role === "student" ? "Student, IIT Delhi" : "Professor, Computer Science"}
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm italic">
              {role === "student"
                ? '"EduNexa helped me land my dream job at Google. The structured learning paths are incredible!"'
                : '"I\'ve reached 15,000+ students worldwide. EduNexa makes teaching so rewarding!"'}
            </p>
          </div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="md:hidden text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">EduNexa</span>
            </Link>
          </div>

          <div className="glass-strong p-8">
            <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-white/50 text-sm mb-6">Join EduNexa today — it&apos;s free!</p>

            {/* Role Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-white/10 mb-6">
              <button
                onClick={() => setRole("student")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all duration-300 ${
                  role === "student"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Student
              </button>
              <button
                onClick={() => setRole("teacher")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all duration-300 ${
                  role === "teacher"
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Teacher
              </button>
            </div>

            {/* Social Signup */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={handleGoogleSignup}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-3 glass-button text-white text-sm font-medium disabled:opacity-50"
              >
                <Chrome className="w-4 h-4 text-red-400" />
                Google
              </button>
              <button
                onClick={handleGithubSignup}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-3 glass-button text-white text-sm font-medium disabled:opacity-50"
              >
                <Github className="w-4 h-4" />
                GitHub
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/30 text-xs">or with email</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="glass-input pl-11"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="glass-input pl-11"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="glass-input pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength */}
              {password && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          password.length >= i * 3
                            ? i <= 1 ? "bg-red-500" : i <= 2 ? "bg-yellow-500" : i <= 3 ? "bg-blue-500" : "bg-emerald-500"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-white/30">
                    {password.length < 6 ? "Too short" : password.length < 9 ? "Weak" : password.length < 12 ? "Good" : "Strong"}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || password.length < 6}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-white/40 text-xs mt-4">
              By signing up, you agree to our{" "}
              <a href="#" className="text-indigo-400 hover:underline">Terms</a> and{" "}
              <a href="#" className="text-indigo-400 hover:underline">Privacy Policy</a>
            </p>

            <p className="text-center text-white/40 text-sm mt-4">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <RegisterForm />
    </Suspense>
  );
}

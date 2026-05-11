"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, Users, TrendingUp, Star, ArrowRight, Zap,
  Shield, Globe, Award, ChevronRight, Play, Sparkles,
  Brain, Code, Palette, Database
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { COURSES } from "@/lib/courses-data";
import { formatNumber } from "@/lib/utils";

const STATS = [
  { label: "Active Students", value: 125000, icon: Users, color: "from-indigo-500 to-purple-500" },
  { label: "Expert Teachers", value: 3200, icon: Award, color: "from-purple-500 to-pink-500" },
  { label: "Courses Available", value: 850, icon: BookOpen, color: "from-cyan-500 to-blue-500" },
  { label: "Countries Reached", value: 95, icon: Globe, color: "from-emerald-500 to-teal-500" },
];

const FEATURES = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Our smart algorithm connects you with the perfect instructor based on your learning style and goals.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Progress",
    description: "Track your learning journey with detailed analytics, XP points, and achievement badges.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Verified Instructors",
    description: "All teachers are vetted for expertise and teaching quality to ensure the best learning experience.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Zap,
    title: "Live Sessions",
    description: "Join interactive live classes, ask questions in real-time, and collaborate with peers globally.",
    color: "from-emerald-500 to-teal-500",
  },
];

const SKILL_ICONS = [
  { icon: Code, label: "Development", color: "text-indigo-400" },
  { icon: Brain, label: "AI & ML", color: "text-purple-400" },
  { icon: Palette, label: "Design", color: "text-pink-400" },
  { icon: Database, label: "Data Science", color: "text-cyan-400" },
];

export default function HomePage() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user && userProfile) {
      router.push(userProfile.role === "teacher" ? "/teacher/dashboard" : "/student/dashboard");
    }
  }, [user, userProfile, router]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">EduNexa</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-8"
          >
            {["Courses", "Teachers", "About", "Blog"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/60 hover:text-white transition-colors text-sm font-medium"
              >
                {item}
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm text-white/80 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-sm mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen Learning Platform</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Learn Skills That</span>
              <br />
              <span className="gradient-text">Shape Your Future</span>
            </h1>

            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Connect with world-class instructors, track your progress in real-time, and master
              in-demand skills through our AI-powered learning ecosystem.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/auth/register"
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105"
              >
                Start Learning Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/auth/register?role=teacher"
                className="flex items-center gap-3 px-8 py-4 rounded-2xl glass-button text-white font-semibold text-lg"
              >
                <Play className="w-5 h-5 text-indigo-400" />
                Become a Teacher
              </Link>
            </div>

            {/* Skill pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {SKILL_ICONS.map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2 glass rounded-full">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className="text-white/70 text-sm">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {STATS.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{formatNumber(value)}+</div>
                <div className="text-white/50 text-sm">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">EduNexa?</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              A platform built for the future of education, combining technology with human expertise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, description, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 group hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">
                Featured <span className="gradient-text">Courses</span>
              </h2>
              <p className="text-white/50">Handpicked by our expert team</p>
            </div>
            <Link
              href="/auth/register"
              className="hidden md:flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.slice(0, 4).map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://api.dicebear.com/8.x/shapes/svg?seed=${course.id}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      course.level === "Beginner" ? "bg-emerald-500/80" :
                      course.level === "Intermediate" ? "bg-yellow-500/80" : "bg-red-500/80"
                    } text-white`}>
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 rounded-lg px-2 py-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-xs font-medium">{course.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-indigo-400 font-medium mb-1">{course.category}</div>
                  <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">{course.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructor}
                      className="w-5 h-5 rounded-full"
                    />
                    <span className="text-white/50 text-xs">{course.instructor}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/40">
                    <span>{course.lessons} lessons</span>
                    <span>{formatNumber(course.students)} students</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/30">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Transform Your <span className="gradient-text">Learning?</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
                Join 125,000+ learners who are already building their future with EduNexa.
                Start your journey today — it&apos;s completely free.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/auth/register"
                  className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105"
                >
                  Join as Student
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/auth/register?role=teacher"
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl glass-button text-white font-semibold"
                >
                  Join as Teacher
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold">EduNexa</span>
          </div>
          <p className="text-white/30 text-sm">© 2026 EduNexa. All rights reserved.</p>
          <div className="flex items-center gap-6 text-white/40 text-sm">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/70 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

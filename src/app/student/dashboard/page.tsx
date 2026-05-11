"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen, TrendingUp, Award, Clock, Flame, Star,
  Play, ChevronRight, Zap, Target, Trophy, Brain
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/auth-context";
import { COURSES } from "@/lib/courses-data";
import { formatNumber, getLevelFromXP, getProgressPercent } from "@/lib/utils";
import Link from "next/link";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const ACTIVITY_DATA = [
  { day: "Mon", hours: 2.5, xp: 120 },
  { day: "Tue", hours: 1.8, xp: 90 },
  { day: "Wed", hours: 3.2, xp: 160 },
  { day: "Thu", hours: 2.0, xp: 100 },
  { day: "Fri", hours: 4.1, xp: 200 },
  { day: "Sat", hours: 3.5, xp: 175 },
  { day: "Sun", hours: 1.5, xp: 75 },
];

const ACHIEVEMENTS = [
  { icon: "🔥", label: "7-Day Streak", earned: true },
  { icon: "⚡", label: "Speed Learner", earned: true },
  { icon: "🏆", label: "Top Student", earned: false },
  { icon: "🎯", label: "Goal Crusher", earned: true },
  { icon: "💎", label: "Diamond Rank", earned: false },
  { icon: "🌟", label: "Star Performer", earned: false },
];

export default function StudentDashboard() {
  const { userProfile } = useAuth();
  const [enrolledCourses] = useState(COURSES.slice(0, 3));
  const [xp] = useState(userProfile?.xp || 1250);
  const level = getLevelFromXP(xp);
  const progress = getProgressPercent(xp);

  return (
    <DashboardLayout requiredRole="student">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Welcome back, <span className="gradient-text">{userProfile?.displayName?.split(" ")[0] || "Learner"}</span> 👋
            </h1>
            <p className="text-white/50">Continue your learning journey. You&apos;re doing great!</p>
          </div>
          <div className="hidden md:flex items-center gap-3 glass-card px-5 py-3">
            <Flame className="w-5 h-5 text-orange-400" />
            <div>
              <div className="text-white font-bold">{userProfile?.streak || 7} days</div>
              <div className="text-white/40 text-xs">Current streak</div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Courses Enrolled", value: enrolledCourses.length, icon: BookOpen, color: "from-indigo-500 to-purple-500", suffix: "" },
            { label: "Hours Learned", value: 47, icon: Clock, color: "from-purple-500 to-pink-500", suffix: "h" },
            { label: "XP Points", value: xp, icon: Zap, color: "from-cyan-500 to-blue-500", suffix: "" },
            { label: "Certificates", value: 2, icon: Award, color: "from-emerald-500 to-teal-500", suffix: "" },
          ].map(({ label, value, icon: Icon, color, suffix }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5 group hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{formatNumber(value)}{suffix}</div>
              <div className="text-white/50 text-sm mt-1">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Level {level} Learner</h3>
                <p className="text-white/40 text-sm">{xp} / {level * 500} XP to Level {level + 1}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold gradient-text">{progress}%</div>
              <div className="text-white/40 text-xs">Progress</div>
            </div>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full progress-bar"
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/30">
            <span>Level {level}</span>
            <span>Level {level + 1}</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-lg">Weekly Activity</h3>
              <div className="flex items-center gap-2 text-indigo-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+23% this week</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={ACTIVITY_DATA}>
                <defs>
                  <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
                <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15,15,40,0.95)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    borderRadius: "12px",
                    color: "white",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="xp"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#xpGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">Achievements</h3>
              <Link href="/student/achievements" className="text-indigo-400 text-sm hover:text-indigo-300">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {ACHIEVEMENTS.map(({ icon, label, earned }) => (
                <div
                  key={label}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                    earned ? "glass border border-yellow-500/30" : "opacity-30 glass"
                  }`}
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="text-white/60 text-xs text-center leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Continue Learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-xl">Continue Learning</h3>
            <Link href="/student/courses" className="flex items-center gap-1 text-indigo-400 text-sm hover:text-indigo-300">
              All courses <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {enrolledCourses.map((course, i) => {
              const courseProgress = [65, 32, 10][i];
              return (
                <div key={course.id} className="glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/8.x/shapes/svg?seed=${course.id}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full progress-bar"
                          style={{ width: `${courseProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-white/60 text-xs">{courseProgress}% complete</span>
                        <span className="text-white/60 text-xs">{course.lessons} lessons</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-medium text-sm mb-1 line-clamp-1">{course.title}</h4>
                    <p className="text-white/40 text-xs mb-3">{course.instructor}</p>
                    <Link
                      href={`/student/courses/${course.id}`}
                      className="flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-sm font-medium transition-colors"
                    >
                      <Play className="w-3 h-3" />
                      Continue
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recommended Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <h3 className="text-white font-semibold text-xl">Recommended for You</h3>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {COURSES.slice(4, 8).map((course) => (
              <div key={course.id} className="glass-card p-4 group hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-3">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://api.dicebear.com/8.x/shapes/svg?seed=${course.id}`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-indigo-400 mb-1">{course.category}</div>
                    <h4 className="text-white text-sm font-medium line-clamp-2 mb-1">{course.title}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-white/50 text-xs">{course.rating}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/student/courses/${course.id}`}
                  className="mt-3 flex items-center justify-center gap-1 py-2 rounded-lg glass-button text-white/70 text-xs font-medium"
                >
                  <Target className="w-3 h-3" />
                  Enroll Free
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

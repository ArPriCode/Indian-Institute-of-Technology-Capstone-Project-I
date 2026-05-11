"use client";

import { motion } from "framer-motion";
import {
  TrendingUp, Clock, BookOpen, Award, Zap, Target,
  Calendar, CheckCircle, Flame
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/auth-context";
import { getLevelFromXP, getProgressPercent } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, BarChart, Bar
} from "recharts";

const WEEKLY_DATA = [
  { day: "Mon", hours: 2.5, xp: 120, lessons: 4 },
  { day: "Tue", hours: 1.8, xp: 90, lessons: 3 },
  { day: "Wed", hours: 3.2, xp: 160, lessons: 6 },
  { day: "Thu", hours: 2.0, xp: 100, lessons: 4 },
  { day: "Fri", hours: 4.1, xp: 200, lessons: 8 },
  { day: "Sat", hours: 3.5, xp: 175, lessons: 7 },
  { day: "Sun", hours: 1.5, xp: 75, lessons: 3 },
];

const MONTHLY_DATA = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  xp: Math.floor(Math.random() * 200) + 50,
  hours: Math.random() * 4 + 0.5,
}));

const SKILL_DATA = [
  { skill: "React", value: 85 },
  { skill: "Python", value: 70 },
  { skill: "Design", value: 60 },
  { skill: "ML/AI", value: 45 },
  { skill: "DevOps", value: 55 },
  { skill: "Security", value: 40 },
];

const COURSE_PROGRESS = [
  { name: "React & Next.js", progress: 65, color: "from-indigo-500 to-purple-500" },
  { name: "Python for DS", progress: 32, color: "from-purple-500 to-pink-500" },
  { name: "Web3 & Blockchain", progress: 10, color: "from-cyan-500 to-blue-500" },
];

export default function StudentProgressPage() {
  const { userProfile } = useAuth();
  const xp = userProfile?.xp || 1250;
  const level = getLevelFromXP(xp);
  const progress = getProgressPercent(xp);

  return (
    <DashboardLayout requiredRole="student">
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-1">
            Learning <span className="gradient-text">Progress</span>
          </h1>
          <p className="text-white/50">Track your growth and achievements</p>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total XP", value: xp.toLocaleString(), icon: Zap, color: "from-yellow-500 to-orange-500" },
            { label: "Current Level", value: `Level ${level}`, icon: Target, color: "from-indigo-500 to-purple-500" },
            { label: "Hours Learned", value: "47h", icon: Clock, color: "from-cyan-500 to-blue-500" },
            { label: "Day Streak", value: `${userProfile?.streak || 7}🔥`, icon: Flame, color: "from-red-500 to-orange-500" },
          ].map(({ label, value, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-white/50 text-sm">{label}</div>
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
            <h3 className="text-white font-semibold text-lg">Level Progress</h3>
            <span className="text-indigo-400 font-bold">{progress}%</span>
          </div>
          <div className="h-4 bg-white/10 rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full progress-bar"
            />
          </div>
          <div className="flex justify-between text-sm text-white/40">
            <span>Level {level} — {xp} XP</span>
            <span>Level {level + 1} — {level * 500} XP</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly XP Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Weekly XP Earned</h3>
              <div className="flex items-center gap-1 text-emerald-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+23%</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={WEEKLY_DATA}>
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
                <Bar dataKey="xp" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Skill Radar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="text-white font-semibold mb-4">Skill Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={SKILL_DATA}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Monthly Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="text-white font-semibold mb-4">Monthly Activity (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={MONTHLY_DATA}>
              <defs>
                <linearGradient id="monthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 10 }} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  background: "rgba(15,15,40,0.95)",
                  border: "1px solid rgba(139,92,246,0.3)",
                  borderRadius: "12px",
                  color: "white",
                }}
              />
              <Area type="monotone" dataKey="xp" stroke="#8b5cf6" strokeWidth={2} fill="url(#monthGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Course Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h3 className="text-white font-semibold text-lg">Course Progress</h3>
          </div>
          <div className="space-y-5">
            {COURSE_PROGRESS.map(({ name, progress: p, color }) => (
              <div key={name}>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium text-sm">{name}</span>
                  <span className="text-white/50 text-sm">{p}%</span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${p}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Calendar Heatmap (simplified) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <h3 className="text-white font-semibold">Activity Calendar</h3>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 35 }, (_, i) => {
              const intensity = Math.random();
              return (
                <div
                  key={i}
                  title={`${Math.floor(intensity * 200)} XP`}
                  className={`h-8 rounded-md transition-all hover:scale-110 cursor-pointer ${
                    intensity > 0.8 ? "bg-indigo-500" :
                    intensity > 0.6 ? "bg-indigo-500/70" :
                    intensity > 0.4 ? "bg-indigo-500/40" :
                    intensity > 0.2 ? "bg-indigo-500/20" :
                    "bg-white/5"
                  }`}
                />
              );
            })}
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-white/30">
            <span>Less</span>
            {["bg-white/5", "bg-indigo-500/20", "bg-indigo-500/40", "bg-indigo-500/70", "bg-indigo-500"].map((c) => (
              <div key={c} className={`w-4 h-4 rounded ${c}`} />
            ))}
            <span>More</span>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

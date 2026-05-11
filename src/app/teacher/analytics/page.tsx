"use client";

import { motion } from "framer-motion";
import {
  TrendingUp, Users, Eye, Star, Clock, BookOpen,
  ArrowUp, ArrowDown
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { COURSES } from "@/lib/courses-data";
import { formatNumber } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

const MONTHLY_DATA = [
  { month: "Jan", students: 120, views: 450, completions: 45 },
  { month: "Feb", students: 180, views: 620, completions: 72 },
  { month: "Mar", students: 240, views: 890, completions: 98 },
  { month: "Apr", students: 310, views: 1100, completions: 124 },
  { month: "May", students: 280, views: 980, completions: 112 },
  { month: "Jun", students: 420, views: 1450, completions: 168 },
];

const COURSE_PERFORMANCE = [
  { name: "React & Next.js", students: 420, rating: 4.9, completion: 68 },
  { name: "Python for DS", students: 310, rating: 4.8, completion: 72 },
  { name: "Web3 Dev", students: 180, rating: 4.7, completion: 55 },
];

const CATEGORY_DATA = [
  { name: "Web Dev", value: 45, color: "#6366f1" },
  { name: "Data Science", value: 30, color: "#8b5cf6" },
  { name: "Blockchain", value: 15, color: "#ec4899" },
  { name: "Other", value: 10, color: "#06b6d4" },
];

export default function TeacherAnalyticsPage() {
  return (
    <DashboardLayout requiredRole="teacher">
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-1">
            Course <span className="gradient-text">Analytics</span>
          </h1>
          <p className="text-white/50">Track your teaching performance and student engagement</p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Students", value: 1284, change: "+12%", up: true, icon: Users, color: "from-indigo-500 to-purple-500" },
            { label: "Total Views", value: 28450, change: "+8%", up: true, icon: Eye, color: "from-purple-500 to-pink-500" },
            { label: "Avg. Rating", value: "4.8★", change: "+0.2", up: true, icon: Star, color: "from-yellow-500 to-orange-500" },
            { label: "Completion Rate", value: "68%", change: "-3%", up: false, icon: BookOpen, color: "from-cyan-500 to-blue-500" },
          ].map(({ label, value, change, up, icon: Icon, color }, i) => (
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
              <div className="text-2xl font-bold text-white">{typeof value === "number" ? formatNumber(value) : value}</div>
              <div className="text-white/50 text-sm mt-1">{label}</div>
              <div className={`flex items-center gap-1 text-xs mt-1 ${up ? "text-emerald-400" : "text-red-400"}`}>
                {up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {change} this month
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Enrollment Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <h3 className="text-white font-semibold text-lg mb-4">Enrollment & Views Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={MONTHLY_DATA}>
                <defs>
                  <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="viewGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
                <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "rgba(15,15,40,0.95)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "12px", color: "white" }} />
                <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={2} fill="url(#enrollGrad)" name="Students" />
                <Area type="monotone" dataKey="completions" stroke="#10b981" strokeWidth={2} fill="none" name="Completions" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="text-white font-semibold text-lg mb-4">Student Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  formatter={(value) => <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Course Performance Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <h3 className="text-white font-semibold text-lg mb-4">Course Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/40 text-sm font-medium pb-3">Course</th>
                  <th className="text-left text-white/40 text-sm font-medium pb-3">Students</th>
                  <th className="text-left text-white/40 text-sm font-medium pb-3">Rating</th>
                  <th className="text-left text-white/40 text-sm font-medium pb-3">Completion</th>
                  <th className="text-left text-white/40 text-sm font-medium pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {COURSE_PERFORMANCE.map(({ name, students, rating, completion }) => (
                  <tr key={name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 text-white font-medium text-sm">{name}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-indigo-400" />
                        <span className="text-white/70 text-sm">{students}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white/70 text-sm">{rating}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full progress-bar"
                            style={{ width: `${completion}%` }}
                          />
                        </div>
                        <span className="text-white/50 text-xs">{completion}%</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Monthly Completions Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="text-white font-semibold text-lg mb-4">Monthly Completions</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MONTHLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "rgba(15,15,40,0.95)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "12px", color: "white" }} />
              <Bar dataKey="completions" fill="#10b981" radius={[4, 4, 0, 0]} name="Completions" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

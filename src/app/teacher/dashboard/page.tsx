"use client";

import { motion } from "framer-motion";
import {
  Users, BookOpen, TrendingUp, DollarSign, Star,
  Eye, Play, ChevronRight, PlusCircle, Award, BarChart3
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/auth-context";
import { COURSES } from "@/lib/courses-data";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from "recharts";

const REVENUE_DATA = [
  { month: "Jan", students: 120, views: 450 },
  { month: "Feb", students: 180, views: 620 },
  { month: "Mar", students: 240, views: 890 },
  { month: "Apr", students: 310, views: 1100 },
  { month: "May", students: 280, views: 980 },
  { month: "Jun", students: 420, views: 1450 },
];

const RECENT_STUDENTS = [
  { name: "Arjun Kumar", course: "React & Next.js", progress: 65, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=arjun" },
  { name: "Priya Singh", course: "React & Next.js", progress: 32, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=priya2" },
  { name: "Rahul Sharma", course: "Python for DS", progress: 88, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=rahul" },
  { name: "Anita Patel", course: "Python for DS", progress: 45, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=anita" },
  { name: "Vikram Nair", course: "Web3 Dev", progress: 20, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=vikram" },
];

export default function TeacherDashboard() {
  const { userProfile } = useAuth();
  const myCourses = COURSES.slice(0, 3);

  return (
    <DashboardLayout requiredRole="teacher">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Teacher Dashboard, <span className="gradient-text">{userProfile?.displayName?.split(" ")[0] || "Educator"}</span> 👨‍🏫
            </h1>
            <p className="text-white/50">Manage your courses and track student progress</p>
          </div>
          <Link
            href="/teacher/create-course"
            className="hidden md:flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            New Course
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Students", value: 1284, icon: Users, color: "from-indigo-500 to-purple-500", change: "+12%" },
            { label: "Active Courses", value: myCourses.length, icon: BookOpen, color: "from-purple-500 to-pink-500", change: "+1" },
            { label: "Avg. Rating", value: "4.8", icon: Star, color: "from-yellow-500 to-orange-500", change: "+0.2" },
            { label: "Total Views", value: 28450, icon: Eye, color: "from-cyan-500 to-blue-500", change: "+8%" },
          ].map(({ label, value, icon: Icon, color, change }, i) => (
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
              <div className="text-2xl font-bold text-white">{typeof value === "number" ? formatNumber(value) : value}</div>
              <div className="text-white/50 text-sm mt-1">{label}</div>
              <div className="text-emerald-400 text-xs mt-1">{change} this month</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Student Growth Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-lg">Student Enrollment</h3>
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+35% this month</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="studentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="viewGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
                <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15,15,40,0.95)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    borderRadius: "12px",
                    color: "white",
                  }}
                />
                <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={2} fill="url(#studentGradient)" name="Students" />
                <Area type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={2} fill="url(#viewGradient)" name="Views" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="text-white font-semibold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { label: "Create New Course", href: "/teacher/create-course", icon: PlusCircle, color: "text-indigo-400" },
                { label: "View Analytics", href: "/teacher/analytics", icon: BarChart3, color: "text-purple-400" },
                { label: "Manage Students", href: "/teacher/students", icon: Users, color: "text-cyan-400" },
                { label: "Update Profile", href: "/teacher/profile", icon: Award, color: "text-emerald-400" },
              ].map(({ label, href, icon: Icon, color }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 p-3 rounded-xl glass-button group"
                >
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span className="text-white/70 group-hover:text-white text-sm transition-colors">{label}</span>
                  <ChevronRight className="w-4 h-4 text-white/30 ml-auto group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* My Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-xl">My Courses</h3>
            <Link href="/teacher/courses" className="flex items-center gap-1 text-indigo-400 text-sm hover:text-indigo-300">
              Manage all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {myCourses.map((course, i) => (
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
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                    <span className="text-white text-xs font-medium">{[420, 310, 180][i]} students</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-xs">{course.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-white font-medium text-sm mb-1 line-clamp-1">{course.title}</h4>
                  <p className="text-white/40 text-xs mb-3">{course.lessons} lessons · {course.duration}</p>
                  <div className="flex gap-2">
                    <Link
                      href={`/teacher/courses/${course.id}/edit`}
                      className="flex-1 py-2 rounded-lg glass-button text-white/70 text-xs font-medium text-center"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/teacher/analytics`}
                      className="flex-1 py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-xs font-medium text-center transition-colors"
                    >
                      Analytics
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Students */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-lg">Recent Students</h3>
            <Link href="/teacher/students" className="text-indigo-400 text-sm hover:text-indigo-300">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {RECENT_STUDENTS.map(({ name, course, progress, avatar }) => (
              <div key={name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <img src={avatar} alt={name} className="w-10 h-10 rounded-full border border-white/10" />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm">{name}</div>
                  <div className="text-white/40 text-xs">{course}</div>
                </div>
                <div className="w-24">
                  <div className="flex justify-between mb-1">
                    <span className="text-white/40 text-xs">{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full progress-bar"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

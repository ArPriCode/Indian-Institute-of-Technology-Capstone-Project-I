"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, TrendingUp, MessageSquare, Filter } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const STUDENTS = [
  { id: 1, name: "Arjun Kumar", email: "arjun@example.com", course: "React & Next.js", progress: 65, joined: "Apr 15", avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=arjun", status: "active" },
  { id: 2, name: "Priya Singh", email: "priya@example.com", course: "React & Next.js", progress: 32, joined: "Apr 20", avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=priya2", status: "active" },
  { id: 3, name: "Rahul Sharma", email: "rahul@example.com", course: "Python for DS", progress: 88, joined: "Mar 10", avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=rahul", status: "active" },
  { id: 4, name: "Anita Patel", email: "anita@example.com", course: "Python for DS", progress: 45, joined: "Apr 5", avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=anita", status: "inactive" },
  { id: 5, name: "Vikram Nair", email: "vikram@example.com", course: "Web3 Dev", progress: 20, joined: "May 1", avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=vikram", status: "active" },
  { id: 6, name: "Sneha Reddy", email: "sneha@example.com", course: "React & Next.js", progress: 78, joined: "Mar 25", avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=sneha", status: "active" },
  { id: 7, name: "Karan Mehta", email: "karan@example.com", course: "Web3 Dev", progress: 55, joined: "Apr 12", avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=karan", status: "active" },
  { id: 8, name: "Divya Joshi", email: "divya@example.com", course: "Python for DS", progress: 92, joined: "Feb 28", avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=divya", status: "active" },
];

export default function TeacherStudentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = STUDENTS.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || s.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <DashboardLayout requiredRole="teacher">
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-1">
            My <span className="gradient-text">Students</span>
          </h1>
          <p className="text-white/50">{STUDENTS.length} students enrolled in your courses</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Students", value: STUDENTS.length, icon: Users, color: "from-indigo-500 to-purple-500" },
            { label: "Active This Week", value: STUDENTS.filter((s) => s.status === "active").length, icon: TrendingUp, color: "from-emerald-500 to-teal-500" },
            { label: "Avg. Progress", value: `${Math.round(STUDENTS.reduce((a, s) => a + s.progress, 0) / STUDENTS.length)}%`, icon: TrendingUp, color: "from-purple-500 to-pink-500" },
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

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="glass-input pl-11"
            />
          </div>
          <div className="flex gap-2">
            {["all", "active", "inactive"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                  filter === f ? "bg-indigo-500 text-white" : "glass-button text-white/60"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Students Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/40 text-sm font-medium p-4">Student</th>
                  <th className="text-left text-white/40 text-sm font-medium p-4">Course</th>
                  <th className="text-left text-white/40 text-sm font-medium p-4">Progress</th>
                  <th className="text-left text-white/40 text-sm font-medium p-4">Joined</th>
                  <th className="text-left text-white/40 text-sm font-medium p-4">Status</th>
                  <th className="text-left text-white/40 text-sm font-medium p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(({ id, name, email, course, progress, joined, avatar, status }) => (
                  <tr key={id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={avatar} alt={name} className="w-9 h-9 rounded-full border border-white/10" />
                        <div>
                          <div className="text-white font-medium text-sm">{name}</div>
                          <div className="text-white/40 text-xs">{email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-white/70 text-sm">{course}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full progress-bar" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-white/50 text-xs">{progress}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-white/50 text-sm">{joined}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        status === "active"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg glass-button text-white/60 text-xs hover:text-white transition-colors">
                        <MessageSquare className="w-3 h-3" />
                        Message
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-white/40">No students found</p>
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

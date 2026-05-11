"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Plus, Edit, Trash2, Eye, Star, Users, BarChart3 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { COURSES } from "@/lib/courses-data";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import toast from "react-hot-toast";

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState(COURSES.slice(0, 4));

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Delete "${title}"?`)) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
      toast.success("Course deleted");
    }
  };

  return (
    <DashboardLayout requiredRole="teacher">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              My <span className="gradient-text">Courses</span>
            </h1>
            <p className="text-white/50">{courses.length} courses published</p>
          </div>
          <Link
            href="/teacher/create-course"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            New Course
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card overflow-hidden group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/8.x/shapes/svg?seed=${course.id}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className="px-2 py-1 rounded-lg text-xs font-medium bg-emerald-500/80 text-white">
                    Published
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-white font-semibold mb-2 line-clamp-1">{course.title}</h3>
                <p className="text-white/50 text-sm mb-4 line-clamp-2">{course.description}</p>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center glass rounded-xl p-2">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="w-3 h-3 text-indigo-400" />
                    </div>
                    <div className="text-white font-bold text-sm">{formatNumber(course.students)}</div>
                    <div className="text-white/40 text-xs">Students</div>
                  </div>
                  <div className="text-center glass rounded-xl p-2">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                    </div>
                    <div className="text-white font-bold text-sm">{course.rating}</div>
                    <div className="text-white/40 text-xs">Rating</div>
                  </div>
                  <div className="text-center glass rounded-xl p-2">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <BookOpen className="w-3 h-3 text-purple-400" />
                    </div>
                    <div className="text-white font-bold text-sm">{course.lessons}</div>
                    <div className="text-white/40 text-xs">Lessons</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/teacher/courses/${course.id}/edit`}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg glass-button text-white/70 text-sm hover:text-white transition-colors"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Link>
                  <Link
                    href="/teacher/analytics"
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-sm transition-colors"
                  >
                    <BarChart3 className="w-3 h-3" />
                    Analytics
                  </Link>
                  <button
                    onClick={() => handleDelete(course.id, course.title)}
                    className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-white/50 text-lg font-medium mb-2">No courses yet</h3>
            <Link
              href="/teacher/create-course"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium"
            >
              <Plus className="w-4 h-4" />
              Create Your First Course
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Star, Users, Clock, BookOpen, Play } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { COURSES, CATEGORIES } from "@/lib/courses-data";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import toast from "react-hot-toast";

export default function StudentCoursesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [enrolled, setEnrolled] = useState<string[]>(["c1", "c2", "c3"]);

  const filtered = COURSES.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = selectedCategory === "All" || c.category === selectedCategory;
    const matchLevel = selectedLevel === "All" || c.level === selectedLevel;
    return matchSearch && matchCat && matchLevel;
  });

  const handleEnroll = (courseId: string, title: string) => {
    if (enrolled.includes(courseId)) {
      toast("Already enrolled!", { icon: "📚" });
      return;
    }
    setEnrolled((prev) => [...prev, courseId]);
    toast.success(`Enrolled in "${title}"!`);
  };

  return (
    <DashboardLayout requiredRole="student">
      <div className="space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-1">
            Explore <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-white/50">{COURSES.length} courses available — all free</p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search courses, instructors, skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="glass-input pl-11"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Filter className="w-4 h-4" />
              <span>Level:</span>
            </div>
            {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedLevel === level
                    ? "bg-indigo-500 text-white"
                    : "glass-button text-white/60"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-purple-500 text-white"
                    : "glass-button text-white/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <div className="text-white/40 text-sm">
          Showing {filtered.length} course{filtered.length !== 1 ? "s" : ""}
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((course, i) => {
            const isEnrolled = enrolled.includes(course.id);
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://api.dicebear.com/8.x/shapes/svg?seed=${course.id}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      course.level === "Beginner" ? "bg-emerald-500/80" :
                      course.level === "Intermediate" ? "bg-yellow-500/80" : "bg-red-500/80"
                    } text-white`}>
                      {course.level}
                    </span>
                    {isEnrolled && (
                      <span className="px-2 py-1 rounded-lg text-xs font-medium bg-indigo-500/80 text-white">
                        Enrolled
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 rounded-lg px-2 py-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-xs font-medium">{course.rating}</span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-xs text-indigo-400 font-medium mb-1">{course.category}</div>
                  <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">{course.title}</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructor}
                      className="w-5 h-5 rounded-full"
                    />
                    <span className="text-white/50 text-xs">{course.instructor}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-white/40 mb-4">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{formatNumber(course.students)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {isEnrolled ? (
                      <Link
                        href={`/student/courses/${course.id}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-sm font-medium transition-colors"
                      >
                        <Play className="w-3 h-3" />
                        Continue
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleEnroll(course.id, course.title)}
                        className="flex-1 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                      >
                        Enroll Free
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-white/50 text-lg font-medium">No courses found</h3>
            <p className="text-white/30 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

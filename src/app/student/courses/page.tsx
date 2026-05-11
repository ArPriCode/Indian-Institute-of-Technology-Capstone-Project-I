"use client";

import { useState } from "react";
import { Search, Filter, Star, Users, Clock, BookOpen, Play, ChevronDown } from "lucide-react";
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
  const [showFilters, setShowFilters] = useState(false);

  const filtered = COURSES.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
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
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Explore <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-white/50">{COURSES.length} courses available — all free</p>
        </div>

        {/* Search & Filters */}
        <div style={{ background: "rgba(20,20,20,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "16px" }}>
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search courses, instructors, skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="glass-input pl-11"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-white/50 text-sm mb-3 hover:text-white transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>

          {showFilters && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="text-white/40 text-xs self-center">Level:</span>
                {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedLevel === level
                        ? "bg-indigo-500 text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                    style={selectedLevel !== level ? { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" } : {}}
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
                        : "text-white/60 hover:text-white"
                    }`}
                    style={selectedCategory !== cat ? { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="text-white/40 text-sm">Showing {filtered.length} course{filtered.length !== 1 ? "s" : ""}</p>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((course) => {
            const isEnrolled = enrolled.includes(course.id);
            return (
              <div
                key={course.id}
                style={{
                  background: "rgba(18,18,18,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(99,102,241,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Thumbnail */}
                <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://api.dicebear.com/8.x/shapes/svg?seed=${course.id}`;
                    }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }} />
                  <div style={{ position: "absolute", top: "10px", left: "10px" }}>
                    <span style={{
                      padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 600, color: "white",
                      background: course.level === "Beginner" ? "rgba(16,185,129,0.8)" : course.level === "Intermediate" ? "rgba(245,158,11,0.8)" : "rgba(239,68,68,0.8)"
                    }}>
                      {course.level}
                    </span>
                  </div>
                  {isEnrolled && (
                    <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                      <span style={{ padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 600, color: "white", background: "rgba(99,102,241,0.8)" }}>
                        Enrolled
                      </span>
                    </div>
                  )}
                  <div style={{ position: "absolute", bottom: "10px", right: "10px", display: "flex", alignItems: "center", gap: "4px", background: "rgba(0,0,0,0.6)", borderRadius: "6px", padding: "3px 7px" }}>
                    <Star style={{ width: "12px", height: "12px", color: "#fbbf24", fill: "#fbbf24" }} />
                    <span style={{ color: "white", fontSize: "12px", fontWeight: 600 }}>{course.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "16px" }}>
                  <div style={{ color: "#818cf8", fontSize: "11px", fontWeight: 600, marginBottom: "6px" }}>{course.category}</div>
                  <h3 style={{ color: "white", fontWeight: 600, fontSize: "14px", marginBottom: "8px", lineHeight: "1.4", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "40px" }}>
                    {course.title}
                  </h3>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <img src={course.instructorAvatar} alt={course.instructor} style={{ width: "20px", height: "20px", borderRadius: "50%" }} />
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>{course.instructor}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>
                      <BookOpen style={{ width: "12px", height: "12px" }} />
                      {course.lessons} lessons
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>
                      <Clock style={{ width: "12px", height: "12px" }} />
                      {course.duration}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>
                      <Users style={{ width: "12px", height: "12px" }} />
                      {formatNumber(course.students)}
                    </div>
                  </div>

                  {isEnrolled ? (
                    <Link href={`/student/courses/${course.id}`} style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                      padding: "8px", borderRadius: "10px", background: "rgba(99,102,241,0.2)",
                      color: "#a5b4fc", fontSize: "13px", fontWeight: 600, textDecoration: "none",
                      border: "1px solid rgba(99,102,241,0.3)"
                    }}>
                      <Play style={{ width: "12px", height: "12px" }} />
                      Continue
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course.id, course.title)}
                      style={{
                        width: "100%", padding: "8px", borderRadius: "10px",
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        color: "white", fontSize: "13px", fontWeight: 600,
                        border: "none", cursor: "pointer"
                      }}
                    >
                      Enroll Free
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <BookOpen style={{ width: "48px", height: "48px", color: "rgba(255,255,255,0.2)", margin: "0 auto 12px" }} />
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px" }}>No courses found</p>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px", marginTop: "4px" }}>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

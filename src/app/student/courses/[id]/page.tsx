"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import {
  Play, CheckCircle, Clock, Users, Star, BookOpen,
  ChevronDown, ChevronUp, Award, ArrowLeft, Lock
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { COURSES } from "@/lib/courses-data";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CourseDetailPage() {
  const { id } = useParams();
  const course = COURSES.find((c) => c.id === id);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([0, 1]);
  const [isEnrolled, setIsEnrolled] = useState(true);

  if (!course) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-white text-2xl font-bold mb-4">Course not found</h2>
          <Link href="/student/courses" className="text-indigo-400 hover:underline">
            Back to courses
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const totalLessons = course.curriculum.reduce((acc) => acc + 5, 0);
  const progressPercent = Math.round((completedLessons.length / totalLessons) * 100);

  const toggleLesson = (index: number) => {
    if (completedLessons.includes(index)) {
      setCompletedLessons((prev) => prev.filter((i) => i !== index));
    } else {
      setCompletedLessons((prev) => [...prev, index]);
      toast.success("Lesson marked as complete! +50 XP");
    }
  };

  return (
    <DashboardLayout requiredRole="student">
      <div className="space-y-6">
        {/* Back */}
        <Link
          href="/student/courses"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card overflow-hidden"
            >
              <div className="relative aspect-video bg-black">
                {course.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${course.youtubeId}?rel=0`}
                    title={course.title}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900">
                    <Play className="w-16 h-16 text-white/50" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="text-xs text-indigo-400 font-medium mb-2">{course.category}</div>
                <h1 className="text-2xl font-bold text-white mb-3">{course.title}</h1>
                <p className="text-white/60 leading-relaxed">{course.description}</p>

                <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-medium">{course.rating}</span>
                    <span className="text-white/40 text-sm">({formatNumber(course.students)} students)</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/50 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/50 text-sm">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {course.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full glass text-white/60 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Curriculum */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <h2 className="text-white font-bold text-xl mb-4">Course Curriculum</h2>
              <div className="space-y-3">
                {course.curriculum.map((section, sIdx) => (
                  <div key={sIdx} className="glass rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedSection(expandedSection === sIdx ? null : sIdx)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                          completedLessons.includes(sIdx) ? "bg-emerald-500/20 text-emerald-400" : "bg-indigo-500/20 text-indigo-400"
                        }`}>
                          {completedLessons.includes(sIdx) ? <CheckCircle className="w-4 h-4" /> : sIdx + 1}
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">{section.title}</div>
                          <div className="text-white/40 text-xs">{section.duration}</div>
                        </div>
                      </div>
                      {expandedSection === sIdx ? (
                        <ChevronUp className="w-4 h-4 text-white/40" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-white/40" />
                      )}
                    </button>

                    {expandedSection === sIdx && (
                      <div className="border-t border-white/10 p-4 space-y-2">
                        {[1, 2, 3, 4, 5].map((lesson) => {
                          const lessonIdx = sIdx * 5 + lesson - 1;
                          const isCompleted = completedLessons.includes(lessonIdx);
                          const isLocked = !isEnrolled && lessonIdx > 1;
                          return (
                            <div
                              key={lesson}
                              onClick={() => !isLocked && toggleLesson(lessonIdx)}
                              className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                                isLocked ? "opacity-40 cursor-not-allowed" :
                                isCompleted ? "bg-emerald-500/10 border border-emerald-500/20" :
                                "hover:bg-white/5"
                              }`}
                            >
                              {isLocked ? (
                                <Lock className="w-4 h-4 text-white/30" />
                              ) : isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Play className="w-4 h-4 text-indigo-400" />
                              )}
                              <span className="text-white/70 text-sm flex-1">
                                Lesson {lesson}: {section.title} — Part {lesson}
                              </span>
                              <span className="text-white/30 text-xs">8:30</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6"
            >
              <h3 className="text-white font-semibold mb-4">Your Progress</h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold gradient-text">{progressPercent}%</div>
                <div className="text-white/40 text-sm">Complete</div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full progress-bar transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-white/50 text-sm text-center">
                {completedLessons.length} / {totalLessons} lessons completed
              </div>

              {progressPercent === 100 && (
                <button className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium">
                  <Award className="w-4 h-4" />
                  Get Certificate
                </button>
              )}
            </motion.div>

            {/* Instructor */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <h3 className="text-white font-semibold mb-4">Instructor</h3>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={course.instructorAvatar}
                  alt={course.instructor}
                  className="w-12 h-12 rounded-full border-2 border-indigo-500/50"
                />
                <div>
                  <div className="text-white font-medium">{course.instructor}</div>
                  <div className="text-white/40 text-xs">{course.category} Expert</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-white/50">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{formatNumber(course.students)}</span>
                </div>
              </div>
            </motion.div>

            {/* Course Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <h3 className="text-white font-semibold mb-4">Course Info</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Level", value: course.level },
                  { label: "Duration", value: course.duration },
                  { label: "Lessons", value: `${course.lessons} lessons` },
                  { label: "Students", value: formatNumber(course.students) },
                  { label: "Certificate", value: "Yes, on completion" },
                  { label: "Price", value: "Free" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-white/40">{label}</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

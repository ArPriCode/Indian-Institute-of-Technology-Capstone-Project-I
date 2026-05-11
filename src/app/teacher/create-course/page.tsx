"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen, Plus, Trash2, Upload, Save, ArrowLeft,
  Video, FileText, Clock, Tag, Globe, Lock
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CATEGORIES } from "@/lib/courses-data";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "text" | "quiz";
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export default function CreateCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [level, setLevel] = useState("Beginner");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState<Section[]>([
    {
      id: "s1",
      title: "Introduction",
      lessons: [
        { id: "l1", title: "Welcome to the course", duration: "5:00", type: "video" },
        { id: "l2", title: "Course overview", duration: "3:30", type: "text" },
      ],
    },
  ]);

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      { id: `s${Date.now()}`, title: "New Section", lessons: [] },
    ]);
  };

  const addLesson = (sectionId: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: [
                ...s.lessons,
                { id: `l${Date.now()}`, title: "New Lesson", duration: "10:00", type: "video" },
              ],
            }
          : s
      )
    );
  };

  const removeSection = (sectionId: string) => {
    setSections((prev) => prev.filter((s) => s.id !== sectionId));
  };

  const removeLesson = (sectionId: string, lessonId: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, lessons: s.lessons.filter((l) => l.id !== lessonId) }
          : s
      )
    );
  };

  const updateSection = (sectionId: string, title: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, title } : s))
    );
  };

  const updateLesson = (sectionId: string, lessonId: string, field: keyof Lesson, value: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.map((l) =>
                l.id === lessonId ? { ...l, [field]: value } : l
              ),
            }
          : s
      )
    );
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please enter a course title");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Course created successfully!");
    router.push("/teacher/courses");
    setSaving(false);
  };

  const totalLessons = sections.reduce((acc, s) => acc + s.lessons.length, 0);

  return (
    <DashboardLayout requiredRole="teacher">
      <div className="max-w-4xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <Link
              href="/teacher/dashboard"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-white">
              Create <span className="gradient-text">New Course</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-sm glass-card px-4 py-2">
            <BookOpen className="w-4 h-4" />
            <span>{totalLessons} lessons</span>
          </div>
        </motion.div>

        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 space-y-4"
        >
          <h3 className="text-white font-semibold text-lg">Course Information</h3>

          <div>
            <label className="text-white/60 text-sm mb-2 block">Course Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="glass-input"
              placeholder="e.g., Complete React & Next.js Masterclass"
            />
          </div>

          <div>
            <label className="text-white/60 text-sm mb-2 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="glass-input resize-none"
              placeholder="Describe what students will learn in this course..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/60 text-sm mb-2 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="glass-input"
              >
                {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                  <option key={cat} value={cat} style={{ background: "#0a0a28" }}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white/60 text-sm mb-2 block">Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="glass-input"
              >
                {["Beginner", "Intermediate", "Advanced"].map((l) => (
                  <option key={l} value={l} style={{ background: "#0a0a28" }}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-white/60 text-sm mb-2 block">YouTube Video ID (optional)</label>
            <div className="relative">
              <Video className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={youtubeId}
                onChange={(e) => setYoutubeId(e.target.value)}
                className="glass-input pl-11"
                placeholder="e.g., dQw4w9WgXcQ (from youtube.com/watch?v=...)"
              />
            </div>
            {youtubeId && (
              <div className="mt-2 rounded-xl overflow-hidden aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="text-white/60 text-sm mb-2 block">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <div key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm">
                  <Tag className="w-3 h-3" />
                  {tag}
                  <button onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}>
                    <Trash2 className="w-3 h-3 hover:text-red-400 transition-colors" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newTag.trim()) {
                    setTags((prev) => [...prev, newTag.trim()]);
                    setNewTag("");
                  }
                }}
                className="glass-input flex-1"
                placeholder="Add tag and press Enter"
              />
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="text-white/60 text-sm mb-2 block">Course Thumbnail</label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-indigo-500/50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-white/30 mx-auto mb-2" />
              <p className="text-white/40 text-sm">Click to upload or drag & drop</p>
              <p className="text-white/20 text-xs mt-1">PNG, JPG up to 2MB</p>
            </div>
          </div>
        </motion.div>

        {/* Curriculum Builder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-lg">Curriculum</h3>
            <button
              onClick={addSection}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Section
            </button>
          </div>

          <div className="space-y-4">
            {sections.map((section, sIdx) => (
              <div key={section.id} className="glass rounded-xl overflow-hidden">
                {/* Section Header */}
                <div className="flex items-center gap-3 p-4 bg-white/5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/30 flex items-center justify-center text-indigo-300 text-sm font-bold">
                    {sIdx + 1}
                  </div>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSection(section.id, e.target.value)}
                    className="flex-1 bg-transparent text-white font-medium outline-none placeholder-white/30"
                    placeholder="Section title"
                  />
                  <button
                    onClick={() => removeSection(section.id)}
                    className="text-white/30 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Lessons */}
                <div className="p-4 space-y-2">
                  {section.lessons.map((lesson, lIdx) => (
                    <div key={lesson.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <span className="text-white/30 text-xs w-5">{lIdx + 1}.</span>
                      <select
                        value={lesson.type}
                        onChange={(e) => updateLesson(section.id, lesson.id, "type", e.target.value)}
                        className="bg-transparent text-white/60 text-xs outline-none"
                      >
                        <option value="video" style={{ background: "#0a0a28" }}>📹 Video</option>
                        <option value="text" style={{ background: "#0a0a28" }}>📄 Text</option>
                        <option value="quiz" style={{ background: "#0a0a28" }}>❓ Quiz</option>
                      </select>
                      <input
                        type="text"
                        value={lesson.title}
                        onChange={(e) => updateLesson(section.id, lesson.id, "title", e.target.value)}
                        className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/30"
                        placeholder="Lesson title"
                      />
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-white/30" />
                        <input
                          type="text"
                          value={lesson.duration}
                          onChange={(e) => updateLesson(section.id, lesson.id, "duration", e.target.value)}
                          className="w-14 bg-transparent text-white/50 text-xs outline-none text-right"
                          placeholder="0:00"
                        />
                      </div>
                      <button
                        onClick={() => removeLesson(section.id, lesson.id)}
                        className="text-white/20 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => addLesson(section.id)}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-white/10 hover:border-indigo-500/40 text-white/40 hover:text-indigo-400 text-sm transition-all"
                  >
                    <Plus className="w-3 h-3" />
                    Add Lesson
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Publish Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <h3 className="text-white font-semibold text-lg mb-4">Publish Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center gap-3 p-4 rounded-xl glass border-2 border-indigo-500/50 text-white">
              <Globe className="w-5 h-5 text-indigo-400" />
              <div className="text-left">
                <div className="font-medium text-sm">Public</div>
                <div className="text-white/40 text-xs">Visible to all students</div>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-xl glass border border-white/10 text-white/50 hover:border-white/20 transition-colors">
              <Lock className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium text-sm">Private</div>
                <div className="text-white/40 text-xs">Invite only</div>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
        >
          {saving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save className="w-5 h-5" />
              Publish Course
            </>
          )}
        </motion.button>
      </div>
    </DashboardLayout>
  );
}

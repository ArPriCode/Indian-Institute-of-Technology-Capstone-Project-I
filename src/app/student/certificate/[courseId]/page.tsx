"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Download, Share2, Award, ArrowLeft } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/auth-context";
import { COURSES } from "@/lib/courses-data";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CertificatePage() {
  const { courseId } = useParams();
  const { userProfile } = useAuth();
  const certRef = useRef<HTMLDivElement>(null);
  const course = COURSES.find((c) => c.id === courseId);
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const handleDownload = () => {
    toast.success("Certificate downloaded!");
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "EduNexa Certificate",
        text: `I just completed "${course?.title}" on EduNexa!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Certificate link copied!");
    }
  };

  return (
    <DashboardLayout requiredRole="student">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link href={`/student/courses/${courseId}`} className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Course
          </Link>
          <div className="flex gap-3">
            <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 rounded-xl glass-button text-white/70 text-sm">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>

        {/* Certificate */}
        <motion.div
          ref={certRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)",
            border: "2px solid rgba(99,102,241,0.4)",
            boxShadow: "0 0 60px rgba(99,102,241,0.2), 0 0 120px rgba(139,92,246,0.1)",
          }}
        >
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-indigo-500/50 rounded-tl-xl" />
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-indigo-500/50 rounded-tr-xl" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-indigo-500/50 rounded-bl-xl" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-indigo-500/50 rounded-br-xl" />

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="absolute rounded-full border border-white/20"
                style={{ width: `${(i + 1) * 80}px`, height: `${(i + 1) * 80}px`, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
            ))}
          </div>

          <div className="relative z-10 p-16 text-center">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">EduNexa</span>
            </div>

            <p className="text-white/50 text-sm uppercase tracking-[0.3em] mb-4">Certificate of Completion</p>

            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto mb-8" />

            <p className="text-white/60 text-lg mb-4">This is to certify that</p>

            <h1 className="text-5xl font-bold mb-4" style={{
              background: "linear-gradient(135deg, #818cf8, #c084fc, #f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {userProfile?.displayName || "Student"}
            </h1>

            <p className="text-white/60 text-lg mb-4">has successfully completed</p>

            <h2 className="text-2xl font-bold text-white mb-2">{course?.title || "Course"}</h2>
            <p className="text-indigo-400 mb-8">{course?.category} · {course?.level} · {course?.duration}</p>

            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-8" />

            <div className="flex items-center justify-center gap-16 mb-8">
              <div className="text-center">
                <div className="text-white font-semibold">{today}</div>
                <div className="text-white/40 text-sm mt-1">Date of Completion</div>
              </div>
              <div className="text-center">
                <div className="text-white font-semibold">{course?.instructor}</div>
                <div className="text-white/40 text-sm mt-1">Instructor</div>
              </div>
              <div className="text-center">
                <div className="text-white font-semibold">EduNexa</div>
                <div className="text-white/40 text-sm mt-1">Platform</div>
              </div>
            </div>

            {/* Certificate ID */}
            <p className="text-white/20 text-xs">
              Certificate ID: EDX-{courseId?.toString().toUpperCase()}-{userProfile?.uid?.slice(0, 8).toUpperCase()}
            </p>
          </div>
        </motion.div>

        {/* Share on social */}
        <div className="glass-card p-6">
          <h3 className="text-white font-semibold mb-4">Share Your Achievement 🎉</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "LinkedIn", color: "bg-blue-600", emoji: "💼" },
              { label: "Twitter", color: "bg-sky-500", emoji: "🐦" },
              { label: "WhatsApp", color: "bg-emerald-600", emoji: "💬" },
              { label: "Copy Link", color: "bg-indigo-600", emoji: "🔗" },
            ].map(({ label, color, emoji }) => (
              <button
                key={label}
                onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success(`Shared on ${label}!`); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${color} text-white text-sm font-medium hover:opacity-90 transition-opacity`}
              >
                <span>{emoji}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

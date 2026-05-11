"use client";

import { useState } from "react";
import {
  BookOpen, TrendingUp, Award, Clock, Flame, Star,
  Play, ChevronRight, Zap, Target, Trophy, Brain
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/auth-context";
import { COURSES } from "@/lib/courses-data";
import { formatNumber, getLevelFromXP, getProgressPercent } from "@/lib/utils";
import Link from "next/link";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const ACTIVITY_DATA = [
  { day: "Mon", xp: 120 },
  { day: "Tue", xp: 90 },
  { day: "Wed", xp: 160 },
  { day: "Thu", xp: 100 },
  { day: "Fri", xp: 200 },
  { day: "Sat", xp: 175 },
  { day: "Sun", xp: 75 },
];

const ACHIEVEMENTS = [
  { icon: "🔥", label: "7-Day Streak", earned: true },
  { icon: "⚡", label: "Speed Learner", earned: true },
  { icon: "🏆", label: "Top Student", earned: false },
  { icon: "🎯", label: "Goal Crusher", earned: true },
  { icon: "💎", label: "Diamond Rank", earned: false },
  { icon: "🌟", label: "Star Performer", earned: false },
];

const card = {
  background: "rgba(30,30,45,0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "16px",
  padding: "20px",
};

export default function StudentDashboard() {
  const { userProfile } = useAuth();
  const [enrolledCourses] = useState(COURSES.slice(0, 3));
  const xp = userProfile?.xp || 1250;
  const level = getLevelFromXP(xp);
  const progress = getProgressPercent(xp);

  return (
    <DashboardLayout requiredRole="student">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
              Welcome back, <span className="gradient-text">{userProfile?.displayName?.split(" ")[0] || "Learner"}</span> 👋
            </h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Continue your learning journey. You&apos;re doing great!</p>
          </div>
          <div style={{ ...card, display: "flex", alignItems: "center", gap: "10px", padding: "12px 20px" }}>
            <Flame style={{ width: "20px", height: "20px", color: "#fb923c" }} />
            <div>
              <div style={{ color: "white", fontWeight: 700 }}>{userProfile?.streak || 7} days</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>Current streak</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {[
            { label: "Courses Enrolled", value: enrolledCourses.length, icon: BookOpen, color: "#6366f1" },
            { label: "Hours Learned", value: "47h", icon: Clock, color: "#8b5cf6" },
            { label: "XP Points", value: formatNumber(xp), icon: Zap, color: "#06b6d4" },
            { label: "Certificates", value: 2, icon: Award, color: "#10b981" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} style={card}>
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: color + "33", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                <Icon style={{ width: "22px", height: "22px", color }} />
              </div>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "white" }}>{value}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Level Progress */}
        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(245,158,11,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Trophy style={{ width: "22px", height: "22px", color: "#f59e0b" }} />
              </div>
              <div>
                <div style={{ color: "white", fontWeight: 600 }}>Level {level} Learner</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>{xp} / {level * 500} XP to Level {level + 1}</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="gradient-text" style={{ fontSize: "24px", fontWeight: 700 }}>{progress}%</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>Progress</div>
            </div>
          </div>
          <div style={{ height: "10px", background: "rgba(255,255,255,0.1)", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)", borderRadius: "999px", transition: "width 1s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>Level {level}</span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>Level {level + 1}</span>
          </div>
        </div>

        {/* Chart + Achievements */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
          {/* Activity Chart */}
          <div style={card}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h3 style={{ color: "white", fontWeight: 600, fontSize: "16px" }}>Weekly Activity</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#34d399", fontSize: "13px" }}>
                <TrendingUp style={{ width: "14px", height: "14px" }} />
                +23% this week
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={ACTIVITY_DATA}>
                <defs>
                  <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12, fill: "rgba(255,255,255,0.5)" }} />
                <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12, fill: "rgba(255,255,255,0.5)" }} />
                <Tooltip contentStyle={{ background: "rgba(20,20,35,0.95)", border: "1px solid rgba(99,102,241,0.4)", borderRadius: "10px", color: "white" }} />
                <Area type="monotone" dataKey="xp" stroke="#6366f1" strokeWidth={2} fill="url(#xpGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Achievements */}
          <div style={card}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ color: "white", fontWeight: 600, fontSize: "16px" }}>Achievements</h3>
              <Link href="/student/achievements" style={{ color: "#818cf8", fontSize: "13px", textDecoration: "none" }}>View all</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
              {ACHIEVEMENTS.map(({ icon, label, earned }) => (
                <div key={label} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                  padding: "10px 6px", borderRadius: "12px",
                  background: earned ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)",
                  border: earned ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.06)",
                  opacity: earned ? 1 : 0.4,
                }}>
                  <span style={{ fontSize: "22px" }}>{icon}</span>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "10px", textAlign: "center", lineHeight: "1.3" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Continue Learning */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <h3 style={{ color: "white", fontWeight: 600, fontSize: "18px" }}>Continue Learning</h3>
            <Link href="/student/courses" style={{ display: "flex", alignItems: "center", gap: "4px", color: "#818cf8", fontSize: "13px", textDecoration: "none" }}>
              All courses <ChevronRight style={{ width: "14px", height: "14px" }} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {enrolledCourses.map((course, i) => {
              const courseProgress = [65, 32, 10][i];
              return (
                <div key={course.id} style={{ ...card, padding: 0, overflow: "hidden" }}>
                  <div style={{ position: "relative", height: "130px", overflow: "hidden" }}>
                    <img src={course.thumbnail} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/8.x/shapes/svg?seed=${course.id}`; }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }} />
                    <div style={{ position: "absolute", bottom: "10px", left: "12px", right: "12px" }}>
                      <div style={{ height: "4px", background: "rgba(255,255,255,0.2)", borderRadius: "999px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${courseProgress}%`, background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>{courseProgress}% complete</span>
                        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>{course.lessons} lessons</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "14px" }}>
                    <h4 style={{ color: "white", fontWeight: 600, fontSize: "13px", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{course.title}</h4>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginBottom: "12px" }}>{course.instructor}</p>
                    <Link href={`/student/courses/${course.id}`} style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                      padding: "8px", borderRadius: "10px", background: "rgba(99,102,241,0.2)",
                      color: "#a5b4fc", fontSize: "13px", fontWeight: 600, textDecoration: "none",
                      border: "1px solid rgba(99,102,241,0.3)"
                    }}>
                      <Play style={{ width: "12px", height: "12px" }} />
                      Continue
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Brain style={{ width: "20px", height: "20px", color: "#a78bfa" }} />
            <h3 style={{ color: "white", fontWeight: 600, fontSize: "18px" }}>Recommended for You</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
            {COURSES.slice(4, 8).map((course) => (
              <div key={course.id} style={card}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <img src={course.thumbnail} alt={course.title} style={{ width: "56px", height: "56px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }}
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/8.x/shapes/svg?seed=${course.id}`; }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "#818cf8", fontSize: "11px", marginBottom: "4px" }}>{course.category}</div>
                    <h4 style={{ color: "white", fontSize: "13px", fontWeight: 600, marginBottom: "4px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{course.title}</h4>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Star style={{ width: "12px", height: "12px", color: "#fbbf24", fill: "#fbbf24" }} />
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>{course.rating}</span>
                    </div>
                  </div>
                </div>
                <Link href={`/student/courses/${course.id}`} style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                  marginTop: "12px", padding: "7px", borderRadius: "10px",
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: 600, textDecoration: "none"
                }}>
                  <Target style={{ width: "12px", height: "12px" }} />
                  Enroll Free
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

"use client";

import { TrendingUp, Clock, BookOpen, Zap, Target, Flame, Calendar } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/auth-context";
import { getLevelFromXP, getProgressPercent } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar
} from "recharts";

const WEEKLY_DATA = [
  { day: "Mon", xp: 120, hours: 2.5 },
  { day: "Tue", xp: 90, hours: 1.8 },
  { day: "Wed", xp: 160, hours: 3.2 },
  { day: "Thu", xp: 100, hours: 2.0 },
  { day: "Fri", xp: 200, hours: 4.1 },
  { day: "Sat", xp: 175, hours: 3.5 },
  { day: "Sun", xp: 75, hours: 1.5 },
];

const SKILL_DATA = [
  { skill: "React", value: 85 },
  { skill: "Python", value: 70 },
  { skill: "Design", value: 60 },
  { skill: "ML/AI", value: 45 },
  { skill: "DevOps", value: 55 },
  { skill: "Security", value: 40 },
];

const COURSE_PROGRESS = [
  { name: "React & Next.js", progress: 65, color: "#6366f1" },
  { name: "Python for DS", progress: 32, color: "#8b5cf6" },
  { name: "Web3 Dev", progress: 10, color: "#06b6d4" },
];

const card = {
  background: "rgba(30,30,45,0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "16px",
  padding: "20px",
};

const tooltipStyle = {
  contentStyle: { background: "rgba(20,20,35,0.95)", border: "1px solid rgba(99,102,241,0.4)", borderRadius: "10px", color: "white" }
};

export default function StudentProgressPage() {
  const { userProfile } = useAuth();
  const xp = userProfile?.xp || 1250;
  const level = getLevelFromXP(xp);
  const progress = getProgressPercent(xp);

  return (
    <DashboardLayout requiredRole="student">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
            Learning <span className="gradient-text">Progress</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Track your growth and achievements</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          {[
            { label: "Total XP", value: xp.toLocaleString(), icon: Zap, color: "#f59e0b" },
            { label: "Current Level", value: `Level ${level}`, icon: Target, color: "#6366f1" },
            { label: "Hours Learned", value: "47h", icon: Clock, color: "#06b6d4" },
            { label: "Day Streak", value: `${userProfile?.streak || 7}🔥`, icon: Flame, color: "#ef4444" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} style={card}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: color + "33", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                <Icon style={{ width: "20px", height: "20px", color }} />
              </div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "white" }}>{value}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Level Progress */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <h3 style={{ color: "white", fontWeight: 600 }}>Level Progress</h3>
            <span style={{ color: "#818cf8", fontWeight: 700 }}>{progress}%</span>
          </div>
          <div style={{ height: "12px", background: "rgba(255,255,255,0.1)", borderRadius: "999px", overflow: "hidden", marginBottom: "8px" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899)", borderRadius: "999px" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>Level {level} — {xp} XP</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>Level {level + 1} — {level * 500} XP</span>
          </div>
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ color: "white", fontWeight: 600 }}>Weekly XP</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#34d399", fontSize: "13px" }}>
                <TrendingUp style={{ width: "14px", height: "14px" }} />+23%
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={WEEKLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.5)" }} />
                <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.5)" }} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="xp" fill="#6366f1" radius={[4, 4, 0, 0]} name="XP" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={card}>
            <h3 style={{ color: "white", fontWeight: 600, marginBottom: "16px" }}>Skill Distribution</h3>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart data={SKILL_DATA}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} />
                <Radar name="Skills" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Progress */}
        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <BookOpen style={{ width: "18px", height: "18px", color: "#818cf8" }} />
            <h3 style={{ color: "white", fontWeight: 600, fontSize: "16px" }}>Course Progress</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {COURSE_PROGRESS.map(({ name, progress: p, color }) => (
              <div key={name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "white", fontWeight: 500, fontSize: "14px" }}>{name}</span>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>{p}%</span>
                </div>
                <div style={{ height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "999px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${p}%`, background: color, borderRadius: "999px", transition: "width 1s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Calendar */}
        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Calendar style={{ width: "18px", height: "18px", color: "#818cf8" }} />
            <h3 style={{ color: "white", fontWeight: 600 }}>Activity Calendar</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" }}>
            {Array.from({ length: 35 }, (_, i) => {
              const intensity = Math.random();
              const bg = intensity > 0.8 ? "#6366f1" : intensity > 0.6 ? "rgba(99,102,241,0.6)" : intensity > 0.4 ? "rgba(99,102,241,0.35)" : intensity > 0.2 ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)";
              return <div key={i} style={{ height: "28px", borderRadius: "6px", background: bg, cursor: "pointer", transition: "transform 0.1s" }} />;
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px" }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>Less</span>
            {["rgba(255,255,255,0.05)", "rgba(99,102,241,0.15)", "rgba(99,102,241,0.35)", "rgba(99,102,241,0.6)", "#6366f1"].map((bg) => (
              <div key={bg} style={{ width: "14px", height: "14px", borderRadius: "3px", background: bg }} />
            ))}
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>More</span>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

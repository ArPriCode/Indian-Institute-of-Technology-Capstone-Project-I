"use client";

import { Trophy, Lock, Star, Zap, Target, Users } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const ACHIEVEMENTS = [
  { id: 1, icon: "🔥", label: "7-Day Streak", description: "Learn for 7 consecutive days", xp: 200, earned: true, date: "May 5, 2026" },
  { id: 2, icon: "⚡", label: "Speed Learner", description: "Complete 5 lessons in one day", xp: 150, earned: true, date: "May 3, 2026" },
  { id: 3, icon: "🎯", label: "Goal Crusher", description: "Complete your first course", xp: 500, earned: true, date: "Apr 28, 2026" },
  { id: 4, icon: "📚", label: "Bookworm", description: "Enroll in 5 courses", xp: 100, earned: true, date: "Apr 20, 2026" },
  { id: 5, icon: "🏆", label: "Top Student", description: "Reach Level 10", xp: 1000, earned: false, date: null },
  { id: 6, icon: "💎", label: "Diamond Rank", description: "Earn 10,000 XP", xp: 2000, earned: false, date: null },
  { id: 7, icon: "🌟", label: "Star Performer", description: "Get 5 perfect quiz scores", xp: 300, earned: false, date: null },
  { id: 8, icon: "🤝", label: "Community Hero", description: "Help 10 fellow students", xp: 400, earned: false, date: null },
  { id: 9, icon: "🚀", label: "Rocket Start", description: "Complete onboarding", xp: 50, earned: true, date: "Apr 15, 2026" },
  { id: 10, icon: "🎓", label: "Graduate", description: "Earn your first certificate", xp: 750, earned: false, date: null },
  { id: 11, icon: "💡", label: "Curious Mind", description: "Watch 50 lessons", xp: 250, earned: false, date: null },
  { id: 12, icon: "🌍", label: "Global Learner", description: "Complete courses in 3 categories", xp: 350, earned: false, date: null },
];

const LEADERBOARD = [
  { rank: 1, name: "Arjun Kumar", xp: 8450, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=arjun" },
  { rank: 2, name: "Priya Singh", xp: 7200, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=priya2" },
  { rank: 3, name: "Rahul Sharma", xp: 6800, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=rahul" },
  { rank: 4, name: "You", xp: 1250, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=you", isYou: true },
  { rank: 5, name: "Anita Patel", xp: 1100, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=anita" },
];

const card = {
  background: "rgba(30,30,45,0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "16px",
  padding: "20px",
};

const earned = ACHIEVEMENTS.filter((a) => a.earned);

export default function AchievementsPage() {
  return (
    <DashboardLayout requiredRole="student">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
            <span className="gradient-text">Achievements</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Your badges and accomplishments</p>
        </div>

        {/* Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
          {[
            { label: "Earned", value: earned.length, icon: Trophy, color: "#f59e0b" },
            { label: "XP from Badges", value: earned.reduce((s, a) => s + a.xp, 0), icon: Zap, color: "#6366f1" },
            { label: "Remaining", value: ACHIEVEMENTS.length - earned.length, icon: Target, color: "#8b5cf6" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} style={{ ...card, textAlign: "center" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: color + "33", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                <Icon style={{ width: "22px", height: "22px", color }} />
              </div>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "white" }}>{value}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
          {/* Badges Grid */}
          <div>
            <h3 style={{ color: "white", fontWeight: 600, fontSize: "16px", marginBottom: "14px" }}>All Badges</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {ACHIEVEMENTS.map((a) => (
                <div key={a.id} style={{
                  ...card, textAlign: "center", position: "relative",
                  opacity: a.earned ? 1 : 0.45,
                  border: a.earned ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.08)",
                }}>
                  {a.earned && (
                    <div style={{ position: "absolute", top: "8px", right: "8px", width: "18px", height: "18px", borderRadius: "50%", background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Star style={{ width: "10px", height: "10px", color: "white", fill: "white" }} />
                    </div>
                  )}
                  {!a.earned && (
                    <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                      <Lock style={{ width: "14px", height: "14px", color: "rgba(255,255,255,0.3)" }} />
                    </div>
                  )}
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>{a.icon}</div>
                  <div style={{ color: "white", fontWeight: 600, fontSize: "13px", marginBottom: "4px" }}>{a.label}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", marginBottom: "6px" }}>{a.description}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                    <Zap style={{ width: "12px", height: "12px", color: "#fbbf24" }} />
                    <span style={{ color: "#fbbf24", fontSize: "12px", fontWeight: 600 }}>+{a.xp} XP</span>
                  </div>
                  {a.earned && a.date && <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", marginTop: "4px" }}>{a.date}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h3 style={{ color: "white", fontWeight: 600, fontSize: "16px", marginBottom: "14px" }}>Leaderboard</h3>
            <div style={card}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {LEADERBOARD.map(({ rank, name, xp, avatar, isYou }) => (
                  <div key={rank} style={{
                    display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "12px",
                    background: isYou ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.03)",
                    border: isYou ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
                  }}>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: "13px", flexShrink: 0,
                      background: rank === 1 ? "#f59e0b" : rank === 2 ? "#9ca3af" : rank === 3 ? "#b45309" : "rgba(255,255,255,0.1)",
                      color: rank <= 3 ? "black" : "rgba(255,255,255,0.6)",
                    }}>{rank}</div>
                    <img src={avatar} alt={name} style={{ width: "32px", height: "32px", borderRadius: "50%" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ color: isYou ? "#a5b4fc" : "white", fontSize: "13px", fontWeight: 600 }}>{name}{isYou ? " (You)" : ""}</div>
                      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>{xp.toLocaleString()} XP</div>
                    </div>
                    {rank <= 3 && <span style={{ fontSize: "18px" }}>{rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

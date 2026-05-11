"use client";

import { motion } from "framer-motion";
import { Trophy, Lock, Star, Zap, Flame, BookOpen, Award, Target, Users, Clock } from "lucide-react";
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

export default function AchievementsPage() {
  const earned = ACHIEVEMENTS.filter((a) => a.earned);
  const totalXP = earned.reduce((sum, a) => sum + a.xp, 0);

  return (
    <DashboardLayout requiredRole="student">
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-1">
            <span className="gradient-text">Achievements</span>
          </h1>
          <p className="text-white/50">Your badges and accomplishments</p>
        </motion.div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Earned", value: earned.length, icon: Trophy, color: "from-yellow-500 to-orange-500" },
            { label: "Total XP from Badges", value: totalXP, icon: Zap, color: "from-indigo-500 to-purple-500" },
            { label: "Remaining", value: ACHIEVEMENTS.length - earned.length, icon: Target, color: "from-purple-500 to-pink-500" },
          ].map(({ label, value, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5 text-center"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-white/50 text-sm">{label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Achievements Grid */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-4">All Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ACHIEVEMENTS.map((achievement, i) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`glass-card p-5 text-center relative overflow-hidden transition-all duration-300 ${
                    achievement.earned ? "hover:scale-105 cursor-pointer" : "opacity-50"
                  }`}
                >
                  {achievement.earned && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Star className="w-3 h-3 text-white fill-white" />
                    </div>
                  )}
                  {!achievement.earned && (
                    <div className="absolute top-2 right-2">
                      <Lock className="w-4 h-4 text-white/30" />
                    </div>
                  )}
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <div className="text-white font-semibold text-sm mb-1">{achievement.label}</div>
                  <div className="text-white/40 text-xs mb-2">{achievement.description}</div>
                  <div className="flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="text-yellow-400 text-xs font-medium">+{achievement.xp} XP</span>
                  </div>
                  {achievement.earned && achievement.date && (
                    <div className="text-white/30 text-xs mt-1">{achievement.date}</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Leaderboard</h3>
            <div className="glass-card p-4 space-y-3">
              {LEADERBOARD.map(({ rank, name, xp, avatar, isYou }) => (
                <div
                  key={rank}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    isYou ? "bg-indigo-500/20 border border-indigo-500/30" : "hover:bg-white/5"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    rank === 1 ? "bg-yellow-500 text-black" :
                    rank === 2 ? "bg-gray-400 text-black" :
                    rank === 3 ? "bg-orange-600 text-white" :
                    "bg-white/10 text-white/60"
                  }`}>
                    {rank}
                  </div>
                  <img src={avatar} alt={name} className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${isYou ? "text-indigo-300" : "text-white"}`}>
                      {name} {isYou && "(You)"}
                    </div>
                    <div className="text-white/40 text-xs">{xp.toLocaleString()} XP</div>
                  </div>
                  {rank <= 3 && (
                    <span className="text-lg">{rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

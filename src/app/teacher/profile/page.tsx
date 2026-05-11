"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Save, Plus, X, Award, BookOpen, Users, Star } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/auth-context";
import Image from "next/image";

const EXPERTISE_SUGGESTIONS = [
  "React", "Node.js", "Python", "Machine Learning", "Data Science",
  "UI/UX Design", "Flutter", "AWS", "Docker", "Blockchain",
  "Cybersecurity", "SQL", "MongoDB", "GraphQL", "Next.js", "TypeScript"
];

export default function TeacherProfilePage() {
  const { userProfile, updateUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState(userProfile?.displayName || "");
  const [bio, setBio] = useState(userProfile?.bio || "");
  const [skills, setSkills] = useState<string[]>(userProfile?.skills || ["React", "Node.js", "TypeScript"]);
  const [newSkill, setNewSkill] = useState("");
  const [saving, setSaving] = useState(false);
  const [qualification, setQualification] = useState("M.Tech Computer Science");
  const [experience, setExperience] = useState("5");
  const [institution, setInstitution] = useState("IIT Delhi");

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills((prev) => [...prev, skill]);
      setNewSkill("");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await updateUserProfile({ displayName, bio, skills });
    setSaving(false);
  };

  return (
    <DashboardLayout requiredRole="teacher">
      <div className="max-w-3xl space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-1">
            Teacher <span className="gradient-text">Profile</span>
          </h1>
          <p className="text-white/50">Build your professional teaching profile</p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <Image
                src={userProfile?.photoURL || `https://api.dicebear.com/8.x/avataaars/svg?seed=${userProfile?.uid}`}
                alt="Profile"
                width={96}
                height={96}
                className="rounded-2xl border-2 border-purple-500/50"
              />
              <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center hover:bg-purple-600 transition-colors shadow-lg">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">{userProfile?.displayName}</h3>
              <p className="text-white/50 text-sm">{userProfile?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium">
                Verified Teacher
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Courses", value: "3", icon: BookOpen, color: "text-indigo-400" },
              { label: "Students", value: "1.2K", icon: Users, color: "text-purple-400" },
              { label: "Rating", value: "4.8", icon: Star, color: "text-yellow-400" },
              { label: "Certificates", value: "5", icon: Award, color: "text-emerald-400" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="text-center glass rounded-xl p-3">
                <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
                <div className="text-white font-bold">{value}</div>
                <div className="text-white/40 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 space-y-4"
        >
          <h3 className="text-white font-semibold text-lg">Personal Information</h3>

          <div>
            <label className="text-white/60 text-sm mb-2 block">Full Name</label>
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="glass-input" />
          </div>

          <div>
            <label className="text-white/60 text-sm mb-2 block">Professional Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="glass-input resize-none"
              placeholder="Describe your teaching philosophy, experience, and what makes you unique..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/60 text-sm mb-2 block">Qualification</label>
              <input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} className="glass-input" />
            </div>
            <div>
              <label className="text-white/60 text-sm mb-2 block">Years of Experience</label>
              <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} className="glass-input" min="0" />
            </div>
          </div>

          <div>
            <label className="text-white/60 text-sm mb-2 block">Institution / Organization</label>
            <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} className="glass-input" />
          </div>
        </motion.div>

        {/* Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 space-y-4"
        >
          <h3 className="text-white font-semibold text-lg">Areas of Expertise</h3>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div key={skill} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm">
                {skill}
                <button onClick={() => setSkills((prev) => prev.filter((s) => s !== skill))}>
                  <X className="w-3 h-3 hover:text-red-400 transition-colors" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill(newSkill)}
              className="glass-input flex-1"
              placeholder="Add expertise area..."
            />
            <button onClick={() => addSkill(newSkill)} className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {EXPERTISE_SUGGESTIONS.filter((s) => !skills.includes(s)).slice(0, 8).map((skill) => (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                className="px-3 py-1 rounded-full glass-button text-white/60 text-xs hover:text-white transition-colors"
              >
                + {skill}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
        >
          {saving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <><Save className="w-5 h-5" />Save Profile</>
          )}
        </motion.button>
      </div>
    </DashboardLayout>
  );
}

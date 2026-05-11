"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Save, Plus, X, Linkedin, Github, Globe, Twitter } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/auth-context";
import Image from "next/image";

const SKILL_SUGGESTIONS = [
  "JavaScript", "Python", "React", "Node.js", "TypeScript", "Machine Learning",
  "Data Science", "UI/UX Design", "Flutter", "AWS", "Docker", "Kubernetes",
  "Blockchain", "Cybersecurity", "SQL", "MongoDB", "GraphQL", "Next.js"
];

export default function StudentProfilePage() {
  const { userProfile, updateUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState(userProfile?.displayName || "");
  const [bio, setBio] = useState(userProfile?.bio || "");
  const [skills, setSkills] = useState<string[]>(userProfile?.skills || ["React", "Python"]);
  const [newSkill, setNewSkill] = useState("");
  const [saving, setSaving] = useState(false);
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills((prev) => [...prev, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSave = async () => {
    setSaving(true);
    await updateUserProfile({ displayName, bio, skills });
    setSaving(false);
  };

  return (
    <DashboardLayout requiredRole="student">
      <div className="max-w-3xl space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-1">
            My <span className="gradient-text">Profile</span>
          </h1>
          <p className="text-white/50">Manage your personal information and skills</p>
        </motion.div>

        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-6">
            <div className="relative">
              <Image
                src={userProfile?.photoURL || `https://api.dicebear.com/8.x/avataaars/svg?seed=${userProfile?.uid}`}
                alt="Profile"
                width={96}
                height={96}
                className="rounded-2xl border-2 border-indigo-500/50"
              />
              <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center hover:bg-indigo-600 transition-colors shadow-lg">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">{userProfile?.displayName}</h3>
              <p className="text-white/50 text-sm">{userProfile?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium capitalize">
                  {userProfile?.role}
                </span>
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-medium">
                  Level {Math.floor((userProfile?.xp || 1250) / 500) + 1}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 space-y-4"
        >
          <h3 className="text-white font-semibold text-lg">Basic Information</h3>

          <div>
            <label className="text-white/60 text-sm mb-2 block">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="glass-input"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="text-white/60 text-sm mb-2 block">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="glass-input resize-none"
              placeholder="Tell us about yourself, your learning goals, and interests..."
            />
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 space-y-4"
        >
          <h3 className="text-white font-semibold text-lg">Skills & Interests</h3>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm"
              >
                {skill}
                <button onClick={() => removeSkill(skill)} className="hover:text-red-400 transition-colors">
                  <X className="w-3 h-3" />
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
              placeholder="Add a skill..."
            />
            <button
              onClick={() => addSkill(newSkill)}
              className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div>
            <p className="text-white/40 text-xs mb-2">Suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {SKILL_SUGGESTIONS.filter((s) => !skills.includes(s)).slice(0, 8).map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="px-3 py-1 rounded-full glass-button text-white/60 text-xs hover:text-white transition-colors"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 space-y-4"
        >
          <h3 className="text-white font-semibold text-lg">Social Links</h3>
          {[
            { icon: Linkedin, label: "LinkedIn", value: linkedin, setter: setLinkedin, placeholder: "linkedin.com/in/username" },
            { icon: Github, label: "GitHub", value: github, setter: setGithub, placeholder: "github.com/username" },
            { icon: Globe, label: "Website", value: website, setter: setWebsite, placeholder: "yourwebsite.com" },
            { icon: Twitter, label: "Twitter", value: "", setter: () => {}, placeholder: "twitter.com/username" },
          ].map(({ icon: Icon, label, value, setter, placeholder }) => (
            <div key={label} className="relative">
              <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="glass-input pl-11"
                placeholder={placeholder}
              />
            </div>
          ))}
        </motion.div>

        {/* Save Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
        >
          {saving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          )}
        </motion.button>
      </div>
    </DashboardLayout>
  );
}

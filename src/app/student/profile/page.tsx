"use client";

import { useState } from "react";
import { Camera, Save, Plus, X, Linkedin, Github, Globe, Twitter } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/auth-context";
import Image from "next/image";

const SKILL_SUGGESTIONS = [
  "JavaScript", "Python", "React", "Node.js", "TypeScript", "Machine Learning",
  "Data Science", "UI/UX Design", "Flutter", "AWS", "Docker", "Kubernetes",
  "Blockchain", "Cybersecurity", "SQL", "MongoDB", "GraphQL", "Next.js"
];

const card = {
  background: "rgba(30,30,45,0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "16px",
  padding: "24px",
};

export default function StudentProfilePage() {
  const { userProfile, updateUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState(userProfile?.displayName || "");
  const [bio, setBio] = useState(userProfile?.bio || "");
  const [skills, setSkills] = useState<string[]>(userProfile?.skills || ["React", "Python"]);
  const [newSkill, setNewSkill] = useState("");
  const [saving, setSaving] = useState(false);

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
    <DashboardLayout requiredRole="student">
      <div style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>

        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
            My <span className="gradient-text">Profile</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Manage your personal information and skills</p>
        </div>

        {/* Avatar */}
        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ position: "relative" }}>
              <Image
                src={userProfile?.photoURL || `https://api.dicebear.com/8.x/avataaars/svg?seed=${userProfile?.uid || "user"}`}
                alt="Avatar" width={80} height={80}
                style={{ borderRadius: "16px", border: "2px solid rgba(99,102,241,0.5)" }}
              />
              <button style={{ position: "absolute", bottom: "-8px", right: "-8px", width: "28px", height: "28px", borderRadius: "50%", background: "#6366f1", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Camera style={{ width: "14px", height: "14px", color: "white" }} />
              </button>
            </div>
            <div>
              <h3 style={{ color: "white", fontWeight: 700, fontSize: "18px" }}>{userProfile?.displayName || "User"}</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>{userProfile?.email}</p>
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <span style={{ padding: "3px 10px", borderRadius: "999px", background: "rgba(99,102,241,0.2)", color: "#a5b4fc", fontSize: "12px", fontWeight: 600, textTransform: "capitalize" }}>
                  {userProfile?.role || "Student"}
                </span>
                <span style={{ padding: "3px 10px", borderRadius: "999px", background: "rgba(245,158,11,0.2)", color: "#fcd34d", fontSize: "12px", fontWeight: 600 }}>
                  Level {Math.floor((userProfile?.xp || 1250) / 500) + 1}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div style={card}>
          <h3 style={{ color: "white", fontWeight: 600, fontSize: "16px", marginBottom: "16px" }}>Basic Information</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", display: "block", marginBottom: "6px" }}>Display Name</label>
              <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="glass-input" placeholder="Your full name" />
            </div>
            <div>
              <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", display: "block", marginBottom: "6px" }}>Bio</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="glass-input" style={{ resize: "none" }} placeholder="Tell us about yourself..." />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div style={card}>
          <h3 style={{ color: "white", fontWeight: 600, fontSize: "16px", marginBottom: "16px" }}>Skills & Interests</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
            {skills.map((skill) => (
              <div key={skill} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "999px", background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc", fontSize: "13px" }}>
                {skill}
                <button onClick={() => setSkills((prev) => prev.filter((s) => s !== skill))} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", display: "flex" }}>
                  <X style={{ width: "12px", height: "12px" }} />
                </button>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill(newSkill)}
              className="glass-input" style={{ flex: 1 }} placeholder="Add a skill..." />
            <button onClick={() => addSkill(newSkill)} style={{ padding: "10px 16px", borderRadius: "12px", background: "#6366f1", border: "none", cursor: "pointer", color: "white" }}>
              <Plus style={{ width: "16px", height: "16px" }} />
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {SKILL_SUGGESTIONS.filter((s) => !skills.includes(s)).slice(0, 8).map((skill) => (
              <button key={skill} onClick={() => addSkill(skill)} style={{ padding: "4px 10px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: "12px", cursor: "pointer" }}>
                + {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div style={card}>
          <h3 style={{ color: "white", fontWeight: 600, fontSize: "16px", marginBottom: "16px" }}>Social Links</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { icon: Linkedin, placeholder: "linkedin.com/in/username" },
              { icon: Github, placeholder: "github.com/username" },
              { icon: Globe, placeholder: "yourwebsite.com" },
              { icon: Twitter, placeholder: "twitter.com/username" },
            ].map(({ icon: Icon, placeholder }) => (
              <div key={placeholder} style={{ position: "relative" }}>
                <Icon style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "rgba(255,255,255,0.3)" }} />
                <input type="text" className="glass-input" style={{ paddingLeft: "42px" }} placeholder={placeholder} />
              </div>
            ))}
          </div>
        </div>

        {/* Save */}
        <button onClick={handleSave} disabled={saving} style={{
          width: "100%", padding: "16px", borderRadius: "16px",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)",
          color: "white", fontWeight: 700, fontSize: "16px", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          opacity: saving ? 0.7 : 1
        }}>
          {saving ? <div style={{ width: "20px", height: "20px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> : <><Save style={{ width: "18px", height: "18px" }} />Save Changes</>}
        </button>
      </div>
    </DashboardLayout>
  );
}

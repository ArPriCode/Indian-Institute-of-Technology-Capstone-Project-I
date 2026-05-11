"use client";

import { useState } from "react";
import { Bell, Shield, Globe, Moon, Save } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import toast from "react-hot-toast";

const card = {
  background: "rgba(30,30,45,0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "16px",
  padding: "24px",
};

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} style={{
      position: "relative", width: "44px", height: "24px", borderRadius: "999px",
      background: value ? "#6366f1" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", transition: "background 0.3s",
    }}>
      <div style={{
        position: "absolute", top: "4px", width: "16px", height: "16px", borderRadius: "50%",
        background: "white", transition: "left 0.3s", left: value ? "24px" : "4px",
      }} />
    </button>
  );
}

export default function StudentSettingsPage() {
  const [notifications, setNotifications] = useState({ email: true, push: true, courseUpdates: true, achievements: true, messages: true });
  const [privacy, setPrivacy] = useState({ publicProfile: true, showProgress: true });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Settings saved!");
    setSaving(false);
  };

  return (
    <DashboardLayout requiredRole="student">
      <div style={{ maxWidth: "640px", display: "flex", flexDirection: "column", gap: "20px" }}>

        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
            <span className="gradient-text">Settings</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Manage your preferences</p>
        </div>

        {/* Notifications */}
        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Bell style={{ width: "18px", height: "18px", color: "#818cf8" }} />
            <h3 style={{ color: "white", fontWeight: 600, fontSize: "16px" }}>Notifications</h3>
          </div>
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <div style={{ color: "white", fontSize: "14px", fontWeight: 500, textTransform: "capitalize" }}>{key.replace(/([A-Z])/g, " $1")}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>Receive {key.toLowerCase()} notifications</div>
              </div>
              <Toggle value={value} onChange={() => setNotifications((p) => ({ ...p, [key]: !p[key as keyof typeof p] }))} />
            </div>
          ))}
        </div>

        {/* Privacy */}
        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Shield style={{ width: "18px", height: "18px", color: "#a78bfa" }} />
            <h3 style={{ color: "white", fontWeight: 600, fontSize: "16px" }}>Privacy</h3>
          </div>
          {Object.entries(privacy).map(([key, value]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <div style={{ color: "white", fontSize: "14px", fontWeight: 500, textTransform: "capitalize" }}>{key.replace(/([A-Z])/g, " $1")}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>Allow others to see your {key.toLowerCase()}</div>
              </div>
              <Toggle value={value} onChange={() => setPrivacy((p) => ({ ...p, [key]: !p[key as keyof typeof p] }))} />
            </div>
          ))}
        </div>

        {/* Appearance */}
        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Moon style={{ width: "18px", height: "18px", color: "#60a5fa" }} />
            <h3 style={{ color: "white", fontWeight: 600, fontSize: "16px" }}>Appearance</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(99,102,241,0.15)", border: "2px solid rgba(99,102,241,0.4)", display: "flex", alignItems: "center", gap: "10px" }}>
              <Moon style={{ width: "18px", height: "18px", color: "#818cf8" }} />
              <div>
                <div style={{ color: "white", fontSize: "13px", fontWeight: 600 }}>Dark Mode</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>Current theme</div>
              </div>
            </div>
            <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: "10px", opacity: 0.5 }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#fbbf24" }} />
              <div>
                <div style={{ color: "white", fontSize: "13px", fontWeight: 600 }}>Light Mode</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>Coming soon</div>
              </div>
            </div>
          </div>
        </div>

        {/* Language */}
        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Globe style={{ width: "18px", height: "18px", color: "#34d399" }} />
            <h3 style={{ color: "white", fontWeight: 600, fontSize: "16px" }}>Language</h3>
          </div>
          <select className="glass-input">
            <option style={{ background: "#1e1e2d" }}>English (US)</option>
            <option style={{ background: "#1e1e2d" }}>Hindi</option>
            <option style={{ background: "#1e1e2d" }}>Spanish</option>
          </select>
        </div>

        <button onClick={handleSave} disabled={saving} style={{
          width: "100%", padding: "16px", borderRadius: "16px",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)",
          color: "white", fontWeight: 700, fontSize: "16px", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          opacity: saving ? 0.7 : 1,
        }}>
          {saving ? <div style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%" }} /> : <><Save style={{ width: "18px", height: "18px" }} />Save Settings</>}
        </button>
      </div>
    </DashboardLayout>
  );
}

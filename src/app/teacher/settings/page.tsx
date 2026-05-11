"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Shield, Save } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import toast from "react-hot-toast";

export default function TeacherSettingsPage() {
  const [notifications, setNotifications] = useState({ email: true, newStudents: true, reviews: true, messages: true });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Settings saved!");
    setSaving(false);
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={`relative w-12 h-6 rounded-full transition-all duration-300 ${value ? "bg-purple-500" : "bg-white/20"}`}>
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${value ? "left-7" : "left-1"}`} />
    </button>
  );

  return (
    <DashboardLayout requiredRole="teacher">
      <div className="max-w-2xl space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-1"><span className="gradient-text">Settings</span></h1>
          <p className="text-white/50">Manage your teaching preferences</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-5 h-5 text-purple-400" />
            <h3 className="text-white font-semibold text-lg">Notifications</h3>
          </div>
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div>
                <div className="text-white text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                <div className="text-white/40 text-xs">Receive {key.toLowerCase()} notifications</div>
              </div>
              <Toggle value={value} onChange={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))} />
            </div>
          ))}
        </motion.div>

        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          onClick={handleSave} disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50">
          {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save className="w-5 h-5" />Save Settings</>}
        </motion.button>
      </div>
    </DashboardLayout>
  );
}

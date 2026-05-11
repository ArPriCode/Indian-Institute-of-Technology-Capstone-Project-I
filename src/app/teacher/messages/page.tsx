"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Search } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const CONVERSATIONS = [
  { id: 1, name: "Arjun Kumar", role: "Student — React & Next.js", avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=arjun", lastMessage: "Thank you for the explanation!", time: "5m ago", unread: 1 },
  { id: 2, name: "Priya Singh", role: "Student — React & Next.js", avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=priya2", lastMessage: "When is the next live session?", time: "30m ago", unread: 0 },
  { id: 3, name: "Rahul Sharma", role: "Student — Python for DS", avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=rahul", lastMessage: "I completed the pandas module!", time: "2h ago", unread: 0 },
];

const MESSAGES = [
  { id: 1, from: "student", text: "Hi! I have a question about the useEffect cleanup function.", time: "10:00 AM" },
  { id: 2, from: "me", text: "Sure! The cleanup function runs when the component unmounts or before the effect runs again.", time: "10:05 AM" },
  { id: 3, from: "student", text: "Oh I see! So it's like a destructor?", time: "10:06 AM" },
  { id: 4, from: "me", text: "Exactly! It's used to cancel subscriptions, clear timers, or remove event listeners.", time: "10:08 AM" },
  { id: 5, from: "student", text: "Thank you for the explanation!", time: "10:10 AM" },
];

export default function TeacherMessagesPage() {
  const [selected, setSelected] = useState(CONVERSATIONS[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MESSAGES);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "me", text: message, time: "Now" }]);
    setMessage("");
  };

  return (
    <DashboardLayout requiredRole="teacher">
      <div className="space-y-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-1">
            <span className="gradient-text">Messages</span>
          </h1>
          <p className="text-white/50">Communicate with your students</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4 h-[600px]">
          <div className="glass-card p-4 flex flex-col gap-3 overflow-y-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type="text" placeholder="Search students..." className="glass-input pl-9 text-sm py-2" />
            </div>
            {CONVERSATIONS.map((conv) => (
              <button key={conv.id} onClick={() => setSelected(conv)}
                className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${selected.id === conv.id ? "bg-purple-500/20 border border-purple-500/30" : "hover:bg-white/5"}`}>
                <img src={conv.avatar} alt={conv.name} className="w-10 h-10 rounded-full" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium text-sm">{conv.name}</span>
                    <span className="text-white/30 text-xs">{conv.time}</span>
                  </div>
                  <p className="text-white/40 text-xs truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">{conv.unread}</div>
                )}
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 glass-card flex flex-col">
            <div className="flex items-center gap-3 p-4 border-b border-white/10">
              <img src={selected.avatar} alt={selected.name} className="w-10 h-10 rounded-full" />
              <div>
                <div className="text-white font-medium">{selected.name}</div>
                <div className="text-white/40 text-xs">{selected.role}</div>
              </div>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                    msg.from === "me" ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-br-sm" : "glass text-white/80 rounded-bl-sm"
                  }`}>
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.from === "me" ? "text-white/60" : "text-white/30"}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/10 flex gap-3">
              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..." className="glass-input flex-1" />
              <button onClick={sendMessage} className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:shadow-lg transition-all">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

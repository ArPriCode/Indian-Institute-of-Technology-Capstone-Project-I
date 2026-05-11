"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Search, MessageSquare } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const CONVERSATIONS = [
  { id: 1, name: "Sarah Johnson", role: "React & Next.js Instructor", avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=sarah", lastMessage: "Great progress on the hooks assignment!", time: "2m ago", unread: 2 },
  { id: 2, name: "Dr. Raj Patel", role: "Python for DS Instructor", avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=raj", lastMessage: "Check out the new pandas tutorial I uploaded", time: "1h ago", unread: 0 },
  { id: 3, name: "Alex Chen", role: "Web3 Dev Instructor", avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=alex", lastMessage: "The smart contract assignment is due Friday", time: "3h ago", unread: 1 },
];

const MESSAGES = [
  { id: 1, from: "teacher", text: "Hi! How are you progressing with the React hooks module?", time: "10:30 AM" },
  { id: 2, from: "me", text: "Going well! I finished the useState and useEffect sections.", time: "10:32 AM" },
  { id: 3, from: "teacher", text: "Excellent! The useCallback and useMemo sections are next. They're a bit tricky but very important for performance.", time: "10:35 AM" },
  { id: 4, from: "me", text: "I had a question about when to use useMemo vs useCallback?", time: "10:36 AM" },
  { id: 5, from: "teacher", text: "Great question! useMemo is for memoizing values, while useCallback is for memoizing functions. I'll add a detailed explanation in the next lesson.", time: "10:40 AM" },
  { id: 6, from: "teacher", text: "Great progress on the hooks assignment!", time: "10:42 AM" },
];

export default function StudentMessagesPage() {
  const [selected, setSelected] = useState(CONVERSATIONS[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MESSAGES);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "me", text: message, time: "Now" }]);
    setMessage("");
  };

  return (
    <DashboardLayout requiredRole="student">
      <div className="space-y-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-1">
            <span className="gradient-text">Messages</span>
          </h1>
          <p className="text-white/50">Chat with your instructors</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4 h-[600px]">
          {/* Conversations List */}
          <div className="glass-card p-4 flex flex-col gap-3 overflow-y-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type="text" placeholder="Search..." className="glass-input pl-9 text-sm py-2" />
            </div>
            {CONVERSATIONS.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelected(conv)}
                className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  selected.id === conv.id ? "bg-indigo-500/20 border border-indigo-500/30" : "hover:bg-white/5"
                }`}
              >
                <div className="relative">
                  <img src={conv.avatar} alt={conv.name} className="w-10 h-10 rounded-full" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-gray-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium text-sm">{conv.name}</span>
                    <span className="text-white/30 text-xs">{conv.time}</span>
                  </div>
                  <p className="text-white/40 text-xs truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                    {conv.unread}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2 glass-card flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10">
              <img src={selected.avatar} alt={selected.name} className="w-10 h-10 rounded-full" />
              <div>
                <div className="text-white font-medium">{selected.name}</div>
                <div className="text-white/40 text-xs">{selected.role}</div>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-emerald-400 text-xs">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                    msg.from === "me"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-sm"
                      : "glass text-white/80 rounded-bl-sm"
                  }`}>
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.from === "me" ? "text-white/60" : "text-white/30"}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="glass-input flex-1"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

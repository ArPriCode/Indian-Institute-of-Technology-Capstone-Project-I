"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, CheckCheck, Info, Award, BookOpen, MessageSquare } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { subscribeNotifications, markNotificationRead } from "@/lib/firestore-helpers";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: { toDate?: () => Date } | null;
}

const TYPE_ICONS: Record<string, React.ElementType> = {
  info: Info,
  achievement: Award,
  course: BookOpen,
  message: MessageSquare,
};

const TYPE_COLORS: Record<string, string> = {
  info: "text-blue-400",
  achievement: "text-yellow-400",
  course: "text-indigo-400",
  message: "text-emerald-400",
};

export default function NotificationBell() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeNotifications(user.uid, (notifs) => {
      setNotifications(notifs as Notification[]);
    });
    return () => unsub();
  }, [user]);

  const unread = notifications.filter((n) => !n.read).length;

  const handleMarkRead = async (id: string) => {
    await markNotificationRead(id);
  };

  const handleMarkAllRead = async () => {
    await Promise.all(notifications.filter((n) => !n.read).map((n) => markNotificationRead(n.id)));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl glass-button text-white/60 hover:text-white transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold animate-pulse">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-12 w-80 z-50 glass-strong rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-white font-semibold">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unread > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-indigo-400 text-xs hover:text-indigo-300 flex items-center gap-1"
                    >
                      <CheckCheck className="w-3 h-3" />
                      Mark all read
                    </button>
                  )}
                  <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-8 h-8 text-white/20 mx-auto mb-2" />
                    <p className="text-white/40 text-sm">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notif) => {
                    const Icon = TYPE_ICONS[notif.type] || Info;
                    const color = TYPE_COLORS[notif.type] || "text-blue-400";
                    return (
                      <div
                        key={notif.id}
                        onClick={() => handleMarkRead(notif.id)}
                        className={`flex gap-3 p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${
                          !notif.read ? "bg-indigo-500/5" : ""
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 ${color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium">{notif.title}</p>
                          <p className="text-white/50 text-xs mt-0.5 line-clamp-2">{notif.message}</p>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0 mt-1" />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

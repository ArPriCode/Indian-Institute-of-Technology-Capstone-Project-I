"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, BookOpen, User, TrendingUp, Settings,
  LogOut, Sparkles, GraduationCap, Users, PlusCircle,
  BarChart3, Bell, MessageSquare, Award
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const STUDENT_NAV: NavItem[] = [
  { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { label: "My Courses", href: "/student/courses", icon: BookOpen },
  { label: "Progress", href: "/student/progress", icon: TrendingUp },
  { label: "Achievements", href: "/student/achievements", icon: Award },
  { label: "Messages", href: "/student/messages", icon: MessageSquare },
  { label: "Profile", href: "/student/profile", icon: User },
  { label: "Settings", href: "/student/settings", icon: Settings },
];

const TEACHER_NAV: NavItem[] = [
  { label: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
  { label: "My Courses", href: "/teacher/courses", icon: BookOpen },
  { label: "Create Course", href: "/teacher/create-course", icon: PlusCircle },
  { label: "Students", href: "/teacher/students", icon: Users },
  { label: "Analytics", href: "/teacher/analytics", icon: BarChart3 },
  { label: "Messages", href: "/teacher/messages", icon: MessageSquare },
  { label: "Profile", href: "/teacher/profile", icon: GraduationCap },
  { label: "Settings", href: "/teacher/settings", icon: Settings },
];

export default function Sidebar() {
  const { userProfile, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isTeacher = userProfile?.role === "teacher";
  const navItems = isTeacher ? TEACHER_NAV : STUDENT_NAV;

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-40 flex flex-col">
      <div className="h-full flex flex-col rounded-none border-r border-white/[0.06] bg-black" style={{ borderLeft: 'none', borderTop: 'none', borderBottom: 'none' }}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">EduNexa</span>
          </Link>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <div className="relative">
              <Image
                src={userProfile?.photoURL || `https://api.dicebear.com/8.x/avataaars/svg?seed=${userProfile?.uid}`}
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full border-2 border-indigo-500/50"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-gray-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">{userProfile?.displayName || "User"}</p>
              <p className="text-white/40 text-xs capitalize">{userProfile?.role || "Student"}</p>
            </div>
            <Bell className="w-4 h-4 text-white/30 hover:text-white/60 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-white"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-indigo-400" : ""}`} />
                  <span className="text-sm font-medium">{label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

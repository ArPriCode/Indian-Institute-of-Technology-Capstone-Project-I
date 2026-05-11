"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  requiredRole?: "student" | "teacher";
}

export default function DashboardLayout({ children, requiredRole }: DashboardLayoutProps) {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  // Only show full spinner while auth is loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50 text-sm">Loading EduNexa...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Always render content — don't block on userProfile
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen overflow-auto bg-black">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

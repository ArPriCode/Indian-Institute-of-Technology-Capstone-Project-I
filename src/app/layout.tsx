import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduNexa — Smart Skill-Based Online Tutoring",
  description:
    "Connect with expert tutors, track your progress, and master new skills with EduNexa's AI-powered learning platform.",
  keywords: "online tutoring, skill learning, education, courses, teachers, students",
  openGraph: {
    title: "EduNexa — Smart Skill-Based Online Tutoring",
    description: "The next-generation learning platform connecting students with expert tutors.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black`}>
        {/* Background orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "rgba(15, 15, 40, 0.95)",
                color: "#fff",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                backdropFilter: "blur(20px)",
                borderRadius: "12px",
              },
              success: {
                iconTheme: { primary: "#10b981", secondary: "#fff" },
              },
              error: {
                iconTheme: { primary: "#ef4444", secondary: "#fff" },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}

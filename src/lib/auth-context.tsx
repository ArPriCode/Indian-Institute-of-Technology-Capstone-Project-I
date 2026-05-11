"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider, githubProvider } from "./firebase";
import toast from "react-hot-toast";

export type UserRole = "student" | "teacher" | null;

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: UserRole;
  bio?: string;
  skills?: string[];
  enrolledCourses?: string[];
  createdCourses?: string[];
  createdAt?: unknown;
  xp?: number;
  level?: number;
  streak?: number;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: (role: UserRole) => Promise<void>;
  signInWithGithub: (role: UserRole) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
      const docSnap = await getDoc(doc(db, "users", uid));
      return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const profile = await fetchUserProfile(firebaseUser.uid);
          if (!profile) {
            const defaultProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || "",
              displayName: firebaseUser.displayName || "User",
              photoURL: firebaseUser.photoURL || `https://api.dicebear.com/8.x/avataaars/svg?seed=${firebaseUser.uid}`,
              role: "student",
              bio: "",
              skills: [],
              enrolledCourses: [],
              createdCourses: [],
              xp: 0,
              level: 1,
              streak: 0,
              createdAt: serverTimestamp(),
            };
            await setDoc(doc(db, "users", firebaseUser.uid), defaultProfile);
            setUserProfile(defaultProfile);
          } else {
            setUserProfile(profile);
          }
        } catch {
          // Firestore error — still show dashboard with basic info
          setUserProfile({
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: firebaseUser.displayName || "User",
            photoURL: firebaseUser.photoURL || "",
            role: "student",
            xp: 0,
            level: 1,
            streak: 0,
          });
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const createUserProfile = async (firebaseUser: User, role: UserRole, extraData?: Partial<UserProfile>) => {
    const docRef = doc(db, "users", firebaseUser.uid);
    const existing = await getDoc(docRef);
    if (!existing.exists()) {
      const profile: UserProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        displayName: firebaseUser.displayName || extraData?.displayName || "User",
        photoURL: firebaseUser.photoURL || `https://api.dicebear.com/8.x/avataaars/svg?seed=${firebaseUser.uid}`,
        role,
        bio: "",
        skills: [],
        enrolledCourses: [],
        createdCourses: [],
        xp: 0,
        level: 1,
        streak: 0,
        createdAt: serverTimestamp(),
        ...extraData,
      };
      await setDoc(docRef, profile);
      setUserProfile(profile);
    } else {
      setUserProfile(existing.data() as UserProfile);
    }
  };

  const signInWithGoogle = async (role: UserRole) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await createUserProfile(result.user, role);
      toast.success(`Welcome to EduNexa, ${result.user.displayName}!`);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Google sign-in failed";
      toast.error(msg);
      throw error;
    }
  };

  const signInWithGithub = async (role: UserRole) => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      await createUserProfile(result.user, role);
      toast.success(`Welcome to EduNexa, ${result.user.displayName}!`);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "GitHub sign-in failed";
      toast.error(msg);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back!");
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Sign-in failed";
      toast.error(msg.replace("Firebase: ", "").replace(/\(auth\/.*\)/, ""));
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      await createUserProfile(result.user, role, { displayName: name });
      toast.success("Account created! Welcome to EduNexa!");
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Sign-up failed";
      toast.error(msg.replace("Firebase: ", "").replace(/\(auth\/.*\)/, ""));
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
    toast.success("Logged out successfully");
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Reset failed";
      toast.error(msg);
      throw error;
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, data, { merge: true });
    setUserProfile((prev) => (prev ? { ...prev, ...data } : null));
    toast.success("Profile updated!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signInWithGoogle,
        signInWithGithub,
        signInWithEmail,
        signUpWithEmail,
        logout,
        resetPassword,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

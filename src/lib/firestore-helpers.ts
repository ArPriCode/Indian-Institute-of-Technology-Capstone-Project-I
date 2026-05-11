import {
  doc, setDoc, getDoc, updateDoc, collection,
  addDoc, query, where, orderBy, onSnapshot,
  serverTimestamp, increment, arrayUnion, getDocs, limit
} from "firebase/firestore";
import { db } from "./firebase";

// ─── User Profile ───────────────────────────────────────────────
export async function updateXP(uid: string, xpGained: number) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, {
    xp: increment(xpGained),
  });
}

export async function updateStreak(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const data = snap.data();
  const lastActive = data.lastActive?.toDate?.() || new Date(0);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - lastActive.getTime()) / 86400000);
  const newStreak = diffDays === 1 ? (data.streak || 0) + 1 : diffDays === 0 ? data.streak : 1;
  await updateDoc(ref, { streak: newStreak, lastActive: serverTimestamp() });
}

// ─── Course Enrollment ───────────────────────────────────────────
export async function enrollCourse(uid: string, courseId: string) {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, { enrolledCourses: arrayUnion(courseId) });
  const enrollRef = doc(db, "enrollments", `${uid}_${courseId}`);
  await setDoc(enrollRef, {
    uid, courseId, enrolledAt: serverTimestamp(), progress: 0, completedLessons: [],
  }, { merge: true });
}

export async function updateLessonProgress(uid: string, courseId: string, lessonIdx: number, totalLessons: number) {
  const enrollRef = doc(db, "enrollments", `${uid}_${courseId}`);
  const snap = await getDoc(enrollRef);
  const completed: number[] = snap.exists() ? (snap.data().completedLessons || []) : [];
  if (!completed.includes(lessonIdx)) completed.push(lessonIdx);
  const progress = Math.round((completed.length / totalLessons) * 100);
  await setDoc(enrollRef, { completedLessons: completed, progress, lastUpdated: serverTimestamp() }, { merge: true });
  await updateXP(uid, 50);
  return progress;
}

export async function getEnrollment(uid: string, courseId: string) {
  const snap = await getDoc(doc(db, "enrollments", `${uid}_${courseId}`));
  return snap.exists() ? snap.data() : null;
}

// ─── Notifications ───────────────────────────────────────────────
export async function createNotification(uid: string, title: string, message: string, type: string = "info") {
  await addDoc(collection(db, "notifications"), {
    uid, title, message, type, read: false, createdAt: serverTimestamp(),
  });
}

export function subscribeNotifications(uid: string, callback: (notifs: unknown[]) => void) {
  const q = query(
    collection(db, "notifications"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc"),
    limit(20)
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function markNotificationRead(notifId: string) {
  await updateDoc(doc(db, "notifications", notifId), { read: true });
}

// ─── Messages ────────────────────────────────────────────────────
export function getChatId(uid1: string, uid2: string) {
  return [uid1, uid2].sort().join("_");
}

export async function sendMessage(fromUid: string, toUid: string, text: string) {
  const chatId = getChatId(fromUid, toUid);
  await addDoc(collection(db, "chats", chatId, "messages"), {
    from: fromUid, to: toUid, text, createdAt: serverTimestamp(), read: false,
  });
  await setDoc(doc(db, "chats", chatId), {
    participants: [fromUid, toUid],
    lastMessage: text,
    lastMessageAt: serverTimestamp(),
  }, { merge: true });
}

export function subscribeMessages(uid1: string, uid2: string, callback: (msgs: unknown[]) => void) {
  const chatId = getChatId(uid1, uid2);
  const q = query(collection(db, "chats", chatId, "messages"), orderBy("createdAt", "asc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

// ─── Quiz ────────────────────────────────────────────────────────
export async function submitQuizResult(uid: string, courseId: string, quizId: string, score: number, total: number) {
  await addDoc(collection(db, "quizResults"), {
    uid, courseId, quizId, score, total, percentage: Math.round((score / total) * 100),
    submittedAt: serverTimestamp(),
  });
  if (score === total) await updateXP(uid, 200);
  else await updateXP(uid, Math.round((score / total) * 100));
}

// ─── Leaderboard ─────────────────────────────────────────────────
export async function getLeaderboard(limitCount = 10) {
  const q = query(collection(db, "users"), orderBy("xp", "desc"), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map((d, i) => ({ rank: i + 1, ...d.data() }));
}

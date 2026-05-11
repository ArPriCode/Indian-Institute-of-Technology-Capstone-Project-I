"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, ArrowRight, Trophy, RotateCcw, Zap } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/auth-context";
import { submitQuizResult } from "@/lib/firestore-helpers";
import { COURSES } from "@/lib/courses-data";
import toast from "react-hot-toast";

const QUIZ_QUESTIONS: Record<string, { q: string; options: string[]; answer: number }[]> = {
  c1: [
    { q: "What hook is used for side effects in React?", options: ["useState", "useEffect", "useContext", "useRef"], answer: 1 },
    { q: "What does JSX stand for?", options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"], answer: 0 },
    { q: "Which method renders a React component to the DOM?", options: ["React.render()", "ReactDOM.render()", "React.mount()", "ReactDOM.mount()"], answer: 1 },
    { q: "What is the correct way to pass data to a child component?", options: ["state", "props", "context", "refs"], answer: 1 },
    { q: "In Next.js App Router, what file defines a page?", options: ["index.tsx", "page.tsx", "route.tsx", "app.tsx"], answer: 1 },
  ],
  c2: [
    { q: "Which library is used for data manipulation in Python?", options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"], answer: 1 },
    { q: "What does ML stand for?", options: ["Machine Language", "Machine Learning", "Model Learning", "Meta Learning"], answer: 1 },
    { q: "Which algorithm is used for classification?", options: ["Linear Regression", "K-Means", "Random Forest", "PCA"], answer: 2 },
    { q: "What is overfitting?", options: ["Model too simple", "Model memorizes training data", "Model has low accuracy", "Model is too fast"], answer: 1 },
    { q: "Which Python library is used for deep learning?", options: ["Pandas", "NumPy", "TensorFlow", "Matplotlib"], answer: 2 },
  ],
  default: [
    { q: "What does API stand for?", options: ["Application Programming Interface", "App Protocol Integration", "Advanced Program Interface", "Application Process Integration"], answer: 0 },
    { q: "What is Git used for?", options: ["Database management", "Version control", "Web hosting", "Code compilation"], answer: 1 },
    { q: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Coded Style Sheets"], answer: 1 },
    { q: "What is a REST API?", options: ["A database", "An architectural style for APIs", "A programming language", "A framework"], answer: 1 },
    { q: "What does HTML stand for?", options: ["HyperText Markup Language", "High Text Machine Language", "HyperText Machine Language", "High Text Markup Language"], answer: 0 },
  ],
};

export default function QuizPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const course = COURSES.find((c) => c.id === courseId);
  const questions = QUIZ_QUESTIONS[courseId as string] || QUIZ_QUESTIONS.default;

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const score = answers.filter((a, i) => a === questions[i].answer).length;

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelected(idx);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setSelected(null);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setSubmitted(true);
      setShowResult(true);
      const finalScore = newAnswers.filter((a, i) => a === questions[i].answer).length;
      if (user) {
        submitQuizResult(user.uid, courseId as string, `quiz_${courseId}`, finalScore, questions.length);
        toast.success(`Quiz complete! +${Math.round((finalScore / questions.length) * 200)} XP`);
      }
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers(Array(questions.length).fill(null));
    setShowResult(false);
    setSubmitted(false);
  };

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <DashboardLayout requiredRole="student">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-1">
            <span className="gradient-text">Quiz</span>
          </h1>
          <p className="text-white/50">{course?.title || "Course Quiz"}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="glass-card p-8"
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-white/50 text-sm">Question {current + 1} of {questions.length}</span>
                <div className="flex gap-1">
                  {questions.map((_, i) => (
                    <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${
                      i < current ? "bg-emerald-500" : i === current ? "bg-indigo-500" : "bg-white/10"
                    }`} />
                  ))}
                </div>
              </div>

              <h2 className="text-white text-xl font-semibold mb-6">{questions[current].q}</h2>

              <div className="space-y-3 mb-8">
                {questions[current].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                      selected === idx
                        ? "bg-indigo-500/20 border-indigo-500/60 text-white"
                        : "glass border-white/10 text-white/70 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                        selected === idx ? "border-indigo-400 bg-indigo-500 text-white" : "border-white/20 text-white/40"
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      {opt}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={selected === null}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold disabled:opacity-40 hover:shadow-lg transition-all"
              >
                {current === questions.length - 1 ? "Submit Quiz" : "Next Question"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 text-center"
            >
              <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl ${
                percentage >= 80 ? "bg-emerald-500/20" : percentage >= 60 ? "bg-yellow-500/20" : "bg-red-500/20"
              }`}>
                {percentage >= 80 ? "🏆" : percentage >= 60 ? "👍" : "📚"}
              </div>

              <h2 className="text-3xl font-bold text-white mb-2">
                {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good Job!" : "Keep Practicing!"}
              </h2>
              <p className="text-white/50 mb-6">You scored {score} out of {questions.length}</p>

              <div className="text-6xl font-bold gradient-text mb-6">{percentage}%</div>

              <div className="flex items-center justify-center gap-2 mb-8 glass rounded-xl p-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">+{Math.round((score / questions.length) * 200)} XP earned!</span>
              </div>

              {/* Answer Review */}
              <div className="space-y-3 mb-8 text-left">
                {questions.map((q, i) => {
                  const isCorrect = answers[i] === q.answer;
                  return (
                    <div key={i} className={`p-3 rounded-xl flex items-start gap-3 ${
                      isCorrect ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-red-500/10 border border-red-500/20"
                    }`}>
                      {isCorrect ? <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />}
                      <div>
                        <p className="text-white text-sm font-medium">{q.q}</p>
                        <p className="text-white/50 text-xs mt-1">Correct: {q.options[q.answer]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button onClick={handleRetry} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass-button text-white font-medium">
                  <RotateCcw className="w-4 h-4" />
                  Retry
                </button>
                <button onClick={() => router.push(`/student/courses/${courseId}`)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium">
                  <Trophy className="w-4 h-4" />
                  Back to Course
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}

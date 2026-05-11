import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function getXPForLevel(level: number): number {
  return level * 500;
}

export function getLevelFromXP(xp: number): number {
  return Math.floor(xp / 500) + 1;
}

export function getProgressPercent(xp: number): number {
  const level = getLevelFromXP(xp);
  const xpForCurrentLevel = (level - 1) * 500;
  const xpForNextLevel = level * 500;
  return Math.round(((xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100);
}

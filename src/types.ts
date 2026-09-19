export type TaskType = 'single' | 'recurring' | 'longterm';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskCategory = 'health' | 'work' | 'learning' | 'creative' | 'social' | 'other';

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  category: TaskCategory;
  xpReward: number;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  streakCount?: number;
  lastCompleted?: string;
  progress?: number; // for longterm tasks 0-100
  targetValue?: number; // for longterm tasks
  currentValue?: number; // for longterm tasks
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  condition: string;
  xpReward: number;
}

export interface User {
  name: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalXp: number;
  streak: number;
  longestStreak: number;
  lastActiveDate: string;
  tasksCompleted: number;
  joinDate: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  tasksCompleted: number;
  streak: number;
}

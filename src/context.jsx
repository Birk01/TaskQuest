import React, { createContext, useContext, useState, useCallback } from 'react';
import { initialUser, initialTasks, initialAchievements } from './data.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(initialUser);
  const [tasks, setTasks] = useState(initialTasks);
  const [achievements, setAchievements] = useState(initialAchievements);

  const addTask = useCallback((task) => {
    setTasks(prev => [...prev, task]);
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === id);
      if (!task) return prev;

      if (!task.completed) {
        setUser(u => {
          const newXp = u.xp + task.xpReward;
          let newLevel = u.level;
          let remainingXp = newXp;
          let xpNeeded = u.xpToNextLevel;

          while (remainingXp >= xpNeeded) {
            remainingXp -= xpNeeded;
            newLevel++;
            xpNeeded = Math.floor(xpNeeded * 1.3);
          }

          return {
            ...u,
            xp: remainingXp,
            xpToNextLevel: xpNeeded,
            level: newLevel,
            totalXp: u.totalXp + task.xpReward,
            tasksCompleted: u.tasksCompleted + 1,
            streak: u.streak + 1,
            longestStreak: Math.max(u.longestStreak, u.streak + 1),
            lastActiveDate: new Date().toISOString().split('T')[0],
          };
        });

        return prev.map(t =>
          t.id === id
            ? {
                ...t,
                completed: true,
                lastCompleted: new Date().toISOString().split('T')[0],
                streakCount: (t.streakCount || 0) + 1,
              }
            : t
        );
      } else {
        return prev.map(t => (t.id === id ? { ...t, completed: false } : t));
      }
    });
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const updateTaskProgress = useCallback((id, value) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id !== id) return t;
        const newProgress = Math.min(100, Math.round((value / (t.targetValue || 100)) * 100));
        return {
          ...t,
          currentValue: value,
          progress: newProgress,
          completed: newProgress >= 100,
        };
      })
    );
  }, []);

  return (
    <AppContext.Provider
      value={{ user, tasks, achievements, addTask, toggleTask, deleteTask, updateTaskProgress }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
}

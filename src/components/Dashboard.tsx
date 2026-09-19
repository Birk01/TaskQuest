import React from 'react';
import { motion } from 'framer-motion';
import { useAppState } from '../context';
import { Flame, Trophy, Target, Zap, TrendingUp, Calendar } from 'lucide-react';

export default function Dashboard() {
  const { user, tasks, achievements } = useAppState();
  
  const todayTasks = tasks.filter(t => !t.completed);
  const completedToday = tasks.filter(t => t.completed && t.lastCompleted === new Date().toISOString().split('T')[0]);
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const xpProgress = (user.xp / user.xpToNextLevel) * 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-blue-600/20 border border-purple-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Привет, {user.name}! {user.avatar}</h2>
            <p className="text-slate-400 mt-1">Уровень {user.level} • Продолжай в том же духе!</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-orange-400">
              <Flame className="w-5 h-5" />
              <span className="text-lg font-bold">{user.streak} дней</span>
            </div>
            <p className="text-xs text-slate-500">Рекорд: {user.longestStreak} дней</p>
          </div>
        </div>
        
        {/* XP Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Опыт до уровня {user.level + 1}</span>
            <span className="text-purple-400 font-medium">{user.xp} / {user.xpToNextLevel} XP</span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Target className="w-5 h-5" />}
          label="Задачи сегодня"
          value={todayTasks.length.toString()}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          icon={<Zap className="w-5 h-5" />}
          label="Выполнено"
          value={completedToday.length.toString()}
          color="from-green-500 to-emerald-500"
        />
        <StatCard
          icon={<Trophy className="w-5 h-5" />}
          label="Достижения"
          value={`${unlockedAchievements.length}/${achievements.length}`}
          color="from-yellow-500 to-orange-500"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Всего XP"
          value={user.totalXp.toString()}
          color="from-purple-500 to-pink-500"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <motion.div variants={itemVariants} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            Задачи на сегодня
          </h3>
          <div className="space-y-3">
            {todayTasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl border border-slate-600/30"
              >
                <div className={`w-3 h-3 rounded-full ${
                  task.priority === 'high' ? 'bg-red-400' :
                  task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{task.title}</p>
                  <p className="text-xs text-slate-400">+{task.xpReward} XP</p>
                </div>
                {task.streakCount && task.streakCount > 0 && (
                  <div className="flex items-center gap-1 text-orange-400">
                    <Flame className="w-3 h-3" />
                    <span className="text-xs font-medium">{task.streakCount}</span>
                  </div>
                )}
              </div>
            ))}
            {todayTasks.length === 0 && (
              <p className="text-center text-slate-500 py-4">Все задачи выполнены! 🎉</p>
            )}
          </div>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div variants={itemVariants} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Последние достижения
          </h3>
          <div className="space-y-3">
            {unlockedAchievements.slice(-4).reverse().map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl border border-slate-600/30"
              >
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{achievement.title}</p>
                  <p className="text-xs text-slate-400">{achievement.description}</p>
                </div>
                <span className="text-xs text-yellow-400 font-medium">+{achievement.xpReward} XP</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Active Streaks */}
      <motion.div variants={itemVariants} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-400" />
          Активные серии
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tasks.filter(t => t.type === 'recurring' && (t.streakCount || 0) > 0).map((task) => (
            <div
              key={task.id}
              className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-white truncate">{task.title}</p>
                <span className="text-lg">🔥</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-orange-400">{task.streakCount}</span>
                <span className="text-xs text-slate-400">дней подряд</span>
              </div>
              <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-red-400 rounded-full"
                  style={{ width: `${Math.min(100, ((task.streakCount || 0) / 30) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-slate-400 mt-1">{label}</p>
    </div>
  );
}

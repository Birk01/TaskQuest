import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppState } from '../context';
import { Lock, Unlock, Sparkles } from 'lucide-react';

export default function Achievements() {
  const { achievements } = useAppState();
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const filtered = achievements.filter(a => {
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return true;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalXpEarned = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Достижения</h2>
          <p className="text-slate-400 text-sm mt-1">
            {unlockedCount} из {achievements.length} открыто • {totalXpEarned} XP заработано
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">Общий прогресс</span>
          </div>
          <span className="text-yellow-400 font-bold">{Math.round((unlockedCount / achievements.length) * 100)}%</span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex bg-slate-800 border border-slate-700 rounded-xl overflow-hidden w-fit">
        {(['all', 'unlocked', 'locked'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              filter === f
                ? 'bg-yellow-600/30 text-yellow-300'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {f === 'all' ? 'Все' : f === 'unlocked' ? 'Открытые' : 'Закрытые'}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filtered.map((achievement) => (
          <motion.div
            key={achievement.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`relative rounded-2xl p-5 border transition-all ${
              achievement.unlocked
                ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                : 'bg-slate-800/50 border-slate-700 opacity-60'
            }`}
          >
            {/* Icon */}
            <div className={`text-4xl mb-3 ${achievement.unlocked ? '' : 'grayscale'}`}>
              {achievement.icon}
            </div>

            {/* Status indicator */}
            <div className="absolute top-3 right-3">
              {achievement.unlocked ? (
                <Unlock className="w-4 h-4 text-yellow-400" />
              ) : (
                <Lock className="w-4 h-4 text-slate-500" />
              )}
            </div>

            {/* Content */}
            <h3 className={`font-semibold ${achievement.unlocked ? 'text-white' : 'text-slate-400'}`}>
              {achievement.title}
            </h3>
            <p className="text-sm text-slate-400 mt-1">{achievement.description}</p>

            {/* XP Reward */}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-purple-400 font-medium">+{achievement.xpReward} XP</span>
              {achievement.unlocked && achievement.unlockedAt && (
                <span className="text-xs text-slate-500">{achievement.unlockedAt}</span>
              )}
            </div>

            {/* Glow effect for unlocked */}
            {achievement.unlocked && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-yellow-500/5 to-transparent pointer-events-none" />
            )}
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">Нет достижений в этой категории</p>
        </div>
      )}
    </motion.div>
  );
}

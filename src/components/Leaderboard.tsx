import React from 'react';
import { motion } from 'framer-motion';
import { leaderboardData } from '../data';
import { useAppState } from '../context';
import { Crown, Flame, Trophy, Medal, TrendingUp } from 'lucide-react';

export default function Leaderboard() {
  const { user } = useAppState();
  
  const sorted = [...leaderboardData].sort((a, b) => b.xp - a.xp);
  const userRank = sorted.findIndex(e => e.name === user.name) + 1;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (index === 1) return <Medal className="w-5 h-5 text-slate-300" />;
    if (index === 2) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="text-sm font-bold text-slate-500 w-5 text-center">{index + 1}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Рейтинг</h2>
        <p className="text-slate-400 text-sm mt-1">Соревнуйтесь с другими игроками</p>
      </div>

      {/* Your Position */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-2xl p-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-2xl">
              {user.avatar}
            </div>
            <div>
              <p className="text-white font-semibold">{user.name} (Вы)</p>
              <p className="text-sm text-slate-400">Уровень {user.level} • {user.totalXp} XP</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-purple-400">#{userRank}</p>
            <p className="text-xs text-slate-500">место</p>
          </div>
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4">
        {sorted.slice(0, 3).map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`text-center p-4 rounded-2xl border ${
              index === 0
                ? 'bg-gradient-to-b from-yellow-500/20 to-yellow-600/5 border-yellow-500/30 order-2'
                : index === 1
                ? 'bg-gradient-to-b from-slate-400/10 to-slate-500/5 border-slate-500/30 order-1'
                : 'bg-gradient-to-b from-amber-700/10 to-amber-800/5 border-amber-600/30 order-3'
            }`}
          >
            <div className="text-3xl mb-2">{entry.avatar}</div>
            <p className="text-sm font-medium text-white truncate">{entry.name}</p>
            <p className="text-xs text-slate-400 mt-1">Ур. {entry.level}</p>
            <div className="mt-2 flex items-center justify-center gap-1">
              {index === 0 ? (
                <Crown className="w-4 h-4 text-yellow-400" />
              ) : index === 1 ? (
                <Medal className="w-4 h-4 text-slate-300" />
              ) : (
                <Medal className="w-4 h-4 text-amber-600" />
              )}
              <span className="text-sm font-bold text-white">{entry.xp} XP</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Leaderboard */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden"
      >
        <div className="p-4 border-b border-slate-700 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <h3 className="text-white font-semibold">Полный рейтинг</h3>
        </div>
        
        <div className="divide-y divide-slate-700/50">
          {sorted.map((entry, index) => {
            const isCurrentUser = entry.name === user.name;
            return (
              <motion.div
                key={entry.id}
                variants={itemVariants}
                className={`flex items-center gap-4 p-4 transition-all ${
                  isCurrentUser ? 'bg-purple-500/10' : 'hover:bg-slate-700/30'
                }`}
              >
                {/* Rank */}
                <div className="w-8 flex justify-center">
                  {getRankIcon(index)}
                </div>

                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                  isCurrentUser
                    ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
                    : 'bg-slate-700'
                }`}>
                  {entry.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${isCurrentUser ? 'text-purple-300' : 'text-white'}`}>
                    {entry.name} {isCurrentUser && '(Вы)'}
                  </p>
                  <p className="text-xs text-slate-400">Уровень {entry.level}</p>
                </div>

                {/* Stats */}
                <div className="hidden sm:flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <TrendingUp className="w-3 h-3" />
                    {entry.tasksCompleted} задач
                  </div>
                  <div className="flex items-center gap-1 text-xs text-orange-400">
                    <Flame className="w-3 h-3" />
                    {entry.streak} дней
                  </div>
                </div>

                {/* XP */}
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{entry.xp.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">XP</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

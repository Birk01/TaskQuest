import React, { useState } from 'react';
import { useAppState } from '../context.jsx';
import { Lock, Unlock, Sparkles } from 'lucide-react';

export default function Achievements() {
  const { achievements } = useAppState();
  const [filter, setFilter] = useState('all');

  const filtered = achievements.filter(a => {
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return true;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalXpEarned = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
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
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000"
            style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex bg-slate-800 border border-slate-700 rounded-xl overflow-hidden w-fit">
        {['all', 'unlocked', 'locked'].map((f) => (
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((achievement) => (
          <div
            key={achievement.id}
            className={`relative rounded-2xl p-5 border transition-all hover:scale-[1.02] hover:-translate-y-0.5 ${
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
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">Нет достижений в этой категории</p>
        </div>
      )}
    </div>
  );
}

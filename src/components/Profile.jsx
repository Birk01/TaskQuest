import React, { useState } from 'react';
import { useAppState } from '../context.jsx';
import { Flame, Trophy, Target, Zap, Calendar, Award, Edit3, Save, X } from 'lucide-react';

export default function Profile() {
  const { user, tasks, achievements } = useAppState();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);

  const avatarOptions = ['🧙‍♂️', '🦸‍♂️', '🧝‍♂️', '🦹‍♂️', '🧑‍🚀', '🧑‍💻', '🦊', '🐉', '🦅', '🐺', '🌟', '⚔️'];
  
  const xpProgress = (user.xp / user.xpToNextLevel) * 100;
  const daysSinceJoin = Math.floor(
    (new Date().getTime() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Profile Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-5xl shadow-xl shadow-purple-500/20">
              {avatar}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-lg">
              Ур. {user.level}
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-white text-xl font-bold focus:outline-none focus:border-purple-500"
                />
                <div className="flex flex-wrap gap-2">
                  {avatarOptions.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAvatar(a)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                        avatar === a ? 'bg-purple-600 ring-2 ring-purple-400' : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm"
                  >
                    <Save className="w-3 h-3" /> Сохранить
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 text-slate-300 rounded-lg text-sm"
                  >
                    <X className="w-3 h-3" /> Отмена
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-slate-400 hover:text-purple-400 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-slate-400 mt-1">Участник с {user.joinDate}</p>
              </>
            )}

            <div className="mt-4 max-w-md">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Уровень {user.level}</span>
                <span className="text-purple-400">{user.xp}/{user.xpToNextLevel} XP</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBlock
          icon={<Flame className="w-5 h-5 text-orange-400" />}
          label="Текущая серия"
          value={`${user.streak} дней`}
          sublabel={`Рекорд: ${user.longestStreak}`}
        />
        <StatBlock
          icon={<Target className="w-5 h-5 text-blue-400" />}
          label="Задач выполнено"
          value={user.tasksCompleted.toString()}
          sublabel={`Активных: ${tasks.filter(t => !t.completed).length}`}
        />
        <StatBlock
          icon={<Trophy className="w-5 h-5 text-yellow-400" />}
          label="Достижений"
          value={`${achievements.filter(a => a.unlocked).length}/${achievements.length}`}
          sublabel={`${Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}% открыто`}
        />
        <StatBlock
          icon={<Zap className="w-5 h-5 text-purple-400" />}
          label="Всего XP"
          value={user.totalXp.toLocaleString()}
          sublabel={`${daysSinceJoin} дней в игре`}
        />
      </div>

      {/* Level History */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-400" />
          Прогресс по уровням
        </h3>
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(user.level, 10) }, (_, i) => (
            <div
              key={i}
              className={`h-8 rounded-md flex-1 ${
                i < user.level - 1
                  ? 'bg-gradient-to-t from-purple-600 to-indigo-500'
                  : 'bg-gradient-to-t from-purple-500/50 to-indigo-400/50'
              }`}
              style={{ minHeight: `${20 + (i * 8)}px` }}
            />
          ))}
          <div
            className="h-8 rounded-md flex-1 bg-slate-700 border-2 border-dashed border-slate-600"
            style={{ minHeight: `${20 + (user.level * 8)}px` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-slate-500">Ур. 1</span>
          <span className="text-xs text-purple-400 font-medium">Ур. {user.level}</span>
          <span className="text-xs text-slate-500">Ур. {user.level + 1}</span>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          Активность за неделю
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, i) => {
            const isActive = i < 5;
            return (
              <div key={day} className="text-center">
                <p className="text-xs text-slate-500 mb-2">{day}</p>
                <div
                  className={`h-12 rounded-lg ${
                    isActive
                      ? 'bg-gradient-to-t from-green-600 to-green-400'
                      : 'bg-slate-700'
                  }`}
                />
                {isActive && (
                  <p className="text-xs text-green-400 mt-1">✓</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatBlock({ icon, label, value, sublabel }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-slate-400">{label}</span>
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{sublabel}</p>
    </div>
  );
}

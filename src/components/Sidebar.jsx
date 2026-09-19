import React from 'react';
import { Home, ListTodo, Trophy, Users, Flame, Target } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Главная', icon: Home },
  { id: 'tasks', label: 'Задачи', icon: ListTodo },
  { id: 'achievements', label: 'Достижения', icon: Trophy },
  { id: 'leaderboard', label: 'Рейтинг', icon: Users },
];

export default function Sidebar({ currentPage, onNavigate, streak }) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 flex flex-col z-50">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">TaskQuest</h1>
            <p className="text-xs text-slate-400">Превращай цели в игру</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/30 text-white border border-purple-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-purple-400" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-400" />
            <div>
              <p className="text-sm text-slate-400">Текущая серия</p>
              <p className="text-2xl font-bold text-white">{streak} <span className="text-sm font-normal text-slate-400">дней</span></p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

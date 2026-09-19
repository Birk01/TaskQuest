import React, { useState } from 'react';
import { useAppState } from '../context.jsx';
import { Plus, Trash2, Check, Flame, Target, Repeat, Calendar, X, Filter } from 'lucide-react';

let idCounter = 100;
function generateId() {
  return String(++idCounter + Date.now());
}

export default function Tasks() {
  const { tasks, addTask, toggleTask, deleteTask, updateTaskProgress } = useAppState();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'single',
    priority: 'medium',
    category: 'other',
    xpReward: 25,
    targetValue: 100,
  });

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    if (typeFilter !== 'all' && t.type !== typeFilter) return false;
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: generateId(),
      title: formData.title,
      description: formData.description,
      type: formData.type,
      priority: formData.priority,
      category: formData.category,
      xpReward: formData.xpReward,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0],
      streakCount: 0,
      progress: 0,
      targetValue: formData.type === 'longterm' ? formData.targetValue : undefined,
      currentValue: 0,
    };
    addTask(newTask);
    setShowForm(false);
    setFormData({
      title: '',
      description: '',
      type: 'single',
      priority: 'medium',
      category: 'other',
      xpReward: 25,
      targetValue: 100,
    });
  };

  const categoryColors = {
    health: 'bg-green-500/20 text-green-400 border-green-500/30',
    work: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    learning: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    creative: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    social: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    other: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  };

  const categoryLabels = {
    health: 'Здоровье',
    work: 'Работа',
    learning: 'Обучение',
    creative: 'Творчество',
    social: 'Общение',
    other: 'Другое',
  };

  const typeIcons = {
    single: <Target className="w-4 h-4" />,
    recurring: <Repeat className="w-4 h-4" />,
    longterm: <Calendar className="w-4 h-4" />,
  };

  const typeLabels = {
    single: 'Разовая',
    recurring: 'Повторяющаяся',
    longterm: 'Долгосрочная',
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Задачи</h2>
          <p className="text-slate-400 text-sm mt-1">
            {tasks.filter(t => !t.completed).length} активных • {tasks.filter(t => t.completed).length} выполнено
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-purple-500/20 hover:scale-105 transition-transform"
        >
          <Plus className="w-5 h-5" />
          Новая задача
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-purple-600/30 text-purple-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {f === 'all' ? 'Все' : f === 'active' ? 'Активные' : 'Выполненные'}
            </button>
          ))}
        </div>
        <div className="flex bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          {['all', 'single', 'recurring', 'longterm'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-2 text-sm font-medium transition-all flex items-center gap-1 ${
                typeFilter === t
                  ? 'bg-indigo-600/30 text-indigo-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t === 'all' ? <><Filter className="w-3 h-3" /> Все</> : <>{typeIcons[t]} {typeLabels[t]}</>}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`bg-slate-800/50 border rounded-xl p-4 transition-all hover:translate-x-1 ${
              task.completed
                ? 'border-green-500/30 bg-green-500/5'
                : 'border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Checkbox */}
              <button
                onClick={() => toggleTask(task.id)}
                className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all hover:scale-110 ${
                  task.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-slate-500 hover:border-purple-400'
                }`}
              >
                {task.completed && <Check className="w-4 h-4" />}
              </button>

              {/* Task Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className={`font-medium ${task.completed ? 'text-slate-500 line-through' : 'text-white'}`}>
                    {task.title}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[task.category]}`}>
                    {categoryLabels[task.category]}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 flex items-center gap-1">
                    {typeIcons[task.type]}
                    {typeLabels[task.type]}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1">{task.description}</p>
                
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-purple-400 font-medium flex items-center gap-1">
                    ⚡ +{task.xpReward} XP
                  </span>
                  {task.streakCount && task.streakCount > 0 && (
                    <span className="text-xs text-orange-400 font-medium flex items-center gap-1">
                      <Flame className="w-3 h-3" /> {task.streakCount} дней
                    </span>
                  )}
                  {task.dueDate && (
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> до {task.dueDate}
                    </span>
                  )}
                  {task.priority === 'high' && (
                    <span className="text-xs text-red-400">● Высокий</span>
                  )}
                </div>

                {/* Long-term progress */}
                {task.type === 'longterm' && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Прогресс</span>
                      <span className="text-purple-400">{task.currentValue}/{task.targetValue} ({task.progress}%)</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={task.targetValue || 100}
                      value={task.currentValue || 0}
                      onChange={(e) => updateTaskProgress(task.id, Number(e.target.value))}
                      className="w-full mt-2 accent-purple-500 h-1"
                    />
                  </div>
                )}
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteTask(task.id)}
                className="text-slate-500 hover:text-red-400 transition-colors p-1 hover:scale-110"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">Нет задач</p>
          <p className="text-slate-600 text-sm mt-1">Создайте первую задачу, чтобы начать!</p>
        </div>
      )}

      {/* Add Task Modal */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={() => setShowForm(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scaleIn"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Новая задача</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Название</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  placeholder="Что нужно сделать?"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Описание</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                  rows={2}
                  placeholder="Подробности..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Тип</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="single">Разовая</option>
                    <option value="recurring">Повторяющаяся</option>
                    <option value="longterm">Долгосрочная</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Приоритет</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Категория</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="health">Здоровье</option>
                    <option value="work">Работа</option>
                    <option value="learning">Обучение</option>
                    <option value="creative">Творчество</option>
                    <option value="social">Общение</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Награда XP</label>
                  <input
                    type="number"
                    min="5"
                    max="500"
                    value={formData.xpReward}
                    onChange={(e) => setFormData({ ...formData, xpReward: Number(e.target.value) })}
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {formData.type === 'longterm' && (
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Целевое значение</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.targetValue}
                    onChange={(e) => setFormData({ ...formData, targetValue: Number(e.target.value) })}
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                    placeholder="1000"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-transform"
              >
                Создать задачу
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

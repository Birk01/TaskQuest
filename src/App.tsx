import React, { useState } from 'react';
import { AppProvider, useAppState } from './context';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Achievements from './components/Achievements';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import Architecture from './components/Architecture';
import { User } from 'lucide-react';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { user } = useAppState();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <Tasks />;
      case 'achievements':
        return <Achievements />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile />;
      case 'architecture':
        return <Architecture />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          streak={user.streak}
        />
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pb-20 lg:pb-8">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="lg:hidden flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">T</span>
              </div>
              <h1 className="text-lg font-bold text-white">TaskQuest</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Level Badge */}
              <div className="hidden sm:flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5">
                <span className="text-xs text-slate-400">Ур.</span>
                <span className="text-sm font-bold text-purple-400">{user.level}</span>
                <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                    style={{ width: `${(user.xp / user.xpToNextLevel) * 100}%` }}
                  />
                </div>
              </div>

              {/* Profile Button */}
              <button
                onClick={() => setCurrentPage('profile')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${
                  currentPage === 'profile'
                    ? 'bg-purple-600/20 border border-purple-500/30'
                    : 'bg-slate-800 border border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-sm">
                  {user.avatar}
                </div>
                <span className="hidden sm:block text-sm text-white font-medium">{user.name}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          {renderPage()}
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

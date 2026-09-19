import React from 'react';
import { motion } from 'framer-motion';
import { 
  Server, Database, Brain, MessageSquare, Shield, Cloud, 
  Cpu, Layers, GitBranch, Zap, Globe, Users, 
  CheckCircle2, Circle, ArrowRight, Sparkles, Bot
} from 'lucide-react';

export default function Architecture() {
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
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white">Архитектура проекта</h2>
        <p className="text-slate-400 text-sm mt-1">
          План развития TaskQuest с бекендом и ИИ-ассистентом
        </p>
      </motion.div>

      {/* Current vs Planned */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-6">
        {/* Current State */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <h3 className="text-lg font-semibold text-white">Текущее состояние</h3>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Готово</span>
          </div>
          
          <div className="space-y-3">
            <TechItem icon={<Globe className="w-4 h-4" />} label="Frontend (React + TypeScript)" status="done" />
            <TechItem icon={<Layers className="w-4 h-4" />} label="UI компоненты и анимации" status="done" />
            <TechItem icon={<Zap className="w-4 h-4" />} label="Геймификация (уровни, XP, streaks)" status="done" />
            <TechItem icon={<Users className="w-4 h-4" />} label="Лидерборд и достижения" status="done" />
            <TechItem icon={<Database className="w-4 h-4" />} label="Локальное хранение данных" status="done" />
          </div>
        </div>

        {/* Planned State */}
        <div className="bg-slate-800/50 border border-purple-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
            <h3 className="text-lg font-semibold text-white">Планируется</h3>
            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">В разработке</span>
          </div>
          
          <div className="space-y-3">
            <TechItem icon={<Server className="w-4 h-4" />} label="Backend API (Node.js/Express)" status="planned" />
            <TechItem icon={<Database className="w-4 h-4" />} label="База данных (PostgreSQL/MongoDB)" status="planned" />
            <TechItem icon={<Shield className="w-4 h-4" />} label="Аутентификация (JWT/OAuth)" status="planned" />
            <TechItem icon={<Brain className="w-4 h-4" />} label="ИИ-ассистент (OpenAI API)" status="planned" />
            <TechItem icon={<Cloud className="w-4 h-4" />} label="Деплой (Docker + Cloud)" status="planned" />
          </div>
        </div>
      </motion.div>

      {/* Architecture Diagram */}
      <motion.div variants={itemVariants} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-400" />
          Архитектура системы
        </h3>

        <div className="space-y-6">
          {/* Frontend Layer */}
          <div className="border border-blue-500/30 rounded-xl p-4 bg-blue-500/5">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">Frontend Layer</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <MiniBlock label="React 18" />
              <MiniBlock label="TypeScript" />
              <MiniBlock label="Tailwind CSS" />
              <MiniBlock label="Framer Motion" />
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-5 h-5 text-slate-500 rotate-90" />
          </div>

          {/* Backend Layer */}
          <div className="border border-green-500/30 rounded-xl p-4 bg-green-500/5">
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold text-green-400">Backend Layer (API)</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <MiniBlock label="Node.js" />
              <MiniBlock label="Express.js" />
              <MiniBlock label="REST API" />
              <MiniBlock label="WebSocket" />
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-5 h-5 text-slate-500 rotate-90" />
          </div>

          {/* Data Layer */}
          <div className="border border-yellow-500/30 rounded-xl p-4 bg-yellow-500/5">
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400">Data Layer</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <MiniBlock label="PostgreSQL" />
              <MiniBlock label="Redis Cache" />
              <MiniBlock label="Prisma ORM" />
              <MiniBlock label="S3 Storage" />
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-5 h-5 text-slate-500 rotate-90" />
          </div>

          {/* AI Layer */}
          <div className="border border-purple-500/30 rounded-xl p-4 bg-purple-500/5">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400">AI Layer (ИИ-ассистент)</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <MiniBlock label="OpenAI GPT-4" />
              <MiniBlock label="LangChain" />
              <MiniBlock label="Vector DB" />
              <MiniBlock label="Prompt Engine" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Assistant Features */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="w-6 h-6 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">ИИ-ассистент: Возможности</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FeatureCard
            icon={<Sparkles className="w-5 h-5" />}
            title="Умные рекомендации"
            description="Анализирует ваши задачи и предлагает оптимальный порядок выполнения на основе приоритетов и дедлайнов"
          />
          <FeatureCard
            icon={<MessageSquare className="w-5 h-5" />}
            title="Мотивационный чат"
            description="Поддерживает диалог, мотивирует продолжать, даёт советы по продуктивности"
          />
          <FeatureCard
            icon={<Cpu className="w-5 h-5" />}
            title="Разбивка задач"
            description="Помогает разбить большие цели на мелкие шаги с оценкой времени"
          />
          <FeatureCard
            icon={<GitBranch className="w-5 h-5" />}
            title="Анализ паттернов"
            description="Выявляет закономерности в вашей продуктивности и предлагает улучшения"
          />
        </div>

        {/* Chat Preview */}
        <div className="mt-6 bg-slate-900/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">TaskQuest AI</p>
              <p className="text-xs text-slate-500">Ваш персональный помощник</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
              <p className="text-sm text-slate-300">
                Привет! 👋 Вижу, что у тебя серия из 12 дней — это отлично! 
                Сегодня рекомендую начать с утренней зарядки, а затем перейти к чтению. 
                Хочешь, помогу спланировать день?
              </p>
            </div>
            <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-3 ml-8">
              <p className="text-sm text-slate-300">
                Да, давай спланируем!
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Backend API Structure */}
      <motion.div variants={itemVariants} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Server className="w-5 h-5 text-green-400" />
          Структура Backend API
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-green-400 mb-2">Endpoints</h4>
            <CodeBlock code="POST   /api/auth/register" />
            <CodeBlock code="POST   /api/auth/login" />
            <CodeBlock code="GET    /api/users/:id" />
            <CodeBlock code="GET    /api/tasks" />
            <CodeBlock code="POST   /api/tasks" />
            <CodeBlock code="PATCH  /api/tasks/:id" />
            <CodeBlock code="DELETE /api/tasks/:id" />
            <CodeBlock code="GET    /api/achievements" />
            <CodeBlock code="POST   /api/chat/message" />
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-purple-400 mb-2">AI Endpoints</h4>
            <CodeBlock code="POST   /api/ai/chat" />
            <CodeBlock code="POST   /api/ai/suggest" />
            <CodeBlock code="POST   /api/ai/breakdown" />
            <CodeBlock code="GET    /api/ai/analyze" />
            <CodeBlock code="POST   /api/ai/motivate" />
          </div>
        </div>
      </motion.div>

      {/* Database Schema */}
      <motion.div variants={itemVariants} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-yellow-400" />
          Схема базы данных
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <SchemaBlock
            title="users"
            fields={['id (UUID)', 'email', 'password_hash', 'name', 'avatar', 'level', 'xp', 'streak', 'created_at']}
          />
          <SchemaBlock
            title="tasks"
            fields={['id (UUID)', 'user_id (FK)', 'title', 'description', 'type', 'priority', 'category', 'xp_reward', 'completed', 'streak_count', 'created_at']}
          />
          <SchemaBlock
            title="chat_messages"
            fields={['id (UUID)', 'user_id (FK)', 'role', 'content', 'timestamp', 'context']}
          />
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div variants={itemVariants} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Рекомендуемый стек технологий</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StackSection
            title="Frontend"
            color="blue"
            items={['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Query']}
          />
          <StackSection
            title="Backend"
            color="green"
            items={['Node.js', 'Express.js', 'Prisma ORM', 'JWT Auth', 'WebSocket']}
          />
          <StackSection
            title="Database"
            color="yellow"
            items={['PostgreSQL', 'Redis', 'Supabase', 'S3 Storage']}
          />
          <StackSection
            title="AI & ML"
            color="purple"
            items={['OpenAI API', 'LangChain', 'Pinecone', 'Hugging Face']}
          />
        </div>
      </motion.div>

      {/* Deployment */}
      <motion.div variants={itemVariants} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Cloud className="w-5 h-5 text-cyan-400" />
          Деплой и инфраструктура
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-700/30 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2">Development</h4>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>• Vite dev server</li>
              <li>• Hot reload</li>
              <li>• Local PostgreSQL</li>
              <li>• Mock AI responses</li>
            </ul>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2">Staging</h4>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>• Docker containers</li>
              <li>• Test database</li>
              <li>• CI/CD pipeline</li>
              <li>• Monitoring</li>
            </ul>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2">Production</h4>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>• AWS/Vercel/Railway</li>
              <li>• CDN for frontend</li>
              <li>• Auto-scaling</li>
              <li>• Backup & recovery</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Следующие шаги</h3>
        
        <div className="space-y-3">
          <StepItem number={1} title="Настроить backend" description="Создать Express.js сервер с базовой структурой" />
          <StepItem number={2} title="Подключить базу данных" description="Настроить PostgreSQL и Prisma ORM" />
          <StepItem number={3} title="Реализовать аутентификацию" description="JWT токены, регистрация, вход" />
          <StepItem number={4} title="Миграция данных" description="Перенести логику из localStorage на API" />
          <StepItem number={5} title="Интеграция ИИ" description="Подключить OpenAI API, создать чат-интерфейс" />
          <StepItem number={6} title="Тестирование" description="Unit тесты, интеграционные тесты, E2E" />
          <StepItem number={7} title="Деплой" description="Docker, CI/CD, мониторинг" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function TechItem({ icon, label, status }: { icon: React.ReactNode; label: string; status: 'done' | 'planned' }) {
  return (
    <div className="flex items-center gap-3">
      <div className={status === 'done' ? 'text-green-400' : 'text-purple-400'}>
        {icon}
      </div>
      <span className="text-sm text-slate-300 flex-1">{label}</span>
      {status === 'done' ? (
        <CheckCircle2 className="w-4 h-4 text-green-400" />
      ) : (
        <Circle className="w-4 h-4 text-purple-400" />
      )}
    </div>
  );
}

function MiniBlock({ label }: { label: string }) {
  return (
    <div className="bg-slate-800/50 border border-slate-600/30 rounded-lg px-3 py-2 text-xs text-slate-300 text-center">
      {label}
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
      <div className="text-purple-400 mb-2">{icon}</div>
      <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 font-mono text-xs text-slate-300">
      {code}
    </div>
  );
}

function SchemaBlock({ title, fields }: { title: string; fields: string[] }) {
  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
      <h4 className="text-sm font-semibold text-yellow-400 mb-2 font-mono">{title}</h4>
      <div className="space-y-1">
        {fields.map((field, i) => (
          <div key={i} className="text-xs text-slate-400 font-mono">
            {field}
          </div>
        ))}
      </div>
    </div>
  );
}

function StackSection({ title, color, items }: { title: string; color: string; items: string[] }) {
  const colorClasses: Record<string, string> = {
    blue: 'text-blue-400 border-blue-500/30',
    green: 'text-green-400 border-green-500/30',
    yellow: 'text-yellow-400 border-yellow-500/30',
    purple: 'text-purple-400 border-purple-500/30',
  };

  return (
    <div className={`bg-slate-700/30 rounded-xl p-4 border ${colorClasses[color]}`}>
      <h4 className={`text-sm font-semibold mb-2 ${colorClasses[color].split(' ')[0]}`}>{title}</h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-xs text-slate-400">• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function StepItem({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        {number}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
    </div>
  );
}

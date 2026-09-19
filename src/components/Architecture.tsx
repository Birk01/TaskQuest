import React from 'react';
import { motion } from 'framer-motion';
import { 
  Server, Database, Brain, MessageSquare, Shield, Cloud, 
  Cpu, Layers, GitBranch, Zap, Globe, Users, 
  CheckCircle2, Circle, ArrowRight, Sparkles, Bot, Code2
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
          План развития TaskQuest: React + FastAPI + ИИ-ассистент
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
            <TechItem icon={<Code2 className="w-4 h-4" />} label="Backend API (Python + FastAPI)" status="planned" />
            <TechItem icon={<Database className="w-4 h-4" />} label="База данных (PostgreSQL + SQLAlchemy)" status="planned" />
            <TechItem icon={<Shield className="w-4 h-4" />} label="Аутентификация (JWT + OAuth2)" status="planned" />
            <TechItem icon={<Brain className="w-4 h-4" />} label="ИИ-ассистент (OpenAI + LangChain)" status="planned" />
            <TechItem icon={<Cloud className="w-4 h-4" />} label="Деплой (Docker + Railway)" status="planned" />
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

          {/* Backend Layer - FastAPI */}
          <div className="border border-green-500/30 rounded-xl p-4 bg-green-500/5">
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold text-green-400">Backend Layer (FastAPI)</span>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full ml-auto">Python 3.11+</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <MiniBlock label="FastAPI" />
              <MiniBlock label="Pydantic v2" />
              <MiniBlock label="SQLAlchemy" />
              <MiniBlock label="Alembic" />
              <MiniBlock label="Uvicorn" />
              <MiniBlock label="WebSocket" />
              <MiniBlock label="Celery" />
              <MiniBlock label="Redis" />
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
              <MiniBlock label="SQLAlchemy ORM" />
              <MiniBlock label="S3 / MinIO" />
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
              <MiniBlock label="ChromaDB" />
              <MiniBlock label="Prompt Templates" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* FastAPI Code Preview */}
      <motion.div variants={itemVariants} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-green-400" />
          Пример FastAPI кода
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-400 mb-2 font-medium">main.py — точка входа</p>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-xs overflow-x-auto">
              <pre className="text-slate-300">
{`from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import (
    auth, users, tasks, 
    achievements, ai
)

app = FastAPI(
    title="TaskQuest API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(tasks.router)
app.include_router(achievements.router)
app.include_router(ai.router)`}
              </pre>
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-400 mb-2 font-medium">models/task.py — SQLAlchemy модель</p>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-xs overflow-x-auto">
              <pre className="text-slate-300">
{`from sqlalchemy import Column, String, ...
from app.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey(...))
    title = Column(String, nullable=False)
    description = Column(Text)
    type = Column(Enum(TaskType))
    priority = Column(Enum(Priority))
    category = Column(Enum(Category))
    xp_reward = Column(Integer, default=25)
    completed = Column(Boolean, default=False)
    streak_count = Column(Integer, default=0)
    progress = Column(Integer)
    created_at = Column(DateTime, default=now)`}
              </pre>
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
            description="Анализирует задачи и предлагает оптимальный порядок выполнения на основе приоритетов и дедлайнов"
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
            description="Выявляет закономерности в продуктивности и предлагает улучшения"
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
              <p className="text-xs text-slate-500">Ваш персональный помощник (powered by GPT-4)</p>
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
          FastAPI Endpoints
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-green-400 mb-2">Core Endpoints</h4>
            <CodeBlock code="POST   /api/auth/register" />
            <CodeBlock code="POST   /api/auth/login" />
            <CodeBlock code="POST   /api/auth/refresh" />
            <CodeBlock code="GET    /api/users/me" />
            <CodeBlock code="PATCH  /api/users/me" />
            <CodeBlock code="GET    /api/tasks" />
            <CodeBlock code="POST   /api/tasks" />
            <CodeBlock code="PATCH  /api/tasks/{id}" />
            <CodeBlock code="DELETE /api/tasks/{id}" />
            <CodeBlock code="GET    /api/achievements" />
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-purple-400 mb-2">AI Endpoints</h4>
            <CodeBlock code="POST   /api/ai/chat" />
            <CodeBlock code="POST   /api/ai/suggest" />
            <CodeBlock code="POST   /api/ai/breakdown" />
            <CodeBlock code="GET    /api/ai/analyze" />
            <CodeBlock code="POST   /api/ai/motivate" />
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">WebSocket</h4>
              <CodeBlock code="WS     /api/ws/chat/{user_id}" />
              <CodeBlock code="WS     /api/ws/notifications" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Database Schema */}
      <motion.div variants={itemVariants} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-yellow-400" />
          Схема базы данных (SQLAlchemy)
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <SchemaBlock
            title="users"
            fields={['id: UUID (PK)', 'email: String (unique)', 'password_hash: String', 'name: String', 'avatar: String', 'level: Integer', 'xp: Integer', 'streak: Integer', 'created_at: DateTime']}
          />
          <SchemaBlock
            title="tasks"
            fields={['id: UUID (PK)', 'user_id: UUID (FK)', 'title: String', 'type: Enum', 'priority: Enum', 'category: Enum', 'xp_reward: Integer', 'completed: Boolean', 'streak_count: Integer', 'created_at: DateTime']}
          />
          <SchemaBlock
            title="chat_messages"
            fields={['id: UUID (PK)', 'user_id: UUID (FK)', 'role: Enum', 'content: Text', 'context: JSON', 'created_at: DateTime']}
          />
        </div>
      </motion.div>

      {/* Python Project Structure */}
      <motion.div variants={itemVariants} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-green-400" />
          Структура FastAPI проекта
        </h3>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-xs overflow-x-auto">
          <pre className="text-slate-300">
{`backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app entry point
│   ├── config.py               # Settings (pydantic-settings)
│   ├── database.py             # SQLAlchemy engine & session
│   │
│   ├── models/                 # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── task.py
│   │   ├── achievement.py
│   │   └── chat_message.py
│   │
│   ├── schemas/                # Pydantic schemas (request/response)
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── task.py
│   │   ├── achievement.py
│   │   └── chat.py
│   │
│   ├── routers/                # API endpoints
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── tasks.py
│   │   ├── achievements.py
│   │   ├── leaderboard.py
│   │   └── ai.py
│   │
│   ├── services/               # Business logic
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   ├── task_service.py
│   │   ├── achievement_service.py
│   │   ├── ai_service.py
│   │   └── gamification.py     # XP, levels, streaks logic
│   │
│   ├── core/                   # Core utilities
│   │   ├── security.py         # JWT, password hashing
│   │   ├── dependencies.py     # FastAPI dependencies
│   │   └── exceptions.py
│   │
│   └── utils/                  # Helpers
│       ├── email.py
│       └── redis_client.py
│
├── alembic/                    # Database migrations
│   ├── versions/
│   └── env.py
├── tests/                      # pytest tests
│   ├── test_auth.py
│   ├── test_tasks.py
│   └── test_ai.py
├── alembic.ini
├── requirements.txt
├── pyproject.toml
├── Dockerfile
└── .env`}
          </pre>
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div variants={itemVariants} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Стек технологий</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StackSection
            title="Frontend"
            color="blue"
            items={['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Query']}
          />
          <StackSection
            title="Backend (Python)"
            color="green"
            items={['FastAPI', 'Pydantic v2', 'SQLAlchemy 2.0', 'Alembic', 'Uvicorn']}
          />
          <StackSection
            title="Database"
            color="yellow"
            items={['PostgreSQL', 'Redis', 'asyncpg', 'SQLAlchemy Async']}
          />
          <StackSection
            title="AI & ML"
            color="purple"
            items={['OpenAI API', 'LangChain', 'ChromaDB', 'tiktoken']}
          />
        </div>
      </motion.div>

      {/* AI Integration Example */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          Пример интеграции ИИ (Python)
        </h3>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-xs overflow-x-auto">
          <pre className="text-slate-300">
{`# app/services/ai_service.py
from openai import AsyncOpenAI
from langchain.prompts import ChatPromptTemplate
from app.config import settings

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

async def chat_with_ai(user_id: str, message: str, context: dict) -> str:
    """Общение с ИИ-ассистентом"""
    
    system_prompt = f"""
    Ты — ИИ-ассистент TaskQuest, приложения для геймификации продуктивности.
    
    Информация о пользователе:
    - Уровень: {context['user']['level']}
    - Текущая серия: {context['user']['streak']} дней
    - Выполнено задач: {context['user']['tasks_completed']}
    
    Активные задачи:
    {chr(10).join(f'- {t["title"]} ({t["priority"]})' for t in context['active_tasks'])}
    
    Твоя задача: мотивировать, давать советы по продуктивности,
    помогать планировать день и достигать целей.
    """
    
    response = await client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message}
        ],
        temperature=0.7,
        max_tokens=500,
    )
    
    return response.choices[0].message.content

async def suggest_tasks(user_context: dict) -> list[dict]:
    """Умные рекомендации по задачам"""
    # ... реализация
    pass

async def breakdown_task(task_title: str) -> list[str]:
    """Разбить большую задачу на подзадачи"""
    # ... реализация
    pass`}
          </pre>
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
              <li>• Vite dev server (frontend)</li>
              <li>• uvicorn --reload (backend)</li>
              <li>• Local PostgreSQL</li>
              <li>• Mock AI responses</li>
              <li>• pytest для тестов</li>
            </ul>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2">Staging</h4>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>• Docker containers</li>
              <li>• Test database</li>
              <li>• GitHub Actions CI</li>
              <li>• Monitoring (Sentry)</li>
            </ul>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2">Production</h4>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>• Railway / Render</li>
              <li>• Vercel (frontend)</li>
              <li>• Gunicorn + Uvicorn workers</li>
              <li>• Backup & recovery</li>
            </ul>
          </div>
        </div>

        {/* Docker Compose */}
        <div className="mt-4">
          <p className="text-xs text-slate-400 mb-2 font-medium">docker-compose.yml</p>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-xs overflow-x-auto">
            <pre className="text-slate-300">
{`version: '3.8'
services:
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    environment:
      - VITE_API_URL=http://localhost:8000

  backend:
    build: ./backend
    ports: ["8000:8000"]
    environment:
      - DATABASE_URL=postgresql+asyncpg://user:pass@db:5432/taskquest
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - REDIS_URL=redis://redis:6379
    depends_on: [db, redis]
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: taskquest
    volumes: ["postgres_/var/lib/postgresql/data"]

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]`}
            </pre>
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Следующие шаги</h3>
        
        <div className="space-y-3">
          <StepItem number={1} title="Инициализация FastAPI проекта" description="poetry init, установка fastapi, uvicorn, sqlalchemy, pydantic" />
          <StepItem number={2} title="Настройка PostgreSQL + SQLAlchemy" description="Создание моделей, миграции через Alembic" />
          <StepItem number={3} title="Аутентификация" description="JWT токены через python-jose, хэширование через passlib+bcrypt" />
          <StepItem number={4} title="CRUD API для задач" description="Endpoints для создания, чтения, обновления, удаления задач" />
          <StepItem number={5} title="Миграция frontend" description="Замена localStorage на API вызовы через React Query" />
          <StepItem number={6} title="Интеграция ИИ" description="OpenAI API + LangChain, чат-интерфейс с WebSocket" />
          <StepItem number={7} title="Тестирование" description="pytest + httpx для API тестов, покрытие кода" />
          <StepItem number={8} title="Деплой" description="Docker, Railway/Render, CI/CD через GitHub Actions" />
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

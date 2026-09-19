# TaskQuest — Геймифицированный сервис продуктивности

Веб-приложение для личной продуктивности, где пользователь ставит задачи и цели, а за их выполнение получает достижения — как в видеоиграх.

## 🎮 Ключевые механики

- **🎯 Задачи и цели** — разовые, повторяющиеся, долгосрочные
- **🏆 Достижения** — уникальные бейджи за выполнение конкретных условий
- **🔥 Streak-система** — отслеживание серий без пропусков
- **🎮 Уровни и опыт** — накопление баллов за активность
- **👥 Социальность** — лидерборды и сравнение прогресса
- **🤖 ИИ-ассистент** — персональный помощник на базе GPT-4

## 📁 Структура проекта

```
taskquest/
├── frontend/                  # React + TypeScript
│   ├── src/
│   │   ├── components/        # React компоненты
│   │   │   ├── Sidebar.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Tasks.tsx
│   │   │   ├── Achievements.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   ├── Profile.tsx
│   │   │   └── Architecture.tsx
│   │   ├── context.tsx        # React Context
│   │   ├── types.ts           # TypeScript типы
│   │   ├── data.ts            # Моковые данные
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.js
│
└── backend/                   # Python + FastAPI
    ├── app/
    │   ├── main.py            # FastAPI приложение
    │   ├── config.py          # Настройки (pydantic-settings)
    │   ├── database.py        # SQLAlchemy engine
    │   ├── models/            # SQLAlchemy модели
    │   ├── schemas/           # Pydantic схемы
    │   ├── routers/           # API endpoints
    │   ├── services/          # Бизнес-логика
    │   ├── core/              # Безопасность, зависимости
    │   └── utils/             # Утилиты
    ├── alembic/               # Миграции БД
    ├── tests/                 # pytest тесты
    ├── requirements.txt
    ├── Dockerfile
    └── .env
```

## 🛠 Текущий стек технологий

### Frontend
- **React 18** — UI библиотека
- **TypeScript** — типизация
- **Tailwind CSS** — утилитарные стили
- **Framer Motion** — анимации
- **Lucide React** — иконки
- **Vite** — сборщик

### Backend (планируется)
- **Python 3.11+**
- **FastAPI** — веб-фреймворк
- **SQLAlchemy 2.0** — ORM
- **Alembic** — миграции БД
- **Pydantic v2** — валидация
- **Uvicorn** — ASGI сервер
- **PostgreSQL** — база данных
- **Redis** — кэширование
- **OpenAI API** — ИИ-ассистент
- **LangChain** — оркестрация ИИ

## 🚀 Запуск проекта

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend (когда будет готов)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

---

## 🏗 Архитектура с FastAPI

### Полная архитектура системы

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER                         │
│  React + TypeScript + Tailwind + Framer Motion              │
│  - UI компоненты                                            │
│  - Локальное состояние (React Context)                      │
│  - API клиент (React Query / axios)                         │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP / WebSocket
┌────────────────────▼────────────────────────────────────────┐
│                   BACKEND LAYER (FastAPI)                   │
│  Python + FastAPI + Pydantic                                │
│  - REST API endpoints                                       │
│  - WebSocket для real-time обновлений                       │
│  - OAuth2 + JWT аутентификация                              │
│  - Dependency Injection                                     │
│  - Async/await (asyncpg)                                    │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
┌───────▼──────┐ ┌──▼───────┐ ┌──▼──────────┐
│   Database   │ │   Cache  │ │  AI Layer   │
│  PostgreSQL  │ │  Redis   │ │  OpenAI API │
│  + SQLAlchemy│ │          │ │  + LangChain│
│  + Alembic   │ │          │ │  + ChromaDB │
└──────────────┘ └──────────┘ └─────────────┘
```

### Структура FastAPI проекта

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app entry point
│   ├── config.py               # Settings (pydantic-settings)
│   ├── database.py             # SQLAlchemy engine & session
│   │
│   ├── models/                 # SQLAlchemy модели
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── task.py
│   │   ├── achievement.py
│   │   └── chat_message.py
│   │
│   ├── schemas/                # Pydantic схемы (request/response)
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
│   ├── services/               # Бизнес-логика
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   ├── task_service.py
│   │   ├── achievement_service.py
│   │   ├── ai_service.py
│   │   └── gamification.py     # XP, levels, streaks
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
├── alembic/                    # Миграции БД
│   ├── versions/
│   └── env.py
├── tests/                      # pytest тесты
│   ├── conftest.py
│   ├── test_auth.py
│   ├── test_tasks.py
│   └── test_ai.py
├── alembic.ini
├── requirements.txt
├── pyproject.toml
├── Dockerfile
└── .env
```

### API Endpoints (FastAPI)

#### Authentication
```python
POST   /api/auth/register    # Регистрация
POST   /api/auth/login       # Вход (OAuth2 with Password)
POST   /api/auth/refresh     # Обновление JWT токена
POST   /api/auth/logout      # Выход
```

#### Users
```python
GET    /api/users/me         # Текущий пользователь
PATCH  /api/users/me         # Обновить профиль
GET    /api/users/{id}/stats # Статистика пользователя
```

#### Tasks
```python
GET    /api/tasks            # Список задач (с фильтрами)
POST   /api/tasks            # Создать задачу
GET    /api/tasks/{id}       # Получить задачу
PATCH  /api/tasks/{id}       # Обновить задачу
DELETE /api/tasks/{id}       # Удалить задачу
POST   /api/tasks/{id}/complete  # Завершить задачу
```

#### Achievements
```python
GET    /api/achievements          # Список достижений
GET    /api/achievements/unlocked # Открытые достижения
```

#### Leaderboard
```python
GET    /api/leaderboard          # Общий рейтинг
GET    /api/leaderboard/friends  # Рейтинг друзей
```

#### AI Assistant
```python
POST   /api/ai/chat          # Отправить сообщение в чат
POST   /api/ai/suggest       # Получить рекомендации
POST   /api/ai/breakdown     # Разбить задачу на подзадачи
GET    /api/ai/analyze       # Анализ продуктивности
POST   /api/ai/motivate      # Мотивационное сообщение
WS     /api/ws/chat/{user_id}  # WebSocket для чата
```

### Схема базы данных (SQLAlchemy)

```python
# app/models/user.py
from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    name = Column(String, nullable=False)
    avatar = Column(String, default="🧙‍♂️")
    level = Column(Integer, default=1)
    xp = Column(Integer, default=0)
    total_xp = Column(Integer, default=0)
    streak = Column(Integer, default=0)
    longest_streak = Column(Integer, default=0)
    tasks_completed = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
```

```python
# app/models/task.py
from sqlalchemy import Column, String, Integer, Boolean, DateTime, Enum, ForeignKey
from sqlalchemy.sql import func
from app.database import Base
import enum

class TaskType(str, enum.Enum):
    SINGLE = "single"
    RECURRING = "recurring"
    LONGTERM = "longterm"

class Priority(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class Category(str, enum.Enum):
    HEALTH = "health"
    WORK = "work"
    LEARNING = "learning"
    CREATIVE = "creative"
    SOCIAL = "social"
    OTHER = "other"

class Task(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String)
    type = Column(Enum(TaskType), nullable=False)
    priority = Column(Enum(Priority), default=Priority.MEDIUM)
    category = Column(Enum(Category), default=Category.OTHER)
    xp_reward = Column(Integer, default=25)
    completed = Column(Boolean, default=False)
    streak_count = Column(Integer, default=0)
    progress = Column(Integer)
    target_value = Column(Integer)
    current_value = Column(Integer)
    due_date = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))
```

```python
# app/models/chat_message.py
class MessageRole(str, enum.Enum):
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    role = Column(Enum(MessageRole), nullable=False)
    content = Column(String, nullable=False)
    context = Column(JSON)  # Дополнительный контекст
    created_at = Column(DateTime(timezone=True), server_default=func.now())
```

## 🤖 ИИ-ассистент

### Возможности

1. **Умные рекомендации** — анализ приоритетов и дедлайнов
2. **Мотивационный чат** — поддержка диалога, советы
3. **Разбивка задач** — декомпозиция больших целей
4. **Анализ паттернов** — выявление закономерностей

### Пример интеграции с OpenAI (Python)

```python
# app/services/ai_service.py
from openai import AsyncOpenAI
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
    prompt = """
    На основе данных пользователя предложи оптимальный порядок задач на сегодня.
    Учитывай приоритеты, дедлайны и текущую серию.
    """
    # ... реализация


async def breakdown_task(task_title: str, description: str) -> list[str]:
    """Разбить большую задачу на подзадачи"""
    response = await client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Ты помощник по декомпозиции задач."},
            {"role": "user", "content": f"Разбей задачу '{task_title}' на подзадачи: {description}"}
        ],
    )
    return response.choices[0].message.content.split("\n")
```

### LangChain интеграция

```python
# app/services/ai_service.py
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4", temperature=0.7)

motivation_prompt = ChatPromptTemplate.from_messages([
    ("system", "Ты мотивационный коуч для приложения TaskQuest."),
    ("user", """
    Пользователь {user_name} (уровень {level}, серия {streak} дней).
    Сегодня выполнено {completed_today} задач.
    Сгенерируй короткое мотивационное сообщение.
    """)
])

async def get_motivation(user_context: dict) -> str:
    chain = motivation_prompt | llm
    return await chain.ainvoke(user_context)
```

## 📦 requirements.txt

```txt
# FastAPI и сервер
fastapi==0.109.0
uvicorn[standard]==0.27.0
python-multipart==0.0.6

# База данных
sqlalchemy==2.0.25
asyncpg==0.29.0
alembic==1.13.1

# Валидация и настройки
pydantic==2.5.3
pydantic-settings==2.1.0

# Аутентификация
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4

# ИИ
openai==1.10.0
langchain==0.1.5
langchain-openai==0.0.5

# Кэш и очереди
redis==5.0.1
celery==5.3.6

# Тестирование
pytest==7.4.4
pytest-asyncio==0.23.3
httpx==0.26.0

# Утилиты
python-dotenv==1.0.0
loguru==0.7.2
```

## 🚀 Деплой

### Варианты хостинга

#### Frontend
- **Vercel** — автоматический деплой из Git
- **Netlify** — простая настройка
- **Cloudflare Pages** — быстрая CDN

#### Backend (FastAPI)
- **Railway** — простой деплой Python-приложений
- **Render** — бесплатный тариф
- **Fly.io** — глобальное распределение
- **AWS ECS / Fargate** — масштабируемое решение

#### База данных
- **Supabase** — PostgreSQL как сервис
- **Neon** — серверless PostgreSQL
- **Railway PostgreSQL** — управляемая БД
- **AWS RDS** — полный контроль

### Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://localhost:8000

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql+asyncpg://user:pass@db:5432/taskquest
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - db
      - redis
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: taskquest
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### Dockerfile для FastAPI

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app ./app
COPY ./alembic ./alembic
COPY ./alembic.ini .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 📋 Roadmap разработки

### Этап 1: Backend MVP (2-3 недели)
- [ ] Инициализация FastAPI проекта
- [ ] Настройка PostgreSQL + SQLAlchemy
- [ ] Alembic миграции
- [ ] Аутентификация (JWT + OAuth2)
- [ ] CRUD API для задач
- [ ] API для пользователей и достижений

### Этап 2: Интеграция frontend-backend (1-2 недели)
- [ ] React Query для управления запросами
- [ ] Миграция с localStorage на API
- [ ] Обработка ошибок и loading состояний
- [ ] Тестирование интеграции

### Этап 3: ИИ-ассистент (2-3 недели)
- [ ] Интеграция OpenAI API
- [ ] Создание чат-интерфейса
- [ ] WebSocket для real-time общения
- [ ] Контекстные подсказки

### Этап 4: Дополнительные функции (2-3 недели)
- [ ] Уведомления (email через FastAPI Mail)
- [ ] Экспорт/импорт данных
- [ ] Темы оформления
- [ ] Мобильное приложение (React Native)

### Этап 5: Оптимизация и деплой (1-2 недели)
- [ ] Оптимизация производительности
- [ ] Настройка CI/CD (GitHub Actions)
- [ ] Мониторинг (Sentry) и логирование (Loguru)
- [ ] Деплой на Railway/Vercel

## 🧪 Тестирование (pytest)

```python
# tests/test_tasks.py
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_create_task():
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Сначала логинимся
        login_response = await client.post("/api/auth/login", json={
            "email": "test@example.com",
            "password": "testpass"
        })
        token = login_response.json()["access_token"]
        
        # Создаём задачу
        response = await client.post(
            "/api/tasks",
            json={
                "title": "Test task",
                "type": "single",
                "priority": "medium",
                "category": "work",
                "xp_reward": 25
            },
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 201
        assert response.json()["title"] == "Test task"
```

## 📚 Полезные ресурсы

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy 2.0](https://docs.sqlalchemy.org/en/20/)
- [Alembic Migrations](https://alembic.sqlalchemy.org/)
- [OpenAI Python API](https://platform.openai.com/docs/api-reference/python)
- [LangChain Python](https://python.langchain.com/)
- [React Documentation](https://react.dev/)
- [Pydantic v2](https://docs.pydantic.dev/latest/)

---

**Сделано с ❤️ для тех, кто хочет превратить самодисциплину в игру**

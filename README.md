# TaskQuest — Геймифицированный сервис продуктивности

Веб-приложение для личной продуктивности, где пользователь ставит задачи и цели, а за их выполнение получает достижения — как в видеоиграх.

## 🎮 Ключевые механики

- **🎯 Задачи и цели** — разовые, повторяющиеся, долгосрочные
- **🏆 Достижения** — уникальные бейджи за выполнение конкретных условий
- **🔥 Streak-система** — отслеживание серий без пропусков
- **🎮 Уровни и опыт** — накопление баллов за активность
- **👥 Социальность** — лидерборды и сравнение прогресса

## 📁 Структура проекта

```
taskquest/
├── src/
│   ├── components/          # React компоненты
│   │   ├── Sidebar.tsx      # Боковая навигация (desktop)
│   │   ├── MobileNav.tsx    # Нижняя навигация (mobile)
│   │   ├── Dashboard.tsx    # Главная панель
│   │   ├── Tasks.tsx        # Управление задачами
│   │   ├── Achievements.tsx # Достижения и бейджи
│   │   ├── Leaderboard.tsx  # Рейтинг пользователей
│   │   ├── Profile.tsx      # Профиль пользователя
│   │   └── Architecture.tsx # Архитектура проекта
│   ├── context.tsx          # Глобальное состояние (React Context)
│   ├── types.ts             # TypeScript типы
│   ├── data.ts              # Моковые данные
│   ├── App.tsx              # Главный компонент
│   ├── main.tsx             # Точка входа
│   └── index.css            # Глобальные стили
├── public/                  # Статические файлы
├── index.html               # HTML шаблон
├── package.json             # Зависимости
├── vite.config.js           # Конфигурация Vite
└── tsconfig.json            # Конфигурация TypeScript
```

## 🛠 Текущий стек технологий

### Frontend
- **React 18** — UI библиотека
- **TypeScript** — типизация
- **Tailwind CSS** — утилитарные стили
- **Framer Motion** — анимации
- **Lucide React** — иконки
- **Vite** — сборщик

## 🚀 Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build
```

---

## 🏗 Планируемая архитектура с бекендом и ИИ

### Полная архитектура системы

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER                         │
│  React + TypeScript + Tailwind + Framer Motion              │
│  - UI компоненты                                            │
│  - Локальное состояние (React Context)                      │
│  - API клиент (React Query)                                 │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/WebSocket
┌────────────────────▼────────────────────────────────────────┐
│                      BACKEND LAYER                          │
│  Node.js + Express.js                                       │
│  - REST API endpoints                                       │
│  - WebSocket для real-time обновлений                       │
│  - JWT аутентификация                                       │
│  - Middleware (cors, rate-limit, validation)                │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
┌───────▼──────┐ ┌──▼───────┐ ┌──▼──────────┐
│   Database   │ │   Cache  │ │  AI Layer   │
│  PostgreSQL  │ │  Redis   │ │  OpenAI API │
│  + Prisma    │ │          │ │  + LangChain│
└──────────────┘ └──────────┘ └─────────────┘
```

### Backend структура (планируемая)

```
backend/
├── src/
│   ├── controllers/       # Обработчики запросов
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── task.controller.ts
│   │   ├── achievement.controller.ts
│   │   └── ai.controller.ts
│   ├── services/          # Бизнес-логика
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── task.service.ts
│   │   ├── achievement.service.ts
│   │   └── ai.service.ts
│   ├── routes/            # Маршруты API
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── task.routes.ts
│   │   ├── achievement.routes.ts
│   │   └── ai.routes.ts
│   ├── middleware/        # Middleware
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── error.middleware.ts
│   ├── models/            # Prisma модели
│   ├── utils/             # Утилиты
│   ├── config/            # Конфигурация
│   └── app.ts             # Точка входа
├── prisma/
│   └── schema.prisma      # Схема БД
├── tests/                 # Тесты
├── .env                   # Переменные окружения
└── package.json
```

### API Endpoints

#### Authentication
```
POST   /api/auth/register    — Регистрация
POST   /api/auth/login       — Вход
POST   /api/auth/refresh     — Обновление токена
POST   /api/auth/logout      — Выход
```

#### Users
```
GET    /api/users/me         — Текущий пользователь
PATCH  /api/users/me         — Обновить профиль
GET    /api/users/:id/stats  — Статистика пользователя
```

#### Tasks
```
GET    /api/tasks            — Список задач
POST   /api/tasks            — Создать задачу
GET    /api/tasks/:id        — Получить задачу
PATCH  /api/tasks/:id        — Обновить задачу
DELETE /api/tasks/:id        — Удалить задачу
POST   /api/tasks/:id/complete — Завершить задачу
```

#### Achievements
```
GET    /api/achievements     — Список достижений
GET    /api/achievements/unlocked — Открытые достижения
```

#### Leaderboard
```
GET    /api/leaderboard      — Общий рейтинг
GET    /api/leaderboard/friends — Рейтинг друзей
```

#### AI Assistant
```
POST   /api/ai/chat          — Отправить сообщение в чат
POST   /api/ai/suggest       — Получить рекомендации
POST   /api/ai/breakdown     — Разбить задачу на подзадачи
GET    /api/ai/analyze       — Анализ продуктивности
POST   /api/ai/motivate      — Мотивационное сообщение
```

### Схема базы данных

```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String
  name          String
  avatar        String
  level         Int       @default(1)
  xp            Int       @default(0)
  totalXp       Int       @default(0)
  streak        Int       @default(0)
  longestStreak Int       @default(0)
  tasksCompleted Int      @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  tasks         Task[]
  achievements  UserAchievement[]
  chatMessages  ChatMessage[]
}

model Task {
  id            String    @id @default(uuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  title         String
  description   String?
  type          TaskType
  priority      Priority
  category      Category
  xpReward      Int
  completed     Boolean   @default(false)
  streakCount   Int       @default(0)
  progress      Int?
  targetValue   Int?
  currentValue  Int?
  dueDate       DateTime?
  createdAt     DateTime  @default(now())
  completedAt   DateTime?
}

model Achievement {
  id            String    @id @default(uuid())
  title         String
  description   String
  icon          String
  condition     String
  xpReward      Int
  
  users         UserAchievement[]
}

model UserAchievement {
  id            String    @id @default(uuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  achievementId String
  achievement   Achievement @relation(fields: [achievementId], references: [id])
  unlockedAt    DateTime  @default(now())
  
  @@unique([userId, achievementId])
}

model ChatMessage {
  id            String    @id @default(uuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  role          MessageRole
  content       String
  context       Json?
  createdAt     DateTime  @default(now())
}

enum TaskType {
  SINGLE
  RECURRING
  LONGTERM
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}

enum Category {
  HEALTH
  WORK
  LEARNING
  CREATIVE
  SOCIAL
  OTHER
}

enum MessageRole {
  USER
  ASSISTANT
  SYSTEM
}
```

## 🤖 ИИ-ассистент

### Возможности

1. **Умные рекомендации**
   - Анализ приоритетов и дедлайнов
   - Предложение оптимального порядка задач
   - Учёт текущей серии и мотивации

2. **Мотивационный чат**
   - Поддержка диалога
   - Персонализированные советы
   - Анализ паттернов поведения

3. **Разбивка задач**
   - Декомпозиция больших целей
   - Оценка времени выполнения
   - Создание чеклистов

4. **Аналитика**
   - Выявление продуктивных периодов
   - Анализ завершённых задач
   - Рекомендации по улучшению

### Пример интеграции с OpenAI

```typescript
// services/ai.service.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function chatWithAI(
  userId: string,
  message: string,
  context: any
) {
  const systemPrompt = buildSystemPrompt(context);
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  return completion.choices[0].message.content;
}

function buildSystemPrompt(context: any) {
  return `
    Ты — ИИ-ассистент TaskQuest, приложения для геймификации продуктивности.
    
    Информация о пользователе:
    - Уровень: ${context.user.level}
    - Текущая серия: ${context.user.streak} дней
    - Выполнено задач: ${context.user.tasksCompleted}
    
    Активные задачи:
    ${context.activeTasks.map(t => `- ${t.title} (${t.priority})`).join('\n')}
    
    Твоя задача: мотивировать пользователя, давать советы по продуктивности,
    помогать планировать день и достигать целей.
  `;
}
```

## 📦 Рекомендуемый стек для бекенда

### Основные технологии
- **Node.js** + **Express.js** — сервер
- **PostgreSQL** — основная БД
- **Prisma** — ORM
- **Redis** — кэширование и сессии
- **JWT** — аутентификация
- **OpenAI API** — ИИ-ассистент
- **WebSocket** — real-time обновления

### Дополнительные инструменты
- **Docker** — контейнеризация
- **Jest** — тестирование
- **Zod** — валидация
- **Winston** — логирование
- **PM2** — процесс-менеджер

## 🚀 Деплой

### Варианты хостинга

#### Frontend
- **Vercel** — автоматический деплой из Git
- **Netlify** — простая настройка
- **AWS S3 + CloudFront** — масштабируемое решение

#### Backend
- **Railway** — простой деплой Node.js
- **Render** — бесплатный тариф
- **AWS EC2** — полный контроль
- **DigitalOcean App Platform** — управляемый сервис

#### База данных
- **Supabase** — PostgreSQL как сервис
- **Neon** — серверless PostgreSQL
- **AWS RDS** — управляемая БД

### Docker Compose (пример)

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://localhost:4000

  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/taskquest
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=taskquest
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

## 📋 Roadmap разработки

### Этап 1: Backend MVP (2-3 недели)
- [ ] Настройка Express.js сервера
- [ ] Подключение PostgreSQL + Prisma
- [ ] Реализация аутентификации (JWT)
- [ ] CRUD API для задач
- [ ] API для пользователей и достижений

### Этап 2: Интеграция frontend-backend (1-2 недели)
- [ ] Миграция с localStorage на API
- [ ] React Query для управления запросами
- [ ] Обработка ошибок и loading состояний
- [ ] Тестирование интеграции

### Этап 3: ИИ-ассистент (2-3 недели)
- [ ] Интеграция OpenAI API
- [ ] Создание чат-интерфейса
- [ ] Реализация рекомендаций
- [ ] Контекстные подсказки

### Этап 4: Дополнительные функции (2-3 недели)
- [ ] Уведомления (email/push)
- [ ] Экспорт/импорт данных
- [ ] Темы оформления
- [ ] Мобильное приложение (React Native)

### Этап 5: Оптимизация и деплой (1-2 недели)
- [ ] Оптимизация производительности
- [ ] Настройка CI/CD
- [ ] Мониторинг и логирование
- [ ] Деплой на продакшен

## 📚 Полезные ресурсы

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)

## 👥 Команда

Проект разработан как демонстрация современного стека технологий и лучших практик веб-разработки.

## 📄 Лицензия

MIT

---

**Сделано с ❤️ для тех, кто хочет превратить самодисциплину в игру**

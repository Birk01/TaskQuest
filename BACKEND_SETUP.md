# Быстрый старт: FastAPI Backend

## 📦 Установка

```bash
# Создайте директорию backend
mkdir backend
cd backend

# Создайте виртуальное окружение
python -m venv venv

# Активируйте (Linux/Mac)
source venv/bin/activate

# Или Windows
venv\Scripts\activate

# Установите зависимости
pip install fastapi uvicorn[standard] sqlalchemy[asyncio] asyncpg alembic pydantic-settings python-jose[cryptography] passlib[bcrypt] python-multipart openai langchain redis pytest pytest-asyncio httpx
```

## 🏗 Структура проекта

```bash
# Создайте структуру
mkdir -p app/{models,schemas,routers,services,core,utils}
mkdir -p alembic/versions
mkdir -p tests

# Создайте файлы
touch app/__init__.py
touch app/main.py
touch app/config.py
touch app/database.py
touch app/models/__init__.py
touch app/schemas/__init__.py
touch app/routers/__init__.py
touch app/services/__init__.py
touch app/core/__init__.py
touch app/utils/__init__.py
touch .env
touch requirements.txt
```

## 📝 Основные файлы

### requirements.txt
```txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
sqlalchemy==2.0.25
asyncpg==0.29.0
alembic==1.13.1
pydantic==2.5.3
pydantic-settings==2.1.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
openai==1.10.0
langchain==0.1.5
langchain-openai==0.0.5
redis==5.0.1
python-dotenv==1.0.0
loguru==0.7.2
pytest==7.4.4
pytest-asyncio==0.23.3
httpx==0.26.0
```

### .env
```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/taskquest
JWT_SECRET=your-secret-key-change-in-production
JWT_ALGORITHM=HS256
JWT_EXPIRATION_MINUTES=30
OPENAI_API_KEY=sk-your-openai-api-key
REDIS_URL=redis://localhost:6379
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### app/config.py
```python
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_MINUTES: int = 30
    OPENAI_API_KEY: str
    REDIS_URL: str
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]
    
    class Config:
        env_file = ".env"

settings = Settings()
```

### app/database.py
```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from app.config import settings

engine = create_async_engine(settings.DATABASE_URL, echo=True)

async_session = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

class Base(DeclarativeBase):
    pass

async def get_db():
    async with async_session() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
```

### app/main.py
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import auth, users, tasks, achievements, ai

app = FastAPI(
    title="TaskQuest API",
    description="Геймифицированный сервис продуктивности",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Роутеры
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])
app.include_router(achievements.router, prefix="/api/achievements", tags=["achievements"])
app.include_router(ai.router, prefix="/api/ai", tags=["ai"])

@app.get("/")
async def root():
    return {"message": "TaskQuest API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

### app/models/user.py
```python
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

### app/schemas/user.py
```python
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    name: str
    avatar: Optional[str] = "🧙‍♂️"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str
    level: int
    xp: int
    total_xp: int
    streak: int
    longest_streak: int
    tasks_completed: int
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[str] = None
```

### app/routers/auth.py
```python
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.user import UserCreate, UserResponse, Token
from app.services.auth_service import (
    create_user,
    authenticate_user,
    create_access_token
)

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db: AsyncSession = Depends(get_db)):
    """Регистрация нового пользователя"""
    db_user = await create_user(db, user)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    return db_user

@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    """Вход в систему"""
    user = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.id})
    return {"access_token": access_token, "token_type": "bearer"}
```

### app/routers/tasks.py
```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.database import get_db
from app.schemas.task import TaskCreate, TaskResponse, TaskUpdate
from app.services.task_service import (
    create_task,
    get_user_tasks,
    get_task,
    update_task,
    delete_task,
    complete_task
)
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_new_task(
    task: TaskCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Создать новую задачу"""
    return await create_task(db, task, current_user.id)

@router.get("/", response_model=List[TaskResponse])
async def list_tasks(
    skip: int = 0,
    limit: int = 100,
    completed: bool = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Получить список задач"""
    return await get_user_tasks(db, current_user.id, skip, limit, completed)

@router.get("/{task_id}", response_model=TaskResponse)
async def get_task_by_id(
    task_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Получить задачу по ID"""
    task = await get_task(db, task_id, current_user.id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.patch("/{task_id}", response_model=TaskResponse)
async def update_task_by_id(
    task_id: str,
    task_update: TaskUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Обновить задачу"""
    task = await update_task(db, task_id, task_update, current_user.id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task_by_id(
    task_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Удалить задачу"""
    success = await delete_task(db, task_id, current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")

@router.post("/{task_id}/complete", response_model=TaskResponse)
async def complete_task_by_id(
    task_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Завершить задачу"""
    task = await complete_task(db, task_id, current_user.id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task
```

### app/routers/ai.py
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from app.database import get_db
from app.services.ai_service import chat_with_ai, suggest_tasks, breakdown_task
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter()

class ChatMessage(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

class TaskBreakdown(BaseModel):
    task_title: str
    description: str

@router.post("/chat", response_model=ChatResponse)
async def chat(
    chat_message: ChatMessage,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Общение с ИИ-ассистентом"""
    try:
        response = await chat_with_ai(
            user_id=current_user.id,
            message=chat_message.message,
            db=db
        )
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/suggest")
async def suggest(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Получить рекомендации по задачам"""
    try:
        suggestions = await suggest_tasks(db=db, user_id=current_user.id)
        return {"suggestions": suggestions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/breakdown")
async def breakdown(
    task: TaskBreakdown,
    current_user: User = Depends(get_current_user)
):
    """Разбить задачу на подзадачи"""
    try:
        subtasks = await breakdown_task(task.task_title, task.description)
        return {"subtasks": subtasks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### app/services/ai_service.py
```python
from openai import AsyncOpenAI
from sqlalchemy.ext.asyncio import AsyncSession
from app.config import settings
from app.services.task_service import get_user_tasks

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

async def chat_with_ai(user_id: str, message: str, db: AsyncSession) -> str:
    """Общение с ИИ-ассистентом"""
    
    # Получаем контекст пользователя
    tasks = await get_user_tasks(db, user_id, limit=10)
    active_tasks = [t for t in tasks if not t.completed]
    
    # TODO: Получить информацию о пользователе из БД
    user_context = {
        "level": 7,  # Заменить на реальные данные
        "streak": 12,
        "tasks_completed": 156,
        "active_tasks": [{"title": t.title, "priority": t.priority} for t in active_tasks[:5]]
    }
    
    system_prompt = f"""
    Ты — ИИ-ассистент TaskQuest, приложения для геймификации продуктивности.
    
    Информация о пользователе:
    - Уровень: {user_context['level']}
    - Текущая серия: {user_context['streak']} дней
    - Выполнено задач: {user_context['tasks_completed']}
    
    Активные задачи:
    {chr(10).join(f'- {t["title"]} ({t["priority"]})' for t in user_context['active_tasks'])}
    
    Твоя задача: мотивировать пользователя, давать советы по продуктивности,
    помогать планировать день и достигать целей. Отвечай кратко и дружелюбно.
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


async def suggest_tasks(db: AsyncSession, user_id: str) -> list:
    """Умные рекомендации по задачам"""
    tasks = await get_user_tasks(db, user_id, limit=20)
    active_tasks = [t for t in tasks if not t.completed]
    
    prompt = f"""
    На основе списка активных задач пользователя предложи оптимальный порядок выполнения на сегодня.
    Учитывай приоритеты и дедлайны.
    
    Активные задачи:
    {chr(10).join(f'- {t.title} (приоритет: {t.priority})' for t in active_tasks[:10])}
    
    Верни список задач в рекомендуемом порядке.
    """
    
    response = await client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Ты помощник по планированию задач."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.5,
    )
    
    return response.choices[0].message.content.split("\n")


async def breakdown_task(task_title: str, description: str) -> list:
    """Разбить большую задачу на подзадачи"""
    response = await client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Ты помощник по декомпозиции задач. Разбивай большие задачи на маленькие конкретные шаги."},
            {"role": "user", "content": f"Разбей задачу '{task_title}' на подзадачи: {description}"}
        ],
        temperature=0.5,
    )
    
    return [line.strip() for line in response.choices[0].message.content.split("\n") if line.strip()]
```

### app/core/security.py
```python
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRATION_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except JWTError:
        return None
```

### app/core/dependencies.py
```python
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.core.security import decode_access_token
from app.models.user import User
from sqlalchemy import select

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = decode_access_token(token)
    if payload is None:
        raise credentials_exception
    
    user_id: str = payload.get("sub")
    if user_id is None:
        raise credentials_exception
    
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    
    if user is None:
        raise credentials_exception
    
    return user
```

## 🚀 Запуск

```bash
# Запустите сервер
uvicorn app.main:app --reload

# API будет доступен на http://localhost:8000
# Документация Swagger: http://localhost:8000/docs
# Документация ReDoc: http://localhost:8000/redoc
```

## 🧪 Тестирование

```python
# tests/test_main.py
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_root():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "TaskQuest API is running!"}

@pytest.mark.asyncio
async def test_health():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}
```

```bash
# Запустите тесты
pytest -v
```

## 📚 Полезные команды

```bash
# Создать миграцию
alembic revision --autogenerate -m "Initial migration"

# Применить миграции
alembic upgrade head

# Откатить последнюю миграцию
alembic downgrade -1

# Просмотр статуса миграций
alembic current
```

---

**Готово! Теперь у вас есть полная структура FastAPI проекта для TaskQuest.**

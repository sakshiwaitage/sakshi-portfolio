# Sakshi Portfolio - React + Python AI Resume Chat

Portfolio website with:
- Frontend: React + TypeScript + Vite
- Backend: Python (FastAPI)
- Database: SQLite
- Chat Engine: OpenRouter free model

## Run Frontend

```bash
npm install
npm run dev
```

Set `VITE_API_URL` in `.env.local` if your backend is not `http://localhost:5000`.

## Run Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 5000 --reload
```

## Backend Environment (`backend/.env`)

```env
PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-oss-20b:free
FRONTEND_ORIGINS=http://localhost:5173,http://localhost:3000
APP_URL=http://localhost:5173
APP_TITLE=Sakshi Portfolio
```

## API

- `GET /api/health`
- `GET /api/resume`
- `GET /api/resume/view`
- `POST /api/chat`

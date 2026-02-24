# Portfolio Backend (Python)

FastAPI backend for Sakshi's portfolio with:
- Resume file serving
- Resume-aware AI chat via OpenRouter
- SQLite chat history storage

## 1) Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

## 2) Environment

Update `backend/.env`:

```env
PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-oss-20b:free
FRONTEND_ORIGINS=http://localhost:5173,http://localhost:3000
APP_URL=http://localhost:5173
APP_TITLE=Sakshi Portfolio
```

## 3) Run

```bash
uvicorn main:app --host 0.0.0.0 --port 5000 --reload
```

## API Endpoints

- `GET /api/health`
- `GET /api/resume`
- `GET /api/resume/view`
- `POST /api/chat`

### `POST /api/chat` request

```json
{
  "message": "What is Sakshi's CGPA?",
  "session_id": "optional-session-id",
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

### Response

```json
{
  "session_id": "uuid",
  "answer": "Sakshi's CGPA is 9.5.",
  "model": "openai/gpt-oss-20b:free"
}
```

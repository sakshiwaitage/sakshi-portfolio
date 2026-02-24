import os
import re
import sqlite3
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal

import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field


load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
RESUME_FILE = BASE_DIR / "public" / "resume" / "resume.pdf"
RESUME_CONTEXT_FILE = BASE_DIR / "resume_context.md"
DATA_DIR = BASE_DIR / "data"
DB_PATH = DATA_DIR / "chat_history.db"

OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "openai/gpt-oss-20b:free")
OPENROUTER_FALLBACK_MODELS = [
    model.strip()
    for model in os.getenv(
        "OPENROUTER_FALLBACK_MODELS",
        "qwen/qwen3-coder:free,google/gemma-3n-e4b-it:free,nvidia/nemotron-nano-9b-v2:free",
    ).split(",")
    if model.strip()
]


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    session_id: str | None = None
    history: list[ChatMessage] = Field(default_factory=list)


class ChatResponse(BaseModel):
    session_id: str
    answer: str
    model: str


app = FastAPI(title="Sakshi Portfolio API", version="2.0.0")

origins = [
    origin.strip()
    for origin in os.getenv("FRONTEND_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def init_database() -> None:
    DATA_DIR.mkdir(exist_ok=True)
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS chat_messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                role TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
                content TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE INDEX IF NOT EXISTS idx_chat_session_created
            ON chat_messages(session_id, created_at)
            """
        )
        conn.commit()


def save_message(session_id: str, role: str, content: str) -> None:
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            INSERT INTO chat_messages (session_id, role, content, created_at)
            VALUES (?, ?, ?, ?)
            """,
            (session_id, role, content, datetime.now(timezone.utc).isoformat()),
        )
        conn.commit()


def load_resume_context() -> str:
    if not RESUME_CONTEXT_FILE.exists():
        return ""
    return RESUME_CONTEXT_FILE.read_text(encoding="utf-8").strip()


def tokenize(text: str) -> set[str]:
    return set(re.findall(r"[a-zA-Z0-9]{2,}", text.lower()))


def relevant_context(query: str, full_context: str, max_chunks: int = 6) -> str:
    chunks = [chunk.strip() for chunk in re.split(r"\n\s*\n", full_context) if chunk.strip()]
    if not chunks:
        return ""

    query_tokens = tokenize(query)
    if not query_tokens:
        return "\n\n".join(chunks[:max_chunks])

    scored: list[tuple[int, str]] = []
    for chunk in chunks:
        overlap = len(tokenize(chunk) & query_tokens)
        if overlap > 0:
            scored.append((overlap, chunk))

    if not scored:
        return "\n\n".join(chunks[:max_chunks])

    scored.sort(key=lambda item: item[0], reverse=True)
    return "\n\n".join(chunk for _, chunk in scored[:max_chunks])


def build_messages(user_message: str, history: list[ChatMessage], context: str) -> list[dict[str, str]]:
    system_prompt = (
        "You are Sakshi Waitage's portfolio assistant. "
        "Answer only using the resume/context provided in the user message. "
        "If the answer is not in context, say you do not have that information. "
        "Keep responses concise, factual, and professional. "
        "Use this structure in every response:\n"
        "1) Summary: one short sentence.\n"
        "2) Details: 2-5 bullet points.\n"
        "3) If data is missing, add 'Missing:' with what is not available."
    )

    messages: list[dict[str, str]] = [{"role": "system", "content": system_prompt}]
    for item in history[-6:]:
        messages.append({"role": item.role, "content": item.content})

    messages.append(
        {
            "role": "user",
            "content": (
                "Resume context:\n"
                f"{context}\n\n"
                f"Question: {user_message}\n\n"
                "Return a direct answer grounded in this context."
            ),
        }
    )
    return messages


def ask_openrouter(messages: list[dict[str, str]]) -> str:
    api_key = os.getenv("OPENROUTER_API_KEY", "").strip()
    if not api_key:
        raise HTTPException(
            status_code=503,
            detail="OpenRouter API key is missing. Set OPENROUTER_API_KEY in backend/.env.",
        )

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": os.getenv("APP_URL", "http://localhost:5173"),
        "X-Title": os.getenv("APP_TITLE", "Sakshi Portfolio"),
    }
    models_to_try = [OPENROUTER_MODEL, *OPENROUTER_FALLBACK_MODELS]
    errors: list[str] = []

    for model in models_to_try:
        payload = {
            "model": model,
            "messages": messages,
            "temperature": 0.2,
        }
        try:
            response = requests.post(OPENROUTER_API_URL, headers=headers, json=payload, timeout=45)
            if response.status_code == 429:
                retry_after = response.headers.get("Retry-After")
                if retry_after and retry_after.isdigit():
                    # Respect provider cooldown for current model before trying another one.
                    time.sleep(min(int(retry_after), 5))
                errors.append(f"{model}: rate_limited")
                continue
            response.raise_for_status()
            data = response.json()
            content = data["choices"][0]["message"]["content"]
            if isinstance(content, list):
                return " ".join(
                    str(item.get("text", "")).strip() for item in content if isinstance(item, dict)
                ).strip()
            return str(content).strip()
        except requests.HTTPError as exc:
            errors.append(f"{model}: {exc}")
            continue
        except requests.RequestException as exc:
            errors.append(f"{model}: {exc}")
            continue
        except (KeyError, IndexError, TypeError) as exc:
            errors.append(f"{model}: invalid_response ({exc})")
            continue

    raise HTTPException(
        status_code=429,
        detail=(
            "OpenRouter rate limits are currently reached across configured models. "
            "Please wait 30-60 seconds and try again, or use a paid model. "
            f"Attempts: {' | '.join(errors)}"
        ),
    )


@app.on_event("startup")
def startup() -> None:
    init_database()


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "time": datetime.now(timezone.utc).isoformat()}


@app.get("/api/resume")
def download_resume() -> FileResponse:
    if not RESUME_FILE.exists():
        raise HTTPException(status_code=404, detail="Resume file not found.")
    return FileResponse(path=RESUME_FILE, filename="Sakshi_Waitage_Resume.pdf", media_type="application/pdf")


@app.get("/api/resume/view")
def view_resume() -> FileResponse:
    if not RESUME_FILE.exists():
        raise HTTPException(status_code=404, detail="Resume file not found.")
    return FileResponse(path=RESUME_FILE, media_type="application/pdf")


@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    session_id = request.session_id or str(uuid.uuid4())
    context = load_resume_context()
    focused_context = relevant_context(request.message, context)
    messages = build_messages(request.message, request.history, focused_context)
    answer = ask_openrouter(messages)

    save_message(session_id=session_id, role="user", content=request.message)
    save_message(session_id=session_id, role="assistant", content=answer)

    return ChatResponse(session_id=session_id, answer=answer, model=OPENROUTER_MODEL)

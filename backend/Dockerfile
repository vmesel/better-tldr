FROM ghcr.io/astral-sh/uv:python3.11-alpine

WORKDIR /app

COPY backend/pyproject.toml .
COPY backend/uv.lock .
RUN uv sync

COPY backend/ .
CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
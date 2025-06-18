import os

from fastapi import FastAPI, Body
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

from agent import summarize_text


app = FastAPI(
    title="BetterTLDR",
    description="A better TLDR using LLMs",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Hello, World!"}


@app.post("/summarize")
def streaming_summarize(text: str = Body(...)):
    return StreamingResponse(summarize_text(text), media_type="text/event-stream")
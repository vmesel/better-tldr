from fastapi import FastAPI, Body
from fastapi.responses import StreamingResponse

from agent import summarize_text


app = FastAPI(
    title="BetterTLDR",
    description="A better TLDR using LLMs",
    version="0.1.0"
)

@app.get("/")
def home():
    return {"message": "Hello, World!"}


@app.post("/summarize")
def streaming_summarize(text: str = Body(...)):
    return StreamingResponse(summarize_text(text), media_type="text/event-stream")
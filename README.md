# Better TLDR

An application that helps users get the best version of a tldr of chat messages/articles and any other piece of text they want.

## Running the application

### Requirements

To run the application you just need the docker compose environment installed in your computer.

#### How to run:

```
docker compose up --build
```

If you want to run the tests of the backend individually:

```
docker compose run backend uv run pytest
```

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required for backend).
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins (default: http://localhost:3000).

## Architecture

The app consists of:
- **Frontend (React/Next.js):** User submits text, receives streamed summary.
- **Backend (FastAPI):** Receives text, streams summary from LLM (OpenAI GPT-4.1).
- **LLM Integration:** All LLM requests are made server-side for security.

**Assumptions:**  
- Users have a valid OpenAI API key.

## Future Improvements

- Add authentication and user accounts.
- Support additional LLM providers (Anthropic, Mistral, etc.).
- Add a history of past summaries.
- Improve error handling and user feedback.

## Scaling and Security

- Backend is stateless and can be scaled horizontally.
- LLM API keys are kept server-side and never exposed to the client.
- CORS is configurable via environment variable.
- Input is validated and sanitized before being sent to the LLM.

### Backend

We chose FastAPI to be the back-end base framework due to it's accessbility and maintainers familiarity.

The LLM for the background application is, as of the writing of this README.md, the OpenAI GPT 4.1.

For the tests infrastructure, we chose pytest because it's an industry standard.


### Front-End

We chose NextJS as it's the new industry standard alongside with React and Tailwind to simplify designing ~(I suck at designing)~.


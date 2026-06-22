# Setup

## Prerequisites

- Python 3.11+
- [`uv`](https://docs.astral.sh/uv/) installed

## Install dependencies

```
uv sync
```

## Configure environment variables

```
cp .env.example .env
```

Fill in `.env` with your own keys:

- `OPENAI_API_KEY` — used by the assistant and the DeepEval judge model
- `LANGSMITH_API_KEY` — used for tracing (optional locally, but needed from Session 6 onward)
- `LANGSMITH_PROJECT` — LangSmith project name to group traces under
- `LANGCHAIN_TRACING_V2` — set to `true` to enable LangSmith auto-tracing

## Verify the environment

```
uv run python -c "import langchain, langgraph, deepeval, streamlit"
```

No output and a zero exit code means the environment is ready.

This doc will grow as later sessions add the assistant, tools, eval harness, and reporting layer — Session 17 finalizes a complete run-it-yourself walkthrough.

"""Assistant entrypoint, backed by the LangGraph stateful orchestration."""

from __future__ import annotations

from app.tracing import traced_invoke


def handle_message(message: str, thread_id: str = "default") -> dict:
    """Send one user message into the assistant's conversation graph.

    `thread_id` identifies the conversation. Calling this again with the
    same `thread_id` resumes from the prior turns (via the graph's
    checkpointer), which is what makes multi-turn clarification work:
    a first call can come back with a clarifying question, and a second
    call with the missing detail picks up where that left off.

    Every call is traced: tagged for LangSmith and appended to a local
    JSONL trace export (see app/tracing.py).
    """
    return traced_invoke(message, thread_id=thread_id)

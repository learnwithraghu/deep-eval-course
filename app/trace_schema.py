"""The trace/event schema taught in the instrumentation lessons.

A trace tells the story of one assistant turn: the input that started it,
any tool calls and their results, and the final output — in order, tied
together by a trace_id and a conversation-level thread_id. This is the
schema both the local JSONL export (app/tracing.py) and, later, failure
capture (Session 7) are built on.
"""

from __future__ import annotations

import uuid
from datetime import datetime, timezone
from typing import Any, Literal

from pydantic import BaseModel, Field

EventType = Literal["input", "tool_call", "tool_result", "output"]


class TraceEvent(BaseModel):
    trace_id: str
    thread_id: str
    sequence: int
    event_type: EventType
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    payload: dict[str, Any]


def new_trace_id() -> str:
    return f"trace-{uuid.uuid4().hex[:12]}"

"""Thin tracing wrapper around the assistant graph.

LangSmith auto-traces every model/tool call once `LANGCHAIN_TRACING_V2=true`
and `LANGSMITH_API_KEY` are set (see `.env.example`) — no code change needed
for that part. What this module adds on top:

1. Tags each graph invocation with course-relevant metadata (a `trace_id`,
   the conversation's `thread_id`, and a fixed project tag) so the LangSmith
   run for one assistant turn is easy to find and filter.
2. Converts that turn's new messages into the `TraceEvent` schema
   (`app/trace_schema.py`) and appends them to a local JSONL file, so later
   tooling (failure capture, Session 7+) doesn't need LangSmith API access.
"""

from __future__ import annotations

import json
from pathlib import Path

from langchain_core.messages import AIMessage, BaseMessage, HumanMessage, ToolMessage

from app.graph import COMPILED_GRAPH
from app.trace_schema import TraceEvent, new_trace_id

TRACE_LOG_PATH = Path(__file__).resolve().parent.parent / "data" / "traces" / "traces.jsonl"


def _previous_message_count(thread_id: str) -> int:
    config = {"configurable": {"thread_id": thread_id}}
    snapshot = COMPILED_GRAPH.get_state(config)
    return len(snapshot.values.get("messages", []))


def _build_trace_events(trace_id: str, thread_id: str, new_messages: list[BaseMessage]) -> list[TraceEvent]:
    events: list[TraceEvent] = []
    sequence = 0

    def emit(event_type, payload):
        nonlocal sequence
        events.append(
            TraceEvent(trace_id=trace_id, thread_id=thread_id, sequence=sequence, event_type=event_type, payload=payload)
        )
        sequence += 1

    for m in new_messages:
        if isinstance(m, HumanMessage):
            emit("input", {"content": m.content})
        elif isinstance(m, ToolMessage):
            try:
                result = json.loads(m.content)
            except (TypeError, ValueError):
                result = m.content
            emit("tool_result", {"name": getattr(m, "name", None), "tool_call_id": m.tool_call_id, "result": result})
        elif isinstance(m, AIMessage) and m.tool_calls:
            for call in m.tool_calls:
                emit("tool_call", {"name": call["name"], "args": call["args"], "tool_call_id": call["id"]})
        elif isinstance(m, AIMessage):
            emit("output", {"content": m.content})

    return events


def _append_events(events: list[TraceEvent]) -> None:
    TRACE_LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with TRACE_LOG_PATH.open("a", encoding="utf-8") as f:
        for event in events:
            f.write(event.model_dump_json() + "\n")


def traced_invoke(message: str, thread_id: str = "default") -> dict:
    """Run one assistant turn, tagged for LangSmith and exported to local JSONL."""
    trace_id = new_trace_id()
    previous_count = _previous_message_count(thread_id)

    config = {
        "configurable": {"thread_id": thread_id},
        "tags": ["shipping-support-assistant"],
        "metadata": {"trace_id": trace_id, "thread_id": thread_id},
        "run_name": "assistant_turn",
    }
    result = COMPILED_GRAPH.invoke({"messages": [HumanMessage(content=message)]}, config=config)

    new_messages = result["messages"][previous_count:]
    events = _build_trace_events(trace_id, thread_id, new_messages)
    _append_events(events)

    reply = result["messages"][-1]
    return {
        "intent": result.get("intent"),
        "reply": reply.content,
        "messages": result["messages"],
        "trace_id": trace_id,
    }

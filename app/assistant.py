"""Assistant entrypoint, backed by the LangGraph stateful orchestration."""

from __future__ import annotations

from langchain_core.messages import HumanMessage

from app.graph import COMPILED_GRAPH


def handle_message(message: str, thread_id: str = "default") -> dict:
    """Send one user message into the assistant's conversation graph.

    `thread_id` identifies the conversation. Calling this again with the
    same `thread_id` resumes from the prior turns (via the graph's
    checkpointer), which is what makes multi-turn clarification work:
    a first call can come back with a clarifying question, and a second
    call with the missing detail picks up where that left off.
    """
    config = {"configurable": {"thread_id": thread_id}}
    result = COMPILED_GRAPH.invoke({"messages": [HumanMessage(content=message)]}, config=config)
    reply = result["messages"][-1]
    return {"intent": result.get("intent"), "reply": reply.content, "messages": result["messages"]}

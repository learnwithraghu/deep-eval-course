"""Stateful orchestration for the assistant.

route -> agent -> (tools -> agent | tools -> fallback -> end)* -> end

`route` tags the turn with an intent for downstream tracing/eval use.
`agent` is the model call, bound to ALL_TOOLS; it either calls a tool
(including the escalation tool) or produces a final reply. A reply with
no tool call can be a resolution *or* a clarifying question — the
distinction isn't structural, it's in the message content. The
clarification loop falls out naturally from multi-turn use: the graph is
compiled with a checkpointer keyed by thread_id, so the next call for the
same thread resumes with the prior turns (including the clarifying
question) already in `messages`.

If any tool call comes back not-found, the graph routes straight to
`fallback` instead of back to `agent` — the model never gets a chance to
paper over a missing record with invented detail, because it never sees
that turn again. This is the "safe fallback" half of grounded responses:
the structural guarantee, not just a prompt instruction.
"""

from __future__ import annotations

import json
from typing import Literal

from langchain_core.messages import AIMessage, SystemMessage, ToolMessage
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, START, StateGraph
from langgraph.prebuilt import ToolNode

from app.fallback import render_not_found
from app.llm import get_chat_model
from app.prompts import SYSTEM_PROMPT
from app.router import classify_intent
from app.state import AssistantState
from tools import ALL_TOOLS


def _route(state: AssistantState) -> dict:
    last_human = next((m for m in reversed(state["messages"]) if m.type == "human"), None)
    intent = classify_intent(last_human.content) if last_human else None
    return {"intent": intent}


def _agent(state: AssistantState) -> dict:
    llm = get_chat_model().bind_tools(ALL_TOOLS)
    response = llm.invoke([SystemMessage(content=SYSTEM_PROMPT), *state["messages"]])
    return {"messages": [response]}


def _should_continue(state: AssistantState) -> Literal["tools", "__end__"]:
    last = state["messages"][-1]
    if getattr(last, "tool_calls", None):
        return "tools"
    return END


def _last_tool_messages(state: AssistantState) -> list[ToolMessage]:
    messages = []
    for m in reversed(state["messages"]):
        if not isinstance(m, ToolMessage):
            break
        messages.append(m)
    return messages


def _first_not_found_error(tool_messages: list[ToolMessage]) -> str | None:
    for m in tool_messages:
        try:
            payload = json.loads(m.content)
        except (TypeError, ValueError):
            continue
        if isinstance(payload, dict) and payload.get("found") is False:
            return payload.get("error")
    return None


def _check_tool_results(state: AssistantState) -> Literal["agent", "fallback"]:
    if _first_not_found_error(_last_tool_messages(state)) is not None:
        return "fallback"
    return "agent"


def _fallback(state: AssistantState) -> dict:
    error_message = _first_not_found_error(_last_tool_messages(state))
    return {"messages": [AIMessage(content=render_not_found(error_message))]}


def build_graph():
    graph = StateGraph(AssistantState)
    graph.add_node("route", _route)
    graph.add_node("agent", _agent)
    graph.add_node("tools", ToolNode(ALL_TOOLS))
    graph.add_node("fallback", _fallback)

    graph.add_edge(START, "route")
    graph.add_edge("route", "agent")
    graph.add_conditional_edges("agent", _should_continue, {"tools": "tools", END: END})
    graph.add_conditional_edges("tools", _check_tool_results, {"agent": "agent", "fallback": "fallback"})
    graph.add_edge("fallback", END)

    return graph.compile(checkpointer=MemorySaver())


COMPILED_GRAPH = build_graph()

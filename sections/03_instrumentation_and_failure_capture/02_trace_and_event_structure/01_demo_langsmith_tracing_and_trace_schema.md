# Demo — Session 6: LangSmith Tracing + Trace Schema

## What this demonstrates

This covers both Section 3.01 (what to log: input, tool calls, tool results, output, conversation IDs) and 3.02 (organizing those into an ordered, replay-friendly trace). Every assistant call now produces a structured LangSmith run *and* a local JSONL trace with exactly those fields, in order — so later tooling (failure capture, evals) doesn't need LangSmith API access.

## What was built

- `app/trace_schema.py` — `TraceEvent` (trace_id, thread_id, sequence, event_type, timestamp, payload), `event_type` is one of `input` / `tool_call` / `tool_result` / `output`
- `app/tracing.py` — `traced_invoke()`: tags the LangSmith run (`tags`, `metadata`, `run_name` in the graph's `config`) and converts the turn's new messages into `TraceEvent`s appended to `data/traces/traces.jsonl`
- `app/assistant.py` *(updated)* — `handle_message()` now delegates to `traced_invoke()`, so every call (including from the Streamlit UI) is traced automatically
- `.gitignore` — `data/traces/*.jsonl` excluded (runtime artifact, not a curated fixture)

## Prerequisites

- Sessions 0-5b complete.
- For the LangSmith half: `LANGSMITH_API_KEY`, `LANGSMITH_PROJECT`, `LANGCHAIN_TRACING_V2=true` in `.env` (already documented in `.env.example` since Session 0).
- The JSONL export half works with **no** API key — verified below using the same stubbed-LLM technique as Sessions 5/5b.

## Run it — no API key needed (trace export check)

```bash
uv run python -c "
from unittest.mock import patch
from langchain_core.messages import AIMessage
import app.graph as g
import app.tracing as t

call_count = {'n': 0}

def fake_agent(state):
    call_count['n'] += 1
    if call_count['n'] == 1:
        return {'messages': [AIMessage(content='', tool_calls=[{'name': 'shipment_lookup', 'args': {'shipment_id': 'SHP-1001'}, 'id': 'call_1'}])]}
    return {'messages': [AIMessage(content='Your shipment SHP-1001 is in transit, last seen in Memphis, TN.')]}

with patch.object(g, '_agent', fake_agent), patch.object(g, 'classify_intent', return_value='tracking'):
    fresh_graph = g.build_graph()
    with patch.object(t, 'COMPILED_GRAPH', fresh_graph):
        result = t.traced_invoke('Where is my shipment SHP-1001?', thread_id='trace-demo')

print('trace_id:', result['trace_id'])
print('reply:', result['reply'])
print()
print(t.TRACE_LOG_PATH.read_text())
"
```

## Expected output

Four JSONL lines, sequence 0-3, in order: `input` (the user's message) → `tool_call` (`shipment_lookup` with its args) → `tool_result` (the shipment record) → `output` (the final reply). Each line is valid JSON matching `TraceEvent`'s fields exactly.

## Run it — live, once `OPENAI_API_KEY` and LangSmith env vars are set

```bash
uv run python -c "
from app.assistant import handle_message
result = handle_message('Where is shipment SHP-1001?', thread_id='live-trace-demo')
print(result['trace_id'])
print(result['reply'])
"
```

Then check the LangSmith project (`LANGSMITH_PROJECT` from `.env`) for a run named `assistant_turn`, tagged `shipping-support-assistant`, with `trace_id`/`thread_id` in its metadata — and confirm `data/traces/traces.jsonl` gained a matching set of events with the same `trace_id`.

## Done check (from BUILD_PLAN.md)

> one assistant call appears as a structured run in LangSmith **and** produces a matching local JSONL trace file.

**Status: the JSONL export half is fully verified above with no API key.** The LangSmith-run half is pending `OPENAI_API_KEY` + LangSmith credentials for a live run.

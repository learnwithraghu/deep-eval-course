# Demo — Session 5: Grounded Responses & Safe Fallback

## What this demonstrates

This section's lesson is that "confidence should come from evidence, not just wording." This demo proves the assistant's safe-fallback behavior is structural, not just a prompt suggestion: an unknown shipment ID is guaranteed to produce a safe, consistent fallback reply — the model never gets a turn to improvise an answer about a record that doesn't exist.

## What was built

- `app/prompts.py` *(finalized)* — explicit "cite tool data only" grounding policy, clarification phrasing, and escalation-confirmation phrasing
- `app/fallback.py` — centralized fallback/escalation templates (`render_not_found`, `CLARIFICATION_TEMPLATE`, `ESCALATION_CONFIRMATION_TEMPLATE`)
- `app/graph.py` *(extended)* — new `fallback` node; any tool call returning `{"found": false}` routes straight to it instead of back to `agent`, ending the turn with a deterministic safe reply
- `docs/assistant_spec.md` — the product spec tying scope, data dependencies, and response policy together

## Prerequisites

- Sessions 0-4 complete.

## Run it — no API key needed (deterministic fallback check)

This stubs only the LLM call inside the graph, so it runs with no `OPENAI_API_KEY` and still exercises the real fallback routing:

```bash
uv run python -c "
from unittest.mock import patch
from langchain_core.messages import AIMessage, HumanMessage
import app.graph as g

call_count = {'n': 0}

def fake_agent(state):
    call_count['n'] += 1
    if call_count['n'] == 1:
        return {'messages': [AIMessage(content='', tool_calls=[{'name': 'shipment_lookup', 'args': {'shipment_id': 'SHP-9999'}, 'id': 'call_1'}])]}
    return {'messages': [AIMessage(content='should not reach here')]}

with patch.object(g, '_agent', fake_agent), patch.object(g, 'classify_intent', return_value='tracking'):
    graph = g.build_graph()
    result = graph.invoke({'messages': [HumanMessage(content='Where is SHP-9999?')]}, config={'configurable': {'thread_id': 'test-fallback'}})

print('agent calls:', call_count['n'])
print('final reply:', result['messages'][-1].content)
"
```

## Expected output

```
agent calls: 1
final reply: No shipment found with ID 'SHP-9999'. I can escalate this to a human agent if you'd like.
```

`agent calls: 1` is the key assertion — the model was only consulted once (to decide to call `shipment_lookup`), never again to phrase the not-found reply. That reply came entirely from `app/fallback.py:render_not_found`.

## Run it — live, once `OPENAI_API_KEY` is set

```bash
uv run python -c "
from app.assistant import handle_message

r1 = handle_message('Where is shipment SHP-9999?', thread_id='demo-fallback')
print('unknown shipment ->', r1['reply'])

r2 = handle_message('Can you help me with my package?', thread_id='demo-ambiguous')
print('ambiguous query ->', r2['reply'])
"
```

## Expected output

- The unknown-shipment message should produce the exact deterministic fallback text (offering escalation), regardless of model variance.
- The ambiguous message should produce a clarifying question asking for the shipment ID, per `app/prompts.py`'s grounding policy.

## Done check (from BUILD_PLAN.md)

> unknown shipment ID and ambiguous query both trigger correct fallback/clarification, never fabricated data.

**Status: the not-found path is structurally verified above without any API calls** — the fallback is deterministic, so this is a real pass, not a pending one. **The ambiguous-query clarification path still depends on live model behavior** (it's still LLM-authored) and is pending `OPENAI_API_KEY` for a live run.

# Shipping Support Assistant — Product Spec

## Scope

The assistant handles exactly 5 customer intents (`app/prompts.py:INTENT_DESCRIPTIONS`):

| Intent | Customer need |
|---|---|
| `tracking` | Where is my shipment / what's its delivery status |
| `delay` | Why is my shipment delayed |
| `refund` | Refund or claim eligibility |
| `customs` | Customs hold / documentation questions |
| `escalation` | Wants a human, or disputes a decision |

Anything else classifies as `other` and is handled conservatively — the assistant should not improvise outside these 5 jobs.

## Data and tool dependencies

The assistant can only know what its tools return (`tools/backend_store.py`, `tools/__init__.py:ALL_TOOLS`):

- `shipment_lookup(shipment_id)` — status, carrier, dates, tracking events
- `order_history(customer_id)` — a customer's shipments
- `policy_lookup(topic)` — refund/delay/customs/escalation/general policy text
- `escalation(customer_id, reason, summary, shipment_id="")` — creates a ticket in `data/backend/tickets.json`

There is no other source of truth. If a tool hasn't returned a fact this turn, the assistant does not know it.

## Response policy

**Cite tool data only.** Every factual claim (status, date, location, policy term) must trace back to a tool result from the current turn. This is enforced two ways:

1. **Prompt-level** (`app/prompts.py:SYSTEM_PROMPT`) — instructs the model never to invent details and to ask for missing identifiers instead of guessing.
2. **Structural** (`app/graph.py`) — if any tool call comes back `{"found": false}`, the graph routes straight to a deterministic fallback node (`app/fallback.py:render_not_found`) and ends the turn. The model never gets a chance to phrase that turn's reply, so it can't paper over a missing record with plausible-sounding fiction. This is the actual safety net — the prompt is a second line of defense, not the only one.

**Clarification.** If the assistant doesn't have enough information to call a tool (e.g. no shipment ID was given), it asks for exactly what's missing rather than guessing. Because the assistant's graph is checkpointed per conversation (`thread_id`), the next message in the same conversation resumes with that clarifying question still in context — see `app/state.py`, `app/graph.py`.

**Escalation.** The assistant calls the `escalation` tool when:
- a shipment/customer/policy record can't be found,
- the customer disputes something that contradicts backend data,
- the request needs a refund decision outside policy auto-approval, or
- the customer explicitly asks for a human.

After escalating, it confirms plainly with the ticket ID (`app/fallback.py:ESCALATION_CONFIRMATION_TEMPLATE`).

## Out of scope

- Anything not covered by the 5 intents above (e.g. account changes, new orders) — the assistant should decline and, if appropriate, escalate rather than attempt it.
- Any claim not backed by a tool result for the current turn.

## Where this is implemented

| Concern | File |
|---|---|
| Intent classification | `app/router.py` |
| Response policy / grounding rules | `app/prompts.py` |
| Fallback phrasing | `app/fallback.py` |
| Orchestration (routing, tool calls, fallback short-circuit) | `app/graph.py` |
| Entrypoint | `app/assistant.py` |
| Backend data | `data/backend/*.json`, `tools/backend_store.py` |
| Tools | `tools/*.py` |

See `docs/demos/README.md` for runnable demos of each of these.

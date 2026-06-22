"""Tool: escalate a request to a human agent by creating a support ticket."""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

from langchain_core.tools import tool

from tools.backend_store import DATA_DIR

TICKETS_PATH = DATA_DIR / "tickets.json"


def _load_tickets() -> list[dict]:
    if not TICKETS_PATH.exists():
        return []
    with TICKETS_PATH.open("r", encoding="utf-8") as f:
        return json.load(f)


def _save_tickets(tickets: list[dict]) -> None:
    with TICKETS_PATH.open("w", encoding="utf-8") as f:
        json.dump(tickets, f, indent=2)
        f.write("\n")


def _next_ticket_id(tickets: list[dict]) -> str:
    return f"TICKET-{len(tickets) + 1:04d}"


@tool
def escalation(customer_id: str, reason: str, summary: str, shipment_id: str = "") -> dict:
    """Escalate a support request to a human agent by creating a ticket.

    Use this when a shipment/customer/policy can't be found, the customer
    disputes data that contradicts backend records, the request needs a
    refund decision outside policy auto-approval, or the customer asks
    for a human directly.
    """
    tickets = _load_tickets()
    ticket = {
        "ticket_id": _next_ticket_id(tickets),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "customer_id": customer_id,
        "shipment_id": shipment_id or None,
        "reason": reason,
        "summary": summary,
        "status": "open",
    }
    tickets.append(ticket)
    _save_tickets(tickets)
    return {"created": True, "ticket": ticket}

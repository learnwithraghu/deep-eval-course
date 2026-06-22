"""Tool: look up a shipment by ID."""

from __future__ import annotations

from dataclasses import asdict

from langchain_core.tools import tool

from tools.backend_store import get_shipment


@tool
def shipment_lookup(shipment_id: str) -> dict:
    """Look up a shipment's status, location, and delivery dates by its shipment ID.

    Returns the shipment record if found, or an explicit not-found result.
    Never invent shipment details that aren't in the returned record.
    """
    shipment = get_shipment(shipment_id)
    if shipment is None:
        return {"found": False, "error": f"No shipment found with ID '{shipment_id}'."}
    data = asdict(shipment)
    data["tracking_events"] = [asdict(e) if not isinstance(e, dict) else e for e in data["tracking_events"]]
    return {"found": True, "shipment": data}

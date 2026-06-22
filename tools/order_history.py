"""Tool: look up a customer's order/shipment history."""

from __future__ import annotations

from langchain_core.tools import tool

from tools.backend_store import get_customer, get_shipment


@tool
def order_history(customer_id: str) -> dict:
    """Look up a customer's shipment history by customer ID.

    Returns a summary (shipment ID, status, destination) for each shipment
    on file for the customer, or an explicit not-found result if the
    customer ID doesn't exist.
    """
    customer = get_customer(customer_id)
    if customer is None:
        return {"found": False, "error": f"No customer found with ID '{customer_id}'."}

    shipments = []
    for shipment_id in customer.order_ids:
        shipment = get_shipment(shipment_id)
        if shipment is None:
            continue
        shipments.append(
            {
                "shipment_id": shipment.shipment_id,
                "status": shipment.status,
                "destination": shipment.destination,
                "estimated_delivery": shipment.estimated_delivery,
                "actual_delivery": shipment.actual_delivery,
            }
        )

    return {
        "found": True,
        "customer_id": customer.customer_id,
        "name": customer.name,
        "loyalty_tier": customer.loyalty_tier,
        "shipments": shipments,
    }

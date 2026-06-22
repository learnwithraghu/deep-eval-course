"""Typed loaders and lookups for the mock backend JSON fixtures.

These functions are the only sanctioned way for the assistant's tools to
read shipment, customer, and policy data. A lookup either returns the
record or `None` — callers must handle the `None` case explicitly rather
than guessing at a plausible answer.
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / "data" / "backend"


@dataclass(frozen=True)
class TrackingEvent:
    timestamp: str
    location: str
    event: str


@dataclass(frozen=True)
class Shipment:
    shipment_id: str
    customer_id: str
    status: str
    carrier: str
    origin: str
    destination: str
    ship_date: str
    estimated_delivery: str
    actual_delivery: str | None
    last_known_location: str
    delay_reason: str | None
    tracking_events: list[TrackingEvent]


@dataclass(frozen=True)
class Customer:
    customer_id: str
    name: str
    email: str
    loyalty_tier: str
    order_ids: list[str]


@dataclass(frozen=True)
class Policy:
    policy_id: str
    topic: str
    summary: str
    full_text: str
    conditions: list[str]


def _load_json(filename: str) -> list[dict]:
    path = DATA_DIR / filename
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


@lru_cache(maxsize=1)
def load_shipments() -> dict[str, Shipment]:
    records = {}
    for raw in _load_json("shipments.json"):
        events = [TrackingEvent(**e) for e in raw["tracking_events"]]
        shipment = Shipment(
            shipment_id=raw["shipment_id"],
            customer_id=raw["customer_id"],
            status=raw["status"],
            carrier=raw["carrier"],
            origin=raw["origin"],
            destination=raw["destination"],
            ship_date=raw["ship_date"],
            estimated_delivery=raw["estimated_delivery"],
            actual_delivery=raw["actual_delivery"],
            last_known_location=raw["last_known_location"],
            delay_reason=raw["delay_reason"],
            tracking_events=events,
        )
        records[shipment.shipment_id] = shipment
    return records


@lru_cache(maxsize=1)
def load_customers() -> dict[str, Customer]:
    records = {}
    for raw in _load_json("customers.json"):
        customer = Customer(**raw)
        records[customer.customer_id] = customer
    return records


@lru_cache(maxsize=1)
def load_policies() -> dict[str, Policy]:
    records = {}
    for raw in _load_json("policies.json"):
        policy = Policy(**raw)
        records[policy.policy_id] = policy
    return records


def get_shipment(shipment_id: str) -> Shipment | None:
    return load_shipments().get(shipment_id)


def get_customer(customer_id: str) -> Customer | None:
    return load_customers().get(customer_id)


def get_policy(policy_id: str) -> Policy | None:
    return load_policies().get(policy_id)


def find_policies_by_topic(topic: str) -> list[Policy]:
    return [p for p in load_policies().values() if p.topic == topic]

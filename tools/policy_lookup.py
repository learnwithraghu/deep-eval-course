"""Tool: look up support policy text by topic or policy ID."""

from __future__ import annotations

from dataclasses import asdict

from langchain_core.tools import tool

from tools.backend_store import find_policies_by_topic, get_policy

VALID_TOPICS = {"refund", "delay", "customs", "escalation", "general"}


@tool
def policy_lookup(topic: str) -> dict:
    """Look up support policy text for a topic.

    Valid topics: refund, delay, customs, escalation, general.
    Returns the matching policy summary, full text, and conditions.
    Never state a policy term that isn't present in the returned data.
    """
    normalized = topic.strip().lower()
    if normalized not in VALID_TOPICS:
        return {
            "found": False,
            "error": f"'{topic}' is not a recognized policy topic. Valid topics: {sorted(VALID_TOPICS)}.",
        }

    policies = find_policies_by_topic(normalized)
    if not policies:
        return {"found": False, "error": f"No policy found for topic '{topic}'."}

    return {"found": True, "policies": [asdict(p) for p in policies]}


def policy_lookup_by_id(policy_id: str) -> dict:
    """Direct (non-LLM-facing) lookup of a policy by its exact ID."""
    policy = get_policy(policy_id)
    if policy is None:
        return {"found": False, "error": f"No policy found with ID '{policy_id}'."}
    return {"found": True, "policy": asdict(policy)}

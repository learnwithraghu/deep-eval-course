"""Centralized fallback and escalation phrasing.

Not-found tool results short-circuit the graph (see app/graph.py) straight
to `render_not_found` instead of asking the model to phrase a "couldn't
find it" reply itself. That makes the highest-risk failure mode — claiming
something exists when it doesn't — impossible by construction, not just
discouraged by a prompt.
"""

from __future__ import annotations

GENERIC_FALLBACK = (
    "I'm not able to confirm that from the information available. "
    "I can escalate this to a human agent if you'd like."
)

CLARIFICATION_TEMPLATE = "Could you share your {field} so I can look into this?"

ESCALATION_CONFIRMATION_TEMPLATE = (
    "I've escalated this to a human agent (ticket {ticket_id}). They'll follow up with you directly."
)


def render_not_found(error_message: str | None) -> str:
    """Wrap a tool's own not-found error with a consistent, safe offer to escalate."""
    if not error_message:
        return GENERIC_FALLBACK
    return f"{error_message} I can escalate this to a human agent if you'd like."

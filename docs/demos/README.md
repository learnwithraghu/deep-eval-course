# Demo Guides Index

Each entry below maps a `BUILD_PLAN.md` build session to the course section it teaches and the hands-on demo file that proves it works. Use this when you're not sure what to run next, or which lesson a piece of code belongs to.

| Session | What it builds | Course section | Demo file |
|---|---|---|---|
| 0 | Repo & tooling bootstrap (`uv`, env config) | _(precedes Module 1 — no section tag)_ | [docs/demos/00_demo_bootstrap.md](00_demo_bootstrap.md) |
| 1 | Mock backend data layer (`tools/backend_store.py`) | [02 — Tools, Data, and Boundaries](../../sections/02_the_assistant_we_are_building/02_tools_data_and_boundaries/README.md) | [01_demo_mock_backend_data_layer.md](../../sections/02_the_assistant_we_are_building/02_tools_data_and_boundaries/01_demo_mock_backend_data_layer.md) |
| 2 | Tool definitions (`tools/shipment_lookup.py`, etc.) | [02 — Tools, Data, and Boundaries](../../sections/02_the_assistant_we_are_building/02_tools_data_and_boundaries/README.md) | [02_demo_tool_definitions.md](../../sections/02_the_assistant_we_are_building/02_tools_data_and_boundaries/02_demo_tool_definitions.md) |
| 3 | Baseline assistant orchestration (`app/llm.py`, `app/router.py`, `app/assistant.py`) | [03 — Orchestration with LangChain/LangGraph](../../sections/02_the_assistant_we_are_building/03_orchestration_with_langchain_langgraph/README.md) | [03_demo_baseline_assistant_orchestration.md](../../sections/02_the_assistant_we_are_building/03_orchestration_with_langchain_langgraph/03_demo_baseline_assistant_orchestration.md) |
| 4 | LangGraph stateful orchestration (`app/state.py`, `app/graph.py`) | [03 — Orchestration with LangChain/LangGraph](../../sections/02_the_assistant_we_are_building/03_orchestration_with_langchain_langgraph/README.md) | [04_demo_langgraph_stateful_orchestration.md](../../sections/02_the_assistant_we_are_building/03_orchestration_with_langchain_langgraph/04_demo_langgraph_stateful_orchestration.md) |
| 5 | Grounded responses & safe fallback (`app/fallback.py`, finalized `app/prompts.py`, extended `app/graph.py`) | [04 — Grounded Responses and Safe Fallback](../../sections/02_the_assistant_we_are_building/04_grounded_responses_and_safe_fallback/README.md) | [05_demo_grounded_responses_and_safe_fallback.md](../../sections/02_the_assistant_we_are_building/04_grounded_responses_and_safe_fallback/05_demo_grounded_responses_and_safe_fallback.md) |

More rows are appended here as later sessions land. Demo files for sessions tied to a course section live inside that section's folder (right next to its `README.md`); sessions with no section tag (like Session 0) get a file here in `docs/demos/`.

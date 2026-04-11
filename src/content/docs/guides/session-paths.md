---
title: Session Paths
description: Use bounded session paths to help your AI agent connect entry pages, exit pages, goals, funnels, retention, and experiments without opening a dashboard.
---

Session paths help your agent answer a practical growth question:

> Which landing pages bring people in, where do those sessions end, and what should we improve next?

Use this when a top-pages report is too shallow, but a dashboard-style journey explorer is too much ceremony.

The report connects:

- entry pages
- in-session page changes
- meaningful events
- goal conversion
- exit pages
- terminal states: `goal`, `drop_off`, or `truncated`

Your agent can then decide whether the next useful step is a funnel, a retention check, or an experiment.

## When to use paths

Ask your agent for paths when:

- a page gets traffic but you do not know what visitors do next
- a landing page looks good in page stats but does not convert
- a key flow has drop-off and you need to know which pages people leave from
- you want the next experiment to target a real journey, not a random page
- you want to connect `pages -> paths -> funnels -> retention -> experiments`

Do not use paths for long-cycle user attribution. v1 is intentionally session-local: a goal only counts when it happens in the same session.

## Copyable prompts

Use prompts like these with your AI agent:

```text
Show me session paths for my-site with signup as the goal. Summarize the top entry pages, top exit pages, and the one path most worth improving next.
```

```text
Which entry pages start the most sessions but fail to reach signup? For each one, tell me the most common exit page and the next funnel I should check.
```

```text
Look at session paths for my-site with signup as the goal. Pick one high-traffic drop-off path and propose one narrow experiment to improve it.
```

```text
Which content or docs entry pages lead to deeper product pages or signup? Ignore vanity traffic and focus on paths that suggest real intent.
```

## What the report includes

Each path report is grouped by entry page.

For every entry page, the agent receives:

- `sessions`: sessions that started on that entry page
- `conversions`: sessions where the goal event happened in the same session
- `conversion_rate`: converted sessions divided by sessions
- `exit_pages`: the pages where those sessions ended, with conversion and drop-off attribution
- `tree`: a compact journey tree of pages, meaningful events, goals, drop-offs, and truncations

The important distinction:

- `entry_page` is where the session started
- `exit_pages[]` shows where those sessions ended
- `tree[]` shows what happened between entry and terminal state

## Terminal states

A path ends in one of three terminal states:

- `goal`: the requested goal event appeared in the same session
- `drop_off`: the session ended without the goal
- `truncated`: the session continued past the configured step cap without the goal

For `drop_off` and `truncated`, the terminal node includes `exit_page` so the agent can say where the session actually ended.

## Bounds

Paths are intentionally bounded so they are safe for agent workflows:

| Knob | Default | Allowed |
| --- | ---: | ---: |
| `since` | `30d` | `7d`, `14d`, `30d`, `90d` |
| `max_steps` | `5` | `1-5` |
| `entry_limit` | `10` | `1-20` |
| `path_limit` | `5` | `1-10` |
| `candidate_session_cap` | `5000` | `100-10000` |

Requests outside those bounds fail instead of silently expanding the workload.

The default workload is smaller than the maximum: `30d`, `10` entry pages, `5,000` candidate sessions, `5` steps, and `5` branches per node.

The endpoint is also query-bounded:

- it starts from candidate sessions, not an unbounded event scan
- it uses at most two database read queries
- it does not run per-entry-page fanout queries
- it does not do user-level cross-session stitching
- it does not use response caching in v1

## CLI and MCP

If your agent is shell-first, it can use:

```bash
agent-analytics paths my-site --goal signup --since 30d --max-steps 5
```

If your agent is MCP-first, use the `analytics_paths` tool with the same bounded knobs.

The human-readable output should stay compact: top entry pages, exit attribution, terminal labels, and the next recommended analysis step.

## How to interpret paths

Start with the entry page that has enough sessions to matter.

Then ask:

- Which exit page has the most drop-offs?
- Does the path reach the expected funnel step before dropping?
- Is the goal missing because users never reach the next page, or because they reach it and fail there?
- Should the next action be a funnel query, a retention check, or an experiment?

Examples:

- If `/blog/post-a` drives visits that later convert, treat it as an acquisition asset, not just content traffic.
- If `/pricing` is a common exit page, that might be normal comparison behavior.
- If `/signup` is a common exit page without `signup`, that is a flow problem worth investigating.
- If paths truncate often, reduce noise in event tracking or narrow the question with a smaller goal and fewer steps.

## Good follow-up prompts

```text
For the top path that drops off, build a funnel from page_view to signup and show the largest step loss.
```

```text
For the entry page with the highest drop-off rate, suggest one experiment that could reduce exits without changing the whole page.
```

```text
Check whether visitors who enter through this page return later. Use retention after reading the path summary.
```

## Related

- [AI Agent Experiment Tracking](/guides/ai-agent-experiment-tracking/)
- [SPA and Virtual Page Tracking](/guides/spa-and-virtual-page-tracking/)
- [CLI](/reference/cli/)
- [Plugin vs Skill vs MCP vs API](/reference/cli-mcp-api/)
- [API Reference](/api/)

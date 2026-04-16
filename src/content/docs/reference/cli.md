---
title: CLI
description: Use the Agent Analytics CLI as the official shell-first wrapper around the documented HTTP API, with agent-session login and common analytics commands.
---

The Agent Analytics CLI is the official shell-first wrapper around the documented HTTP API. Use it when your AI agent already has terminal access and you want predictable command output with lower overhead than MCP-style tool calls.

The published package is `@agent-analytics/cli`. For one-off use, run it through `npx` with a pinned version:

```bash
npx @agent-analytics/cli@0.5.14 --help
```

Source repo: [Agent-Analytics/agent-analytics-cli](https://github.com/Agent-Analytics/agent-analytics-cli)

In the rest of this page, `agent-analytics` means the CLI binary from that same package and version.

## When to use the CLI

Choose the CLI when:

- your agent already works in a shell-first environment
- you want a thin wrapper over the hosted API instead of a connector flow
- you want command composition and scripting instead of tool-call round trips
- you want local auth helpers such as `login`, `logout`, and `whoami`

If you are deciding between access paths rather than looking for CLI usage itself, start with [Plugin vs Skill vs MCP vs API](/reference/cli-mcp-api/).

## Login and local config

The CLI is agent-session-first:

- default: `agent-analytics login` opens browser approval with a local loopback callback
- detached handoff: `agent-analytics login --detached` prints an approval URL and exits so issue-based or remote runtimes can resume with a finish code
- optional polling: `agent-analytics login --detached --wait` keeps the process alive for local shells that can wait for browser approval
- advanced/manual only: `agent-analytics login --token aak_...`

Do not treat pasted long-lived API keys as the primary onboarding path. Browser approval is the normal hosted flow.

The CLI stores local config at `$XDG_CONFIG_HOME/agent-analytics/config.json`, with fallback to `~/.config/agent-analytics/config.json`.

Credential lookup still respects environment overrides first, so `AGENT_ANALYTICS_API_KEY` continues to win until you unset it.

## Common commands

```bash
agent-analytics projects
agent-analytics whoami
agent-analytics create my-site --domain https://mysite.com
agent-analytics stats my-site --days 7
agent-analytics insights my-site --period 7d
agent-analytics events my-site --days 7 --limit 20
agent-analytics breakdown my-site --property path --event page_view --days 7 --limit 10
agent-analytics paths my-site --goal signup --since 30d --max-steps 5
agent-analytics funnel my-site --steps "page_view,signup,purchase"
agent-analytics retention my-site --period week --cohorts 8
agent-analytics experiments list my-site
agent-analytics logout
```

The main command families are:

- account and auth: `login`, `logout`, `whoami`, `revoke-key`
- project setup: `create`, `projects`
- reporting: `stats`, `insights`, `breakdown`, `pages`, `paths`, `sessions-dist`, `events`, `sessions`, `query`
- live monitoring: `live`
- schema discovery: `properties`, `properties-received`
- analysis workflows: `funnel`, `retention`, `experiments`
- product feedback: `feedback`

`revoke-key` only applies when the CLI is using a saved raw API key from `login --token`. Scoped agent sessions cannot rotate raw account API keys; manage those keys from the dashboard.

## Project management

`projects` prints each project's name, ID, project token, and allowed origins. `project`, `update`, and `delete` accept either the exact project name or the project ID.

Use `update` to change allowed origins without leaving the CLI. For local browser QA, keep the production origin and add the temporary local origin:

```bash
agent-analytics update stylio --origins 'https://stylio.app,http://lvh.me:3101'
```

## CLI to API mapping

Most CLI workflows map directly to an HTTP endpoint. The main exception is local auth convenience commands such as `logout`, which only modify local CLI state.

| CLI Command | API Endpoint |
| --- | --- |
| `agent-analytics stats my-site` | `GET /stats?project=my-site` |
| `agent-analytics all-sites --period 7d` | `GET /account/all-sites?period=7d` |
| `agent-analytics bot-traffic my-site --period 7d` | `GET /bot-traffic?project=my-site&period=7d` |
| `agent-analytics bot-traffic --all --period 7d` | `GET /account/bot-traffic?period=7d` |
| `agent-analytics events my-site` | `GET /events?project=my-site` |
| `agent-analytics query my-site --metrics event_count` | `POST /query` |
| `agent-analytics query my-site --metrics event_count --count-mode raw` | `POST /query` |
| `agent-analytics paths my-site --goal signup` | `POST /paths` |
| `agent-analytics funnel my-site --steps "page_view,signup,purchase"` | `POST /funnel` |
| `agent-analytics retention my-site --period week --cohorts 8` | `GET /retention?project=my-site&period=week&cohorts=8` |
| `agent-analytics experiments list my-site` | `GET /experiments?project=my-site` |
| `agent-analytics experiments create my-site --name signup_cta --variants control,new_cta --goal signup` | `POST /experiments` |
| `agent-analytics experiments get exp_abc123` | `GET /experiments/{id}` |
| `agent-analytics projects` | `GET /projects` |
| `agent-analytics project my-site` | `GET /projects/{id}` after resolving name or ID |
| `agent-analytics update my-site --origins https://mysite.com` | `PATCH /projects/{id}` after resolving name or ID |
| `agent-analytics delete my-site` | `DELETE /projects/{id}` after resolving name or ID |
| `agent-analytics logout` | None. Local-only command that clears saved CLI auth and does not call the API. |

`logout` clears the auth state saved by the CLI on disk. It does not revoke credentials on the server.

## Query caveats

- The canonical CLI syntax is `agent-analytics query <project> ...`. Do not use `--project`.
- `/events` stays raw and lossless. `/query` uses `session_then_user` as the default for `event_count`.
- For recent signup or ingestion debugging, check `events <project> --event <actual_event_name>` first; use `query` after verifying the raw event names the project emits.
- Use `--count-mode raw` when the question is about ingestion volume or duplicate-write debugging rather than activation-safe counts.
- Built-in query fields are `event`, `user_id`, `date`, `country`, `session_id`, and `timestamp`.
- Non-built-in fields such as `referrer`, `utm_source`, `path`, `browser`, and `hostname` must be written as `properties.<key>`.
- `group_by` is limited to built-in fields only: `event`, `date`, `user_id`, `session_id`, and `country`.
- If you need low-level payload or filter debugging, move to the [API Reference](/api/) instead of forcing complex shell JSON into the CLI.

## Related

- [Plugin vs Skill vs MCP vs API](/reference/cli-mcp-api/)
- [Authentication](/reference/authentication/)
- [Rate Limits](/reference/rate-limits/)
- [API Reference](/api/)

---
title: CLI vs MCP vs API
description: Agent Analytics can be used through MCP, the CLI, or raw HTTP. Choose the interface that fits the environment your agent already has.
---

Agent Analytics has three real access modes:

- `MCP` for chat-native and editor-native tool use
- `CLI` for shell-oriented agent workflows
- `API` for raw HTTP control

The CLI is a convenience wrapper around the same public HTTP API. If an environment is strict about transient package execution or security scanners dislike `npx`, use the API docs directly and keep the same underlying workflows.

Which one is best depends on what your agent can already do.

## When to use each

### MCP

Use MCP when your agent already runs inside a tool that supports connectors or MCP servers, such as Claude Desktop, Cowork, Cursor, or Claude Code plugin flows.

MCP is usually the best fit when:

- you want the install to feel native inside chat
- you want tool calls instead of shell commands
- you do not want to hand-roll auth headers or request payloads
- you want quick project or account summaries like `analytics_overview`, `bot_traffic_overview`, or `all_sites_bot_traffic`

Tradeoff:

- MCP often adds more latency and token overhead than skill + CLI flows because the model has to manage more tool-call round trips and tool result payloads.

### CLI

Use the CLI when your agent already has terminal access and is comfortable executing commands.

CLI is usually the best fit when:

- your agent already lives in a shell-first environment
- you want predictable command output
- you prefer command composition over tool integration
- you want lower overhead than MCP in editor-style agents like Cursor

### API

Use the API when you want strict control over requests, retries, and response parsing.

API is usually the best fit when:

- you are integrating from your own code
- you need exact HTTP-level behavior
- you are debugging auth or payload shape directly

## CLI to API mapping

Every major CLI workflow maps directly to an HTTP endpoint:

| CLI Command | API Endpoint |
| --- | --- |
| `npx @agent-analytics/cli stats my-site` | `GET /stats?project=my-site` |
| `npx @agent-analytics/cli all-sites --period 7d` | `GET /account/all-sites?period=7d` |
| `npx @agent-analytics/cli bot-traffic my-site --period 7d` | `GET /bot-traffic?project=my-site&period=7d` |
| `npx @agent-analytics/cli bot-traffic --all --period 7d` | `GET /account/bot-traffic?period=7d` |
| `npx @agent-analytics/cli events my-site` | `GET /events?project=my-site` |
| `npx @agent-analytics/cli query --project my-site --metrics event_count` | `POST /query` |
| `npx @agent-analytics/cli funnel my-site --steps "page_view,signup,purchase"` | `POST /funnel` |
| `npx @agent-analytics/cli retention my-site --period week --cohorts 8` | `GET /retention?project=my-site&period=week&cohorts=8` |
| `npx @agent-analytics/cli experiments list my-site` | `GET /experiments?project=my-site` |
| `npx @agent-analytics/cli experiments create my-site --name signup_cta --variants control,new_cta --goal signup` | `POST /experiments` |
| `npx @agent-analytics/cli experiments get exp_abc123` | `GET /experiments/{id}` |
| `npx @agent-analytics/cli projects` | `GET /projects` |

## Quick rule of thumb

- Choose `CLI` first in shell-capable environments like Cursor when the agent can run commands directly.
- Choose `MCP` when you specifically want native connector-style tool use or do not have a good shell path.
- Choose `API` when you need full control or lower-level debugging.

## Related

- [Bot Traffic](/reference/bot-traffic/)
- [Installation Overview](/installation/)
- [Authentication](/reference/authentication/)
- [API Reference](/api/)

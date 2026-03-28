---
title: CLI vs MCP vs API
description: Agent Analytics exposes one analytics surface through MCP, the CLI, and raw HTTP. Choose the interface that fits the environment your AI agent already has.
---

Agent Analytics exposes the same analytics surface through three real access modes:

- `MCP` for chat-native and editor-native tool use
- `CLI` for shell-oriented agent workflows
- `API` for raw HTTP control

The product model does not change between them. Projects, analytics reads, and experiment operations stay the same; only the interface changes.

The CLI is a convenience wrapper around the same public HTTP API. If an environment is strict about transient package execution or security scanners dislike `npx`, use the API docs directly and keep the same underlying workflows.

Which one is best depends on what your AI agent can already do and where it already lives.

## When to use each

### MCP

Use MCP when your AI agent already runs inside a tool that supports connectors or MCP servers, such as Claude Desktop, Cowork, Cursor, or Claude Code plugin flows.

MCP is usually the best fit when:

- you want the install to feel native inside chat
- you want tool calls instead of shell commands
- you do not want to hand-roll auth headers or request payloads
- you want quick project or account summaries like `analytics_overview`, `bot_traffic_overview`, or `all_sites_bot_traffic`

Tradeoff:

- MCP often adds more latency and token overhead than skill + CLI flows because the model has to manage more tool-call round trips and tool result payloads.

### CLI

Use the CLI when your AI agent already has terminal access and is comfortable executing commands.

CLI is usually the best fit when:

- your AI agent already lives in a shell-first environment
- you want predictable command output
- you prefer command composition over tool integration
- you want lower overhead than MCP in editor-style agents like Cursor
- you want simple local auth helpers like `login` and `logout` around the same API

### API

Use the API when you want strict control over requests, retries, and response parsing.

API is usually the best fit when:

- you are integrating from your own code
- you need exact HTTP-level behavior
- you are debugging auth or payload shape directly

## CLI to API mapping

Most CLI workflows map directly to an HTTP endpoint. The main exception is local auth convenience commands such as `logout`, which only modify local CLI state:

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
| `npx @agent-analytics/cli logout` | None. Local-only command that clears saved CLI auth and does not call the API. |

`logout` clears the API key saved by the CLI on disk. It does not revoke the key on the server. If you exported `AGENT_ANALYTICS_API_KEY` in your shell, the CLI will still authenticate with that environment variable until you unset it.

## Quick rule of thumb

- Choose `CLI` first in shell-capable environments when the agent can run commands directly.
- Choose `MCP` when the agent already lives inside a connector-style chat environment and you want native tool calls.
- Choose `API` when you need full control, custom integration, or lower-level debugging.

If you are choosing from scratch, think about it this way:

- `CLI` is usually the default for coding agents with terminal access.
- `MCP` is usually the default for chat-native tools without a good shell path.
- `API` is the lowest-level option when you are building your own integration.

## Related

- [Bot Traffic](/reference/bot-traffic/)
- [Installation Overview](/installation/)
- [Authentication](/reference/authentication/)
- [API Reference](/api/)

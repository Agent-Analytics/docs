---
title: Plugin vs Skill vs MCP vs CLI vs API
description: Agent Analytics exposes one analytics surface through plugin, skill, MCP, CLI, and raw HTTP. Choose the native path that fits the environment your AI agent already uses.
---

Agent Analytics exposes one analytics surface through five real access paths:

- `Plugin` for Claude Code when you want the MCP connection and analytics workflow layer bundled together
- `Skill` for agent environments that already support skills and command execution
- `MCP` for chat-native and editor-native tool use
- `CLI` for shell-oriented agent workflows
- `API` for raw HTTP control

The product model does not change between them. Projects, analytics reads, and experiment operations stay the same; only the native entrypoint changes.

## Recommended path by environment

| Environment | Recommended path | Why |
| --- | --- | --- |
| Claude Code | Plugin first | Shortest hosted path with both MCP connectivity and Agent Analytics workflow guidance |
| Claude Desktop / Cowork | Hosted MCP | Best fit for connector-style chat tools with native tool calls |
| Cursor | Skill + CLI first | Usually lower overhead than MCP when the agent can already run commands |
| OpenAI Codex | Skill first | Keeps the workflow agent-native without requiring MCP |
| OpenClaw | Skill first | Cleanest path for scheduled analytics workflows from chat |
| Custom runtime or internal agent | API | Best fit when you own retries, parsing, and orchestration |

## When to use each path

### Plugin

Use the plugin when your environment is Claude Code and you want one install that packages both:

- the hosted MCP connection
- the analytics-specific workflow layer

This is the cleanest default when the plugin marketplace is available.

### Skill

Use a skill when your agent already supports skills and can execute commands in the same environment.

A skill is usually the best fit when:

- you want a guided workflow layer around common analytics tasks
- your agent already has terminal access
- you want to stay in the agent's native loop instead of switching to tool-call-heavy MCP flows

### MCP

Use MCP when your AI agent already runs inside a tool that supports connectors or MCP servers.

MCP is usually the best fit when:

- you want the install to feel native inside chat
- you want tool calls instead of shell commands
- you do not want to hand-roll auth headers or request payloads
- you want quick project or account summaries through structured tool responses

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

- Choose `plugin` first in Claude Code when the marketplace path is available.
- Choose `skill + CLI` first in shell-capable environments like Cursor or Codex.
- Choose `MCP` when the agent already lives in a connector-style chat environment and you want native tool calls.
- Choose `API` when you need full control, custom integration, or lower-level debugging.

## Related

- [Installation Overview](/installation/)
- [Authentication](/reference/authentication/)
- [Bot Traffic](/reference/bot-traffic/)
- [API Reference](/api/)

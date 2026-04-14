---
title: Plugin vs Skill vs MCP vs API
description: Agent Analytics exposes one analytics surface through plugin, skill, MCP, CLI, and raw HTTP. Use this page to choose the native path that fits the environment your AI agent already uses.
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
| OpenClaw | Skill first | Cleanest path when OpenClaw owns the scheduled analytics job from chat |
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
- you want agent-readable reports such as `analytics_paths`, where the tool response includes both compact text and structured data

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
- you want shell-readable commands such as `paths` that summarize entry pages, exit pages, terminal labels, and next-step analysis

For install, login flow, common commands, and CLI-to-API mapping, continue to the dedicated [CLI page](/reference/cli/).

### API

Use the API when you want strict control over requests, retries, and response parsing.

API is usually the best fit when:

- you are integrating from your own code
- you need exact HTTP-level behavior
- you are debugging auth or payload shape directly

## Quick rule of thumb

- Choose `plugin` first in Claude Code when the marketplace path is available.
- Choose `skill + CLI` first in shell-capable environments like Cursor or Codex.
- Choose `MCP` when the agent already lives in a connector-style chat environment and you want native tool calls.
- Choose `API` when you need full control, custom integration, or lower-level debugging.

## Paths Across Access Paths

Session paths are available through the same product surface:

- CLI: `agent-analytics paths <project> --goal <event>`
- MCP: `analytics_paths`
- API: `POST /paths`

Use paths when the agent needs to connect entry pages and exit pages to goal behavior before deciding whether to run a funnel query, retention check, or experiment.

The report is intentionally bounded and session-local. It is not a long-cycle identity-stitching report.

## Related

- [CLI](/reference/cli/)
- [Session Paths](/guides/session-paths/)
- [Installation Overview](/installation/)
- [Authentication](/reference/authentication/)
- [Bot Traffic](/reference/bot-traffic/)
- [API Reference](/api/)

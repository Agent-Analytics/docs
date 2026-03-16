---
title: OpenClaw
description: Install the Agent Analytics skill in OpenClaw from ClawHub, expose your API key once, and use the official CLI from chat.
---

For OpenClaw, the cleanest path is the hosted ClawHub skill. It keeps setup agent-native and works well with CLI-oriented workflows.

The important detail: `npx` is only the launcher. The skill is using the official Agent Analytics CLI, and that CLI wraps the same documented HTTP API shown in the docs.

## Prerequisites

- An Agent Analytics account at [app.agentanalytics.sh](https://app.agentanalytics.sh)
- A valid Agent Analytics API key stored as `AGENT_ANALYTICS_API_KEY`
- Access to the OpenClaw environment where you want the skill installed

## Recommended: install from ClawHub

Tell OpenClaw:

> Install the Agent Analytics skill from ClawHub. My API key is available in `AGENT_ANALYTICS_API_KEY`. Use the official Agent Analytics CLI.

The hosted listing is here:

- [Agent Analytics on ClawHub](https://clawhub.ai/dannyshmueli/agent-analytics)

Once installed, OpenClaw can create projects, generate tracking snippets, query stats, inspect funnels, and manage experiments from the same conversation loop.

The public docs still matter because they show exactly what the CLI is wrapping:

- [CLI vs MCP vs API](/reference/cli-mcp-api/)
- [API Reference](/api/)

That is the right explanation if a security review asks what the `npx` command is doing.

## Verify the install

Ask OpenClaw:

- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `Send me a daily analytics summary every morning`

If you have not created your first real project yet, continue with [First Project in 5 Minutes](/guides/first-project-in-5-minutes/).

## Troubleshooting

- If ClawHub flags the skill because of `npx`, point reviewers to [CLI vs MCP vs API](/reference/cli-mcp-api/) and [API Reference](/api/). The CLI is the official wrapper around those documented endpoints.
- If the skill installs but cannot query data, confirm `AGENT_ANALYTICS_API_KEY` is available in the OpenClaw environment instead of pasted into chat.
- If OpenClaw can create projects but not read analytics, verify the key belongs to the same Agent Analytics account you expect.
- If you need endpoint-level debugging, use the [API reference](/api/) with `curl` before returning to the skill flow.

## Related

- [Getting Started](/getting-started/)
- [First Project in 5 Minutes](/guides/first-project-in-5-minutes/)
- [Claude Code](/installation/claude-code/)
- [OpenAI Codex](/installation/openai-codex/)
- [API Reference](/api/)

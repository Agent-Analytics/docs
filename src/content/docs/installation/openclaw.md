---
title: OpenClaw
description: Install the Agent Analytics skill in OpenClaw from ClawHub, expose your API key once, and let the agent handle analytics workflows from chat.
---

For OpenClaw, the cleanest path is the hosted ClawHub skill. It keeps the setup agent-native and gives the model higher-level analytics workflows instead of forcing raw HTTP requests.

## Prerequisites

- An Agent Analytics account at [app.agentanalytics.sh](https://app.agentanalytics.sh)
- A valid Agent Analytics API key stored as `AGENT_ANALYTICS_API_KEY`
- Access to the OpenClaw environment where you want the skill installed

## Recommended: install from ClawHub

Tell OpenClaw:

> Install the Agent Analytics skill from ClawHub. My API key is available in `AGENT_ANALYTICS_API_KEY`.

The hosted listing is here:

- [Agent Analytics on ClawHub](https://clawhub.ai/dannyshmueli/agent-analytics)

Once installed, OpenClaw can create projects, generate tracking snippets, query stats, inspect funnels, and manage experiments from the same conversation loop.

## Verify the install

Ask OpenClaw:

- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `Send me a daily analytics summary every morning`

If you have not created your first real project yet, go back to [Getting Started](/getting-started/#3-create-your-first-project) and do that next.

## Troubleshooting

- If the skill installs but cannot query data, confirm `AGENT_ANALYTICS_API_KEY` is available in the OpenClaw environment instead of pasted into chat.
- If OpenClaw can create projects but not read analytics, verify the key belongs to the same Agent Analytics account you expect.
- If you need endpoint-level debugging, use the [API reference](/api/) with `curl` before returning to the skill flow.

## Related

- [Getting Started](/getting-started/)
- [Claude Code](/installation/claude-code/)
- [OpenAI Codex](/installation/openai-codex/)
- [API Reference](/api/)

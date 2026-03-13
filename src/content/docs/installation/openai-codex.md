---
title: OpenAI Codex
description: Install the Agent Analytics skill for OpenAI Codex, set the API key once, and use direct queries or guided workflows from there.
---

<div class="aa-agent-badge aa-agent-badge--inverse">
  <img src="/logos/openai-white.png" alt="" />
  <span>OpenAI Codex</span>
</div>

For OpenAI Codex, the cleanest path today is the Agent Skills install. It keeps the workflow agent-native and does not require the MCP connector flow.

## Prerequisites

- An Agent Analytics account at [app.agentanalytics.sh](https://app.agentanalytics.sh)
- A valid Agent Analytics API key
- `npx` available in the environment Codex uses

## Recommended: install the Agent Analytics skill

```bash
npx skills add Agent-Analytics/agent-analytics-mcp
```

Then expose your API key to the agent environment:

```bash
export AGENT_ANALYTICS_API_KEY=aak_...
```

The skill teaches Codex how to set up tracking, query analytics, inspect project health, and run experiments from the same conversation loop.

## Verify the install

Ask Codex:

- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `Create an experiment for the signup CTA on my-site`

If you have not created your first real project yet, go back to [Getting Started](/getting-started/#3-create-your-first-project) and do that next.

## Troubleshooting

- If the skill installs but queries fail, check that `AGENT_ANALYTICS_API_KEY` is present in the environment the agent actually runs in.
- If `npx` is unavailable, install the required Node.js runtime first or use the direct API route temporarily.
- If you need endpoint-level debugging, use the [API reference](/api/) and test with `curl`.

## Related

- [Getting Started](/getting-started/)
- [Claude Code](/installation/claude-code/)
- [Authentication](/reference/authentication/)
- [API Reference](/api/)

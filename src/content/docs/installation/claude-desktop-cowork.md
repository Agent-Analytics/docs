---
title: Claude Desktop / Cowork
description: Connect the hosted MCP server in Claude Desktop or Cowork and verify analytics tools directly in chat.
---

<div class="aa-agent-badge aa-agent-badge--plain">
  <img src="/logos/claude-code-logo.png" alt="" />
  <span>Claude Desktop / Cowork</span>
</div>

Claude Desktop and Cowork both fit the hosted MCP flow. Use the connector UI instead of manually managing API keys in prompts.

## Prerequisites

- An Agent Analytics account at [app.agentanalytics.sh](https://app.agentanalytics.sh)
- Claude Desktop or Cowork access
- GitHub or Google sign-in matching your Agent Analytics account

## Recommended: add the hosted connector

1. Open **Settings**
2. Open **Connectors**
3. Choose **Add**
4. Choose **Custom**
5. Enter:

```text
https://mcp.agentanalytics.sh/mcp
```

You will be asked to sign in with GitHub or Google. Use the same identity that owns the projects in Agent Analytics.

## Verify the install

Ask Claude:

- `List my projects`
- `Show me a 7 day overview for my-site`
- `Where do users drop off between signup and purchase?`

This path is the best hosted experience for conversational analytics because the MCP server can return structured tool results and rich UI where supported, while staying on the same analytics surface as CLI and raw API usage.

If you have not created your first real project yet, continue with [First Project in 5 Minutes](/guides/first-project-in-5-minutes/).

## Manual notes

- The hosted MCP server URL stays the same across Claude Desktop and Cowork.
- You do not need to manually pass an `X-API-Key` once the connector sign-in succeeds.

## Troubleshooting

- If authentication succeeds but no projects appear, confirm the signed-in account matches your Agent Analytics account.
- If a custom connector URL is rejected, re-enter the exact MCP endpoint: `https://mcp.agentanalytics.sh/mcp`
- If you need lower-level debugging, switch to the [API reference](/api/) and test the same workflow with direct HTTP calls.

## Related

- [Getting Started](/getting-started/)
- [First Project in 5 Minutes](/guides/first-project-in-5-minutes/)
- [Claude Code](/installation/claude-code/)
- [Cursor](/installation/cursor/)
- [API Reference](/api/)

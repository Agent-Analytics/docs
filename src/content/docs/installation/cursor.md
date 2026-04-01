---
title: Cursor
description: Install the Agent Analytics skill in Cursor and use CLI-style workflows first. Use MCP only when you specifically want connector-style tool calls.
---

<div class="aa-agent-badge aa-agent-badge--plain">
  <img src="/logos/cursor-final.png" alt="" />
  <span>Cursor</span>
</div>

For Cursor, start with the Agent Analytics skill plus CLI-style workflows. In practice this is usually faster, cheaper on tokens, and easier to steer than MCP for day-to-day use.

If you are doing this from a Paperclip company, use [Set up Agent Analytics for your Paperclip company](/guides/paperclip/) for the company-skill path. Use this page when you need the raw Cursor install flow itself.

## Prerequisites

- An Agent Analytics account at [app.agentanalytics.sh](https://app.agentanalytics.sh)
- Cursor installed
- `npx` available in the environment Cursor uses
- A valid Agent Analytics API key available as `AGENT_ANALYTICS_API_KEY`

## Recommended: install the agent skill

```bash
npx skills add Agent-Analytics/agent-analytics-skill@agent-analytics
export AGENT_ANALYTICS_API_KEY=aak_...
```

This gives Cursor the Agent Analytics workflow layer plus CLI-oriented execution in the same environment. That is usually the best tradeoff when you want lower latency and less token overhead than MCP tool calls.

## Verify the install

Ask Cursor:

- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `What are the top pages for my-site this week?`

If you have not created your first real project yet, continue with [First Project in 5 Minutes](/guides/first-project-in-5-minutes/).

## Alternative: add a custom MCP server

Use MCP in Cursor if you specifically want connector-style tool calls instead of skill + CLI execution.

1. Open the Command Palette
2. Search for `MCP`
3. Choose **Cursor Settings > Tools & MCP**
4. Click **Add Custom MCP**
5. Add this to your `mcp.json`:

```json
{
  "mcpServers": {
    "agent-analytics": {
      "url": "https://mcp.agentanalytics.sh/mcp"
    }
  }
}
```

Save the file and reload Cursor if the tool list does not refresh automatically. MCP works, but it usually adds more latency and token overhead than the skill path.

## Lower-level fallback: direct API

If you want to bypass both the skill and MCP, call the hosted API directly:

```bash
curl "https://api.agentanalytics.sh/stats?project=my-site&since=7d" \
  -H "X-API-Key: aak_..."
```

That lower-level path is useful for debugging auth, but the skill + CLI flow is the recommended installation for day-to-day Cursor usage.

## Troubleshooting

- If the skill installs but queries fail, confirm `AGENT_ANALYTICS_API_KEY` is available in the environment Cursor actually uses.
- Confirm the `mcp.json` entry is valid JSON if you choose the MCP path.
- Reload Cursor after adding the custom MCP server if the tools panel still shows the old state.
- If Cursor can see the MCP server but not your projects, verify the hosted sign-in completed with the correct account.

## Related

- [Getting Started](/getting-started/)
- [Set up Agent Analytics for your Paperclip company](/guides/paperclip/)
- [First Project in 5 Minutes](/guides/first-project-in-5-minutes/)
- [CLI vs MCP vs API](/reference/cli-mcp-api/)
- [Claude Desktop / Cowork](/installation/claude-desktop-cowork/)
- [OpenAI Codex](/installation/openai-codex/)
- [API Reference](/api/)

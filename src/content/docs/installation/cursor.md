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

- Cursor installed
- `npx` available in the environment Cursor uses
- Access to the Google or GitHub sign-in you want to connect when Cursor opens browser approval

## Recommended: install the agent skill

```bash
npx skills add Agent-Analytics/agent-analytics-skill
```

If the installer asks which skill to install, choose `agent-analytics` for setup and reporting. Choose `agent-analytics-autoresearch` when you want Cursor to run a structured growth loop for experiment candidates.

Then ask Cursor:

```text
Set up Agent Analytics for this project. Install it here if needed. Open the browser for me or give me a login link, then wait. I will sign in with Google or GitHub, approve it, and paste back any finish code if you need it. Then create the project, add tracking and key events, and verify the first event.
```

This gives Cursor the Agent Analytics workflow layer plus CLI-oriented execution in the same environment. That is usually the best tradeoff when you want lower latency and less token overhead than MCP tool calls. The browser approval step creates or connects the account during setup, so you do not need to prepare an API key first.

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

## Fallback: use the CLI directly

If you do not want the skill layer, fall back to the official CLI before you drop to raw HTTP:

```bash
npx @agent-analytics/cli@0.5.14 login
npx @agent-analytics/cli@0.5.14 projects
npx @agent-analytics/cli@0.5.14 stats my-site --days 7
```

That keeps Cursor on the same shell-first path without switching to manual auth headers and raw request payloads. For login behavior, command coverage, and CLI-to-API mapping, use the dedicated [CLI page](/reference/cli/).

## Troubleshooting

- If the skill installs but the setup pauses on approval, complete the browser sign-in and paste back any finish code if Cursor asks for it.
- If you intentionally use the advanced/manual API-key path, confirm `AGENT_ANALYTICS_API_KEY` is available in the environment Cursor actually uses.
- Confirm the `mcp.json` entry is valid JSON if you choose the MCP path.
- Reload Cursor after adding the custom MCP server if the tools panel still shows the old state.
- If Cursor can see the MCP server but not your projects, verify the hosted sign-in completed with the correct account.

## Related

- [Getting Started](/getting-started/)
- [Agent Analytics Skill](/guides/agent-analytics-skill/)
- [Autoresearch Growth Skill](/guides/autoresearch-growth-skill/)
- [Set up Agent Analytics for your Paperclip company](/guides/paperclip/)
- [First Project in 5 Minutes](/guides/first-project-in-5-minutes/)
- [CLI](/reference/cli/)
- [CLI vs MCP vs API](/reference/cli-mcp-api/)
- [Claude Desktop / Cowork](/installation/claude-desktop-cowork/)
- [OpenAI Codex](/installation/openai-codex/)
- [API Reference](/api/)

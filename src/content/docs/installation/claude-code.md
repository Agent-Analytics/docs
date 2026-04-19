---
title: Claude Code
description: Install Agent Analytics in Claude Code with the hosted plugin first, then use the skill path before dropping to raw MCP setup.
---

<div class="aa-agent-badge aa-agent-badge--plain">
  <img src="/logos/claude-code-logo.png" alt="" />
  <span>Claude Code</span>
</div>

Use the plugin path first. It gives Claude Code both the MCP server connection and the analytics-specific workflow layer in one install.

## Prerequisites

- Claude Code installed locally
- Access to the Google or GitHub sign-in you want to connect when Claude Code opens browser approval

## Recommended: install the plugin

```bash
/plugin marketplace add Agent-Analytics/agent-analytics-plugin
/plugin install agent-analytics
```

This is the shortest hosted path for Claude Code because it packages the MCP connection and the workflow guidance around the same analytics surface together.

## Verify the install

Ask Claude Code:

- `Set up Agent Analytics for this project. Install it here if needed. Open the browser for me or give me a login link, then wait. I will sign in with Google or GitHub, approve it, and paste back any finish code if you need it. Then create the project, add tracking and key events, and verify the first event.`
- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `What are the top pages for my-site this week?`

If the plugin is working, Claude Code should be able to reach your account without asking you to hand-roll HTTP requests.

If you have not created your first real project yet, continue with [First Project in 5 Minutes](/guides/first-project-in-5-minutes/).

## Fallback: install the Claude Code skill

If you do not want the full plugin, use the skill path before raw MCP:

```bash
npx skills add Agent-Analytics/agent-analytics-skill
```

This path teaches Claude Code how to set up tracking, query analytics, and run experiments. It uses browser approval, agent sessions, and human-owned upgrade handoffs by default.

## Lower-level fallback: add only the MCP server

If you want the MCP server without the plugin or skill layer:

```bash
claude mcp add agent-analytics --transport http https://mcp.agentanalytics.sh/mcp
```

Use `--transport http`. The hosted MCP server is not configured for legacy SSE transport.

## Troubleshooting

- Make sure Claude Code completes browser approval with the same GitHub or Google account you want connected to Agent Analytics.
- If the skill or plugin pauses on approval, complete the browser sign-in and let Claude Code continue.
- If you intentionally use a compatibility API key for direct HTTP debugging, confirm the environment exposes `AGENT_ANALYTICS_API_KEY`.
- If the MCP command fails, verify you used `--transport http`.

## Related

- [Getting Started](/getting-started/)
- [First Project in 5 Minutes](/guides/first-project-in-5-minutes/)
- [Claude Desktop / Cowork](/installation/claude-desktop-cowork/)
- [Authentication](/reference/authentication/)
- [API Reference](/api/)

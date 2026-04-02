---
title: OpenAI Codex
description: Install the Agent Analytics skill for OpenAI Codex, use browser approval when login is needed, and keep project setup in the same agent flow.
---

<div class="aa-agent-badge aa-agent-badge--inverse">
  <img src="/logos/openai-white.png" alt="" />
  <span>OpenAI Codex</span>
</div>

For OpenAI Codex, the cleanest path today is the Agent Skills install. It keeps the workflow agent-native and does not require the MCP connector flow.

If you are doing this from a Paperclip company, use [Set up Agent Analytics for your Paperclip company](/guides/paperclip/) for the company-skill path. Use this page when you need the raw Codex install flow itself.

## Prerequisites

- An Agent Analytics account at [app.agentanalytics.sh](https://app.agentanalytics.sh)
- `npx` available in the environment Codex uses

## Recommended: install the Agent Analytics skill

```bash
npx skills add Agent-Analytics/agent-analytics-skill@agent-analytics
```

Then ask Codex:

```text
Set up Agent Analytics for this project. Install it here if needed. If browser approval is needed, open it and wait for me. I will sign in with Google or GitHub and approve it. Then create the project, add tracking and key events, and verify the first event.
```

The skill teaches Codex how to set up tracking, query analytics, inspect project health, and run experiments from the same conversation loop.

## Verify the install

Ask Codex:

- `List my Agent Analytics projects`
- `How is my-site doing this week?`
- `Create an experiment for the signup CTA on my-site`

If you have not created your first real project yet, continue with [First Project in 5 Minutes](/guides/first-project-in-5-minutes/).

## Troubleshooting

- If the skill installs but the setup pauses on approval, complete the browser sign-in and let Codex continue.
- If you intentionally use the advanced/manual API-key path, check that `AGENT_ANALYTICS_API_KEY` is present in the environment the agent actually runs in.
- If `npx` is unavailable, install the required Node.js runtime first or use the direct API route temporarily.
- If you need endpoint-level debugging, use the [API reference](/api/) and test with `curl`.

## Related

- [Getting Started](/getting-started/)
- [Set up Agent Analytics for your Paperclip company](/guides/paperclip/)
- [First Project in 5 Minutes](/guides/first-project-in-5-minutes/)
- [Claude Code](/installation/claude-code/)
- [Authentication](/reference/authentication/)
- [API Reference](/api/)

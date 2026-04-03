---
title: Authentication
description: Understand the difference between agent sessions, API keys, and project tokens before you wire an agent or a tracker.
---

Agent Analytics uses three different credentials. They serve different jobs and should not be swapped.

## Agent session (`aas_*`)

Use the agent session for:

- official CLI login through browser approval
- plugin and skill flows that authenticate through the hosted approval flow
- agent-native setup where the agent should keep the connection after approval

In the normal product flow, you do not paste this token around manually. The hosted approval flow creates it for the agent or CLI and stores it locally for later use.

## API key (`aak_*`)

Use the API key for:

- reading analytics data
- creating or listing projects
- account-level endpoints
- direct API access from scripts, tools, and agents

Pass it with the `X-API-Key` header or the `?key=` query parameter.

```bash
curl "https://api.agentanalytics.sh/stats?project=my-site&since=7d" \
  -H "X-API-Key: aak_..."
```

Treat it as secret material.

## Project token (`aat_*`)

Use the project token for:

- `POST /track`
- `POST /track/batch`
- the browser tracker snippet embedded on your site

The token is public by design. It identifies the project for event ingestion and is expected to appear in HTML.

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."></script>
```

## Common mistake

Do not put the API key in the client-side tracker. The tracker uses the public project token only.

## CLI auth helpers

If you use the official CLI, it provides three local auth convenience commands:

- `npx @agent-analytics/cli login` starts browser approval and saves a local CLI session.
- `npx @agent-analytics/cli login --detached` starts the same flow for headless or issue-based runtimes where the agent sends you an approval link and may ask for a finish code.
- `npx @agent-analytics/cli login --token aak_...` saves an API key locally as the advanced/manual fallback.
- `npx @agent-analytics/cli logout` clears the saved local CLI auth.

If you logged in with `--token`, `logout` does not revoke the API key on the server. Use `revoke-key` when you want to invalidate the old key and issue a new one.

If you set `AGENT_ANALYTICS_API_KEY` in your shell environment, the CLI will continue to use that env var even after `logout` until you unset it.

## Related

- [Getting Started](/getting-started/)
- [CLI vs MCP vs API](/reference/cli-mcp-api/)
- [Error Format](/reference/error-format/)
- [API Reference](/api/)

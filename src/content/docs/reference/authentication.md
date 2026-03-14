---
title: Authentication
description: Understand the difference between API keys and project tokens before you wire an agent or a tracker.
---

Agent Analytics uses two different credentials. They serve different jobs and should not be swapped.

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

If you use the official CLI, it provides two local auth convenience commands around the API key:

- `npx @agent-analytics/cli login --token aak_...` saves the API key locally for later CLI reads.
- `npx @agent-analytics/cli logout` clears the saved local CLI auth.

`logout` does not revoke the API key on the server. Use `revoke-key` when you want to invalidate the old key and issue a new one.

If you set `AGENT_ANALYTICS_API_KEY` in your shell environment, the CLI will continue to use that env var even after `logout` until you unset it.

## Related

- [Getting Started](/getting-started/)
- [CLI vs MCP vs API](/reference/cli-mcp-api/)
- [Error Format](/reference/error-format/)
- [API Reference](/api/)

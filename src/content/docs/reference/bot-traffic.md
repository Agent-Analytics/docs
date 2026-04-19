---
title: Bot Traffic
description: See which automated callers hit your tracker, how many events were filtered, and which actors generated that traffic.
---

Bot Traffic shows automated requests that reached Agent Analytics and were filtered out of your normal analytics.

Use it when you want to answer questions like:

- Did ChatGPT or another agent actually hit this site?
- Are search crawlers or preview bots touching the tracker?
- How many analytics events were dropped because they came from automation?

## Important scope

This feature is intentionally narrower than CDN or reverse-proxy logs.

- It is **not** full site traffic visibility like Cloudflare.
- It only includes automated requests that reached `POST /track` or `POST /track/batch`.
- It stores daily aggregates, not raw request logs.
- It does **not** store IPs.
- It does **not** add bot hits to your normal event analytics, sessions, or billing.

## What you get back

Project and account views return:

- `automated_requests`: how many filtered tracking requests were received
- `dropped_events`: how many analytics events were discarded inside those requests
- `categories`: grouped buckets like `ai_agent`, `search_crawler`, `social_preview`, `monitoring_perf`
- `actors`: normalized sources like `ChatGPT-User`, `Googlebot`, `ClaudeBot`, `curl`
- `time_series`: zero-filled daily rollup for the selected period

## Access paths

### CLI

```bash
npx --yes @agent-analytics/cli@0.5.19 bot-traffic my-site --period 7d --limit 5
npx --yes @agent-analytics/cli@0.5.19 bot-traffic --all --period 7d --limit 10
```

### MCP

Use:

- `bot_traffic_overview` for one project
- `all_sites_bot_traffic` for account scope

### API

```bash
curl "https://api.agentanalytics.sh/bot-traffic?project=my-site&period=7d&limit=5" \
  -H "X-API-Key: aak_..."
```

```bash
curl "https://api.agentanalytics.sh/account/bot-traffic?period=7d&limit=10" \
  -H "X-API-Key: aak_..."
```

## Project vs account scope

Use project scope when you want top actors and category breakdown for one site.

Use account scope when you want:

- total filtered automation across all active projects
- which projects are seeing that traffic
- a lightweight all-sites overview instead of per-project details

Deleted projects are excluded from account rankings and totals.

## Availability

Bot traffic overview is available on both hosted free and pro plans through API, CLI, and MCP.

## Related

- [Tracker.js](/reference/tracker-js/)
- [CLI vs MCP vs API](/reference/cli-mcp-api/)
- [Rate Limits](/reference/rate-limits/)
- [API Reference](/api/)

---
title: Rate Limits
description: Hosted Agent Analytics uses account-level API limits and event-volume limits that vary by plan.
---

## Standard limits

| Tier | Requests / minute | Event limit | Data retention |
| --- | --- | --- | --- |
| Free | 10 | 100,000 / month | 90 days |
| Pro | 1,000 | Unlimited | 365 days |

Free hosted accounts also get:

- up to 2 projects
- 500 agent/API read actions per month
- MCP access for `list_projects`, `create_project`, `all_sites_overview`, and `analytics_overview`

Paid plans unlock the full API, CLI, and MCP surface. Free accounts receive `PRO_REQUIRED` on query, funnels, retention, experiments, and the richer analytics endpoints.

## Streaming limits

| Limit | Value |
| --- | --- |
| Concurrent SSE streams | 10 per account |
| `/live` rate | Standard API rate limit |
| Inactivity timeout | 30 minutes |
| Ring buffer | 5 minutes / 10,000 events |

## What to do if you hit a limit

- back off and retry instead of hammering the same endpoint
- reduce polling frequency for overview queries
- batch ingestion where possible
- move experiments and heavier analysis to a pro account if that is the bottleneck

## Related

- [Error Format](/reference/error-format/)
- [API Reference](/api/)

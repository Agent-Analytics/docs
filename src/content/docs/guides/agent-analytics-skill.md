---
title: Agent Analytics Skill
description: Install the regular Agent Analytics skill and let your coding agent create projects, add tracking, query analytics, and run experiments from the same workflow.
---

Use the regular Agent Analytics skill when you want your AI agent to operate Agent Analytics end-to-end from the project it is already editing.

It is the right first skill for setup, tracking, reporting, funnels, session paths, and normal experiment work. If you want the agent to generate and judge growth variants before an A/B test, use the [Autoresearch Growth Skill](/guides/autoresearch-growth-skill/) after the basic analytics loop works.

## Install

Install from the public skill repo:

```bash
npx skills add Agent-Analytics/agent-analytics-skill
```

If the installer asks which skill to install, choose `agent-analytics`.

You can also install it explicitly:

```bash
npx skills add Agent-Analytics/agent-analytics-skill --skill agent-analytics
```

The source is public:

- [Agent Analytics skill repo](https://github.com/Agent-Analytics/agent-analytics-skill)
- [Agent Analytics](https://agentanalytics.sh)

## What To Ask Your Agent

Start in the codebase or site you want to measure, then ask:

```text
Set up Agent Analytics for this project. Install it here if needed. Open the browser for me or give me a login link, then wait. I will sign in with Google or GitHub, approve it, and paste back any finish code if you need it. Then create the project, add tracking and key events, and verify the first event.
```

After setup, ask normal analytics questions in plain English:

```text
How did this site perform in the last 7 days?
```

```text
Show the funnel from page_view to signup_cta_click to signup.
```

```text
Create an experiment for the signup CTA with control and a clearer variant, then show me how to QA both versions before it gets traffic.
```

## What The Skill Does

The skill teaches the agent to use the official Agent Analytics CLI and API patterns without making you hand-write requests.

Typical jobs:

- create or find the right project
- install `tracker.js`
- add declarative events such as CTA clicks
- verify the first page view or custom event
- inspect pages, events, funnels, retention, and bot traffic
- create, QA, measure, and complete experiments
- explain gaps in the data before recommending action

Browser approval is the normal login path. You do not need to create an API key first unless you are building a custom direct HTTP integration.

For OpenClaw and similar managed runtimes, tell the agent to keep Agent Analytics CLI auth in a persistent workspace path instead of the default home config path:

```bash
export AGENT_ANALYTICS_CONFIG_DIR="$PWD/.openclaw/agent-analytics"
npx @agent-analytics/cli@0.5.16 auth status
```

If the runtime may not preserve exported variables between commands, prefix each Agent Analytics CLI command with that same `AGENT_ANALYTICS_CONFIG_DIR=...` value or pass `--config-dir "$PWD/.openclaw/agent-analytics"`. Do not commit `.openclaw/agent-analytics/config.json`.

## When To Use The Autoresearch Skill Instead

Use [Autoresearch Growth Skill](/guides/autoresearch-growth-skill/) when the task is not just "read analytics" or "create an experiment," but:

- generate landing-page, onboarding, pricing, or CTA variants
- critique generic copy and product-truth drift
- blind-rank multiple candidates
- output two review-ready experiment variants
- rerun the loop after experiment data comes back

In practice, the regular skill gets the analytics foundation working. The autoresearch skill uses that foundation to run a structured growth loop.

## Related

- [Autoresearch Growth Skill](/guides/autoresearch-growth-skill/)
- [First Project in 5 Minutes](/guides/first-project-in-5-minutes/)
- [AI Agent Experiment Tracking](/guides/ai-agent-experiment-tracking/)
- [Session Paths](/guides/session-paths/)
- [CLI](/reference/cli/)
- [Plugin vs Skill vs MCP vs API](/reference/cli-mcp-api/)

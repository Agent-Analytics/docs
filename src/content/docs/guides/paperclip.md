---
title: Install Agent Analytics on Paperclip
description: Add the Agent Analytics skill to a Paperclip company, assign it to the right agent, expose AGENT_ANALYTICS_API_KEY, and verify the first analytics read.
---

Use this guide when your company runs on Paperclip and you want the direct Agent Analytics install path.

In Paperclip, the clean path is not to branch into a second install chooser. Import the Agent Analytics skill into the company, attach it to the agent that will own analytics work, and make `AGENT_ANALYTICS_API_KEY` available in that agent environment.

The Paperclip company skill key is `agent-analytics/agent-analytics-skill/agent-analytics`. The skill requires `npx` and `AGENT_ANALYTICS_API_KEY`.

If the skill is already attached to the right agent and you only need the activation loop, continue with [First Project in 5 Minutes](/guides/first-project-in-5-minutes/).

## 1. Get the prerequisites ready

- A Paperclip company with at least one agent that should own analytics work
- An Agent Analytics account at [app.agentanalytics.sh](https://app.agentanalytics.sh)
- A valid Agent Analytics API key
- `npx` available in the environment that Paperclip uses to run that agent

## 2. Install the skill into the Paperclip company library

If the company already has the skill installed, skip this step.

```bash
curl -sS -X POST "$PAPERCLIP_API_URL/api/companies/$PAPERCLIP_COMPANY_ID/skills/import" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "source": "https://github.com/Agent-Analytics/agent-analytics-skill"
  }'
```

That adds the published Agent Analytics skill to the Paperclip company library.

## 3. Assign the skill to the right agent

Attach the skill to the agent that should create projects, inspect traffic, and answer analytics questions:

```bash
curl -sS -X POST "$PAPERCLIP_API_URL/api/agents/<agent-id>/skills/sync" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "desiredSkills": [
      "agent-analytics/agent-analytics-skill/agent-analytics"
    ]
  }'
```

If you are hiring or creating a new Paperclip agent, include the same skill key in `desiredSkills` so it is available on day one.

## 4. Expose `AGENT_ANALYTICS_API_KEY` to the agent environment

The skill reads `AGENT_ANALYTICS_API_KEY` from the environment that the Paperclip agent actually runs in.

- Keep the key in the agent environment instead of pasting it into chat
- Keep `npx` available in that same environment
- Use your normal Paperclip environment or secret path so the agent sees the key at runtime

Under the hood, the skill launches the official Agent Analytics CLI through `npx @agent-analytics/cli@0.5.2`. That CLI wraps the same documented HTTP API shown in these docs.

## 5. Verify the install from Paperclip

Ask the agent:

```text
List my Agent Analytics projects and confirm you can reach my account.
```

Good follow-up checks:

- `Create a project called docs.my-company.com and give me the tracking snippet.`
- `How is docs.my-company.com doing this week?`
- `Show the top pages for docs.my-company.com this week.`

If those fail, stop and fix the skill assignment, `AGENT_ANALYTICS_API_KEY`, or `npx` path before you continue.

## 6. Create the first project for one real company surface

Start with one surface that matters to the Paperclip company right now:

- the main marketing site
- the docs site
- the onboarding flow
- the product app

Ask the agent:

```text
Create a project for docs.my-company.com and give me the tracking snippet.
```

If the agent can edit code, ask instead:

```text
Create a project for docs.my-company.com, add the tracking snippet to the site, and tell me exactly which file you changed.
```

## 7. Add the tracker and verify the first live event

Once the tracker is in place, load a real page on that surface and ask:

```text
Check whether docs.my-company.com has received its first page_view today and tell me which page you see.
```

Good alternatives:

- `Verify that the tracker is live for docs.my-company.com.`
- `Confirm the first page_view landed for docs.my-company.com today.`

If you still need the full install-to-live walkthrough, continue with [First Project in 5 Minutes](/guides/first-project-in-5-minutes/).

## 8. Ask one real Paperclip-style question

The first query should be concrete and operational, not abstract.

Ask the agent one of these:

- `How is our docs site doing this week?`
- `What are the top pages for our onboarding flow this week?`
- `Which onboarding page has the highest signup rate?`
- `Show bot traffic for our docs project this week.`

The success condition is simple: your agent can create the project, verify tracking, and answer a real analytics question without you hand-writing requests or opening a reporting dashboard first.

## Recommended rollout order for Paperclip companies

Use this order if you want the fastest time to first value:

1. Install the skill into the Paperclip company and attach it to the right agent.
2. Expose `AGENT_ANALYTICS_API_KEY` to that agent environment.
3. Track one real site or onboarding surface.
4. Verify the first `page_view`.
5. Ask one weekly traffic or signup question.
6. Expand to more projects, funnels, experiments, or app surfaces later.

That order keeps the setup honest and avoids turning the first session into a broad instrumentation project.

## When to use a different page

- Use [Getting Started](/getting-started/) if you want the short overview for the whole product.
- Use [Installation](/installation/) if you need the non-Paperclip install pages for specific agent environments.
- Use [First Project in 5 Minutes](/guides/first-project-in-5-minutes/) if the agent install is already complete and you want the shortest activation walkthrough.
- Use [Tracker.js](/reference/tracker-js/) if you need browser-side details such as SPA tracking, declarative events, consent, errors, or web vitals.
- Use [CLI vs MCP vs API](/reference/cli-mcp-api/) if your team is deciding between access paths.

## Related

- [Getting Started](/getting-started/)
- [First Project in 5 Minutes](/guides/first-project-in-5-minutes/)
- [Tracker.js](/reference/tracker-js/)
- [CLI vs MCP vs API](/reference/cli-mcp-api/)
- [API Reference](/api/)

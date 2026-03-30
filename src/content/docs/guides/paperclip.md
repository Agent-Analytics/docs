---
title: Install Agent Analytics on Paperclip
description: Make Agent Analytics a CEO-owned Paperclip task, install the company skill, assign it to the analytics owner, expose AGENT_ANALYTICS_API_KEY, and verify the first analytics read.
---

Use this guide when your company runs on Paperclip and you want the direct Agent Analytics install path.

In Paperclip, the clean path is not to branch into a second install chooser. The CEO or operator should create one explicit setup task, import the Agent Analytics skill into the company, attach it to the agent that will own analytics work, and make `AGENT_ANALYTICS_API_KEY` available in that agent environment.

The Paperclip company skill key is `agent-analytics/agent-analytics-skill/agent-analytics`. The skill requires `npx` and `AGENT_ANALYTICS_API_KEY`.

If the skill is already attached to the right agent and you only need the activation loop, continue with [First Project in 5 Minutes](/guides/first-project-in-5-minutes/).

## Recommended owner: make this a CEO task in Paperclip

For most Paperclip companies, this setup should start as a CEO task.

Why:

- the CEO is usually the person who can hire or create the right analytics owner
- the CEO is usually the person who can install or approve company skills
- this keeps the setup tied to a real company workflow instead of an isolated tool test

The clean operating model is:

1. The CEO creates a Paperclip task to hire or assign the analytics owner.
2. That task tells the new or existing analyst agent to use Agent Analytics for company analytics.
3. The CEO installs the company skill and makes the API key available in the agent runtime.
4. The analyst agent verifies access, creates the first project, and starts answering real traffic and onboarding questions.

If you want a copy-ready issue draft, use this:

```text
Hire an Analyst employee that will use Agent Analytics

We will use Agent Analytics for tracking our company analytics, install the skill: Agent-Analytics/agent-analytics-skill, and use my API key: xxxx
```

## 1. Get the prerequisites ready

- A Paperclip company where the CEO or operator can create tasks and manage skills
- A new or existing agent that should own analytics work
- An Agent Analytics account at [app.agentanalytics.sh](https://app.agentanalytics.sh)
- A valid Agent Analytics API key
- `npx` available in the environment that Paperclip uses to run that agent

## 2. Hire or assign the analytics owner

Before you install anything, decide who will actually use the skill.

In most companies this should be an analyst-style employee or agent that owns:

- docs and onboarding traffic questions
- signup and activation analysis
- top pages, sources, and funnel checks
- experiment readouts or weekly reporting

If you are hiring or creating that role in Paperclip now, include the Agent Analytics skill in the setup task so the role is created with the right responsibility from day one.

## 3. Install the skill into the Paperclip company library

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

## 4. Assign the skill to the right agent

Attach the skill to the analyst or other agent that should create projects, inspect traffic, and answer analytics questions:

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

## 5. Expose `AGENT_ANALYTICS_API_KEY` to the agent environment

The skill reads `AGENT_ANALYTICS_API_KEY` from the environment that the Paperclip agent actually runs in.

- Keep the key in the agent environment instead of pasting it into chat
- Keep `npx` available in that same environment
- Use your normal Paperclip environment or secret path so the agent sees the key at runtime

Under the hood, the skill launches the official Agent Analytics CLI through `npx @agent-analytics/cli@0.5.2`. That CLI wraps the same documented HTTP API shown in these docs.

## 6. Verify the install from Paperclip

Ask the agent:

```text
List my Agent Analytics projects and confirm you can reach my account.
```

Good follow-up checks:

- `Create a project called docs.my-company.com and give me the tracking snippet.`
- `How is docs.my-company.com doing this week?`
- `Show the top pages for docs.my-company.com this week.`

If those fail, stop and fix the skill assignment, `AGENT_ANALYTICS_API_KEY`, or `npx` path before you continue.

## 7. Create the first project for one real company surface

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

## 8. Add the tracker and verify the first live event

Once the tracker is in place, load a real page on that surface and ask:

```text
Check whether docs.my-company.com has received its first page_view today and tell me which page you see.
```

Good alternatives:

- `Verify that the tracker is live for docs.my-company.com.`
- `Confirm the first page_view landed for docs.my-company.com today.`

If you still need the full install-to-live walkthrough, continue with [First Project in 5 Minutes](/guides/first-project-in-5-minutes/).

## 9. Ask one real Paperclip-style question

The first query should be concrete and operational, not abstract.

Ask the agent one of these:

- `How is our docs site doing this week?`
- `What are the top pages for our onboarding flow this week?`
- `Which onboarding page has the highest signup rate?`
- `Show bot traffic for our docs project this week.`

The success condition is simple: your agent can create the project, verify tracking, and answer a real analytics question without you hand-writing requests or opening a reporting dashboard first.

## Recommended rollout order for Paperclip companies

Use this order if you want the fastest time to first value:

1. The CEO creates or assigns the analytics owner.
2. Install the skill into the Paperclip company and attach it to that owner.
3. Expose `AGENT_ANALYTICS_API_KEY` to that agent environment.
4. Track one real site or onboarding surface.
5. Verify the first `page_view`.
6. Ask one weekly traffic or signup question.
7. Expand to more projects, funnels, experiments, or app surfaces later.

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

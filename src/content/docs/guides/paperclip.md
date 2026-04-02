---
title: Set up Agent Analytics for your Paperclip company
description: Create a task for your CEO in Paperclip, install the Agent Analytics company skill, assign it to the analytics owner, expose AGENT_ANALYTICS_API_KEY, and verify the first analytics read.
---

[Paperclip 📎](https://paperclip.ing/) is a company operating system for delegating work through agents, and this guide shows how to set up Agent Analytics for that workflow.

In Paperclip, the setup should start with one explicit task for the CEO. That task should ask the CEO to assign an analytics owner, install the Agent Analytics company skill, expose `AGENT_ANALYTICS_API_KEY` in the right runtime, and have the owner verify the first analytics read.

The Paperclip company skill key is `agent-analytics/agent-analytics-skill/agent-analytics`. The skill requires `npx` and `AGENT_ANALYTICS_API_KEY`.

If you want the strategic context before you set this up, read [If You Use Paperclip, You Need End-User Analytics](https://blog.agentanalytics.sh/blog/paperclip-companies-need-agent-readable-analytics/).

If the skill is already attached to the right agent and you only need the activation loop, continue with [First Project in 5 Minutes](/guides/first-project-in-5-minutes/).

## Start here: create a task for your CEO

For most Paperclip companies, the setup starts by creating one task for the CEO inside Paperclip.

Why:

- the CEO is usually the person who can hire or create the right analytics owner
- the CEO is usually the person who can install or approve company skills
- this keeps the setup tied to a real company workflow instead of an isolated tool test

Use this task text directly:

```text
Create a task for the CEO:

Set up Agent Analytics for our Paperclip company.

1. Assign or hire the agent that will own analytics work.
2. Install the company skill `agent-analytics/agent-analytics-skill/agent-analytics`.
3. Make `AGENT_ANALYTICS_API_KEY` available in that agent runtime.
4. Ask the analytics owner to verify access, create our first project, and confirm the first live page_view.
```

After the CEO receives that task, the clean operating model is:

1. The CEO assigns or hires the analytics owner.
2. The CEO installs the Agent Analytics skill into the company library.
3. The CEO or operator exposes `AGENT_ANALYTICS_API_KEY` in the runtime that agent actually uses.
4. The analytics owner verifies access, creates the first project, and starts answering real traffic and onboarding questions.

## Fast path

If you want the shortest operating sequence, use this order:

1. Get the prerequisites ready.
2. Create one Paperclip task for your CEO with the setup request.
3. Install the skill on the project agents that need it, starting with the analyst or handoff developer.
4. Debug the first live events from Paperclip by having that owner verify the setup and inspect the tracked surface.
5. Ask the analytics owner for daily reports once the first project is live.

## 1. Get the prerequisites ready

- A Paperclip company where the CEO or operator can create tasks and manage skills
- A new or existing agent that should own analytics work
- An Agent Analytics account at [app.agentanalytics.sh](https://app.agentanalytics.sh)
- A valid Agent Analytics API key
- `npx` available in the environment that Paperclip uses to run that agent

## 2. Ask the CEO to hire or assign the analytics owner

Before you set anything up, decide who will actually use the skill.

In most companies this should be an analyst-style employee or agent that owns:

- docs and onboarding traffic questions
- signup and activation analysis
- top pages, sources, and funnel checks
- experiment readouts or weekly reporting

If you are hiring or creating that role in Paperclip now, include the Agent Analytics skill in the CEO task so the role is created with the right responsibility from day one.

## 3. Install the skill into the Paperclip company library

If the company already has the skill installed, skip this step.

Ask the CEO or Paperclip operator to install or approve the Agent Analytics skill in the Paperclip company library.

Keep the public flow simple:

- open the company skills library in Paperclip
- install or approve the Agent Analytics skill
- confirm the skill key `agent-analytics/agent-analytics-skill/agent-analytics` is available to assign

If your company already manages skills centrally, use the same normal Paperclip admin flow here instead of creating a separate setup path just for Agent Analytics.

## 4. Assign the skill to the right agent

Attach the skill to the analyst or other agent that should create projects, inspect traffic, and answer analytics questions.

In practice that means:

- the CEO or operator assigns `agent-analytics/agent-analytics-skill/agent-analytics` to the analytics owner inside Paperclip
- if you are creating a new Paperclip agent for analytics work, include the same skill during that setup so it is available on day one
- start with one owner instead of attaching the skill to every agent immediately

## 5. Expose `AGENT_ANALYTICS_API_KEY` to the agent environment

The skill reads `AGENT_ANALYTICS_API_KEY` from the environment that the Paperclip agent actually runs in.

- Keep the key in the agent environment instead of pasting it into chat
- Use your normal Paperclip environment or secret path so the agent sees the key at runtime
- If the skill does not launch correctly, ask the operator to confirm that runtime can execute the published Agent Analytics skill package

## 6. Verify the install from Paperclip

Ask the agent:

```text
List my Agent Analytics projects and confirm you can reach my account.
```

Good follow-up checks:

- `Create a project called docs.my-company.com and give me the tracking snippet.`
- `How is docs.my-company.com doing this week?`
- `Show the top pages for docs.my-company.com this week.`

If those fail, stop and fix the skill assignment or `AGENT_ANALYTICS_API_KEY` path before you continue.

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

Once that works, make the cadence explicit. Ask the analytics owner for a short daily report on traffic, activation, and blockers so the CEO can keep routing work based on real user movement instead of anecdotes.

## Recommended rollout order for Paperclip companies

Use this order if you want the fastest time to first value:

1. Create the Paperclip task for your CEO.
2. The CEO creates or assigns the analytics owner.
3. Install the skill into the Paperclip company and attach it to that owner.
4. Expose `AGENT_ANALYTICS_API_KEY` to that agent environment.
5. Track one real site or onboarding surface.
6. Verify the first `page_view`.
7. Ask one weekly traffic or signup question.
8. Expand to more projects, funnels, experiments, or app surfaces later.

That order keeps the setup honest and avoids turning the first session into a broad instrumentation project.

## When to use a different page

- Use [Getting Started](/getting-started/) if you want the short overview for the whole product.
- Use [Installation](/installation/) if you need the non-Paperclip install pages for specific agent environments.
- Use [First Project in 5 Minutes](/guides/first-project-in-5-minutes/) if the agent install is already complete and you want the shortest activation walkthrough.
- Use [Tracker.js](/reference/tracker-js/) if you need browser-side details such as SPA tracking, declarative events, consent, errors, or web vitals.
- Use [CLI vs MCP vs API](/reference/cli-mcp-api/) if your team is deciding between access paths.

## Related

- [If You Use Paperclip, You Need End-User Analytics](https://blog.agentanalytics.sh/blog/paperclip-companies-need-agent-readable-analytics/)
- [Getting Started](/getting-started/)
- [First Project in 5 Minutes](/guides/first-project-in-5-minutes/)
- [Tracker.js](/reference/tracker-js/)
- [CLI vs MCP vs API](/reference/cli-mcp-api/)
- [API Reference](/api/)

---
title: Set up Agent Analytics for your Paperclip company
description: Ask the user to create one CEO task, then review the blocked task when login approval is needed, and finally query the live project.
---

[Paperclip 📎](https://paperclip.ing/) is a company operating system for delegating work through agents. The clean Agent Analytics path in Paperclip is now:

1. ask the user to create one task for the CEO
2. review the blocked task when login approval is needed
3. ask the analyst the first real traffic or signup question

For normal Paperclip setup, keep browser approval and finish-code handoff as the default path. Raw API keys are only there as an advanced fallback for custom runtimes.

If you want the strategic context before you set this up, read [If You Use Paperclip, You Need End-User Analytics](https://blog.agentanalytics.sh/blog/paperclip-companies-need-agent-readable-analytics/).

If the engineer already has access and you only need the activation loop, continue with [First Project in 5 Minutes](/guides/first-project-in-5-minutes/).

## Step 1: create one CEO task

For most Paperclip companies, the setup should start with one explicit CEO task.

Ask the user:

`Create a task for the CEO.`

Then use this task title:

```text
Hire an analyst to use AgentAnalytics
```

And this task body:

```text
Ask the CEO to hire the analyst, have the engineer set up tracking, and handle approval if needed.
```

Why this is the right Paperclip path:

- the CEO is usually the person who can hire or assign the analytics analyst
- the CEO already knows how to delegate to both the analyst and the engineer
- the analyst owns the ongoing analytics questions, while the engineer owns codebase setup
- setup stays attached to a real company workflow instead of becoming a dashboard chore

## Step 2: review the blocked task and approve login

At some point, the working agent may return that the task is blocked because it needs your help with login approval.

When that happens:

1. open the approval URL the agent posted in the Paperclip task
2. sign in with Google or GitHub
3. copy the finish code from the browser
4. paste that finish code back into the blocked Paperclip task

That lets the working setup agent continue:

- finish login
- create the project
- add tracking
- verify the first event

If your Paperclip company wants a shared install primitive, the company skill key is still:

```text
agent-analytics/agent-analytics-skill/agent-analytics
```

But that is implementation detail, not the main product story. The important path is still: create one CEO task, let it drive the setup in the real project, then ask real analytics questions.

## What approval looks like in practice

In Paperclip, the detached login flow should look like this:

1. the working setup agent starts Agent Analytics login and replies with an approval URL
2. you open that URL in the browser
3. you sign in with Google or GitHub
4. the browser shows a finish code
5. you paste that finish code back into the Paperclip issue thread
6. the working setup agent uses that code to complete login and keep going

The important product rule is simple: the user approves identity in the browser, but the working agent ends up holding the session and continues the setup.

## Step 3: ask the analyst real questions

Once the engineer has the project live, ask the analyst real questions:

- `Show me traffic, top pages, recent events, signups, purchases, and feature usage for this project.`
- `Set up an A/B experiment for this project and help me decide what to change next.`

The success condition is not just login. The success condition is:

- the setup agent can authenticate through browser approval and finish-code handoff
- create the project
- verify the first live event
- the analyst can answer a real analytics question from the same issue flow

## Fast rollout order for Paperclip companies

Use this order if you want the shortest path to first value:

1. create the CEO task
2. let that task cover the analyst and the engineer in one delegation path
3. review the blocked task when the working agent needs approval
4. sign in and reply with the finish code
5. let the working agent create the first project and verify the first event
6. ask the analyst one real traffic or signup question
7. expand into experiments and recurring analytics work later

## Advanced/manual fallback

If you need direct HTTP access for a custom runtime later, you can still generate a raw API key from [app.agentanalytics.sh](https://app.agentanalytics.sh). Treat that as the advanced/manual fallback.

For the normal Paperclip setup path, prefer browser approval plus finish code handoff.

## When to use a different page

- Use [Getting Started](/getting-started/) if you want the shortest overview for the whole product.
- Use [Installation](/installation/) if you need the raw per-environment install pages outside the Paperclip company flow.
- Use [First Project in 5 Minutes](/guides/first-project-in-5-minutes/) if the engineer already has access and you want the clearest install-to-live walkthrough.
- Use [Tracker.js](/reference/tracker-js/) if you need browser-side details such as SPA tracking, declarative events, consent, errors, or web vitals.
- Use [CLI vs MCP vs API](/reference/cli-mcp-api/) if your team is deciding between access paths.

## Related

- [If You Use Paperclip, You Need End-User Analytics](https://blog.agentanalytics.sh/blog/paperclip-companies-need-agent-readable-analytics/)
- [Getting Started](/getting-started/)
- [First Project in 5 Minutes](/guides/first-project-in-5-minutes/)
- [Tracker.js](/reference/tracker-js/)
- [CLI vs MCP vs API](/reference/cli-mcp-api/)
- [API Reference](/api/)

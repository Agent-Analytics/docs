---
title: Set Up Agent Analytics for Your Paperclip Company
description: Route a Paperclip company to the right Agent Analytics install path, create the first live project, and verify the first useful analytics read.
---

Use this guide when you are coming from a Paperclip workflow and want one concrete path from campaign click to first useful analytics data.

Paperclip is the company and workflow context. Agent Analytics is the analytics layer your agents can use. The install path depends on which agent runtime your Paperclip company already uses.

If you already know the exact runtime and only need the install steps, jump straight to the [installation hub](/installation/). If the agent is already installed and you only need the activation loop, use [First Project in 5 Minutes](/guides/first-project-in-5-minutes/).

## 1. Choose the runtime your Paperclip company already uses

Pick the environment where your agents already run:

- [OpenClaw](/installation/openclaw/) if the team uses ClawHub skills and chat-native workflows
- [OpenAI Codex](/installation/openai-codex/) if the team uses Codex with the Agent Skills flow
- [Cursor](/installation/cursor/) if the team works from Cursor and wants the skill plus CLI path
- [Claude Code](/installation/claude-code/) if the team already runs Claude Code and wants the hosted plugin path first

Do not invent a second runtime just for analytics. The goal is to add Agent Analytics to the environment the company already trusts.

## 2. Complete the install and confirm the agent can see the account

After you finish the right install page, ask the agent:

```text
List my Agent Analytics projects and confirm you can reach my account.
```

If that fails, stop and fix the install or API key path before you continue.

## 3. Create the first project for one real company surface

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

## 4. Add the tracker and verify the first live event

Once the tracker is in place, load a real page on that surface and ask:

```text
Check whether docs.my-company.com has received its first page_view today and tell me which page you see.
```

Good alternatives:

- `Verify that the tracker is live for docs.my-company.com.`
- `Confirm the first page_view landed for docs.my-company.com today.`

If you still need the full install-to-live walkthrough, continue with [First Project in 5 Minutes](/guides/first-project-in-5-minutes/).

## 5. Ask one real Paperclip-style question

The first query should be concrete and operational, not abstract.

Ask the agent one of these:

- `How is our docs site doing this week?`
- `What are the top pages for our onboarding flow this week?`
- `Which onboarding page has the highest signup rate?`
- `Show bot traffic for our docs project this week.`

The success condition is simple: your agent can create the project, verify tracking, and answer a real analytics question without you hand-writing requests or opening a reporting dashboard first.

## Recommended rollout order for Paperclip companies

Use this order if you want the fastest time to first value:

1. Connect Agent Analytics in the runtime the company already uses.
2. Track one real site or onboarding surface.
3. Verify the first `page_view`.
4. Ask one weekly traffic or signup question.
5. Expand to more projects, funnels, experiments, or app surfaces later.

That order keeps the setup honest and avoids turning the first session into a broad instrumentation project.

## When to use a different page

- Use [Getting Started](/getting-started/) if you want the short overview for the whole product.
- Use [Installation](/installation/) if you only need the per-agent setup options.
- Use [First Project in 5 Minutes](/guides/first-project-in-5-minutes/) if the agent install is already complete and you want the shortest activation walkthrough.
- Use [Tracker.js](/reference/tracker-js/) if you need browser-side details such as SPA tracking, declarative events, consent, errors, or web vitals.
- Use [CLI vs MCP vs API](/reference/cli-mcp-api/) if your team is deciding between access paths.

## Related

- [Getting Started](/getting-started/)
- [Installation Overview](/installation/)
- [First Project in 5 Minutes](/guides/first-project-in-5-minutes/)
- [OpenClaw](/installation/openclaw/)
- [Cursor](/installation/cursor/)
- [OpenAI Codex](/installation/openai-codex/)
- [Claude Code](/installation/claude-code/)

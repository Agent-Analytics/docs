---
title: Getting Started
description: Create a project, install Agent Analytics in your AI agent, and verify the first query.
---

This is the shortest path from zero to a working Agent Analytics setup.

The main flow is agent-first: choose `Connect as agent`, start in the AI agent you already use, let that agent open the browser for you or give you a login link, then have it create the project and wire tracking for you.

Use `Connect as human` only when you need direct account access yourself, such as billing, cancellation, or manual review. Browser approval and finish-code handoff still belong to the normal agent-owned setup flow.

If your AI agent, such as Claude Code, Cursor, Codex, or OpenClaw, is already installed and you want the clearest create-project, place-snippet, and verify-first-page-view walkthrough, use [First Project in 5 Minutes](/guides/first-project-in-5-minutes/).

If you want to understand the two public skills first, start with [Agent Analytics Skill](/guides/agent-analytics-skill/) for setup and reporting, then [Autoresearch Growth Skill](/guides/autoresearch-growth-skill/) for data-informed variant generation.

If you are here from a Paperclip workflow, start by creating a task for your CEO in Paperclip, then follow [Set up Agent Analytics for your Paperclip company](/guides/paperclip/) for the one-task delegation and finish-code handoff path.

## 1. Pick and complete an install path

If you are using Paperclip, stop here first and create the CEO task from [Set up Agent Analytics for your Paperclip company](/guides/paperclip/). That guide covers the one-task delegation path, browser approval, and the finish-code reply flow.

Go to the [installation hub](/installation/) and complete the setup for the environment you actually use:

- [Claude Code](/installation/claude-code/)
- [Claude Desktop / Cowork](/installation/claude-desktop-cowork/)
- [Cursor](/installation/cursor/)
- [OpenClaw](/installation/openclaw/)
- [OpenAI Codex](/installation/openai-codex/)

If none of those are a fit, the [API reference](/api/) stays available for direct integration into your own runtime.

## 2. Open your AI agent in the project directory

Start from the codebase or site you actually want to track.

Then ask your AI agent for the full setup flow:

- `Set up Agent Analytics for this project. Install it here if needed. Open the browser for me or send me the login link, then wait. I will sign in with Google or GitHub, approve it, and paste back any finish code if you need it. Then create the project, add tracking, and verify the first event.`

When the browser approval page opens, sign in with Google or GitHub, approve it, and let the agent continue. That approval creates or connects your account and gives the agent the session it needs.

## 3. Create your first project

After your AI agent is connected, ask it to create the first project for you:

- `Create a project called my-site.com`
- `Create a project called my-site.com and give me the tracking snippet`

If your AI agent has code write access to your site, ask it:

- `Set up analytics for my-site.com`

Your AI agent should create the project and either:

- return the tracker snippet for you to paste, or
- install the tracker itself if it can edit the site

## 4. Add the tracker manually if needed

If your AI agent already added the tracker to your site, skip this step.

If it only created the project and returned a snippet, add the script before `</body>`:

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."></script>
```

Page views are tracked automatically. Add custom events later with `data-aa-event` attributes or `window.aa.track()`.

If your product has login or signup, keep `signup` for the moment the account is actually created, preferably server-side. After auth succeeds in the browser, call `window.aa.identify(account.id)` before other post-auth browser events so client and server activity land on the same user.

If your site uses Astro, add `is:inline` to that tracker tag.

For advanced tracker options like declarative events, cross-domain identity, consent, scroll depth, vitals, and error tracking, use the [Tracker.js guide](/reference/tracker-js/).
If your app is a SPA, use [SPA and Virtual Page Tracking](/guides/spa-and-virtual-page-tracking/) to understand what Agent Analytics auto-tracks and when to send a manual virtual `page_view`.
If you want your AI agent to launch your first browser-side A/B test after setup, continue with [AI Agent Experiment Tracking](/guides/ai-agent-experiment-tracking/).

## 5. Verify the loop

Once the install is working and the tracker is live, ask your AI agent one of these:

- `List my projects`
- `How is my-site doing this week?`
- `What are the top pages for my-site this week?`
- `Show bot traffic for my-site this week`

If the setup is correct, the agent should answer without you hand-writing requests or opening a reporting UI.

## Advanced fallback: API key

If you need direct HTTP access for your own runtime, you can still generate an API key from [app.agentanalytics.sh](https://app.agentanalytics.sh). That is the advanced/manual path. CLI, MCP, and agent onboarding should use browser approval and agent sessions instead.

## Next

- Use [Installation](/installation/) for the fastest per-agent setup.
- Use [First Project in 5 Minutes](/guides/first-project-in-5-minutes/) when you want the full activation walkthrough from installed agent to first live project.
- Use [Agent Analytics Skill](/guides/agent-analytics-skill/) when you want the regular skill for setup, reporting, and experiments.
- Use [Autoresearch Growth Skill](/guides/autoresearch-growth-skill/) when you want a loop that generates variants, tests approved experiments, and feeds the next run from measured behavior.
- Use [Set up Agent Analytics for your Paperclip company](/guides/paperclip/) when your company runs on Paperclip and you need the direct CEO-task and finish-code path.
- Use [SPA and Virtual Page Tracking](/guides/spa-and-virtual-page-tracking/) when your app changes screens client-side and you need accurate page tracking without double-counting.
- Use [AI Agent Experiment Tracking](/guides/ai-agent-experiment-tracking/) when you want your AI agent to launch and read browser-side experiments for you.
- Use [Tracker.js](/reference/tracker-js/) for browser-side tracking options.
- Use [Bot Traffic](/reference/bot-traffic/) to inspect filtered automated callers separately from normal analytics.
- Use [Authentication](/reference/authentication/) when you need the read token vs write token rules.
- Use [API Reference](/api/) when you need endpoint-level details.

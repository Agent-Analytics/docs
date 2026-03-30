---
title: Getting Started
description: Create a project, install Agent Analytics in your AI agent, and verify the first query.
---

This is the shortest path from zero to a working Agent Analytics setup.

Use the hosted app for account setup and key creation. Use your AI agent, terminal, or code for the day-to-day analytics loop.

If your AI agent, such as Claude Code, Cursor, Codex, or OpenClaw, is already installed and you want the clearest create-project, place-snippet, and verify-first-page-view walkthrough, use [First Project in 5 Minutes](/guides/first-project-in-5-minutes/).

If you are here from a Paperclip workflow and want the direct company-skill install path, start with [Install Agent Analytics on Paperclip](/guides/paperclip/).

## 1. Get your API key

Sign up at [app.agentanalytics.sh](https://app.agentanalytics.sh) and create an API key there.

- Use the API key (`aak_*`) for reads, project management, and agent setup across CLI, MCP, or skill workflows.
- Use the project token (`aat_*`) in the tracking snippet that goes on your site.

## 2. Pick and complete an install path

Go to the [installation hub](/installation/) and complete the setup for the environment you actually use:

- [Claude Code](/installation/claude-code/)
- [Claude Desktop / Cowork](/installation/claude-desktop-cowork/)
- [Cursor](/installation/cursor/)
- [OpenClaw](/installation/openclaw/)
- [OpenAI Codex](/installation/openai-codex/)

If none of those are a fit, the [API reference](/api/) stays available for direct integration into your own runtime.

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

## Next

- Use [Installation](/installation/) for the fastest per-agent setup.
- Use [First Project in 5 Minutes](/guides/first-project-in-5-minutes/) when you want the full activation walkthrough from installed agent to first live project.
- Use [Install Agent Analytics on Paperclip](/guides/paperclip/) when your company runs on Paperclip and you need the direct company-skill install path.
- Use [SPA and Virtual Page Tracking](/guides/spa-and-virtual-page-tracking/) when your app changes screens client-side and you need accurate page tracking without double-counting.
- Use [AI Agent Experiment Tracking](/guides/ai-agent-experiment-tracking/) when you want your AI agent to launch and read browser-side experiments for you.
- Use [Tracker.js](/reference/tracker-js/) for browser-side tracking options.
- Use [Bot Traffic](/reference/bot-traffic/) to inspect filtered automated callers separately from normal analytics.
- Use [Authentication](/reference/authentication/) when you need the read token vs write token rules.
- Use [API Reference](/api/) when you need endpoint-level details.

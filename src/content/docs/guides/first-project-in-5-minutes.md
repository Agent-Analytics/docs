---
title: First Project in 5 Minutes
description: Go from installed agent to a live Agent Analytics project with the tracker placed, the first page view verified, and one real analytics question answered.
---

Use this guide when your AI agent install is already done and you want the clearest path to your first real success loop.

If you still need to connect your AI agent first, go back to the [installation hub](/installation/) or the short [Getting Started](/getting-started/) overview.

## 1. Confirm your AI agent install is already working

Ask your AI agent:

```text
List my Agent Analytics projects and confirm you can reach my account. If browser approval is needed, open it and wait for me.
```

If the browser approval page opens, sign in with Google or GitHub, approve it, and let the agent continue. If the agent still cannot see your account after that, stop here and finish the right [installation path](/installation/).

## 2. Create the first project and get the tracker snippet

Ask your AI agent:

```text
Create a project called my-site.com and give me the tracking snippet.
```

At this point you want one of two outcomes:

- the agent creates the project and returns the tracker snippet for you to paste
- the agent creates the project and can place the snippet itself

## 3. Choose the path that matches your setup

### Agent can edit code

If your AI agent can change your site, ask it:

```text
Create a project called my-site.com, add the Agent Analytics tracking snippet to the site, and tell me exactly which file you changed.
```

Then ask:

```text
Show me where you placed the snippet and confirm it will load on the page I want to track first.
```

If your site uses Astro, tell the agent to add `is:inline` to the tracker `<script>` tag.

### Manual paste

If your AI agent cannot edit the site, ask it:

```text
Create a project called my-site.com and give me the exact tracker snippet I should paste before </body>.
```

Paste the returned snippet into the site, deploy if needed, and then continue.

If your site uses Astro, add `is:inline` to the tracker `<script>` tag before you publish.

## 4. Load a real page and verify the first `page_view`

Open a tracked page on your site in the browser, then ask your AI agent:

```text
Check whether my-site.com has received its first page_view today and tell me which page you see.
```

If you want one more explicit check, ask:

```text
Verify that the tracker is live for my-site.com and confirm the first page_view landed.
```

If you need a manual sanity check, you can also open [app.agentanalytics.sh](https://app.agentanalytics.sh) to confirm the project exists and the snippet matches what your AI agent used.

## 5. Ask one real analytics question

Once the first page view is live, ask one simple question:

```text
How is my-site.com doing today?
```

Good alternatives:

- `What are the top pages for my-site.com today?`
- `Show bot traffic for my-site.com today.`

The goal here is simple: prove that your AI agent can create the project, wire tracking, see live data, and answer a real question without you hand-writing HTTP requests.

## Next

- Use [Getting Started](/getting-started/) for the short overview of the whole setup flow.
- Use [Installation](/installation/) if your AI agent install still needs work.
- Use [Tracker.js](/reference/tracker-js/) for declarative events, SPA tracking, consent, clicks, errors, and other browser-side options.
- Use [AI Agent Experiment Tracking](/guides/ai-agent-experiment-tracking/) after your first live project is working and you want your AI agent to launch and read browser-side A/B tests.
- Use [API Reference](/api/) only when you need raw endpoint details.

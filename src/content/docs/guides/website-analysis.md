---
title: Product Growth Scanner
description: Use the product growth scanner to find measurement blind spots and turn a website into the first useful analytics plan.
---

Use the Product Growth Scanner when you want the fastest path to useful analytics instead of a generic event list.

The scanner reads a public site like a senior product manager or growth lead would. It looks for the decisions the site is trying to drive, the blind spots in current measurement, and the first signals worth collecting.

- growth questions the site should be able to answer
- prioritized minimum viable instrumentation
- measurement blind spots
- what each recommended event unlocks
- what not to measure yet

Start from the web page:

[Scan your website](https://agentanalytics.sh/analysis/)

Or ask your coding agent to start there before it installs tracking:

```text
Set up Agent Analytics for this project. Run the website analysis first so you know what my agent should track first. If this product has other owned public websites or pages that shape the growth loop, scan those too and tell me what data we are not collecting yet. After approval, create the project, install only the high-priority recommended events, explain what each event enables, and verify the first useful event.
```

The goal is not to add more events. The goal is to give the agent enough product judgment to install the first events that create useful answers.

The scanner also gives your agent eyes on data that does not exist in your analytics yet. For deeper work, ask it to scan additional public websites you own, such as marketing, docs, pricing, signup, support, changelog, or launch pages, then compare the blind spots before it instruments the code.

## When to use it

Use the scanner before setup when:

- your site is live but analytics is not installed yet
- a product, landing page, docs site, or signup flow needs clearer growth measurement
- you own multiple public sites or pages that all shape the same growth loop
- page views alone will not answer what to improve next
- you want to avoid random click tracking
- you want the agent to find useful data you are not collecting yet
- you want a short plan the agent can continue from

Do not use it as a full conversion audit. It is intentionally narrow: what should be measured first so the next growth questions have useful data.

## Normal agent setup flow

The Product Growth Scanner is part of the regular Agent Analytics setup routine.

When an agent is installing analytics, it should:

1. analyze the public root page
2. scan any additional owned public surfaces the user names for the same growth loop
3. read `minimum_viable_instrumentation`, `current_blindspots`, `not_needed_yet`, `goal_driven_funnels`, and `after_install_agent_behavior`
4. compare blind spots across scans before deciding what to install first
5. request browser approval or login if full analysis is needed
6. create or link the project from the analysis
7. install the tracker plus only the high-priority recommendations
8. verify the first useful recommended event
9. summarize what the installed events now let the agent answer

With the CLI, that same routine is:

```bash
npx --yes @agent-analytics/cli@0.5.20 scan https://mysite.com --json
npx --yes @agent-analytics/cli@0.5.20 scan https://docs.mysite.com --json
npx --yes @agent-analytics/cli@0.5.20 login
npx --yes @agent-analytics/cli@0.5.20 scan \
  --resume <analysis_id> \
  --resume-token <resume_token> \
  --full \
  --project my-site \
  --json
npx --yes @agent-analytics/cli@0.5.20 create my-site --domain https://mysite.com --source-scan <analysis_id>
npx --yes @agent-analytics/cli@0.5.20 events my-site --event <first_useful_event> --days 7 --limit 20
```

## Anonymous preview

Anonymous previews analyze the supplied root domain and return a one-analysis `rst_*` resume token.

They do not create an `aas_*` agent session and they do not attach the analysis to an account by themselves.

The preview is enough to see the first measurement plan. Full analysis and project linking require browser approval or account auth.

## Agent handoff

After the preview, use the handoff prompt with your coding agent. The agent should handle project creation, installation, and verification from the analysis context.

```text
Resume this Agent Analytics website analysis.
Scan any additional owned public sites I name for the same growth loop.
Install only the high-priority measurement plan.
Do not add generic click tracking.
Verify the first useful recommended event.
Explain which growth question each event unlocks.
```

When the preview includes `analysis_id` and `resume_token`, keep both values in that prompt. The agent can carry them through setup and continue from the same analysis after login.

## What the measurement plan includes

Agents should start with `minimum_viable_instrumentation`.

Each recommendation includes:

- event name
- priority
- where to instrument it
- why it matters
- what growth question it unlocks
- implementation hint

Use the smallest tracker capability that answers the question:

- `data-aa-event` for named click or intent events
- `data-aa-impression` for meaningful section exposure
- `window.aa.track(...)` for computed client state
- server-side tracking for durable outcomes such as completed signup, payment, install, or account creation

Page views, paths, referrers, UTMs, device/browser fields, country, session ids, session count, days since first visit, and first-touch attribution are automatic. Do not add custom duplicate events for those.

## Good prompts

```text
Run an Agent Analytics product growth analysis for this project, then install only the high-priority recommended events. Avoid generic click tracking and verify the first useful event.
```

```text
Scan our owned marketing site, docs site, and signup surface before setup. Compare the measurement blind spots and tell me which data we are not collecting yet, then install only the first high-priority events.
```

```text
Use the previous analysis_id and resume_token. Create or connect the Agent Analytics project, install the minimum viable instrumentation, and explain which growth questions the first events will answer.
```

```text
Review this site's Agent Analytics analysis. Tell me which measurement blind spots matter now and which recommendations should wait until we have more traffic.
```

## What success looks like

The first successful setup is not "analytics installed."

It is:

- the project exists
- the tracker is live
- one high-priority recommended event has been verified
- the agent can answer the first useful growth question from real traffic

After that, continue with [Session Paths](/guides/session-paths/) or [AI Agent Experiment Tracking](/guides/ai-agent-experiment-tracking/) when there is enough traffic to diagnose and test changes.

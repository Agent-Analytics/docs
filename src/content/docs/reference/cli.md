---
title: CLI
description: Use the Agent Analytics CLI as the official shell-first wrapper around the documented HTTP API, with agent-session login and common analytics commands.
---

The Agent Analytics CLI is the official shell-first wrapper around the documented HTTP API. Use it when your AI agent already has terminal access and you want predictable command output with lower overhead than MCP-style tool calls.

The published package is `@agent-analytics/cli`. For one-off use, run it through `npx` with a pinned version:

<!--email_off-->
```bash
npx --yes @agent-analytics/cli@0.5.20 --help
```
<!--/email_off-->

Source repo: [Agent-Analytics/agent-analytics-cli](https://github.com/Agent-Analytics/agent-analytics-cli)

In the rest of this page, `agent-analytics` means the CLI binary from that same package and version.

## When to use the CLI

Choose the CLI when:

- your agent already works in a shell-first environment
- you want a thin wrapper over the hosted API instead of a connector flow
- you want command composition and scripting instead of tool-call round trips
- you want local auth helpers such as `login`, `logout`, `whoami`, and `auth status`

If you are deciding between access paths rather than looking for CLI usage itself, start with [Plugin vs Skill vs MCP vs API](/reference/cli-mcp-api/).

## No-sign-in demo

Use the seeded public demo when you want an AI agent to try the real CLI/API workflow before you connect an account:

<!--email_off-->
```bash
npx --yes @agent-analytics/cli@0.5.20 demo
npx --yes @agent-analytics/cli@0.5.20 --demo projects
npx --yes @agent-analytics/cli@0.5.20 --demo stats agentanalytics-demo --days 30
npx --yes @agent-analytics/cli@0.5.20 --demo paths agentanalytics-demo --goal signup --since 30d
npx --yes @agent-analytics/cli@0.5.20 --demo funnel agentanalytics-demo --steps "page_view,signup_started,signup"
npx --yes @agent-analytics/cli@0.5.20 --demo breakdown agentanalytics-demo --property path --event signup_started --days 30
npx --yes @agent-analytics/cli@0.5.20 --demo breakdown agentanalytics-demo --property path --event signup --days 30
npx --yes @agent-analytics/cli@0.5.20 --demo experiments get exp_demo_signup_cta
```
<!--/email_off-->

Useful prompts:

- "Audit the signup leak, question the data, and tell me the next fix to test."
- "Check whether the CTA experiment winner actually fixes the biggest signup problem."
- "Turn the demo analytics into a developer-ready growth task with metrics and guardrails."

`--demo` fetches a short-lived read-only `aas_*` session from `POST /demo/session`, then runs normal read commands against the hosted `agentanalytics-demo` project. It does not expose a raw `aak_*` API key, does not read or write your saved CLI config, and blocks mutating commands locally.

## Website analysis

Use `scan` before installing events when you want the fastest path to useful analytics instead of a generic tracking list. The command returns growth questions, measurement blind spots, first instrumentation decisions, what each event unlocks, and what not to track yet.

This is the normal setup routine for agents. Run the analysis first, read `minimum_viable_instrumentation`, create or link the project from the analysis, install only the high-priority recommendations, then verify the first useful event with `events`.

Public previews analyze only the root domain and return a one-analysis `rst_*` resume token. They do not create an `aas_*` agent session. Full analysis and project linking require login.

<!--email_off-->
```bash
npx --yes @agent-analytics/cli@0.5.20 scan https://mysite.com --json
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
<!--/email_off-->

The JSON output is stable for agent skills. Agents should install only the high-priority `minimum_viable_instrumentation` first and verify the first useful recommended event with `events`.

Each recommendation includes an `implementation_hint` mapped to tracker.js capabilities. Page views, paths, referrers, UTMs, device/browser fields, country, session IDs, session count, days since first visit, and first-touch attribution are automatic, so agents should not add custom duplicates for those signals. Use `data-aa-event` for named click intent, `data-aa-impression` for meaningful section exposure, `window.aa.track(...)` for computed client state, server-side tracking for durable outcomes such as completed signup, and broad script opt-ins only when they unlock the stated decision.

## Login and local config

The CLI is agent-session-first:

- default: `agent-analytics login` opens browser approval with a local loopback callback
- detached handoff: `agent-analytics login --detached` prints an approval URL and exits so issue-based or remote runtimes can resume with a finish code
- optional polling: `agent-analytics login --detached --wait` keeps the process alive for local shells that can wait for browser approval

Do not ask users to paste long-lived API keys into an agent thread. Browser approval is the normal hosted flow.

The CLI stores local config at `$XDG_CONFIG_HOME/agent-analytics/config.json`, with fallback to `~/.config/agent-analytics/config.json`.

For managed agent runtimes where home-directory config may not persist, set an explicit persistent directory before login:

<!--email_off-->
```bash
export AGENT_ANALYTICS_CONFIG_DIR="$PWD/.openclaw/agent-analytics"
npx --yes @agent-analytics/cli@0.5.20 login --detached
npx --yes @agent-analytics/cli@0.5.20 auth status
```
<!--/email_off-->

You can also pass `--config-dir "$PWD/.openclaw/agent-analytics"` before or after any command. Resolution order is: `--config-dir`, `AGENT_ANALYTICS_CONFIG_DIR`, `$XDG_CONFIG_HOME/agent-analytics`, then `~/.config/agent-analytics`.

Credential lookup still respects compatibility environment overrides first, so `AGENT_ANALYTICS_API_KEY` continues to win until you unset it.

## Pro upgrade handoff

Free accounts can prove the workflow with core setup and basic reads. Pro unlocks deeper agent analysis: funnels, retention, sessions, pages, heatmaps, insights, live reads, experiments, no monthly agent/API read cap, no monthly event cap, and 365-day retention.

When a CLI command returns `PRO_REQUIRED` or a free-tier read cap, ask the agent to create a human payment handoff:

```bash
agent-analytics upgrade-link --detached \
  --reason "Need funnel and retention reads for this analysis" \
  --command "agent-analytics funnel my-site --steps page_view,signup,purchase"
```

`upgrade-link --detached` prints an `app.agentanalytics.sh` link and exits. The human opens the link, the dashboard confirms the logged-in account, Lemon Squeezy handles payment, and the webhook activates Pro.

Use `upgrade-link --wait` when the local shell should keep polling until `whoami` would show Pro.

## Common commands

```bash
agent-analytics scan https://mysite.com --json
agent-analytics projects
agent-analytics whoami
agent-analytics auth status
agent-analytics create my-site --domain https://mysite.com
agent-analytics create my-site --domain https://mysite.com --source-scan <analysis_id>
agent-analytics stats my-site --days 7
agent-analytics insights my-site --period 7d
agent-analytics events my-site --days 7 --limit 20
agent-analytics context get my-site
agent-analytics context set my-site --json '{"goals":["Increase activated accounts"],"activation_events":["signup_completed","project_created","first_event_received"],"glossary":[{"event_name":"first_event_received","term":"AA Activation","definition":"Signup, project created, and first event received."}]}'
agent-analytics breakdown my-site --property path --event page_view --days 7 --limit 10
agent-analytics paths my-site --goal signup --since 30d --max-steps 5
agent-analytics funnel my-site --steps "page_view,signup,purchase"
agent-analytics retention my-site --period week --cohorts 8
agent-analytics experiments list my-site
agent-analytics logout
```

The main command families are:

- account and auth: `login`, `logout`, `whoami`, `auth status`, `upgrade-link`
- project setup: `scan`, `create`, `projects`
- reporting: `stats`, `insights`, `breakdown`, `pages`, `paths`, `sessions-dist`, `events`, `sessions`, `query`
- live monitoring: `live`
- schema and context: `properties`, `properties-received`, `context get`, `context set`
- analysis workflows: `funnel`, `retention`, `experiments`
- product feedback: `feedback`

Scoped agent sessions cannot generate or rotate raw account API keys; manage compatibility keys from the dashboard.

## Project management

`projects` prints each project's name, ID, project token, and allowed origins. `project`, `update`, and `delete` accept either the exact project name or the project ID.

Use `update` to change allowed origins without leaving the CLI. For local browser QA, keep the production origin and add the temporary local origin:

```bash
agent-analytics update stylio --origins 'https://stylio.app,http://lvh.me:3101'
```

## Project context

Use `context get` and `context set` when a project has custom goals, activation events, or event meanings that should travel with analytics results.

Project context is intentionally compact. Project-scoped analytics result endpoints return it as `project_context` when it is non-empty, so long notes would make every agent read noisier.

The stored shape is:

- `goals`: up to 5 short business goals
- `activation_events`: up to 8 event names that define activation or the main success path
- `glossary`: up to 10 entries, each with `event_name`, `term`, and `definition`

Before setting or refreshing a glossary, inspect the project's real event names:

```bash
agent-analytics properties my-site
agent-analytics properties-received my-site
```

Then store the compact context:

```bash
agent-analytics context set my-site --json '{"goals":["Increase activated accounts"],"activation_events":["signup_completed","project_created","first_event_received"],"glossary":[{"event_name":"first_event_received","term":"AA Activation","definition":"Signup, project created, and first event received."}]}'
```

Read it back with:

```bash
agent-analytics context get my-site
```

## CLI to API mapping

Most CLI workflows map directly to an HTTP endpoint. The main exception is local auth convenience commands such as `logout`, which only modify local CLI state.

| CLI Command | API Endpoint |
| --- | --- |
| `agent-analytics stats my-site` | `GET /stats?project=my-site` |
| `agent-analytics all-sites --period 7d` | `GET /account/all-sites?period=7d` |
| `agent-analytics bot-traffic my-site --period 7d` | `GET /bot-traffic?project=my-site&period=7d` |
| `agent-analytics bot-traffic --all --period 7d` | `GET /account/bot-traffic?period=7d` |
| `agent-analytics events my-site` | `GET /events?project=my-site` |
| `agent-analytics context get my-site` | `GET /project-context?project=my-site` |
| `agent-analytics context set my-site --json '{...}'` | `PUT /project-context` |
| `agent-analytics query my-site --metrics event_count` | `POST /query` |
| `agent-analytics query my-site --metrics event_count --count-mode raw` | `POST /query` |
| `agent-analytics paths my-site --goal signup` | `POST /paths` |
| `agent-analytics funnel my-site --steps "page_view,signup,purchase"` | `POST /funnel` |
| `agent-analytics retention my-site --period week --cohorts 8` | `GET /retention?project=my-site&period=week&cohorts=8` |
| `agent-analytics experiments list my-site` | `GET /experiments?project=my-site` |
| `agent-analytics experiments create my-site --name signup_cta --variants control,new_cta --goal signup` | `POST /experiments` |
| `agent-analytics experiments get exp_abc123` | `GET /experiments/{id}` |
| `agent-analytics scan https://mysite.com --json` | `POST /website-scans` |
| `agent-analytics scan --resume <id> --resume-token <token>` | `GET /website-scans/{id}` |
| `agent-analytics scan --resume <id> --resume-token <token> --full --project my-site` | `POST /website-scans/{id}/upgrade` |
| `agent-analytics projects` | `GET /projects` |
| `agent-analytics project my-site` | `GET /projects/{id}` after resolving name or ID |
| `agent-analytics update my-site --origins https://mysite.com` | `PATCH /projects/{id}` after resolving name or ID |
| `agent-analytics delete my-site` | `DELETE /projects/{id}` after resolving name or ID |
| `agent-analytics logout` | None. Local-only command that clears saved CLI auth and does not call the API. |

`logout` clears the auth state saved by the CLI on disk. It does not revoke credentials on the server.

## Query caveats

- The canonical CLI syntax is `agent-analytics query <project> ...`. Do not use `--project`.
- `/events` stays raw and lossless. `/query` uses `session_then_user` as the default for `event_count`.
- For recent signup or ingestion debugging, check `events <project> --event <actual_event_name>` first; use `query` after verifying the raw event names the project emits.
- Use `--count-mode raw` when the question is about ingestion volume or duplicate-write debugging rather than activation-safe counts.
- Built-in query fields are `event`, `user_id`, `date`, `country`, `session_id`, and `timestamp`.
- Non-built-in fields such as `referrer`, `utm_source`, `path`, `browser`, and `hostname` must be written as `properties.<key>`.
- `group_by` is limited to built-in fields only: `event`, `date`, `user_id`, `session_id`, and `country`.
- If you need low-level payload or filter debugging, move to the [API Reference](/api/) instead of forcing complex shell JSON into the CLI.

## Related

- [Plugin vs Skill vs MCP vs API](/reference/cli-mcp-api/)
- [Authentication](/reference/authentication/)
- [Rate Limits](/reference/rate-limits/)
- [API Reference](/api/)

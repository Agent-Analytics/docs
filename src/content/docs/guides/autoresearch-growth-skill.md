---
title: Autoresearch Growth Skill
description: "Use the Agent Analytics Autoresearch skill to run a loop on top of the loop: generate variants, judge them, ship approved experiments, measure real behavior, and feed the next run."
---

Use the Autoresearch Growth skill when you want your coding agent to turn analytics data into review-ready growth experiments.

The inner loop generates, critiques, synthesizes, and blind-ranks candidates. The outer loop waits for real behavior, pulls the experiment data back into the next brief, and runs again from evidence.

This skill is based on [Andrei Karpathy's `autoresearch`](https://github.com/karpathy/autoresearch) pattern: keep the loop simple, let an external coding agent read the markdown instructions, write artifacts to disk, and iterate.

Agent Analytics adapts that pattern for growth work in the public template repo:

- [Agent Analytics Autoresearch Growth](https://github.com/Agent-Analytics/autoresearch-growth)
- [Agent Analytics](https://agentanalytics.sh)

The important change is the outer evidence loop. Karpathy's original loop is useful for generating and judging ideas. The growth version uses measured experiment behavior to seed the next run, so the loop does not stop at what LLM judges think sounds good.

## Install

Install from the public skill repo:

```bash
npx skills add Agent-Analytics/agent-analytics-skill
```

If the installer asks which skill to install, choose `agent-analytics-autoresearch`.

You can also install it explicitly:

```bash
npx skills add Agent-Analytics/agent-analytics-skill --skill agent-analytics-autoresearch
```

The regular `agent-analytics` skill can be installed from the same repo. Use it first when the site still needs project setup, tracking, or basic experiment wiring.

## What The Skill Needs

The skill works with any analytics source, but works best with Agent Analytics because the agent can collect the evidence itself.

Give the agent:

- the target surface, such as homepage hero, pricing page, onboarding step, or signup CTA
- the current control copy or screenshot
- the product truth that must not drift
- the audience
- one primary event, such as `signup`, `checkout`, or `activation_completed`
- one proxy event, such as `cta_click`
- guardrails, such as bounce, scroll depth, time on page, errors, performance, source quality, or signup quality
- recent analytics data or permission to fetch it

The skill can also run on demo data from the template repo, so you can try the workflow before connecting an account.

## Run The Inner Loop

Start with a review-only run:

```text
Run the autoresearch growth loop for this landing page. Use signup as the primary event and cta_click as the proxy. Fetch the latest analytics data if you can; otherwise use the data I provide. Keep product truth intact, run 5 rounds, and produce two distinct variants for review. Do not wire the experiment yet.
```

The skill should create or update the normal run artifacts:

- `brief.md`
- `results.tsv`
- `final_variants.md`
- a dated data snapshot when live data is available

`results.tsv` is the round log. The final decision artifact is `final_variants.md`.

## Run The Outer Loop

Only move into production after human approval.

Once you approve a variant, ask:

```text
Implement the approved variants on the landing page, create an experiment with control plus the two candidates, verify signup and cta_click tracking, and show me the QA links before launch.
```

After the experiment has collected behavior, ask:

```text
Pull the experiment results and guardrails into a new snapshot. Summarize what won, what lost, what is still too sparse to trust, and run the next autoresearch loop from that evidence.
```

That is the loop on top of the loop:

1. run several LLM judging rounds
2. pick two variants for human review
3. ship an approved experiment
4. wait for real behavior
5. collect the measured result
6. feed the next autoresearch run

LLM judges are useful for pressure-testing options. They are not the final judge. User behavior is the final judge.

## Try It With Sample Data

Clone or open the public template repo:

```bash
git clone https://github.com/Agent-Analytics/autoresearch-growth.git
cd autoresearch-growth
```

Then ask your agent:

```text
Use the demo SaaS data in examples/demo-saas. Run the autoresearch growth loop and show me final_variants.md so I can judge the two winners.
```

No Agent Analytics account is required for the demo data.

## Related

- [Agent Analytics Skill](/guides/agent-analytics-skill/)
- [AI Agent Experiment Tracking](/guides/ai-agent-experiment-tracking/)
- [Session Paths](/guides/session-paths/)
- [CLI](/reference/cli/)
- [Karpathy autoresearch](https://github.com/karpathy/autoresearch)
- [Autoresearch Growth repo](https://github.com/Agent-Analytics/autoresearch-growth)
- [Autoresearch Growth Loops Need Reality Checks](https://blog.agentanalytics.sh/blog/autoresearch-growth-loop-agent-analytics/)

---
title: AI Agent Experiment Tracking
description: Run website and app A/B tests through your AI agent with prompt-first experiment setup, declarative variants, QA, and results review.
---

Use this guide when you want to run browser-side A/B tests on a real website or app by directing your AI agent to do the work for you.

This guide is about page elements like headlines, CTAs, pricing copy, and signup flows. It is not for prompt evals, model comparisons, or internal agent workflow testing.

## Before you start

- Your site already has `tracker.js` installed.
- The project already exists in Agent Analytics.
- You are on a paid plan, because experiments are not available on the free tier.
- You have one business goal event in mind, such as `signup`, `checkout`, or another real conversion event.

If you are testing a signup CTA, keep one distinction clear: the CTA click is not automatically the canonical `signup`. In most products, `signup` should fire when the account is actually created, usually on the server. Use a separate browser event like `signup_started` or `signup_cta_clicked` for the earlier click if you want that step too.

If you still need the initial setup, start with [Getting Started](/getting-started/).

## 1. Pick one goal and one UI element to test

Start with a narrow change. Good first experiments are usually one CTA, one headline, or one pricing message tied to one business event.

Copyable prompt:

```text
I want to run an A/B test on my-site. Help me choose one page element to test and one goal event that reflects a real business outcome. Keep the scope to a single CTA or headline.
```

Avoid using `page_view` as the goal unless the page itself is the product outcome. Most of the time, `signup`, `checkout`, or a core activation event is a better goal.

## 2. Ask your agent to verify or add the goal event

Before the experiment exists, make sure the goal event is already tracked and named consistently with the rest of the site.

Copyable prompt:

```text
Verify that completed signup is tracked when the account is actually created. If this CTA only starts the flow, add a separate signup_started or signup_cta_clicked event for the button click and keep the canonical signup event unchanged.
```

If the event is simple, your agent should usually prefer declarative tracking in markup rather than extra JavaScript.

## 3. Ask your agent to create the experiment

Once the goal event is ready, ask the agent to create an experiment with a clear name and simple variants.

Copyable prompt:

```text
Create an experiment for the signup CTA on my-site with control and new_cta variants, using signup as the goal event.
```

If you want the exact request and response shape behind that step, use the [Experiments API reference](/api/#tag/experiments).

Keep experiment names in `snake_case`, and keep the scope easy to explain later. `signup_cta` is better than something vague like `homepage_test`.

## 4. Ask your agent to wire the variant declaratively

For most sites, declarative variants are the cleanest path. The original HTML stays as the control, and the variant content lives in `data-aa-variant-*` attributes.

Copyable prompt:

```text
Wire this hero headline into the signup_cta experiment using declarative tracker.js attributes. Keep the existing text as control and add the new variant in the markup.
```

Example result:

```html
<h1 data-aa-experiment="signup_cta"
    data-aa-variant-new_cta="Start free today">
  Start your free trial
</h1>
```

Use `window.aa?.experiment()` only when the UI is too dynamic for declarative HTML. For the lower-level mechanics, see [Tracker.js](/reference/tracker-js/).

## 5. Ask your agent to QA both variants

Before you trust the data, make sure both variants actually render and the goal event still fires.

Copyable prompt:

```text
Show me how to force each variant locally so I can QA both versions, then verify that the canonical signup event still lands correctly and that any intermediate CTA event still fires for each one.
```

The forced-variant URLs look like this:

- `?aa_variant_signup_cta=control`
- `?aa_variant_signup_cta=new_cta`

Your agent should use those URLs to check both versions without waiting for hash-based assignment.

## 6. Ask your agent to read results and recommend a winner

Once the experiment has traffic, ask your agent to check whether you have enough data and what the current recommendation is.

Copyable prompt:

```text
Check results for signup_cta and tell me whether we have enough data to pick a winner. If we do, recommend whether to keep running it, pause it, or complete it with a winner.
```

For the underlying HTTP endpoints for reading, pausing, resuming, completing, or deleting experiments, use the [Experiments API reference](/api/#tag/experiments).

Make the decision on the business goal event, not on raw traffic. A variant with more exposures is not automatically better if it does not improve `signup` or `checkout`.

## Common mistakes

- Testing too many elements at once, which makes the result hard to interpret.
- Using `page_view` as the goal instead of a conversion event.
- Creating the experiment before the goal event is actually tracked.
- Treating a pre-auth CTA click as `signup` when the real conversion happens later in the auth or account-creation flow.
- Forgetting to QA forced variants before sending traffic through the test.
- Packing layout, copy, and offer changes into one experiment when one focused change would be easier to learn from.
- Leaving an experiment active after you already know the winner.

## Related

- [Guides](/guides/)
- [Getting Started](/getting-started/)
- [Tracker.js](/reference/tracker-js/)
- [CLI vs MCP vs API](/reference/cli-mcp-api/)
- [Experiments API](/api/#tag/experiments)
- [API Reference](/api/)

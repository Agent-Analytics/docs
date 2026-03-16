---
title: SPA and Virtual Page Tracking
description: Track single-page apps in Agent Analytics without double-counting by using URL-driven routes when possible and manual virtual page views only when needed.
---

Use this guide when your site or app changes screens in the browser without doing a full page reload, and you want page tracking to stay accurate.

This guide is for React, Vue, Svelte, Next.js client transitions, hash routers, onboarding flows, and other UI that may swap screens on the client side.

## Before you start

- Your site already has `tracker.js` installed.
- The project already exists in Agent Analytics.
- You know whether the app changes the browser URL during navigation, or you want your agent to verify that first.

If you still need the initial setup, start with [Getting Started](/getting-started/).

## 1. Prefer real URL changes when possible

Agent Analytics automatically tracks `page_view` when the browser URL changes through `pushState`, `replaceState`, `popstate`, or `hashchange`.

That means the cleanest setup is still a real client-side route change. If the path, query string, or hash changes to match the new screen, Agent Analytics can follow it without extra manual page tracking.

Copyable prompt:

```text
Inspect this app's client-side routing and tell me whether it uses real path changes, hash routing, or no URL changes at all. Prefer URL-driven routing and do not add manual page tracking if Agent Analytics already auto-detects the transition.
```

If your router already updates the URL for each screen, you usually do not need to add anything else.

## 2. Hash routing is supported

Hash-based SPAs such as `/#/settings` or `/#pricing` are supported too. Agent Analytics listens for `hashchange`, so hash routing is a valid fallback when you want URL-driven navigation without full reloads.

Copyable prompt:

```text
Verify whether this app uses hash routing. If it does, keep the tracking URL-driven and confirm that Agent Analytics can rely on hash changes instead of extra manual page calls.
```

If the hash changes on each screen transition, Agent Analytics should count those as separate page views.

## 3. Add manual virtual page tracking only for no-URL screen changes

Sometimes the UI changes screens but the browser URL does not change at all. That is common in wizards, tabbed apps, embedded dashboards, and modal-driven flows.

In that case, Agent Analytics will not auto-detect a new page. Use a manual `page_view` instead.

Avoid bare `aa.page(name)` for this case. `aa.page(name)` adds a `page` label, but `path` and `url` still come from the current browser location. If the URL never changed, reports will still show the old path.

Use `track('page_view', ...)` and override the route fields yourself:

```js
window.aa?.track('page_view', {
  page: 'Checkout Step 2',
  path: '/checkout/step-2',
  url: `${location.origin}/checkout/step-2`
});
```

Framework-agnostic example:

```js
function trackCheckoutStep(step) {
  window.aa?.track('page_view', {
    page: `Checkout Step ${step}`,
    path: `/checkout/step-${step}`,
    url: `${location.origin}/checkout/step-${step}`
  });
}
```

Copyable prompt:

```text
Add manual virtual page tracking only for screen changes that do not update the browser URL. Use `window.aa?.track('page_view', { page, path, url })` and do not add tracking to routes that Agent Analytics already auto-tracks.
```

## 4. React example for no-URL screen state

Only use this pattern when the screen changes without a real path, query, or hash change. If React Router already updates the URL, let Agent Analytics auto-track it instead.

```jsx
import { useEffect } from 'react';

function CheckoutFlow({ activeStep }) {
  useEffect(() => {
    if (!activeStep) return;

    window.aa?.track('page_view', {
      page: `Checkout Step ${activeStep}`,
      path: `/checkout/step-${activeStep}`,
      url: `${window.location.origin}/checkout/step-${activeStep}`
    });
  }, [activeStep]);

  return <div>{/* checkout UI */}</div>;
}
```

## 5. QA in the browser and look for double-counting

On localhost, Agent Analytics logs tracking calls to the browser console instead of sending production data. That makes it easy to click through the app and confirm that each intended screen change produces exactly one page view.

Copyable prompt:

```text
Open the app, click through the SPA navigation, and verify that each intended screen produces one `page_view`. Flag any transitions that send both an automatic page view and a manual one.
```

If you see duplicate page views for one transition, remove the manual tracking from routes that already change the URL.

## Common mistakes

- Using bare `aa.page(name)` for screen changes where the URL never changes.
- Sending both router-driven automatic page views and manual page views for the same transition.
- Forgetting to override `path` and `url` when sending a virtual `page_view`.

## Related

- [Guides](/guides/)
- [Getting Started](/getting-started/)
- [Tracker.js](/reference/tracker-js/)
- [AI Agent Experiment Tracking](/guides/ai-agent-experiment-tracking/)

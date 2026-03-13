---
title: Tracker.js
description: Add Agent Analytics to any site with one script tag, then turn on declarative events, consent, performance tracking, and other browser-side features.
---

`tracker.js` is the browser-side part of Agent Analytics. Use it when you want page views, custom events, and client-side experiments without shipping a heavy SDK.

The API reference now treats `GET /tracker.js` as the script endpoint only. The setup and feature guide lives here.

## Base snippet

Add this before `</body>`:

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."></script>
```

Required attributes:

- `data-project`: your project name
- `data-token`: the public project token (`aat_*`)

The tracker automatically collects page URL, pathname, referrer, browser, OS, device, language, timezone, UTM params, session count, and first-touch attribution. No cookies are required.

If your agent can edit code, ask it to add the snippet for you. If not, create the project in [Getting Started](/getting-started/#3-create-your-first-project) and paste the returned snippet manually.

## Common options

| Attribute | What it does |
| --- | --- |
| `data-link-domains="example.com"` | Link anonymous identity across sibling domains or subdomains |
| `data-do-not-track="true"` | Respect the browser Do Not Track signal |
| `data-heartbeat="15"` | Measure active time on page while the tab is visible |
| `data-track-outgoing="true"` | Track external link clicks as `outgoing_link` |
| `data-track-clicks="true"` | Track `<a>` and `<button>` clicks as `$click` |
| `data-track-errors="true"` | Capture uncaught JS errors and promise rejections as `$error` |
| `data-track-performance="true"` | Add Navigation Timing metrics to `page_view` |
| `data-track-vitals="true"` | Add Core Web Vitals to `page_view` |
| `data-track-downloads="true"` | Track download link clicks as `$download` |
| `data-track-forms="true"` | Track form submissions as `$form_submit` |
| `data-track-404="true"` | Track 404 pages as `$404` |
| `data-track-scroll-depth="true"` | Add max scroll depth to `page_view` |
| `data-require-consent="true"` | Buffer events until consent is granted |

Example:

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."
        data-track-outgoing="true"
        data-track-performance="true"
        data-track-vitals="true"
        data-track-errors="true"
        data-track-scroll-depth="true"
        data-heartbeat="15"></script>
```

## Declarative events

For simple click tracking, you usually do not need custom JavaScript. Add `data-aa-event` directly in HTML:

```html
<button data-aa-event="signup" data-aa-event-plan="pro">
  Sign up for Pro
</button>
```

That fires a `signup` event with `{ plan: "pro" }`.

This is usually the easiest path for agents too. They can add attributes to existing markup instead of wiring `onclick` handlers or editing application code.

## Impressions

Track whether a section was actually seen:

```html
<section data-aa-impression="pricing_table"
         data-aa-impression-plan="pro">
  ...
</section>
```

When the element becomes visible, the tracker sends an `$impression` event.

## `window.aa` API

Use the JavaScript API when the event depends on runtime state:

```js
window.aa?.track('checkout_started', { plan: 'pro' });
window.aa?.identify('user_123');
window.aa?.set({ plan: 'pro', team: 'acme' });
```

Useful methods:

- `aa.track(event, properties)`: send a custom event
- `aa.page(name)`: manually send a page view
- `aa.identify(id)`: link anonymous behavior to a known user ID
- `aa.set(properties)`: attach global properties to future events
- `aa.experiment(name, variants)`: assign variants deterministically client-side
- `aa.grantConsent()` / `aa.revokeConsent()`: manage consent mode

## Common recipes

### Cross-domain identity

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."
        data-link-domains="example.com,app.example.com,docs.example.com"></script>
```

### Privacy and consent

```html
<script defer src="https://api.agentanalytics.sh/tracker.js"
        data-project="my-site"
        data-token="aat_..."
        data-do-not-track="true"
        data-require-consent="true"></script>
```

```js
window.aa?.grantConsent();
window.aa?.revokeConsent();
```

### Experiments

```html
<h1 data-aa-experiment="hero_text"
    data-aa-variant-b="Try it free today!">
  Start your free trial
</h1>
```

### Local development

On localhost, the tracker switches to dev mode and logs activity to the browser console instead of sending production data. That keeps local testing out of your real analytics.

## Related

- [Getting Started](/getting-started/)
- [Authentication](/reference/authentication/)
- [API Reference](/api/)

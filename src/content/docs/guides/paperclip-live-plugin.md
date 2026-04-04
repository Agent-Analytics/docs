---
title: Paperclip Live Plugin Preview
description: Connect Agent Analytics live signals to a Paperclip company with the thin live-monitor plugin.
---

The Paperclip live plugin is the thin operator surface for **"what is moving right now?"**

It adds three Paperclip surfaces:

- a company-level live page
- a compact dashboard widget
- a settings page for login-first auth and explicit asset mapping

This plugin is intentionally narrow:

- it uses Agent Analytics `/stream` and `/live`
- it keeps credentials in the worker
- it maps company assets explicitly to Agent Analytics projects
- it does not rebuild the full analytics product inside Paperclip

The package name is:

```text
@agent-analytics/paperclip-live-analytics-plugin
```

The operator and maintainer docs ship with the plugin package itself under its local `docs/` directory.

If you only need the Paperclip company onboarding flow today, start with [Set up Agent Analytics for your 📎Paperclip company](/guides/paperclip/).

If you need to revoke a plugin-owned login later, use the web app's `Account Settings` → `Agent Sessions` page. Active Paperclip connections show up there alongside other hosted agent-session clients.

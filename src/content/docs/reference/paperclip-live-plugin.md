---
title: Paperclip Live Plugin
description: Install the Agent Analytics live-monitor plugin for Paperclip, connect an existing account, and map one project to a company workspace.
---

The Paperclip live plugin is the thin operator surface for one operator question:

**What is moving right now inside this Paperclip company?**

Use this page when you want the plugin itself: install, login, project selection, and the live surfaces it adds inside Paperclip.

If you need the broader Paperclip company onboarding flow first, start with [Set up Agent Analytics for your 📎Paperclip company](/guides/paperclip/).

## What it adds

The plugin adds three Paperclip surfaces:

- a company-level live page
- a compact dashboard widget
- a settings page for existing-account login, Paperclip setup help, and explicit project selection

This plugin is intentionally narrow:

- it uses Agent Analytics `/stream` and `/live`
- it keeps credentials in the worker
- it maps company assets explicitly to Agent Analytics projects
- it does not rebuild the full analytics product inside Paperclip

![Agent Analytics inside the Paperclip dashboard](/aa-in-dashboard.jpg)

## Package

Install this package in Paperclip:

```text
@agent-analytics/paperclip-live-analytics-plugin
```

The package README lives in the plugin repo, and the operator/maintainer notes also ship with the package under its local `docs/` directory.

## Install and connect

1. In Paperclip, open `Settings` -> `Plugins`.
2. Install `@agent-analytics/paperclip-live-analytics-plugin`.
3. Open the plugin `Configure` page.
4. If the Agent Analytics account is not ready yet, use the Paperclip setup task shown in the plugin help panel or follow [Set up Agent Analytics for your 📎Paperclip company](/guides/paperclip/).
5. Log in with your existing Agent Analytics account.
6. Select one Agent Analytics project for the current Paperclip company.

## Important auth rule

The plugin login popup is for an **existing Agent Analytics account** only.

If the account still needs to be created, do that from the Paperclip task flow first. The plugin blocks account creation from the popup itself and sends users back to the setup guide instead.

## What the plugin is good for

Use the live plugin when you want:

- a dashboard widget with live status
- a live page for current visitors, countries, top pages, and recent events
- a worker-owned Paperclip integration that keeps the auth session out of the browser UI

Do not use it as the primary setup guide for the full Paperclip company flow. That belongs in [Set up Agent Analytics for your 📎Paperclip company](/guides/paperclip/).

## Billing note

The plugin reads Agent Analytics live routes. Free accounts can still show the fallback 7-day summary for the selected project, but live visitors and event streaming require a paid tier.

## Revoke access later

If you need to revoke a plugin-owned login later, use the web app's `Account Settings` → `Agent Sessions` page. Active Paperclip connections show up there alongside other hosted agent-session clients.

---
title: Installation
description: Configure app installation for App Management
keywords:
  - App Builder
  - Extensibility
  - App Management
  - Installation
---

# Installation

The `installation` field in your `app.commerce.config` file allows you to configure custom scripts and messages for the application installation process.

## Installation messages

Define messages that display to users before and after the installation process:

```js
import { defineConfig } from "@adobe/aio-commerce-lib-app/config"

export default defineConfig({
  metadata: {
    // ...
  },
  installation: {
    messages: {
      preInstallation: "This app requires configuration A & B to be completed before clicking Install.",
      postInstallation: "Configure your email settings to complete the setup.",
    },
  },
});
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `preInstallation` | string | No | Message displayed before installation starts. Maximum 1000 characters. |
| `postInstallation` | string | No | Message displayed after installation completes. Maximum 1000 characters. |

## Next steps

- [Events](./events.md) - Configure event subscriptions
- [Webhooks](./webhooks.md) - Set up webhook endpoints
- [Post installation](./post-installation.md) - Define custom installation steps

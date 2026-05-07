---
title: App metadata
description: Define your app metadata in app.commerce.config
keywords:
  - App Builder
  - Extensibility
  - App Management
---

# App metadata

The `metadata` in your `app.commerce.config` file identifies your application to the App Management system. This information displays in the Admin UI and helps merchants identify and manage installed apps.

## Example

The following example shows a metadata configuration:

```js
import { defineConfig } from "@adobe/aio-commerce-lib-app/config"

export default defineConfig({
  metadata: {
    id: "my-commerce-application",
    displayName: "My Commerce Application",
    description: "This is a description for my application",
    version: "1.0.0"
  },
});
```

## Metadata properties

The metadata contains the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for your app. Must contain only alphanumeric characters and hyphens. |
| `displayName` | string | Yes | Name shown in the Admin UI. Maximum 50 characters. |
| `description` | string | Yes | Brief description of your app's functionality. Maximum 255 characters. |
| `version` | string | Yes | Semantic version number (for example, `1.0.0`, `2.1.3`). |

## App icon

The displayed icon for an app in App Management is supplied by the **Adobe app registry** (for example your Adobe Exchange listing or enterprise app registration). It is not configurable through the `metadata` in `app.commerce.config`.

To change how the icon appears for merchants, update the app’s registry or marketplace listing, not the commerce config metadata.

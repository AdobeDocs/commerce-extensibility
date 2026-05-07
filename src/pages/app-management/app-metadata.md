---
title: App metadata
description: Define your app metadata in app.commerce.config
keywords:
  - App Builder
  - App Management
  - Configuration
  - Extensibility
---

# App metadata

The `metadata` object in your `app.commerce.config` file identifies your application to App Management. This information appears in the Admin and helps merchants identify and manage installed apps.

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

<InlineAlert variant="info" slots="text"/>

The listing icon comes from the Adobe app registry (Adobe Exchange or enterprise registration), not from the `metadata` object in `app.commerce.config`. Update the listing or registry record to change what merchants see.

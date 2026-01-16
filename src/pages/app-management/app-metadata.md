---
title: App metadata reference
description: Define your app metadata in app.commerce.config
keywords:
  - App Builder
  - Extensibility
  - App Management
---

# App metadata reference

<InlineAlert variant="warning" slots="text" />

**Adobe Commerce App Management is for Beta users only and is not yet accessible to all customers.**

The `metadata` object in your `app.commerce.config` file identifies your application to the App Management system. This information displays in the Admin UI and helps merchants identify and manage installed apps.

## Metadata properties

The metadata object contains the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for your app. Use lowercase letters, numbers, and hyphens. |
| `displayName` | string | Yes | Human-readable name shown in the Admin UI. |
| `description` | string | Yes | Brief description of your app's functionality. |
| `version` | string | Yes | Semantic version number. |

## Example

The following example shows a metadata configuration:

```js
metadata: {
    id: "my-commerce-application",
    displayName: "My Commerce Application",
    description: "This is a description for my application",
    version: "1.0.0"
  },
```

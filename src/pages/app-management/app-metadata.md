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

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for your app. Use lowercase letters, numbers, and hyphens. |
| `displayName` | string | Yes | Human-readable name shown in the Admin UI. |
| `description` | string | Yes | Brief description of your app's functionality. |
| `version` | string | Yes | Semantic version number. |

## Example

```js
metadata: {
    id: "my-commerce-application",
    displayName: "My Commerce Application",
    description: "This is a description for my application",
    version: "1.0.0"
  },
```

## Next steps

<DiscoverBlock slots="link, text"/>

[Runtime actions reference](./runtime-actions.md)

Initialize the configuration library and understand the generated runtime actions.

<DiscoverBlock slots="link, text"/>

[Associate and configure apps](./associate-apps.md)

Link apps to Commerce instances and configure business settings.

---
title: App metadata reference
description: Define your app metadata in extensibility.config.js
keywords:
  - App Builder
  - Extensibility
  - App Management
---

# App metadata reference

<InlineAlert variant="warning" slots="text" />

**Adobe Commerce App Management is for Beta users only and is not yet accessible to all customers.**

The `metadata` object in your `extensibility.config.js` file identifies your application to the App Management system. This information displays in the Admin UI and helps merchants identify and manage installed apps.

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
    id: "app-management-poc",
    displayName: "App Management PoC",
    description: "This is a PoC for Commerce app management",
    version: "1.0.0"
  },
```

## Next steps

<DiscoverBlock slots="link, text"/>

[Configuration schema reference](./configuration-schema.md)

Define your app configuration schema in `extensibility.config.js`.

<DiscoverBlock slots="link, text"/>

[Runtime actions reference](./runtime-actions.md)

Initialize the configuration library and understand the generated runtime actions.

<DiscoverBlock slots="link, text"/>

[Associate and configure apps](./associate-apps.md)

Link apps to Commerce instances and configure business settings.

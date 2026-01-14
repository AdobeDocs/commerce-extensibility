---
title: Runtime actions reference
description: Initialize the configuration library and understand auto-generated runtime actions
keywords:
  - App Builder
  - Extensibility
edition: beta
---

# Runtime actions reference

<InlineAlert variant="warning" slots="text" />

**Adobe Commerce App Management is for Beta users only and is not yet accessible to all customers.**

The configuration library auto-generates runtime actions based on your [configuration schema](./configuration-schema.md). These actions power the App Management UI—no boilerplate code required.

## Initialize the library

```bash
npx @adobe/commerce-lib-config init
```

This command:

| Step | Action |
|------|--------|
| 1 | Creates `extensibility.config.js` with a sample schema |
| 2 | Installs `@adobe/commerce-lib-config` and `@adobe/commerce-sdk` |
| 3 | Adds post-install script to `package.json` |
| 4 | Generates runtime actions in `src/commerce-configuration-1/` |
| 5 | Creates `ext.config.yaml` declaring the actions |
| 6 | Updates `app.config.yaml` to include the extension |
| 7 | Validates the schema |

## Generated files

| File | Description |
|------|-------------|
| `extensibility.config.js` | Your [configuration schema](./configuration-schema.md) |
| `src/commerce-configuration-1/` | Auto-generated runtime actions |
| `ext.config.yaml` | Action declarations for App Builder |

## Generated runtime actions

| Action | Description |
|--------|-------------|
| `get-schema` | Returns the schema. UI uses this to render the configuration form. |
| `get-config` | Retrieves configuration values for a scope. |
| `save-config` | Saves values for a scope with validation. |
| `delete-config` | Removes values, reverting to inherited defaults. |
| `get-scopes` | Returns available scopes (global, websites, stores, store views). |
| `sync-scopes` | Syncs Commerce scopes to the application. |
| `get-instance` | Returns linked Commerce instance info. |

<InlineAlert variant="warning" slots="text"/>

Do not manually edit files in `src/commerce-configuration-1/`. They are regenerated when the library updates.

## Build and deploy

```bash
aio app build
aio app deploy
```

Once deployed, your app appears in App Management and can be [associated with a Commerce instance](./associate-apps.md).

## Update the library

```bash
npm update @adobe/commerce-lib-config
aio app build
aio app deploy
```

The post-install script auto-regenerates runtime actions when you update the library.

## Troubleshooting

**Runtime actions not generated**

1. Verify `extensibility.config.js` exists with a valid schema.
1. Run manually: `npx @adobe/commerce-lib-config generate`

**Schema validation fails**

1. Run: `npx @adobe/commerce-lib-config validate-schema`
1. Fix issues in `extensibility.config.js` and rebuild.

## Next steps

<DiscoverBlock slots="link, text"/>

[Associate and configure apps](./associate-apps.md)

Link apps to Commerce instances and configure business settings.

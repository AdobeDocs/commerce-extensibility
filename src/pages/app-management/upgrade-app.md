---
title: Upgrade your app
description: Understand how App Management plans and runs upgrades to a deployed app.
keywords:
  - App Builder
  - App Management
  - Upgrade
  - Extensibility
---

# Upgrade your app

When you deploy a new version of an installed app, App Management is notified that an upgrade is available. The upgrade can then be started manually in the App Management UI or automatically, depending on the upgrade mode.

The `metadata.id` identifies the installed app and must remain the same across upgrades. To use a different ID, uninstall the existing app and install the app again.

## Choose an upgrade mode

Set `metadata.upgradeMode` in `app.commerce.config` to control whether the planned upgrade runs automatically:

```typescript
export default defineConfig({
  metadata: {
    id: "my-commerce-application",
    displayName: "My Commerce Application",
    description: "An Adobe Commerce app",
    version: "2.0.0",
    upgradeMode: "manual",
  },
});
```

| Mode | Default | Behavior after deployment |
| --- | --- | --- |
| `manual` | Yes | App Management is notified that an upgrade is available. An administrator reviews and starts the upgrade in the App Management UI. |
| `auto` | No | App Management is notified and automatically starts the upgrade. Automatic upgrades are experimental. |

## Upgrade workflow

1. Update `app.commerce.config` with the configuration changes you want to apply (add, remove, or modify settings), and update `metadata.version`.
1. Build and deploy your app.
1. App Management is notified that an upgrade is available.
1. In `manual` mode, an administrator starts the upgrade in the App Management UI. In `auto` mode, App Management starts it automatically.

The upgrade mechanism detects a new release using `metadata.version`. If you change the configuration without updating the version, App Management will not detect an upgrade to trigger.

## Configuration changes and upgrades

Business Configuration is not part of the app installation or upgrade process. After you deploy a change to the business configuration schema, it is reflected in App Management automatically; it does not trigger an app upgrade.

Changes to `events`, `webhooks`, and `adminUi` can add, modify, or remove components as part of an upgrade.

For custom installation steps, App Management detects steps declared in `app.commerce.config`. To run an additional script during an upgrade, add a new script and declare it as a new custom installation step. Editing the contents of a script that was already run does not make that step appear changed, because only the step declared in the configuration is detected.

## Retry a failed upgrade

If an upgrade fails, use **Retry Upgrade** in the App Management UI to try again. This button is available whether the app uses `manual` or `auto` mode. In `auto` mode, deploying the app again also triggers another automatic upgrade attempt.

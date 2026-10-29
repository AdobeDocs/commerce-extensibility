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

To upgrade your app:

1. [Prepare your app](#before-you-upgrade) with the required library version and recommended one-time reinstall.
1. [Choose an upgrade mode](#choose-an-upgrade-mode): manual (default) or automatic (experimental).
1. [Review which configuration changes qualify](#configuration-changes-and-upgrades), and add a cleanup step if you need to undo a custom installation step.
1. [Update the configuration and version, then build and deploy](#upgrade-workflow).
1. Start the upgrade in App Management, or let it start automatically. If it fails, [retry the upgrade](#retry-a-failed-upgrade).

## Before you upgrade

App upgrades require `@adobe/aio-commerce-lib-app` version 2.1.0 or later.

Before unassociating the app, [review the unassociation confirmation](build-deploy.md#review-unassociation) and any cleanup implemented by custom installation steps.

For an existing app, we recommend completing the **unassociate-and-install** workflow one last time to ensure subsequent upgrades work reliably:

1. Unassociate the app from your Adobe Commerce instance in App Management.
1. Update your app's SDK libraries, including `@adobe/aio-commerce-lib-app` to version 2.1.0 or later, before installing the app again.
1. Build and deploy your app with the updated libraries.
1. Associate and install the app again in App Management.

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

Not all configuration changes qualify for a planned upgrade. Display-only changes, such as changes to labels or descriptions, do not qualify on their own, even when you update `metadata.version`.

<InlineAlert variant="info" slots="text"/>

Business Configuration is not part of the app installation or upgrade process. After you deploy a change to the business configuration schema, it is reflected in App Management automatically; it does not trigger an app upgrade.

Changes to `events`, `webhooks`, and `adminUi` can add, modify, or remove components as part of an upgrade.

For custom installation steps, App Management detects steps declared in `app.commerce.config`. To run an additional script during an upgrade, add a new script and declare it as a new custom installation step. Editing the contents of a script that was already run does not make that step appear changed, because only the step declared in the configuration is detected.

### Removing custom installation steps

Removing a custom installation step from `app.commerce.config` does not run its `uninstall` handler. The removed script is no longer available to execute, so removing the step does not clean up resources it previously created.

In App Management:

* The upgrade plan shows the removed step with a warning that no script will run, including any previously defined `uninstall` handler, and a link to this documentation.
* The removed step does not appear on the upgrade progress screen because nothing is executed for it.
* After the upgrade, the removed step no longer appears in the app details.

If you need to undo a previous step's changes, we recommend keeping that step declared and adding a new custom installation step instead of removing it. Give the new step a unique, descriptive name, such as "Remove legacy webhook registrations", and put the cleanup logic in its `install` handler, not its `uninstall` handler. The new step's `install` handler runs during the upgrade and performs the cleanup explicitly.

After adding the cleanup script, regenerate the actions with `npx aio-commerce-lib-app generate actions`, update `metadata.version`, and build and deploy the app. See [Writing installation scripts](installation/customize.md#writing-installation-scripts) for the handler syntax.

## Retry a failed upgrade

If an upgrade fails, use **Retry Upgrade** in the App Management UI to try again. This button is available whether the app uses `manual` or `auto` mode. In `auto` mode, deploying the app again also triggers another automatic upgrade attempt.

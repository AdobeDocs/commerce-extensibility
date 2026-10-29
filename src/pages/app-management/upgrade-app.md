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

1. [Prepare your app](#before-you-upgrade) with the required library version and migration checks.
1. [Choose an upgrade mode](#choose-an-upgrade-mode): manual (default) or automatic (experimental).
1. [Review which configuration changes qualify](#configuration-changes-and-upgrades), and add a cleanup step if you need to undo a custom installation step.
1. [Update the configuration and version, then build and deploy](#upgrade-workflow).
1. Start the upgrade in App Management, or let it start automatically. If it fails, [retry the upgrade](#retry-a-failed-upgrade).

## Understand App Management upgrades

An App Builder deployment and an App Management upgrade are separate operations:

| Concept | Meaning |
| --- | --- |
| Desired configuration | The configuration declared in the deployed `app.commerce.config`. |
| Installed configuration | The recorded configuration of the app's installed components. |
| Upgrade plan | The operations needed to reconcile supported components with the desired configuration. Planning also checks for issues that prevent execution. |
| Execution | Applying the planned operations and recording their results. A plan waiting for review has not applied those operations. |

`metadata.version` identifies the target release; it does not describe the operations to execute. The plan determines which components need changes. Updating the version does not, by itself, mean that an event, webhook, or Admin UI component needs to be changed.

## Before you upgrade

App upgrades require `@adobe/aio-commerce-lib-app` version 2.1.0 or later.

For an existing app, test migration from its installed SDK version before upgrading a production instance. The SDK can initialize lifecycle state from a legacy installation record; reinstallation is not a universal prerequisite.

1. Record the installed app version and configuration, and back up application data and external resources that your scripts manage.
1. Update your app's SDK libraries, including `@adobe/aio-commerce-lib-app`, regenerate actions with `npx aio-commerce-lib-app generate actions`, and build and deploy in a non-production environment.
1. Validate that the existing installation is recognized, review the upgrade plan, and test the upgrade and its recovery paths.

If the installation cannot be migrated, work with the app provider to plan recovery before unassociating or reinstalling. [Review the unassociation confirmation](build-deploy.md#review-unassociation) and custom uninstall handlers first. Cleanup can remove resources, and service availability and configuration preservation must be checked for that application. Do not use unassociation as a routine upgrade or retry step.

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

The app developer sets this mode in the deployed configuration. With `auto`, planned operations can run without the manual review step, including custom installation scripts with external side effects. Keep `manual` explicit when review is required, and test automatic upgrades and failure recovery in a non-production environment before enabling them in production.

## Upgrade workflow

1. Update `app.commerce.config` with the configuration changes you want to apply (add, remove, or modify settings), and update `metadata.version`.
1. Build and deploy your app.
1. App Management is notified that an upgrade is available.
1. In `manual` mode, an administrator starts the upgrade in the App Management UI. In `auto` mode, App Management starts it automatically.

Update `metadata.version` for a new release. Planning and execution remain separate: in manual mode, deployment does not mean that the installed Commerce configuration has been upgraded.

If deployment replaces Runtime actions already used by the installed app, the new code can receive requests before the manual upgrade completes. Keep it compatible with the installed event, webhook, and configuration contracts during that interval. Test both the pending-upgrade state and the completed upgrade.

## Configuration changes and upgrades

Use the upgrade plan to distinguish a new release from changes to installed components:

| Change | App Management behavior |
| --- | --- |
| `metadata.version` only | Identifies a new target release; does not itself require component changes. |
| `eventing` | Reconciles event providers, metadata, registrations, and Commerce subscriptions. Provider and event label or description changes are applied too. |
| `webhooks` | Reconciles configured webhook subscriptions. |
| `adminUi` | Applies supported Admin UI registration changes. |
| `businessConfig.schema` | Updated through deployment, outside the installation and upgrade process. |
| Runtime action implementation only | Updated by App Builder deployment, not by an App Management migration step. |
| New custom installation step | Runs its `install` handler when its name has not already completed. |
| Implementation of a completed custom step | Does not run the step again. Add a new step with a new name. |

<InlineAlert variant="info" slots="text"/>

Business Configuration is not part of the app installation or upgrade process. After you deploy a change to the business configuration schema, it is reflected in App Management automatically; it does not trigger an app upgrade.

Changes to `eventing`, `webhooks`, and `adminUi` can add, modify, or remove components as part of an upgrade. Plans can also repair drift, such as a configured resource that was manually removed or left missing by a failed operation. A retry therefore depends on current state, not only on the configuration diff.

### Custom installation steps as migrations

Custom installation steps are identified by their `name`, not by a hash of the script contents. Treat completed steps as migrations:

* Keep each completed step's name stable. Renaming it introduces a new step whose `install` handler can run again.
* To change behavior, add a new script with a new, unique step name. Editing the implementation or script path of a completed step does not rerun it.
* New steps run in their declared order. Reordering completed steps does not make them new migrations.
* Design handlers to tolerate partial execution and repeated calls. A step interrupted before completion, such as by a timeout, can run again.

For example, if version `1.0.0` ran a step named `Configure legacy integration`, version `2.0.0` can retain that declaration and add a new step named `Migrate legacy integration`. The upgrade runs the new step without rerunning the completed one. The new handler should check which resources exist before changing or removing them.

### Removing custom installation steps

Removing a custom installation step from `app.commerce.config` does not run its `uninstall` handler. The removed script is no longer available to execute, so removing the step does not clean up resources it previously created.

In App Management:

* The upgrade plan shows the removed step with a warning that no script will run, including any previously defined `uninstall` handler, and a link to this documentation.
* The removed step does not appear on the upgrade progress screen because nothing is executed for it.
* After the upgrade, the removed step no longer appears in the app details.

If you need to undo a previous step's changes, we recommend keeping that step declared and adding a new custom installation step instead of removing it. Give the new step a unique, descriptive name, such as "Remove legacy webhook registrations", and put the cleanup logic in its `install` handler, not its `uninstall` handler. The new step's `install` handler runs during the upgrade and performs the cleanup explicitly.

After adding the cleanup script, regenerate the actions with `npx aio-commerce-lib-app generate actions`, update `metadata.version`, and build and deploy the app. See [Writing installation scripts](installation/customize.md#writing-installation-scripts) for the handler syntax.

Keep the original step declared for as long as its `uninstall` handler may be needed. Once the declaration is removed, that handler is unavailable during both upgrades and application uninstallation. Remove it only after verifying that its remaining cleanup responsibilities are no longer needed or are covered by retained scripts.

## Retry a failed upgrade

If an upgrade fails, use **Retry Upgrade** in the App Management UI to try again. This button is available whether the app uses `manual` or `auto` mode. In `auto` mode, deploying the app again also triggers another automatic upgrade attempt.

A failed upgrade can leave some operations applied. Retrying creates a fresh plan from current state rather than resuming the old plan at a checkpoint. Custom installation steps recorded as successful are not run again; failed or interrupted steps can run again. A failed handler may already have changed an external resource, so do not treat retry as an undo operation.

Before retrying, identify the failed step, inspect its logs, and correct the cause. Make custom handlers idempotent, including cleanup that tolerates resources already being absent. If repeated attempts fail, retain the attempt and activation IDs for investigation rather than unassociating the app to reset it.

### Inspect an upgrade run

From the project directory, check the latest upgrade run:

```bash
npx aio-commerce-lib-app upgrade status
```

To inspect a particular run, pass its run ID:

```bash
npx aio-commerce-lib-app upgrade status <run-id>
```

The installation action's `GET /installation?history=true` response provides attempt history, plans, step statuses, and execution activation IDs. Use the `activations.execution` value of the failed attempt to read its Runtime logs:

```bash
aio rt activation logs <execution-activation-id>
```

<InlineAlert variant="info" slots="text"/>

Closing the terminal that follows an automatic upgrade does not stop that upgrade. Check its result with `upgrade status`. This differs from the browser-based [installation experience](installation/customize.md#installation-experience); do not assume closing that dialog is safe.

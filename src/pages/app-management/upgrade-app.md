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
1. [Review how configuration changes are applied](#configuration-changes-and-upgrades), and add a cleanup step if you need to remove resources created by a custom installation step.
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

`metadata.version` identifies the target release. The upgrade plan determines which events, webhooks, and Admin UI components require changes. A version-only update does not require component changes unless the plan identifies drift from the configured state.

## Before you upgrade

<InlineAlert variant="info" slots="text"/>

App upgrades require `@adobe/aio-commerce-lib-app` version 2.1.0 or later.

For an existing app, test migration from its installed SDK version before upgrading a production instance. When no lifecycle state exists, the SDK can initialize it from a successful legacy installation record that includes the app configuration, without reinstalling the app. This migration runs once. Failed or in-progress installation records, and records without configuration, are not used to initialize lifecycle state.

1. Record the installed app version and configuration, and back up application data and external resources that your scripts manage.
1. Update your app's SDK libraries, including `@adobe/aio-commerce-lib-app`, regenerate actions with `npx aio-commerce-lib-app generate actions`, and build and deploy in a non-production environment.
1. Validate that the existing installation is recognized, review the upgrade plan, and test the upgrade and its recovery paths.

Resolve migration errors before upgrading a production instance. If recovery requires unassociation or reinstallation, [review the unassociation confirmation](build-deploy.md#review-unassociation) and custom uninstall handlers, identify resources that cleanup removes, and plan for any service interruption or configuration restoration. Use the upgrade workflow for routine updates and [Retry Upgrade](#retry-a-failed-upgrade) to recover from a failed upgrade.

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

After deployment, the `post-app-deploy` hook reads `metadata.upgradeMode` from the project's `app.commerce.config`. If the installed version uses `manual` and the newly deployed version sets `auto`, the hook starts the planned upgrade automatically, without administrator review.

In `auto` mode, planned operations run without manual review, including custom installation scripts that modify external resources. Set `upgradeMode: "manual"` explicitly when review is required. Test automatic upgrades and failure recovery in a non-production environment before enabling them in production.

## Upgrade workflow

1. Update `app.commerce.config` with the configuration changes you want to apply (add, remove, or modify settings), and update `metadata.version`.
1. Build and deploy your app.
1. App Management is notified that an upgrade is available.
1. In `manual` mode, an administrator starts the upgrade in the App Management UI. In `auto` mode, App Management starts it automatically.

In `manual` mode, the installed Commerce configuration remains unchanged until an administrator starts the upgrade.

If deployment replaces Runtime actions already used by the installed app, the new code can receive requests before the manual upgrade completes. Keep it compatible with the installed event, webhook, and configuration contracts during that interval. Test both the pending-upgrade state and the completed upgrade.

## Configuration changes and upgrades

The following table describes how each type of change is applied:

| Change | App Management behavior |
| --- | --- |
| `metadata.version` only | Identifies a new target release; does not itself require component changes. |
| `eventing` | Reconciles event providers, metadata, registrations, and Commerce subscriptions, including provider and event labels and descriptions. |
| `webhooks` | Reconciles configured webhook subscriptions. |
| `adminUi` | Applies supported Admin UI registration changes. |
| `businessConfig.schema` | Updated through deployment, outside the installation and upgrade process. |
| Runtime action implementation only | Updated by App Builder deployment, not by an App Management migration step. |
| New custom installation step | Runs its `install` handler if no step with that name has completed successfully. |
| Implementation of a completed custom step | Does not run the step again. Add a new step with a new name. |

For example, changing `metadata.version` from `1.0.0` to `1.1.0` identifies a new app release. Changing an event's `label` under `eventing` updates the event metadata during that release's upgrade. To publish the label change, update both the label and `metadata.version`.

<InlineAlert variant="info" slots="text"/>

Business Configuration is not part of the app installation or upgrade process. After you deploy a change to the business configuration schema, it is reflected in App Management automatically; it does not trigger an app upgrade.

Changes to `eventing`, `webhooks`, and `adminUi` can add, modify, or remove components as part of an upgrade. Plans can also repair drift, such as a configured resource that was manually removed or left missing by a failed operation. Each retry evaluates the current state when planning these operations.

### Custom installation steps as migrations

The `name` property is the stable identity of a custom installation step. Manage these steps as migrations:

* Keep each completed step's name stable. Renaming it introduces a new step whose `install` handler can run again.
* To change behavior, add a new script with a new, unique step name. Editing the implementation or script path of a completed step does not rerun it.
* New steps run in their declared order. Reordering completed steps does not make them new migrations.
* Design handlers to tolerate partial execution and repeated calls. A step interrupted before completion, such as by a timeout, can run again.

For example, if version `1.0.0` ran a step named `Configure legacy integration`, version `2.0.0` can retain that declaration and add a new step named `Migrate legacy integration`. The upgrade runs the new step without rerunning the completed one. The new handler should check which resources exist before changing or removing them.

When multiple versions are deployed before an upgrade is started, the plan uses the currently deployed configuration. It does not replay the configuration of each intermediate release. If version `1.1.0` introduces a step named `Migrate database schema` and version `1.2.0` removes it, an app upgraded directly from `1.0.0` to `1.2.0` does not run that step. Keep required migrations declared in subsequent releases so installations that skip versions can still run them. Test upgrades from each supported installed version to the target release.

### Removing custom installation steps

Removing a custom installation step from `app.commerce.config` does not run its `uninstall` handler. The removed script is no longer available to execute, so removing the step does not clean up resources it previously created.

In App Management:

* The upgrade plan shows the removed step with a warning that no script will run, including any previously defined `uninstall` handler, and a link to this documentation.
* The removed step does not appear on the upgrade progress screen because nothing is executed for it.
* After the upgrade, the removed step no longer appears in the app details.

To remove resources created by a previous step, keep that step declared and add a new custom installation step. Give the new step a unique, descriptive name, such as "Remove legacy webhook registrations", and put the cleanup logic in its `install` handler. This handler runs during the upgrade; the `uninstall` handler runs during application uninstallation.

After adding the cleanup script, regenerate the actions with `npx aio-commerce-lib-app generate actions`, update `metadata.version`, and build and deploy the app. See [Writing installation scripts](installation/customize.md#writing-installation-scripts) for the handler syntax.

Keep the original step declared for as long as its `uninstall` handler may be needed. Once the declaration is removed, that handler is unavailable during both upgrades and application uninstallation. Remove it only after verifying that its remaining cleanup responsibilities are no longer needed or are covered by retained scripts.

## Retry a failed upgrade

If an upgrade fails, use **Retry Upgrade** in the App Management UI to try again. This button is available whether the app uses `manual` or `auto` mode. In `auto` mode, deploying the app again also triggers another automatic upgrade attempt.

A failed upgrade can leave some operations applied. Each retry creates a new plan from the current state. Custom installation steps recorded as successful are skipped; failed or interrupted steps can run again. Account for changes a handler made to external resources before it failed when preparing the app for retry.

Before retrying, identify the failed step, inspect its logs, and correct the cause. Make custom handlers idempotent, including cleanup that tolerates resources already being absent. If repeated attempts fail, retain the attempt and activation IDs for troubleshooting.

### Inspect an upgrade run

From the project directory, check the latest upgrade run:

```bash
npx aio-commerce-lib-app upgrade status
```

To inspect a particular run, pass its run ID:

```bash
npx aio-commerce-lib-app upgrade status <run-id>
```

For a failed run with an execution activation ID, the command prints a summary in this format:

```text
App upgrade failed (run <run-id>, execution activation <activation-id>): <error-message>
```

The execution activation ID is included when available. Use it to retrieve Runtime logs. Identify the failed step in those logs or in the installation action's attempt history.

The installation action's `GET /installation?history=true` response provides attempt history, plans, step statuses, and execution activation IDs. Use the `activations.execution` value of the failed attempt to read its Runtime logs:

```bash
aio rt activation logs <execution-activation-id>
```

<InlineAlert variant="info" slots="text"/>

An automatic upgrade continues running after you close the terminal that displays its progress. Check the result with `upgrade status`. For browser-based [installation](installation/customize.md#installation-experience), keep the page open until installation completes.

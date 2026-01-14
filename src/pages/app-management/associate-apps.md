---
title: Associate and configure apps
description: Link App Builder applications to Commerce instances and configure settings
keywords:
  - App Builder
  - Extensibility
edition: beta
---

# Associate and configure apps

<InlineAlert variant="warning" slots="text" />

**Adobe Commerce App Management is for Beta users only and is not yet accessible to all customers.**

Associate an App Builder application with your Commerce instance to enable configuration through the auto-generated Admin UI.

## Prerequisites

| Requirement | Description |
|-------------|-------------|
| Admin access | Commerce Admin with App Management permissions |
| Deployed app | App Builder application deployed to your organization |
| Runtime actions | [Auto-generated](./runtime-actions.md) via `npx @adobe/commerce-lib-config init` |
| Extension point | Registered with `commerce/backend-ui/1` |

## Associate an app

1. Log in to the Commerce Admin.

1. Navigate to **Apps** > **App Management**.

1. Click **Associate App**.

1. Select a **Project** from the list.

1. Select the **Workspace** (Stage or Production).

1. Click **Associate**.

The association process:

* **Syncs scopes**–Imports websites, stores, and store views from Commerce.
* **Creates link**–Associates the app with your Commerce instance.

<InlineAlert variant="warning" slots="text"/>

If scope sync fails, association still completes. Sync manually from Manage Scopes.

## Configure settings

1. Click **Configure** on the associated app.

1. The form displays fields from your [configuration schema](./configuration-schema.md).

1. Modify values as needed.

1. Click **Save**.

### Scope-specific configuration

Override global values at specific scope levels:

1. Click **Change Scope**.

1. Select **Website**, **Store**, or **Store View**.

1. Modify values for this scope.

1. Click **Save**.

## Manage scopes

Access **Manage Scopes** from the app details screen.

| Action | Description |
|--------|-------------|
| **Add root scope** | Add a scope to the app (must exist in Commerce first) |
| **Sync Commerce scopes** | Import scopes from Commerce after adding websites/stores |
| **Import scopes** | Bulk import from JSON file |

## Unassociate an app

1. Navigate to **Apps** > **App Management**.

1. Click **Unassociate** on the app.

1. Confirm the action.

<InlineAlert variant="warning" slots="text"/>

Unassociating removes all configuration values for this instance. This cannot be undone.

## Troubleshooting

**App not appearing**

* Verify app is deployed: `aio app deploy`
* Check [runtime actions](./runtime-actions.md) are generated
* Confirm valid [configuration schema](./configuration-schema.md)
* Verify correct organization in Developer Console

**Scope sync fails**

* Check Commerce instance is accessible
* Verify API credentials
* Try manual sync from Manage Scopes

**Configuration not saving**

* Check for validation errors
* Verify runtime actions are deployed
* Check browser console for errors

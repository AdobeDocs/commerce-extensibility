---
title: Associate and configure apps
description: Link App Builder applications to Commerce instances and configure settings
keywords:
  - App Builder
  - Extensibility
  - App Management
---

# Associate and configure apps

<InlineAlert variant="warning" slots="text" />

**Adobe Commerce App Management is for Beta users only and is not yet accessible to all customers.**

Associate an App Builder application with your Commerce instance to enable configuration through the auto-generated Admin UI.

## Prerequisites

Before associating an app, ensure you have the following:

| Requirement | Description |
|-------------|-------------|
| Admin access | Commerce Admin with App Management permissions |
| Deployed app | App Builder application deployed to your organization with metadata defined |
| IMS Org access | IMS Org permissions, connected to commerce instance |

## Tutorial

Watch this video to learn how to associate an app with a Commerce instance and configure settings.

[Associate and configure apps](https://video.tv.adobe.com/v/3478944)

## Associate an app

To link your App Builder application to a Commerce instance:

1. Log in to the Commerce Admin.

1. Navigate to **Apps** > **App Management**.

1. Click **Associate App**.

1. Select a **Project** from the list.

1. Select the **Workspace**.

1. Click **Associate**.

The association process:

* **Syncs scopes**. Imports websites, stores, and store views from Commerce.
* **Creates link**. Associates the app with your Commerce instance.

<InlineAlert variant="warning" slots="text"/>

If scope sync fails, association still completes. You can always sync the scopes manually later from the **Manage Scopes** view in the configuration of the associated app.

## Configure settings

After associating an app in the App Management view, configure its settings through the auto-generated form:

1. Click **Configure** on the associated app.

1. The form displays fields from your [configuration schema](./configuration-schema.md).

1. Modify values as needed.

1. Click **Save**.

### Scope-specific configuration

Use scope-specific configuration when different websites, stores, or store views require unique settings. For example, you might configure different API endpoints for each region or enable features only for specific store views. Values set at a lower scope override inherited values from higher scopes.

To override global values at a specific scope level:

1. Click **Change Scope**.

1. Select a scope from the list.

1. Modify values for this scope.

1. Click **Save**.

## Manage scopes

Access **Manage Scopes** from the app details screen to manage scope hierarchy for your app.

| Action | Description |
|--------|-------------|
| **Add root scope** | Add a scope to the app only (will not be visible in Commerce). |
| **Sync Commerce scopes** | Import scopes from Commerce after adding websites/stores/store views in Commerce. |
| **Import scopes** | Bulk import from JSON file of scopes only linked to the app. |

## Unassociate an app

Unassociate an app when you no longer need it connected to your Commerce instance, such as when retiring an integration, switching to a different workspace, or cleaning up test configurations.

To remove an app from a Commerce instance:

1. Navigate to **Apps** > **App Management**.

1. Click **Unassociate** on the app.

1. Confirm the action.

<InlineAlert variant="warning" slots="text"/>

Unassociating removes all configuration values for this instance. This cannot be undone.

## Troubleshooting

Use the following solutions to resolve common issues with app association and configuration.

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

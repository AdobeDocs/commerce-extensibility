---
title: Associate and configure apps
description: Learn how to associate App Builder applications with Commerce instances and configure business settings.
keywords:
  - App Builder
  - Extensibility
  - App Management
edition: beta
---

# Associate and configure apps

<InlineAlert variant="warning" slots="text" />

**Adobe Commerce App Management is for Beta users only and is not yet accessible to all customers.**

This page describes how to associate an App Builder application with your Commerce instance and configure its business settings through the App Management UI.

## Prerequisites

Before associating an app, ensure you have:

- Access to the Commerce Admin with App Management permissions
- An App Builder application deployed to your organization
- The application must have [auto-generated runtime actions](./runtime-actions.md) (created by running `npx @adobe/commerce-lib-config init`)
- The application must be registered with the `commerce/backend-ui/1` extension point

## Access App Management

1. Log in to the Commerce Admin.

1. Navigate to **Apps** > **App Management**.

1. The App Management Association screen displays.

If this is your first time accessing App Management, you will see a message indicating no applications are linked to this Commerce instance.

## Associate an app

1. Click **Associate App** to view all applications in your organization that can be linked to this Commerce instance.

1. Select a **Project** from the list. Projects are App Builder projects in your Adobe Developer Console organization.

1. Once a project is selected, all **Workspaces** attached to that project are displayed.

1. Select the workspace you want to associate (for example, `Stage` or `Production`).

1. Click **Associate**.

The association process performs the following actions:

- **Syncs Commerce scopes** - Imports your Commerce instance's websites, stores, and store views into the application.
- **Creates the link** - Associates the application with your Commerce instance.

<InlineAlert variant="warning" slots="text"/>

If syncing Commerce scopes fails, the association still completes, but a warning is displayed. You can manually sync scopes later from the Manage Scopes screen.

Once associated, the app details are displayed along with a **Configure** button.

## Configure app settings

After associating an app, configure its business settings through the auto-generated configuration UI:

1. Click the **Configure** button on the associated app.

1. The configuration screen displays a form that is automatically generated based on the app's [configuration schema](./configuration-schema.md). Each field in the schema is rendered as the appropriate form control (text input, checkbox, dropdown, etc.).

1. By default, the **Global** scope is selected, showing values that apply to all scopes.

1. Modify the configuration values as needed for your business requirements.

1. Click **Save** to persist your changes.

### Configure scope-specific values

Configuration values can be set at different scope levels. More specific scopes override values from parent scopes.

1. Click **Change Scope** in the configuration screen.

1. Select the scope level:
   - **Website** - Select a specific website
   - **Store** - Select a store within the website
   - **Store View** - Select a store view within the store

1. Modify the values for this scope. These values override the global defaults.

1. Click **Save** to persist the scope-specific configuration.

**Example:**

| Scope | Threshold Amount |
|-------|------------------|
| Global | 50 |
| Main Website | (inherits 50) |
| Main Website > Default Store > Default Store View | 200 |

In this example, the Default Store View has a threshold of 200, while all other scopes use the global value of 50.

## Manage scopes

The **Manage Scopes** screen provides controls for managing the scopes available to your application.

### Access Manage Scopes

1. From the App Management screen, click on the associated app.

1. Click **Manage Scopes**.

### Available actions

| Action | Description |
|--------|-------------|
| **Add root scope** | Add a new root scope to the application. This does not create the scope in Commerce; scopes must be created in the Commerce Admin first. |
| **Sync Commerce scopes** | Synchronize all scopes from your Commerce instance to the application. Use this after adding new websites, stores, or store views in Commerce. |
| **Import scopes** | Import scopes from a JSON file for bulk configuration or custom scopes not related to your Commerce instance. |

<InlineAlert variant="info" slots="text"/>

Commerce scopes (websites, stores, store views) must be created in the Commerce Admin. The App Management scope sync imports these scopes into your application for configuration purposes.

### When to sync scopes

Sync Commerce scopes when:

- You add a new website, store, or store view in Commerce
- Scopes appear to be missing in the App Management configuration
- The initial association failed to sync scopes

## Unassociate an app

If you need to use the application with a different Commerce instance:

1. Navigate to the App Management screen.

1. Locate the associated app.

1. Click **Unassociate**.

1. Confirm the action.

This removes the link between the application and the current Commerce instance. You can then associate the app with a different Commerce instance.

<InlineAlert variant="warning" slots="text"/>

Unassociating an app removes all configuration values stored for this Commerce instance. This action cannot be undone.

## Troubleshooting

### App not appearing in the list

If your app doesn't appear when clicking **Associate App**:

- Verify the app is deployed to App Builder (`aio app deploy`)
- Ensure the [runtime actions are generated](./runtime-actions.md) (`npx @adobe/commerce-lib-config init`)
- Check that the app has a valid [configuration schema](./configuration-schema.md)
- Ensure the app is registered with the `commerce/backend-ui/1` extension point
- Verify you're in the correct organization in the Adobe Developer Console

### Scope sync fails

If syncing Commerce scopes fails:

- Check the Commerce instance is accessible
- Verify API credentials are correctly configured
- Try manually syncing from the Manage Scopes screen

### Configuration not saving

If configuration changes don't persist:

- Check for validation errors in the form
- Verify the app's runtime actions are deployed correctly
- Check the browser console for error messages

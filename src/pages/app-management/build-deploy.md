---
title: Build and deploy
description: Build and deploy your App Builder application for App Management
keywords:
  - App Builder
  - Extensibility
  - App Management
---

# Build and deploy

After defining your app configuration, build and deploy your application to make it available in App Management.

## Generated files

The initialization process creates files organized by extension point:

**`commerce/extensibility/1`** for App management.

| File | Description |
|------|-------------|
| `src/commerce-extensibility-1/.generated/app.commerce.manifest.json` | Validated JSON representation of your app config |
| `src/commerce-extensibility-1/.generated/actions/app-management/` | Runtime actions for app config and installation |
| `src/commerce-extensibility-1/ext.config.yaml` | Extension manifest with `pre-app-build` hook |

**`commerce/configuration/1`** for Business configuration (when a `businessConfig` is defined).

| File | Description |
|------|-------------|
| `src/commerce-configuration-1/.generated/configuration-schema.json` | Validated JSON representation of your schema |
| `src/commerce-configuration-1/.generated/actions/business-configuration/` | Runtime actions for config and scope management |
| `src/commerce-configuration-1/ext.config.yaml` | Extension manifest with `pre-app-build` hook |

## Generated runtime actions

The libraries generate runtime actions organized by extension point. These are auto-generated directories and any manual changes can be lost during regeneration.

### App management actions from `commerce/extensibility/1`

| Action | Description |
|--------|-------------|
| `app-config` | Serves the app configuration to the App Management UI. |
| `installation` | Drives the installation flow, including custom installation steps. |

### Business configuration actions from `commerce/configuration/1`

These actions handle configuration and scope operations (generated when a `businessConfig` is defined).

| Action | Description |
|--------|-------------|
| `config` | Handles retrieving and updating configuration values across scopes. |
| `scope-tree` | Handles scope hierarchy management for Commerce and custom scopes. |

The scope tree action supports syncing scopes from Adobe Commerce (requires `commerceBaseUrl`), setting custom scope hierarchies for external systems, and unsyncing Commerce scopes.

## Build and deploy

After you change `app.commerce.config`, build and deploy your application. The `pre-app-build` hook runs the generators for you, so the manifest, schema, and runtime actions under `.generated` stay in sync without a separate step.

```bash
aio app build
aio app deploy
```

**Exception:** If you change [custom installation scripts](./installation/customize.md), run `npx aio-commerce-lib-app generate actions` so the installation action picks up those changes, then build and deploy as usual.

You can still run `npx aio-commerce-lib-app generate …` manually when debugging, but it is not required for normal config edits.

Once deployed, your app appears in App Management and can be associated with a Commerce instance. See [manage your app](https://experienceleague.adobe.com/en/docs/commerce/app-management/manage-app/manage-app) for more information.

## Find an application in the Admin

Under **Apps** > **App Management**, the applications list can include every app deployed for your Adobe IMS organization. When the list is long, App managers use the **filters** above the grid to narrow it. Filter labels and options match the columns and status information shown for each row. Multiple active filters apply together (logical AND); clear or adjust filters when you need to see the full list again.

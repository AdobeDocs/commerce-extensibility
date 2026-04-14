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

Under **Apps** > **App Management**, each application appears as a card. The list can include every app deployed for your Adobe IMS organization. Use the controls above the cards to narrow results:

| Control | Description |
| --- | --- |
| **Filter by app…** | Search by application name (and related text shown on the card). |
| **Status** | Limit cards by lifecycle state. **All Statuses** shows every app; other values include **Associated**, **Installed**, **Partially Installed**, and **Unassociated**. Status on each card matches the colored indicator in the list. |
| **Extensibility patterns** | Limit cards by the capabilities the app uses. **All Extensibility Patterns** shows every app; other values align with the badges on each card, such as **Business Configuration**, **Admin UI SDK**, **Webhooks**, and **Events**. |

Search text and both dropdowns apply together (logical AND). Set **Status** and **Extensibility patterns** back to their **All …** options, and clear the search field, when you want to see the full list again.

### Acquire App

**Acquire App** opens a new browser tab (or a separate browser view) to [Adobe Exchange](https://exchange.adobe.com/experiencecloud), where you can discover Commerce-related marketplace listings and add applications to your Adobe IMS organization. When you return to the Admin, acquired apps can appear in App Management for [association and installation](https://experienceleague.adobe.com/en/docs/commerce/app-management/manage-app/manage-app).

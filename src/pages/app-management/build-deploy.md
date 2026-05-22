---
title: Build and deploy
description: Build and deploy your App Builder application for App Management
keywords:
  - App Builder
  - App Management
  - Configuration
  - Extensibility
---

# Build and deploy

After defining your app configuration, build and deploy your application so it is ready for association and installation with Adobe Commerce through App Management.

## Generated files

The initialization process creates files organized by extension point:

**`commerce/extensibility/1`** for App Management.

| File | Description |
|------|-------------|
| `src/commerce-extensibility-1/.generated/app.commerce.manifest.json` | Validated JSON representation of your app config |
| `src/commerce-extensibility-1/.generated/actions/app-management/` | Runtime actions for app config and installation |
| `src/commerce-extensibility-1/ext.config.yaml` | Extension manifest with `pre-app-build` hook |

**`commerce/configuration/1`** for Business configuration (when a `businessConfig` is defined).

| File | Description |
|------|-------------|
| `src/commerce-configuration-1/.generated/configuration-schema.json` | Validated JSON representation of your schema |
| `src/commerce-configuration-1/.generated/actions/app-management/` | Runtime actions for config and scope management |
| `src/commerce-configuration-1/ext.config.yaml` | Extension manifest with `pre-app-build` hook |

**`commerce/backend-ui/1`** for Admin UI SDK registration (when `adminUiSdk.registration` is defined in `app.commerce.config`).

| File | Description |
|------|-------------|
| `src/commerce-backend-ui-1/.generated/actions/registration/` | Runtime action that serves the Admin UI SDK registration payload to Adobe Commerce |
| `src/commerce-backend-ui-1/ext.config.yaml` | Extension manifest with a `pre-app-build` hook |

## Generated runtime actions

The libraries generate runtime actions organized by extension point. These are auto-generated directories and any manual changes can be lost during regeneration.

### App Management actions from `commerce/extensibility/1`

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

The scope tree action supports syncing scopes from Adobe Commerce, setting custom scope hierarchies for external systems, and unsyncing Commerce scopes. Structural changes in Commerce (websites, stores, store views) are **not** reflected in App Management until an Admin runs **Sync commerce scopes** for each associated application that uses scopes; see [Scope tree synchronization](configuration-schema.md#scope-tree-synchronization).

### Admin UI SDK registration action from `commerce/backend-ui/1`

When `adminUiSdk.registration` is defined, a generated action serves the registration payload to Adobe Commerce.

| Action | Description |
|--------|-------------|
| `registration` | Serves the Admin UI SDK registration object ([Admin UI SDK extension points](https://developer.adobe.com/commerce/extensibility/admin-ui-sdk/extension-points/)). |

## Build and deploy

After you change `app.commerce.config`, build and deploy your application. The `pre-app-build` hook runs the generators for you, so the manifest, schema, and runtime actions under `.generated` stay in sync without a separate step.

```bash
aio app build --force-build
aio app deploy --force-deploy --no-build
```

<InlineAlert variant="tip" slots="text"/>

When debugging, you can run `npx aio-commerce-lib-app generate …` without a full App Builder build to refresh generated files quickly.

After deployment, your application is ready to be associated with Adobe Commerce using App Management. See [manage your app](https://experienceleague.adobe.com/en/docs/commerce/app-management/manage-app/manage-app) for association, installation, and other lifecycle steps.

## Find an application in the Admin

Under **Apps** > **App Management**, each application appears as a card. The list can include every app associated with the Adobe Commerce instance for the selected Adobe IMS organization. Use the controls above the cards to narrow results:

| Control | Description |
| --- | --- |
| **Filter by app…** | Search by application name. |
| **Status** | Limit cards by lifecycle state. **All Statuses** shows every app; other values include **Associated**, **Installed**, **Partially Installed**, and **Unassociated**. The status on each card matches the colored indicator in the list. |
| **Extensibility patterns** | Limit cards by the capabilities the app uses. **All Extensibility Patterns** shows every app; other values align with the badges on each card, such as **Business Configuration**, **Admin UI SDK**, **Webhooks**, and **Events**. |

Search text and both dropdowns apply together (logical AND). To display the full list again, set **Status** and **Extensibility patterns** back to their **All …** options, and clear the search field.

### Acquire App

**Acquire App** opens a new browser tab (or a separate browser view) to [Adobe Exchange](https://exchange.adobe.com/apps/browse/ec), where you can discover Commerce-related marketplace listings and add applications to your Adobe IMS organization. After the app is acquired, approved, and deployed, it appears in App Management for [association and installation](https://experienceleague.adobe.com/en/docs/commerce/app-management/manage-app/manage-app).

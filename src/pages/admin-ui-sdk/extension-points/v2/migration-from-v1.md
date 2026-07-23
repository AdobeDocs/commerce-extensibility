---
title: Migration from V1
description: Learn how version 2 of the Admin UI SDK differs from version 1, and how to migrate your extension.
keywords:
  - App Builder
  - Extensibility
---

# Migration from V1

<InlineAlert variant="tip" slots="text"/>

The `commerce-app-migrate` skill assists with migrating your V1 Admin UI SDK extension to V2. It generates a new V2 extension scaffold, copies your existing code, and updates the configuration to match the new V2 structure. Refer to the skill's [README in the `aio-commerce-sdk` repo](https://github.com/adobe/aio-commerce-sdk/blob/main/plugins/commerce/app-migration/README.md) for details.

If you are porting an extension from the deprecated [V1 extension points](../index.md), note the following structural changes:

* **Notifications are inline, not a separate extension point.** V1 had a standalone `bannerNotification` extension point that referenced mass actions and order view buttons by ID. In V2, the success and error messages are declared directly on the mass action or view button that uses them, as `notifications: { success, error }`. This applies to mass actions and view buttons on orders, customers, and products &mdash; see [Inline notifications](#inline-notifications).
* **`id` replaces `actionId`, `buttonId`, and `title`.** Every registration (menu, mass action, view button) now identifies itself with a single `id` field instead of extension-point-specific ID field names.
* **`type` replaces `displayIframe`.** Mass actions and order view buttons declare `type: 'view'` or `type: 'worker'` instead of a `displayIframe` boolean. See [View vs. worker actions](#view-vs-worker-actions).
* **`sandboxPermissions` replaces `sandbox`.** Sandbox restrictions are now an array of values (for example, `['allow-modals', 'allow-popups']`) instead of a single space-separated string.
* **Grid columns call a runtime action instead of API Mesh.** V1 grid columns fetched data through an API Mesh instance referenced by `data.meshId`. V2 grid columns declare a `runtimeAction`, and Commerce calls it directly. See [Grid columns](#grid-columns-call-your-runtime-action-directly).
* **The `menu` extension point is a single object, not an array.** V1 registered an array of `menuItems` (allowing multiple items and a shared section item). V2 declares one `menu` object per app; the section is generated automatically from the app's display name. `sortOrder` is removed, and `description` is a new required field.
* **Custom fees are not a V2 Admin UI SDK extension point.** In V2, order total modifications are implemented as a webhook on `plugin.magento.out_of_process_totals_collector.api.get_total_modifications.custom_fees`. See [Checkout Totals Collector](../../../starter-kit/checkout/totals-collector-fees.md).
* **A no-framework (vanilla JS) menu variant is not supported.** App Management always scaffolds a `web-src` App Builder frontend for extensions that render UI.

## View vs. worker actions

Mass actions and order view buttons declare a `type` of either `view` or `worker`:

* `view` actions open the `path` you specify inside an iframe backed by your App Builder frontend. This is the equivalent of a V1 action with `displayIframe: true`.
* `worker` actions call the `runtimeAction` you specify directly, with no UI shown. This is the equivalent of a V1 action with `displayIframe: false`.

For `worker` actions, `runtimeAction` identifies the action using the `<package>/<action>` format from your `app.config.yaml` runtime manifest (for example, `mass-actions/massAction`). Commerce resolves this to the full deployed action URL at installation time.

## Inline notifications

Instead of registering a separate `bannerNotification` extension point, declare a `notifications` object directly on a mass action or view button:

```typescript
{
  id: 'order-mass-action-with-redirect',
  label: 'Mass Action With Redirect',
  type: 'view',
  path: '#/mass-action-with-redirect',
  notifications: {
    success: 'Order custom success message',
    error: 'Order custom error message',
  },
}
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `notifications.success` | string | No | The banner message shown when the action completes successfully. |
| `notifications.error` | string | No | The banner message shown when the action fails. |

If `notifications` is omitted, Commerce displays a default success or error banner.

## ACL protection

Any menu item, mass action, view button, or grid column can be gated behind a dedicated Commerce ACL resource by setting `aclProtected: true`:

```typescript
{
  id: 'flag-orders',
  label: 'Flag for review',
  type: 'view',
  path: '#/flag-orders',
  aclProtected: true,
}
```

When `aclProtected` is `true`, Commerce generates a nested ACL resource scoped to your app (app &rarr; entity &rarr; extension-point type &rarr; item) so administrators can grant or restrict access to individual menu items, mass actions, view buttons, or grid columns per admin role. When `aclProtected` is omitted or `false`, the item uses the shared `Magento_CommerceBackendUix::adminuisdk_extensions` resource used by all unprotected V2 extension points.

## Reading context in your app

V2 iframe pages read context through React hooks exported from `@adobe/aio-commerce-lib-admin-ui/web`, instead of the V1 `sharedContext`/`attach()` guest connection pattern:

| Hook | Available in | Returns |
| --- | --- | --- |
| `useIms()` | Any page | The signed-in admin's `imsOrgId` and `imsToken`. |
| `useMassActionContext()` | Mass action `view` pages | `selectedIds`, the array of grid row IDs the mass action was triggered with. |
| `useOrderViewButtonContext()` | Order view button `view` pages | `orderId`, the order the button was rendered for. |
| `useHostConnection()` | Any iframe page | A `close()` function to close the iframe and return to the Commerce Admin grid or view. |

```tsx
import { useHostConnection, useMassActionContext } from '@adobe/aio-commerce-lib-admin-ui/web'

export function MassActionWithRedirect() {
  const { selectedIds } = useMassActionContext()
  const { close } = useHostConnection()
  // ...
}
```

## Grid columns call your runtime action directly

Instead of an API Mesh source, a V2 `gridColumns` registration declares a `runtimeAction`. When a merchant opens the grid, Commerce sends a POST request to your action with the visible row IDs, and renders the values your action returns:

```json
{ "requestId": "...", "gridType": "order", "ids": ["000000001", "000000002"] }
```

See [Order grid columns](order/grid-columns.md), [Product grid columns](product/grid-columns.md), and [Customer grid columns](customer/grid-columns.md) for the full column schema and a sample runtime action.

## customFees support is deprecated

The V2 Admin UI SDK does not support the `customFees` extension point. In V1, this extension point allowed apps to add custom fees to the order totals summary. In V2, order total modifications are implemented as a webhook on `plugin.magento.out_of_process_totals_collector.api.get_total_modifications.custom_fees`. See [Checkout Totals Collector](../../../starter-kit/checkout/totals-collector-fees.md) for details.

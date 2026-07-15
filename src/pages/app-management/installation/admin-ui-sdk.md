---
title: Admin UI SDK configuration
description: Configure the Admin UI SDK menu, grid columns, mass actions, and order view buttons in the app.commerce.config file for App Management
keywords:
  - App Builder
  - Extensibility
  - App Management
  - Admin UI SDK
---

# Admin UI SDK configuration

The `adminUi` field in `app.commerce.config` defines how your app extends the Adobe Commerce Admin UI through the `commerce/backend-ui/2` extension point. It is not compatible with the `commerce/backend-ui/1` extension point used by the previous version of the Admin UI SDK.

At a high level, it is the top-level config block for declaring:

* Menu entries
* Grid columns
* Mass actions
* Order view buttons

`commerce/backend-ui/2` reads the registration directly from the generated `app-config` runtime action, so no dedicated registration action is generated. When `adminUi` is defined, `init` and `generate all` automatically wire up the extension point, including the `pre-app-build` hook and the `workerProcess` declarations in `ext.config.yaml`. View-based features (a menu, a `view` mass action, or a `view` order view button) also get a minimal `web-src/` scaffold the first time they're added, using `.tsx` files for TypeScript configs and `.jsx` files otherwise.

For general Admin UI SDK concepts and extension points outside of App Management, see the [Admin UI SDK](../../admin-ui-sdk/index.md) documentation.

## Add a menu declaration

Declare a single Commerce Admin menu entry for the application:

```js
import { defineConfig } from "@adobe/aio-commerce-lib-app/config"

export default defineConfig({
  metadata: {
    // ...
  },
  adminUi: {
    menu: {
      id: "approval_dashboard",
      label: "Approval Dashboard",
      description: "Review and approve purchase requests from Commerce Admin.",
      parentMenu: "catalog",
      sandboxPermissions: ["allow-popups", "allow-downloads"],
      aclProtected: true,
    },
  },
});
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | App-local menu identifier. Allowed characters: letters, digits, `/`, `:`, `_`. |
| `label` | string | Yes | Menu label rendered in Commerce Admin. |
| `description` | string | Yes | Summary shown in installation and permission-review surfaces. |
| `pageTitle` | string | No | Page title for the menu entry. |
| `parentMenu` | string | No | Existing Commerce menu ID under which the app menu is attached. When omitted, App Management generates a per-app section automatically from `metadata`. |
| `sandboxPermissions` | array | No | iframe sandbox permissions. One or more of `allow-downloads`, `allow-modals`, `allow-popups`. |
| `aclProtected` | boolean | No | When `true`, Commerce generates a per-app ACL resource and adds it to the Adobe Commerce User Roles tree. See [ACL-protected extension points](#acl-protected-extension-points). |

Use the named constants exported by `@adobe/aio-commerce-lib-admin-ui/menu` instead of raw strings for `parentMenu`:

```js
import { MENU_SALES } from "@adobe/aio-commerce-lib-admin-ui/menu";

export default defineConfig({
  adminUi: {
    menu: {
      id: "approval_dashboard",
      label: "Approval Dashboard",
      description: "Review and approve purchase requests.",
      parentMenu: MENU_SALES,
    },
  },
});
```

## Add grid columns

You can add custom columns to order, product, or customer grids. Each grid's columns are fetched by a runtime action you implement; `generate` derives the `workerProcess` entry from `runtimeAction` automatically:

```js
adminUi: {
  order: {
    gridColumns: {
      label: "Order fulfillment data",
      description: "Adds fulfillment status and risk score to the order grid",
      runtimeAction: "orders/fetch-order-grid-data",
      columns: [
        { id: "fulfillment_status", label: "Fulfillment", type: "string", align: "left" },
        { id: "risk_score", label: "Risk", type: "integer", align: "right" },
      ],
    },
  },
  product: {
    gridColumns: {
      label: "Product inventory data",
      description: "Adds inventory status to the product grid",
      runtimeAction: "products/fetch-product-grid-data",
      columns: [
        { id: "inventory_status", label: "Inventory", type: "string", align: "left" },
      ],
    },
  },
  customer: {
    gridColumns: {
      label: "Customer loyalty data",
      description: "Adds loyalty tier to the customer grid",
      runtimeAction: "customers/fetch-customer-grid-data",
      columns: [
        { id: "loyalty_tier", label: "Loyalty Tier", type: "string", align: "left" },
      ],
    },
  },
}
```

### Common grid column properties

The `order`, `product`, and `customer` definitions are all optional. Configure only the grids your application extends.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | string | Yes | Displayed in App Management during installation. |
| `description` | string | Yes | Displayed in App Management during installation. |
| `runtimeAction` | string | Yes | `package/action` path matching a handler you implement. Registered as a `workerProcess` operation automatically. |
| `columns` | array | Yes | At least one column. See [column properties](#column-properties) below. |

### Column properties

The `columns` array contains one or more column definitions. Each column is rendered in the grid with the specified label, type, and alignment. The `id` is used as the response data key in the runtime action.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Stable column identifier; also used as the response data key. |
| `label` | string | Yes | Column header displayed in the grid. |
| `type` | string | Yes | One of `boolean`, `date`, `datetime`, `float`, `integer`, `string`. |
| `align` | string | Yes | One of `left`, `center`, `right`. |
| `aclProtected` | boolean | No | When `true`, Commerce generates a per-app nested ACL resource for this column. See [ACL-protected extension points](#acl-protected-extension-points). |

### Grid column handler

Implement the `runtimeAction` handler with the typed request and response builders from `@adobe/aio-commerce-lib-admin-ui/grid-columns`:

```js
import { okGridResponse, parseGridRequest } from "@adobe/aio-commerce-lib-admin-ui/grid-columns";

export async function main(params) {
  const { gridType, ids } = parseGridRequest(params);

  return okGridResponse({
    "000000001": { fulfillment_status: "shipped", risk_score: 12 },
  });
}
```

The `parseGridRequest` method throws a `CommerceSdkValidationError` error on a malformed request. Use `errorGridResponse(status, message)` to return a non-2xx response. See the [`@adobe/aio-commerce-lib-admin-ui` usage guide](https://github.com/adobe/aio-commerce-sdk/blob/main/packages/aio-commerce-lib-admin-ui/docs/usage.md#grid-column-wire-contract) for the full wire contract.

## Add mass actions

Add mass actions that run against a selection of grid rows. Each entry uses `type` to select how it runs. When the value is `view`, it opens an iframe at `path`; when the value is `worker`, it invokes a `runtimeAction`:

```js
adminUi: {
  order: {
    massActions: [
      {
        type: "view",
        id: "export-orders",
        label: "Export",
        title: "Export orders",
        path: "#/export-orders",
        sandboxPermissions: ["allow-downloads"],
      },
      {
        type: "worker",
        id: "bulk-approve",
        label: "Approve",
        confirm: { message: "Approve the selected orders?" },
        runtimeAction: "orders/bulk-approve",
        timeout: 15,
        notifications: {
          success: "Orders approved.",
          error: "Approval failed. Check the runtime logs.",
        },
      },
    ],
  },
}
```

Mass actions are supported on `order`, `product`, and `customer`. The `id` is authored as a bare name (for example `bulk-approve`); Commerce handles prefixing and collision resolution when rendering the final Admin UI configuration.

### Field applicability by variant

| Field | Common | `view` only | `worker` only |
|-------|:------:|:-----------:|:-------------:|
| `id` | x | | |
| `label` | x | | |
| `title` | x | | |
| `description` | x | | |
| `confirm` | x | | |
| `notifications` | x | | |
| `selectionLimit` | x | | |
| `aclProtected` | x | | |
| `path` | | x | |
| `sandboxPermissions` | | x | |
| `runtimeAction` | | | x |
| `timeout` | | | x |

The `view` and `worker` variants are strict — setting `path` or `sandboxPermissions` on a `worker` action, or `runtimeAction` or `timeout` on a `view` action, fails validation.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Stable action identifier. |
| `label` | string | Yes | Action label rendered in the Admin UI. |
| `title` | string | No | Page title rendered in the iframe (`view`) or confirmation surface (`worker`). |
| `description` | string | No | Summary exposed through `app-config` for installation tooling. |
| `confirm` | object | No | `{ title?, message? }` confirmation dialog shown before the action runs. |
| `notifications` | object | No | `{ success?, error? }` toast strings shown after the action completes. |
| `selectionLimit` | number | No | Caps how many records may be selected at once. |
| `aclProtected` | boolean | No | See [ACL-protected extension points](#acl-protected-extension-points). |
| `path` (`view`) | string | Yes | In-app iframe URL, for example `#/export-orders`. |
| `sandboxPermissions` (`view`) | array | No | One or more of `allow-downloads`, `allow-modals`, `allow-popups`. |
| `runtimeAction` (`worker`) | string | Yes | `package/action` path. Registered as a `workerProcess` operation automatically. |
| `timeout` (`worker`) | number | No | Timeout in seconds. |

### Mass action worker handler

```js
import {
  okMassActionResponse,
  parseMassActionRequest,
} from "@adobe/aio-commerce-lib-admin-ui/mass-actions";

export async function main(params) {
  const { gridType, selectedIds } = parseMassActionRequest(params);

  await approveOrders(selectedIds);
  return okMassActionResponse({ approved: selectedIds.length });
}
```

Use `massActionErrorResponse(status, message)` to report a failure. See the [`@adobe/aio-commerce-lib-admin-ui` usage guide](https://github.com/adobe/aio-commerce-sdk/blob/main/packages/aio-commerce-lib-admin-ui/docs/usage.md#mass-action-worker-contract) for the full wire contract, including the end-to-end ACL example.

## Add order view buttons

Add buttons to the order detail page. As with mass actions, `type` selects `view` (iframe) or `worker` (runtime action):

```js
adminUi: {
  order: {
    viewButtons: [
      {
        type: "view",
        id: "delete-order",
        label: "Delete",
        description: "Permanently removes the order and its associated records.",
        path: "#/delete-order",
        level: 0,
        sortOrder: 80,
        sandboxPermissions: ["allow-modals", "allow-popups"],
        confirm: { message: "Are you sure you want to delete this order?" },
      },
      {
        type: "worker",
        id: "sync-inventory",
        label: "Sync inventory",
        description: "Pushes the latest stock counts for this order's items to the ERP.",
        runtimeAction: "orders/sync-inventory",
        timeout: 15,
        level: 1,
        sortOrder: 10,
        notifications: {
          success: "Inventory synced successfully.",
          error: "Inventory sync failed. Check the runtime logs.",
        },
      },
    ],
  },
}
```

Order view buttons are only available on `order`.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Stable button identifier, served to Commerce as-is. |
| `label` | string | Yes | On-button text rendered in Admin. |
| `description` | string | No | Summary exposed through `app-config` for installation tooling. |
| `level` | number | No | `-1`, `0`, or `1`. |
| `sortOrder` | number | No | Positive number controlling display order. |
| `confirm` | object | No | `{ title?, message? }` confirmation dialog shown before the handler runs. |
| `notifications` | object | No | `{ success?, error? }` toast strings shown after the handler returns. |
| `aclProtected` | boolean | No | See [ACL-protected extension points](#acl-protected-extension-points). |
| `path` (`view`) | string | Yes | In-app iframe URL, for example `#/delete-order`. |
| `sandboxPermissions` (`view`) | array | No | One or more of `allow-downloads`, `allow-modals`, `allow-popups`. |
| `runtimeAction` (`worker`) | string | Yes | `package/action` path. Registered as a `workerProcess` operation automatically. |
| `timeout` (`worker`) | number | No | Timeout in seconds. |

A `view` button opens an iframe at `<extension-host>/index.html<path>?orderId=<orderId>` and signals completion back to Commerce through the UIX host connection (`close()` or `onError()`) — no server-side handler is required. A `worker` button POSTs to your runtime action; parse the request and build the response with `@adobe/aio-commerce-lib-admin-ui/order-view-buttons`:

```js
import {
  okOrderViewButtonResponse,
  parseOrderViewButtonRequest,
} from "@adobe/aio-commerce-lib-admin-ui/order-view-buttons";

export async function main(params) {
  const { id, orderId } = parseOrderViewButtonRequest(params);

  await syncInventory(orderId);
  return okOrderViewButtonResponse();
}
```

Use `orderViewButtonErrorResponse(status, message)` to report a failure. See the [`@adobe/aio-commerce-lib-admin-ui` usage guide](https://github.com/adobe/aio-commerce-sdk/blob/main/packages/aio-commerce-lib-admin-ui/docs/usage.md#order-view-button-wire-contract) for the full wire contract.

## ACL-protected extension points

Set `aclProtected: true` on a menu, grid column, mass action, or order view button to have Commerce generate a per-app ACL resource for that item and add it to the Adobe Commerce User Roles tree. Admins can then grant or deny the resource per role; users without the resource don't see the item and can't invoke it.

Each resource id follows a hierarchical scheme rooted at the app (derived from `metadata.id`), with a leaf id per protected item. Use the id helpers from `@adobe/aio-commerce-lib-admin-ui` instead of hardcoding the generated string:

| Extension point | Helper |
|------------------|--------|
| App root | `getAclResourceId(metadataId)` from `/api` |
| Menu | `getMenuAclResourceId(metadataId, menuId)` from `/menu` |
| Grid column | `getGridColumnAclResourceId(metadataId, entity, columnId)` from `/grid-columns` |
| Mass action | `getMassActionAclResourceId(metadataId, entity, actionId)` from `/mass-actions` |
| Order view button | `getOrderViewButtonAclResourceId(metadataId, buttonId)` from `/order-view-buttons` |

Check the resource from the runtime action handler with `getAdminUiPermissionClient` before serving protected content:

```js
import {
  AdminUiPermissionDeniedError,
  getAdminUiPermissionClient,
} from "@adobe/aio-commerce-lib-admin-ui/api";
import { getMassActionAclResourceId } from "@adobe/aio-commerce-lib-admin-ui/mass-actions";

const permissionClient = getAdminUiPermissionClient({ httpClient, appId: "approval-dashboard-app" });

try {
  await permissionClient.require(
    getMassActionAclResourceId("approval-dashboard-app", "order", "bulk-approve"),
  );
} catch (error) {
  if (error instanceof AdminUiPermissionDeniedError) {
    return massActionErrorResponse(403, "You do not have access to this action");
  }
  throw error;
}
```

See the [Permission Client documentation](https://github.com/adobe/aio-commerce-sdk/blob/main/packages/aio-commerce-lib-admin-ui/docs/usage.md#permission-client) for caching, deduplication, and the full end-to-end example.

After changing `adminUi`, rebuild and deploy your app so the `pre-app-build` hook refreshes generated artifacts. See [Build and deploy](../build-deploy.md) for more information.

## Related documentation

* [Admin UI SDK](../../admin-ui-sdk/index.md) — general Admin UI SDK concepts and extension points.
* [`@adobe/aio-commerce-lib-admin-ui`](https://github.com/adobe/aio-commerce-sdk/tree/main/packages/aio-commerce-lib-admin-ui) — wire contract builders, menu constants, and the permission client used by `commerce/backend-ui/2` handlers.
* [Build and deploy](../build-deploy.md) — generated files and runtime actions for `commerce/backend-ui/2`.

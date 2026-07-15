---
title: order view button
description: Customize the orders page in the Adobe Commerce Admin.
keywords:
  - App Builder
  - Extensibility
---

# order view button

The `order view button` extension point adds a customized button to the order view in the Adobe Commerce Admin. When a merchant opens an order, Commerce renders your buttons alongside the built-in ones.

## Example customization

The following example creates a **Delete** button that confirms before opening an iframe, and a **Create Return** button that opens an iframe with no confirmation.

```typescript
adminUi: {
  order: {
    viewButtons: [
      {
        id: 'order-custom-view-button::delete-order',
        label: 'Delete',
        type: 'view',
        path: '#/delete-order',
        confirm: {
          message: 'Are you sure you want to proceed to delete order?',
        },
        level: 0,
        sortOrder: 80,
        notifications: {
          success: 'Order deleted successfully',
          error: 'Failed to delete order',
        },
      },
      {
        id: 'order-custom-view-button::create-return',
        label: 'Create Return',
        type: 'view',
        path: '#/create-return',
        level: 0,
        sortOrder: 80,
        notifications: {
          success: 'Return request created successfully',
          error: 'Failed to create return request',
        },
      },
    ],
  },
},
```

## How it works

1. A merchant opens an order in the Commerce Admin.
1. Commerce renders the buttons declared in `viewButtons` alongside the built-in ones.
1. For `view` buttons, clicking the button opens the configured `path` inside an iframe; the app reads the order ID via [`useOrderViewButtonContext()`](../index.md#reading-context-in-your-app) and can close the iframe with `useHostConnection()`.
1. For `worker` buttons, Commerce calls the configured `runtimeAction` directly with the order ID. No iframe is shown.
1. If the button declares `notifications`, Commerce shows a success or error banner once the action completes.

```tsx
import { useHostConnection, useOrderViewButtonContext } from '@adobe/aio-commerce-lib-admin-ui/web'

export function CreateReturnPage() {
  const { orderId } = useOrderViewButtonContext()
  const { close } = useHostConnection()
  // render orderId, then call close() when done
}
```

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | A unique ID to identify the button. The recommended format is `<extensionId>::<buttonName>`. |
| `label` | string | Yes | The label of the button. |
| `description` | string | No | A description of the button, used when the button is ACL-protected. |
| `type` | string | Yes | Either `view` (opens `path` in an iframe) or `worker` (calls `runtimeAction` directly, with no UI). |
| `path` | string | Only for `type: 'view'` | The relative path in your App Builder app to open in the iframe. The order ID is made available via `useOrderViewButtonContext()`. |
| `runtimeAction` | string | Only for `type: 'worker'` | The runtime action to call, in `<package>/<action>` format from your `app.config.yaml` runtime manifest. |
| `confirm.title` | string | No | The title of the confirmation dialog. |
| `confirm.message` | string | No | The message displayed on the confirmation dialog. |
| `level` | integer | No | The position of the button in the toolbar. One of `-1` (left), `0` (center), or `1` (right). |
| `sortOrder` | integer | No | The order in which the button is placed within its `level`. |
| `notifications.success` | string | No | The banner message shown when the action completes successfully. |
| `notifications.error` | string | No | The banner message shown when the action fails. |
| `sandboxPermissions` | array of strings | No | Applies additional restrictions to the content within an iFrame. Only relevant when `type` is `view`. Allowed values are `allow-downloads`, `allow-modals`, and `allow-popups`. |
| `timeout` | integer | No | The timeout, in seconds, for the request sent to your runtime action. Only relevant when `type` is `worker`. |
| `aclProtected` | boolean | No | When `true`, gates the button behind a dedicated Commerce ACL resource scoped to your app. See [ACL protection](../index.md#acl-protection). The default value is `false`. |

## Sample code

The Adobe Commerce Extensibility Code Samples repository demonstrates how to customize the [order view button](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/v2/order/custom-view-button).

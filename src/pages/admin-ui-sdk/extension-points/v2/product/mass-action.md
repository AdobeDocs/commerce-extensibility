---
title: mass action
description: Customize the product grid mass action in the Adobe Commerce Admin.
keywords:
  - App Builder
  - Extensibility
---

# product mass action

The `product mass action` extension point customizes product grid mass actions in the Adobe Commerce Admin. When a merchant selects one or more products and picks one of these actions from the mass actions dropdown, Commerce Admin either opens an iframe backed by your App Builder frontend (`view` actions), or calls a backend runtime action directly with no UI (`worker` actions).

## Example customization

The following example creates three mass actions: one that opens an iframe, one that opens an iframe and shows a banner notification, and one that runs headless as a worker action.

```typescript
adminUi: {
  product: {
    massActions: [
      {
        id: 'product-mass-action',
        label: 'Product Mass Action',
        type: 'view',
        path: '#/product-mass-action',
        confirm: {
          title: 'Mass Action',
          message: 'Are you sure you want to proceed with Mass Action on selected products?',
        },
        selectionLimit: 1,
      },
      {
        id: 'product-mass-action-with-redirect',
        label: 'Mass Action With Redirect',
        type: 'view',
        path: '#/product-mass-action-with-redirect',
        notifications: {
          success: 'Product custom success message',
          error: 'Product custom error message',
        },
      },
      {
        id: 'product-mass-action-no-iFrame',
        label: 'Mass Action No iFrame',
        type: 'worker',
        runtimeAction: 'mass-actions/massAction',
      },
    ],
  },
},
```

## How it works

1. A merchant selects one or more products in the product grid and picks a mass action from the dropdown.
1. For `view` actions, Commerce Admin opens the configured `path` inside an iframe backed by your App Builder web app; the app reads the selected IDs via [`useMassActionContext()`](../index.md#reading-context-in-your-app).
1. For `worker` actions, Commerce Admin calls the configured `runtimeAction` directly with the selected IDs. No iframe is shown.
1. If the action declares `notifications`, Commerce Admin shows a success or error banner once the action completes.

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | A unique ID assigned to the action. The recommended format is `<extensionId>::<actionName>`. |
| `label` | string | Yes | The action label to display in the mass actions dropdown. |
| `description` | string | No | A description of the action, used when the action is ACL-protected. |
| `type` | string | Yes | Either `view` (opens `path` in an iframe) or `worker` (calls `runtimeAction` directly, with no UI). |
| `path` | string | Only for `type: 'view'` | The relative path in your App Builder app to open in the iframe. You might need to prepend `#/` to the path. |
| `runtimeAction` | string | Only for `type: 'worker'` | The runtime action to call, in `<package>/<action>` format from your `app.config.yaml` runtime manifest. |
| `confirm.title` | string | No | The title of the dialog that confirms the mass action. |
| `confirm.message` | string | No | The message displayed on the confirmation dialog for the mass action. |
| `selectionLimit` | integer | No | The maximum number of products that can be selected for the mass action. The default value is `-1` (unlimited). |
| `notifications.success` | string | No | The banner message shown when the action completes successfully. |
| `notifications.error` | string | No | The banner message shown when the action fails. |
| `sandboxPermissions` | array of strings | No | Applies additional restrictions to the content within an iFrame. Only relevant when `type` is `view`. Allowed values are `allow-downloads`, `allow-modals`, and `allow-popups`. |
| `timeout` | integer | No | The timeout, in seconds, for the request sent to your runtime action. Only relevant when `type` is `worker`. |
| `aclProtected` | boolean | No | When `true`, gates the action behind a dedicated Commerce ACL resource scoped to your app. See [ACL protection](../index.md#acl-protection). The default value is `false`. |

## Sample code

The Adobe Commerce Extensibility Code Samples repository demonstrates how to customize the [product mass action](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/v2/product/custom-mass-action).

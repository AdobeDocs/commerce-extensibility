---
title: mass action
description: Customize the order grid mass action in the Adobe Commerce Admin.
keywords:
  - App Builder
  - Extensibility
---

# order mass action

The `order mass action` extension point customizes order grid mass actions in the Adobe Commerce Admin.

## Example customization​

The following example creates mass actions labeled `First App Mass Action` and `Another Mass Action`. The `extensionId` value matches the ID specified at [app registration](../../app-registration.md).

The `path` parameter specifies where to redirect an action. The Admin UI SDK provides the selected product IDs in a [`sharedContext`](../../extension-points/index.md#shared-contexts) when a merchant selects a mass action. Your implementation must read the selected items from the `sharedContext`.

```javascript
order: {
    massActions: [
        {
            actionId: `${extensionId}::order-mass-action`,
            label: 'Order Mass Action',
            confirm: {
                title: 'Mass Action',
                message: 'Are you sure your want to proceed with Mass Action on selected orders?'
            },
            path: '#/order-mass-action',
            selectionLimit: 1
        },
        {
            actionId: `${extensionId}::mass-action-with-redirect`,
            label: 'Mass Action With Redirect',
            title: 'Order Mass Action With Redirect',
            path: '#/mass-action-with-redirect'
        }
    ]
}
```

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actionId` | string | Yes | A unique ID assigned to the action. The recommended format is `<extensionId>::<actionName>`. |
| `confirm.message` | string | No | The message displayed on the confirmation dialog for a mass action. |
| `confirm.title` | string | No | The title of a dialog that confirms the mass action. |
| `label` | string | Yes | An Action label to display in the Mass Actions grid. |
| `title` | string | No | An optional page title for the action. If not specified, the label is used.
| `path` | string | Yes | The relative path in the application to redirect to the action. You might need to prepend `#/` to the path to ensure access to the correct page. |
| `orderSelectLimit` | integer | No | Set the maximum number of orders that can be selected for a mass action. By default, the number is unlimited. |
| `displayIframe` | boolean | No | Indicates whether an iFrame will be displayed at the relative path. The default value is `true`. [Mass actions without iFrames](../../api.md#mass-actions-without-iframes) provides additional details. |
| `timeout` | integer | No | Only relevant when `displayIframe` is set to `false`. Timeout by seconds to the request sent to application. Default value is 10 seconds. |
| `sandbox` | string | No | Only relevant when `displayIframe` is set to `true`. The sandbox attribute applies additional restrictions to the content within an iFrame. Allowed values: `allow-downloads`, `allow-popups` and `allow-forms`. Multiple values should be separated by a single space (" "). |

## Sample code

The Adobe Commerce Extensibility Code Samples repository demonstrates how to customize the [order mass action](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/order/custom-mass-action).

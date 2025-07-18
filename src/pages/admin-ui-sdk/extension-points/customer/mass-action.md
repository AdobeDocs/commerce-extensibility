---
title: mass action
description: Customize the customer grid mass action in the Adobe Commerce Admin.
keywords:
  - App Builder
  - Extensibility
---

# customer mass action

The `customer mass action` extension point customizes customer grid mass actions in the Adobe Commerce Admin.

## Example customization​

The following example creates mass actions labeled `First App Mass Action` and `Another Mass Action`. The `extensionId` value matches the ID specified at [app registration](../../app-registration.md).

The `path` parameter specifies where to redirect an action. The Admin UI SDK provides the selected product IDs in a [`sharedContext`](../../extension-points/index.md#shared-contexts) when a merchant selects a mass action. Your implementation must read the selected items from the `sharedContext`.

```javascript
customer: {
    massActions: [
        {
            actionId: `${extensionId}::customer-mass-action`,
            label: 'Customer Mass Action',
            confirm: {
                title: 'Mass Action',
                message: 'Are you sure your want to proceed with Mass Action on selected customers?'
            },
            path: '#/customer-mass-action',
            selectionLimit: 1
        },
        {
            actionId: `${extensionId}::mass-action-with-redirect`,
            label: 'Mass Action With Redirect',
            title: 'Customer Mass Action With Redirect',
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
| `label` | string | Yes | The name of the action to display. |
| `title` | string | No | An optional page title for the action. If not specified, the label is used.
| `path` | string | Yes | The relative path in the application to redirect to the action. You might need to prepend `#/` to the path to ensure access to the correct page. |
| `customerSelectLimit` | integer | No | Set the maximum number of customers that can be selected for a mass action. By default, the number is unlimited. |
| `displayIframe` | boolean | No | Indicates whether an iFrame will be displayed at the relative path. The default value is `true`. [Mass actions without iFrames](../../api.md#mass-actions-without-iframes) provides additional details. |
| `timeout` | integer | No | Only relevant when `displayIframe` is set to `false`. Timeout by seconds to the request sent to application. Default value is 10 seconds. |
| `sandbox` | string | No | Only relevant when `displayIframe` is set to `true`. The sandbox attribute applies additional restrictions to the content within an iFrame. Allowed values are `allow-downloads` and `allow-popups`. Separate multiple values with a single space (" "). |

## Sample code

The Adobe Commerce Extensibility Code Samples repository demonstrates how to customize [customer mass actions](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/customer/custom-mass-action).

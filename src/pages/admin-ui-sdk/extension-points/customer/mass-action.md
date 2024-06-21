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

The `path` parameter specifies where to redirect an action. The Admin UI SDK provides the selected product IDs in a [`sharedContext`](../index.md#shared-contexts) when a merchant selects a mass action. Your implementation must read the selected items from the `sharedContext`.

```javascript
customer: {
    getMassActions() {
        return [
            {
                actionId: `${extensionId}::first-mass-action`,
                label: 'First App Mass Action',
                confirm: {
                    title: 'First App Mass Action',
                    message: 'Are you sure your want to proceed with First App Mass Action on selected customers?'
                },
                path: '#/first-mass-action',
                customerSelectLimit: 1
            },
            {
                actionId: `${extensionId}::another-first-mass-action`,
                label: 'Another Mass Action',
                title: 'Another Customers Mass Action',
                path: '#/another-mass-action'
            },
            {
              actionId: `${extensionId}::mass-action`,
              label: 'Mass Action',
              path: '#/mass-action',
              displayIframe: false
            }
        ]
    }
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
| `displayIframe` | boolean | No | Indicates whether an iFrame will be displayed at the relative path. The default value is `true`. [Mass actions without iFrames](../index.md#mass-actions-without-iframes) provides additional details. |
| `timeout` | integer | No | Only relevant when `displayIframe` is set to `false`. Timeout by seconds to the request sent to application. Default value is 10 seconds. |

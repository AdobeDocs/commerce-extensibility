---
title: product mass action
description: Customize the products pages in the Adobe Commerce Admin.
keywords:
  - App Builder
  - Extensibility
---

# product mass action

The `product mass action` extension point customizes product grid mass actions in the Adobe Commerce Admin.

## Example customization​

The following example creates mass actions labeled `First App Mass Action` and `Another Mass Action`. The `extensionId` value matches the ID specified at [app registration](../../app-registration.md).

The `path` parameter specifies where to redirect an action. The Admin UI SDK provides the selected product IDs in a [`sharedContext`](../../index.md#shared-contexts) when a merchant selects a mass action. Your implementation must read the selected items from the `sharedContext`.

```javascript
product: {
    getMassActions() {
        return [
            {
                actionId: `${extensionId}::first-mass-action`,
                label: 'First App Mass Action',
                confirm: {
                    title: 'First App Mass Action',
                    message: 'Are you sure your want to proceed with First App Mass Action on selected products?'
                },
                path: '#/first-mass-action',
                productSelectLimit: 1
            },
            {
                actionId: `${extensionId}::another-first-mass-action`,
                label: 'Another Mass Action',
                title: 'Another Products Mass Action',
                path: '#/another-mass-action'
            },
            {
              actionId: `${extensionId}::update-mass-action`,
              label: 'Update Mass Action',
              path: 'api/v1/web/SampleExtension/update-products',
              displayIframe: false,
              timeout: 15
            }
        ]
    }
}
```

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actionId` | string | Yes | A unique ID assigned to the action. The recommended format is `<extensionId>::<actionName>` |
| `confirm.message` | string | No | The message displayed on the confirmation dialog for a mass action |
| `confirm.title` | string | No | The title of a dialog that confirms the mass action |
| `label` | string | Yes | An Action label to display in the Mass Actions grid |
| `title` | string | No | An optional page title for the action. If not specified, the label is used. |
| `path` | string | Yes | The relative path in the application to redirect to the action. You might need to prepend `#/` to the path to ensure access to the correct page. |
| `productSelectLimit` | integer | No | Set the maximum number products that can be selected for a mass action. By default, the number is unlimited. |
| `displayIframe` | boolean | No | The relative path will display an iFrame or not. Default value is `true`. Check more info [`here`](../../index.md#mass-action-without-iframe-display) |
| `timeout` | integer | No | Only relevant when `displayIframe` is set to `false`. The number of seconds to wait for a response to a request sent to the application. Default value is 10 seconds. |

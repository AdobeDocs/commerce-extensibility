---
title: order view button
description: Customize the orders page in the Adobe Commerce Admin.
keywords:
  - App Builder
  - Extensibility
---

# order view button

The `order view button` extension point allows you to add a customized button to the order view in the Adobe Commerce Admin.

## Example customization​

```javascript
order: {
    viewButtons: [
        {
            buttonId: `${extensionId}::delete-order`,
            label: 'Delete',
            confirm: {
                message: 'Are you sure your want to proceed to delete order?'
            },
            path: '#/delete-order',
            class: 'custom',
            level: 0,
            sortOrder: 80
        },
        {
            buttonId: `${extensionId}::create-return`,
            label: 'Create Return',
            path: '#/create-return',
            class: 'custom',
            level: 0,
            sortOrder: 80
        }
    ]
}
```

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `buttonId` | string | Yes | A unique ID to identify the button. We recommend using the format `<extensionId>::<buttonName>`. |
| `label` | string | Yes | The label of the button. |
| `confirm.message` | string | No | Confirmation message to display. |
| `path` | string | Yes | The relative path to the button page in the App. The order ID will be sent as part of the query. |
| `level` | integer | No |  The position in which a set of buttons are placed in the toolbar. The possible values are `-1` (left), `0` (center), and `1` (right). |
| `sortOrder` | integer | No | The order in which the button is placed inside the level. |
| `displayIframe` | boolean | No | Indicates whether an iFrame will be displayed at the relative path. The default value is `true`. [Order view button without iFrames](../../api.md#order-view-button-without-iframes) provides additional details. |
| `timeout` | integer | No | Only relevant when `displayIframe` is set to `false`. Timeout by seconds to the request sent to application. Default value is 10 seconds. |
| `sandbox` | string | No | Only relevant when `displayIframe` is set to `true`. The sandbox attribute applies additional restrictions to the content within an iFrame. Allowed values are `allow-downloads` and `allow-popups`. Separate multiple values with a single space (" "). |

## Sample code

The Adobe Commerce Extensibility Code Samples repository demonstrates how to customize the [order view button](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/order/custom-view-button).

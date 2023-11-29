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
    getOrderViewButtons() {
        return [
            {
                buttonId: `${extensionId}::delete-order`,
                label: 'Delete',
                confirm: {
                message: 'Are you sure your want to delete the order?'
                },
                path: '#/delete-order',
                class: 'custom',
                level: 0,
                sortOrder: 80
            },
            {
                buttonId: `${extensionId}::create-return`,
                label: 'Create a return',
                path: '#/create-return',
                class: 'custom',
                level: 0,
                sortOrder: 80
            }
        ]
    }
}
```

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `buttonId` | string | Yes | A unique ID to identify the button. We recommend using the format `<extensionId>::<buttonName>`. |
| `label` | string | No | The label of the button. |
| `confirm.message` | string | No | Confirmation message to display. |
| `path` | string | Yes | The relative path to the button page in the App. The order ID will be sent as part of the query. |
| `level` | integer | Yes |  The position in which a set of buttons are placed in the toolbar. The possible values are `-1`, `0`, and `1`. |
| `sortOrder` | integer | No | The order in which the button is placed inside the level. |

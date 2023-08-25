---
title: product
description: Customize the products in the Adobe Commerce Admin Panel
---

# product

The `product` extension point customizes product features in the Adobe Commerce Admin.
​
You can customize the following product features:

* Product grid mass actions

## Example customization​

The following example creates mass actions labeled `First App Mass Action` and `Another Mass Action`.

```javascript
product: {
    getMassActions() {
        return [
            {
                actionId: `${extensionId}::first-mass-action`,
                label: 'First App Mass Action',
                type: `${extensionId}.first-mass-action`,
                confirm: {
                    title: 'First App Mass Action',
                    message: 'Are you sure your want to proceed with First App Mass Action on selected products?'
                },
                path: 'first-mass-action'
            },
            {
                actionId: `${extensionId}::another-first-mass-action`,
                label: 'Another Mass Action',
                type: `${extensionId}.another-mass-action`,
                path: 'another-mass-action'
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
| `path` | string | Yes | The relative path in the application to redirect to the action. The URL will be appended with a query of selected `productIds` |
| `type` | string | Yes | A unique ID that identifies the type of the action. |

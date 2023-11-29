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

The following example creates mass actions labeled `First App Mass Action` and `Another Mass Action`. The `extensionId` value matches the ID specified at [app registration](../app-registration.md).

The `path` parameter specifies where to redirect an action. The Admin UI SDK provides the selected product IDs in a [`sharedContext`](index.md#shared-contexts) when a merchant selects a mass action. Your implementation must read the selected items from the `sharedContext`.

```javascript
order: {
    getMassActions() {
        return [
            {
                actionId: `${extensionId}::first-mass-action`,
                label: 'First App Mass Action',
                type: `${extensionId}.first-mass-action`,
                confirm: {
                    title: 'First App Mass Action',
                    message: 'Are you sure your want to proceed with First App Mass Action on selected orders?'
                },
                path: '#/first-mass-action',
                orderSelectLimit: 1
            },
            {
                actionId: `${extensionId}::another-first-mass-action`,
                label: 'Another Mass Action',
                type: `${extensionId}.another-mass-action`,
                path: '#/another-mass-action'
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
| `label` | string | Yes | An Action label to display in the Mass Actions grid. |
| `path` | string | Yes | The relative path in the application to redirect to the action. You might need to prepend `#/` to the path to ensure access to the correct page. |
| `orderSelectLimit` | integer | No | Set the maximum number of orders that can be selected for a mass action. By default, the number is unlimited. |
| `type` | string | Yes | A unique ID that identifies the type of action. |

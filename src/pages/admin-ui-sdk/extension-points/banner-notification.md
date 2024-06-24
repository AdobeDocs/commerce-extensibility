---
title: bannerNotification
description: Create a banner notification mass action in the Adobe Commerce Admin.
keywords:
  - App Builder
  - Extensibility
---

# bannerNotification

The `bannerNotification` extension point defines the contents of banner notifications that display when attempting a customer, order, or product mass action.

## Example customization

The following example defines success and error messages for multiple mass actions.

```javascript
bannerNotification: {
    getMassActions() {
      return {
        order: [
          {
            actionId: `${extensionId}::mass-action`,
            successMessage: 'Selected orders were updated successfully',
            errorMessage: 'App could not proceed with mass action on selected orders'
          }
        ],
        product: [
          {
            actionId: `${extensionId}::mass-action`,
            successMessage: 'Selected products were updated successfully',
            errorMessage: 'App could not proceed with mass action on selected products'
          }
        ],
        customer: [
          {
            actionId: `${extensionId}::mass-action`,
            successMessage: 'Selected customers were updated successfully',
            errorMessage: 'App could not proceed with mass action on selected customers'
          }
        ]
      }
    }
}
```

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
`customer.actionId` | Yes | The `actionId` of a customer mass action.
where banner notification will be customized. It should be the same one that is defined in the customer mass action extension point.
`customer.successMessage` | No | The success message to display when mass action is successful. A default message is displayed if this parameter is not defined.
`customer.errorMessage` | No | The error message to display when mass action is successful. A default message is displayed if this parameter is not defined.
`order.actionId` | string | Yes | The `actionId` of an [order mass action](./order/mass-action.md).
`order.successMessage` | No | The success message to display when mass action is successful. A default message is displayed if this parameter is not defined.
`order.errorMessage` | No | The error message to display when mass action is successful. A default message is displayed if this parameter is not defined.
`product.actionId` | Yes | The `actionId` of a [product mass action](./product/mass-action.md).
`product.successMessage` | No | The success message to display when mass action is successful. A default message is displayed if this parameter is not defined.
`product.errorMessage` | No | The error message to display when mass action is successful. A default message is displayed if this parameter is not defined.

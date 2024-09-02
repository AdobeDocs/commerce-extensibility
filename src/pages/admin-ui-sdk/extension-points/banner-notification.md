---
title: bannerNotification
description: Create a banner notification mass action in the Adobe Commerce Admin.
keywords:
  - App Builder
  - Extensibility
---

# bannerNotification

The `bannerNotification` extension point defines the contents of banner notifications that display when customizing a mass action or order view button.

## Mass action customizations

### Example

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

### Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
`customer.actionId` | Yes | The `actionId` of a customer mass action where banner notification will be customized. It should be the same one that is defined in the customer mass action extension point.
`customer.successMessage` | No | The success message to display when mass action is successful. A default message is displayed if this parameter is not defined.
`customer.errorMessage` | No | The error message to display when mass action fails. A default message is displayed if this parameter is not defined.
`order.actionId` | string | Yes | The `actionId` of an [order mass action](./order/mass-action.md).
`order.successMessage` | No | The success message to display when mass action is successful. A default message is displayed if this parameter is not defined.
`order.errorMessage` | No | The error message to display when mass action fails. A default message is displayed if this parameter is not defined.
`product.actionId` | Yes | The `actionId` of a [product mass action](./product/mass-action.md).
`product.successMessage` | No | The success message to display when mass action is successful. A default message is displayed if this parameter is not defined.
`product.errorMessage` | No | The error message to display when mass action fails. A default message is displayed if this parameter is not defined.

### Sample code

The Adobe Commerce Extensibility Code Samples repository demonstrates how to customize [mass action banner notifications](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/banner-notification/custom-mass-actions).

## Order view button customization

### Example

The following example defines success and error messages for a custom order view button.

```javascript
bannerNotification: {
  getOrderViewButtons() {
    return [
      {
        buttonId: 'order-custom-view-button::create-return',
        successMessage: 'Order View Button Success',
        errorMessage: 'Order View Button Error'
      }
    ]
  }
}
```

### Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
`buttonId` | Yes | A `buttonId` defined in an order view button extension point.
`successMessage` | No | The success message to display when the view button notification is successful. A default message is displayed if this parameter is not defined.
`errorMessage` | No | The error message to display when the view button notification fails. A default message is displayed if this parameter is not defined.

### Sample code

The Adobe Commerce Extensibility Code Samples repository demonstrates how to customize [order view button banner notifications](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/banner-notification/custom-order-view-button).

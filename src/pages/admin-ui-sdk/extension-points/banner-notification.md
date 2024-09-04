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
    massActions: {
        order: [
            {
                actionId: `${orderExtensionId}::mass-action-with-redirect`,
                successMessage: 'Order custom success message',
                errorMessage: 'Order custom error message'
            }
        ],
        product: [
            {
                actionId: `${productExtensionId}::mass-action-with-redirect`,
                successMessage: 'Product custom success message',
                errorMessage: 'Product custom error message'
            }
        ],
        customer: [
            {
                actionId: `${customerExtensionId}::mass-action-with-redirect`,
                successMessage: 'Customer custom success message',
                errorMessage: 'Customer custom error message'
            }
        ]
    }
}
```

### Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
`customer.actionId` | string | Yes | The `actionId` of a customer mass action where a banner notification will be customized. It must match an ID that is defined in the customer mass action extension point.
`customer.successMessage` | string | No | The success message to display when a mass action is successful. A default message is displayed if this parameter is not defined.
`customer.errorMessage` | string | No | The error message to display when a mass action fails. A default message is displayed if this parameter is not defined.
`order.actionId` | string | Yes | The `actionId` of an [order mass action](./order/mass-action.md).
`order.successMessage` | string | No | The success message to display when a mass action is successful. A default message is displayed if this parameter is not defined.
`order.errorMessage` | string | No | The error message to display when a mass action fails. A default message is displayed if this parameter is not defined.
`product.actionId` | string | Yes | The `actionId` of a [product mass action](./product/mass-action.md).
`product.successMessage` | string | No | The success message to display when a mass action is successful. A default message is displayed if this parameter is not defined.
`product.errorMessage` | string | No | The error message to display when a mass action fails. A default message is displayed if this parameter is not defined.

### Sample code

The Adobe Commerce Extensibility Code Samples repository demonstrates how to customize [mass action banner notifications](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/banner-notification/custom-mass-actions).

## Order view button customization

### Example

The following example defines success and error messages for a custom order view button.

```javascript
bannerNotification: {
    orderViewButtons: [
        {
            buttonId: `${extensionId}::mass-action-with-redirect`,
            successMessage: 'Custom success message',
            errorMessage: 'Custom error message'
        },
        {
            buttonId: `${extensionId}::create-return`,
            successMessage: 'Custom success message',
            errorMessage: 'Custom error message'
        }
    ]
}
```

### Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
`buttonId` | string | Yes | A `buttonId` defined in an order view button extension point.
`successMessage` | string | No | The success message to display when the view button notification is successful. A default message is displayed if this parameter is not defined.
`errorMessage` | string | No | The error message to display when the view button notification fails. A default message is displayed if this parameter is not defined.

### Sample code

The Adobe Commerce Extensibility Code Samples repository demonstrates how to customize [order view button banner notifications](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/banner-notification/custom-order-view-button).

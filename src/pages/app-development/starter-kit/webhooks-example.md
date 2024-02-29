---
title: Webhooks example
description: Learn how to use webhooks with Adobe Commerce Extensibility Starter Kit to connect to a third-party source.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---

# Webhooks example

This reference implementation demonstrates how to expose an entry point in Adobe Commerce to perform a realtime check of the available stock for items in a third-party backoffice system.

<InlineAlert variant="info" slots="text"/>

If you do not want to implement webhooks, comment out the `webhook` section of the Starter Kit's `app.config.yaml` file before running `aio app deploy`.

The runtime action included is in the Starter Kit package in the following location:

- `actions/webhook/check-stock/index.js`

<InlineAlert variant="info" slots="text"/>

You must implement the stock-checking logic on an external service.

## Configure webhook

This runtime action uses the [Adobe Commerce webhook module](../../webhooks/) to allow intercepting flows in Adobe Commerce.

Follow [configure hooks](https://developer.adobe.com/commerce/extensibility/webhooks/hooks/) to modify your `webhooks.xml` file and define the connection between Adobe Commerce and your backoffice system using the `observer.checkout_cart_product_add_before` method.

```json
{
  "data": {
    "cart_id": "cart id",
    "items": [
      {
        "item_id": 1,
        "sku": "Product SKU",
        "qty": "Cart item qty"
      }
    ]
  }
}
```

<!-- need to add admin configuration -->

## Validation

The following parameters are required:

- `data`
- `data.cart_id`
- `data.items`

Sample validation logic is provided in the following location in the Starter Kit package.

- `webhook\check-stock\validator.js`

You can modify this file to add more validations to the `validateData` method, if necessary.

### Authentication

The example runtime action `webhook\check-stock\index.js` references the `checkAvailableStock()` method in the `webhook\check-stock\stock.js` file. You must add custom business logic to the `params` in the `stock.js` file in order to test authentication with your third-party backoffice system.

You can also add custom responses.

## Modify `.env` parameters

You can access any environment parameters from `params`. Add any required parameters to the `actions/webhook/check-stock/actions.config.yaml` under `check-stock -> inputs`:

```yaml
check-stock:
  function: check-stock/index.js
  web: 'yes'
  runtime: nodejs:16
  inputs:
    LOG_LEVEL: debug
    
    HERE_YOUR_PARAM: $YOUR_CUSTOM_PARAMETER
    
  annotations:
    require-adobe-auth: false
    final: true
```

## Responses

Error response:

```javascript
return {   
  statusCode: 200,
  body: {
    op: 'exception',
    message: 'Error message'
  }
}
```

Success response:

```javascript
return {
  statusCode: 200,
  body: {
    op: 'success'
  }
}
```

<InlineAlert variant="info" slots="text"/>

These responses are defined in `webhook\check-stock\index.js` and are adapted from the [Commerce webhook responses](../../webhooks/responses.md#responses). You can modify the response implementation in your code as needed.

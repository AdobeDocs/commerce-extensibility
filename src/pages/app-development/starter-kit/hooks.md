---
title: Webhooks example
description: Learn how to use webhooks with Adobe Commerce Extensibility Starter Kit.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---

# Webhooks example

The following runtime action demonstrates how to expose an entry point to perform a realtime check of the available stock for Commerce cart items. You must implement the stock-checking logic on an external service.

This runtime response uses the [Adobe Commerce webhook module](https://developer.adobe.com/commerce/extensibility/webhooks/) to allow intercepting flows in Adobe Commerce.

## JSON payload example

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

## Validation

The following parameters are required:

- `data`
- `data.cart_id`
- `data.items`

Sample validation logic is provided in the following location in the Starter Kit package.

- `webhook\check-stock\validator.js`

You can modify this file to add more validations to the `validateData` method, if necessary.

## Check available stock

This runtime example uses the `checkAvailableStock()` method in the `webhook\check-stock\stock.js` file. You must implement this logic to check stock availability for the items received in `params`.

You will receive one of the following responses:

**Items stock available:**

```javascript
return {
  success: false
}
```

**Items stock not available:**

```javascript
return {
  success: false,
  message: '<Your custom error message.>'
}
```

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

These responses are adapted to the [Commerce webhook module](https://developer.adobe.com/commerce/extensibility/webhooks/). You can modify the response implementation in the code as needed.

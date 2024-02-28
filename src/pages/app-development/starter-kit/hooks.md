---
title: Webhooks
description: Learn how to use webhooks with Adobe Commerce Extensibility Starter Kit.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---

# Webhooks

The Adobe Commerce Extensibility Starter Kit supports ingestion webhooks. They provide an alternative method to deliver events for scenarios where the calling system cannot produce a request to interact directly with the event provider. For example, if the client cannot add custom headers to the request.

This runtime action exposes a web entry point to an external back office application for publishing information to IO events. For more information, review our [reference implementation](#webhooks-example) of a webhook that checks available stock.

## Enabling webhooks

To enable webhooks in the Starter Kit, uncomment the `ingestion` section in your `app.config.yaml` file:

```yaml
ingestion:
  license: Apache-2.0
  actions:
    $include: ./actions/ingestion/actions.config.yaml
```

## Customizing your webhook

Data parameters contain the array of [events](../../events/) to publish. Each event must include an entity, `event`, and `value`. The value parameter contains the data to send through the event.

The following entities and their corresponding events are currently available:

- `product`
  - `be-observer.catalog_product_create`
  - `be-observer.catalog_product_update`
  - `be-observer.catalog_product_delete`
- `customer`
  - `be-observer.customer_create`
  - `be-observer.customer_update`
  - `be-observer.customer_delete`
- `customer-group`
  - `be-observer.customer_group_create`
  - `be-observer.customer_group_update`
  - `be-observer.customer_group_delete`
- `order`
  - `be-observer.sales_order_status_update`
  - `be-observer.sales_order_shipment_create`
  - `be-observer.sales_order_shipment_update`
- `stock`
  - `be-observer.catalog_stock_update`

<!-- the `shipment` entity does not appear to have any associated events -->

<InlineAlert variant="tip" slots="text"/>

The list of entities and their corresponding `backoffice` events is available in the Starter Kit's `onboarding/config/events.json` file.

The following JSON payload demonstrates a `product` entity with a `create` event:

```json
{
  "data": {
    "uid": "event_uid_1",
    "event": "be-observer.catalog_product_create",
    "value": {
      "sku": "PRODUCT_SKU",
      "name": "Product SKU",
      "price": 1,
      "description": "Product SKU description"
    }
  }
}
```

### Authentication and parameters

Webhooks are not authenticated by default. To add authentication and enable an authentication check, modify the `actions/ingestion/webhook/auth.js` file's `checkAuthentication` function.

You can access any needed environment parameter from `params`. Use the following parameters to inform your `.env` authentication settings.

You can provide additional `.env` parameters by adding them to the `inputs` section of the `actions/ingestion/webhook/actions.config.yaml` file:

```yaml
webhook:
  function: ./consumer/index.js
  web: 'no'
  runtime: nodejs:16
  inputs:
    LOG_LEVEL: debug
    OAUTH_ORG_ID: $OAUTH_ORG_ID
    OAUTH_CLIENT_ID: $OAUTH_CLIENT_ID
    OAUTH_CLIENT_SECRET: $OAUTH_CLIENT_SECRET
    OAUTH_TECHNICAL_ACCOUNT_ID: $OAUTH_TECHNICAL_ACCOUNT_ID
    OAUTH_TECHNICAL_ACCOUNT_EMAIL: $OAUTH_TECHNICAL_ACCOUNT_EMAIL
    IO_MANAGEMENT_BASE_URL: $IO_MANAGEMENT_BASE_URL
    IO_CONSUMER_ID: $IO_CONSUMER_ID
    IO_PROJECT_ID: $IO_PROJECT_ID
    IO_WORKSPACE_ID: $IO_WORKSPACE_ID
    AIO_runtime_namespace: $AIO_runtime_namespace
    
    HERE_YOUR_PARAM: $HERE_YOUR_PARAM_ENV
    
  annotations:
    require-adobe-auth: false
    final: true
```

## Webhooks example

This reference implementation demonstrates how to expose an entry point to perform a realtime check of the available stock for Adobe Commerce cart items.

The runtime action included is in the Starter Kit package in the following location:

- `actions/webhook/check-stock/index.js`

<InlineAlert variant="info" slots="text"/>

You must implement the stock-checking logic on an external service.

This runtime action uses the [Adobe Commerce webhook module](../../webhooks/) to allow intercepting flows in Adobe Commerce.

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

These responses are adapted from the [Commerce webhook responses](../../webhooks/responses.md#responses). You can modify the response implementation in your code as needed.

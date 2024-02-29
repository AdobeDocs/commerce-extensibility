---
title: Ingest webhooks
description: Learn how to ingest webhooks with Adobe Commerce Extensibility Starter Kit.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---

# Ingest webhooks

The Adobe Commerce Extensibility Starter Kit supports ingestion webhooks. They provide an alternative method to deliver events for scenarios where the calling system cannot produce a request to interact directly with the event provider. For example, if the client cannot add custom headers to the request.

## Enabling ingest webhooks

To enable webhooks in the Starter Kit, uncomment the `ingestion` section in your `app.config.yaml` file:

```yaml
ingestion:
  license: Apache-2.0
  actions:
    $include: ./actions/ingestion/actions.config.yaml
```

## Customizing ingest webhooks

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

## Authentication and parameters

Ingest webhooks are not authenticated by default. To add authentication and enable an authentication check, modify the `actions/ingestion/webhook/auth.js` file's `checkAuthentication` function.

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
    
    YOUR_PARAM: $YOUR_PARAM_ENV
    
  annotations:
    require-adobe-auth: false
    final: true
```

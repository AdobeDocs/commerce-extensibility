---
title: Event-based integrations
description: Learn about webhook ingestion, event handler actions, and event ingestion.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Starter Kit
 - Tools
---

import actions from '/src/_includes/actions.md'

# Event-based integrations

The following sections demonstrate all the event-based integrations that Adobe Commerce integration starter kit has to offer, including webhook ingestion, event handler actions and event ingestion actions.

<actions />

## Ingestion webhook

The Adobe Commerce integration starter kit supports ingestion webhooks. They provide an alternative method to deliver events for scenarios where the calling system cannot produce a request to interact directly with the event provider. For example, if the client cannot add custom headers to the request.

### Enabling ingest webhooks

To enable webhooks in the starter kit, uncomment the `ingestion` section in your `app.config.yaml` file:

```yaml
ingestion:
  license: Apache-2.0
  actions:
    $include: ./actions/ingestion/actions.config.yaml
```

### Customizing ingest webhooks

Data parameters contain the information of the [event](../../events/) to publish. Each event must include an entity, `event`, and `value`. The value parameter contains the data to send through the event.

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

<InlineAlert variant="tip" slots="text"/>

The list of entities and their corresponding `backoffice` events is available in the starter kit's `scripts/onboarding/config/events.json` file.

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

## `consumer` action

The main purpose of this action is to route events to the [`event handler` action](#event-handler-action). Normally, this routing is determined by the name of the event received.

The `consumer` action is subscribed to a set of events. In many cases, all the events originate from the same entity, such as the `product` entity. However, there are examples where a consumer receives events from multiple entities belonging to the same "domain", such as `order` and `shipment`. When the event provider receives an event, this runtime action will be automatically activated.

The response returned by a `consumer` action is expected to be consistent with the response received from the activation of the subsequent `event handler` action. For example, if the `event handler` action returns an `HTTP/400` status, the consumer action is expected to respond with the same status. This ensures that the event processing is appropriately retried based on the event handler action response.

When it receives an event that it does not know how to route, it is expected to return HTTP/400 status. This will prevent the event handling from being retried.

By default, `consumer` actions have the following response:

<CodeBlock slots="heading, code" repeat="2" languages="javascript, javascript" />

### Success

```js
// ./actions/responses.js#successResponse
return {
  statusCode: 200,
  body: {
    type: 'EVENT TYPE',
    response: {
      // Response returned by the event handler action
    }
  }
}
```

### Failure

```js
// ./actions/responses.js#errorResponse
return {
  error: {
    statusCode: 400, // 404, 500, etc,
    body : {
      error: 'YOUR ERROR MESSAGE'
    }
  }
}
```

## `event handler` action

The main purpose of this action is to manage an event that notifies you about a change in one of the integrated systems. Typically, its business logic includes an API call to propagate the changes to the other system being integrated.

The [`consumer` action](#consumer-action) synchronously activates these event handler actions to delegate the handling of an event.

The response returned by an event handler action includes a `statusCode` attribute. This attribute allows the consumer action to propagate the response HTTP status code upstream to properly reflect the event registration information located on the [Debug Tracing](https://developer.adobe.com/events/docs/support/tracing/) tab in the Adobe Developer Console.

By default, `event handler` actions have the following response:

<CodeBlock slots="heading, code" repeat="2" languages="javascript, javascript" />

### Success

```js
// ./actions/responses.js#actionSuccessResponse
return {
  statusCode: 200,
  body: {
    success: true,
    message: 'YOUR SUCCESS MESSAGE'
  }
}
```

### Failure

```js
// ./actions/responses.js#actionErrorResponse
return {
  statusCode: 400, // 404, 500, etc
  body: {
    success: false,
    error: 'YOUR ERROR MESSAGE'
  }
}
```

## event ingestion action

The main purpose of this runtime action is to provide an alternative method to deliver events to the integration, if the 3rd-party, backoffice application cannot fulfill the [Events Publishing API's](https://developer.adobe.com/events/docs/guides/api/eventsingress_api/) requirements.

For more information, see [Ingestion webhooks](#ingestion-webhook).

To get the URL of the webhook, run the following command:

```bash
aio runtime action get ingestion/webhook --url
```

By default, `event ingestion` actions have the following response:

<CodeBlock slots="heading, code" repeat="2" languages="javascript, javascript" />

### Success

```js
// ./actions/responses.js#successResponse
return {
  statusCode: 200,
  body: {
    type: 'EVENT TYPE',
    response: {
      success: true,
      message: 'Event published successfully'
    }
  }
}
```

### Failure

```js
// ./actions/responses.js#errorResponse
return {
  error: {
    statusCode: 400, // 404, 500, etc,
    body : {
      error: 'YOUR ERROR MESSAGE'
    }
  }
}
```

## Sample code

The Adobe Commerce Extensibility Code Samples repository contains samples that illustrate the following concepts:

- [Scheduled ingestion action](https://github.com/adobe/adobe-commerce-samples/tree/main/starter-kit/add-ingestion-scheduler)
- [Customizing an event ingestion webhook](https://github.com/adobe/adobe-commerce-samples/tree/main/starter-kit/customize-ingestion-webhook)

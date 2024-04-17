---
title: consumer action
description: Learn how the consumer actions work in Starter Kit.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---

import BetaNote from '/src/_includes/starter-kit-beta.md'

<BetaNote />

# `consumer` action

The `consumer` and `event handler` actions implement the business logic needed to synchronize data between Commerce and the external systems being integrated.

Additionally, boilerplate code, responses, and samples for event ingestion and synchronous webhook actions are provided.

<InlineAlert variant="info" slots="text"/>

The synchronous webhook responses for each action are configured for the [Commerce webhook module](https://developer.adobe.com/commerce/extensibility/webhooks/). To customize the responses for other implementations, modify the `responses.js` file.

## `consumer` action

The main purpose of this action is to route events to the [`event handler` action](#event-handler-action). Normally, this routing is determined by the name of the event received.

The `consumer` action is subscribed to a set of events. In many cases, all the events originate from the same entity, such as the `product` entity. However, there are examples where a consumer receives events from multiple entities belonging to the same "domain", such as `order` and `shipment`. When the event provider receives an event, this runtime action will be automatically activated.

The response returned by a `consumer` action is expected to be consistent with the response received from the activation of the subsequent `event handler` action. For example, if the `event handler` action returns an `HTTP/400` status, the consumer action is expected to respond with the same status. This ensures that the event processing is appropriately retried based on the event handler action response.

When it receives an event that it does not know how to route, it is expected to return HTTP/400 status. This will prevent the event handling from being retried.

By default, `consumer` actions have the following response:

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

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

---
title: Actions overview
description: Learn about the actions available in Starter Kit.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---

# Actions overview

The Adobe Commerce Extensibility Starter Kit includes boilerplate code and samples for the following types of actions:

* `consumer`
* `event handler`
* `event ingestion`
* `synchronous webhook`

The `consumer` and `event handler` actions implement the business logic needed to synchronize data between Commerce and the external systems being integrated.

Additionally, boilerplate code, responses, and samples for event ingestion and synchronous webhook actions are provided.

<InlineAlert variant="info" slots="text"/>

The responses for each action are configured for the [Commerce webhook module](https://developer.adobe.com/commerce/extensibility/webhooks/). To customize the responses for other implementations, modify the `response.js` file.

## `consumer` action

The main purpose of this action is to route events to the [`event handler` action](#event-handler-action). Normally, this routing is determined by the name of the event received.

The `consumer` action is subscribed to a set of events. In many cases, all the events originate from the same entity, such as the `product` entity. However, there are examples where a consumer receives events from multiple entities belonging to the same "domain", such as `order` and `shipment`. When the event provider receives an event, this runtime action will be automatically activated.

The response returned by a `consumer` action is expected to be consistent with the response received from the activation of the subsequent `event handler` action. For example, if the `event handler` action returns an `HTTP/400` status, the consumer action is expected to respond with the same status.

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

## `event handler` action

The main purpose of this action is to manage an event that notifies you about a change in one of the integrated systems. Typically, its business logic includes an API call to propagate the changes to the other system being integrated.

The [`consumer` action](#consumer-action) synchronously activates these event handler actions to delegate the handling of an event.

The response returned by an event handler action includes a `statusCode` attribute. This attribute allows the consumer action to propagate the response HTTP status code upstream to properly reflect the event registration information located on the [Debug Tracing](https://developer.adobe.com/events/docs/support/tracing/) tab in the Adobe Developer Console.

By default, `event handler` actions have the following response:

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

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

The main purpose of this runtime action is to provide an alternative method to deliver events to the integration, if the 3rd-party, back-office application cannot fulfill the [Events Publishing API's](https://developer.adobe.com/events/docs/guides/api/eventsingress_api/) requirements.

For more information, see [Ingestion webhooks](./ingestion-webhook.md).

To get the URL of the webhook, run the following command:

```bash
aio runtime action get ingestion/webhook --url
```

By default, `event ingestion` actions have the following response:

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

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

## synchronous webhook action

The contents of the `./actions/webhook` directory expose a webhook that can be invoked synchronously from Commerce to affect the behavior of a particular business flow.

The `./actions/webhook/check-stock` folder provides a [reference implementation](./webhooks-example.md) of a synchronous webhook action.

To get the URL of the webhook, run the following command:

```bash
aio runtime action get webhook/check-stock --url
```

By default, `synchronous webhook` actions have the following response:

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

### Success

```js
// ./actions/responses.js#webhookSuccessResponse
return {
  statusCode: 200,
  body: {
    op: 'success'
  }
}
```

### Failure

```js
// ./actions/responses.js#webhookSuccessResponse
return {
  error: {
    statusCode: 200,
    body : {
      op: 'exception'
    }
  }
}
```

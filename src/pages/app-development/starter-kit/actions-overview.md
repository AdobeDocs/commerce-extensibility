---
title: Actions overview
description: 
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---

# Actions overview

The Starter Kit includes boilerplate code and samples for the following types of actions:

* `consumer`
* `event handler`
* `event ingestion`
* `synchronous webhook`

The `consumer` and `event handler` actions implement the business logic needed to synchronize data between Commerce and the external systems being integrated.

Additionally, boilerplate code and samples for event ingestion and synchronous webhook actions are provided.

## `consumer` action

The main purpose of this action is to route events to the `event handler` action. Normally, this routing is determined by the name of the event received.

The `consumer` action is subscribed to a set of events. In many cases, all the events originate from the same entity, such as `product`. However, there are examples where a consumer receives events from multiple entities belonging to the same "domain", such as `order` and `shipment`. When the event provider receives an event, this runtime action will be automatically activated.

The response returned by a `consumer` action is expected to be consistent with the response received from the activation of the subsequent `event handler` action. For example, if the `event handler` action returns an `HTTP/400` status, the consumer action is expected to respond with the same status.

When it receives an event that it does not know how to route, it is expected to return HTTP/400 status. This will prevent the event handling from being retried.

By default, the response of the consumer actions is the following:

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

### Success

```json
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

```json
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

## event handler action

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

### Success

```json
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

```json
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

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

### Success

```json
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

```json
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

The contents of the `./actions/webhook` directory expose a webhook that can be invoked synchronously from Commerce in order to affect the behavior of a particular business flow.

The ./actions/webhook/check-stock folder provides a sample implementation of a synchronous webhook action. Additional details can be found at this README

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

### Success

```json
// ./actions/responses.js#webhookSuccessResponse
return {
  statusCode: 200,
  body: {
    op: 'success'
  }
}
```

### Failure

```json
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

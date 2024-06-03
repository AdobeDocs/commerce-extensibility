---
title: Consume Events
description: Learn how to consume events sent from Adobe Commerce to Adobe I/O Events.
keywords:
  - Events
  - Extensibility
---

Events sent from Commerce to Adobe I/O events can be consumed in a few different ways. The following options for consuming events can be configured when adding events to your App Builder project and creating an event registration:

* [Using the Journaling API](#using-the-journaling-api)
* [Using a Webhook URL](#using-a-webhook-url)
* [Using a Runtime Action](#using-a-runtime-action)
* [Using Amazon EventBridge](#using-amazon-eventbridge)

## Using the Journaling API

When an Adobe I/O event registration is created, the subscribed events will by default be added to an ordered list, referred to as the journal. These events can be consumed using a journaling endpoint URL that is unique to the registration. For more information on reading events from the journal, see the [Introduction to Journaling](https://developer.adobe.com/events/docs/guides/journaling_intro/).

Events can also be consumed from the Journaling API using the [Adobe I/O Events SDK](https://github.com/adobe/aio-lib-events). See [Subscribe to Events Using Journaling](https://developer.adobe.com/events/docs/guides/sdk/sdk_journaling/) for details and sample code.

## Using a Webhook URL

When creating or editing an event registration, a webhook URL can be registered. Doing so will cause subscribed Commerce events sent to Adobe I/O Events to be forwarded to the specified webhook URL. See [Introduction to Adobe I/O Events Webhooks](https://developer.adobe.com/events/docs/guides/) for more details.

## Using a Runtime Action

An [Adobe I/O Runtime Action](https://developer.adobe.com/runtime/docs/guides/overview/entities/#actions) can be set up to receive Commerce events in an Adobe I/O event registration. Actions can be created from JavaScript functions, as described in [Creating Actions](https://developer.adobe.com/runtime/docs/guides/using/creating_actions/). Within an action, business logic can be executed based on the received event payload, API calls can be made back to Adobe Commerce to update data or access additional information, and data can be sent to another system.

See [Runtime Action with a Callback to Commerce](./consume-events-examples/runtime-action-commerce-callback.md) for an example of how a runtime action can consume an event and make an API call back to Commerce to get more information.

## Using Amazon EventBridge

An Adobe I/O event registration can be configured to forward received Commerce events to Amazon EventBridge. See [Adobe I/O Events and Amazon EventBridge Integration](https://developer.adobe.com/events/docs/guides/amazon_eventbridge/) for more details.

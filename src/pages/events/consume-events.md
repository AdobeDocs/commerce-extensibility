---
title: Consume Events
description: Learn how to consume events sent from Adobe Commerce to Adobe I/O Events.
keywords:
  - Events
  - Extensibility
---

Events sent from Adobe Commerce to Adobe I/O events can be consumed in a few different ways. The following options for consuming events can be configured when adding events to your App Builder project and creating an event registration:

* [Using the Journaling API](#using-the-journaling-api)
* [Using a Webhook URL](#using-a-webhook-url)
* [Using a Runtime Action](#using-a-runtime-action)
* [Using Amazon EventBridge](#using-amazon-eventbridge)

## Using the Journaling API

When an Adobe I/O event registration is created, the subscribed events will by default be added to an ordered list, referred to as the journal. These events can be consumed using a journaling endpoint URL that is unique to the registration. For more information on reading events from the journal, see the [Introduction to Journaling](https://developer.adobe.com/events/docs/guides/journaling_intro/).

Events can also be consumed from the Journaling API using the [Adobe I/O Events SDK](https://github.com/adobe/aio-lib-events). See [Subscribe to Events Using Journaling](https://developer.adobe.com/events/docs/guides/sdk/sdk_journaling/) for details and sample code.

## Using a Webhook URL

Consuming an event using a webhook URL is useful for cases that do not require App Builder to handle transformations to the event structure or additional API calls. This method of consuming events allows for easily forwarding events from Adobe Commerce to a 3rd party system via App Builder. Note that the destination system must have an endpoint that can receive webhook requests in order to use this option.

The webhook URL can be registered when creating or editing an event registration. If the registration is being set up through the developer console UI, this option will appear in the final configuration step.

![Webhook registration](../_images/events/register-webhook.png)

See [Introduction to Adobe I/O Events Webhooks](https://developer.adobe.com/events/docs/guides/) for more details.

## Using a Runtime Action

An [Adobe I/O Runtime Action](https://developer.adobe.com/runtime/docs/guides/overview/entities/#actions) can be set up to receive Commerce events in an event registration. Actions can be created from JavaScript functions, as described in [Creating Actions](https://developer.adobe.com/runtime/docs/guides/using/creating_actions/). Within an action, business logic can be executed based on the received event payload, API calls can be made back to Adobe Commerce to update data or access additional information, and data can be sent to another system.

See [Runtime Action with a Callback to Commerce](./consume-events-examples/runtime-action-commerce-callback.md) for an example of how a runtime action can consume an event and make an API call back to Commerce to get more information.

See more examples of end-to-end integrations between Commerce and 3rd party systems like ERPs that use runtime actions in our [Starter Kit](https://developer.adobe.com/commerce/extensibility/starter-kit/send-data/) documentation.

## Using Amazon EventBridge

An Adobe I/O event registration can be configured to forward received Commerce events to Amazon EventBridge. See [Adobe I/O Events and Amazon EventBridge Integration](https://developer.adobe.com/events/docs/guides/amazon_eventbridge/) for more details.

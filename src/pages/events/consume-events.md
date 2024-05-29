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

## Using a Webhook URL

When creating or editing an event registration, a webhook URL can be registered. Doing so will cause subscribed Commerce events sent to Adobe I/O Events to be forwarded to the specified webhook URL. Seeee [Introduction to Adobe I/O Events Webhooks](https://developer.adobe.com/events/docs/guides/) for more details.

## Using a Runtime Action

An [Adobe I/O Runtime Action](https://developer.adobe.com/runtime/docs/guides/overview/entities/#actions) can be set up to receive Commerce events in an Adobe I/O event registration. Actions can be created from JavaScript functions, as described in [Creating Actions](https://developer.adobe.com/runtime/docs/guides/using/creating_actions/). Within an action, business logic can be executed based on the received event payload, API calls can be made back to Adobe Commerce to update data or access additional information, and data can be sent to another system.

Below is a JavaScript code sample that could be used to create a runtime action for consuming `observer.sales_order_save_after` events. 

```js
const { Core } = require('@adobe/aio-sdk')
const { errorResponse } = require('../utils')
const { getCommerceOauthClient } = require('../oauth1a')
const { sendOrderToErpSystem } = require('../erp')
  
async function main (params) {
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })
  
  try {
    event_payload = params.data.value
    if (!event_payload.hasOwnProperty('extension_attributes')) {
      // Fetch extension attributes for order and add to order event payload
      const oauth = getCommerceOauthClient(
        {
          url: params.COMMERCE_BASE_URL,
          consumerKey: params.COMMERCE_CONSUMER_KEY,
          consumerSecret: params.COMMERCE_CONSUMER_SECRET,
          accessToken: params.COMMERCE_ACCESS_TOKEN,
          accessTokenSecret: params.COMMERCE_ACCESS_TOKEN_SECRET
        },
        logger
      )
      const content = await oauth.get('orders/' + event_payload.entity_id)
      event_payload.extension_attributes = content.extension_attributes
    }

    // Send event data to a third-party ERP system
    sendOrderToErpSystem(event_payload)
      
    return {
      statusCode: 200,
      body: event_payload
    }
  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
}
  
exports.main = main
```

The `main` actions first accesses the payload for a received `observer.sales_order_save_after` event:
```js
event_payload = params.data.value
```

The event payload for this event may not contain the saved order's extension attributes. In that case, the extension attributes can be fetched for the specific order using a Commerce API call:
```js
  const oauth = getCommerceOauthClient(
    {
      url: params.COMMERCE_BASE_URL,
      consumerKey: params.COMMERCE_CONSUMER_KEY,
      consumerSecret: params.COMMERCE_CONSUMER_SECRET,
      accessToken: params.COMMERCE_ACCESS_TOKEN,
      accessTokenSecret: params.COMMERCE_ACCESS_TOKEN_SECRET
    },
    logger
  )
  const content = await oauth.get('orders/' + event_payload.entity_id)
```
In this example, functions from the `oauth1a` module, as defined in the [adobe-commerce-samples repo](https://github.com/adobe/adobe-commerce-samples/blob/main/sample-extension/actions/oauth1a.js), are used. 

The `consumerKey`, `consumerSecret`, `accessToken`, and `accessTokenSecret` provided in the input to `getCommerceOauthClient` can be retrieved from Commerce after creating and activating an [Integration](https://experienceleague.adobe.com/en/docs/commerce-admin/systems/integrations) in the Commerce admin. These values can then be configured in an App Builder [.env file](https://developer.adobe.com/app-builder/docs/guides/configuration/#env) and then [passed as inputs to the App Builder action](https://developer.adobe.com/app-builder/docs/guides/configuration/#using-environment-variables-in-runtime-actions) through the action's configuration.

Finally, the order's extension attributes retrieved from Commerce are added to the order event payload, and the payload is sent to a third-party Enterprise Resource Planning (ERP) system using a custom module. This is one example of a use case that can be handled using Runtime Actions.

## Using Amazon EventBridge

An Adobe I/O event registration can be configured to forward received Commerce events to Amazon EventBridge. See [Adobe I/O Events and Amazon EventBridge Integration](https://developer.adobe.com/events/docs/guides/amazon_eventbridge/) for more details.

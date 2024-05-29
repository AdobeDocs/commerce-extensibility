---
title: Runtime Action with a Callback to Commerce
description: Provides details about how a runtime action can consume events and fetch additional details from Commerce.
keywords:
  - Events
  - Extensibility
---

# Runtime Action with a Callback to Commerce

This example provides sample code for a runtime action that can consume a Commerce event and make an API call back to Commerce to obtain more information before sending data to a third-party system.

## Runtime action example code

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

Finally, the order's extension attributes retrieved from Commerce are added to the order event payload, and the payload is sent to a third-party Enterprise Resource Planning (ERP) system using a custom module.

After creating a runtime action using this code, an event registration can be created to subscribe to the `observer.sales_order_save_after` event and the new runtime action can be configured to receive the event notifications.

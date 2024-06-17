---
title: Runtime Action with a Callback to Commerce
description: Provides details about how a runtime action can consume events and fetch additional details from Commerce.
keywords:
  - Events
  - Extensibility
---

# Runtime Action with a Callback to Commerce

This example provides sample code for a runtime action that can consume an Adobe Commerce event and make an API call back to Commerce to obtain more information before sending data to a third-party system.

## Runtime action example code

You could use the following JavaScript code sample to create a runtime action for consuming `observer.sales_order_save_after` events.

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
    await sendOrderToErpSystem(event_payload)
      
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

The `main` action first accesses the payload for a received `observer.sales_order_save_after` event:

```js
event_payload = params.data.value
```

The event payload for this event could not contain the saved order's extension attributes. If needed, you can fetch the extension attributes for the specific order captured by the event using a Commerce API call:

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

This example uses functions from the `oauth1a` module, as defined in the [adobe-commerce-samples repo](https://github.com/adobe/adobe-commerce-samples/blob/main/admin-ui-sdk/menu/custom-menu/actions/oauth1a.js).

You can retrieve the `consumerKey`, `consumerSecret`, `accessToken`, and `accessTokenSecret` provided in the input to the `getCommerceOauthClient` function from Commerce after creating and activating an [Integration](https://experienceleague.adobe.com/en/docs/commerce-admin/systems/integrations) in the Commerce admin. You can configure these values in an App Builder [.env file](https://developer.adobe.com/app-builder/docs/guides/configuration/#env) and then [pass them as inputs to the App Builder action](https://developer.adobe.com/app-builder/docs/guides/configuration/#using-environment-variables-in-runtime-actions) through the action's configuration.

You can now add the order's extension attributes retrieved from Commerce to the order event payload, and send the payload to a third-party Enterprise Resource Planning (ERP) system using a custom module.

After creating a runtime action using this code, you can create an event registration to subscribe to the `observer.sales_order_save_after` event and configure the new runtime action to receive the event notifications.

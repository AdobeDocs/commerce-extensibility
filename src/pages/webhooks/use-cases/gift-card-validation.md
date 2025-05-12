---
title: Gift card Validation
description: Learn how to validate gift card using webhooks in Adobe Commerce.
keywords:
  - Extensibility
---

import ConfigXml from './code-samples/gift-card-validation-xml.md';
import ConfigAdmin from './code-samples/gift-card-validation-admin.md';

# Gift card validation

In this example, Commerce calls a third-party gift card provider to validate the gift card.

## Webhook name

&#8203;<Edition name="paas" /> `plugin.magento.gift_card_account.api.gift_card_account_management.save_by_quote_id`

&#8203;<Edition name="saas" /> `plugin.gift_card_account.api.gift_card_account_management.save_by_quote_id`

## Payloads

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

### Default payload

```json
{
  "cartId": null,
  "giftCardAccountData": {
    "gift_cards": "string[]",
    "gift_cards_amount": "float",
    "base_gift_cards_amount": "float",
    "gift_cards_amount_used": "float",
    "base_gift_cards_amount_used": "float",
    "extension_attributes": []
  }
}
```

### Configured payload

```json
{
  "giftCard": {
    "cartId": null,
    "gift_cards": "string[]"
  }
}
```

## Configuration

<TabsBlock orientation="horizontal" slots="heading, content" theme="light" repeat="2" />

### webhook.xml (PaaS)

<ConfigXml/>

### Admin (SaaS)

<ConfigAdmin/>

## Endpoint code example

```js
const fetch = require('node-fetch')
const { Core } = require('@adobe/aio-sdk')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils')
 
// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })
 
  try {
    // 'info' is the default level if not set
    logger.info('Calling the main action')
 
    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params))
 
    // check for missing request input parameters and headers
    const requiredParams = [/* add required params */]
    const requiredHeaders = ['Authorization']
    const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }
 
    // Place the real validation (calling 3rd party endpoints) here.
    // In this example, we check if any of the gift card codes contain "test".
    // If so, that gift card is considered invalid.

    const response = {statusCode: 200}
    const giftCards = params.giftCard.gift_cards
    for (let i = 0; i < giftCards.length; i++) {
      if (giftCards[i].toLowerCase().includes('test')) {
        response.body = JSON.stringify({
          op: "exception",
          message: `App Builder Webhook Response: The gift card code "${giftCards[i]}" is not valid`
        })
        return response;
      }
    }
 
    response.body = JSON.stringify({
      op: "success"
    })
    return response
  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
}
 
exports.main = main
```

If validation fails, the runtime AppBuilder action returns an exception message. The message is visible to the customer.

```js
response.body = JSON.stringify({
  op: "exception",
  message: `App Builder Webhook Response: The gift card code "${giftCards[i]}" is not valid`
})
```

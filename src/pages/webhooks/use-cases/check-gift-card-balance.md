---
title: Check gift card balance
description: Learn how to check gift card balance with third-party system using webhooks in Adobe Commerce.
keywords:
  - Extensibility
---

import ConfigXml from './code-samples/check-gift-card-balance-xml.md';
import ConfigAdmin from './code-samples/check-gift-card-balance-admin.md';

# Check gift card balance

When a shopper is checking out and enters a gift card code to check its balance, a third-party system is used to get the current balance value.

This use case runs with a webhook of type `after`.

## Webhook name

&#8203;<Edition name="paas" /> plugin.magento.gift_card_account.api.gift_card_account_management.check_gift_card

&#8203;<Edition name="saas" /> plugin.gift_card_account.api.gift_card_account_management.check_gift_card

## Payloads

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

### Default payload

```json
{
    "cartId": "int",
    "giftCardCode": "string",
    "result": "mixed"
}
```

### Configured payload

```json
{
   "giftCardCode": "string"
}
```

## Configuration

<TabsBlock orientation="horizontal" slots="heading, content" theme="light" repeat="2" />

### webhook.xml (PaaS)

<ConfigXml/>

### Admin (SaaS)

<ConfigAdmin/>

## Endpoint code example

The following code example shows how to implement the webhook on your custom endpoint.

```js
const fetch = require('node-fetch')
const { Core } = require('@adobe/aio-sdk')
const { errorResponse, stringParameters, checkMissingRequestInputs } = require('../utils')
 
// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })
 
  try {
    // 'info' is the default level if not set
    logger.info('Calling the main action')
 
    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params))
 
    //check for missing request input parameters and headers
    const requiredParams = [/* add required params */]
    const requiredHeaders = ['Authorization']
    const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }
 
    // Place the real call to the 3rd party endpoint here.
    // Just for demo purposes, the gift card balance is replaced by 500 if the gift card code does not end with '001'

    const response = {statusCode: 200}
    if (!params.giftCardCode.endsWith('001')) {
      response.body = JSON.stringify({
        op: 'replace',
        path: 'result',
        value: 500
      })
    } else {
      response.body = JSON.stringify({
        op: 'success'
      })
    }

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

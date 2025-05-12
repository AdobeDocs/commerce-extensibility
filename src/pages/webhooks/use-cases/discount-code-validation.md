---
title: Discount code validation
description: Learn how to validate discount codes using webhooks in Adobe Commerce.
keywords:
  - Extensibility
---

import ConfigXml from './code-samples/discount-code-validation-xml.md';
import ConfigAdmin from './code-samples/discount-code-validation-admin.md';

# Discount code validation

A merchant uses a third-party extension to create and manage discount codes. When a shopper applies a coupon code to their cart, the coupon code must be validated. The Commerce checkout process can continue if the code is valid. Otherwise, the following error message displays on the Payment Method checkout page:

`The discount code "<code-value>" is not valid`

## Webhook name

&#8203;<Edition name="paas" /> `plugin.magento.quote.api.guest_coupon_management.set`

&#8203;<Edition name="saas" /> `plugin.quote.api.guest_coupon_management.set`

## Payloads

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

### Default payload

```json
{
    "cartId": "string",
    "couponCode": "string"
}
```

### Configured payload

```json
{
    "discountCode": {
        "cartId": "string",
        "couponCode": "string"
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
 
    const discountCode = params.discountCode
 
    // Place the real validation (calling 3rd party endpoints) here.
    // In this example, we check if the coupon code contains the string `test`.
    // If it does, the request is considered invalid.

    const response = {statusCode: 200}
    if (discountCode && discountCode.couponCode.toLowerCase().includes('test')) {
      response.body = JSON.stringify({
        op: "exception",
        message: `App Builder Webhook Response: The discount code "${discountCode.couponCode}" is not valid`
      })
    } else {
      response.body = JSON.stringify({
        op: "success"
      })
    }
 
    // log the response status code
    logger.info(`${response.statusCode}: successful request`)
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

If validation fails, the runtime AppBuilder action returns an exception message.

```js
response.body = JSON.stringify({
  op: "exception",
  message: `App Builder Webhook Response: The discount code "${discountCode.couponCode}" is not valid`
})
```

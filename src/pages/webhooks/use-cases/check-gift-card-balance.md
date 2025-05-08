---
title: Check gift card balance
description: Learn how to check gift card balance with third-party system using webhooks in Adobe Commerce.
keywords:
  - Extensibility
---

# Check gift card balance

When a shopper is checking out and enters a gift card code to check its balance, a third-party system is used to get the current balance value.

**Webhook:**

plugin.magento.gift_card_account.api.gift_card_account_management.check_gift_card

**Default payload:**

This use case will use a webhook with type `after`. Therefore, the default payload structure is:

```json
{
    "cartId": "int",
    "giftCardCode": "string",
    "result": "mixed"
}
```

**webhook.xml configuration:**

```xml
<method name="plugin.magento.gift_card_account.api.gift_card_account_management.check_gift_card" type="after">
    <hooks>
        <batch name="check_gift_card">
            <hook name="get_balance" url="{env:APP_BUILDER_URL}/get-gift-card-balance" timeout="5000" softTimeout="1000">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name="giftCardCode"/>
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

**Configured payload:**

```json
{
   "giftCardCode": "string"
}
```

**Endpoint code example:**

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

---
title: Gift card Validation
description: Learn how to validate gift card using webhooks in Adobe Commerce.
keywords:
  - Extensibility
---

# Gift card validation

In this example, Commerce calls a third-party gift card provider to validate the gift card.

## Webhook name

\<a href="https://experienceleague.adobe.com/en/docs/commerce/user-guides/product-solutions" \>\<div style="background-color: rgb(4, 105, 227); color: white; font-size: 12px; border-radius: 4px; padding: 5px 8px; display: inline-block;" \>PaaS Only\</div\>\</a\> `plugin.magento.gift_card_account.api.gift_card_account_management.save_by_quote_id`

\<a href="https://experienceleague.adobe.com/en/docs/commerce/user-guides/product-solutions" \>\<div style="background-color: rgb(0, 128, 0); color: white; font-size: 12px; border-radius: 4px; padding: 5px 8px; display: inline-block;" \>SaaS Only\</div\>\</a\> `plugin.gift_card_account.api.gift_card_account_management.save_by_quote_id`

## Payloads

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

#### Default payload

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

#### Configured payload

```json
{
  "giftCard": {
    "cartId": null,
    "gift_cards": "string[]"
  }
}
```

## Configuration

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

#### webhook.xml (PaaS)

```xml
<method name="plugin.magento.gift_card_account.api.gift_card_account_management.save_by_quote_id" type="before">
    <hooks>
        <batch name="apply_gift_card">
            <hook name="validate_gift_card" url="{env:APP_BUILDER_URL}/validate-gift-card" method="POST" timeout="5000" softTimeout="1000" required="true" fallbackErrorMessage="The gift card cannot be validated">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name="giftCard.cartId" source="cartId" />
                    <field name="giftCard.gift_cards" source="giftCardAccountData.gift_cards" />
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

#### Admin (SaaS)

```yaml
Hook Settings

Webhook method: plugin.gift_card_account.api.gift_card_account_management.save_by_quote_id
Webhook type: before
Batch name: apply_gift_card
Hook name: validate_gift_card
URL: <Host>/validate-gift-card
Timeout: 5000
Soft timeout: 1000
Fallback Error Message: The gift card cannot be validated
Required: Required
Active: Yes
Method: POST

Developer Console OAuth

Client ID: The client ID for the OAuth credential.
Client Secret: The client secret for the OAuth credential.
Organization ID: The organization ID for the OAuth credential.

Hook Fields

Name: giftCard.cartId
Source: cartId
Active: Yes

Name: giftCard.gift_cards
Source: giftCardAccountData.gift_cards
Active: Yes
```

## Endpoint code example

The following code example shows how to implement the webhook on your custom endpoint.

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

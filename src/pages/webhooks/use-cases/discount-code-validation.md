---
title: Discount code validation
description: Learn how to validate discount codes using webhooks in Adobe Commerce.
keywords:
  - Extensibility
---

# Discount code validation

A merchant uses a third-party extension to create and manage discount codes. When a shopper applies a coupon code to their cart, the coupon code must be validated. The Commerce checkout process can continue if the code is valid. Otherwise, the following error message displays on the Payment Method checkout page:

`The discount code "<code-value>" is not valid`

## Webhook name

\<a href="https://experienceleague.adobe.com/en/docs/commerce/user-guides/product-solutions" \>\<div style="background-color: blue; color: white; padding: 0 4px; width: 80px; display: inline; border-radius: 3px;" \>PaaS Only\</div\>\</a\> `plugin.magento.quote.api.guest_coupon_management.set`

\<a href="https://experienceleague.adobe.com/en/docs/commerce/user-guides/product-solutions" \>\<div style="background-color: green; color: white; padding: 0 4px; width: 80px; display: inline; border-radius: 3px;" \>SaaS Only\</div\>\</a\> `plugin.quote.api.guest_coupon_management.set`

## Payloads

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

#### Default payload

```json
{
    "cartId": "string",
    "couponCode": "string"
}
```

#### Configured payload

```json
{
    "discountCode": {
        "cartId": "string",
        "couponCode": "string"
    }
}
```

## Configuration

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

#### webhook.xml (PaaS)

```xml
<method name="plugin.magento.quote.api.guest_coupon_management.set" type="before">
    <hooks>
        <batch name="add_coupon">
            <hook name="validate_discount_code" url="{env:APP_BUILDER_URL}/validate-discount-code" method="POST" timeout="5000" softTimeout="1000" priority="300" required="true" fallbackErrorMessage="The discount code cannot be validated">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name="discountCode.cartId" source="cartId" />
                    <field name="discountCode.couponCode" source="couponCode" />
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

#### Admin (SaaS)

```yaml
Hook Settings

Webhook method: plugin.quote.api.guest_coupon_management.set
Webhook type: before
Batch name: add_coupon
Hook name: validate_discount_code
Hook priority: 300
URL: {env:APP_BUILDER_URL}/validate-discount-code
Timeout: 5000
Soft timeout: 1000
Fallback Error Message: The discount code cannot be validated
Required: Required
Active: Yes
Method: POST

Developer Console OAuth

Client ID: The client ID for the OAuth credential.
Client Secret: The client secret for the OAuth credential.
Organization ID: The organization ID for the OAuth credential.

Hook Fields

Name: discountCode.cartId
Source: cartId
Active: Yes

Name: discountCode.couponCode 
Source: couponCode
Active: Yes
```

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

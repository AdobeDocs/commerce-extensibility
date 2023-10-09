---
title: Use cases
description: Learn how webhooks can be implemented with Adobe Commerce.
keywords:
  - Extensibility
---

# Webhooks use cases

This topic uses common scenarios to describe how to implement webhooks on Adobe Commerce. Each example provides a webhook configuration fragment as well as the default and configured webhook payload. Some examples also include sample code that define the basic logic of an operation in an App Builder app.

## Discount code validation

A merchant uses a third-party extension to create and manage discount codes. When a shopper applies a coupon code to their cart, the coupon code must be validated. The Commerce checkout process can continue if the code is valid. Otherwise, the following error message displays on the Payment Method checkout page:

```text
App Builder Webhook Response: The discount code "<code-value>" is not valid
```

**Webhook name:**

`plugin.magento.quote.api.guest_coupon_management.set`

**Default payload:**

```json
{
    "cartId": "string",
    "couponCode": "string"
}
```

**webhook.xml configuration:**

```xml
<method name="plugin.magento.quote.api.guest_coupon_management.set" type="before">
    <hooks>
        <batch>
            <hook name="validate_discount_code" url="{env:APP_BUILDER_URL}/validate-discount-code" method="POST" timeout="5000" softTimeout="1000" priority="300" required="true" fallbackErrorMessage="The discount code can not be validated">
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

**Configured payload:**

```json
{
    "discountCode": {
        "cartId": "string",
        "couponCode": "string"
    }
}
```

**Endpoint code example:**

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
 
    //check for missing request input parameters and headers
    const requiredParams = [/* add required params */]
    const requiredHeaders = ['Authorization']
    const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }
 
    const discountCode = params.discountCode
    console.log(discountCode)
 
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

## Gift card validation

In this example, Commerce calls a third-party gift card provider to validate the gift card.

**Webhook:**

plugin.magento.gift_card_account.api.gift_card_account_management.save_by_quote_id

**Default payload:**

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

**webhook.xml configuration:**

```xml
<method name="plugin.magento.gift_card_account.api.gift_card_account_management.save_by_quote_id" type="before">
    <hooks>
        <batch>
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

**Configured payload:**

```json
{
   "giftCard" {
        "cartId": null,
        "gift_cards": "string[]"
    }
}
```

**Endpoint code example:**

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
    // In this example, we check if the postal code is larger than 70000.
    // If it is, the request is considered invalid.

    const response = {statusCode: 200}
    const address = params.address
    if (address.postcode > 70000) {
      response.body = JSON.stringify({
        op: "exception",
        message: `App Builder Webhook Response: The address with postcode  "${address.postcode}" is not valid`,
        type: "Magento\\Framework\\Exception\\InputException"
      })
    } else {
      response.body = JSON.stringify({
        op: "success"
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

If validation fails, the runtime AppBuilder action returns an exception message. The message is visible to the customer.

```js
response.body = JSON.stringify({
    op: "exception",
    message: `App Builder Webhook Response: The gift card code "${giftCards[i]}" is not valid`
})
```

## Add product to cart

When a shopper adds a product to the cart, a third-party inventory management system checks whether the item is in stock. If it is, allow the product to be added. Otherwise, display an error message.

**Webhook:**

`observer.checkout_cart_product_add_before`

**Default Payload:**

The following `observer.checkout_cart_product_add_before` payload was obtained from the code execution in the application. The `extension_attributes` section was deleted for brevity.

```json
{
    "subject": [],
    "eventName": "checkout_cart_product_add_before",
    "data": {
        "info": {
            "uenc": "<value>",
            "product": "23",
            "selected_configurable_option": "",
            "related_product": "",
            "item": "23",
            "form_key": "<value>",
            "qty": "1"
        },
        "product": {
            "store_id": "1",
            "entity_id": "23",
            "attribute_set_id": "4",
            "type_id": "simple",
            "sku": "Product 1",
            "has_options": "0",
            "required_options": "0",
            "created_at": "2023-08-22 14:14:20",
            "updated_at": "2023-08-22 14:54:44",
            "row_id": "23",
            "created_in": "1",
            "updated_in": "2147483647",
            "name": "Product test 22",
            "meta_title": "Product 1",
            "meta_description": "Product 1 ",
            "page_layout": "product-full-width",
            "options_container": "container2",
            "country_of_manufacture": "AM",
            "url_key": "product-1",
            "msrp_display_actual_price_type": "0",
            "gift_message_available": "2",
            "gift_wrapping_available": "2",
            "is_returnable": "2",
            "status": "1",
            "visibility": "4",
            "tax_class_id": "2",
            "price": "123.000000",
            "weight": "12.000000",
            "meta_keyword": "Product 1",
            "options": [],
            "media_gallery": {
                "images": [],
                "values": []
            },
            "extension_attributes": {
                ...
            },
            "tier_price": [],
            "tier_price_changed": 0,
            "quantity_and_stock_status": {
                "is_in_stock": true,
                "qty": 1233
            },
            "category_ids": [
                "4",
                "5",
                "2",
                "3"
            ],
            "is_salable": 1,
            "website_ids": [
                "1"
            ]
        }
    }
}
```

**webhook.xml configuration:**

```xml
<method name="observer.checkout_cart_product_add_before" type="before">
    <hooks>
        <batch>
            <hook name="validate_stock" url="{env:APP_BUILDER_URL}/product-validate-stock" timeout="5000"
softTimeout="100" priority="100" required="true" fallbackErrorMessage="The product stock valdiation failed">
                <headers>
                    <header resolver="Magento\WebhookModule\Model\AddProductToCartResolver" />
                </headers>
                <fields>
                    <field name='product.name' source='data.product.name' />
                    <field name='product.category_ids' source='data.product.category_ids' />
                    <field name='product.sku' source='data.product.sku' />
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

**Configured payload:**

```json
{
   "product" {
        "name": "string",
        "category_ids": "string[]",
        "sku": "string"
    }
}
```

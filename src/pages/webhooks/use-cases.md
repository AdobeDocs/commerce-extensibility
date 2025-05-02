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
        <batch name="add_coupon">
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
        <batch name="apply_gift_card">
            <hook name="validate_gift_card" url="{env:APP_BUILDER_URL}/validate-gift-card" method="POST" timeout="5000" softTimeout="1000" required="true" fallbackErrorMessage="The gift card can not be validated">
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
   "giftCard": {
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

## Customer address validation

When a customer signs in and adds a new address, the address must be validated. Before the new address is saved, Commerce can call a third-party address system to validate the input information. If the address is not valid, an error message is displayed.

**Webhook:**

plugin.magento.customer.api.address_repository.save

**Default payload:**

```json
{
    "address": {
        "id": "int",
        "customer_id": "int",
        "region": {
            "region_code": "string",
            "region": "string",
            "region_id": "int",
            "extension_attributes": "\Magento\Customer\Api\Data\RegionExtensionInterface"
        },
        "region_id": "int",
        "country_id": "string",
        "street": "string[]",
        "company": "string",
        "telephone": "string",
        "fax": "string",
        "postcode": "string",
        "city": "string",
        "firstname": "string",
        "lastname": "string",
        "middlename": "string",
        "prefix": "string",
        "suffix": "string",
        "vat_id": "string",
        "default_shipping": "bool",
        "default_billing": "bool",
        "extension_attributes": []
    }
}
```

**webhook.xml configuration:**

```xml
<method name="plugin.magento.customer.api.address_repository.save" type="before">
        <hooks>
            <batch name="save_address">
                <hook name="validate_address" url="{env:APP_BUILDER_URL}/validate-address"
method="POST" timeout="5000" softTimeout="1000" fallbackErrorMessage="The address can not be validated">
                    <headers>
                        <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                        <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                    </headers>
                    <fields>
                        <field name="address" />
                    </fields>
                </hook>
            </batch>
        </hooks>
    </method>
```

Using this webhook field configuration, the entirety of the address object in the payload will be sent to the configured endpoint.

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
 
    // Place the real validation (calling 3rd party endpoints) here.
    // In this example, we check if the postal code is larger than 70000.
    // If it is, the address is considered invalid.
    
    const response = {statusCode: 200}
    const address = params.address
    if (address.postcode > 70000) {
      response.body = JSON.stringify({
        op: "exception",
        message: `App Builder Webhook Response: The address with postcode "${address.postcode}" is not valid`,
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
    message: `App Builder Webhook Response: The address with postcode "${address.postcode}" is not valid`,
    type: "Magento\\Framework\\Exception\\InputException"
})
```

## Product update validation

When an admin creates or updates a product, a third-party system is used to validate the product attributes. For example, a third-party system can validate the new product name.

**Webhook:**

observer.catalog_product_save_after

**Default payload:**

The following `observer.catalog_product_save_after` payload was obtained from execution of the application code. Some data has been adjusted or deleted for brevity.

```json
{
    "eventName": "catalog_product_save_after",
    "data": {
          "product": {
              "_edit_mode": true,
              "store_id": 0,
              "entity_id": "1",
              "attribute_set_id": "16",
              "type_id": "simple",
              "sku": "Pr-1",
              "name": "Product 1",
              "tax_class_id": "0",
              "description": "<p>Product 1 description</p>",
              "price": "10.00",
              "extension_attributes": {
                  ...
              },
              "quantity_and_stock_status": {
                  ...
              },
              "category_ids": {
                  ...
              },
              "stock_data": {
                  ...
              },
              "media_gallery": {
                  ...
              },
              ...
          },
          "data_object": {
              ...
          }
    }
}
```

**webhook.xml configuration:**

```xml
<method name="observer.catalog_product_save_after" type="before">
    <hooks>
        <batch name="product_update">
            <hook name="validate_name" url="{env:APP_BUILDER_URL}/validate-product-name" method="POST" timeout="5000" softTimeout="1000">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name="product.name" source="data.product.name" />
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

**Configured payload:**

The third-party endpoint receives the following payload, which is based on the configured field:

```json
{
   "product": {
        "name": "Product 1"
    }
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
 
    // Place the real validation (calling 3rd party endpoints) here.
    // In this example, we check if the name contains the word test.
    // If it does, the request is considered invalid.
    const response = {statusCode: 200}
    if (/test/.test(params.product.name.toLowerCase())) {
      response.body = JSON.stringify({
        op: "exception",
        message: "Invalid product name"
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
    message: "Invalid product name"
})
```

## Add product to cart

When a shopper adds a product to the cart, a third-party inventory management system checks whether the item is in stock. If it is, allow the product to be added. Otherwise, display an error message.

**Webhook:**

`observer.checkout_cart_product_add_before`

**Default payload:**

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
softTimeout="100" priority="100" required="true" fallbackErrorMessage="The product stock validation failed">
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
   "product": {
        "name": "string",
        "category_ids": "string[]",
        "sku": "string"
    }
}
```

Similarly, stock validation could be performed when adding a product to a quote using an `observer.sales_quote_add_item` webhook:

**Default payload:**

The following `observer.sales_quote_add_item` payload was obtained from execution of the application code. The majority of the values in the `product` object were deleted for brevity.

```json
{
    "eventName": "sales_quote_add_item",
    "data": {
        "quote_item": {
            "store_id": 1,
            "quote_id": "75",
            "product": {
              "store_id": 1,
              "entity_id": "1",
              "category_ids": ["3", "4"]
              ...
            }, 
            "product_id": "8",
            "product_type": "simple",
            "sku": "Pr-1",
            "name": "Product 1",
            "weight": null,
            "tax_class_id": 2,
            "base_cost": null,
            "is_qty_decimal": false
        }
    }
}
```

**webhook.xml configuration:**

```xml
<method name="observer.sales_quote_add_item" type="before">
    <hooks>
        <batch name="add_item">
            <hook name="validate_stock_quote" url="{env:APP_BUILDER_URL}/validate-stock" method="POST" timeout="5000" softTimeout="1000">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name="product.name" source="data.quote_item.name" />
                    <field name="product.category_ids" source="data.quote_item.product.category_ids">
                    <field name="product.sku" source="data.quote_item.sku" />
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

**Configured payload:**

The third-party endpoint receives the following payload, which is based on the configured list of fields:

```json
{
   "product": {
        "name": "Product 1",
        "category_ids": ["3", "4"],
        "sku": "Pr-1"
    }
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
 
    // Place the real call to a 3rd party endpoint here.
    // In this example, we check if the sku is equal to "Pr-1".
    // If it is, an exception with an out of stock message is thrown.
    
    const response = {statusCode: 200}
    const sku = params.sku
    if (sku === "Pr-1") {
      response.body = JSON.stringify({
        op: "exception",
        message: `App Builder Webhook Response: The product with sku "${sku}" is out of stock.`
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

If the product is out of stock, the runtime AppBuilder action returns an exception message. The message is visible to the customer.

```js
response.body = JSON.stringify({
  op: "exception",
  message: `App Builder Webhook Response: The product with sku "${sku}" is out of stock.`
})
```

## Order validation

As a shopper places an order, a third-party system is used to confirm that the items added to the order can be shipped to the selected address.

**Webhook:**

`plugin.magento.sales.api.order_management.place` or `observer.sales_order_place_before`

**Default Payload:**

Below is an example of the `plugin.magento.sales.api.order_management.place` payload structure obtained from execution of the application code. Some data has been removed for brevity.

```json
{
    "order": {
        "base_currency_code": "USD",
        "base_discount_amount": 0.0,
        "base_grand_total": 110.0,
        "base_discount_tax_compensation_amount": 0.0,
        "base_shipping_amount": 20.0,
        ...
        "items": [
            {
                "sku": "Pr-1",
                "name": "Product 1",
                ...
            },
            {
                "sku": "Pr-2",
                "name": "Product 2",
                ...
            }
        ],
        "status_histories": [
           ...
        ],
        "extension_attributes": [
            ...
        ],
        "addresses": [
            {
                "region_id": "57",
                "postcode": 78768,
                "country_id": "US",
                "address_type": "shipping",
                ...
            },
            {
                "region_id": "57",
                "postcode": 78768,
                "country_id": "US",
                "address_type": "billing",
                ...
            }
        ],
        "shipping_method": "tablerate_bestway", 
        "payment": {
          "method": "checkmo", 
          "additional_data": null,
          ...
        },
        "gift_cards": "[]",
        "gift_cards_amount": 0,
        ...
    }
}
```

The payload for `observer.sales_order_place_before` contains similar data, but the placement of the `order` information within the payload structure differs:

```json
{
    "eventName": "sales_order_place_before",
    "data": {
        "order" {
            ...
        }
    }
}
```

**webhook.xml configuration:**

The XML below configures a webhook for `plugin.magento.sales.api.order_management.place`:

```xml
<method name="plugin.magento.sales.api.order_management.place" type="before">
    <hooks>
        <batch name="order_validation" order="200">
            <hook name="validate_product_shipping_address" url="{env:APP_BUILDER_URL}/validate-order" priority="100">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name="order.items[].sku"/>
                    <field name="order.addresses"/>
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

**Configured payload:**

The third-party endpoint receives the following payload, which is based on the configured fields:

```json
{
   "order": {
        "items": [
            {
                "sku": "Pr-1"
            },
            {
                "sku": "Pr-2"
            }
        ],
        "addresses": [
            {
                "region_id": "57",
                "postcode": 78768,
                "country_id": "US",
                "address_type": "shipping",
                ...
            },
            {
                "region_id": "57",
                "postcode": 78768,
                "country_id": "US",
                "address_type": "billing",
                ...
            }
        ]
    }
}
```

**Endpoint code example:**

```js
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

    // check for missing request input parameters and headers
    const requiredParams = [/* add required params */]
    const requiredHeaders = ['Authorization']
    const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }

    // Place the real call to a 3rd party endpoint here.
    // In this example, we check if the shipping address' postcode is greater than 70000.
    // If it is, an exception with a message about being unable to ship is thrown.

    const response = {statusCode: 200}
    for (let i = 0; i < params.order.addresses.length; i++) {
      let address = params.order.addresses[i]
      if (address.address_type === 'shipping' && address.postcode > 70000) {
        response.body = JSON.stringify({
            op: "exception",
            message: `App Builder Webhook Response: Products can not be shipped to postcode "${address.postcode}"`
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

If the products in the order cannot be shipped to the selected address, the runtime AppBuilder action returns an exception message. The message is visible to the customer.

```js
response.body = JSON.stringify({
    op: "exception",
    message: `App Builder Webhook Response: Products can not be shipped to postcode "${address.postcode}"`
})
```

## Get shipping quote

When a shopper is checking out and edits the shipping address, a third-party system is used to calculate and modify the shipping quote.

**Webhook:**

plugin.magento.quote.api.shipment_estimation.estimate_by_extended_address

**Default payload:**

The following payload was obtained from the code execution in the application using a webhook type of `after`. The data in the `address` section was deleted for brevity.

```json
{
    "result": [
        {
            "carrier_code": "tablerate",
            "method_code": "bestway",
            "carrier_title": "Best Way",
            "method_title": "Table Rate",
            "amount": 20.0,
            "base_amount": 20.0,
            "available": true,
            "error_message": "",
            "price_exl_tax": 20.0,
            "price_incl_tax": 20.0
        }
    ],
    "cart_id": "76",
    "address": {
        ...
    }
}
```

**webhook.xml configuration:**

```xml
<method name="plugin.magento.quote.api.shipment_estimation.estimate_by_extended_address" type="after">
    <hooks>
        <batch name="shipment_estimation">
            <hook name="quote_update" url="{env:APP_BUILDER_URL}/quote" priority="100">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name='result[].amount'/>
                    <field name='result[].base_amount' />
                    <field name='result[].price_excl_tax' />
                    <field name='result[].price_incl_tax' />
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

**Configured payload:**

The third-party endpoint receives the following payload, which is based on the configured list of fields:

```json
{
   "result": [
        {
            "amount": 20.0,
            "base_amount": 20.0,
            "price_excl_tax": 20.0,
            "price_incl_tax": 20.0
        }
   ]
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
  
    // Just for demo purposes, updated shipment quote values are calculated by multiplying by 1.25.
    const response = {statusCode: 200}
    response.body = JSON.stringify([
      {
        op: "replace",
        path: "result/0/amount",
        value: params.result[0].amount * 1.25
      },
      {
        op: "replace",
        path: "result/0/base_amount",
        value: params.result[0].base_amount * 1.25        
      },
      {
       op: "replace",
       path: "result/0/price_excl_tax",
       value: params.result[0].price_excl_tax * 1.25
      },
      {
       op: "replace",
       path: "result/0/price_incl_tax",
       value: params.result[0].price_incl_tax * 1.25        
     }
   ])
 
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

As a result of the list of operations returned by the endpoint, the `amount`, `base_amount`, `price_excl_tax`, and `price_incl_tax` values for the shipment quote will be modified.

## Check gift card balance

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

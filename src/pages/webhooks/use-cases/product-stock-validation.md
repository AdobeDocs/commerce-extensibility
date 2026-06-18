---
title: Product stock validation
description: Learn how to validate product stock when a cart item is saved using webhooks in Adobe Commerce.
keywords:
  - Extensibility
---

import ConfigXml from './code-samples/product-stock-validation-xml.md';
import ConfigAdmin from './code-samples/product-stock-validation-admin.md';

# Product stock validation

When a shopper adds or updates a product in the cart, a third-party inventory management system checks whether the requested quantity is available. If it is, allow the operation to proceed. Otherwise, display an error message.

## Webhook name

`observer.sales_quote_item_save_before`

## Payloads

The following `observer.sales_quote_item_save_before` default payload was obtained from execution of the application code. Some data has been removed for brevity.

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

#### Default payload

```json
{
    "eventName": "sales_quote_item_save_before",
    "subject": [],
    "data": {
        "item": {
            "applied_rule_ids": null,
            "applied_taxes": [],
            ...
            "base_price": 123,
            "base_price_incl_tax": 123,
            "base_row_total": 123,
            ...
            "custom_attributes_serializable": [],
            "discount_amount": 0,
            ...
            "discount_percent": 0,
            "extension_attributes": [],
            "free_shipping": false,
            "is_qty_decimal": false,
            "name": "Product 1",
            "previous_qty": null,
            "price": 123,
            "price_incl_tax": 123,
            "product": {
                "attribute_set_id": "4",
                "attributes": {
                    ...
                },
                "cart_qty": 1,
                "cost": null,
                "created_at": "2026-06-18 20:27:11",
                "customer_group_id": "1",
                "entity_id": "216",
                "extension_attributes": [],
                ...
                "name": "Product 1",
                "price": "123.000000",
                "qty": 1,
                "required_options": "0",
                "salable": true,
                "sku": "Product-1",
                ...
            },
            "product_id": "216",
            "product_type": "simple",
            "qty": 1,
            "qty_to_add": 1,
            "quote_id": "63",
            "row_total": 123,
            "row_total_incl_tax": 123,
            "row_weight": 12,
            "sku": "Product-1",
            ...
        },
        "data_object": {
            ...
        }
    }
}
```

#### Configured payload

```json
{
    "item": {
        "name": "string",
        "sku": "string",
        "qty": "number"
    }
}
```

## Configuration

<TabsBlock orientation="horizontal" slots="heading, content" theme="light" repeat="2" />

#### webhook.xml (PaaS)

<ConfigXml/>

#### Admin (SaaS)

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
 
    // Place the real call to a 3rd party endpoint here.
    // In this example, we check if the sku is equal to "Pr-1".
    // If it is, an exception with an out of stock message is thrown.
    
    const response = {statusCode: 200}
    const sku = params.item.sku
    if (sku === "Pr-1") {
      response.body = JSON.stringify({
        op: "exception",
        type: "Magento\\Framework\\GraphQl\\Exception\\GraphQlInputException",
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

If the product is out of stock, the runtime AppBuilder action returns an exception message. The `type` is set to `GraphQlInputException` so that the error message is surfaced in GraphQL responses. The message is visible to the customer.

```js
response.body = JSON.stringify({
  op: "exception",
  type: "Magento\\Framework\\GraphQl\\Exception\\GraphQlInputException",
  message: `App Builder Webhook Response: The product with sku "${sku}" is out of stock.`
})
```

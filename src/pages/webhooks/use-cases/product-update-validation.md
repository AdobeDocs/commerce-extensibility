---
title: Product validation
description: Learn how to validate product on update using webhooks in Adobe Commerce.
keywords:
  - Extensibility
---

import ConfigXml from './code-samples/product-update-validation-xml.md';
import ConfigAdmin from './code-samples/product-update-validation-admin.md';

# Product update validation

When an admin creates or updates a product, a third-party system is used to validate the product attributes. For example, a third-party system can validate the new product name.

## Webhook name

`observer.catalog_product_save_after`

## Payloads

The following `observer.catalog_product_save_after` payload was obtained from execution of the application code. Some data has been adjusted or deleted for brevity.

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

### Default payload

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

### Configured payload

```json
{
   "product": {
        "name": "Product 1"
    }
}
```

The third-party endpoint receives the following payload, which is based on the configured fields:

```json
{
   "product": {
        "name": "Product 1"
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

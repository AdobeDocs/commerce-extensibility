---
title: Product price update
description: Learn how to update the product price before adding to the cart using webhooks in Adobe Commerce.
keywords:
  - Extensibility
---

# Product price update

When a shopper adds a product to the cart, a third-party system is used to update the product price based on the shopper's information. For example, the price can be updated based on the shopper's location or the product's availability.

**Webhook:**

observer.sales_quote_item_set_product

**Default payload:**

The following `observer.sales_quote_item_set_product` payload was obtained from execution of the application code. Some data has been adjusted or deleted for brevity.

```json
{
  "subject": [],
  "eventName": "sales_quote_item_set_product",
  "data": {
    "product": {
      "store_id": 1,
      "entity_id": "11",
      "attribute_set_id": "4",
      "type_id": "simple",
      "sku": "Simple product 3",
      ...
      "extension_attributes": {
        ...
      },
      ...
    },
    "quote_item": {
      "store_id": 1,
      "quote_id": null,
      "product": {
        "store_id": 1,
        "entity_id": "11",
        "attribute_set_id": "4",
        "type_id": "simple",
        "sku": "Simple product 3",
        "has_options": "0",
        ....
      },
      "product_id": "11",
      "product_type": "simple",
      "sku": "Simple product 3",
      "name": "Simple product 3",
      "weight": "10.000000",
      "tax_class_id": "2",
      "base_cost": null,
      "is_qty_decimal": false
    }
  }
}
```

**webhook.xml configuration:**

```xml
    <method name="observer.sales_quote_item_set_product" type="before">
        <hooks>
            <batch name="product_price_update">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <hook name="sales_quote_item_update_product" url="{env:APP_BUILDER_URL}/validate-product-name" method="POST" timeout="5000" softTimeout="1000">
                    <fields>
                        <field name='product.name' source='data.product.name' />
                        <field name='product.sku' source='data.product.sku' />
                        <field name='product.price' source='data.product.price' />
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
      "name": "Simple product 3",
      "sku": "Simple product 3",
      "price": "10.000000"
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
 
    // Place the real logic (calling 3rd party endpoints) here.
    // In this example price is just reduced by 25%.
      
    const { product: product} = params;
    
    let operations = [];
    operations.push({
      op: 'replace',
      path: 'data/product/price',
      value: parseFloat(product.price) * 0.75
    });
    
    // If no price or other updates is needed the success operation must be returned
    // operations.push({
    //   op: 'success'
    // })  
      
    return {
      statusCode: 200,
      body: JSON.stringify(operations)
    }  
  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
}
 
exports.main = main
```

The product will be added to the cart with the updated price if the webhook returns a replace operation with the new price. The product will be added to the cart with the original price if the webhook returns a success operation.

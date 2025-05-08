---
title: Product stock validation
description: Learn how to validate product stock on adding product to the cart using webhooks in Adobe Commerce.
keywords:
  - Extensibility
---

# Product stock validation

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
        <batch name="validate_stock">
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

---
title: Generate content for products
description: Learn how to generate product data on update using webhooks in Adobe Commerce.
keywords:
  - Extensibility
---

# Generate content for products

When an admin creates or updates a product, a third-party system is used to generate product description and metadata. For example, the AI system can generate product description based on the product name and other attributes.

**Webhook:**

observer.catalog_product_save_after

**Default payload:**

The following `observer.catalog_product_save_after` payload was obtained from execution of the application code. Some data has been adjusted or deleted for brevity.

```json
{
    "eventName": "catalog_product_save_after",
    "data": {
          "product": {
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

The following `webhook.xml` configuration contains rules to call the third-party endpoint only if the product full and short description are empty. It helps to avoid unnecessary calls to the third-party system if the required data is already present.

```xml
<method name="observer.catalog_product_save_before" type="before">
   <hooks>
       <batch name="product_generate_content">
           <hook name="product_generate_content" url="{env:APP_BUILDER_URL}/product-description" timeout="50000" softTimeout="1000" priority="300" required="true" fallbackErrorMessage="The product could not be updated">
               <headers>
                   <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                   <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
               </headers>
               <fields>
                   <field name="product.name" source="data.product.name" />
                   <field name="product.sku" source="data.product.sku" />
               </fields>
               <rules>
                   <rule field="product.short_description" operator="isEmpty" />
                   <rule field="product.description" operator="isEmpty" />
               </rules>
           </hook>
       </batch>
   </hooks>
</method>
```

**Configured payload:**

The third-party endpoint receives the following payload, which is based on the configured fields:

```json
{
   "product": {
        "name": "Product 1",
        "sku": "Pr-1"
    }
}
```

**Endpoint code example:**

```js
const axios = require('axios');
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

    const { product: product} = params;
    // Here we are making a request to the AI system to generate description for the provided product
    const apiUrl = `${params.AI_API_URL}`;
    const headers = {
      'Authorization': `Bearer ${params.AI_API_KEY}`,
      'Content-Type': 'application/json',
    };
    
    const data = {
      prompt: 'generate a description for product ' + product.name,
      temperature: 0.7,
      max_tokens: 1000,
    };
    
    const result = await axios.post(apiUrl, data, { headers: headers });
    // Handle the response data here
    console.log('Data:', result.data);
    // Fetch the description from the response
    const description = result.data.choices[0].text.trim();

    // Creates operations to update the product description and short description
    let operations = [];
    operations.push({
      op: "replace",
      path: "data/product/short_description",
      value: description.slice(0, 100)
    });
    operations.push({
      op: "replace",
      path: "data/product/description",
      value: `<div data-content-type="row">${description}/div>`
    });

    // If no updates is needed the success operation must be returned
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

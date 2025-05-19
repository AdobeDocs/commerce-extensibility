---
title: Customer address modification
description: Learn how to update customer address using webhooks in Adobe Commerce.
keywords:
  - Extensibility
---

import ConfigXml from './code-samples/customer-address-mod-xml.md';
import ConfigAdmin from './code-samples/customer-address-mod-admin.md';

# Customer address modification

When a customer signs in and adds a new address, the address must be converted to the proper format. Before the new address is saved, Commerce can call a third-party address system to validate and update the input information. If the address is not in the correct format it's updated and saved.

## Webhook name

&#8203;<Edition name="paas" /> `plugin.magento.customer.api.address_repository.save`

&#8203;<Edition name="saas" /> `plugin.customer.api.address_repository.save`

## Payloads

In this example, the default payload is the same as the target payload.

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

## Configuration

The entirety of the `address` object in the payload will be sent to the configured endpoint.

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

    // Place the real validation (calling 3rd party endpoints) here.
    // In this example, we check if the postal code is missing 4 digit code and add it to the provided postcode.

    const address = params.address
    let operations = [];
    if (address.postcode.length === 5) {
        // Creates operations to update the address postcode
        // In the same way other address fields can be updated
        const plusFour = '4023'
        operations.push({
            op: "replace",
            path: "address/postcode",
            value: address.postcode + '-' + plusFour
        });
    } else {
        // If no updates is needed the success operation must be returned
        operations.push({
          op: 'success'
        })  
    }
    
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

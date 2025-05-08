---
title: Customer address modification
description: Learn how to update customer address using webhooks in Adobe Commerce.
keywords:
  - Extensibility
---

# Customer address modification

When a customer signs in and adds a new address, the address must be converted to the proper format. Before the new address is saved, Commerce can call a third-party address system to validate and update the input information. If the address is not in the correct format it's updated and saved.

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
        <batch name="update_address">
            <hook name="update_address" url="{env:APP_BUILDER_URL}/update-address"
method="POST" timeout="5000" softTimeout="1000" fallbackErrorMessage="The address can not be updated">
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

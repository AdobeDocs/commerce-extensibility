---
title: Customer address validation
description: Learn how to validate customer address using webhooks in Adobe Commerce.
keywords:
  - Extensibility
---

# Customer address validation

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

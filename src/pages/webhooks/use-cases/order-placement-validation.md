---
title: Order placement validation
description: Learn how to validate order before placement using webhooks in Adobe Commerce.
keywords:
  - Extensibility
---

# Order placement validation

As a shopper places an order, a third-party system is used to confirm that the items added to the order can be shipped to the selected address.

## Webhook name

&#8203;<Edition name="paas" /> `plugin.magento.sales.api.order_management.place`

&#8203;<Edition name="saas" /> `plugin.sales.api.order_management.place`

<InlineAlert variant="info" slots="text" />

You can create a similar webhook with `observer.sales_order_place_before` (PaaS) or `observer.sales_order_place_before` (SaaS). It contains similar data described in this use case, but the placement of the `order` information within the payload structure differs.

## Payloads

In the following example default payload, some data has been removed for brevity.

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

#### Default payload

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

#### Configured payload

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

## Configuration

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

#### webhook.xml (PaaS)

```xml
<method name="plugin.magento.sales.api.order_management.place" type="before">
    <hooks>
        <batch name="order_validation" order="200">
            <hook name="validate_product_shipping_address" url="{env:APP_BUILDER_URL}/validate-order" priority="100" fallbackErrorMessage="Could not validate the shipping address" timeout="5000" softTimeout="1000" required="true" active="true" method="POST">
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

#### Admin (SaaS)

```yaml
Hook Settings

Webhook method: plugin.sales.api.order_management.place
Webhook type: before
Batch name: order_validation
Batch order: 200
Hook name: validate_product_shipping_address
Hook priority: 100
URL: <Host>/validate-order
Timeout: 5000
Soft timeout: 1000
Fallback Error Message: Could not validate the shipping address
Required: Required
Active: Yes
Method: POST

Developer Console OAuth

Client ID: The client ID for the OAuth credential.
Client Secret: The client secret for the OAuth credential.
Organization ID: The organization ID for the OAuth credential.

Hook Fields

Name: order.items[].sku
Source: order.items[].sku
Active: Yes

Name: order.addresses
Source: order.addresses
Active: Yes
```

## Endpoint code example

The following code example shows how to implement the webhook on your custom endpoint.

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

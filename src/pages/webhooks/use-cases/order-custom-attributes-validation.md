---
title: Order custom attributes validation
description: Learn how to validate updates to order custom attributes using webhooks in Adobe Commerce.
keywords:
  - Extensibility
---

# Order custom attribute validation

When an order and its custom attributes are saved in the Commerce Admin, a third-party system checks whether the sales representative custom attribute has a valid value. If valid, allow the order to be saved. Otherwise, display an error message.

## Webhook names

`observer.sales_order_place_before`

`observer.sales_order_view_custom_attributes_update_before` - triggered only when order custom attributes are saved from the **Custom Attributes** tab of the **Order View** page in the Commerce Admin.

\<a href="https://experienceleague.adobe.com/en/docs/commerce/user-guides/product-solutions" \>\<div style="background-color: blue; color: white; padding: 0 4px; width: 80px; display: inline; border-radius: 3px;" \>PaaS Only\</div\>\</a\> The custom attributes modules must be installed for this use case. See [Install custom attribute support](https://developer.adobe.com/commerce/webapi/rest/modules/custom-attributes/#install-custom-attribute-support) if the modules are not yet installed.

## Payloads

### observer.sales_order_place_before

The following `observer.sales_order_place_before` default payload was obtained from execution of the application code. Some data has been removed for brevity.

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

#### Default payload

```json
{
    "subject": [],
    "eventName": "sales_order_place_before",
    "data": {
        "order": {
            "base_currency_code": "USD",
            "base_discount_amount": 0,
            "base_grand_total": 104.59,
            "base_shipping_amount": 5,
            ...
            "items": [
                {
                    "sku": "24-WG02",
                    "name": "Didi Sport Watch",
                    ...
                },
                ...
            ],
            "status_histories": [
              ...
            ],
            "extension_attributes": {
                ...
            },
            "addresses": [
                {
                    "region_id": "33",
                    "postcode": "49628-7978",
                    ...
                },
                ...
            ],
            "shipping_method": "flatrate_flatrate",
            "payment": {
                "method": "checkmo",
                ...
            },
            "custom_attributes_serializable": {
                "sales_rep": "Rep123"
            },
            "gift_cards": "[]",
            ...
        }
    }
}
```

#### Configured payload

```json
{
    "custom_attributes": {
        "sales_rep": "Rep123"
    },
    "order": {
        "base_currency_code": "USD",
        "base_discount_amount": 0,
        "base_grand_total": 104.59,
        "base_shipping_amount": 5,
        ...
        "items": [
            {
                "sku": "24-WG02",
                "name": "Didi Sport Watch",
                ...
            }
            ...
        ],
        "status_histories": [
          ...
        ],
        "extension_attributes": {
            ...
        },
        "addresses": [
            {
                "region_id": "33",
                "postcode": "49628-7978",
                ...
            },
            ...
        ],
        "shipping_method": "flatrate_flatrate",
        "payment": {
            "method": "checkmo",
            ...
        },
        "custom_attributes_serializable": {
            "sales_rep": "Rep123"
        },
        "gift_cards": "[]",
        ...
    }
}
```

### observer.sales_order_view_custom_attributes_update_before

The following `observer.sales_order_view_custom_attributes_update_before` default payload was obtained from execution of the application code. Some data has been removed for brevity.

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

#### Default payload

```json
{
    "subject": [],
    "eventName": "sales_order_view_custom_attributes_update_before",
    "data": {
        "order": {
            "base_currency_code": "USD",
            "base_discount_amount": "0.0000",
            "base_grand_total": "58.0400",
            "base_shipping_amount": "5.0000",  
            "shipping_method": "flatrate_flatrate",
            "gift_cards": "[]",
            ...
            "extension_attributes": {
                ...  
            },
            "addresses": {
                "1": {
                    "region_id": "33",
                    "postcode": "49628-7978",
                    ...
                },
                ...
            },
            "items": {
                "1": {
                    "sku": "24-WG02",
                    "name": "Didi Sport Watch",
                    ...
                }
            },
            "payment": {
                "method": "checkmo",
                ...
            }
        },
        "custom_attributes": {
            "sales_rep": "Rep123"
        }
    }
}
```

#### Configured payload

```json
{
    "custom_attributes": {
        "sales_rep": "Rep123"
    },
    "order": {
        "base_currency_code": "USD",
        "base_discount_amount": "0.0000",
        "base_grand_total": "58.0400",
        "base_shipping_amount": "5.0000",  
        "shipping_method": "flatrate_flatrate",
        "gift_cards": "[]",
        ...
        "extension_attributes": {
            ...  
        },
        "addresses": {
            "1": {
                "region_id": "33",
                "postcode": "49628-7978",
                ...
            },
            ...
        },
        "items": {
            "1": {
                "sku": "24-WG02",
                "name": "Didi Sport Watch",
                ...
            }
        },
        "payment": {
            "method": "checkmo",
            ...
        }
    }
}
```

## Configuration

### observer.sales_order_place_before

The following configurations define a conditional webhook. As a result of the specified rule in the examples, the webhook will only make requests to external systems when it is triggered from the Commerce Admin.

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

#### webhook.xml (PaaS)

```xml
<method name="observer.sales_order_place_before" type="before">
    <hooks>
        <batch name="order_validation" order="100">
            <hook name="order_custom_attributes_validation" url="{env:APP_BUILDER_URL}/validate-order-attributes" priority="100" fallbackErrorMessage="Could not validate the order's attributes" softTimeout="1000" required="true" method="POST">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name="custom_attributes" source="data.order.custom_attributes_serializable" />
                    <field name="order" source="data.order" />
                </fields>
                <rules>
                    <rule field="context_application_state.get_area_code" operator="equal" value="adminhtml" />
                </rules>
            </hook>
        </batch>
    </hooks>
</method>
```

#### Admin (SaaS)

```yaml
Hook Settings

Webhook method: observer.sales_order_place_before
Webhook type: before
Batch name: order_validation
Batch order: 100
Hook name: order_custom_attributes_validation
Hook priority: 100
URL: <Host>/validate-order-attributes
Soft timeout: 1000
Fallback Error Message: Could not validate the order's attributes
Required: Required
Active: Yes
Method: POST

Developer Console OAuth

Client ID: The client ID for the OAuth credential.
Client Secret: The client secret for the OAuth credential.
Organization ID: The organization ID for the OAuth credential.

Hook Fields

Name: custom_attributes
Source: data.order.custom_attributes_serializable
Active: Yes

Name: order
Source: data.order
Active: Yes

Hook Rules

Field: context_application_state.get_area_code
Value: adminhtml
Operator: equal
Active: Yes
```

### observer.sales_order_view_custom_attributes_update_before

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

#### webhook.xml (PaaS)

```xml
<method name="observer.sales_order_view_custom_attributes_update_before" type="before">
    <hooks>
        <batch name="order_validation" order="100">
            <hook name="order_custom_attributes_validation" url="{env:APP_BUILDER_URL}/validate-order-attributes" priority="100" fallbackErrorMessage="Could not validate the order's attributes" softTimeout="1000" required="true" method="POST">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name="custom_attributes" source="data.custom_attributes" />
                    <field name="order" source="data.order" />
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

#### Admin (SaaS)

```yaml
Hook Settings

Webhook method: observer.sales_order_view_custom_attributes_update_before
Webhook type: before
Batch name: order_validation
Batch order: 100
Hook name: order_custom_attributes_validation
Hook priority: 100
URL: <Host>/validate-order-attributes
Soft timeout: 1000
Fallback Error Message: Could not validate the order's attributes
Required: Required
Active: Yes
Method: POST

Developer Console OAuth

Client ID: The client ID for the OAuth credential.
Client Secret: The client secret for the OAuth credential.
Organization ID: The organization ID for the OAuth credential.

Hook Fields

Name: custom_attributes
Source: data.custom_attributes
Active: Yes

Name: order
Source: data.order
Active: Yes
```

## Endpoint code example

The following code example shows a custom endpoint implementation that will work with either of the configured webhooks.

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
    // In this example, we check that the order's custom attributes do not contain a sales representative name with the word test.
    // If they do, an exception is thrown.

    const response = {statusCode: 200}
    const attributes = params.custom_attributes || {};

    if (/test/i.test(attributes?.sales_rep)) {
      response.body = JSON.stringify({
        op: "exception",
        message: 'Order validation failed: Attribute "sales_rep" cannot contain "test".'
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

If the order has a `sales_rep` custom attribute with an invalid value, the runtime AppBuilder action returns an exception message. The message is visible to the customer.

```js
response.body = JSON.stringify({
  op: "exception",
  message: 'Order validation failed: Attribute "sales_rep" cannot contain "test".'
})
```

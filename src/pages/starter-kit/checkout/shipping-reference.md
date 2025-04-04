---
title: Shipping API reference
description: Learn about the available API endpoints for the shipping module in the Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - REST
  - Extensibility
---

# Shipping API reference

The checkout module provides REST and GraphQL APIs to configure out-of-process shipping methods. These methods depend on webhooks to obtain shipping rates.

The App Builder application actions can act as webhook endpoints to communicate between Adobe Commerce and the shipping provider.

## REST

To configure out-of-process shipping methods, add shipping carriers using the REST API.

The raw Shipping REST schema is available [here](/shipping.xml).

| **Route URL**                     | **Method** | **Description**                                |
|-----------------------------------|------------|------------------------------------------------|
| `/V1/oope_shipping_carrier`       | POST       | Create a new shipping carrier.                 |
| `/V1/oope_shipping_carrier`       | PUT        | Update a shipping carrier.                     |
| `/V1/oope_shipping_carrier/:code` | GET        | Retrieve an out-of-process shipping carrier by its code. |
| `/V1/oope_shipping_carrier`       | GET        | Retrieve a list of all out-of-process shipping carriers  |
| `/V1/oope_shipping_carrier/:code`   | DELETE     | Delete shipping carrier by code                |


## Create a new OOPE shipping carrier

### POST `/V1/oope_shipping_carrier`

**Payload parameters:**

| Parameter                   | Type    | Required | Description                                                              |
|-----------------------------|---------|----------|--------------------------------------------------------------------------|
| `code`                      | String  | Yes      | Unique identifier for the shipping carrier.                              |
| `title`                     | String  | Yes      | Display name of the shipping carrier.                                    |
| `stores`                    | Array   | No       | List of store codes where the shipping carrier is available.             |
| `countries`                 | Array   | No       | List of countries where the shipping carrier is available.               |
| `active`                    | Boolean | No       | Status indicating if the shipping carrier is active.                     |
| `sort_order`                | Integer | No       | The sort order of shipping carriers.                                     |
| `tracking_available`        | Boolean | No       | Status indicating if the shipping carrier has available tracking.        |
| `shipping_labels_available` | Boolean | No       | Status indicating if the shipping carrier has available shipping labels. |

<CodeBlock slots="heading, code" repeat="2" languages="bash, json" />

#### Example request
```bash
curl --request POST \
--url <ADOBE_COMMERCE_URL>/rest/all/V1/oope_shipping_carrier \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json' \
--data '{
"carrier": {
"code": "DPS",
"title": "Detroit Postal Service"
"stores": ["default", "custom"],
"countries": ["DE","FR","CA"],
"sort_order": 10000,
"active": true,
"tracking_available": false,
"shipping_labels_available": false
}
}'
```

#### Example response

```json
{
  "success": true,
  "message": {
    "id": 1,
    "code": "DPS",
    "title": "Demo Postal Service",
    "stores": ["default"],
    "countries": ["US", "CA"],
    "active": true,
    "sort_order": 10,
    "tracking_available": true,
    "shipping_labels_available": true
  }
}
```

## Update an existing OOPE shipping carrier

### PUT `/V1/oope_shipping_carrier`

**Payload parameters:**

| Parameter                   | Type    | Required | Description                                                              |
|-----------------------------|---------|----------|--------------------------------------------------------------------------|
| `code`                      | String  | Yes      | Unique identifier for the shipping carrier.                              |
| `title`                     | String  | Yes      | Display name of the shipping carrier.                                    |
| `stores`                    | Array   | No       | List of store codes where the shipping carrier is available.             |
| `countries`                 | Array   | No       | List of countries where the shipping carrier is available.               |
| `active`                    | Boolean | No       | Status indicating if the shipping carrier is active.                     |
| `sort_order`                | Integer | No       | The sort order of shipping carriers.                                     |
| `tracking_available`        | Boolean | No       | Status indicating if the shipping carrier has available tracking.        |
| `shipping_labels_available` | Boolean | No       | Status indicating if the shipping carrier has available shipping labels. |

<CodeBlock slots="heading, code" repeat="2" languages="bash, json" />

#### Example request
```bash
curl --request PUT \
--url <ADOBE_COMMERCE_URL>/rest/all/V1/oope_shipping_carrier \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json' \
--data '{
"carrier": {
"code": "DPS",
"title": "Detroit Postal Service"
"stores": ["default", "custom"],
"countries": ["DE","FR","CA"],
"sort_order": 10000,
"active": true,
"tracking_available": false,
"shipping_labels_available": false
}
}'
```

#### Example response

```json
{
  "success": true,
  "message": {
    "id": 1,
    "code": "DPS",
    "title": "Demo Postal Service",
    "stores": ["default"],
    "countries": ["US", "CA"],
    "active": true,
    "sort_order": 10,
    "tracking_available": true,
    "shipping_labels_available": true
  }
}
```


## Get an OOPE shipping carrier by code

### GET `/V1/oope_shipping_carrier/:code`

**Payload parameters:**

| Parameter | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| `code`    | String | Unique identifier for the shipping carrier. |

<CodeBlock slots="heading, code" repeat="1" languages="json" />

#### Example response

```json
{
  "success": true,
  "message": {
    "id": 1,
    "code": "DPS",
    "title": "Demo Postal Service",
    "stores": ["default"],
    "countries": ["US", "CA"],
    "sort_order": 10,
    "active": true,
    "tracking_available": true,
    "shipping_labels_available": true
  }
}
```

## List all shipping carriers

### GET `/V1/oope_shipping_carrier`

<CodeBlock slots="heading, code" repeat="1" languages="json" />

#### Example response

````json
{
  "success": true,
  "message": [
    {
      "id": 1,
      "code": "DPS",
      "title": "Demo Postal Service",
      "stores": ["default"],
      "countries": ["US", "CA"],
      "sort_order": 10,
      "active": true,
      "tracking_available": true,
      "shipping_labels_available": true
    },
    {
      "id": 2,
      "code": "Fedex",
      "title": "Fedex Service",
      "stores": ["default"],
      "countries": ["US"],
      "sort_order": 50,
      "active": true,
      "tracking_available": false,
      "shipping_labels_available": true
    }
  ]
}
````

## Delete an OOPE shipping carrier

### DELETE `/V1/oope_shipping_carrier/:code`

| Parameter | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| `code`    | String | Unique identifier for the shipping carrier. |


## GraphQL

The Payment module's GraphQL schema for this is defined in `etc/schema.graphqls`.
You can access details about out-of-process payment types by specifying the `oope_payment_method_config` field within the `available_payment_methods` or `selected_payment_method` field of the cart API.

The raw Payment GraphQL schema is available [here](/payment.graphqls).

For more information on extending the out-of-process GraphQL schema, refer to the [EDS Integration Guide](./eds.md).

<CodeBlock slots="heading, code" repeat="2" languages="graphql, graphql" />

#### Example query

```graphql
query getCart($cartId: String!) {
  cart(cart_id: $cartId) {
    ...CHECKOUT_DATA_FRAGMENT
  }
}

fragment CHECKOUT_DATA_FRAGMENT on Cart {
  id
  available_payment_methods {
    code
    title
    oope_payment_method_config {
      backend_integration_url
      custom_config {
        ... on CustomConfigKeyValue {
          key
          value
        }
      }
    }
  }
  selected_payment_method {
    code
    title
    oope_payment_method_config {
      backend_integration_url
      custom_config {
        ... on CustomConfigKeyValue {
          key
          value
        }
      }
    }
  }
}
```

#### Example response

```json
{
  "available_payment_methods": [
    {
      "code": "checkmo",
      "title": "Check / Money order",
      "oope_payment_method_config": null
    },
    {
      "code": "oope_adyen",
      "title": "OOPE Adyen",
      "oope_payment_method_config": {
        "backend_integration_url": "http://oope-payment-method.pay/event",
        "custom_config": [
          {
            "key": "can_refund",
            "value": "true"
          }
        ]
      }
    }
  ],
  "selected_payment_method": {
    "code": "checkmo",
    "title": "Check / Money order",
    "oope_payment_method_config": null
  }
}
```


## GraphQL

The GraphQL schema allows providing additional data for out-of-process shipping methods. The `additional_data` is added to `selected_shipping_method` and `available_shipping_methods` in cart queries.

The raw Shipping GraphQL schema is available [here](/shipping.graphqls).

The `additional_data` is a list of key-value pairs that can store additional information about the shipping method.

```graphql
additional_data {
    key
    value
}
```

For example, when setting shipping methods on cart mutations:

```graphql
mutation {
  setShippingMethodsOnCart(input: {
    cart_id: "<cart_id>"
    shipping_methods: [
      {
        carrier_code: "EPS"
        method_code: "eps_shipping_two"
      }
    ]
  }) {
    cart {
      shipping_addresses {
        selected_shipping_method {
            additional_data {
                key
                value
            }
            carrier_code
            carrier_title
            method_code
            method_title
            price_excl_tax {
                currency
                value
            }
        }
      }
    }
  }
}
```

Additionally, you can use `additional_data` in a query to get carts with available shipping methods:

```graphql
{
  cart(cart_id: "<cart_id>") {
    shipping_addresses {
      available_shipping_methods {
        additional_data {
          key
          value
        }
        amount {
          currency
          value
        }
        available
        carrier_code
        carrier_title
        method_code
        method_title
        price_excl_tax {
          value
          currency
        }
        price_incl_tax {
          value
          currency
        }
      }
      selected_shipping_method {
        amount {
          value
          currency
        }
        carrier_code
        carrier_title
        method_code
        method_title
      }
    }
    itemsV2 {
        items {
            uid
            product {
                sku
            }

        } 
    }
  } 
}
```

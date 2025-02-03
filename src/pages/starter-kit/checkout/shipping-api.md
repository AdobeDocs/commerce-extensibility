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

| **Route URL**                     | **Method** | **Description**                                |
|-----------------------------------|------------|------------------------------------------------|
| `/V1/oope_shipping_carrier`       | GET        | Retrieve a list of all out-of-process shipping carriers  |
| `/V1/oope_shipping_carrier/:code` | GET        | Retrieve an out-of-process shipping carrier by its code. |
| `/V1/oope_shipping_carrier`       | POST       | Create a new shipping carrier.                 |
| `/V1/oope_shipping_carrier`       | PUT        | Update a shipping carrier.                     |
| `/V1/oope_shipping_carrier/:code`   | DELETE     | Delete shipping carrier by code                |

To register a new out-of-process carrier, make a POST request to `/V1/oope_shipping_carrier` with the carrier information, such as code and title:

```json
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

Example of the update request:

```json
curl --request PUT \
--url <ADOBE_COMMERCE_URL>/rest/all/V1/oope_shipping_carrier \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json' \
--data '{
"carrier": {
"code": "DEPS",
"title": "Demo postal service",
"stores": ["default"],
"countries": ["DE","FR","CA"],
"sort_order": 10000,
"active": true,
"tracking_available": false,
"shipping_labels_available": false
}
}'
```

## GraphQL

The GraphQL schema allows providing additional data for out-of-process shipping methods. The `additional_data` is added to `selected_shipping_method` and `available_shipping_methods` in cart queries.

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

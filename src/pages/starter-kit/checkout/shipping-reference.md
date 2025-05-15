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

| **Route URL**                     | **Method** | **Description**                                          |
| --------------------------------- | ---------- | -------------------------------------------------------- |
| `/V1/oope_shipping_carrier`       | POST       | Create a new shipping carrier.                           |
| `/V1/oope_shipping_carrier`       | PUT        | Update a shipping carrier.                               |
| `/V1/oope_shipping_carrier/:code` | GET        | Retrieve an out-of-process shipping carrier by its code. |
| `/V1/oope_shipping_carrier`       | GET        | Retrieve a list of all out-of-process shipping carriers  |
| `/V1/oope_shipping_carrier/:code` | DELETE     | Delete shipping carrier by code                          |

### Create a new OOPE shipping carrier

The POST `/V1/oope_shipping_carrier` endpoint creates an out-of-process shipping carrier in the Adobe Commerce instance.

**Payload parameters:**

| Parameter                   | Type    | Required | Description                                                              |
| --------------------------- | ------- | -------- | ------------------------------------------------------------------------ |
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
--url <ADOBE_COMMERCE_API_URL>/V1/oope_shipping_carrier \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json' \
--data '{
"carrier": {
"code": "DPS",
"title": "Demo Postal Service"
"stores": ["default"],
"countries": ["US","CA"],
"sort_order": 10,
"active": true,
"tracking_available": true,
"shipping_labels_available": true
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

### Update an existing OOPE shipping carrier

The PUT `/V1/oope_shipping_carrier` updates an out-of-process shipping carrier in the Adobe Commerce instance.

**Payload parameters:**

| Parameter                   | Type    | Required | Description                                                              |
| --------------------------- | ------- | -------- | ------------------------------------------------------------------------ |
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
--url <ADOBE_COMMERCE_API_URL>/V1/oope_shipping_carrier \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json' \
--data '{
"carrier": {
"code": "DPS",
"title": "Demo Postal Service"
"stores": ["default", "custom"],
"countries": ["US","CA"],
"sort_order": 10,
"active": true,
"tracking_available": true,
"shipping_labels_available": true
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

### Get an OOPE shipping carrier by code

The GET `/V1/oope_shipping_carrier/:code` retrieves one out-of-process shipping carrier by `code` from the Adobe Commerce instance.

**Payload parameters:**

| Parameter | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| `code`    | String | Unique identifier for the shipping carrier. |

<CodeBlock slots="heading, code" repeat="2" languages="bash,json" />

#### Example request

```bash
curl --request GET \
--url <ADOBE_COMMERCE_API_URL>/V1/oope_shipping_carrier/DPS' \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json' 
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
    "sort_order": 10,
    "active": true,
    "tracking_available": true,
    "shipping_labels_available": true
  }
}
```

### List all shipping carriers

The GET `/V1/oope_shipping_carrier` retrieves a list of all out-of-process shipping carriers from the Adobe Commerce instance.

<CodeBlock slots="heading, code" repeat="2" languages="bash,json" />

#### Example request

```bash
curl --request GET \
--url <ADOBE_COMMERCE_API_URL>/V1/oope_shipping_carrier' \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json'
```

#### Example response

```json
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
```

### Delete an OOPE shipping carrier

The DELETE `/V1/oope_shipping_carrier/:code` deletes an out-of-process shipping carrier by `code` from the Adobe Commerce instance.

| Parameter | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| `code`    | String | Unique identifier for the shipping carrier. |

<CodeBlock slots="heading, code" repeat="2" languages="bash,json" />

#### Example request

```bash
curl --request DELETE \
--url <ADOBE_COMMERCE_API_URL>/V1/oope_shipping_carrier/DPS' \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json'
```

#### Example response

```json
{
  "success": true,
  "message": true
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
  setShippingMethodsOnCart(
    input: {
      cart_id: "<cart_id>"
      shipping_methods: [
        { carrier_code: "EPS", method_code: "eps_shipping_two" }
      ]
    }
  ) {
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

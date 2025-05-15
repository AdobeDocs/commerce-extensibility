---
title: Payment API reference
description: Learn about the available API endpoints for the payment module in the Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - REST
  - Extensibility
---

# Payment API reference

The checkout module provides REST and GraphQL APIs to configure out-of-process payment methods.

## REST

For more information on the available endpoints, refer to [payment API usage](./payment-usage.md#create-a-new-payment-method).

The raw Payment REST API schema is available [here](/payment.xml).

| **Route URL**                   | **Method** | **Description**                                        |
| ------------------------------- | ---------- | ------------------------------------------------------ |
| `/V1/oope_payment_method`       | POST       | Create or update an out-of-process payment method.     |
| `/V1/oope_payment_method/:code` | GET        | Retrieve an out-of-process payment method by its code. |
| `/V1/oope_payment_method`       | GET        | List all available out-of-process payment methods.     |

### Create a new payment method

The POST `/V1/oope_payment_method/` creates an out-of-process payment method in the Adobe Commerce instance.

**Payload parameters:**

| Parameter                 | Type    | Required | Description                                                                                                                                                |
| ------------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `code`                    | String  | Yes      | Unique identifier for the payment method.                                                                                                                  |
| `title`                   | String  | No       | Display name of the payment method.                                                                                                                        |
| `description`             | String  | No       | Description of the payment method.                                                                                                                         |
| `active`                  | Boolean | Yes      | Status indicating if the method is active.                                                                                                                 |
| `backend_integration_url` | String  | No       | URL for backend integration, which is an App Builder URL.                                                                                                  |
| `stores`                  | Array   | No       | List of store codes that payment method is available for.                                                                                                  |
| `order_status`            | String  | No       | Initial [order status](https://experienceleague.adobe.com/en/docs/commerce-admin/stores-sales/order-management/orders/order-status). Default is `pending`. |
| `countries`               | Array   | No       | List of countries where the method is available.                                                                                                           |
| `currencies`              | Array   | No       | Currencies supported by the payment method.                                                                                                                |
| `custom_config`           | Array   | No       | Custom configuration settings for payment methods.                                                                                                         |

<CodeBlock slots="heading, code" repeat="2" languages="bash, json" />

#### Example request

```bash
curl --request POST \
--url <ADOBE_COMMERCE_API_URL>/V1/oope_payment_method \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json' \
--data '{
  "payment_method": {
    "code": "method-1",
    "title": "Method 1",
    "description": "Description for Method 1",
    "active": true,
    "backend_integration_url": "http://example.com",
    "stores": ["store-1", "store-2"],
    "order_status": "processing",
    "countries": ["ES", "US"],
    "currencies": ["EUR", "USD"],
    "custom_config": [
      {
        "key1": "value1"
      }
    ]
  }
}'
```

#### Example response

```json
{
  "success": true,
  "message": {
    "id": 3,
    "code": "method-1",
    "title": "Method 1",
    "description": "Description for Method 1",
    "active": true,
    "backend_integration_url": "http://example.com",
    "stores": ["store-1", "store-2"],
    "order_status": "processing",
    "countries": ["ES", "US"],
    "currencies": ["EUR", "USD"],
    "custom_config": [
      {
        "key1": "value1"
      }
    ]
  }
}
```

### Get an OOPE payment method by code

The GET `/V1/oope_payment_method/:code` endpoint retrieves one out-of-process payment method by `code` from the Adobe Commerce instance.

**Payload parameters:**

| Parameter | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| `code`    | String | Unique identifier for the payment method. |

<CodeBlock slots="heading, code" repeat="2" languages="bash, json" />

#### Example request

```bash
curl --request GET \
--url <ADOBE_COMMERCE_API_URL>/V1/oope_payment_method/:code \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json'
```

#### Example response

```json
{
  "success": true,
  "message": {
    "id": 2,
    "code": "method-1",
    "title": "Method one",
    "active": true,
    "backend_integration_url": "http://<oope-payment-method.pay>/event",
    "stores": ["default"],
    "order_status": "complete",
    "countries": ["ES", "US"],
    "currencies": ["EUR", "USD"],
    "custom_config": [
      {
        "key": "can_refund",
        "value": "true"
      }
    ]
  }
}
```

### List all payment methods

The GET `/V1/oope_payment_method` retrieves a list of all out-of-process payment methods from the Adobe Commerce instance.

<CodeBlock slots="heading, code" repeat="2" languages="bash, json" />

#### Example request

```bash
curl --request GET \
--url <ADOBE_COMMERCE_API_URL>/V1/oope_payment_method \
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
      "code": "method-1",
      "title": "Method one",
      "active": true,
      "backend_integration_url": "http://oope-payment-method.pay/event",
      "stores": [],
      "order_status": "complete",
      "countries": [],
      "currencies": [],
      "custom_config": []
    }
  ]
}
```

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

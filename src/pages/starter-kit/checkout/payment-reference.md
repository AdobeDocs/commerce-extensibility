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

The raw Payment GraphQL schema is available [here](/payment.xml).

| **Route URL**| **Method** | **Description**|
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------- |
| [`/V1/oope_payment_method/:code`](https://github.com/adobe/commerce-checkout-starter-kit?tab=readme-ov-file#get-an-oope-payment-method-by-code) | GET        | Retrieve an out-of-process payment method by its code. |
| [`/V1/oope_payment_method`](https://github.com/adobe/commerce-checkout-starter-kit?tab=readme-ov-file#list-all-payment-methods)                 | GET        | List all available out-of-process payment methods.     |
| [`/V1/oope_payment_method`](https://github.com/adobe/commerce-checkout-starter-kit?tab=readme-ov-file#create-a-new-oope-payment-method)         | POST       | Create or update an out-of-process payment method.     |

## GraphQL

The Shipping module's GraphQL schema for this is defined in `etc/schema.graphqls`.
After creating out-of-process payment, you can access them using the `oopePaymentMethods` GraphQL query available in `available_payment_methods` or `selected_payment_method` of the cart API.

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

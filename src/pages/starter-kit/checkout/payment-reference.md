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

The raw Payment REST ap schema is available [here](/payment.xml).

| **Route URL**| **Method** | **Description**|
| ----------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------- |
| `/V1/oope_payment_method`     | POST       | Create or update an out-of-process payment method.     |
| `/V1/oope_payment_method/:code` | GET        | Retrieve an out-of-process payment method by its code. |
| `/V1/oope_payment_method`             | GET        | List all available out-of-process payment methods.     |

## Create a new payment method

### POST `/V1/oope_payment_method/:code`

**Payload parameters:**

| Parameter                 | Type     | Required | Description |
| ------------------------- | ------- | ----- |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `code`                    | String  | Yes | Unique identifier for the payment method.|
| `title`                   | String  | No | Display name of the payment method.|
| `description`             | String  | No | Description of the payment method.|
| `active`                  | Boolean | Yes | Status indicating if the method is active.|
| `backend_integration_url` | String  | No | URL for backend integration, which is an App Builder URL.|
| `stores`                  | Array   | No | List of store codes that payment method is available for.|
| `order_status`            | String  | No | Initial [order status](https://experienceleague.adobe.com/en/docs/commerce-admin/stores-sales/order-management/orders/order-status) when using this method. Default is `pending`. |
| `countries`               | Array   | No | List of countries where the method is available.|
| `currencies`              | Array   | No | Currencies supported by the payment method.|
| `custom_config`           | Array   | No | Custom configuration settings for payment methods.|

<CodeBlock slots="heading, code" repeat="1" languages="JSON" />


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

## Get an OOPE payment method by code

### GET `/V1/oope_payment_method/:code`

**Payload parameters:**

| Parameter | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| `code`    | String | Unique identifier for the payment method. |

<CodeBlock slots="heading, code" repeat="1" languages="json" />

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

## List all payment methods

### GET `/V1/oope_payment_method`

<CodeBlock slots="heading, code" repeat="1" languages="json" />

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

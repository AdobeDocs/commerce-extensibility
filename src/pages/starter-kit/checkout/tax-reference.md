---
title: Tax API reference
description: Learn about the available API endpoints for the tax module in the Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - REST
  - Extensibility
---

# Tax API reference

The checkout module provides REST and GraphQL APIs to configure out-of-process tax integrations.

## REST

The raw REST api schema is available [here](/tax.xml).

| **Route URL**                                   | **Method** | **Description**                                     |
| ----------------------------------------------- | ---------- | --------------------------------------------------- |
| `/V1/oope_tax_management/tax_integration/:code` | GET        | Retrieve an OOPE tax integration info by its code.. |
| `/V1/oope_tax_management/tax_integration`       | GET        | List all available tax integration info.            |
| `/V1/oope_tax_management/tax_integration`       | POST       | Create or update an OOPE tax integration.           |

### Create or modify a new OOPE tax integration

The POST `/V1/oope_tax_management/tax_integration/:code` creates an out-of-process tax integration in the Adobe Commerce instance. Note that, currently, only one tax integration is allowed to be active. If you wish to change the active tax integration, you must first deactivate the current one.

**Payload parameters:**

| Parameter | Type    | Required | Description                                                 |
| --------- | ------- | -------- | ----------------------------------------------------------- |
| `code`    | String  | Yes      | Unique identifier for the tax integration.                  |
| `title`   | String  | Yes      | Display name of the tax integration.                        |
| `active`  | Boolean | No       | Status indicating if the tax integration is active.         |
| `stores`  | Array   | No       | List of store codes where the tax integration is available. |

<CodeBlock slots="heading, code" repeat="2" languages="bash, json" />

#### Example request

```bash
curl --request POST \
--url <ADOBE_COMMERCE_API_URL>/V1/oope_tax_management/tax_integration \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json' \
--data '{
"tax_integration": {
    "code": "tax-1",
    "title": "Tax Integration 1",
    "active": true,
    "stores": ["store-1", "store-2"]
}
}'
```

#### Example response

```json
{
  "success": true,
  "message": {
    "id": 1,
    "code": "tax-1",
    "title": "Tax Integration 1",
    "active": true,
    "stores": ["store-1", "store-2"]
  }
}
```

### Get an OOPE tax integration by code

The GET `/V1/oope_tax_management/tax_integration` retrieves one out-of-process tax integration by `code` from the Adobe Commerce instance.

**Payload parameters:**

| Parameter | Type   | Description                                |
| --------- | ------ | ------------------------------------------ |
| `code`    | String | Unique identifier for the tax integration. |

<CodeBlock slots="heading, code" repeat="2" languages="bash, json" />

#### Example request

```bash
curl --request GET \
--url <ADOBE_COMMERCE_API_URL>/V1/oope_tax_management/tax_integration/:code' \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json'
```

#### Example response

```json
{
  "success": true,
  "message": {
    "id": 1,
    "code": "tax-1",
    "title": "Tax Integration 1",
    "active": true,
    "stores": ["store-1", "store-2"]
  }
}
```

### List all OOPE tax integrations

The GET `/V1/oope_tax_management/tax_integration` retrieves a list of all out-of-process tax integrations from the Adobe Commerce instance.

<CodeBlock slots="heading, code" repeat="2" languages="bash, json" />

#### Example request

```bash
curl --request GET \
--url <ADOBE_COMMERCE_API_URL>/V1/oope_tax_management/tax_integration' \
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
      "code": "tax-1",
      "title": "Tax Integration 1",
      "active": true,
      "stores": ["store-1", "store-2"]
    }
  ]
}
```

## GraphQL

To check taxes applied by the tax integration, we have two GraphQl queries: `cart` and `customerOrders`.

### Cart taxes

To check the taxes applied to the cart, you can use the [`getCart`](https://developer.adobe.com/commerce/webapi/graphql/schema/cart/queries/cart/) query to retrieve the [`cart`](https://developer.adobe.com/commerce/webapi/graphql-api/index.html#definition-Cart)/[`prices`](https://developer.adobe.com/commerce/webapi/graphql-api/index.html#definition-CartPrices)/[`applied_taxes`](https://developer.adobe.com/commerce/webapi/graphql-api/index.html#definition-CartPrices) field. This field contains information about the taxes applied to the cart.

### Order taxes

To check the tax breakdown, you can use the [`customerOrders`](https://developer.adobe.com/commerce/webapi/graphql/schema/customer/queries/orders/) query to retrieve the [`CustomerOrder`](https://developer.adobe.com/commerce/webapi/graphql-api/index.html#definition-CustomerOrder)/[`total`](https://developer.adobe.com/commerce/webapi/graphql-api/index.html#definition-OrderTotal)/[`taxes`](https://developer.adobe.com/commerce/webapi/graphql-api/index.html#definition-TaxItem) field. This field contains information about the taxes breakdown applied to the order.

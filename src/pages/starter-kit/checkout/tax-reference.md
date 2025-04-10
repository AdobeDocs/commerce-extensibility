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

The REST API schema is available [here](/tax.xml).

| **Route URL**                                   | **Method** | **Description**                                    |
| ----------------------------------------------- | ---------- | -------------------------------------------------- |
| `/V1/oope_tax_management/tax_integration/:code` | GET        | Retrieve an OOPE tax integration info by its code. |
| `/V1/oope_tax_management/tax_integration`       | GET        | List all available tax integration info.           |
| `/V1/oope_tax_management/tax_integration`       | POST       | Create or update an OOPE tax integration.          |

### Create or modify a new OOPE tax integration

The POST `/V1/oope_tax_management/tax_integration/:code` endpoint creates an out-of-process tax integration in the Adobe Commerce instance.

<InlineAlert variant="info" slots="text"/>

Only one tax integration can be active at a time. If you want to change the active tax integration, you must first deactivate the current one.

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

### Create a tax class with custom attributes

The out-of-process tax module extends the [`POST /V1/taxClasses`](https://adobe-commerce.redoc.ly/2.4.7-admin/tag/taxClasses/) endpoint to allow creating tax classes with custom attributes.

<CodeBlock slots="heading, code" repeat="2" languages="bash, json" />

#### Example request

```bash
curl --request POST \
--url <ADOBE_COMMERCE_API_URL>/V1/taxClasses \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json' \
--data '{
  "class_name": "Test Tax Class",
  "class_type": "PRODUCT",
  "custom_attributes": [
    {
      "attribute_code": "tax_code",
      "value": "005"
    }
  ]
}'
```

#### Example response

```json
"3"
```

### Update a tax class with custom attributes

The out-of-process tax module extends the [`POST /V1/taxClasses/:classId`](https://adobe-commerce.redoc.ly/2.4.7-admin/tag/taxClassesclassId) endpoint to update an existing tax class with custom attributes.

<CodeBlock slots="heading, code" repeat="2" languages="bash, json" />

#### Example request

```bash
curl --request POST \
--url <ADOBE_COMMERCE_API_URL>/V1/taxClasses/4 \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json' \
--data '{
  "class_id": 4,
  "class_name": "Updated Tax Class",
  "class_type": "PRODUCT",
  "custom_attributes": [
    {
      "attribute_code": "tax_code",
      "value": "005"
    }
  ]
}'
```

#### Example response

```json
"4"
```

### List all tax classes with custom attributes

The out-of-process tax module extends the [`GET /V1/taxClasses/search`](https://adobe-commerce.redoc.ly/2.4.7-admin/tag/taxClassessearch#operation/GetV1TaxClassesSearch) endpoint to include custom attributes in the response when available.

<CodeBlock slots="heading, code" repeat="2" languages="bash, json" />

#### Example request

```bash
curl --request GET \
--url '<ADOBE_COMMERCE_API_URL>/V1/taxClasses/search?searchCriteria[pageSize]=100' \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json'
```

#### Example response

```json
{
  "items": [
    {
      "class_id": 1,
      "class_name": "Retail Tax Class",
      "class_type": "CUSTOMER",
      "extension_attributes": {},
      "custom_attributes": [
        {
          "attribute_code": "tax_code",
          "value": "005"
        },
        {
          "attribute_code": "tax_label",
          "value": "Retail"
        }
      ]
    }
  ],
  "search_criteria": {
    "filter_groups": [],
    "sort_orders": [],
    "page_size": 100,
    "current_page": 1
  },
  "total_count": 1
}
```

## GraphQL

There are two GraphQL queries to check taxes applied by the tax integration, `cart` and `customerOrders`.

### Cart taxes

To check the taxes applied to the cart, you can use the [`getCart`](https://developer.adobe.com/commerce/webapi/graphql/schema/cart/queries/cart/) query to retrieve the [`cart`](https://developer.adobe.com/commerce/webapi/graphql-api/index.html#definition-Cart)/[`prices`](https://developer.adobe.com/commerce/webapi/graphql-api/index.html#definition-CartPrices)/[`applied_taxes`](https://developer.adobe.com/commerce/webapi/graphql-api/index.html#definition-CartPrices) field. This field contains information about the taxes applied to the cart.

### Order taxes

To check the tax breakdown, you can use the [`customerOrders`](https://developer.adobe.com/commerce/webapi/graphql/schema/customer/queries/orders/) query to retrieve the [`CustomerOrder`](https://developer.adobe.com/commerce/webapi/graphql-api/index.html#definition-CustomerOrder)/[`total`](https://developer.adobe.com/commerce/webapi/graphql-api/index.html#definition-OrderTotal)/[`taxes`](https://developer.adobe.com/commerce/webapi/graphql-api/index.html#definition-TaxItem) field. This field contains information about the taxes breakdown applied to the order.

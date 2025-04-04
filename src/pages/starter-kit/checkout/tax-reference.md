---
title: Payment API reference
description: Learn about the available API endpoints for the payment module in the Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - REST
  - Extensibility
---

# Tax API reference

The checkout module provides REST and GraphQL APIs to configure out-of-process tax integrations.

## REST

The raw REST api schema is available [here](/tax.xml).

| **Route URL**| **Method** | **Description**|
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------- |
| `/V1/oope_tax_management/tax_integration/:code` | GET        | Retrieve an OOPE tax integration info by its code.. |
| `/V1/oope_tax_management/tax_integration`                 | GET        | List all available tax integration info.     |
| `/V1/oope_tax_management/tax_integration`         | POST       | Create or update an OOPE tax integration.     |

## Create or modify a new OOPE tax integration

### POST `/V1/oope_tax_management/tax_integration/:code`


**Payload parameters:**

| Parameter | Type   | Required | Description                               |
| --------- | ------ | -------- | ----------------------------------------- |
| `code`    | String | Yes      | Unique identifier for the tax integration. |
| `title`   | String | Yes      | Display name of the tax integration.       |
| `active`  | Boolean| No       | Status indicating if the tax integration is active. |
| `stores`  | Array  | No       | List of store codes where the tax integration is available. |

<CodeBlock slots="heading, code" repeat="1" languages="json" />


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

## Get an OOPE tax integration by code

### GET `/V1/oope_tax_management/tax_integration`

**Payload parameters:**

| Parameter | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| `code`    | String | Unique identifier for the tax integration. |

<CodeBlock slots="heading, code" repeat="1" languages="json" />


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

## List all OOPE tax integrations

### GET `/V1/oope_tax_management/tax_integration`

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

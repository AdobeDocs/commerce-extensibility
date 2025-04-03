---
title: Tax API JavaScript usage
description: Learn how to use the Tax API in the Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - Extensibility
---
# Tax API JavaScript usage

To manage OOP tax integrations, Adobe Commerce provides a set of REST endpoints. The following sections describe how to use these endpoints in your JavaScript code.
First of all, to call the Commerce REST endpoints, initialize the Adobe Commerce Client:

```javascript
const { getAdobeCommerceClient } = require('../lib/adobe-commerce');
const commerceClient = await getAdobeCommerceClient(process.env);
```

## Create or modify a new OOPE tax integration

`createOopeTaxIntegration` creates a new out-of-process tax integration:

**Payload parameters:**

| Parameter | Type   | Required | Description                               |
| --------- | ------ | -------- | ----------------------------------------- |
| `code`    | String | Yes      | Unique identifier for the tax integration. |
| `title`   | String | Yes      | Display name of the tax integration.       |
| `active`  | Boolean| No       | Status indicating if the tax integration is active. |
| `stores`  | Array  | No       | List of store codes where the tax integration is available. |

<CodeBlock slots="heading, code" repeat="2" languages="javascript, json" />

#### Example usage

```javascript
try {
  const createResponse = await commerceClient.createOopeTaxIntegration({
    code: 'tax-1',
    title: 'Tax Integration 1',
    active: true,
    stores: ['store-1', 'store-2'],
  });

  if (!createResponse.success) {
    return errorResponse(createResponse.statusCode, 'Failed to create tax integration');
  }

  console.log('Created tax integration:', createResponse.message);
} catch (error) {
  return errorResponse(HTTP_INTERNAL_ERROR, 'Error occurred while creating tax integration');
}
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

## Get an OOPE tax integration by code

`getOopeTaxIntegration` retrieves one out-of-process tax integration by `code` from the Adobe Commerce instance.

**Payload parameters:**

| Parameter | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| `code`    | String | Unique identifier for the tax integration. |

<CodeBlock slots="heading, code" repeat="2" languages="javascript, json" />

#### Example usage

```javascript
try {
  const getResponse = await commerceClient.getOopeTaxIntegration('tax-1');
  if (!getResponse.success) {
    return errorResponse(getResponse.statusCode, 'Failed to retrieve tax integration');
  }
  consolejson('Retrieved tax integration details:', getResponse.message);
} catch (error) {
  return errorResponse(HTTP_INTERNAL_ERROR, 'Error occurred while retrieving tax integration');
}
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

## List all OOPE tax integrations

`getOopeTaxIntegrations` retrieves a list of all out-of-process tax integrations in the Adobe Commerce instance.

#### Example usage

```javascript
try {
  const listResponse = await commerceClient.getOopeTaxIntegrations();
  if (!listResponse.success) {
    return errorResponse(listResponse.statusCode, 'Failed to list tax integrations');
  }
  console.log('List of tax integrations:', listResponse.message);
} catch (error) {
  return errorResponse(HTTP_INTERNAL_ERROR, 'Error occurred while listing tax integrations');
}
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

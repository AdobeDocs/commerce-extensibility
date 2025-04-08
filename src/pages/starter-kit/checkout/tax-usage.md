---
title: Tax API JavaScript usage
description: Learn how to use the Tax API in the Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - Extensibility
---

# Tax API JavaScript usage

To manage OOP tax integrations, Adobe Commerce provides a set of REST endpoints. The following sections describe how to use these endpoints in your JavaScript code.

To call the Commerce REST endpoints, initialize the Adobe Commerce Client:

```javascript
const { getAdobeCommerceClient } = require("../lib/adobe-commerce");
const commerceClient = await getAdobeCommerceClient(process.env);
```

## Create or modify a new OOPE tax integration

`createOopeTaxIntegration` creates a new out-of-process tax integration:

Check the [API reference](tax-reference.md/#create-or-modify-a-new-oope-tax-integration) for more details.

<CodeBlock slots="heading, code" repeat="1" languages="javascript" />

#### Example usage

```javascript
try {
  const createResponse = await commerceClient.createOopeTaxIntegration({
    code: "tax-1",
    title: "Tax Integration 1",
    active: true,
    stores: ["store-1", "store-2"],
  });

  if (!createResponse.success) {
    return errorResponse(
      createResponse.statusCode,
      "Failed to create tax integration",
    );
  }

  console.log("Created tax integration:", createResponse.message);
} catch (error) {
  return errorResponse(
    HTTP_INTERNAL_ERROR,
    "Error occurred while creating tax integration",
  );
}
```

## Get an OOPE tax integration by code

`getOopeTaxIntegration` retrieves one out-of-process tax integration by `code` from the Adobe Commerce instance.

Check the [API reference](tax-reference.md/#get-an-oope-tax-integration-by-code) for more details.

<CodeBlock slots="heading, code" repeat="1" languages="javascript" />

#### Example usage

```javascript
try {
  const getResponse = await commerceClient.getOopeTaxIntegration("tax-1");
  if (!getResponse.success) {
    return errorResponse(
      getResponse.statusCode,
      "Failed to retrieve tax integration",
    );
  }
  consolejson("Retrieved tax integration details:", getResponse.message);
} catch (error) {
  return errorResponse(
    HTTP_INTERNAL_ERROR,
    "Error occurred while retrieving tax integration",
  );
}
```

## List all OOPE tax integrations

`getOopeTaxIntegrations` retrieves a list of all out-of-process tax integrations in the Adobe Commerce instance.

Check the [API reference](tax-reference.md/#list-all-oope-tax-integrations) for more details.

<CodeBlock slots="heading, code" repeat="1" languages="javascript" />

#### Example usage

```javascript
try {
  const listResponse = await commerceClient.getOopeTaxIntegrations();
  if (!listResponse.success) {
    return errorResponse(
      listResponse.statusCode,
      "Failed to list tax integrations",
    );
  }
  console.log("List of tax integrations:", listResponse.message);
} catch (error) {
  return errorResponse(
    HTTP_INTERNAL_ERROR,
    "Error occurred while listing tax integrations",
  );
}
```

---
title: Tax API JavaScript usage
description: Learn how to use the Tax API in the Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - Extensibility
---

# Shipping API JavaScript reference

To manage OOP shipping carriers, Adobe Commerce provides a set of REST endpoints. The following sections describe how to use these endpoints in your JavaScript code.

To call the Commerce REST endpoints, initialize the Adobe Commerce Client:

```javascript
const { getAdobeCommerceClient } = require("../lib/adobe-commerce");
const commerceClient = await getAdobeCommerceClient(process.env);
```

## Create a new OOPE shipping carrier

`createOopeShippingCarrier` creates a new out-of-process shipping carrier with the necessary details such as `code`, `title`, and `configuration`.

Check the [API reference](./shipping-reference.md#create-a-new-oope-shipping-carrier) for more details.

<CodeBlock slots="heading, code" repeat="1" languages="javascript" />

#### Example usage

```javascript
try {
  const createResponse = await commerceClient.createOopeShippingCarrier({
    code: "DPS",
    title: "Demo Postal Service",
    stores: ["default"],
    countries: ["US", "CA"],
    active: true,
    sort_order: 10,
    tracking_available: true,
    shipping_labels_available: true,
  });

  if (!createResponse.success) {
    return errorResponse(
      createResponse.statusCode,
      "Failed to create shipping carrier",
    );
  }

  console.log("Created shipping carrier:", createResponse.message);
} catch (error) {
  return errorResponse(
    HTTP_INTERNAL_ERROR,
    "Error occurred while creating shipping carrier",
  );
}
```

## List all shipping carriers

`getOopeShippingCarriers` retrieves a list of all out-of-process shipping carriers in the Adobe Commerce instance.

Check the [API reference](./shipping-reference.md#list-all-shipping-carriers) for more details.

<CodeBlock slots="heading, code" repeat="1" languages="javascript" />

#### Example usage

```javascript
try {
  const listResponse = await commerceClient.getOopeShippingCarriers();
  if (!listResponse.success) {
    return errorResponse(
      listResponse.statusCode,
      "Failed to list shipping carriers",
    );
  }
  console.log("List of shipping carriers:", listResponse.message);
} catch (error) {
  return errorResponse(
    HTTP_INTERNAL_ERROR,
    "Error occurred while listing shipping carriers",
  );
}
```

## Get an OOPE shipping carrier by code

`getOopeShippingCarrier` retrieves one out-of-process shipping carrier by `code` from the Adobe Commerce instance.

Check the [API reference](./shipping-reference.md#get-an-oope-shipping-carrier-by-code) for more details.

<CodeBlock slots="heading, code" repeat="1" languages="javascript" />

#### Example usage

```javascript
try {
  const getResponse = await commerceClient.getOopeShippingCarrier("DPS");
  if (!getResponse.success) {
    return errorResponse(
      getResponse.statusCode,
      "Failed to retrieve shipping carrier",
    );
  }
  console.log("Retrieved shipping carrier details:", getResponse.message);
} catch (error) {
  return errorResponse(
    HTTP_INTERNAL_ERROR,
    "Error occurred while retrieving shipping carrier",
  );
}
```

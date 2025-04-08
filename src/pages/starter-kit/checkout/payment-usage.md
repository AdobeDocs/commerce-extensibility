---
title: Payment API JavaScript usage
description: Learn how to use the Payment API in the Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - Extensibility
---

# Payment API JavaScript usage

To call the Commerce REST endpoints, initialize the Adobe Commerce Client:

```javascript
const { getAdobeCommerceClient } = require("../lib/adobe-commerce");
const commerceClient = await getAdobeCommerceClient(process.env);
```

## Create a new payment method

`createOopePaymentMethod` creates a new out-of-process payment method with the necessary details such as `code`, `title`, and `configuration`.

Check the [API reference](./payment-reference.md#create-a-new-payment-method) for more details.

<CodeBlock slots="heading, code" repeat="1" languages="javascript" />

#### Example usage

```javascript
try {
  const createResponse = await commerceClient.createOopePaymentMethod({
    code: "method-1",
    title: "Method 1",
    description: "Description for Method 1",
    active: true,
    backend_integration_url: "https://example.com",
    stores: ["store-1", "store-2"],
    order_status: "processing",
    countries: ["US", "ES"],
    currencies: ["USD", "EUR"],
    custom_config: [{ key: "key1", value: "value1" }],
  });

  if (!createResponse.success) {
    return errorResponse(
      createResponse.statusCode,
      "Failed to create payment method",
    );
  }

  console.log("Created payment method:", createResponse.message);
} catch (error) {
  return errorResponse(
    HTTP_INTERNAL_ERROR,
    "Error occurred while creating payment method",
  );
}
```

## List all payment methods

`getOopePaymentMethods` retrieves a list of all out-of-process payment methods in the Adobe Commerce instance.

Check the [API reference](./payment-reference.md#list-all-payment-methods) for more details.

<CodeBlock slots="heading, code" repeat="1" languages="javascript" />

#### Example usage

```javascript
try {
  const listResponse = await commerceClient.getOopePaymentMethods();
  if (!listResponse.success) {
    return errorResponse(
      listResponse.statusCode,
      "Failed to list payment methods",
    );
  }
  console.log("List of payment methods:", listResponse.message);
} catch (error) {
  return errorResponse(
    HTTP_INTERNAL_ERROR,
    "Error occurred while listing payment methods",
  );
}
```

## Get an OOPE payment method by code

`getOopePaymentMethod` retrieves one out-of-process payment method by code from the Adobe Commerce instance.

Check the [API reference](./payment-reference.md#get-an-oope-payment-method-by-code) for more details.

<CodeBlock slots="heading, code" repeat="1" languages="javascript" />

#### Example usage

```javascript
try {
  const getResponse = await commerceClient.getOopePaymentMethod("method-1");
  if (!getResponse.success) {
    return errorResponse(
      getResponse.statusCode,
      "Failed to retrieve payment method",
    );
  }
  console.log("Retrieved payment method details:", getResponse.message);
} catch (error) {
  return errorResponse(
    HTTP_INTERNAL_ERROR,
    "Error occurred while retrieving payment method",
  );
}
```

## Retrieve an order by masked cart ID

`getOrderByMaskedCartId` retrieves order details from the Adobe Commerce instance using `maskedCartID`. This is typically used when the app builder application receives a webhook or event from the payment gateway.

This method uses the Adobe Commerce API [order search criteria](https://developer.adobe.com/commerce/webapi/rest/use-rest/performing-searches/#other-search-criteria).

**Payload parameters:**

| Parameter      | Type   | Description                                           |
| -------------- | ------ | ----------------------------------------------------- |
| `maskedCartId` | String | The cart ID from the payment method webhook or event. |

**Example usage:**

```javascript
try {
  const orderResponse =
    await commerceClient.getOrderByMaskedCartId(maskedCartId);
  if (!orderResponse.success) {
    const errMsg =
      orderResponse.statusCode === HTTP_NOT_FOUND
        ? "Order not found for the given maskedCartId."
        : "Unexpected error getting order by maskedCartId";
    return errorResponse(orderResponse.statusCode, errMsg);
  }
  console.log("Order details:", orderResponse.message);
} catch (error) {
  return errorResponse(
    HTTP_INTERNAL_ERROR,
    "Failed to fetch order due to an unexpected error",
  );
}
```

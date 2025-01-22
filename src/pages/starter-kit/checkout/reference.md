---
title: API method reference
description: Learn about the API method available in the Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - Extensibility
---

# API reference

To call the Commerce REST endpoints, initialize the Adobe Commerce Client:

```javascript
const { getAdobeCommerceClient } = require('../lib/adobe-commerce');
const commerceClient = await getAdobeCommerceClient(process.env);
```

## Create a new OOPE payment method

`createOopePaymentMethod` creates a new out-of-process payment method with the necessary details such as `code`, `title`, and `configuration`.

**Payload parameters:**

| Parameter                 | Type    | Description|
| ------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `code`                    | String  | Unique identifier for the payment method.|
| `title`                   | String  | Display name of the payment method.|
| `description`             | String  | Description of the payment method.|
| `active`                  | Boolean | Status indicating if the method is active.|
| `backend_integration_url` | String  | URL for backend integration, which is an App Builder URL.|
| `stores`                  | Array   | List of store codes that payment method is available for.|
| `order_status`            | String  | Initial [order status](https://experienceleague.adobe.com/en/docs/commerce-admin/stores-sales/order-management/orders/order-status) when using this method. Default is `pending`. |
| `countries`               | Array   | List of countries where the method is available.|
| `currencies`              | Array   | Currencies supported by the payment method.|
| `custom_config`           | Array   | Custom configuration settings for payment methods.|

<CodeBlock slots="heading, code" repeat="2" languages="javascript, javascript" />

#### Example usage

```javascript
try {
  const createResponse = await commerceClient.createOopePaymentMethod({
    code: 'method-1',
    title: 'Method 1',
    description: 'Description for Method 1',
    active: true,
    backend_integration_url: 'https://example.com',
    stores: ['store-1', 'store-2'],
    order_status: 'processing',
    countries: ['US', 'ES'],
    currencies: ['USD', 'EUR'],
    custom_config: [{ key: 'key1', value: 'value1' }],
  });

  if (!createResponse.success) {
    return errorResponse(createResponse.statusCode, 'Failed to create payment method');
  }

  console.log('Created payment method:', createResponse.message);
} catch (error) {
  return errorResponse(HTTP_INTERNAL_ERROR, 'Error occurred while creating payment method');
}
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

## List all payment methods

`getOopePaymentMethods` retrieves a list of all out-of-process payment methods in the Adobe Commerce instance.

<CodeBlock slots="heading, code" repeat="2" languages="javascript, javascript" />

#### Example usage

```javascript
try {
  const listResponse = await commerceClient.getOopePaymentMethods();
  if (!listResponse.success) {
    return errorResponse(listResponse.statusCode, 'Failed to list payment methods');
  }
  console.log('List of payment methods:', listResponse.message);
} catch (error) {
  return errorResponse(HTTP_INTERNAL_ERROR, 'Error occurred while listing payment methods');
}
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

## Get an OOPE payment method by code

`getOopePaymentMethod` retrieves one out-of-process payment method by code from the Adobe Commerce instance.

**Payload parameters:**

| Parameter | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| `code`    | String | Unique identifier for the payment method. |

<CodeBlock slots="heading, code" repeat="2" languages="javascript, javascript" />

#### Example usage

```javascript
try {
  const getResponse = await commerceClient.getOopePaymentMethod('method-1');
  if (!getResponse.success) {
    return errorResponse(getResponse.statusCode, 'Failed to retrieve payment method');
  }
  console.log('Retrieved payment method details:', getResponse.message);
} catch (error) {
  return errorResponse(HTTP_INTERNAL_ERROR, 'Error occurred while retrieving payment method');
}
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
  const orderResponse = await commerceClient.getOrderByMaskedCartId(maskedCartId);
  if (!orderResponse.success) {
    const errMsg =
      orderResponse.statusCode === HTTP_NOT_FOUND
        ? 'Order not found for the given maskedCartId.'
        : 'Unexpected error getting order by maskedCartId';
    return errorResponse(orderResponse.statusCode, errMsg);
  }
  console.log('Order details:', orderResponse.message);
} catch (error) {
  return errorResponse(HTTP_INTERNAL_ERROR, 'Failed to fetch order due to an unexpected error');
}
```

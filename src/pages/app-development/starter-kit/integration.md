---
title: Integrate runtime actions
description: Learn how to use runtime actions with Adobe Commerce Extensibility Starter Kit.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---

import IncomingCustomer from './code-samples/incoming-customer.md';
import IncomingCustomerGroup from './code-samples/incoming-customer-group.md';
import IncomingOrder from './code-samples/incoming-order.md';
import IncomingProduct from './code-samples/incoming-product.md';
import IncomingShipment from './code-samples/incoming-shipment.md';
import IncomingStock from './code-samples/incoming-stock.md';
import DataCustomer from './code-samples/data-customer.md';
import DataCustomerGroup from './code-samples/data-customer-group.md';
import DataOrder from './code-samples/data-order.md';
import DataProduct from './code-samples/data-product.md';
import DataShipment from './code-samples/data-shipment.md';
import DataStock from './code-samples/data-stock.md';

# Integrate runtime actions

The `create`, `update`, and `delete` runtime actions perform one of the following functions:

- [Notify the external application](#notify-the-external-application) - Notifies an external back-office application when an `<object>` is created, updated, or deleted in Adobe Commerce
- [Notify Commerce](#notify-adobe-commerce) - Notifies Adobe Commerce when an `<object>` is created, updated, or deleted in an external back-office application

![starter kit diagram](../../_images/starter-kit.png)

## Preprocessing and postprocessing

- Preprocessing data - Any preprocessing needed before calling the Adobe Commerce API can be implemented in the `preProcess` function in the `pre.js` file.
- Postprocess data - Any postprocessing needed after calling the Adobe Commerce API can be implemented in the `postProcess` function in the `post.js` file.

## Notify the external application

This runtime action is responsible for notifying the external back-office application when an `<object>` is created, updated, or deleted in Adobe Commerce.

### Incoming information

The information specified during [event registration](../../events/configure-commerce.md#subscribe-and-register-events) determines the incoming information.

The `order` runtime action requires the `created_at` and `updated_at` fields.

<CodeBlock slots="heading, code" repeat="4" languages="JSON, JSON, JSON, JSON" />

#### customer

```json
{
   "id": 1,
   "created_at":"2000-12-31 16:52:40",
   "updated_at":"2000-12-31 16:48:40"
}
```

#### customer_group

```json
{
  "customer_group_id": 6,
  "customer_group_code": "Group name code",
  "tax_class_id": 4,
  "tax_class_name": "Tax class name",
  "extension_attributes": {
    "exclude_website_ids":[]
  }
}
```

#### order

```json
{
  "real_order_id": "ORDER_ID",
  "increment_id": "ORDER_INCREMENTAL_ID",
  "items": [
    {
      "item_id": "ITEM_ID"
    }
  ],
  "created_at": "2000-01-01",
  "updated_at": "2000-01-01"
}
```

#### product

```json
{
   "created_at":"2023-11-24 16:52:40",
   "name":"Test product name",
   "sku":"2_4_7_TestProduct",
   "updated_at":"2023-11-29 16:48:55"
}
```

The `params` also specify the `event_code` and `event_id`.

### Payload transformation

If necessary, make any transformation changes necessary for the external back-office application's formatting in the `transformData` function in the `transformer.js` file.

### Preprocess data

Any preprocessing needed before calling the external back-office application API can be implemented in the `preProcess` function in the `pre.js` file.

### Connect to the back-office application

Define the connection information in the `sendData` function in the `sender.js` file.  Include all the authentication and connection information in the `sender.js` file or an extracted file outside `index.js`.

Parameters from the environment can be accessed from `params`. Add the necessary parameters in the `actions/<object>/commerce/actions.config.yaml` under `created -> inputs`, `updated -> inputs`, or `deleted -> inputs` as follows:

<CodeBlock slots="heading, code" repeat="3" languages="yaml, yaml, yaml" />

#### create

```yaml
created:
  function: commerce/created/index.js
  web: 'no'
  runtime: nodejs:16
  inputs:
    LOG_LEVEL: debug
    HERE_YOUR_PARAM: $HERE_YOUR_PARAM_ENV
  annotations:
    require-adobe-auth: true
    final: true
```

#### update

```yaml
updated:
  function: commerce/updated/index.js
  web: 'no'
  runtime: nodejs:16
  inputs:
    LOG_LEVEL: debug
    HERE_YOUR_PARAM: $HERE_YOUR_PARAM_ENV
  annotations:
    require-adobe-auth: true
    final: true
```

#### delete

```yaml
deleted:
  function: commerce/deleted/index.js
  web: 'no'
  runtime: nodejs:16
  inputs:
    LOG_LEVEL: debug
    HERE_YOUR_PARAM: $HERE_YOUR_PARAM_ENV
  annotations:
    require-adobe-auth: true
    final: true
```

## Notify Adobe Commerce

This runtime action is responsible for notifying Adobe Commerce when an `<object>` is created, updated, or deleted in the external back-office application.

### Incoming information

The incoming information depends on the external API.

<br></br>
<TabsBlock orientation="vertical" slots="heading, content" repeat="6"/>

#### `customer`

<IncomingCustomer/>

#### `customer_group`

<IncomingCustomerGroup/>

#### `order`

<IncomingOrder/>

#### `product`

<IncomingProduct/>

#### `shipment`

<IncomingShipment/>

#### `stock`

<IncomingStock/>

### Data validation

The incoming data is validated against a JSON schema defined in the `schema.json` file.

<br></br>
<TabsBlock orientation="vertical" slots="heading, content" repeat="6"/>

#### `customer`

<DataCustomer/>

#### `customer_group`

<DataCustomerGroup/>

#### `order`

<DataOrder/>

#### `product`

<DataProduct/>

#### `shipment`

<DataShipment/>

#### `stock`

<DataStock/>

### Payload transformation

If necessary, make any transformation changes necessary for the external back-office application's formatting in the `transformData` function in the `transformer.js` file.

### Interact with the Adobe Commerce API

The interaction with the Adobe Commerce API is defined in the `sendData` function in the `sender.js` file. This function delegates to the following methods and locations:

- `customer`
  - `createCustomer` - `actions/customer/commerceCustomerApiClient.js`
  - `updateCustomer` - `actions/customer/commerceCustomerApiClient.js`
  - `deleteCustomer` - `actions/customer/commerceCustomerApiClient.js`
- `customer_group`
  - `createCustomerGroup` - `actions/customer-group/commerceCustomerGroupApiClient.js`
  - `updateCustomerGroup` - `actions/customer-group/commerceCustomerGroupApiClient.js`
  - `deleteCustomerGroup` - `actions/customer-group/commerceCustomerGroupApiClient.js`
- `order`
  - `addComment` - `actions/order/commerceOrderApiClient.js`
- `product`
  - `createProduct` - `actions/product/commerceProductApiClient.js`
  - `updateProduct` - `actions/product/commerceProductApiClient.js`
  - `deleteProduct` - `actions/product/commerceProductApiClient.js`
- `shipment`
  - `createShipment` - `actions/order/commerceShipmentApiClient.js`
  - `updateShipment` - `actions/order/commerceShipmentApiClient.js`
- `stock`
  - `updateStock` - `actions/stock/commerceStockApiClient.js`

Parameters from the environment can be accessed from `params`. Add the necessary parameters in the `actions/<object>/external/actions.config.yaml` under `created -> inputs`, `updated -> inputs`, or `deleted -> inputs` as follows:

<CodeBlock slots="heading, code" repeat="3" languages="JSON, JSON, JSON" />

#### create

```yaml
created:
  function: created/index.js
  web: 'no'
  runtime: nodejs:16
  inputs:
    LOG_LEVEL: debug
    COMMERCE_BASE_URL: $COMMERCE_BASE_URL
    COMMERCE_CONSUMER_KEY: $COMMERCE_CONSUMER_KEY
    COMMERCE_CONSUMER_SECRET: $COMMERCE_CONSUMER_SECRET
    COMMERCE_ACCESS_TOKEN: $COMMERCE_ACCESS_TOKEN
    COMMERCE_ACCESS_TOKEN_SECRET: $COMMERCE_ACCESS_TOKEN_SECRET
  annotations:
    require-adobe-auth: true
    final: true
```

#### update

```yaml
updated:
  function: updated/index.js
  web: 'no'
  runtime: nodejs:16
  inputs:
    LOG_LEVEL: debug
    COMMERCE_BASE_URL: $COMMERCE_BASE_URL
    COMMERCE_CONSUMER_KEY: $COMMERCE_CONSUMER_KEY
    COMMERCE_CONSUMER_SECRET: $COMMERCE_CONSUMER_SECRET
    COMMERCE_ACCESS_TOKEN: $COMMERCE_ACCESS_TOKEN
    COMMERCE_ACCESS_TOKEN_SECRET: $COMMERCE_ACCESS_TOKEN_SECRET
  annotations:
    require-adobe-auth: true
    final: true
```

#### delete

```yaml
deleted:
  function: deleted/index.js
  web: 'no'
  runtime: nodejs:16
  inputs:
    LOG_LEVEL: debug
    COMMERCE_BASE_URL: $COMMERCE_BASE_URL
    COMMERCE_CONSUMER_KEY: $COMMERCE_CONSUMER_KEY
    COMMERCE_CONSUMER_SECRET: $COMMERCE_CONSUMER_SECRET
    COMMERCE_ACCESS_TOKEN: $COMMERCE_ACCESS_TOKEN
    COMMERCE_ACCESS_TOKEN_SECRET: $COMMERCE_ACCESS_TOKEN_SECRET
  annotations:
    require-adobe-auth: true
    final: true
```

## Expected responses

If the runtime action works correctly, a `200` response indicates the event is complete.

```javascript
return {
    statusCode: 200
}
```

If the validation fails, the runtime action will respond with a `400` error, which prevents message processing from being retried by Adobe I/O.

```javascript
return {
    statusCode: 400,
    error: errors
}
```

The runtime action will respond with a `500` error if there is an issue with the application integration. You can send an array of errors, so the consumer can log the information and trigger the retry mechanism.

```javascript
return {
    statusCode: 500,
    error: errors
}
```

## `stock` runtime action best practices

The `stock` synchronization that connects a third-party system and Adobe Commerce uses the Adobe Commerce [inventory/source-items](https://adobe-commerce.redoc.ly/2.4.6-admin/tag/inventorysource-items/#operation/PostV1InventorySourceitems) REST endpoint to process the stock updates. The REST endpoint is included in the Starter Kit as an example implementation and depending on the integration's nonfunctional requirements, we suggest the following best practices:

- Payload size limit enforced by Adobe I/O Runtime - The [maximum `payload` size](https://developer.adobe.com/runtime/docs/guides/using/system_settings/) in Adobe I/O Runtime is not configurable. If an event carries a payload above the limit, for example, when dealing with a full stock synchronization event, it will cause an error. To prevent this situation, we recommend modifying the third-party system to generate event payloads within the `payload` limits.

- Timeouts during the event processing - The [execution time range](https://developer.adobe.com/runtime/docs/guides/using/system_settings/) for a runtime action in Adobe I/O Runtime differs for `blocking` and `non-blocking` calls, with the limit being higher for `non-blocking` calls.
  - You can resolve timeouts in runtime action executions depending on their cause:
    - If the timeout is caused by a slow or busy Adobe Commerce REST API call, try using the [asynchronous web endpoints](https://developer.adobe.com/commerce/webapi/rest/use-rest/asynchronous-web-endpoints/). This approach will cause the Commerce API to respond quickly because the data is processing asynchronously.
    - If the timeout is caused by a long-running runtime action, for example, an action that interacts with multiple APIs sequentially and the total processing time exceeds the limits, we recommend using the [journaling approach](https://developer.adobe.com/app-builder/docs/resources/journaling-events/) for consuming events.

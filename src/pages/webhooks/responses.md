---
title: Webhooks responses and logging
description: Learn how to process webhook responses and review logged errors.
keywords:
  - Extensibility
---

# Webhook responses and logging

Currently, Adobe Commerce webhooks support responses in JSON format only. The response may be a single operation or an array of operations to be executed afterward.
Each operation must contain some required fields based on the desired operation.

Exceptions and notices are logged in the `<installation_directory>/var/log/system.log` file.

## Responses

The endpoint is expected to return a `200` response and a JSON object or array of objects that indicates the result of the operation. Each operation object can contain the list of fields based on the operation (`op`) which should be performed.

Adobe Commerce webhooks support the following operations:

Operation | Description
--- | ---
`success` | The process that triggered the original event continues without any changes.
`exception` | Causes Commerce to terminate the process that triggered the original event.
`add` | Updates the arguments in the original event by adding data described in the operation
`replace` | Replaces argument values in the original event, based on the response.
`remove` | Removes values or nodes from the arguments in the original event by the provided path

### Success operation

The `success` operation is returned when changes are not needed. The process that triggered the original event continues without any changes.

The response of a successful request is as follows:

```json
{
  "op": "success"
}
```

### Exception operation

The `exception` operation causes Commerce to terminate the process that triggered the original event. The exception is logged in `<installation_directory>/var/log/system.log`.

Field | Type | Description
--- | --- | ---
`op` | Required | Contains `exception`.
`class` | Optional | Specifies the exception class. If `class` is not set, `\Magento\Framework\Exception\LocalizedException` will be thrown.
`message` | Optional | Specifies the exception message. If this field is not explicitly set, then the message defined in the `fallbackErrorMessage` configuration field will be returned. If `fallbackErrorMessage` is not set, the system default error message will be returned.

If an error occurs, the response is similar to the following:

```json
{
  "op": "exception",
  "class": "Path\\To\\Exception\\Class",
  "message": "The product cannot be added to the cart because it is out of the stock"
}
```

### Add operation

The `add` operation causes Commerce to add the provided `value` to the provided `path` to the triggered event arguments

Field | Type     | Description
--- |----------| ---
`op` | Required | Contains `add`.
`path` | Required | Specifies the path at which the `value` should be added to the triggered event arguments.
`value` | Required | Specifies the value to be added. This can be as a single value or in an array format.
`instance` | Optional | Specifies the `DataObject` class name to create, based on the  `value` and added to the provided `path`. Use this field for cases when the object should be added in provided path.

For example, we want to add a new shipping method to the triggered event result payload.
The result is an array of `Magento\Quote\Model\Cart\ShippingMethod` objects:

```php
$result = [
    0 => {Magento\Quote\Model\Cart\ShippingMethodInterface},
    1 => {Magento\Quote\Model\Cart\ShippingMethodInterface}
];
```

To add a new shipping method to that result, the response from the webhook would look like:

```json
{
  "op": "add",
  "path": "result",
  "value": {
    "data": {
      "amount": "5",
      "base_amount": "5",
      "carrier_code": "newshipmethod",
      "carrier_title": "Webhook new shipping method",
    }
  },
  "instance": "Magento\\Quote\\Api\\Data\\ShippingMethodInterface"
}
```

Based on this operation, the new instance of `Magento\Quote\Model\Cart\ShippingMethodInterface` will be created and added to the result array of shipping methods.

```php
$result = [
    0 => {Magento\Quote\Model\Cart\ShippingMethodInterface},
    1 => {Magento\Quote\Model\Cart\ShippingMethodInterface},
    2 => {Magento\Quote\Model\Cart\ShippingMethodInterface}
];
```

### Replace operation

The `replace` operation causes Commerce to replace a value in triggered event arguments for the provided `path`

Field | Type     | Description
--- |----------| ---
`op` | Required | Contains `replace`.
`path` | Required | Specifies the path at which the value should be replaced with the provided `value`.
`value` | Required | Specifies the replacement value. This can be as a single value or in an array format.
`instance` | Optional | Specifies the `DataObject` class name to create, based on the  `value` and added to the provided `path`.

The following example replaces a nested element in the triggered event result payload:

```php
$result = [
    'shipping_methods' => [
        'shipping_method_one' => [
            'amount' => 5
        ]           
    ]   
];
```

The response from the webhook endpoint:

```json
{
  "op": "replace",
  "path": "result/shipping_methods/shipping_method_one/amount",
  "value": 6
}
```

The updated result will be modified to:

```php
$result = [
    'shipping_methods' => [
        'shipping_method_one' => [
            'amount' => 6
        ]           
    ]   
];
```

### Remove operation

The `remove` operation causes Commerce to remove a value or node in triggered event arguments by the provided `path`

Field | Type     | Description
--- |----------| ---
`op` | Required | Contains `remove`.
`path` | Required | Specifies the path at which the value should be removed.

The following example removes element `key2` from the triggered event result payload:

```php
$result = [
    'key1' => 'value1', 
    'key2' => 'value2', 
    'key3' => 'value3', 
];
```

The response from the webhook endpoint:

```json
{
  "op": "remove",
  "path": "result/key2"
}
```

The updated result will be modified to:

```php
$result = [
    'key1' => 'value1', 
    'key3' => 'value3', 
];
```

## Logging

The following table describes webhook logging activity. Each hook can be configured to have its own soft and hard timeout values.

| Case | Logging activity
| --- | --- |
A hook was executed within the soft and hard time limits with a 2xx response code. | None
An optional hook was executed with a response code other than 2xx within the soft and hard time limits. | Add error log entry
A required hook was executed with a response code other than 2xx within the soft and hard time limits. | Add error log entry<br/>Throw an exception
An optional hook is aborted due to reaching the hard timeout limit. | Add error log entry
A required hook is aborted due to reaching the hard timeout limit. | Add error log entry<br/>Throw an exception
The execution time of hook exceeds the soft timeout limit. |   Add a notice to the error log

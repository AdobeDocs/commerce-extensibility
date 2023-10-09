---
title: Webhooks responses and logging
description: Learn how to process webhook responses and review logged errors.
keywords:
  - Extensibility
---

# Webhook responses and logging

Currently, Adobe Commerce webhooks only support two responses: `success` and `exception`. Responses that require additional processing, such as parsing the results of a GET response, are not supported.

Exceptions and notices are logged in the `<installation_directory>/var/log/system.log` file.

## Responses

The endpoint is expected to return a `200` response and a JSON object that indicates the result of the operation. The object can contain the following fields:

Field | Description
--- | ---
`op` | The status of the operation: either `success` or `exception`.
`class` | If the `op` status is `exception`, optionally specifies the exception class. If `class` is not set, the `\Magento\Framework\Exception\LocalizedException` will be thrown.
`message` |  If the `op` status is `exception`, optionally specifies the exception message. If this field is not explicitly set, then the message defined in the `fallbackErrorMessage` configuration field will be returned. If `fallbackErrorMessage` is not set, the system default error message will be shown.

The response of a successful request is as follows:

```json
{
  "op": "success"
}
```

The process that triggered the original event continues without any changes.

If an error occurs, the response is similar to the following:

```json
{
  "op": "exception",
  "class": "Path\\To\\Exception\\Class",
  "message": "The product can not be added to the cart as it is out of the stock"
}
```

The `exception` operation causes Commerce to terminate the process that triggered the original event. The exception is logged in `<installation_directory>/var/log/system.log`.

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

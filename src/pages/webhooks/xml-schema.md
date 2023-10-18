---
title: Webhooks configuration reference
description: Provides reference information for constructing a webhooks.xml file.
keywords:
  - Extensibility
---

# Webhook configuration reference

Webhooks are configured in a `webhooks.xml` file. This file can be placed in the system `<install_directory>/app/etc` directory or in the `etc` directory of an enabled Adobe Commerce module.

Run the `bin/magento webhooks:list` command  to determine if the webhooks you create in this file register correctly. The webhook name will be displayed in the list of registered webhooks.

A maximal `webhooks.xml` file has the following structure:

```tree
|__ config
    |__ method
        |__ hooks
            |__ batch
                |__ hook
                    |__ headers
                    |   |__ header
                    |__ fields
                        |__ field
```

[Configure hooks](hooks.md) provides examples of fully-defined hooks.

## `config` attributes

The `config` element must contain the following text:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_AdobeCommerceWebhooks:etc/webhooks.xsd">
...
</config>
```

## `method` element

The `method` element must define the webhook `name` and `type`. The combination of method name and type must be unique across the system.

| Attribute | Type  | Description | Is required | Default |
|---|---|---|---|
| `name`    | String | The webhook code name. The value must be in the form `<type>.<webhook_name>`, where `type` is either `observer` or `plugin`, and `webhook_name` matches a valid Commerce event name. Use the `bin/magento webhooks:list:all` command to display a list of possible webhooks. | true        | Not applicable     |
| `type`    | String | Specifies whether the webhook should be executed `before` or `after` the original action.  | true        | Not applicable     |

## `hooks` element

The `hooks` element is required. It does not contain any attributes, but it must contain one or more `batch` elements.

## `batch` element

The `batch` element sets the order in which multiple webhooks are executed. All hooks within a batch are sent in parallel.

| Attribute | Type | Description                     | Is required | Default |
|-----------|------|---------------------------------|-------------|---------|
| `order`   | Int  | Sort order for batch execution. | false        | Not applicable     |

## `hook` element

The `hook` element defines the HTTP request to the remote server.

| Attribute | Type   | Description  | Is required | Default |
|---|---|---|---|---|
| `name` | String | A hook name that is unique within a batch. | true        | Not applicable     |
| `url` | String | The HTTP endpoint to send the request for processing. | true        | Not applicable     |
| `method` | String | The HTTP method, such as POST or PUT, that invokes the hook. | false       | POST    |
| `priority` | Int    | The priority of the merging hook results in the batch.  | false       | 0       |
| `required` | Boolean   | Specifies whether hook execution is required or optional. When set to `false` (optional), if the hook fails to execute, the failure is logged and subsequent hooks continue to be processed. When `true`, a failure terminates the process. | false       | true    |
| `timeout` | Int    | A hard timeout limit (milliseconds) for the request. Requests exceeding this timeout are aborted and logged. | false       | 0       |
| `softTimeout`| Int    | A soft timeout limit (milliseconds) for the request. Requests exceeding this timeout are logged for debugging purposes. | false       | Not applicable     |
| `fallbackErrorMessage` | Int    | The error message to return when the hook fails. | false       | Not applicable     |
| `remove` | Boolean   | Indicates whether to skip a removed hook during the batch execution. | false       | false   |
| `ttl` | Int    | A cache ttl (in seconds) for requests with the same url, body, and headers.  | false       | 0       |
| `headers` | Array  | A set of HTTP headers to send with the request. | false       | []      |
| `fields` | Array  | A set of fields to include in the hook payload. If not set, the entire payload will be sent. | false       | []      |

### `headers` and `header` elements

A `headers` element is optional and can contain one or more `header` elements. Each `header` definition creates an HTTP header to be sent in the remote server request.

| Attribute | Type   | Description  | Is required | Default |
|---|---|---|---|---|
| `name`     | String  | The header name, in the same form as it will be sent. For example, `Authorization`. Specify the value, such as `Bearer: <token>` in the body of the &lt;header> element. | false       | Not applicable     |
| `resolver` | String  | The resolver class that appends headers dynamically.         | false       | Not applicable     |
| `remove`   | Boolean | Set to `true` to remove the header from the request.           | false       | false   |

## `fields` and `field` elements

A `fields` element is optional and can contain one or more `field` elements. The `fields` element provides the ability to limit the payload of a webhook to only those fields defined in the individual `field` definitions. [Define the hook body](hooks.md#define-the-hook-body) shows a fully-constructed hook.

| Attribute | Type   | Description  | Is required | Default |
|---|---|---|---|---|
| `name` | String  | The path to the field to include in the transmitted webhook, such as `product.sku`.  | true        | Not applicable     |
| `source` | String  | The path to the value in the default webhook. If not set, the `name` is used as source. | false       | Not applicable     |
| `converter` | String  | A class that transforms the value of a field, such as from integer to string. | false       | Not applicable     |
| `remove` | Boolean | Set to `true` to remove the field from the payload. | false | false   |

---
title: Adobe Commerce Webhooks Overview
description: An architectural overview of Adobe Commerce Webhooks.
keywords:
  - Extensibility
---

# Adobe Commerce Webhooks Overview

To configure webhooks you need to create a `webhooks.xml` file in any `etc/` directory of any enabled Adobe Commerce module.
To check if webhooks registered correctly run the `bin/magento webhooks:list` command to see if it's present in the list of the registered webhooks.

## Example of single webhook executed before adding product to the cart:

For example, you need to check product stock in the external service before adding the product to the card.
For this action, you can create a webhook on method `observer.checkout_cart_product_add_before` which will be executed before execution of observer `checkout_cart_product_add_before`.

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_AdobeCommerceWebhooks:etc/webhooks.xsd">
    <method name="observer.checkout_cart_product_add_before" type="before">
        <hooks>
            <batch>
                <hook name="validate_stock" url="https://example.com/product-validate-stock" timeout="2000" softTimeout="200" required="true" fallbackErrorMessage="Can't add the product to the cart right now">
                    <headers>
                        <header name="custom-header-one">header value one</header>
                        <header name="custom-header-two">header value two</header>
                    </headers>
                    <fields>
                        <field name='product.name' source='data.product.name' />
                        <field name='product.category_ids' source='data.product.category_ids' />
                        <field name='product.sku' source='data.product.sku' />
                    </fields>
                </hook>
            </batch>
        </hooks>
    </method>
</config>
```

In the example above the payload based on `fields` configuration will be sent to the registered URL with added headers from the `headers` section.
The payload:

```json
{
  "product": {
    "name": "simple product 1",
    "sku": "simple-product-1",
    "category_ids": [1, 2, 3]
  }
}
```

The headers:

```php
[
    'custom-header-one' => 'header value one',
    'custom-header-two' => 'header value two',
]
```

The endpoint should return 200 response with desired operations which should be executed on Adobe Commerce side. At the moment two operations are supported

- `success` - continue code execution without any changes
- `exception` - the code execution should be terminated with provided error message

Example of the exception response:

```json
{
  "op": "exception",
  "class": "Path\\To\\Exception\\Class",
  "message": "The product can not be added to the cart as it is out of the stock"
}
```

The `class` and `message` are optional, if not set the LocalizedException will be thrown with the `fallbackErrorMessage` or default message if `fallbackErrorMessage` is not set.

Example of the success response:

```json
{
  "op": "success"
}
```

## Using environment or configuration variables

It's not recommended to store secrets or other sensitive data in the `webhooks.xml` file, to avoid this is recommended to use environment or configuration variables:

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_AdobeCommerceWebhooks:etc/webhooks.xsd">
    <method name="observer.checkout_cart_product_add_before" type="before">
        <hooks>
            <batch>
                <hook name="validate_stock" url="{env:APP_VALIDATE_STOCK_URL}/product-validate-stock" timeout="2000" softTimeout="200" required="true" fallbackErrorMessage="Can't add the product to the cart right now">
                    <headers>
                        <header name="Authorization">Bearer: {env:APP_VALIDATE_STOCK_AUTHORIZATION_TOKEN}</header>
                        <header name="api-key">{config:path/to/api-key}</header>
                    </headers>
                </hook>
            </batch>
        </hooks>
    </method>
</config>
```

In this example the hook url will be formed by combining environment variable `APP_VALIDATE_STOCK_URL` with `/product-validate-stock`.
It can be useful for developing on different environment such as `stage` and `prod` as hook url can be different for different environment types.
The headers will contain two records:

- `Authorization` - Bearer: + value from environment variable `APP_VALIDATE_STOCK_AUTHORIZATION_TOKEN`
- `api-key` - Value from the Adobe Commerce configuration by path `path/to/api-key`

## Dynamic header resolver

In some cases it's not convenient to store secrets in environment variable as they can expire or for some other reasons.
For such situations the dynamic header resolver can be used.
To create your own resolver you need to create a new class that implements `Magento\AdobeCommerceWebhooks\Model\HeaderResolverInterface`.

```php
<?php
declare(strict_types=1);
 
namespace Magento\WebhookModule\Model;

...
 
class AddProductToCartResolver implements HeaderResolverInterface
{
    public function __construct(
        private TokenGenerator $tokenGenerator,
        private CustomConfig $customConfig,
    ) {
    }
 
    /**
     *  Returns an array of custom headers
     * 
     * @return array
     */
    public function getHeaders(): array
    {
        return [
            'Authorization' => 'Bearer ' . $this->tokenGenerator->getToken(),
            'Api-key' => $this->customConfig->getApiKey(),
            'secret-key' => $this->customConfig->getSecretKey(),
        ];    
    }
}
```

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_AdobeCommerceWebhooks:etc/webhooks.xsd">
    <method name="observer.checkout_cart_product_add_before" type="before">
        <hooks>
            <batch>
                <hook name="validate_stock" url="{env:APP_VALIDATE_STOCK_URL}/product-validate-stock" timeout="2000" softTimeout="200" required="true" fallbackErrorMessage="Can't add the product to the cart right now">
                    <headers>
                        <header resolver="Magento\WebhookModule\Model\AddProductToCartResolver" />
                    </headers>
                </hook>
            </batch>
        </hooks>
    </method>
</config>
```

## Fields

The payload for the webhook can be huge, usually it requires only few fields to perform the desired operation on the endpoint side.
You can specify list of desired fields for each of your configured webhooks:

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_AdobeCommerceWebhooks:etc/webhooks.xsd">
    <method name="observer.checkout_cart_product_add_before" type="before">
        <hooks>
            <batch>
                <hook name="validate_stock" url="https://example.com/product-validate-stock" timeout="2000" softTimeout="200" required="true" fallbackErrorMessage="Can't add the product to the cart right now">
                    <fields>
                        <field name='product.name' source='data.product.name' />
                        <field name='product.sku' source='data.product.sku' />
                    </fields>
                </hook>
            </batch>
        </hooks>
    </method>
</config>
```

For this example the payload will be reduced to the next structure:

```json
{
  "product": {
    "name": "simple product 1",
    "sku": "simple-product-1"
  }
}
```

The source argument is optional, and you can specify the source directly in the name

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_AdobeCommerceWebhooks:etc/webhooks.xsd">
    <method name="observer.checkout_cart_product_add_before" type="before">
        <hooks>
            <batch>
                <hook name="validate_stock" url="https://example.com/product-validate-stock" timeout="2000" softTimeout="200" required="true" fallbackErrorMessage="Can't add the product to the cart right now">
                    <fields>
                        <field name='data.product.name' />
                        <field name='data.product.sku' />
                    </fields>
                </hook>
            </batch>
        </hooks>
    </method>
</config>
```

But in this case the structure of the payload will be:

```json
{
  "data": {
    "product": {
      "name": "simple product 1",
      "sku": "simple-product-1"
    }
  }
}
```

### Fields convertors

If the value in the payload has not desired format you can use convertors class to convert value.
For example, the status of the order has a numeric value but on the hook endpoint there is no information about numeric statuses, and you want to convert the numeric value to string representation before sending the payload.

```xml
<fields>
    <field name='order.id' source='data.order.id' />
    <field name='order.status' source='data.order.status' converter="Path/To/The/Converter/Class" />
</fields>
```

All convertor class Must implement `Magento\AdobeCommerceWebhooks\Model\Filter\Converter\FieldConverterInterface`.

### Context fields

You can add to the webhook payload values from the application context:

```xml
<fields>
    <field name="customer.entity_id" source="data.customer.entity_id" />
    <field name="customer.customer_email" source="context_customer_session.customer.email" />
</fields>
```

In this example the `customer.customer_email` will be set to the next value `Magento\Customer\Model\Session::getCustomer()::getEmail()`.
If the value is not exists or can't be processed the appropriate message will be logged and the hook execution won't be interrupted.

The list of supported contexts:

| Context                     | Context class                                     |
|-----------------------------|---------------------------------------------------|
| `context_checkout_session`  | Magento\Checkout\Model\Session                    |
| `context_customer_session`  | Magento\Customer\Model\Session                    |
| `context_registry`          | Magento\Framework\Registry                        |
| `context_application_state` | Magento\Framework\App\State                       |
| `context_scope_config`      | Magento\Framework\App\Config\ScopeConfigInterface |
| `context_http_request`      | Magento\Framework\App\Request\Http                |
| `context_staging`           | Magento\Staging\Model\VersionManager              |

## Operations

Operations it's list of action that should be executed based on the response from webhook.
The webhook should return response with code 200 and the operation which should be executed.
!!!(In the future releases the response can contain multiple operations, but for now it's just `success` or `exception`)

### Exception

The exception operation is used to terminate the code execution on Adobe Commerce side.
The example of exception operation:

```json
{
  "op": "exception",
  "class": "Path\\To\\Exception\\Class",
  "message": "The product can not be added to the cart as it is out of the stock"
}
```

- `op`: exception
- `class`: The exception class, the value is optional, if not set the `\Magento\Framework\Exception\LocalizedException` will be thrown.
- `message`: The exception message, the value is optional, if not set the `fallbackErrorMessage` will be shown, if `fallbackErrorMessage` is not set the default error message will be shown.

### Success

The success operation is used to inform Adobe Commerce that no action should be performed.

```json
{
  "op": "success"
}
```

- `op`: exception
- `class`: The exception class, the value is optional, if not set the `\Magento\Framework\Exception\LocalizedException` will be thrown
- `message`: The exception message, the value is optional, if not set the `fallbackErrorMessage` will be shown, if `fallbackErrorMessage` is not set the default error message will be shown.

## XML Schema

### Method attributes:

| Attribute | Type   | Description                                                                                 | Is required | Default |
|-----------|--------|---------------------------------------------------------------------------------------------|-------------|---------|
| `name`    | String | Webhook code, the list of webhooks can be found in `bin/magento webhooks:list:all` command. | true        | n/a     |
| `type`    | String | When the webhook should be executed [before, after] original action.                        | true        | n/a     |

### Batch attributes:

| Attribute | Type | Description                     | Is required | Default |
|-----------|------|---------------------------------|-------------|---------|
| `order`   | Int  | Sort order for batch execution. | true        | n/a     |

### Hook attributes:

| Attribute              | Type   | Description                                                                                                                                                                                                 | Is required | Default |
|------------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|---------|
| `name`                 | String | A unique name of hook within the hooks batch.                                                                                                                                                               | true        | n/a     |
| `url`                  | String | An endpoint URL is an HTTP endpoint where a request with a specific payload will be sent.                                                                                                                   | true        | n/a     |
| `method`               | String | HTTP method that should be used to invoke a hook.                                                                                                                                                           | false       | POST    |
| `headers`              | Array  | Additional HTTP headers within the request.                                                                                                                                                                 | false       | []      |
| `fields`               | Array  | Fields to be added to the hook payload. If not set all payload will be sent.                                                                                                                                | false       | []      |
| `priority`             | Int    | The priority of the merging hook results in the batch.                                                                                                                                                      | false       | 0       |
| `required`             | Bool   | Sets whenever the hook should be required or optional. Optional hook execution failure is logged and the process or the batches of hooks continues. Required hook execution failure terminates the process. | false       | true    |
| `timeout`              | Int    | A hard timeout limit (milliseconds) for the request. Requests exceeding this timeout will be aborted with errors in the logs                                                                                | false       | 0       |
| `softTimeout`          | Int    | A soft timeout limit (milliseconds) for the request. Requests exceeding this timeout will be logged for debugging purposes.                                                                                 | false       | n/a     |
| `fallbackErrorMessage` | Int    | The error message that will be used in case of failed hooks execution.                                                                                                                                      | false       | n/a     |
| `remove`               | Bool   | Removed hook is skipped during the batch execution.                                                                                                                                                         | false       | false   |

#### Hook fields attributes:

| Attribute   | Type    | Description                                                                           | Is required | Default |
|-------------|---------|---------------------------------------------------------------------------------------|-------------|---------|
| `name`      | String  | The field name or path of the value.                                                  | true        | n/a     |
| `source`    | String  | The path to the value in the payload. If not set the `name` is used as source.        | false       | n/a     |
| `converter` | String  | A class that is used to convert the value of the field before sending to the webhook. | false       | n/a     |
| `remove`    | Boolean | Set to true to remove the field from the payload.                                     | false       | false   |

#### Hook headers attributes:

| Attribute  | Type    | Description                                                  | Is required | Default |
|------------|---------|--------------------------------------------------------------|-------------|---------|
| `name`     | String  | The header name will be in the same form as it will be sent. | false       | n/a     |
| `resolver` | String  | The resolver class that appends headers dynamically.         | false       | n/a     |
| `remove`   | Boolean | Set to true to remove the header from the request.           | false       | false   |

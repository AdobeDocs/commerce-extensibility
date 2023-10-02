---
title: Webhook headers and fields
description: Learn how to create a webhook.xml file be reviewing example files.
keywords:
  - Extensibility
---

# Webhook headers and fields

Although the `method` element of the `webhooks.xml` file defines webhook name and type, the majority of webhook configuration occurs within the `headers` and `fields` elements. Each individual `header` element defines an HTTP header key/value pair, while the individual `field` elements define what data is transmitted to the external server.

## Define request headers

### Environment or configuration variables

Secrets and other sensitive data should not be stored in the `webhooks.xml` file. Instead, use environment or configuration variables to relay this information.

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

In this example, the hook URL is formed by concatenating the `APP_VALIDATE_STOCK_URL` environment variable and the partial path `/product-validate-stock`. This practice can be useful for developing in different environments, such as `stage` and `prod`, when the hook URLs are different.

The headers contain two records:

Name | Value
--- | ---
`Authorization` | `Bearer:` and the value of the `APP_VALIDATE_STOCK_AUTHORIZATION_TOKEN` environment variable.
`api-key` | Value from the Adobe Commerce configuration to the file containing the key (`path/to/api-key`).

### Dynamic header resolvers

You might not want to store secrets that expire in environment variables. In these cases, create a dynamic header resolver to manage these values.

To create your own resolver, define a new class that implements `Magento\AdobeCommerceWebhooks\Model\HeaderResolverInterface`.

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

Point to the `AddProductToCartResolver` class in the `header.resolver` attribute.

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

## Define the webhook body

Defining the webhook to send to the remote server requires knowledge of the structure of the event that triggers the webhook.

### Fields

The payload for the webhook can be huge, but often, you only need to transmit a few fields to perform  the desired operation on the remote server.
You can specify a list of desired fields for each of your configured webhooks:

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

### Field converters

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
    <field name="customer.customer_email" source="context_customer_session.get_customer.get_email" />
</fields>
```

In this example the `customer.customer_email` will be set to `Magento\Customer\Model\Session::getCustomer()::getEmail()`. If the value does not exist or cannot be processed, the appropriate message will be logged, and the hook execution will not be interrupted.

You can also specify the string arguments to use when accessing the application context. Provide these arguments within curly braces and delimit them with colons, if there are multiple, as shown below:

```xml
<fields>
    <field name="config_value" source="context_scope_config.get_value{value/path:default}" />
</fields>
```

The following example sets `config_value` to the value of `Magento\Framework\App\Config\ScopeConfigInterface::getValue('value/path', 'default')`.

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

## Webhook responses

The endpoint is expected to return a 200 response and a JSON object that indicates the result of the operation. The object can contain the following fields:

Field | Description
--- | ---
`op` | The status of the operation. Must contain either `success` or `exception`.
`class` | If the `op` status is `exception`, optionally specifies the exception class. If not set, the `\Magento\Framework\Exception\LocalizedException` will be thrown.
`message` |  If the `op` status is `exception`, optionally specifies the exception message. If not set, then the message defined in the `fallbackErrorMessage` configuration field will be returned. If `fallbackErrorMessage` is not set, the system default error message will be shown.

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

The `exception` operation causes Commerce to terminate the process that triggered the original event.

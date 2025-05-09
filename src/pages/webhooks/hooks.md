---
title: Configure hooks
description: Learn how to configure hooks.
keywords:
  - Extensibility
---

# Configure hooks

A hook defines a request to a remote server. The `hook` element of the `webhooks.xml` file describes the communication parameters, including the URL of the remote service to execute, HTTP method, and timeout information. Additional configuration occurs within the `headers` and `fields` elements. Each individual `header` element defines an HTTP header key/value pair, while the individual `field` elements define what data is transmitted to the external server.

The [webhook configuration reference](xml-schema.md) describes each element in detail.

## Define the connection

The following hook definition includes the hook name, the destination URL, and timeout information. The `fallbackErrorMessage` will be written to the error log and can be displayed on the storefront.

```xml
<hook name="validate_stock" url="{env:APP_VALIDATE_STOCK_URL}/product-validate-stock"
timeout="2000" softTimeout="200" fallbackErrorMessage="Can't add the product to the cart right now">`
```

The hook URL is formed by concatenating the `APP_VALIDATE_STOCK_URL` environment variable and the partial path `/product-validate-stock`. This practice is useful for developing in different environments, such as those for staging and production, where the hook URLs are different.

## Define request headers

You will typically need to send authorization tokens and other connection parameters in the headers of your remote request. Secrets and other sensitive data should not be stored in the `webhooks.xml` file. Instead, use environment or configuration variables to relay this information.

```xml
<hook name="validate_stock" url="{env:APP_VALIDATE_STOCK_URL}/product-validate-stock" timeout="2000" softTimeout="200" required="true" fallbackErrorMessage="Can't add the product to the cart right now">
    <headers>
        <header name="Authorization">Bearer: {env:APP_VALIDATE_STOCK_AUTHORIZATION_TOKEN}</header>
        <header name="api-key">{config:path/to/api-key}</header>
    </headers>
</hook>
```

The `x-adobe-commerce-request-id` is added automatically to each request and is used to track the request in the system. You can filter logs by this ID to find all logs related to a specific request.

This example defines two headers:

Name | Value
--- | ---
`Authorization` | `Bearer:` and the value of the `APP_VALIDATE_STOCK_AUTHORIZATION_TOKEN` environment variable.
`api-key` | Value from the Adobe Commerce configuration to the file containing the key (`path/to/api-key`).

### Dynamic header resolvers

Instead of storing secrets that expire in environment variables, you can create a dynamic header resolver to manage these values. To create your own resolver, define a new class that implements `Magento\AdobeCommerceWebhooks\Model\HeaderResolverInterface`, as shown below.

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
<hook name="validate_stock" url="{env:APP_VALIDATE_STOCK_URL}/product-validate-stock" timeout="2000" softTimeout="200" required="true" fallbackErrorMessage="Can't add the product to the cart right now">
    <headers>
        <header resolver="Magento\WebhookModule\Model\AddProductToCartResolver" />
    </headers>
</hook>
```

## Define the hook body

The payload for a hook can be large, but in many cases you only need to transmit a few fields to perform the desired operation on the remote server.

Defining the hook requires knowledge of the structure of the original event and the requirements of the remote call. You can use the `bin/magento webhooks:info <webhook-name>` [command](./commands.md#display-the-payload-of-a-webhook) to return the default payload of a webhook.

Imagine that the command returned a Commerce webhook with the following structure:

```json
{
    "data": {
        "product": {
            "name": "string",
            "sku": "string",
            "qty": "float"
        }
    }
}
```

The webhook contains a top-level `data` object, and a second-level `product` object with several fields. However, your remote application expects a payload with the following structure:

```json
{
    "product": {
        "name": "string",
        "sku": "string",
        "quantity": "float"
    }
}
```

To transmit this object to the remote application, you will need to remove the `data` object from the payload and rename `qty` to `quantity`. The `source` configuration attribute specifies the full path of a Commerce webhook field, while the `name` attribute defines the full path of the field to transmit. If the two values are identical, then you can omit the `source` attribute.

The following example configures the webhook described above.

```xml
<hook name="validate_stock" url="https://example.com/product-validate-stock" timeout="2000" softTimeout="200" required="true" fallbackErrorMessage="Can't add the product to the cart right now">
    <fields>
        <field name='product.name' source='data.product.name' />
        <field name='product.sku' source='data.product.sku' />
        <field name='product.quantity' source='data.product.qty' />
    </fields>
</hook>
```

If the default payload of a webhook contains an array of objects, use the following construction to select fields from that array:

```text
<object_name>[].<field_name>
```

For example, the payload of the `plugin.magento.quote.api.shipment_estimation.estimate_by_extended_address` event contains a top-level `results[]` array. The array contains details about two individual shipping estimates.

```json
{
    "subject": [],
    "result": [
        {
            "carrier_code": "tablerate",
            "method_code": "bestway",
            "carrier_title": "Best Way",
            "method_title": "Table Rate",
            "amount": 15,
            "base_amount": 15,
            "available": true,
            "error_message": "",
            "price_excl_tax": 15,
            "price_incl_tax": 15
        },
        {
            "carrier_code": "flatrate",
            "method_code": "flatrate",
            "carrier_title": "Flat Rate",
            "method_title": "Fixed",
            "amount": 20,
            "base_amount": 20,
            "available": true,
            "error_message": "",
            "price_excl_tax": 20,
            "price_incl_tax": 20
        }
    ],
    "cartId": "21",
    "address": {
        "street": "123 Test Road",
        "city": "Test City",
        "region_id": 12,
        "region": "California",
        "country_id": "US",
        "postcode": "90000",
        "firstname": "Test",
        "lastname": "Test",
        "company": "",
        "telephone": "1800000000",
        "save_in_address_book": 1,
        "region_code": "CA",
        "extension_attributes": []
    }
}
```

To transmit the `postcode` property of the `address` object and the `carrier_code`, `method_code`, and `base_amount` for each shipping estimate, configure the webhook's fields as follows:

```xml
<fields>
    <field name='postcode' source='address.postcode' />
    <field name='result[].carrier_code' />
    <field name='result[].method_code' />
    <field name='result[].base_amount' />
</fields>
```

Commerce sends the following object to the remote application:

```json
{
    "postcode": "90000",
    "result": [
        {
            "carrier_code": "tablerate",
            "method_code": "bestway",
            "base_amount": 15
        },
        {
            "carrier_code": "flatrate",
            "method_code": "flatrate",
            "base_amount": 20
        }
    ]
}
```

<InlineAlert variant="warning" slots="text" />

Some sensitive data, such as passwords, can be sanitized in the webhook payload due to security concerns.

### Field converters

You can implement a converter class to convert a field to a different data type. For example, Commerce stores order IDs as numeric values. If the hook endpoint expects order IDs to be text values, you must convert the numeric value to a string representation before sending the payload.

All converter classes must implement `Magento\AdobeCommerceWebhooks\Model\Filter\Converter\FieldConverterInterface`. The `toExternalFormat` method of a converter class converts a field value before sending a request to the hook endpoint.

```xml
<fields>
    <field name='order.id' source='data.order.id' />
    <field name='order.status' source='data.order.status' converter="Path/To/The/Converter/Class" />
</fields>
```

A converter class can also convert the value in a hook endpoint response object that has an operation status of  `replace`. A value in a `replace` response object will be converted only if the path in the object corresponds to the source of a field with a configured converter class.

For example, given the above hook field configuration, conversion occurs only if a `replace` response object specifies a path of `data/order/status`. In this case, the `fromExternalFormat` method of the configured converter class will be called to convert the value in the response object.

### Context fields

You can add to the webhook payload values from the application context:

```xml
<fields>
    <field name="customer.entity_id" source="data.customer.entity_id" />
    <field name="customer.customer_email" source="context_customer_session.get_customer.get_email" />
</fields>
```

In this example, the value of `customer.customer_email` will be set to `Magento\Customer\Model\Session::getCustomer()::getEmail()`. If the value does not exist or cannot be processed, the appropriate message will be logged, and the hook execution will not be interrupted.

You can also specify the string arguments to use when accessing the application context. Provide these arguments within curly braces and delimit multiple arguments with colons, if applicable. The following example sets `config_value` to the value of `Magento\Framework\App\Config\ScopeConfigInterface::getValue('value/path', 'default')`.

```xml
<fields>
    <field name="config_value" source="context_scope_config.get_value{value/path:default}" />
</fields>
```

Supported contexts:

| Context                     | Context class                                     |
|-----------------------------|---------------------------------------------------|
| `context_checkout_session`  | Magento\Checkout\Model\Session                    |
| `context_customer_session`  | Magento\Customer\Model\Session                    |
| `context_registry`          | Magento\Framework\Registry                        |
| `context_application_state` | Magento\Framework\App\State                       |
| `context_scope_config`      | Magento\Framework\App\Config\ScopeConfigInterface |
| `context_http_request`      | Magento\Framework\App\Request\Http                |
| `context_staging`           | Magento\Staging\Model\VersionManager              |

## Clean the cache

If you are adding webhook functionality to an instance that is in production mode, run the following command to clean the cache and make the webhook available to the system:

```bash
bin/magento cache:clean config
```

If the instance is in developer mode, these configuration changes are detected automatically.

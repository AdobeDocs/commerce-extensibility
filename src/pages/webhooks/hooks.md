---
title: Configure hook contents
description: Learn how to configure hooks.
keywords:
  - Extensibility
---

# Configure hook contents

The payload for a hook can be large, but in many cases you only need to transmit a few fields to perform the desired operation on the remote server.

Defining the hook requires knowledge of the structure of the original event and the requirements of the remote call. You can use the following methods to determine the structure of the original event:

* &#8203;<Edition name="paas" />

   * Run the [`bin/magento webhooks:list:all` command](./commands.md#return-a-list-of-supported-webhook-event-names) to return a list of all supported webhooks methods. Then run the [`bin/magento webhooks:info <webhook-name>` command](./commands.md#display-the-payload-of-a-webhook) to return the payload of the specified webhook method.

* &#8203;<Edition name="saas" />

   * View the list supported webhook methods by going to **System** > Webhooks > **Webhooks List** in the Admin. Then click on a webhook method name to display its default contents.

   * Call the `GET /V1/webhooks/supportedList` [REST endpoint](./api.md#get-supported-webhooks-for-saas).

Imagine that a hypothetical webhook has the following structure:

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

Make sure the webhook method you select contains the information you need. Now, let's look at an actual webhook. If your webhook needs to check product availability when a shopper attempts to add a product to their cart, you could use the `observer.sales_quote_add_item` webhook method as the foundation of your call. The default payload contains the following information:

```json
{
    "eventName": "string",
    "data": {
        "quoteItem": {
            "qty_options": "array",
            "product_type": "string",
            "real_product_type": "string",
            "item_id": "int",
            "sku": "string",
            "qty": "float",
            "name": "string",
            "price": "float",
            "quote_id": "string",
            "product_option": {
                "extension_attributes": "object{}"
            },
            "custom_attributes": [
                {
                    "attribute_code": "string",
                    "value": "mixed"
                }
            ]
        }
    }
}
```

At minimum, you need to transmit the `sku` and `qty` fields to check product availability. Other fields, such as `name` and `price`, might also be necessary. However, there are many other fields that contain data that is outside the scope of your call.

Meanwhile, your external source probably does not accept data as a `quoteItem` object. Imagine that your remote application expects a payload with the following structure:

```json
{
    "product": {
        "name": "string",
        "sku": "string",
        "price": "float",
        "quantity": "float"
    }
}
```

The following example configures the webhook described above.

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### webhooks.xml (PaaS)

```xml
<hook name="validate_stock" url="https://example.com/product-validate-stock" timeout="2000" softTimeout="200" required="true" fallbackErrorMessage="Can't add the product to the cart right now">
    <fields>
        <field name='product.name' source='data.quoteItem.name' />
        <field name='product.sku' source='data.quoteItem.sku' />
        <field name='product.price' source='data.quoteItem.price' />
        <field name='product.quantity' source='data.quoteItem.qty' />
    </fields>
</hook>
```

##### Admin (SaaS)

```yaml
Hook Fields

Name: product.name
Source: data.quoteItem.name
Active: Yes

Name: product.sku
Source: data.quoteItem.sku
Active: Yes

Name: product.price
Source: data.quoteItem.price
Active: Yes

Name: product.quantity
Source: data.quoteItem.qty
Active: Yes
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

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### webhooks.xml (PaaS)

```xml
<fields>
    <field name='postcode' source='address.postcode' />
    <field name='result[].carrier_code' />
    <field name='result[].method_code' />
    <field name='result[].base_amount' />
</fields>
```

##### Admin (SaaS)

```yaml
Hook Fields

Name: postcode
Source: address.postcode
Active: Yes

Name: result[].carrier_code
Source: result[].carrier_code
Active: Yes

Name: result[].method_code
Source: result[].method_code
Active: Yes

Name: result[].base_amount
Source: result[].base_amount
Active: Yes
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

## Field converters

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

## Context values

You can add to the webhook payload values from the application context.

&#8203;<Edition name="paas" /> Creating header values using the application context is also supported.

### Context fields

You can set webhook payload field values from the application context using a field configuration like the following:

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### webhooks.xml (PaaS)

```xml
<fields>
    <field name="customer.entity_id" source="data.customer.entity_id" />
    <field name="customer.customer_email" source="context_customer_session.get_customer.get_email" />
    <field name="store.store_id" source="context_store.get_store.get_id" />
</fields>
```

##### Admin (SaaS)

```yaml
Hook Fields

Name: customer.entity_id
Source: data.customer.entity_id
Active: Yes

Name: customer.customer_email
Source: context_customer_session.get_customer.get_email
Active: Yes
```

In this example, the value of `customer.customer_email` will be set to `Magento\Customer\Model\Session::getCustomer()::getEmail()`. If the value does not exist or cannot be processed, the appropriate message will be logged, and the hook execution will not be interrupted.

You can also specify the string arguments to use when accessing the application context. Provide these arguments within curly braces and delimit multiple arguments with colons, if applicable. The following example sets `config_value` to the value of `Magento\Framework\App\Config\ScopeConfigInterface::getValue('value/path', 'default')`.

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### webhooks.xml (PaaS)

```xml
<fields>
    <field name="config_value" source="context_scope_config.get_value{value/path:default}" />
</fields>
```

##### Admin (SaaS)

```yaml
Hook Fields

Name: config_value
Source: context_scope_config.get_value{value/path:default}
Active: Yes
```

In this example, the value of `config_value` will be set to the value of `Magento\Framework\App\Config\ScopeConfigInterface::getValue('value/path', 'default')`. If the value does not exist or cannot be processed, the appropriate message will be logged, and the hook execution will not be interrupted.

If the return type of the method is an object, the value will be converted to an array. For example, if you want to get the value of `Magento\Checkout\Model\Session::getQuote()`, you can use the following configuration:

##### webhooks.xml (PaaS)

```xml
<fields>
    <field name="quote.data" source="context_checkout_session.get_quote" />
</fields>
```

##### Admin (SaaS)

```yaml
Hook Fields
Name: quote.data
Source: context_checkout_session.get_quote
Active: Yes
```

To get a value of the specific field of an object, you can use the `get_<field_name>` method of the object. The following example retrieves the `subtotal` value from the quote object by calling `Magento\Checkout\Model\Session::getQuote()::getSubtotal()`:

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### webhooks.xml (PaaS)

```xml
<fields>
    <field name="quote.subtotal" source="context_checkout_session.get_quote.get_sub_total" />
</fields>
```

##### Admin (SaaS)

```yaml
Hook Fields
Name: quote.subtotal
Source: context_checkout_session.get_quote.get_sub_total
Active: Yes
```

### Context headers

<Edition name="paas" />

You can use the same syntax and features available for context values in fields to set hook headers.

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### webhooks.xml (PaaS)

```xml
<headers>
    <header name="X-Custom-Header">context_http_request.get_header{X-Custom-Header}</header>
</headers>
```

##### Admin (SaaS)

```yaml
Hook Headers

Name: X-Custom-Header
Value: context_http_request.get_header{X-Custom-Header}
Active: Yes
```

In this example, the `X-Custom-Header` from an incoming HTTP request to Commerce will be forwarded as a header in the request sent by the webhook. This approach can be used to pass Authorization headers required by an external system.

### Supported contexts

The following contexts are supported:

| Context                     | Context class                                     |
|-----------------------------|---------------------------------------------------|
| `context_checkout_session`  | Magento\Checkout\Model\Session                    |
| `context_customer_session`  | Magento\Customer\Model\Session                    |
| `context_application_state` | Magento\Framework\App\State                       |
| `context_scope_config`      | Magento\Framework\App\Config\ScopeConfigInterface |
| `context_http_request`      | Magento\Framework\App\Request\Http                |
| `context_staging`           | Magento\Staging\Model\VersionManager              |
| `context_store`             | Magento\Store\Model\StoreManagerInterface         |

#### Checkout session context

The `context_checkout_session` context retrieves information about the current checkout session. You can use this context to access the information about the current quote.

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### webhooks.xml (PaaS)

```xml
<fields>
    <field name="quote.id" source="context_checkout_session.get_quote.get_id" />
    <field name="quote.sub_total" source="context_checkout_session.get_quote.get_subtotal" />
    <field name="quote.customer_group_id" source="context_checkout_session.get_quote.get_customer_group_id" />
</fields>
```

##### Admin (SaaS)

```yaml
Hook Fields

Name: quote.id
Source: context_checkout_session.get_quote.get_id
Active: Yes

Name: quote.sub_total
Source: context_checkout_session.get_quote.get_subtotal
Active: Yes

Name: quote.customer_group_id
Source: context_checkout_session.get_quote.get_customer_group_id
Active: Yes
```

This hook sends the following JSON object to the webhook endpoint:

```json
{
    "quote": {
        "id": "66",
        "sub_total": "600.0000",
        "customer_group_id": "0"
    }
}
```

If the quote does not exist in the current session, the values will be set to `null`.

#### Customer session context

The `context_customer_session` retrieves information about the current customer session. You can use this context to access the information about the current customer.

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### webhooks.xml (PaaS)

```xml
<fields>
    <field name="customer.id" source="context_customer_session.get_customer.get_id" />
    <field name="customer.email" source="context_customer_session.get_customer.get_email" />
    <field name="customer.group_id" source="context_customer_session.get_customer.get_group_id" />
</fields>
```

##### Admin (SaaS)

```yaml
Hook Fields

Name: customer.id
Source: context_customer_session.get_customer.get_id
Active: Yes

Name: customer.email
Source: context_customer_session.get_customer.get_email
Active: Yes

Name: customer.group_id
Source: context_customer_session.get_customer.get_group_id
Active: Yes
```

This hook sends the following JSON object to the webhook endpoint:

```json
{
    "customer": {
        "id": "123",
        "email": "test@example.com",
        "group_id": "2"
    }
}
```

If the customer is not logged in, the values will be set to `null`.

#### Application state context

The `context_application_state` context retrieves information about the current application state.

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### webhooks.xml (PaaS)

```xml
<fields>
    <field name="app_area_code" source="context_application_state.get_area_code" />
    <field name="app_mode" source="context_application_state.get_mode" />
</fields>
```

##### Admin (SaaS)

```yaml
Hook Fields
Name: app_area_code
Source: context_application_state.get_area_code
Active: Yes
Name: app_mode
Source: context_application_state.get_mode
Active: Yes
```

This hook sends the following JSON object to the webhook endpoint:

```json
{
    "app_area_code": "webapi_rest",
    "app_mode": "production"
}
```

The `context_application_state.get_area_code` field returns the area code of the application where webhook execution occurs. The possible values are `global`, `frontend`, `adminhtml`, `crontab`, `webapi_rest`, `webapi_soap`, `graphql`. This value can be used to determine the context of the request and to apply specific logic based on the area code.

The `context_application_state.get_mode` field returns the current application mode. The possible values are `default`, `developer`, and `production`.

#### Scope config context

The `context_scope_config` context retrieves information from the configuration scope. If your webhook logic depends on a specific configuration value, you can use this context to retrieve the value from the configuration.

The following example retrieves the `general/locale/timezone` and `general/locale/code` configuration values from the default scope.

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### webhooks.xml (PaaS)

```xml
<fields>
    <field name="config.timezone" source="context_scope_config.get_value{general/locale/timezone:default}" />
    <field name="config.local" source="context_scope_config.get_value{general/locale/code:default}" />
</fields>
```

##### Admin (SaaS)

```yaml
Hook Fields

Name: config.timezone
Source: context_scope_config.get_value{general/locale/timezone:default}
Active: Yes

Name: config.local
Source: context_scope_config.get_value{general/locale/code:default}
Active: Yes
```

This hook sends the following JSON object to the webhook endpoint:

```json
{
    "config": {
        "timezone": "America/Chicago",
        "local": "en_US"
    }
}
```

#### HTTP request context

The `context_http_request` context retrieves information about the current HTTP request.

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### webhooks.xml (PaaS)

```xml
<fields>
    <field name="request.path_info" source="context_http_request.get_path_info" />
    <field name="request.base_path" source="context_http_request.get_base_path" />
    <field name="request.front_name" source="context_http_request.get_front_name" />
</fields>
```

##### Admin (SaaS)

```yaml
Hook Fields

Name: request.path_info
Source: context_http_request.get_path_info
Active: Yes

Name: request.base_path
Source: context_http_request.get_base_path
Active: Yes

Name: request.front_name
Source: context_http_request.get_front_name
Active: Yes
```

This hook sends the following JSON object to the webhook endpoint:

```json
{
    "request": {
        "path_info": "/rest/default/V1/guest-carts/estimate-shipping-methods",
        "base_path": "/",
        "front_name": "rest"
    }
}
```

#### Staging context

The `context_staging` context retrieves information about the current staging version.

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### webhooks.xml (PaaS)

```xml
<fields>
    <field name="staging.version" source="context_staging.get_version" />
    <field name="staging.current_version" source="context_staging.get_current_version" />
</fields>
```

##### Admin (SaaS)

```yaml
Hook Fields
Name: staging.version
Source: context_staging.get_version
Active: Yes
Name: staging.current_version
Source: context_staging.get_current_version
Active: Yes
```

This hook sends the following JSON object to the webhook endpoint:

```json
{
    "staging": {
        "version": {
            "id": 1
        },
        "current_version": {
            "id": 1
        }
    }
}
```

#### Store context

The `context_store` context retrieves information about the current store.

#### webhooks.xml (PaaS)

```xml
<fields>
  <field name="store.store_id" source="context_store.get_store.get_id" />
  <field name="store.store_data" source="context_store.get_store" />
  <field name="store.website_data" source="context_store.get_website" />
  <field name="store.store_group_data" source="context_store.get_group" />
</fields>
```

#### Admin (SaaS)

```yaml
Hook Fields
Name: store.store_id
Source: context_store.get_store.get_id
Active: Yes
Name: store.store_data
Source: context_store.get_store
Active: Yes
Name: store.website_data
Source: context_store.get_website
Active: Yes
Name: store.store_group_data
Source: context_store.get_group
Active: Yes
```

This hook sends the following JSON object to the webhook endpoint:

```json
{
    "store": {
        "store_id": "1",
        "store_data": {
          "store_id": "1",
          "code": "default",
          "website_id": "1",
          "group_id": "1",
          "name": "Default Store View",
          "sort_order": "0",
          "is_active": "1",
          "available_currency_codes": [
              "USD"
          ],
          "base_currency": {
              "currency_code": "USD"
          },
          "current_currency": {
              "currency_code": "USD"
          }
        },
        "website_data": {
          "website_id": "1",
          "code": "base",
          "name": "Main Website",
          "sort_order": "0",
          "default_group_id": "1",
          "is_default": "1"
        },
        "store_group_data": {
          "group_id": "1",
          "website_id": "1",
          "name": "Main Website Store",
          "root_category_id": "2",
          "default_store_id": "1",
          "code": "main_website_store"
        }
    }
}
```

## Clean the cache

<Edition name="paas" />

If you are adding webhook functionality to an instance that is in production mode, run the following command to clean the cache and make the webhook available to the system:

```bash
bin/magento cache:clean config
```

If the instance is in developer mode, these configuration changes are detected automatically.

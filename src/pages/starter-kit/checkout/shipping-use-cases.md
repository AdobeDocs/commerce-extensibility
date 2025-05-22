---
title: Shipping use cases
description: Learn about how you can use the Adobe Commerce checkout starter kit for shipping integrations.
keywords:
  - App Builder
  - Extensibility
---

# Shipping use cases

This page explores different use cases and scenarios for implementing shipping methods using the Adobe Commerce checkout starter kit.

For more general use cases, refer to [use-cases](./use-cases.md).

## Shipping methods

You can add shipping methods to the checkout process by using [webhooks](../../webhooks/index.md).

To add shipping methods, you must [run a script to automatically create shipping carriers](./shipping-install.md#configuration) or [create shipping carriers manually](./shipping-reference.md#shipping-api-reference) using the REST API. Only shipping methods with registered carriers are available in the checkout process.

After the webhook is registered, every time a shopping cart is requested, a synchronous call is dispatched to the App Builder application implementing the shipping method to calculate the shipping cost and provide the available shipping methods.

Refer to [`actions/shipping-methods.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/shipping-methods/index.js) for an example of how to process the request and return the list of available shipping methods.

To register a webhook, you need to create a `webhooks.xml` [configuration file](../../webhooks/xml-schema.md) in your module or in the root `app/etc` directory.

The following example demonstrates how to add a webhook to the `plugin.magento.out_of_process_shipping_methods.api.shipping_rate_repository.get_rates` method:

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_AdobeCommerceWebhooks:etc/webhooks.xsd">
    <method name="plugin.magento.out_of_process_shipping_methods.api.shipping_rate_repository.get_rates" type="after">
        <hooks>
            <batch name="dps">
                <hook name="add_shipping_rates_dps" url="https://<your_app_builder>.runtime.adobe.io/api/v1/web/commerce-checkout-starter-kit/shipping-methods" method="POST" timeout="5000" softTimeout="1000" priority="100" required="true">
                    <fields>
                        <field name="rateRequest" />
                    </fields>
                </hook>
            </batch>
        </hooks>
    </method>
</config>
```

You can register multiple webhooks for different shipping methods or shipping carriers by adding them into the same batch to ensure they are executed in parallel or create multiple batches to execute them sequentially.

### Payload

The request payload contains information about all items in the cart, including product information, product attributes, shipping address, and customer information for logged-in customers.

Payload example:

```json
{
    "rateRequest": {
        "all_items": [
            {
                "item_id": "1",
                "quote_id": "1",
                "created_at": "2025-02-18 14:57:03",
                "updated_at": "2025-02-24 03:44:49",
                "product_id": "9",
                "store_id": 1,
                "parent_item_id": null,
                "is_virtual": "0",
                "sku": "simple-product-1",
                "name": "Simple product 1",
                "price": 500,
                "base_price": 500,
                ...
                "product": {
                    "entity_id": "9",
                    "attribute_set_id": "4",
                    "type_id": "simple",
                    "sku": "simple-product-1",
                    "price": "500.000000",
                    ...
                    "attributes": {
                        "manufacturer": "Demo Company",
                        "color": "Red",
                        "country_origin": "Japan",
                        ...
                    }
                }
            }
        ],
        "dest_country_id": "US",
        "dest_region_id": 12,
        "dest_region_code": "CA",
        "dest_street": "3320 N Crescent Dr\nBeverly Hills",
        "dest_city": "Los Angeles",
        "dest_postcode": "70210",
        "package_value": 1100,
        "package_value_with_discount": 1100,
        "package_weight": 124,
        "package_qty": 2,
        "package_physical_value": 1100,
        "free_method_weight": 124,
        "store_id": 1,
        "website_id": "1",
        "free_shipping": 0,
        "base_currency": {
            "currency_code": "USD"
        },
        "package_currency": {
            "currency_code": "USD"
        },
        ...
        "customer": {
            "entity_id": "1",
            "website_id": "1",
            "email": "test@example.com",
            "group_id": "1",
            "firstname": "John",
            "middlename": null,
            "lastname": "Doe",
            ...
        },
        "selected_shipping_method": {
            "carrier_code": "DPS",
            "method_code": "dps_shipping_one"
        }
    }
}
```

The request payload also contains information about the selected shipping method, if it was already selected before webhook execution. When no shipping method has been selected yet, the `selected_shipping_method` field is `null`.

You can find examples of how to use shipping addresses, customer data, and product attributes in your App Builder application in [`actions/shipping-methods.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/shipping-methods/index.js).

### GraphQL

In the [`setShippingAddressesOnCart` mutation](https://developer.adobe.com/commerce/webapi/graphql/schema/cart/mutations/set-shipping-address/), available shipping methods that are returned by the webhook are appended to the `available_shipping_methods` field.

You can use the `additional_data` field to pass an array of key-value pairs to provide additional information about the shipping method from the webhook.

```json
{
  "data": {
    "setShippingAddressesOnCart": {
      "cart": {
        "shipping_addresses": [
          {
            "firstname": "John",
            "lastname": "Doe",
            "company": "Company Name",
            "street": ["3320 N Crescent Dr", "Beverly Hills"],
            "city": "Los Angeles",
            "region": {
              "code": "CA",
              "label": "California"
            },
            "postcode": "70210",
            "telephone": "123-456-0000",
            "country": {
              "code": "US",
              "label": "US"
            },
            "available_shipping_methods": [
              {
                "amount": {
                  "currency": "USD",
                  "value": 17
                },
                "available": true,
                "carrier_code": "DPS",
                "carrier_title": "Demo Postal Service",
                "error_message": "",
                "method_code": "dps_shipping_one",
                "method_title": "Demo Custom Shipping One",
                "price_excl_tax": {
                  "currency": "USD",
                  "value": 17
                },
                "price_incl_tax": {
                  "currency": "USD",
                  "value": 17
                },
                "additional_data": [
                  {
                    "key": "additional_data_key",
                    "value": "additional_data_value"
                  },
                  {
                    "key": "additional_data_key2",
                    "value": "additional_data_value2"
                  },
                  {
                    "key": "additional_data_key3",
                    "value": "additional_data_value3"
                  }
                ]
              },
              {
                "amount": {
                  "currency": "USD",
                  "value": 18
                },
                "available": true,
                "carrier_code": "DPS",
                "carrier_title": "Demo Postal Service",
                "error_message": "",
                "method_code": "dps_shipping_two",
                "method_title": "Demo Custom Shipping Two",
                "price_excl_tax": {
                  "currency": "USD",
                  "value": 18
                },
                "price_incl_tax": {
                  "currency": "USD",
                  "value": 18
                },
                "additional_data": []
              }
            ]
          }
        ]
      }
    }
  }
}
```

In the [`setShippingMethodsOnCart` mutation](https://developer.adobe.com/commerce/webapi/graphql/schema/cart/mutations/set-shipping-method/), you can set the shipping method provided by webhook. Its information is stored in the `selected_shipping_method` field with the `additional_data`, if provided.

```json
{
  "data": {
    "setShippingMethodsOnCart": {
      "cart": {
        "shipping_addresses": [
          {
            "selected_shipping_method": {
              "amount": {
                "currency": "USD",
                "value": 17
              },
              "carrier_code": "DPS",
              "carrier_title": "Demo Postal Service",
              "method_code": "dps_shipping_one",
              "method_title": "Demo Custom Shipping One",
              "price_excl_tax": {
                "currency": "USD",
                "value": 17
              },
              "price_incl_tax": {
                "currency": "USD",
                "value": 17
              },
              "additional_data": [
                {
                  "key": "additional_data_key",
                  "value": "additional_data_value"
                },
                {
                  "key": "additional_data_key2",
                  "value": "additional_data_value2"
                },
                {
                  "key": "additional_data_key3",
                  "value": "additional_data_value3"
                }
              ]
            }
          }
        ]
      }
    }
  }
}
```

## Remove shipping method

The `plugin.magento.out_of_process_shipping_methods.api.shipping_rate_repository.get_rates` webhook allows you to remove specific shipping methods from the list of available options.

If you use the `flatrate` shipping method, but want to disable it, you must update your webhook response to mark the shipping method as removed. This example is demonstrated in [`actions/shipping-methods.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/shipping-methods/index.js).

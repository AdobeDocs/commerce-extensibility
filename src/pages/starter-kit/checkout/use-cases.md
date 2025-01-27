---
title: Use cases
description: Learn about how you can use the Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - Extensibility
---

# Use cases

This page explores different use cases and scenarios that can be implemented using the Adobe Commerce checkout starter kit.

## Third-party events processing

Third-party systems usually offer a way to subscribe to events that are emitted when certain actions are performed. For example, with a payment gateway we may subscribe to `Authorization`, `Capture` or `Refund` events.

Adobe I/O Events can offload the events processing which requires configuring an event provider. The
[`configure-events`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/configure-events.js) script can manage third-party event providers required for your integration. Refer to [configure-events](./configure.md#configure-events) for more information.

After you configure the event provider, you can publish third-party events and register a consumer to process them accordingly.

![use case 1](../../_images/starterkit/use-case-1.png)

### Publication

You have the following options to publish events with an App Builder app, depending on the flexibility of the third-party system.

#### Directly from 3rd party system (preferred)

We recommend ingesting events directly from the third-party system. This is the most efficient way to process events, but requires you to modify the source system to send the events to Adobe I/O Events.

![use case 2](../../_images/starterkit/use-case-2.png)

Refer to the [Events Publishing API](https://developer.adobe.com/events/docs/guides/api/eventsingress_api/) for more information.

<InlineAlert variant="info" slots="text"/>

This example is not demonstrated in the GitHub project files, because it depends on source system details.

#### Publication using an action

![use case 3](../../_images/starterkit/use-case-3.png)

If your third-party system does not support the preferred method of sending events to Adobe I/O Events, it should support registering a webhook that you can call when an event occurs. Additionally, the third party system may allow you to configure an authentication mechanism in the webhook (basic auth, OAuth) so that it only accepts authorized requests.

The starter kit demonstrates this use case in the [`actions/3rd-party-events/publish.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/3rd-party-events/publish.js) action.

<InlineAlert variant="info" slots="text"/>

To implement this use case, the action must receive the `OAUTH_*` environment variables that allow it to retrieve an access token to publish in the event provider. You can specify this configuration using the environment variables in the [`.env` file](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/env.dist), so that they match the authentication settings in your `app.config.yaml`.

### Consumption

You can consume the events using webhooks after registering the action as a consumer of the event provider.

The [`actions/3rd-party-events/consume.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/3rd-party-events/consume.js) action provides an example of an event consumer that is registered declaratively as a Webhook in `app.config.yaml`. The value provided in the `provider_metadata` field is also used as the `AIO_EVENTS_PROVIDERMETADATA_TO_PROVIDER_MAPPING` environment variable, which allows the registration to know which provider to register the action to.

The AIO CLI provides an interactive command to register webhooks and actions as consumers of the event provider:

```shell
aio app add event
```

For more information on how to implement a consumer action and register it as a webhook, refer to
the [AppBuilder Applications with Adobe I/O Events](https://developer.adobe.com/events/docs/guides/appbuilder/) documentation.

You can also refer to the [Adobe I/O Events Webhook FAQ](https://developer.adobe.com/events/docs/support/faq/#webhook-faq) which contains information about how to handle event consumption, such as state of registration, retries, and debugging.

## Payment flow: Get order details from Adobe Commerce using the masked cart ID

The following steps demonstrate the payment flow:

1. The payment flow starts at the frontend. When checkout is completed, the frontend sends the masked cart ID to the payment gateway.

1. The payment gateway then sends a request to the App Builder application with the masked cart ID, as this is the only information it has about the order. This request could be a webhook or an event.

1. The App Builder application uses the Adobe Commerce HTTP Client to retrieve the order details using the masked cart ID. To facilitate this, the starter kit provides the method `getOrderByMaskedCartId` in the Adobe Commerce HTTP Client.

![sequence.png](../../_images/starterkit/sequence.png)

## Payment methods: Validate payment info

To perform a headless checkout and payment, the Commerce instance has to ensure that the payment has succeeded and the order can be placed.

To ingest payment gateway specific information in the payment process, the checkout process must use the [`setPaymentMethodOnCart` mutation](https://developer.adobe.com/commerce/webapi/graphql/schema/cart/mutations/set-payment-method/) in combination with the `payment_method.additional_data` field to persist the information required to validate the payment once the order is placed.

```graphql
setPaymentMethodOnCart(
  input: {
    cart_id: $cartId
    payment_method: {
      code: $code
      additional_data: [
        {
          key: 'sessionId',
          value: '12A34B56-1A23-1234-A123-123456A78901',
        },
        {
          key: 'status',
          value: 'DONE',
        },
      ]
    }
  }
) {
  cart {
    selected_payment_method {
      code
      title
    }
  }
}
```

With this information persisted, you can configure an [Adobe Commerce Webhook](../../webhooks/index.md) so that every time an order is placed, a synchronous call dispatches to the App Builder application implementing the payment method to validate the payment.

To register a webhook, navigate to **System > Webhooks** in the Adobe Commerce Admin and create a new webhook with the following configuration:

```javascript
Hook Settings
  Webhook Method: observer.sales_order_place_before
  Webhook Type: before
  Batch Name validate_payment
  Hook Name: oope_payment_methods_sales_order_place_before
  URL: https://<yourappbuilder>.runtime.adobe.io/api/v1/web/commerce-checkout-starter-kit/validate-payment
  Active: Yes
  Method: POST

Hook Fields
  Field: payment_method Source: order.payment.method
  Field: payment_additional_information Source: order.payment.additional_information

Hook Rules
  Field: payment_method Value: <yourpaymentmethodcode> Operator: equal
```

You can also enable webhook signature generation by following the [webhooks signature verification](../../webhooks/signature-verification.md) instructions.

Refer to [`actions/validate-payment.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/validate-payment/index.js) for an example of how to receive the request and validate the payment according to the payment gateway needs.

## Shipping methods

The shipping methods can be added to the checkout process by using the [Adobe Commerce Webhook](../../webhooks/index.md) functionality.

After the webhook is registered, every time a shopping cart is requested, a synchronous call is dispatched to the App Builder application implementing the shipping method to calculate the shipping cost and provide the available shipping methods.

Refer to [`actions/shipping-methods.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/shipping-methods/index.js) for an example of how to process the request and return the list of available shipping methods.

To register a webhook, you need to create a `webhooks.xml` [configuration file](../../webhooks/xml-schema.md) in your module or in the root app/etc directory.

The following example demonstrates how to add a webhook to the `plugin.magento.out_of_process_shipping_methods.api.shipping_rate_repository.get_rates` method:

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_AdobeCommerceWebhooks:etc/webhooks.xsd">
    <method name="plugin.magento.out_of_process_shipping_methods.api.shipping_rate_repository.get_rates" type="after">
        <hooks>
            <batch name="dps">
                <hook name="add_shipping_rates_dps" url="https://<yourappbuilder>.runtime.adobe.io/api/v1/web/commerce-checkout-starter-kit/shipping-methods" method="POST" timeout="5000" softTimeout="1000" priority="100" required="true">
                    <fields>
                        <field name="rateRequest" />
                    </fields>
                </hook>
            </batch>
        </hooks>
    </method>
</config>
```

Or to navigate to **System > Webhooks** in the Adobe Commerce Admin and create a new webhook with the following configuration:

```
Hook Settings
  Webhook Method: plugin.magento.out_of_process_shipping_methods.api.shipping_rate_repository.get_rates
  Webhook Type: after
  Batch Name shipping_methods
  Hook Name: oope_shipping_methods_carrier_one
  URL: https://<yourappbuilder>.runtime.adobe.io/api/v1/web/commerce-checkout-starter-kit/shipping-methods
  Active: Yes
  Method: POST

Hook Fields
  Field: rateRequest
```

You can register multiple webhooks for different shipping methods or shipping carriers by adding them into the same batch to ensure they are executed in parallel or create multiple batches to execute them sequentially.

## Shipping methods: GraphQL

In the `setShippingAddressesOnCart` the available shipping methods that are returned by the webhook are appended to the `available_shipping_methods` field.

You can use the `additional_data` field to pass additional information about the shipping method from the webhook. The `additional_data` field is an array of key-value pairs that can be useful for passing additional information about the shipping method.

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
            "street": [
              "3320 N Crescent Dr",
              "Beverly Hills"
            ],
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

In the `setShippingMethodsOnCart` mutation you can set the shipping method provided by webhook, it's information will be stored in the `selected_shipping_method` field with the `additional_data` if provided.

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

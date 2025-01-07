---
title: Use cases
description: Learn about how you can use the Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - Extensibility
---

## Use cases

### 3rd party events processing

3rd party systems usually offer a way to subscribe to events that are emitted when certain actions are performed. For
example, with a payment gateway we may subscribe to Authorization, Capture or Refund events.

Adobe I/O Events can be used to offload the events processing which requires to configure an Event Provider. The
`configure-events` script provided in this project can be used to manage the 3rd party event providers required for
your integration. See the [Scripts/configure-events](#configure-events) section for more information.

Once the event provider is configured, the 3rd party events can be published and a consumer can be registered to process
them accordingly.

(3rd party system) -> (Adobe I/O Events) -> (AppBuilder app)

#### Publication

There are different options on how to publish these events with an AppBuilder app, depending on the flexibility of the
3rd party system.

The options are ordered by preference.

##### Directly from 3rd party system

The best option is to ingest the events directly from the 3rd party system. This is the most efficient way to process
events but the source system has to be adapted to send the events to Adobe I/O Events.

(3rd party system) -> (Event provider) -> (Consumer runtime action)

The Events Publishing API is described in
the [Adobe I/O Events documentation](https://developer.adobe.com/events/docs/guides/api/eventsingress_api/).

Note this example is not exemplified in this project since it depends on source system details.

##### Publication using an action

If the 3rd party system does not support sending events to Adobe I/O Events, it usually supports registering a webhook
that should be called when an event occurs. Additionally, the 3rd party system may be configured to use an
authentication mechanism in the webhook (basic auth, OAuth, etc.) so that only authorized requests are accepted.

(3rd party system) -> (Consumer runtime action) -> (Event provider) -> (Consumer runtime action)

This use case is implemented in the `actions/3rd-party-events/publish.js` action.

Note that for implementing this use case correctly the action should receive the `OAUTH_*` environment variables to be
able to retrieve an access token to publish in the event provider. This configuration is done by specifying the env vars
in the `.env` file and setting them as `app.config.yaml`.

#### Consumption

Consumption of events can be done using webhooks where the action is registered as a consumer of the event provider.

An example of a consumer is the `actions/3rd-party-events/consume.js` action which is registered declaratively as
a Webhook in `app.config.yaml`. Note that in this config file, the value used in the `provider_metadata` field is
specified in the `AIO_EVENTS_PROVIDERMETADATA_TO_PROVIDER_MAPPING` environment variable so the registration can know to
which provider the action should be registered.

AIO cli provides an interactive command to register the webhook and the action as a consumer of the event provider:

```shell
aio app add event
```

Extended documentation about how to implement a consumer action and register it as a webhook can be found in
the [AppBuilder Applications with Adobe I/O Events documentation](https://developer.adobe.com/events/docs/guides/appbuilder/)

See also [Adobe I/O Events Webhook FAQ](https://developer.adobe.com/events/docs/support/faq/#webhook-faq) which
contains interesting information about how to handle event consumption (state of registration, retries, debugging).

### Payment flow: Obtain order details from Adobe Commerce using the masked cart id

To understand the payment flow, we need to consider the following steps:

1. It all starts on the frontend. When checkout is completed, the frontend sends the masked cart ID to the payment gateway.
2. The payment gateway then sends a request to the AppBuilder application with the masked cart ID, as this is the only information it has about the order. This request could be a webhook or an event.
3. The AppBuilder application uses the Adobe Commerce HTTP Client to retrieve the order details using the masked cart ID. To facilitate this, the starter kit provides the method `getOrderByMaskedCartId` in the Adobe Commerce HTTP Client.

![sequence.png](sequence.png)

### Payment methods: Validate payment info

Since the checkout process and the payment of the order is expected to be done in a headless way, the Commerce instance
has to ensure that the payment has succeeded and the order can be placed.

In order to ingest the payment gateway specific information in the payment process, it is expected that the checkout process
uses [`setPaymentMethodOnCart` mutation](https://developer.adobe.com/commerce/webapi/graphql/schema/cart/mutations/set-payment-method/)
in combination with `payment_method.additional_data` field in order to persist all the information required to validate
later the payment once the order is placed.

```graphql
setPaymentMethodOnCart(
  input: {
    cart_id: $cartId
    payment_method: {
      code: $code
      additional_data: [
        {
          key: 'sessionId',
          value: '86A76C95-8F56-4922-B226-636533C06708',
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

With this information persisted, a webhook can be configured with the help of [Adobe Commerce Webhooks](https://developer.adobe.com/commerce/extensibility/webhooks)
so every time there's an order placed a synchronous call is dispatched to the AppBuilder application implementing the payment
method to validate the payment.

In order to register a webhook, go to the Adobe Commerce Admin > System > Webhooks and create a new webhook with the following configuration:

```
Hook Settings
  Webhook Method: observer.sales_order_place_before
  Webhook Type: before
  Batch Name validate_payment
  Hook Name: oope_payment_methods_sales_order_place_before
  URL: https://yourappbuilder.runtime.adobe.io/api/v1/web/commerce-checkout-starter-kit/validate-payment
  Active: Yes
  Method: POST

Hook Fields
  Field: payment_method Source: order.payment.method
  Field: payment_additional_information Source: order.payment.additional_information

Hook Rules
  Field: payment_method Value: yourpaymentmethodcode Operator: equal
```

Additionally, you can enable webhook signature generation according to [Webhooks signature verification](https://developer.adobe.com/commerce/extensibility/webhooks/signature-verification/)

See the action implemented in `actions/payment-methods/validate-payment.js` for an example of how to receive the request
and validate the payment according to the payment gateway needs.
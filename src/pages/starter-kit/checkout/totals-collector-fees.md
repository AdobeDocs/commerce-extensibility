---
title: Custom fees use cases
description: Learn how to inject custom fee line items into an Adobe Commerce cart using the out-of-process totals collector module and a dedicated webhook.
keywords:
  - App Builder
  - Extensibility
---

# Custom fees use cases

This page describes how to apply custom fee line items (such as processing fees, handling charges, or insurance fees) to an Adobe Commerce cart using the `magento/module-out-of-process-totals-collector` module.

For discount use cases, see [Totals collector use cases](totals-collector-use-cases.md).

## How it works

The out-of-process totals collector exposes a dedicated webhook for custom fees:

```
plugin.magento.out_of_process_totals_collector.api.get_total_modifications.custom_fees
```

This webhook fires during cart totals collection, after shipping costs and discounts are computed, so your App Builder application receives both the computed shipping cost and any shipping discount as part of the request payload. Your application returns a JSON Patch response with the fees to apply. Commerce converts each fee to the store currency, adds the amounts to the cart grand total, and persists them for display in the checkout, admin documents, and transactional emails.

## Custom fees webhook

To apply fees from an external service, register a webhook for the method `plugin.magento.out_of_process_totals_collector.api.get_total_modifications.custom_fees` (type `after`).

[PaaS Only](https://experienceleague.adobe.com/en/docs/commerce/user-guides/product-solutions) To register the webhook, [modify the `webhooks.xml` file](../../webhooks/hooks.md) (in your module or in `app/etc`):

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_AdobeCommerceWebhooks:etc/webhooks.xsd">
    <method name="plugin.magento.out_of_process_totals_collector.api.get_total_modifications.custom_fees" type="after">
        <hooks>
            <batch name="totals_collector_fees">
                <hook name="totals_collector_fees"
                      url="https://<your_app_builder>.adobeioruntime.net/api/v1/web/commerce-checkout-starter-kit/totals-collector-fees"
                      method="POST"
                      timeout="30000"
                      softTimeout="1000"
                      fallbackErrorMessage="We encountered an issue while calculating your fees. Please contact the store owner for further assistance.">
                    <fields>
                        <field name="total" />
                        <field name="quote" />
                        <field name="shippingAssignment" />
                    </fields>
                </hook>
            </batch>
        </hooks>
    </method>
</config>
```

[SaaS Only](https://experienceleague.adobe.com/en/docs/commerce/user-guides/product-solutions) For Adobe Commerce as a Cloud Service, [create the webhook in the Admin](../../webhooks/create-webhooks.md). Use method name `plugin.magento.out_of_process_totals_collector.api.get_total_modifications.custom_fees`, type `after`, and configure the same fields as above.

To improve security, enable [webhook signature verification](../../webhooks/signature-verification.md).

### Payload

The request body includes the quote, shipping assignment, and current totals — identical to the discount webhook payload, with the addition of the computed shipping cost in the `total` object. The webhook is only triggered when there are items in the cart. Example structure:

```json
{
  "total": {
    "subtotal": 1000.00,
    "grand_total": 1015.00,
    "shipping_amount": 15.00,
    "shipping_discount_amount": 5.00,
    ...
  },
  "quote": {
    "entity_id": "1",
    "store_id": 1,
    "items": [ ... ],
    ...
  },
  "shippingAssignment": {
    "items": [
      {
        "item_id": "1",
        "quote_id": "1",
        "sku": "simple-product-1",
        "price": 500,
        "base_price": 500,
        "qty": 2,
        ...
      }
    ],
    "shipping": {
      "method": "flatrate_flatrate",
      "address": { ... }
    }
  }
}
```

Your endpoint can use any combination of item data, cart totals, the computed shipping amount, and the shipping discount amount to determine which fees to apply and at what amounts.

## Response format

The webhook endpoint must return a **JSON Patch** (RFC 6902) array. To apply custom fees, use a `replace` operation on the `result/fees` path.

### Fee object fields

| Field | Type | Required | Description |
|---|---|---|---|
| `code` | string | yes | Stable identifier, unique within the cart. Used as the database key for order persistence. |
| `label` | string | no | Display name shown in the cart, checkout, admin documents, and emails. Defaults to `"Custom Fee"` when omitted. |
| `base_fee` | float | yes | Fee amount in base currency. Converted to store currency automatically. Fees with `base_fee ≤ 0` or an empty `code` are ignored. |

### Example: multiple fees

```json
[
  {
    "op": "replace",
    "path": "result/fees",
    "value": [
      { "code": "processing_fee", "label": "Processing Fee",           "base_fee": 9.99 },
      { "code": "handling_fee",   "label": "Handling & Insurance Fee", "base_fee": 4.50 }
    ]
  }
]
```

### Example: single fee

```json
[
  {
    "op": "replace",
    "path": "result/fees",
    "value": [
      { "code": "service_fee", "label": "Service Fee", "base_fee": 5.00 }
    ]
  }
]
```

### Example: no fees

When no fees apply (for example, when a customer qualifies for a fee waiver), return a success response without any patch operations:

```json
[
  {
    "op": "success"
  }
]
```

## GraphQL

Custom fees are available in the `CartPrices` type under `custom_fees`. The `CartPrices` resolver re-collects quote totals before child resolvers run, so `custom_fees` always reflects the latest webhook response.

```graphql
query CartWithFees($cartId: String!) {
  cart(cart_id: $cartId) {
    prices {
      subtotal_excluding_tax { value currency }
      grand_total            { value currency }
      custom_fees {
        code
        label
        amount { value currency }
      }
    }
  }
}
```

Example response:

```json
{
  "data": {
    "cart": {
      "prices": {
        "subtotal_excluding_tax": { "value": 100.00, "currency": "USD" },
        "grand_total":            { "value": 128.48, "currency": "USD" },
        "custom_fees": [
          {
            "code":   "processing_fee",
            "label":  "Processing Fee",
            "amount": { "value": 9.99, "currency": "USD" }
          },
          {
            "code":   "handling_fee",
            "label":  "Handling & Insurance Fee",
            "amount": { "value": 4.50, "currency": "USD" }
          }
        ]
      }
    }
  }
}
```

`custom_fees` returns `null` when no fees are active. Each `amount` follows the standard `Money` type (`value` + `currency`) used by all other `CartPrices` money fields.

## Where fees appear

Once applied, custom fees appear as distinct line items throughout the order lifecycle:

- Cart totals in the Luma checkout and GraphQL
- Order view in the Commerce Admin
- New invoice and invoice view in the Commerce Admin
- New credit memo and credit memo view in the Commerce Admin
- Order confirmation, invoice, and credit memo transactional emails

For implementation guidance and development considerations, see [Development considerations](totals-collector-development-considerations.md).

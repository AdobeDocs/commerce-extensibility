---
title: Item price use cases
description: Learn how to override quote item prices in an Adobe Commerce cart using the out-of-process totals collector module and a dedicated webhook.
keywords:
  - App Builder
  - Extensibility
---

# Item price use cases

This page describes how to modify quote item prices in an Adobe Commerce cart using the `magento/module-out-of-process-totals-collector` module.

For discount use cases, see [Totals collector use cases](totals-collector-use-cases.md). For custom fees, see [Custom fees use cases](totals-collector-fees.md).

## How it works

The out-of-process totals collector exposes a dedicated webhook for item price modifications:

```text
plugin.magento.out_of_process_totals_collector.api.get_total_modifications.item_prices
```

This webhook fires during cart totals collection, immediately after the subtotal is computed. Your App Builder application receives the quote and current totals and returns a JSON Patch response with target base prices for specific items. Commerce applies each price override, recomputes the affected row totals, and rolls the changes into the cart subtotal. The updated prices are then available to downstream collectors such as the discount and tax collectors.

## Item prices webhook

To modify item prices from an external service, register a webhook for the method `plugin.magento.out_of_process_totals_collector.api.get_total_modifications.item_prices` (type `after`).

[PaaS Only](https://experienceleague.adobe.com/en/docs/commerce/user-guides/product-solutions) To register the webhook, [modify the `webhooks.xml` file](../../webhooks/hooks.md) (in your module or in `app/etc`):

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_AdobeCommerceWebhooks:etc/webhooks.xsd">
    <method name="plugin.magento.out_of_process_totals_collector.api.get_total_modifications.item_prices" type="after">
        <hooks>
            <batch name="totals_collector_item_prices">
                <hook name="totals_collector_item_prices"
                      url="https://<your_app_builder>.adobeioruntime.net/api/v1/web/commerce-checkout-starter-kit/totals-collector-item-prices"
                      method="POST"
                      timeout="30000"
                      softTimeout="1000"
                      fallbackErrorMessage="We encountered an issue while calculating your item prices. Please contact the store owner for further assistance.">
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

[SaaS Only](https://experienceleague.adobe.com/en/docs/commerce/user-guides/product-solutions) For Adobe Commerce as a Cloud Service, [create the webhook in the Admin](../../webhooks/create-webhooks.md). Use method name `plugin.magento.out_of_process_totals_collector.api.get_total_modifications.item_prices`, type `after`, and configure the same fields as above.

To improve security, enable [webhook signature verification](../../webhooks/signature-verification.md).

### Payload

The request body includes the quote, shipping assignment, and current subtotal totals. The webhook is only triggered when there are items in the cart. Example structure:

```json
{
  "total": {
    "subtotal": 1000,
    "base_subtotal": 1000,
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
        "item_id": "491",
        "quote_id": "1",
        "sku": "simple-product-1",
        "price": 500,
        "base_price": 500,
        "qty": 2,
        "row_total": 1000,
        "base_row_total": 1000,
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

Your endpoint can use information such as item data and quote attributes to determine which prices to override.

## Response format

The webhook endpoint must return a **JSON Patch** response. To override item prices, use a `replace` operation on the `result/price_updates` path.

### Price update object fields

| Field | Type | Required | Description |
|---|---|---|---|
| `item_id` | int | yes | The `item_id` of the quote item to update. |
| `base_price` | float | yes | The new unit price in base currency. Commerce converts it to the store currency automatically. Must be non-negative; negative values are ignored. |

### Example: override prices for specific items

```json
{
  "op": "replace",
  "path": "result/price_updates",
  "value": [
      { "item_id": 491, "base_price": 19.99 },
      { "item_id": 492, "base_price": 9.99 }
    ]
}
```

Adjust `item_id` values to match the items in the quote. Items not included in `price_updates` are left unchanged.

For implementation guidance and development considerations, see [Development considerations](totals-collector-development-considerations.md).

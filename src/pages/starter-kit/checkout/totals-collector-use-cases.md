---
title: Totals collector use cases
description: Learn about how you can use the Adobe Commerce checkout starter kit for out-of-process totals and discount integrations.
keywords:
  - App Builder
  - Extensibility
---

# Totals collector use cases

This page explores use cases and scenarios for implementing out-of-process quote totals (such as discounts) using the Adobe Commerce checkout starter kit and the `magento/module-out-of-process-totals-collector` module.

For more general use cases, refer to [use-cases](./use-cases.md).

## How it works

The out-of-process totals collector extends Adobe Commerce quote totals collection via [webhooks](../../webhooks/index.md). When the core discount totals collector runs, a plugin invokes the `GetTotalModificationsInterface::execute` API. The webhook framework sends the quote and totals payload to your subscribed endpoint. Your App Builder application computes discounts (or other total modifications) and returns a JSON Patch response. Commerce applies the response to the quote totals and items, and the built-in `DiscountHandler` applies discount data so it appears in cart/checkout and in GraphQL.

## Totals collector webhook

To apply discounts (or other total modifications) from an external service, register a webhook for the method `plugin.magento.out_of_process_totals_collector.api.get_total_modifications.execute` (type `after`).

&#8203;<Edition name="paas" /> To register the webhook, [modify the `webhooks.xml` file](../../webhooks/hooks.md) (in your module or in `app/etc`):

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_AdobeCommerceWebhooks:etc/webhooks.xsd">
    <method name="plugin.magento.out_of_process_totals_collector.api.get_total_modifications.execute" type="after">
        <hooks>
            <batch name="totals_collector">
                <hook name="totals_collector"
                      url="https://<your_app_builder>.adobeioruntime.net/api/v1/web/commerce-checkout-starter-kit/totals-collector"
                      method="POST"
                      timeout="30000"
                      softTimeout="1000"
                      fallbackErrorMessage="We encountered an issue while calculating your discounts. Please contact the store owner for further assistance.">
                    <fields>
                        <field name="total" />
                        <field name="quote" />
                        <field name="shippingAssignment" />
                    </fields>
                    <rules>
                        <rule field="shippingAssignment.items" operator="notEmpty" />
                    </rules>
                </hook>
            </batch>
        </hooks>
    </method>
</config>
```

&#8203;<Edition name="saas" /> For Adobe Commerce as a Cloud Service, [create the webhook in the Admin](../../webhooks/create-webhooks.md). Use method name `plugin.magento.out_of_process_totals_collector.api.get_total_modifications.execute`, type `after`, and configure the same fields and rules as above.

To improve security, enable [webhook signature verification](../../webhooks/signature-verification.md).

### Payload

The request body includes the quote, shipping assignment, and current totals. The webhook is only triggered when there are items in the shipping assignment (`shippingAssignment.items` not empty). Example structure:

```json
{
  "total": { ... },
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
        "product_id": "9",
        "sku": "simple-product-1",
        "price": 500,
        "base_price": 500,
        "qty": 2,
        ...
      }
    ],
    "shipping": { ... }
  }
}
```

Your endpoint can use this data (items, quantities, prices, customer/quote attributes) to compute discounts or other modifications.

## Response format

The webhook endpoint must return a **JSON Patch** (RFC 6902) array. To supply discount data that the built-in discount handler applies, use a `replace` operation on the `result` path with a value object that matches the totals collector result schema.

### Result object (discount handler)

| Field | Type | Description |
|-------|------|-------------|
| `code` | string | Modification code. Use `"discount"` for the built-in discount handler. |
| `base_discount` | float | Discount amount in base currency, or percentage value when `discount_type` is `"percentage"`. |
| `discount_description_array` | array | Labels shown on cart/checkout (e.g. `["My Custom Discount"]`). |
| `discount_rule_id_array` | array | Optional rule IDs for display or reporting. |
| `discount_type` | string | `"fixed"` or `"percentage"`. Default `"fixed"`. |
| `discount_item_id_array` | array | Quote item IDs the discount applies to. Omit or empty = apply to all items. |

### Example: fixed discount on entire cart

```json
[
  {
    "op": "replace",
    "path": "result",
    "value": {
      "code": "discount",
      "base_discount": 19.00,
      "discount_description_array": ["Promotional discount"],
      "discount_rule_id_array": ["promo_2024"],
      "discount_type": "fixed",
      "discount_item_id_array": []
    }
  }
]
```

### Example: percentage discount with description

```json
[
  {
    "op": "replace",
    "path": "result",
    "value": {
      "code": "discount",
      "base_discount": 10,
      "discount_description_array": ["10% off"],
      "discount_rule_id_array": [],
      "discount_type": "percentage",
      "discount_item_id_array": []
    }
  }
]
```

When `discount_type` is `"percentage"`, the system calculates and distributes the discount across the applicable items; you do not need to return item-level discount amounts in the patch.

### Example: fixed discount on specific items

For a fixed discount, you can optionally return item-level discount amounts via additional patch operations:

```json
[
  {
    "op": "replace",
    "path": "result",
    "value": {
      "code": "discount",
      "base_discount": 15.00,
      "discount_description_array": ["Item discount"],
      "discount_rule_id_array": [],
      "discount_type": "fixed",
      "discount_item_id_array": ["1", "2"]
    }
  },
  {
    "op": "add",
    "path": "shippingAssignment/items/0/base_discount_amount",
    "value": 6.0
  },
  {
    "op": "add",
    "path": "shippingAssignment/items/1/base_discount_amount",
    "value": 9.0
  }
]
```

Item paths use zero-based indices into `shippingAssignment.items`. The handler converts base amounts to store currency and updates totals and GraphQL discount data.

## Use cases

### External discount engine

Use an external service (e.g. promotion engine, loyalty platform, or headless discount API) to decide discount rules. Your App Builder action receives the quote/totals payload, calls the external API, and returns the JSON Patch with a `result` object and optional item-level patches. Commerce applies the changes and the discount appears in cart and checkout.

### Conditional discounts

Implement logic in your action based on cart content, customer group, or other quote/address data from the payload. Return `base_discount: 0` or omit a `result` replace to apply no discount. You can still return other patch operations if needed.

### Multiple or stacked discounts

The webhook supports a single `result` object per invocation. To model multiple discount lines, include several entries in `discount_description_array` and `discount_rule_id_array`; the handler adds them to the address extension attributes and GraphQL discount list. Alternatively, aggregate multiple rules in your external service and return one combined result.

### No discount (fallback)

If your endpoint fails or times out, the webhook framework uses the configured `fallbackErrorMessage` and no out-of-process modifications are applied. Ensure your endpoint is fast and resilient so totals collection remains reliable.

---
title: Totals collector use cases
description: Learn about how you can use the Adobe Commerce checkout starter kit for out-of-process totals and discount integrations.
keywords:
  - App Builder
  - Extensibility
---

# Totals collector use cases

This page explores use cases and scenarios for implementing out-of-process discount totals using the Adobe Commerce checkout starter kit and the `magento/module-out-of-process-totals-collector` module.

For more general use cases, refer to [use-cases](./use-cases.md).

## How it works

The out-of-process totals collector extends Adobe Commerce discount totals collection with [webhooks](../../webhooks/index.md). When the core discount totals collector runs, a plugin invokes the `GetTotalModificationsInterface::execute` API. The webhook framework sends the quote and totals payload to your subscribed endpoint. Your App Builder application computes discounts and returns a JSON Patch response. Commerce applies the response to the quote totals and items, and the built-in `DiscountHandler` applies discount data so it appears in cart/checkout and in GraphQL.

## Totals collector webhook

To apply discounts from an external service, register a webhook for the method `plugin.magento.out_of_process_totals_collector.api.get_total_modifications.execute` (type `after`).

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

Your endpoint can use this data (items, quantities, prices, customer/quote attributes) to compute discounts.

## Response format

The webhook endpoint must return a **JSON Patch** (RFC 6902) array. To supply discount data that the built-in discount handler applies, use a `replace` operation on the `result` path. The `value` object is mapped to `TotalModificationsResultInterface`; handlers (for example, `DiscountHandler`) read it using getters and apply the data to the quote totals and items.

### Result object (discount handler)

| Field | Type | Description                                                                                                                                                                                          |
|-------|------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `code` | string | Modification code (for example, `"discount"`). Used by handlers to identify the type of total modification.                                                                                          |
| `base_discount` | float | The discount amount in base currency to apply to the quote totals. When `discount_type` is `"percentage"`, this is the percentage value and the amount is derived from the basis (subtotal or item). |
| `discount_description_array` | array | List of discount description labels to display on the cart/checkout.                                                                                                                                 |
| `discount_rule_id_array` | array | Optional list of rule IDs associated with the discount, for display or reporting.                                                                                                                    |
| `discount_type` | string | `"fixed"` or `"percentage"`. Default `"fixed"`. When the value is `"fixed"`, `base_discount` is the amount. When the value is `"percentage"`, it is the percentage, and the amount is derived from the basis.                   |
| `discount_item_id_array` | array | When the discount applies to specific items, list of quote item IDs or indices (e.g. `[0, 1, 2]`). Empty or omitted when the discount applies to subtotal.                                           |

### Example: fixed discount on entire cart

When `discount_type` is `"fixed"`, `base_discount` is the total discount amount. Item-level discount patch operations are optional and only needed when you want to explicitly distribute the discount across specific quote items; when provided, their sum should equal `base_discount`.

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

When `discount_type` is `"percentage"`, the system calculates and distributes the discount across the applicable items; you do not need to return item-level discount amounts in the patch.

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

### Example: fixed discount on specific items

You may also include additional JSON Patch operations in the same response when `discount_type` is `"fixed"` and you want to apply specific discount amounts to individual quote items:

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

Item paths use zero-based indices into `shippingAssignment.items`. This allows the external service to explicitly set the discount amount for particular items. The handler converts base amounts to store currency and updates totals and GraphQL discount data.

When `discount_type` is `"percentage"`, item-level discount values do not need to be returned in the patch response. The system automatically calculates and distributes the discount across the applicable items based on the provided percentage.

For totals collector implementation scenarios and guidance, see [Development considerations](./totals-collector-development-considerations.md).

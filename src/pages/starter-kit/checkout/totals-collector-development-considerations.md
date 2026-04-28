---
title: Totals collector development considerations
description: Learn about important development considerations when implementing out-of-process totals collector integrations in the Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - Extensibility
---

# Totals collector development considerations

When implementing out-of-process discount totals collector integrations, consider response model constraints, discount composition behavior, and failure handling. These considerations help keep totals collection predictable and checkout performance reliable.

## External discount engine

Use an external service (such as a promotion engine, loyalty platform, or headless discount API) to decide discount rules. Your App Builder action receives the quote/totals payload, calls the external API, and returns the JSON Patch with a `result` object and optional item-level patches. Commerce applies the changes and the discount appears in cart and checkout.

## Conditional discounts

Implement logic in your action based on cart content, customer group, or other quote/address data from the payload. Return `base_discount: 0` or omit a `result` replace to apply no discount. You can still return other patch operations if needed.

## Multiple or stacked discounts

The webhook supports a single `result` object per invocation. To model multiple discount lines, include several entries in `discount_description_array` and `discount_rule_id_array`; the handler adds them to the address extension attributes and GraphQL discount list. Alternatively, aggregate multiple rules in your external service and return one combined result.

## No discount (fallback)

If your endpoint fails or times out, the webhook framework uses the configured `fallbackErrorMessage` and no out-of-process modifications are applied. Ensure your endpoint is fast and resilient so totals collection remains reliable.

<InlineAlert variant="info" slots="text"/>

The current implementation supports discount handling only via the DiscountHandler. Custom total types are not processed by this module.

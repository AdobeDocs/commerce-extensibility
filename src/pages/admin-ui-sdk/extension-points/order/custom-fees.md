---
title: Order get custom fees
description: Retrieve custom fees applied to orders in the Adobe Commerce Admin.
keywords:
  - App Builder
  - Extensibility
---

# Order get custom fees

The `order get custom fees` extension point displays one or more customized fees or discounts on the following locations:

* The Orders Total section of the Create Order page and related pages in the Admin.
* Invoice pages in the Admin.
* Credit memo pages in the Admin.
* Order history pages on the storefront.

The fee amounts are in the base currency of the store.

## Example customization​

The following example enables the display of two fees on the Admin and storefront. The first instance applies a $1.00 fee to all orders. The second instance applied a fee of $5.00 only when the order total is at least $20.00

```javascript

order: {
    getOrderCustomFees() {
      return [
        {
          id: 'test-fee-1',
          label: 'Test Fee 1',
          value: 1.00,
          applyFeeOnLastCreditMemo: false
        },
        {
          id: 'test-fee-2',
          label: 'Test Fee 2',
          value: 5.00,
          orderMinimumAmount: 20,
          applyFeeOnLastInvoice: true
        }
      ]
    }
}
```

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
`id` | string | Yes | A unique ID that identifies the fee/discount. We recommended using the format: `<extensionId>`::`<fee/discountName>`
`label` | string | Yes | The name of the fee/discount to display.
`value` | float | Yes | The amount of fee/discount to charge, in the base currency.
`orderMinimumAmount` | float | No | The minimum amount of the order to apply the fee/discount. Default value: `0`.
`applyFeeOnLastInvoice` | boolean | No | Whether to apply the fee/discount to the last invoice. If `false`, the fee/discount will be applied to the first invoice. Default value: `false`.
`applyFeeOnLastCreditmemo` | boolean | No | Whether to refund the fee/discount to the last credit memo. If `false`, the fee/discount will be refunded to the first credit memo. Default value: `true`.

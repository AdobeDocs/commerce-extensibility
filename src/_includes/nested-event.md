When the payload contains an array of objects, use the following construction to register specific fields from that array:

```text
<object_name>[].<field_name>
```

For example, the payload of the `observer.sales_order_invoice_save_after` event contains a top-level `items[]` array. In this case, the array contains details about two individual products.

```json
{
  "event": {
    "data": {
      "value": {
        "order_id": "8",
        "store_id": "1",
        "customer_id": null,
        "billing_address_id": "16",
        "shipping_address_id": "15",
        "global_currency_code": "USD",
        "base_currency_code": "USD",
        "store_currency_code": "USD",
        "order_currency_code": "USD",
        "store_to_base_rate": "0.0000",
        "store_to_order_rate": "0.0000",
        "base_to_global_rate": "1.0000",
        "base_to_order_rate": "1.0000",
        "discount_description": null,
        "items": [
          {
            "order_item_id": "8",
            "product_id": "22",
            "sku": "simple-product-2",
            "name": "Simple Product 2",
            "description": null,
            "price": 200,
            "base_price": "200.0000",
            "base_cost": null,
            "price_incl_tax": "200.0000",
            "base_price_incl_tax": "200.0000",
            "extension_attributes": {},
            "weee_tax_applied": "[]",
            "weee_tax_applied_amount": null,
            "weee_tax_applied_row_amount": 0,
            "base_weee_tax_applied_amount": null,
            "base_weee_tax_applied_row_amnt": null,
            "weee_tax_disposition": null,
            "base_weee_tax_disposition": null,
            "weee_tax_row_disposition": 0,
            "base_weee_tax_row_disposition": 0,
            "qty": "3.000000",
            "invoice": {},
            "parent_id": null,
            "store_id": "1",
            "row_total": 600,
            "base_row_total": 600,
            "row_total_incl_tax": 600,
            "base_row_total_incl_tax": 600,
            "tax_amount": 0,
            "base_tax_amount": 0,
            "discount_tax_compensation_amount": 0,
            "base_discount_tax_compensation_amount": 0,
            "base_weee_tax_applied_row_amount": 0
          },
          {
            "order_item_id": "9",
            "product_id": "21",
            "sku": "simple-product-1",
            "name": "Simple Product 1",
            "description": null,
            "price": 100,
            "base_price": "100.0000",
            "base_cost": null,
            "price_incl_tax": "100.0000",
            "base_price_incl_tax": "100.0000",
            "extension_attributes": {},
            "weee_tax_applied": "[]",
            "weee_tax_applied_amount": null,
            "weee_tax_applied_row_amount": 0,
            "base_weee_tax_applied_amount": null,
            "base_weee_tax_applied_row_amnt": null,
            "weee_tax_disposition": null,
            "base_weee_tax_disposition": null,
            "weee_tax_row_disposition": 0,
            "base_weee_tax_row_disposition": 0,
            "qty": "5.000000",
            "invoice": {},
            "parent_id": null,
            "store_id": "1",
            "row_total": 500,
            "base_row_total": 500,
            "row_total_incl_tax": 500,
            "base_row_total_incl_tax": 500,
            "tax_amount": 0,
            "base_tax_amount": 0,
            "discount_tax_compensation_amount": 0,
            "base_discount_tax_compensation_amount": 0,
            "base_weee_tax_applied_row_amount": 0
          }
        ],
        "total_qty": 8,
        "subtotal": 1100,
        "base_subtotal": 1100,
        "subtotal_incl_tax": 1100,
        "base_subtotal_incl_tax": 1100,
        "grand_total": 1100,
        "base_grand_total": 1100,
        "discount_amount": 0,
        "base_discount_amount": 0,
        "tax_amount": 0,
        "base_tax_amount": 0,
        "discount_tax_compensation_amount": 0,
        "base_discount_tax_compensation_amount": 0,
        "base_cost": 0,
        "base_gift_cards_amount": 0,
        "gift_cards_amount": 0,
        "can_void_flag": false,
        "state": 2,
        "increment_id": "000000013",
        "entity_id": "13",
        "id": "13",
        "created_at": "2023-04-06 18:36:18",
        "updated_at": "2023-04-06 18:36:18"
      }
    }
  }
}
```

To register the top-level `order_id` field and the `sku` and `qty` of each product, define the subscription as follows:

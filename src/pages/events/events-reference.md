---
title:  Events reference
description: Lists details about each event supported on Adobe Commerce as a Cloud Service.
edition: saas
keywords:
  - Events
  - Extensibility
---

# Events reference

This reference lists the full payload for each event supported on Adobe Commerce as a Cloud Service. Adobe recommends that you minimize the data that you send to App Builder, as described in [Create event subscriptions from the Admin](create-events.md).

* [Catalog](#catalog)
* [CatalogInventory](#cataloginventory)
* [Checkout](#checkout)
* [Company](#company)
* [Customer](#customer)
* [CustomerCustomAttributes](#customercustomattributes)
* [Integration](#integration)
* [Multishipping](#multishipping)
* [PayPal](#paypal)
* [Quote](#quote)
* [RMA](#rma)
* [SaasReminder](#saasreminder)
* [Sales](#sales)
* [SalesRule](#salesrule)

Events can be triggered from the Commerce Admin, REST APIs, GraphQL APIs, Edge Delivery Service (EDS) storefront calls, and import actions. The event details section for each event lists the sources that can trigger the event. In the cases where a source is not listed, whether the event can be triggered from that source cannot be determined.

## Catalog

### observer.catalog_category_delete_after

Triggered after a catalog category is deleted, while the database transaction is still open. The deletion is not yet durable and can be rolled back. In most cases, you should use `observer.catalog_category_delete_commit_after` for external integrations.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "products_position": "array",
    "store_ids": "array",
    "store_id": "int",
    "url": "string",
    "parent_category": {
        "products_position": "array",
        "store_ids": "array",
        "store_id": "int",
        "url": "string",
        "parent_category": "object{}",
        "parent_id": "int",
        "custom_design_date": "array",
        "path_ids": "array",
        "level": "int",
        "request_path": "string",
        "name": "string",
        "product_count": "int",
        "available_sort_by": "array",
        "default_sort_by": "string",
        "path": "string",
        "position": "int",
        "children_count": "int",
        "created_at": "string",
        "updated_at": "string",
        "is_active": "bool",
        "category_id": "int",
        "display_mode": "string",
        "include_in_menu": "bool",
        "url_key": "string",
        "children_data": "object{}[]"
    },
    "parent_id": "int",
    "custom_design_date": "array",
    "path_ids": "array",
    "level": "int",
    "request_path": "string",
    "name": "string",
    "product_count": "int",
    "available_sort_by": "array",
    "default_sort_by": "string",
    "path": "string",
    "position": "int",
    "children_count": "int",
    "created_at": "string",
    "updated_at": "string",
    "is_active": "bool",
    "category_id": "int",
    "display_mode": "string",
    "include_in_menu": "bool",
    "url_key": "string",
    "children_data": [
        {
            "id": "int",
            "parent_id": "int",
            "name": "string",
            "is_active": "bool",
            "position": "int",
            "level": "int",
            "product_count": "int",
            "children_data": "object{}[]"
        }
    ],
    "_origData": "array",
    "_isNew": "boolean"
}
```

### observer.catalog_category_save_after

Triggered after a catalog category is created or updated, while the database transaction is still open. The write is not yet durable and can be rolled back.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "products_position": "array",
    "store_ids": "array",
    "store_id": "int",
    "url": "string",
    "parent_category": {
        "products_position": "array",
        "store_ids": "array",
        "store_id": "int",
        "url": "string",
        "parent_category": "object{}",
        "parent_id": "int",
        "custom_design_date": "array",
        "path_ids": "array",
        "level": "int",
        "request_path": "string",
        "name": "string",
        "product_count": "int",
        "available_sort_by": "array",
        "default_sort_by": "string",
        "path": "string",
        "position": "int",
        "children_count": "int",
        "created_at": "string",
        "updated_at": "string",
        "is_active": "bool",
        "category_id": "int",
        "display_mode": "string",
        "include_in_menu": "bool",
        "url_key": "string",
        "children_data": "object{}[]"
    },
    "parent_id": "int",
    "custom_design_date": "array",
    "path_ids": "array",
    "level": "int",
    "request_path": "string",
    "name": "string",
    "product_count": "int",
    "available_sort_by": "array",
    "default_sort_by": "string",
    "path": "string",
    "position": "int",
    "children_count": "int",
    "created_at": "string",
    "updated_at": "string",
    "is_active": "bool",
    "category_id": "int",
    "display_mode": "string",
    "include_in_menu": "bool",
    "url_key": "string",
    "children_data": [
        {
            "id": "int",
            "parent_id": "int",
            "name": "string",
            "is_active": "bool",
            "position": "int",
            "level": "int",
            "product_count": "int",
            "children_data": "object{}[]"
        }
    ],
    "_origData": "array",
    "_isNew": "boolean"
}
```

### observer.catalog_product_delete_commit_after

Triggered after a catalog product is deleted and the database transaction has committed. Because the deletion is durable at this point, this is the recommended event for external integrations.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following sources:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "store_id": "int",
    "name": "string",
    "price": "float",
    "visibility": "int",
    "attribute_set_id": "int",
    "created_at": "string",
    "updated_at": "string",
    "type_id": "array",
    "status": "int",
    "category_id": "int",
    "category": {
        "products_position": "array",
        "store_ids": "array",
        "store_id": "int",
        "url": "string",
        "parent_category": "object{}",
        "parent_id": "int",
        "custom_design_date": "array",
        "path_ids": "array",
        "level": "int",
        "request_path": "string",
        "name": "string",
        "product_count": "int",
        "available_sort_by": "array",
        "default_sort_by": "string",
        "path": "string",
        "position": "int",
        "children_count": "int",
        "created_at": "string",
        "updated_at": "string",
        "is_active": "bool",
        "category_id": "int",
        "display_mode": "string",
        "include_in_menu": "bool",
        "url_key": "string",
        "children_data": "object{}[]"
    },
    "category_ids": "array",
    "website_ids": "array",
    "store_ids": "array",
    "qty": "float",
    "data_changed": "bool",
    "calculated_final_price": "float",
    "minimal_price": "float",
    "special_price": "float",
    "special_from_date": "mixed",
    "special_to_date": "mixed",
    "related_products": "array",
    "related_product_ids": "array",
    "up_sell_products": "array",
    "up_sell_product_ids": "array",
    "cross_sell_products": "array",
    "cross_sell_product_ids": "array",
    "media_attributes": "array",
    "media_attribute_values": "array",
    "media_gallery_images": {
        "loaded": "bool",
        "last_page_number": "int",
        "page_size": "int",
        "size": "int",
        "first_item": "object{}",
        "last_item": "object{}",
        "items": "object{}[]",
        "all_ids": "array",
        "new_empty_item": "object{}",
        "iterator": "\ArrayIterator"
    },
    "salable": "bool",
    "is_salable": "bool",
    "custom_design_date": "array",
    "request_path": "string",
    "gift_message_available": "string",
    "options": [
        {
            "product_sku": "string",
            "option_id": "int",
            "title": "string",
            "type": "string",
            "sort_order": "int",
            "is_require": "bool",
            "price": "float",
            "price_type": "string",
            "sku": "string",
            "file_extension": "string",
            "max_characters": "int",
            "image_size_x": "int",
            "image_size_y": "int",
            "values": "object{}[]",
            "extension_attributes": "object{}"
        }
    ],
    "preconfigured_values": {
        "empty": "bool"
    },
    "identities": "array",
    "id": "int",
    "quantity_and_stock_status": "array",
    "stock_data": "array",
    "_origData": "array",
    "_isNew": "boolean"
}
```

### observer.catalog_product_save_after

Triggered after a catalog product is created or updated, while the database transaction is still open. The write is not yet durable and can be rolled back. Use `observer.catalog_product_save_commit_after` for external integrations.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "store_id": "int",
    "name": "string",
    "price": "float",
    "visibility": "int",
    "attribute_set_id": "int",
    "created_at": "string",
    "updated_at": "string",
    "type_id": "array",
    "status": "int",
    "category_id": "int",
    "category": {
        "products_position": "array",
        "store_ids": "array",
        "store_id": "int",
        "url": "string",
        "parent_category": "object{}",
        "parent_id": "int",
        "custom_design_date": "array",
        "path_ids": "array",
        "level": "int",
        "request_path": "string",
        "name": "string",
        "product_count": "int",
        "available_sort_by": "array",
        "default_sort_by": "string",
        "path": "string",
        "position": "int",
        "children_count": "int",
        "created_at": "string",
        "updated_at": "string",
        "is_active": "bool",
        "category_id": "int",
        "display_mode": "string",
        "include_in_menu": "bool",
        "url_key": "string",
        "children_data": "object{}[]"
    },
    "category_ids": "array",
    "website_ids": "array",
    "store_ids": "array",
    "qty": "float",
    "data_changed": "bool",
    "calculated_final_price": "float",
    "minimal_price": "float",
    "special_price": "float",
    "special_from_date": "mixed",
    "special_to_date": "mixed",
    "related_products": "array",
    "related_product_ids": "array",
    "up_sell_products": "array",
    "up_sell_product_ids": "array",
    "cross_sell_products": "array",
    "cross_sell_product_ids": "array",
    "media_attributes": "array",
    "media_attribute_values": "array",
    "media_gallery_images": {
        "loaded": "bool",
        "last_page_number": "int",
        "page_size": "int",
        "size": "int",
        "first_item": "object{}",
        "last_item": "object{}",
        "items": "object{}[]",
        "all_ids": "array",
        "new_empty_item": "object{}",
        "iterator": "\ArrayIterator"
    },
    "salable": "bool",
    "is_salable": "bool",
    "custom_design_date": "array",
    "request_path": "string",
    "gift_message_available": "string",
    "options": [
        {
            "product_sku": "string",
            "option_id": "int",
            "title": "string",
            "type": "string",
            "sort_order": "int",
            "is_require": "bool",
            "price": "float",
            "price_type": "string",
            "sku": "string",
            "file_extension": "string",
            "max_characters": "int",
            "image_size_x": "int",
            "image_size_y": "int",
            "values": "object{}[]",
            "extension_attributes": "object{}"
        }
    ],
    "preconfigured_values": {
        "empty": "bool"
    },
    "identities": "array",
    "id": "int",
    "quantity_and_stock_status": "array",
    "stock_data": "array",
    "_origData": "array",
    "_isNew": "boolean"
}
```

### observer.catalog_product_save_commit_after

Triggered after a catalog product is created or updated and the database transaction has committed. Because the write is durable at this point, this is the recommended event for external integrations.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "store_id": "int",
    "name": "string",
    "price": "float",
    "visibility": "int",
    "attribute_set_id": "int",
    "created_at": "string",
    "updated_at": "string",
    "type_id": "array",
    "status": "int",
    "category_id": "int",
    "category": {
        "products_position": "array",
        "store_ids": "array",
        "store_id": "int",
        "url": "string",
        "parent_category": "object{}",
        "parent_id": "int",
        "custom_design_date": "array",
        "path_ids": "array",
        "level": "int",
        "request_path": "string",
        "name": "string",
        "product_count": "int",
        "available_sort_by": "array",
        "default_sort_by": "string",
        "path": "string",
        "position": "int",
        "children_count": "int",
        "created_at": "string",
        "updated_at": "string",
        "is_active": "bool",
        "category_id": "int",
        "display_mode": "string",
        "include_in_menu": "bool",
        "url_key": "string",
        "children_data": "object{}[]"
    },
    "category_ids": "array",
    "website_ids": "array",
    "store_ids": "array",
    "qty": "float",
    "data_changed": "bool",
    "calculated_final_price": "float",
    "minimal_price": "float",
    "special_price": "float",
    "special_from_date": "mixed",
    "special_to_date": "mixed",
    "related_products": "array",
    "related_product_ids": "array",
    "up_sell_products": "array",
    "up_sell_product_ids": "array",
    "cross_sell_products": "array",
    "cross_sell_product_ids": "array",
    "media_attributes": "array",
    "media_attribute_values": "array",
    "media_gallery_images": {
        "loaded": "bool",
        "last_page_number": "int",
        "page_size": "int",
        "size": "int",
        "first_item": "object{}",
        "last_item": "object{}",
        "items": "object{}[]",
        "all_ids": "array",
        "new_empty_item": "object{}",
        "iterator": "\ArrayIterator"
    },
    "salable": "bool",
    "is_salable": "bool",
    "custom_design_date": "array",
    "request_path": "string",
    "gift_message_available": "string",
    "options": [
        {
            "product_sku": "string",
            "option_id": "int",
            "title": "string",
            "type": "string",
            "sort_order": "int",
            "is_require": "bool",
            "price": "float",
            "price_type": "string",
            "sku": "string",
            "file_extension": "string",
            "max_characters": "int",
            "image_size_x": "int",
            "image_size_y": "int",
            "values": "object{}[]",
            "extension_attributes": "object{}"
        }
    ],
    "preconfigured_values": {
        "empty": "bool"
    },
    "identities": "array",
    "id": "int",
    "quantity_and_stock_status": "array",
    "stock_data": "array",
    "_origData": "array",
    "_isNew": "boolean"
}
```

## CatalogInventory

### observer.cataloginventory_stock_item_save_commit_after

Triggered after a stock item is saved and the database transaction has committed. Because the write is durable at this point, this is the recommended event for external inventory integrations.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "item_id": "int",
    "website_id": "int",
    "stock_id": "int",
    "product_id": "int",
    "stock_status_changed_auto": "bool",
    "qty": "float",
    "is_in_stock": "bool",
    "is_qty_decimal": "bool",
    "is_decimal_divided": "bool",
    "low_stock_date": "string",
    "use_config_min_qty": "bool",
    "min_qty": "float",
    "use_config_min_sale_qty": "bool",
    "min_sale_qty": "float",
    "use_config_max_sale_qty": "bool",
    "max_sale_qty": "float",
    "use_config_notify_stock_qty": "bool",
    "notify_stock_qty": "float",
    "use_config_enable_qty_inc": "bool",
    "enable_qty_increments": "bool",
    "use_config_qty_increments": "bool",
    "qty_increments": "int",
    "use_config_backorders": "bool",
    "backorders": "int",
    "use_config_manage_stock": "bool",
    "manage_stock": "int",
    "_origData": "array",
    "_isNew": "boolean"
}
```

## Checkout

### observer.checkout_cart_product_add_after

Triggered after a product is added to the shopping cart through the session-based checkout cart model. This is a point-in-time signal, and the cart is not necessarily persisted when it fires.

**Event details**:

This event cannot be triggered from the following sources:

* GraphQL
* Storefront (EDS)
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "quote_product_ids": "array",
    "quote": {
        "currency": "object{}",
        "items": "object{}[]",
        "created_at": "string",
        "updated_at": "string",
        "converted_at": "string",
        "is_active": "bool",
        "items_count": "int",
        "items_qty": "float",
        "orig_order_id": "int",
        "reserved_order_id": "string",
        "customer_is_guest": "bool",
        "customer_note": "string",
        "customer_note_notify": "bool",
        "store_id": "int",
        "shared_store_ids": "array",
        "customer_group_id": "int",
        "customer_tax_class_id": "int",
        "items_summary_qty": "int",
        "item_virtual_qty": "int",
        "totals": "object{}[]",
        "messages": "array"
    }
}
```

### observer.checkout_submit_all_after

Triggered after a quote is converted into an order and the order-placement transaction has completed. The order is persisted by the time this event fires, but it is a workflow signal rather than a database commit callback.

**Event details**:

This event triggers after the place operation, as a point-in-time signal.

This event can be triggered from the following sources:

* Admin
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following sources:

* REST
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "order": {
        "payment": {
            "account_status": "string",
            "additional_data": "string",
            "additional_information": "string[]",
            "address_status": "string",
            "amount_authorized": "float",
            "amount_canceled": "float",
            "amount_ordered": "float",
            "amount_paid": "float",
            "amount_refunded": "float",
            "anet_trans_method": "string",
            "base_amount_authorized": "float",
            "base_amount_canceled": "float",
            "base_amount_ordered": "float",
            "base_amount_paid": "float",
            "base_amount_paid_online": "float",
            "base_amount_refunded": "float",
            "base_amount_refunded_online": "float",
            "base_shipping_amount": "float",
            "base_shipping_captured": "float",
            "base_shipping_refunded": "float",
            "cc_approval": "string",
            "cc_avs_status": "string",
            "cc_cid_status": "string",
            "cc_debug_request_body": "string",
            "cc_debug_response_body": "string",
            "cc_debug_response_serialized": "string",
            "cc_exp_month": "string",
            "cc_exp_year": "string",
            "cc_last4": "string",
            "cc_number_enc": "string",
            "cc_owner": "string",
            "cc_secure_verify": "string",
            "cc_ss_issue": "string",
            "cc_ss_start_month": "string",
            "cc_ss_start_year": "string",
            "cc_status": "string",
            "cc_status_description": "string",
            "cc_trans_id": "string",
            "cc_type": "string",
            "echeck_account_name": "string",
            "echeck_account_type": "string",
            "echeck_bank_name": "string",
            "echeck_routing_number": "string",
            "echeck_type": "string",
            "entity_id": "int",
            "last_trans_id": "string",
            "method": "string",
            "parent_id": "int",
            "po_number": "string",
            "protection_eligibility": "string",
            "quote_payment_id": "int",
            "shipping_amount": "float",
            "shipping_captured": "float",
            "shipping_refunded": "float",
            "extension_attributes": "object{}"
        },
        "tracking_numbers": "array",
        "real_order_id": "string",
        "increment_id": "string",
        "items": [
            {
                "additional_data": "string",
                "amount_refunded": "float",
                "applied_rule_ids": "string",
                "base_amount_refunded": "float",
                "base_cost": "float",
                "base_discount_amount": "float",
                "base_discount_invoiced": "float",
                "base_discount_refunded": "float",
                "base_discount_tax_compensation_amount": "float",
                "base_discount_tax_compensation_invoiced": "float",
                "base_discount_tax_compensation_refunded": "float",
                "base_original_price": "float",
                "base_price": "float",
                "base_price_incl_tax": "float",
                "base_row_invoiced": "float",
                "base_row_total": "float",
                "base_row_total_incl_tax": "float",
                "base_tax_amount": "float",
                "base_tax_before_discount": "float",
                "base_tax_invoiced": "float",
                "base_tax_refunded": "float",
                "base_weee_tax_applied_amount": "float",
                "base_weee_tax_applied_row_amnt": "float",
                "base_weee_tax_disposition": "float",
                "base_weee_tax_row_disposition": "float",
                "created_at": "string",
                "description": "string",
                "discount_amount": "float",
                "discount_invoiced": "float",
                "discount_percent": "float",
                "discount_refunded": "float",
                "event_id": "int",
                "ext_order_item_id": "string",
                "free_shipping": "int",
                "gw_base_price": "float",
                "gw_base_price_invoiced": "float",
                "gw_base_price_refunded": "float",
                "gw_base_tax_amount": "float",
                "gw_base_tax_amount_invoiced": "float",
                "gw_base_tax_amount_refunded": "float",
                "gw_id": "int",
                "gw_price": "float",
                "gw_price_invoiced": "float",
                "gw_price_refunded": "float",
                "gw_tax_amount": "float",
                "gw_tax_amount_invoiced": "float",
                "gw_tax_amount_refunded": "float",
                "discount_tax_compensation_amount": "float",
                "discount_tax_compensation_canceled": "float",
                "discount_tax_compensation_invoiced": "float",
                "discount_tax_compensation_refunded": "float",
                "is_qty_decimal": "int",
                "is_virtual": "int",
                "item_id": "int",
                "locked_do_invoice": "int",
                "locked_do_ship": "int",
                "name": "string",
                "no_discount": "int",
                "order_id": "int",
                "original_price": "float",
                "parent_item_id": "int",
                "price": "float",
                "price_incl_tax": "float",
                "product_id": "int",
                "product_type": "string",
                "qty_backordered": "float",
                "qty_canceled": "float",
                "qty_invoiced": "float",
                "qty_ordered": "float",
                "qty_refunded": "float",
                "qty_returned": "float",
                "qty_shipped": "float",
                "quote_item_id": "int",
                "row_invoiced": "float",
                "row_total": "float",
                "row_total_incl_tax": "float",
                "row_weight": "float",
                "sku": "string",
                "store_id": "int",
                "tax_amount": "float",
                "tax_before_discount": "float",
                "tax_canceled": "float",
                "tax_invoiced": "float",
                "tax_percent": "float",
                "tax_refunded": "float",
                "updated_at": "string",
                "weee_tax_applied": "string",
                "weee_tax_applied_amount": "float",
                "weee_tax_applied_row_amount": "float",
                "weee_tax_disposition": "float",
                "weee_tax_row_disposition": "float",
                "weight": "float",
                "parent_item": "object{}",
                "product_option": "object{}",
                "extension_attributes": "object{}",
                "custom_attributes": [
                    {
                        "attribute_code": "string",
                        "value": "mixed"
                    }
                ]
            }
        ],
        "addresses": [
            {
                "address_type": "string",
                "city": "string",
                "company": "string",
                "country_id": "string",
                "customer_address_id": "int",
                "customer_id": "int",
                "email": "string",
                "entity_id": "int",
                "fax": "string",
                "firstname": "string",
                "lastname": "string",
                "middlename": "string",
                "parent_id": "int",
                "postcode": "string",
                "prefix": "string",
                "region": "string",
                "region_code": "string",
                "region_id": "int",
                "street": "string[]",
                "suffix": "string",
                "telephone": "string",
                "vat_id": "string",
                "vat_is_valid": "int",
                "vat_request_date": "string",
                "vat_request_id": "string",
                "vat_request_success": "int",
                "extension_attributes": "object{}"
            }
        ],
        "status_histories": [
            {
                "comment": "string",
                "created_at": "string",
                "entity_id": "int",
                "entity_name": "string",
                "is_customer_notified": "int",
                "is_visible_on_front": "int",
                "parent_id": "int",
                "status": "string",
                "extension_attributes": "object{}"
            }
        ],
        "adjustment_negative": "float",
        "adjustment_positive": "float",
        "applied_rule_ids": "string",
        "base_adjustment_negative": "float",
        "base_adjustment_positive": "float",
        "base_currency_code": "string",
        "base_discount_amount": "float",
        "base_discount_canceled": "float",
        "base_discount_invoiced": "float",
        "base_discount_refunded": "float",
        "base_grand_total": "float",
        "base_discount_tax_compensation_amount": "float",
        "base_discount_tax_compensation_invoiced": "float",
        "base_discount_tax_compensation_refunded": "float",
        "base_shipping_amount": "float",
        "base_shipping_canceled": "float",
        "base_shipping_discount_amount": "float",
        "base_shipping_discount_tax_compensation_amnt": "float",
        "base_shipping_incl_tax": "float",
        "base_shipping_invoiced": "float",
        "base_shipping_refunded": "float",
        "base_shipping_tax_amount": "float",
        "base_shipping_tax_refunded": "float",
        "base_subtotal": "float",
        "base_subtotal_canceled": "float",
        "base_subtotal_incl_tax": "float",
        "base_subtotal_invoiced": "float",
        "base_subtotal_refunded": "float",
        "base_tax_amount": "float",
        "base_tax_canceled": "float",
        "base_tax_invoiced": "float",
        "base_tax_refunded": "float",
        "base_total_canceled": "float",
        "base_total_invoiced": "float",
        "base_total_invoiced_cost": "float",
        "base_total_offline_refunded": "float",
        "base_total_online_refunded": "float",
        "base_total_paid": "float",
        "base_total_qty_ordered": "float",
        "base_total_refunded": "float",
        "base_to_global_rate": "float",
        "base_to_order_rate": "float",
        "billing_address_id": "int",
        "can_ship_partially": "int",
        "can_ship_partially_item": "int",
        "coupon_code": "string",
        "created_at": "string",
        "customer_dob": "string",
        "customer_email": "string",
        "customer_firstname": "string",
        "customer_gender": "int",
        "customer_group_id": "int",
        "customer_id": "int",
        "customer_is_guest": "int",
        "customer_lastname": "string",
        "customer_middlename": "string",
        "customer_note": "string",
        "customer_note_notify": "int",
        "customer_prefix": "string",
        "customer_suffix": "string",
        "customer_taxvat": "string",
        "discount_amount": "float",
        "discount_canceled": "float",
        "discount_description": "string",
        "discount_invoiced": "float",
        "discount_refunded": "float",
        "edit_increment": "int",
        "email_sent": "int",
        "ext_customer_id": "string",
        "ext_order_id": "string",
        "forced_shipment_with_invoice": "int",
        "global_currency_code": "string",
        "grand_total": "float",
        "discount_tax_compensation_amount": "float",
        "discount_tax_compensation_invoiced": "float",
        "discount_tax_compensation_refunded": "float",
        "hold_before_state": "string",
        "hold_before_status": "string",
        "is_virtual": "int",
        "order_currency_code": "string",
        "original_increment_id": "string",
        "payment_authorization_amount": "float",
        "payment_auth_expiration": "int",
        "protect_code": "string",
        "quote_address_id": "int",
        "quote_id": "int",
        "relation_child_id": "string",
        "relation_child_real_id": "string",
        "relation_parent_id": "string",
        "relation_parent_real_id": "string",
        "remote_ip": "string",
        "shipping_amount": "float",
        "shipping_canceled": "float",
        "shipping_description": "string",
        "shipping_discount_amount": "float",
        "shipping_discount_tax_compensation_amount": "float",
        "shipping_incl_tax": "float",
        "shipping_invoiced": "float",
        "shipping_refunded": "float",
        "shipping_tax_amount": "float",
        "shipping_tax_refunded": "float",
        "state": "string",
        "status": "string",
        "store_currency_code": "string",
        "store_id": "int",
        "store_name": "string",
        "store_to_base_rate": "float",
        "store_to_order_rate": "float",
        "subtotal": "float",
        "subtotal_canceled": "float",
        "subtotal_incl_tax": "float",
        "subtotal_invoiced": "float",
        "subtotal_refunded": "float",
        "tax_amount": "float",
        "tax_canceled": "float",
        "tax_invoiced": "float",
        "tax_refunded": "float",
        "total_canceled": "float",
        "total_invoiced": "float",
        "total_item_count": "int",
        "total_offline_refunded": "float",
        "total_online_refunded": "float",
        "total_paid": "float",
        "total_qty_ordered": "float",
        "total_refunded": "float",
        "updated_at": "string",
        "weight": "float",
        "x_forwarded_for": "string",
        "custom_attributes": [
            {
                "attribute_code": "string",
                "value": "mixed"
            }
        ]
    },
    "quote": {
        "currency": {
            "global_currency_code": "string",
            "base_currency_code": "string",
            "store_currency_code": "string",
            "quote_currency_code": "string",
            "store_to_base_rate": "float",
            "store_to_quote_rate": "float",
            "base_to_global_rate": "float",
            "base_to_quote_rate": "float",
            "extension_attributes": "object{}"
        },
        "items": [
            {
                "item_id": "int",
                "sku": "string",
                "qty": "float",
                "name": "string",
                "price": "float",
                "product_type": "string",
                "quote_id": "string",
                "product_option": "object{}",
                "extension_attributes": "object{}",
                "custom_attributes": [
                    {
                        "attribute_code": "string",
                        "value": "mixed"
                    }
                ]
            }
        ],
        "created_at": "string",
        "updated_at": "string",
        "converted_at": "string",
        "is_active": "bool",
        "items_count": "int",
        "items_qty": "float",
        "orig_order_id": "int",
        "reserved_order_id": "string",
        "customer_is_guest": "bool",
        "customer_note": "string",
        "customer_note_notify": "bool",
        "store_id": "int",
        "shared_store_ids": "array",
        "customer_group_id": "int",
        "customer_tax_class_id": "int",
        "items_summary_qty": "int",
        "item_virtual_qty": "int",
        "totals": [
            {
                "full_info": "array"
            }
        ],
        "messages": "array",
        "custom_attributes": [
            {
                "attribute_code": "string",
                "value": "mixed"
            }
        ]
    }
}
```

## Company

### observer.company_save_commit_after

Triggered after a B2B company is created or updated and the database transaction has committed.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "id": "int",
    "status": "int",
    "company_name": "string",
    "legal_name": "string",
    "company_email": "string",
    "vat_tax_id": "string",
    "reseller_id": "string",
    "comment": "string",
    "city": "string",
    "country_id": "string",
    "region": "string",
    "region_id": "string",
    "postcode": "string",
    "telephone": "string",
    "street_full": "mixed",
    "customer_group_id": "int",
    "sales_representative_id": "int",
    "super_user_id": "int",
    "reject_reason": "string",
    "rejected_at": "string",
    "_origData": "array",
    "_isNew": "boolean"
}
```

## Customer

### observer.customer_delete_commit_after

Triggered after a customer is deleted and the database transaction has committed. Because the deletion is durable at this point, this is the recommended event for integrations that react to customer deletion.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "id": "int",
    "group_id": "int",
    "default_billing": "string",
    "default_shipping": "string",
    "confirmation": "string",
    "created_at": "string",
    "updated_at": "string",
    "created_in": "string",
    "dob": "string",
    "email": "string",
    "firstname": "string",
    "lastname": "string",
    "middlename": "string",
    "prefix": "string",
    "suffix": "string",
    "gender": "int",
    "store_id": "int",
    "taxvat": "string",
    "website_id": "int",
    "addresses": "object{}[]",
    "disable_auto_group_change": "int",
    "extension_attributes": "object{}"
}
```

### observer.customer_group_delete_commit_after

Triggered after a customer group is deleted and the database transaction has committed. Because the deletion is durable at this point, this is the recommended event for integrations that react to group removal.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "tax_class_name": "string",
    "_origData": "array",
    "_isNew": "boolean"
}
```

### observer.customer_group_save_commit_after

Triggered after a customer group is created or updated and the database transaction has committed. Because the write is durable at this point, this is the recommended event for integrations that react to group changes.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "tax_class_name": "string",
    "_origData": "array",
    "_isNew": "boolean"
}
```

### observer.customer_login

Triggered when a customer is logged in on the storefront. This is a point-in-time authentication signal with no transaction or persistence semantics of its own.

**Event details**:

This event can be triggered from the following sources:

* Storefront (EDS)

It cannot be triggered from the following sources:

* Admin
* GraphQL
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "customer": {
        "id": "int",
        "group_id": "int",
        "default_billing": "string",
        "default_shipping": "string",
        "confirmation": "string",
        "created_at": "string",
        "updated_at": "string",
        "created_in": "string",
        "dob": "string",
        "email": "string",
        "firstname": "string",
        "lastname": "string",
        "middlename": "string",
        "prefix": "string",
        "suffix": "string",
        "gender": "int",
        "store_id": "int",
        "taxvat": "string",
        "website_id": "int",
        "addresses": [
            {
                "id": "int",
                "customer_id": "int",
                "region": "object{}",
                "region_id": "int",
                "country_id": "string",
                "street": "string[]",
                "company": "string",
                "telephone": "string",
                "fax": "string",
                "postcode": "string",
                "city": "string",
                "firstname": "string",
                "lastname": "string",
                "middlename": "string",
                "prefix": "string",
                "suffix": "string",
                "vat_id": "string",
                "default_shipping": "bool",
                "default_billing": "bool",
                "extension_attributes": "object{}"
            }
        ],
        "disable_auto_group_change": "int",
        "extension_attributes": {
            "company_attributes": "object{}",
            "is_subscribed": "boolean",
            "assistance_allowed": "integer"
        }
    }
}
```

\<!--

### observer.customer_register_success

Triggered after a customer account is successfully created through storefront registration. This is a point-in-time workflow signal with no transaction semantics of its own.

**Event details**:

It cannot be triggered from the following sources:

* Admin
* REST
* GraphQL
* Storefront (EDS)
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "customer": {
        "id": "int",
        "group_id": "int",
        "default_billing": "string",
        "default_shipping": "string",
        "confirmation": "string",
        "created_at": "string",
        "updated_at": "string",
        "created_in": "string",
        "dob": "string",
        "email": "string",
        "firstname": "string",
        "lastname": "string",
        "middlename": "string",
        "prefix": "string",
        "suffix": "string",
        "gender": "int",
        "store_id": "int",
        "taxvat": "string",
        "website_id": "int",
        "addresses": [
            {
                "id": "int",
                "customer_id": "int",
                "region": "object{}",
                "region_id": "int",
                "country_id": "string",
                "street": "string[]",
                "company": "string",
                "telephone": "string",
                "fax": "string",
                "postcode": "string",
                "city": "string",
                "firstname": "string",
                "lastname": "string",
                "middlename": "string",
                "prefix": "string",
                "suffix": "string",
                "vat_id": "string",
                "default_shipping": "bool",
                "default_billing": "bool",
                "extension_attributes": "object{}"
            }
        ],
        "disable_auto_group_change": "int",
        "extension_attributes": {
            "company_attributes": "object{}",
            "is_subscribed": "boolean",
            "assistance_allowed": "integer"
        }
    },
    "account_controller": []
}
```

--\>

### observer.customer_save_after

Triggered after a customer record is created or updated, while the database transaction is still open. The write is not yet durable and can be rolled back. Use `observer.customer_save_commit_after` for external integrations.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST
* GraphQL

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "id": "int",
    "group_id": "int",
    "default_billing": "string",
    "default_shipping": "string",
    "confirmation": "string",
    "created_at": "string",
    "updated_at": "string",
    "created_in": "string",
    "dob": "string",
    "email": "string",
    "firstname": "string",
    "lastname": "string",
    "middlename": "string",
    "prefix": "string",
    "suffix": "string",
    "gender": "int",
    "store_id": "int",
    "taxvat": "string",
    "website_id": "int",
    "addresses": "object{}[]",
    "disable_auto_group_change": "int",
    "extension_attributes": "object{}"
}
```

### observer.customer_save_commit_after

Triggered after a customer record is created or updated and the database transaction has committed. Because the write is durable at this point, this is the recommended event for external integrations such as CRM synchronization.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST
* GraphQL

It cannot be triggered from the following sources:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "id": "int",
    "group_id": "int",
    "default_billing": "string",
    "default_shipping": "string",
    "confirmation": "string",
    "created_at": "string",
    "updated_at": "string",
    "created_in": "string",
    "dob": "string",
    "email": "string",
    "firstname": "string",
    "lastname": "string",
    "middlename": "string",
    "prefix": "string",
    "suffix": "string",
    "gender": "int",
    "store_id": "int",
    "taxvat": "string",
    "website_id": "int",
    "addresses": "object{}[]",
    "disable_auto_group_change": "int",
    "extension_attributes": "object{}"
}
```

## CustomerCustomAttributes

### observer.customercustomattributes_attribute_save

Triggered after a customer custom (EAV) attribute definition is created or updated from the Admin. The attribute definition is durable by the time this event fires.

**Event details**:

This event can be triggered from the following sources:

* Admin

It cannot be triggered from the following sources:

* REST
* GraphQL
* Storefront (EDS)
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
[]
```

## Integration

### observer.customer_login

Triggered when a customer logs in from the storefront. This is a point-in-time authentication signal with no transaction or persistence semantics of its own.

**Event details**:

This event can be triggered from the following sources:

* Storefront (EDS)

It cannot be triggered from the following sources:

* Admin
* GraphQL
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "customer": {
        "id": "int",
        "group_id": "int",
        "default_billing": "string",
        "default_shipping": "string",
        "confirmation": "string",
        "created_at": "string",
        "updated_at": "string",
        "created_in": "string",
        "dob": "string",
        "email": "string",
        "firstname": "string",
        "lastname": "string",
        "middlename": "string",
        "prefix": "string",
        "suffix": "string",
        "gender": "int",
        "store_id": "int",
        "taxvat": "string",
        "website_id": "int",
        "addresses": [
            {
                "id": "int",
                "customer_id": "int",
                "region": "object{}",
                "region_id": "int",
                "country_id": "string",
                "street": "string[]",
                "company": "string",
                "telephone": "string",
                "fax": "string",
                "postcode": "string",
                "city": "string",
                "firstname": "string",
                "lastname": "string",
                "middlename": "string",
                "prefix": "string",
                "suffix": "string",
                "vat_id": "string",
                "default_shipping": "bool",
                "default_billing": "bool",
                "extension_attributes": "object{}"
            }
        ],
        "disable_auto_group_change": "int",
        "extension_attributes": {
            "company_attributes": "object{}",
            "is_subscribed": "boolean",
            "assistance_allowed": "integer"
        }
    }
}
```

## Multishipping

### observer.checkout_submit_all_after

Triggered after a quote is converted into an order and the order-placement transaction has completed. The order is persisted by the time this event fires, but it is a workflow signal rather than a database commit callback.

**Event details**:

This event can be triggered from the following sources:

* Admin
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following sources:

* REST
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "order": {
        "payment": {
            "account_status": "string",
            "additional_data": "string",
            "additional_information": "string[]",
            "address_status": "string",
            "amount_authorized": "float",
            "amount_canceled": "float",
            "amount_ordered": "float",
            "amount_paid": "float",
            "amount_refunded": "float",
            "anet_trans_method": "string",
            "base_amount_authorized": "float",
            "base_amount_canceled": "float",
            "base_amount_ordered": "float",
            "base_amount_paid": "float",
            "base_amount_paid_online": "float",
            "base_amount_refunded": "float",
            "base_amount_refunded_online": "float",
            "base_shipping_amount": "float",
            "base_shipping_captured": "float",
            "base_shipping_refunded": "float",
            "cc_approval": "string",
            "cc_avs_status": "string",
            "cc_cid_status": "string",
            "cc_debug_request_body": "string",
            "cc_debug_response_body": "string",
            "cc_debug_response_serialized": "string",
            "cc_exp_month": "string",
            "cc_exp_year": "string",
            "cc_last4": "string",
            "cc_number_enc": "string",
            "cc_owner": "string",
            "cc_secure_verify": "string",
            "cc_ss_issue": "string",
            "cc_ss_start_month": "string",
            "cc_ss_start_year": "string",
            "cc_status": "string",
            "cc_status_description": "string",
            "cc_trans_id": "string",
            "cc_type": "string",
            "echeck_account_name": "string",
            "echeck_account_type": "string",
            "echeck_bank_name": "string",
            "echeck_routing_number": "string",
            "echeck_type": "string",
            "entity_id": "int",
            "last_trans_id": "string",
            "method": "string",
            "parent_id": "int",
            "po_number": "string",
            "protection_eligibility": "string",
            "quote_payment_id": "int",
            "shipping_amount": "float",
            "shipping_captured": "float",
            "shipping_refunded": "float",
            "extension_attributes": "object{}"
        },
        "tracking_numbers": "array",
        "real_order_id": "string",
        "increment_id": "string",
        "items": [
            {
                "additional_data": "string",
                "amount_refunded": "float",
                "applied_rule_ids": "string",
                "base_amount_refunded": "float",
                "base_cost": "float",
                "base_discount_amount": "float",
                "base_discount_invoiced": "float",
                "base_discount_refunded": "float",
                "base_discount_tax_compensation_amount": "float",
                "base_discount_tax_compensation_invoiced": "float",
                "base_discount_tax_compensation_refunded": "float",
                "base_original_price": "float",
                "base_price": "float",
                "base_price_incl_tax": "float",
                "base_row_invoiced": "float",
                "base_row_total": "float",
                "base_row_total_incl_tax": "float",
                "base_tax_amount": "float",
                "base_tax_before_discount": "float",
                "base_tax_invoiced": "float",
                "base_tax_refunded": "float",
                "base_weee_tax_applied_amount": "float",
                "base_weee_tax_applied_row_amnt": "float",
                "base_weee_tax_disposition": "float",
                "base_weee_tax_row_disposition": "float",
                "created_at": "string",
                "description": "string",
                "discount_amount": "float",
                "discount_invoiced": "float",
                "discount_percent": "float",
                "discount_refunded": "float",
                "event_id": "int",
                "ext_order_item_id": "string",
                "free_shipping": "int",
                "gw_base_price": "float",
                "gw_base_price_invoiced": "float",
                "gw_base_price_refunded": "float",
                "gw_base_tax_amount": "float",
                "gw_base_tax_amount_invoiced": "float",
                "gw_base_tax_amount_refunded": "float",
                "gw_id": "int",
                "gw_price": "float",
                "gw_price_invoiced": "float",
                "gw_price_refunded": "float",
                "gw_tax_amount": "float",
                "gw_tax_amount_invoiced": "float",
                "gw_tax_amount_refunded": "float",
                "discount_tax_compensation_amount": "float",
                "discount_tax_compensation_canceled": "float",
                "discount_tax_compensation_invoiced": "float",
                "discount_tax_compensation_refunded": "float",
                "is_qty_decimal": "int",
                "is_virtual": "int",
                "item_id": "int",
                "locked_do_invoice": "int",
                "locked_do_ship": "int",
                "name": "string",
                "no_discount": "int",
                "order_id": "int",
                "original_price": "float",
                "parent_item_id": "int",
                "price": "float",
                "price_incl_tax": "float",
                "product_id": "int",
                "product_type": "string",
                "qty_backordered": "float",
                "qty_canceled": "float",
                "qty_invoiced": "float",
                "qty_ordered": "float",
                "qty_refunded": "float",
                "qty_returned": "float",
                "qty_shipped": "float",
                "quote_item_id": "int",
                "row_invoiced": "float",
                "row_total": "float",
                "row_total_incl_tax": "float",
                "row_weight": "float",
                "sku": "string",
                "store_id": "int",
                "tax_amount": "float",
                "tax_before_discount": "float",
                "tax_canceled": "float",
                "tax_invoiced": "float",
                "tax_percent": "float",
                "tax_refunded": "float",
                "updated_at": "string",
                "weee_tax_applied": "string",
                "weee_tax_applied_amount": "float",
                "weee_tax_applied_row_amount": "float",
                "weee_tax_disposition": "float",
                "weee_tax_row_disposition": "float",
                "weight": "float",
                "parent_item": "object{}",
                "product_option": "object{}",
                "extension_attributes": "object{}",
                "custom_attributes": [
                    {
                        "attribute_code": "string",
                        "value": "mixed"
                    }
                ]
            }
        ],
        "addresses": [
            {
                "address_type": "string",
                "city": "string",
                "company": "string",
                "country_id": "string",
                "customer_address_id": "int",
                "customer_id": "int",
                "email": "string",
                "entity_id": "int",
                "fax": "string",
                "firstname": "string",
                "lastname": "string",
                "middlename": "string",
                "parent_id": "int",
                "postcode": "string",
                "prefix": "string",
                "region": "string",
                "region_code": "string",
                "region_id": "int",
                "street": "string[]",
                "suffix": "string",
                "telephone": "string",
                "vat_id": "string",
                "vat_is_valid": "int",
                "vat_request_date": "string",
                "vat_request_id": "string",
                "vat_request_success": "int",
                "extension_attributes": "object{}"
            }
        ],
        "status_histories": [
            {
                "comment": "string",
                "created_at": "string",
                "entity_id": "int",
                "entity_name": "string",
                "is_customer_notified": "int",
                "is_visible_on_front": "int",
                "parent_id": "int",
                "status": "string",
                "extension_attributes": "object{}"
            }
        ],
        "adjustment_negative": "float",
        "adjustment_positive": "float",
        "applied_rule_ids": "string",
        "base_adjustment_negative": "float",
        "base_adjustment_positive": "float",
        "base_currency_code": "string",
        "base_discount_amount": "float",
        "base_discount_canceled": "float",
        "base_discount_invoiced": "float",
        "base_discount_refunded": "float",
        "base_grand_total": "float",
        "base_discount_tax_compensation_amount": "float",
        "base_discount_tax_compensation_invoiced": "float",
        "base_discount_tax_compensation_refunded": "float",
        "base_shipping_amount": "float",
        "base_shipping_canceled": "float",
        "base_shipping_discount_amount": "float",
        "base_shipping_discount_tax_compensation_amnt": "float",
        "base_shipping_incl_tax": "float",
        "base_shipping_invoiced": "float",
        "base_shipping_refunded": "float",
        "base_shipping_tax_amount": "float",
        "base_shipping_tax_refunded": "float",
        "base_subtotal": "float",
        "base_subtotal_canceled": "float",
        "base_subtotal_incl_tax": "float",
        "base_subtotal_invoiced": "float",
        "base_subtotal_refunded": "float",
        "base_tax_amount": "float",
        "base_tax_canceled": "float",
        "base_tax_invoiced": "float",
        "base_tax_refunded": "float",
        "base_total_canceled": "float",
        "base_total_invoiced": "float",
        "base_total_invoiced_cost": "float",
        "base_total_offline_refunded": "float",
        "base_total_online_refunded": "float",
        "base_total_paid": "float",
        "base_total_qty_ordered": "float",
        "base_total_refunded": "float",
        "base_to_global_rate": "float",
        "base_to_order_rate": "float",
        "billing_address_id": "int",
        "can_ship_partially": "int",
        "can_ship_partially_item": "int",
        "coupon_code": "string",
        "created_at": "string",
        "customer_dob": "string",
        "customer_email": "string",
        "customer_firstname": "string",
        "customer_gender": "int",
        "customer_group_id": "int",
        "customer_id": "int",
        "customer_is_guest": "int",
        "customer_lastname": "string",
        "customer_middlename": "string",
        "customer_note": "string",
        "customer_note_notify": "int",
        "customer_prefix": "string",
        "customer_suffix": "string",
        "customer_taxvat": "string",
        "discount_amount": "float",
        "discount_canceled": "float",
        "discount_description": "string",
        "discount_invoiced": "float",
        "discount_refunded": "float",
        "edit_increment": "int",
        "email_sent": "int",
        "ext_customer_id": "string",
        "ext_order_id": "string",
        "forced_shipment_with_invoice": "int",
        "global_currency_code": "string",
        "grand_total": "float",
        "discount_tax_compensation_amount": "float",
        "discount_tax_compensation_invoiced": "float",
        "discount_tax_compensation_refunded": "float",
        "hold_before_state": "string",
        "hold_before_status": "string",
        "is_virtual": "int",
        "order_currency_code": "string",
        "original_increment_id": "string",
        "payment_authorization_amount": "float",
        "payment_auth_expiration": "int",
        "protect_code": "string",
        "quote_address_id": "int",
        "quote_id": "int",
        "relation_child_id": "string",
        "relation_child_real_id": "string",
        "relation_parent_id": "string",
        "relation_parent_real_id": "string",
        "remote_ip": "string",
        "shipping_amount": "float",
        "shipping_canceled": "float",
        "shipping_description": "string",
        "shipping_discount_amount": "float",
        "shipping_discount_tax_compensation_amount": "float",
        "shipping_incl_tax": "float",
        "shipping_invoiced": "float",
        "shipping_refunded": "float",
        "shipping_tax_amount": "float",
        "shipping_tax_refunded": "float",
        "state": "string",
        "status": "string",
        "store_currency_code": "string",
        "store_id": "int",
        "store_name": "string",
        "store_to_base_rate": "float",
        "store_to_order_rate": "float",
        "subtotal": "float",
        "subtotal_canceled": "float",
        "subtotal_incl_tax": "float",
        "subtotal_invoiced": "float",
        "subtotal_refunded": "float",
        "tax_amount": "float",
        "tax_canceled": "float",
        "tax_invoiced": "float",
        "tax_refunded": "float",
        "total_canceled": "float",
        "total_invoiced": "float",
        "total_item_count": "int",
        "total_offline_refunded": "float",
        "total_online_refunded": "float",
        "total_paid": "float",
        "total_qty_ordered": "float",
        "total_refunded": "float",
        "updated_at": "string",
        "weight": "float",
        "x_forwarded_for": "string",
        "custom_attributes": [
            {
                "attribute_code": "string",
                "value": "mixed"
            }
        ]
    },
    "quote": {
        "currency": {
            "global_currency_code": "string",
            "base_currency_code": "string",
            "store_currency_code": "string",
            "quote_currency_code": "string",
            "store_to_base_rate": "float",
            "store_to_quote_rate": "float",
            "base_to_global_rate": "float",
            "base_to_quote_rate": "float",
            "extension_attributes": "object{}"
        },
        "items": [
            {
                "item_id": "int",
                "sku": "string",
                "qty": "float",
                "name": "string",
                "price": "float",
                "product_type": "string",
                "quote_id": "string",
                "product_option": "object{}",
                "extension_attributes": "object{}",
                "custom_attributes": [
                    {
                        "attribute_code": "string",
                        "value": "mixed"
                    }
                ]
            }
        ],
        "created_at": "string",
        "updated_at": "string",
        "converted_at": "string",
        "is_active": "bool",
        "items_count": "int",
        "items_qty": "float",
        "orig_order_id": "int",
        "reserved_order_id": "string",
        "customer_is_guest": "bool",
        "customer_note": "string",
        "customer_note_notify": "bool",
        "store_id": "int",
        "shared_store_ids": "array",
        "customer_group_id": "int",
        "customer_tax_class_id": "int",
        "items_summary_qty": "int",
        "item_virtual_qty": "int",
        "totals": [
            {
                "full_info": "array"
            }
        ],
        "messages": "array",
        "custom_attributes": [
            {
                "attribute_code": "string",
                "value": "mixed"
            }
        ]
    }
}
```

## PayPal

### observer.checkout_submit_all_after

Triggered after a quote is converted into an order and the order-placement transaction has completed. The order is persisted by the time this event fires, but it is a workflow signal rather than a database commit callback.

**Event details**:

This event can be triggered from the following sources:

* Admin
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following sources:

* REST
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "order": {
        "payment": {
            "account_status": "string",
            "additional_data": "string",
            "additional_information": "string[]",
            "address_status": "string",
            "amount_authorized": "float",
            "amount_canceled": "float",
            "amount_ordered": "float",
            "amount_paid": "float",
            "amount_refunded": "float",
            "anet_trans_method": "string",
            "base_amount_authorized": "float",
            "base_amount_canceled": "float",
            "base_amount_ordered": "float",
            "base_amount_paid": "float",
            "base_amount_paid_online": "float",
            "base_amount_refunded": "float",
            "base_amount_refunded_online": "float",
            "base_shipping_amount": "float",
            "base_shipping_captured": "float",
            "base_shipping_refunded": "float",
            "cc_approval": "string",
            "cc_avs_status": "string",
            "cc_cid_status": "string",
            "cc_debug_request_body": "string",
            "cc_debug_response_body": "string",
            "cc_debug_response_serialized": "string",
            "cc_exp_month": "string",
            "cc_exp_year": "string",
            "cc_last4": "string",
            "cc_number_enc": "string",
            "cc_owner": "string",
            "cc_secure_verify": "string",
            "cc_ss_issue": "string",
            "cc_ss_start_month": "string",
            "cc_ss_start_year": "string",
            "cc_status": "string",
            "cc_status_description": "string",
            "cc_trans_id": "string",
            "cc_type": "string",
            "echeck_account_name": "string",
            "echeck_account_type": "string",
            "echeck_bank_name": "string",
            "echeck_routing_number": "string",
            "echeck_type": "string",
            "entity_id": "int",
            "last_trans_id": "string",
            "method": "string",
            "parent_id": "int",
            "po_number": "string",
            "protection_eligibility": "string",
            "quote_payment_id": "int",
            "shipping_amount": "float",
            "shipping_captured": "float",
            "shipping_refunded": "float",
            "extension_attributes": "object{}"
        },
        "tracking_numbers": "array",
        "real_order_id": "string",
        "increment_id": "string",
        "items": [
            {
                "additional_data": "string",
                "amount_refunded": "float",
                "applied_rule_ids": "string",
                "base_amount_refunded": "float",
                "base_cost": "float",
                "base_discount_amount": "float",
                "base_discount_invoiced": "float",
                "base_discount_refunded": "float",
                "base_discount_tax_compensation_amount": "float",
                "base_discount_tax_compensation_invoiced": "float",
                "base_discount_tax_compensation_refunded": "float",
                "base_original_price": "float",
                "base_price": "float",
                "base_price_incl_tax": "float",
                "base_row_invoiced": "float",
                "base_row_total": "float",
                "base_row_total_incl_tax": "float",
                "base_tax_amount": "float",
                "base_tax_before_discount": "float",
                "base_tax_invoiced": "float",
                "base_tax_refunded": "float",
                "base_weee_tax_applied_amount": "float",
                "base_weee_tax_applied_row_amnt": "float",
                "base_weee_tax_disposition": "float",
                "base_weee_tax_row_disposition": "float",
                "created_at": "string",
                "description": "string",
                "discount_amount": "float",
                "discount_invoiced": "float",
                "discount_percent": "float",
                "discount_refunded": "float",
                "event_id": "int",
                "ext_order_item_id": "string",
                "free_shipping": "int",
                "gw_base_price": "float",
                "gw_base_price_invoiced": "float",
                "gw_base_price_refunded": "float",
                "gw_base_tax_amount": "float",
                "gw_base_tax_amount_invoiced": "float",
                "gw_base_tax_amount_refunded": "float",
                "gw_id": "int",
                "gw_price": "float",
                "gw_price_invoiced": "float",
                "gw_price_refunded": "float",
                "gw_tax_amount": "float",
                "gw_tax_amount_invoiced": "float",
                "gw_tax_amount_refunded": "float",
                "discount_tax_compensation_amount": "float",
                "discount_tax_compensation_canceled": "float",
                "discount_tax_compensation_invoiced": "float",
                "discount_tax_compensation_refunded": "float",
                "is_qty_decimal": "int",
                "is_virtual": "int",
                "item_id": "int",
                "locked_do_invoice": "int",
                "locked_do_ship": "int",
                "name": "string",
                "no_discount": "int",
                "order_id": "int",
                "original_price": "float",
                "parent_item_id": "int",
                "price": "float",
                "price_incl_tax": "float",
                "product_id": "int",
                "product_type": "string",
                "qty_backordered": "float",
                "qty_canceled": "float",
                "qty_invoiced": "float",
                "qty_ordered": "float",
                "qty_refunded": "float",
                "qty_returned": "float",
                "qty_shipped": "float",
                "quote_item_id": "int",
                "row_invoiced": "float",
                "row_total": "float",
                "row_total_incl_tax": "float",
                "row_weight": "float",
                "sku": "string",
                "store_id": "int",
                "tax_amount": "float",
                "tax_before_discount": "float",
                "tax_canceled": "float",
                "tax_invoiced": "float",
                "tax_percent": "float",
                "tax_refunded": "float",
                "updated_at": "string",
                "weee_tax_applied": "string",
                "weee_tax_applied_amount": "float",
                "weee_tax_applied_row_amount": "float",
                "weee_tax_disposition": "float",
                "weee_tax_row_disposition": "float",
                "weight": "float",
                "parent_item": "object{}",
                "product_option": "object{}",
                "extension_attributes": "object{}",
                "custom_attributes": [
                    {
                        "attribute_code": "string",
                        "value": "mixed"
                    }
                ]
            }
        ],
        "addresses": [
            {
                "address_type": "string",
                "city": "string",
                "company": "string",
                "country_id": "string",
                "customer_address_id": "int",
                "customer_id": "int",
                "email": "string",
                "entity_id": "int",
                "fax": "string",
                "firstname": "string",
                "lastname": "string",
                "middlename": "string",
                "parent_id": "int",
                "postcode": "string",
                "prefix": "string",
                "region": "string",
                "region_code": "string",
                "region_id": "int",
                "street": "string[]",
                "suffix": "string",
                "telephone": "string",
                "vat_id": "string",
                "vat_is_valid": "int",
                "vat_request_date": "string",
                "vat_request_id": "string",
                "vat_request_success": "int",
                "extension_attributes": "object{}"
            }
        ],
        "status_histories": [
            {
                "comment": "string",
                "created_at": "string",
                "entity_id": "int",
                "entity_name": "string",
                "is_customer_notified": "int",
                "is_visible_on_front": "int",
                "parent_id": "int",
                "status": "string",
                "extension_attributes": "object{}"
            }
        ],
        "adjustment_negative": "float",
        "adjustment_positive": "float",
        "applied_rule_ids": "string",
        "base_adjustment_negative": "float",
        "base_adjustment_positive": "float",
        "base_currency_code": "string",
        "base_discount_amount": "float",
        "base_discount_canceled": "float",
        "base_discount_invoiced": "float",
        "base_discount_refunded": "float",
        "base_grand_total": "float",
        "base_discount_tax_compensation_amount": "float",
        "base_discount_tax_compensation_invoiced": "float",
        "base_discount_tax_compensation_refunded": "float",
        "base_shipping_amount": "float",
        "base_shipping_canceled": "float",
        "base_shipping_discount_amount": "float",
        "base_shipping_discount_tax_compensation_amnt": "float",
        "base_shipping_incl_tax": "float",
        "base_shipping_invoiced": "float",
        "base_shipping_refunded": "float",
        "base_shipping_tax_amount": "float",
        "base_shipping_tax_refunded": "float",
        "base_subtotal": "float",
        "base_subtotal_canceled": "float",
        "base_subtotal_incl_tax": "float",
        "base_subtotal_invoiced": "float",
        "base_subtotal_refunded": "float",
        "base_tax_amount": "float",
        "base_tax_canceled": "float",
        "base_tax_invoiced": "float",
        "base_tax_refunded": "float",
        "base_total_canceled": "float",
        "base_total_invoiced": "float",
        "base_total_invoiced_cost": "float",
        "base_total_offline_refunded": "float",
        "base_total_online_refunded": "float",
        "base_total_paid": "float",
        "base_total_qty_ordered": "float",
        "base_total_refunded": "float",
        "base_to_global_rate": "float",
        "base_to_order_rate": "float",
        "billing_address_id": "int",
        "can_ship_partially": "int",
        "can_ship_partially_item": "int",
        "coupon_code": "string",
        "created_at": "string",
        "customer_dob": "string",
        "customer_email": "string",
        "customer_firstname": "string",
        "customer_gender": "int",
        "customer_group_id": "int",
        "customer_id": "int",
        "customer_is_guest": "int",
        "customer_lastname": "string",
        "customer_middlename": "string",
        "customer_note": "string",
        "customer_note_notify": "int",
        "customer_prefix": "string",
        "customer_suffix": "string",
        "customer_taxvat": "string",
        "discount_amount": "float",
        "discount_canceled": "float",
        "discount_description": "string",
        "discount_invoiced": "float",
        "discount_refunded": "float",
        "edit_increment": "int",
        "email_sent": "int",
        "ext_customer_id": "string",
        "ext_order_id": "string",
        "forced_shipment_with_invoice": "int",
        "global_currency_code": "string",
        "grand_total": "float",
        "discount_tax_compensation_amount": "float",
        "discount_tax_compensation_invoiced": "float",
        "discount_tax_compensation_refunded": "float",
        "hold_before_state": "string",
        "hold_before_status": "string",
        "is_virtual": "int",
        "order_currency_code": "string",
        "original_increment_id": "string",
        "payment_authorization_amount": "float",
        "payment_auth_expiration": "int",
        "protect_code": "string",
        "quote_address_id": "int",
        "quote_id": "int",
        "relation_child_id": "string",
        "relation_child_real_id": "string",
        "relation_parent_id": "string",
        "relation_parent_real_id": "string",
        "remote_ip": "string",
        "shipping_amount": "float",
        "shipping_canceled": "float",
        "shipping_description": "string",
        "shipping_discount_amount": "float",
        "shipping_discount_tax_compensation_amount": "float",
        "shipping_incl_tax": "float",
        "shipping_invoiced": "float",
        "shipping_refunded": "float",
        "shipping_tax_amount": "float",
        "shipping_tax_refunded": "float",
        "state": "string",
        "status": "string",
        "store_currency_code": "string",
        "store_id": "int",
        "store_name": "string",
        "store_to_base_rate": "float",
        "store_to_order_rate": "float",
        "subtotal": "float",
        "subtotal_canceled": "float",
        "subtotal_incl_tax": "float",
        "subtotal_invoiced": "float",
        "subtotal_refunded": "float",
        "tax_amount": "float",
        "tax_canceled": "float",
        "tax_invoiced": "float",
        "tax_refunded": "float",
        "total_canceled": "float",
        "total_invoiced": "float",
        "total_item_count": "int",
        "total_offline_refunded": "float",
        "total_online_refunded": "float",
        "total_paid": "float",
        "total_qty_ordered": "float",
        "total_refunded": "float",
        "updated_at": "string",
        "weight": "float",
        "x_forwarded_for": "string",
        "custom_attributes": [
            {
                "attribute_code": "string",
                "value": "mixed"
            }
        ]
    },
    "quote": {
        "currency": {
            "global_currency_code": "string",
            "base_currency_code": "string",
            "store_currency_code": "string",
            "quote_currency_code": "string",
            "store_to_base_rate": "float",
            "store_to_quote_rate": "float",
            "base_to_global_rate": "float",
            "base_to_quote_rate": "float",
            "extension_attributes": "object{}"
        },
        "items": [
            {
                "item_id": "int",
                "sku": "string",
                "qty": "float",
                "name": "string",
                "price": "float",
                "product_type": "string",
                "quote_id": "string",
                "product_option": "object{}",
                "extension_attributes": "object{}",
                "custom_attributes": [
                    {
                        "attribute_code": "string",
                        "value": "mixed"
                    }
                ]
            }
        ],
        "created_at": "string",
        "updated_at": "string",
        "converted_at": "string",
        "is_active": "bool",
        "items_count": "int",
        "items_qty": "float",
        "orig_order_id": "int",
        "reserved_order_id": "string",
        "customer_is_guest": "bool",
        "customer_note": "string",
        "customer_note_notify": "bool",
        "store_id": "int",
        "shared_store_ids": "array",
        "customer_group_id": "int",
        "customer_tax_class_id": "int",
        "items_summary_qty": "int",
        "item_virtual_qty": "int",
        "totals": [
            {
                "full_info": "array"
            }
        ],
        "messages": "array",
        "custom_attributes": [
            {
                "attribute_code": "string",
                "value": "mixed"
            }
        ]
    }
}
```

## Quote

### observer.checkout_submit_all_after

Triggered after a quote is converted into an order and the order-placement transaction has completed. The order is persisted by the time this event fires, but it is a workflow signal rather than a database commit callback.

**Event details**:

This event can be triggered from the following sources:

* Admin
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following sources:

* REST
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "order": {
        "payment": {
            "account_status": "string",
            "additional_data": "string",
            "additional_information": "string[]",
            "address_status": "string",
            "amount_authorized": "float",
            "amount_canceled": "float",
            "amount_ordered": "float",
            "amount_paid": "float",
            "amount_refunded": "float",
            "anet_trans_method": "string",
            "base_amount_authorized": "float",
            "base_amount_canceled": "float",
            "base_amount_ordered": "float",
            "base_amount_paid": "float",
            "base_amount_paid_online": "float",
            "base_amount_refunded": "float",
            "base_amount_refunded_online": "float",
            "base_shipping_amount": "float",
            "base_shipping_captured": "float",
            "base_shipping_refunded": "float",
            "cc_approval": "string",
            "cc_avs_status": "string",
            "cc_cid_status": "string",
            "cc_debug_request_body": "string",
            "cc_debug_response_body": "string",
            "cc_debug_response_serialized": "string",
            "cc_exp_month": "string",
            "cc_exp_year": "string",
            "cc_last4": "string",
            "cc_number_enc": "string",
            "cc_owner": "string",
            "cc_secure_verify": "string",
            "cc_ss_issue": "string",
            "cc_ss_start_month": "string",
            "cc_ss_start_year": "string",
            "cc_status": "string",
            "cc_status_description": "string",
            "cc_trans_id": "string",
            "cc_type": "string",
            "echeck_account_name": "string",
            "echeck_account_type": "string",
            "echeck_bank_name": "string",
            "echeck_routing_number": "string",
            "echeck_type": "string",
            "entity_id": "int",
            "last_trans_id": "string",
            "method": "string",
            "parent_id": "int",
            "po_number": "string",
            "protection_eligibility": "string",
            "quote_payment_id": "int",
            "shipping_amount": "float",
            "shipping_captured": "float",
            "shipping_refunded": "float",
            "extension_attributes": "object{}"
        },
        "tracking_numbers": "array",
        "real_order_id": "string",
        "increment_id": "string",
        "items": [
            {
                "additional_data": "string",
                "amount_refunded": "float",
                "applied_rule_ids": "string",
                "base_amount_refunded": "float",
                "base_cost": "float",
                "base_discount_amount": "float",
                "base_discount_invoiced": "float",
                "base_discount_refunded": "float",
                "base_discount_tax_compensation_amount": "float",
                "base_discount_tax_compensation_invoiced": "float",
                "base_discount_tax_compensation_refunded": "float",
                "base_original_price": "float",
                "base_price": "float",
                "base_price_incl_tax": "float",
                "base_row_invoiced": "float",
                "base_row_total": "float",
                "base_row_total_incl_tax": "float",
                "base_tax_amount": "float",
                "base_tax_before_discount": "float",
                "base_tax_invoiced": "float",
                "base_tax_refunded": "float",
                "base_weee_tax_applied_amount": "float",
                "base_weee_tax_applied_row_amnt": "float",
                "base_weee_tax_disposition": "float",
                "base_weee_tax_row_disposition": "float",
                "created_at": "string",
                "description": "string",
                "discount_amount": "float",
                "discount_invoiced": "float",
                "discount_percent": "float",
                "discount_refunded": "float",
                "event_id": "int",
                "ext_order_item_id": "string",
                "free_shipping": "int",
                "gw_base_price": "float",
                "gw_base_price_invoiced": "float",
                "gw_base_price_refunded": "float",
                "gw_base_tax_amount": "float",
                "gw_base_tax_amount_invoiced": "float",
                "gw_base_tax_amount_refunded": "float",
                "gw_id": "int",
                "gw_price": "float",
                "gw_price_invoiced": "float",
                "gw_price_refunded": "float",
                "gw_tax_amount": "float",
                "gw_tax_amount_invoiced": "float",
                "gw_tax_amount_refunded": "float",
                "discount_tax_compensation_amount": "float",
                "discount_tax_compensation_canceled": "float",
                "discount_tax_compensation_invoiced": "float",
                "discount_tax_compensation_refunded": "float",
                "is_qty_decimal": "int",
                "is_virtual": "int",
                "item_id": "int",
                "locked_do_invoice": "int",
                "locked_do_ship": "int",
                "name": "string",
                "no_discount": "int",
                "order_id": "int",
                "original_price": "float",
                "parent_item_id": "int",
                "price": "float",
                "price_incl_tax": "float",
                "product_id": "int",
                "product_type": "string",
                "qty_backordered": "float",
                "qty_canceled": "float",
                "qty_invoiced": "float",
                "qty_ordered": "float",
                "qty_refunded": "float",
                "qty_returned": "float",
                "qty_shipped": "float",
                "quote_item_id": "int",
                "row_invoiced": "float",
                "row_total": "float",
                "row_total_incl_tax": "float",
                "row_weight": "float",
                "sku": "string",
                "store_id": "int",
                "tax_amount": "float",
                "tax_before_discount": "float",
                "tax_canceled": "float",
                "tax_invoiced": "float",
                "tax_percent": "float",
                "tax_refunded": "float",
                "updated_at": "string",
                "weee_tax_applied": "string",
                "weee_tax_applied_amount": "float",
                "weee_tax_applied_row_amount": "float",
                "weee_tax_disposition": "float",
                "weee_tax_row_disposition": "float",
                "weight": "float",
                "parent_item": "object{}",
                "product_option": "object{}",
                "extension_attributes": "object{}",
                "custom_attributes": [
                    {
                        "attribute_code": "string",
                        "value": "mixed"
                    }
                ]
            }
        ],
        "addresses": [
            {
                "address_type": "string",
                "city": "string",
                "company": "string",
                "country_id": "string",
                "customer_address_id": "int",
                "customer_id": "int",
                "email": "string",
                "entity_id": "int",
                "fax": "string",
                "firstname": "string",
                "lastname": "string",
                "middlename": "string",
                "parent_id": "int",
                "postcode": "string",
                "prefix": "string",
                "region": "string",
                "region_code": "string",
                "region_id": "int",
                "street": "string[]",
                "suffix": "string",
                "telephone": "string",
                "vat_id": "string",
                "vat_is_valid": "int",
                "vat_request_date": "string",
                "vat_request_id": "string",
                "vat_request_success": "int",
                "extension_attributes": "object{}"
            }
        ],
        "status_histories": [
            {
                "comment": "string",
                "created_at": "string",
                "entity_id": "int",
                "entity_name": "string",
                "is_customer_notified": "int",
                "is_visible_on_front": "int",
                "parent_id": "int",
                "status": "string",
                "extension_attributes": "object{}"
            }
        ],
        "adjustment_negative": "float",
        "adjustment_positive": "float",
        "applied_rule_ids": "string",
        "base_adjustment_negative": "float",
        "base_adjustment_positive": "float",
        "base_currency_code": "string",
        "base_discount_amount": "float",
        "base_discount_canceled": "float",
        "base_discount_invoiced": "float",
        "base_discount_refunded": "float",
        "base_grand_total": "float",
        "base_discount_tax_compensation_amount": "float",
        "base_discount_tax_compensation_invoiced": "float",
        "base_discount_tax_compensation_refunded": "float",
        "base_shipping_amount": "float",
        "base_shipping_canceled": "float",
        "base_shipping_discount_amount": "float",
        "base_shipping_discount_tax_compensation_amnt": "float",
        "base_shipping_incl_tax": "float",
        "base_shipping_invoiced": "float",
        "base_shipping_refunded": "float",
        "base_shipping_tax_amount": "float",
        "base_shipping_tax_refunded": "float",
        "base_subtotal": "float",
        "base_subtotal_canceled": "float",
        "base_subtotal_incl_tax": "float",
        "base_subtotal_invoiced": "float",
        "base_subtotal_refunded": "float",
        "base_tax_amount": "float",
        "base_tax_canceled": "float",
        "base_tax_invoiced": "float",
        "base_tax_refunded": "float",
        "base_total_canceled": "float",
        "base_total_invoiced": "float",
        "base_total_invoiced_cost": "float",
        "base_total_offline_refunded": "float",
        "base_total_online_refunded": "float",
        "base_total_paid": "float",
        "base_total_qty_ordered": "float",
        "base_total_refunded": "float",
        "base_to_global_rate": "float",
        "base_to_order_rate": "float",
        "billing_address_id": "int",
        "can_ship_partially": "int",
        "can_ship_partially_item": "int",
        "coupon_code": "string",
        "created_at": "string",
        "customer_dob": "string",
        "customer_email": "string",
        "customer_firstname": "string",
        "customer_gender": "int",
        "customer_group_id": "int",
        "customer_id": "int",
        "customer_is_guest": "int",
        "customer_lastname": "string",
        "customer_middlename": "string",
        "customer_note": "string",
        "customer_note_notify": "int",
        "customer_prefix": "string",
        "customer_suffix": "string",
        "customer_taxvat": "string",
        "discount_amount": "float",
        "discount_canceled": "float",
        "discount_description": "string",
        "discount_invoiced": "float",
        "discount_refunded": "float",
        "edit_increment": "int",
        "email_sent": "int",
        "ext_customer_id": "string",
        "ext_order_id": "string",
        "forced_shipment_with_invoice": "int",
        "global_currency_code": "string",
        "grand_total": "float",
        "discount_tax_compensation_amount": "float",
        "discount_tax_compensation_invoiced": "float",
        "discount_tax_compensation_refunded": "float",
        "hold_before_state": "string",
        "hold_before_status": "string",
        "is_virtual": "int",
        "order_currency_code": "string",
        "original_increment_id": "string",
        "payment_authorization_amount": "float",
        "payment_auth_expiration": "int",
        "protect_code": "string",
        "quote_address_id": "int",
        "quote_id": "int",
        "relation_child_id": "string",
        "relation_child_real_id": "string",
        "relation_parent_id": "string",
        "relation_parent_real_id": "string",
        "remote_ip": "string",
        "shipping_amount": "float",
        "shipping_canceled": "float",
        "shipping_description": "string",
        "shipping_discount_amount": "float",
        "shipping_discount_tax_compensation_amount": "float",
        "shipping_incl_tax": "float",
        "shipping_invoiced": "float",
        "shipping_refunded": "float",
        "shipping_tax_amount": "float",
        "shipping_tax_refunded": "float",
        "state": "string",
        "status": "string",
        "store_currency_code": "string",
        "store_id": "int",
        "store_name": "string",
        "store_to_base_rate": "float",
        "store_to_order_rate": "float",
        "subtotal": "float",
        "subtotal_canceled": "float",
        "subtotal_incl_tax": "float",
        "subtotal_invoiced": "float",
        "subtotal_refunded": "float",
        "tax_amount": "float",
        "tax_canceled": "float",
        "tax_invoiced": "float",
        "tax_refunded": "float",
        "total_canceled": "float",
        "total_invoiced": "float",
        "total_item_count": "int",
        "total_offline_refunded": "float",
        "total_online_refunded": "float",
        "total_paid": "float",
        "total_qty_ordered": "float",
        "total_refunded": "float",
        "updated_at": "string",
        "weight": "float",
        "x_forwarded_for": "string",
        "custom_attributes": [
            {
                "attribute_code": "string",
                "value": "mixed"
            }
        ]
    },
    "quote": {
        "currency": {
            "global_currency_code": "string",
            "base_currency_code": "string",
            "store_currency_code": "string",
            "quote_currency_code": "string",
            "store_to_base_rate": "float",
            "store_to_quote_rate": "float",
            "base_to_global_rate": "float",
            "base_to_quote_rate": "float",
            "extension_attributes": "object{}"
        },
        "items": [
            {
                "item_id": "int",
                "sku": "string",
                "qty": "float",
                "name": "string",
                "price": "float",
                "product_type": "string",
                "quote_id": "string",
                "product_option": "object{}",
                "extension_attributes": "object{}",
                "custom_attributes": [
                    {
                        "attribute_code": "string",
                        "value": "mixed"
                    }
                ]
            }
        ],
        "created_at": "string",
        "updated_at": "string",
        "converted_at": "string",
        "is_active": "bool",
        "items_count": "int",
        "items_qty": "float",
        "orig_order_id": "int",
        "reserved_order_id": "string",
        "customer_is_guest": "bool",
        "customer_note": "string",
        "customer_note_notify": "bool",
        "store_id": "int",
        "shared_store_ids": "array",
        "customer_group_id": "int",
        "customer_tax_class_id": "int",
        "items_summary_qty": "int",
        "item_virtual_qty": "int",
        "totals": [
            {
                "full_info": "array"
            }
        ],
        "messages": "array",
        "custom_attributes": [
            {
                "attribute_code": "string",
                "value": "mixed"
            }
        ]
    }
}
```

### observer.sales_quote_save_after

Triggered after a quote (cart) is created or updated, while the database transaction is still open. The write is not yet durable and can be rolled back.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "currency": {
        "global_currency_code": "string",
        "base_currency_code": "string",
        "store_currency_code": "string",
        "quote_currency_code": "string",
        "store_to_base_rate": "float",
        "store_to_quote_rate": "float",
        "base_to_global_rate": "float",
        "base_to_quote_rate": "float",
        "extension_attributes": "object{}"
    },
    "items": [
        {
            "item_id": "int",
            "sku": "string",
            "qty": "float",
            "name": "string",
            "price": "float",
            "product_type": "string",
            "quote_id": "string",
            "product_option": "object{}",
            "extension_attributes": "object{}"
        }
    ],
    "created_at": "string",
    "updated_at": "string",
    "converted_at": "string",
    "is_active": "bool",
    "items_count": "int",
    "items_qty": "float",
    "orig_order_id": "int",
    "reserved_order_id": "string",
    "customer_is_guest": "bool",
    "customer_note": "string",
    "customer_note_notify": "bool",
    "store_id": "int",
    "shared_store_ids": "array",
    "customer_group_id": "int",
    "customer_tax_class_id": "int",
    "items_summary_qty": "int",
    "item_virtual_qty": "int",
    "totals": [
        {
            "full_info": "array"
        }
    ],
    "messages": "array",
    "_origData": "array",
    "_isNew": "boolean"
}
```

## RMA

### observer.rma_save_after

Triggered after a return merchandise authorization (RMA) is created or updated, while the database transaction is still open. The write is not yet durable and can be rolled back. Use `observer.rma_save_commit_after` in most external integrations,

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "increment_id": "mixed",
    "entity_id": "int",
    "order_id": "int",
    "order_increment_id": "string",
    "store_id": "int",
    "customer_id": "int",
    "date_requested": "string",
    "customer_custom_email": "string",
    "items": "array",
    "status": "mixed",
    "comments": "array",
    "tracks": [
        {
            "entity_id": "int",
            "rma_entity_id": "int",
            "track_number": "string",
            "carrier_title": "string",
            "carrier_code": "string",
            "extension_attributes": "object{}"
        }
    ],
    "_origData": "array",
    "_isNew": "boolean"
}
```

### observer.rma_save_commit_after

Triggered after an RMA is created or updated and the database transaction has committed. Because the write is durable at this point, this is the recommended event for external integrations.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "increment_id": "mixed",
    "entity_id": "int",
    "order_id": "int",
    "order_increment_id": "string",
    "store_id": "int",
    "customer_id": "int",
    "date_requested": "string",
    "customer_custom_email": "string",
    "items": "array",
    "status": "mixed",
    "comments": "array",
    "tracks": [
        {
            "entity_id": "int",
            "rma_entity_id": "int",
            "track_number": "string",
            "carrier_title": "string",
            "carrier_code": "string",
            "extension_attributes": "object{}"
        }
    ],
    "_origData": "array",
    "_isNew": "boolean"
}
```

## SaasReminder

### observer.reminder_matched_carts

Triggered when the abandoned-cart reminder process matches one or more carts against a reminder rule. The payload contains the matched cart identifiers for downstream notification. This is a point-in-time signal rather than a persistence event.

**Event details**:

It cannot be triggered from the following sources:

* Admin
* REST
* GraphQL
* Storefront (EDS)
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "carts": [
        {
            "cart_id": "int",
            "customer_id": "int",
            "last_updated": "string"
        }
    ]
}
```

## Sales

### observer.checkout_submit_all_after

Triggered after a quote is converted into an order and the order-placement transaction has completed. The order is persisted by the time this event fires, but it is a workflow signal rather than a database commit callback.

**Event details**:

This event can be triggered from the following sources:

* Admin
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following sources:

* REST
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "order": {
        "payment": {
            "account_status": "string",
            "additional_data": "string",
            "additional_information": "string[]",
            "address_status": "string",
            "amount_authorized": "float",
            "amount_canceled": "float",
            "amount_ordered": "float",
            "amount_paid": "float",
            "amount_refunded": "float",
            "anet_trans_method": "string",
            "base_amount_authorized": "float",
            "base_amount_canceled": "float",
            "base_amount_ordered": "float",
            "base_amount_paid": "float",
            "base_amount_paid_online": "float",
            "base_amount_refunded": "float",
            "base_amount_refunded_online": "float",
            "base_shipping_amount": "float",
            "base_shipping_captured": "float",
            "base_shipping_refunded": "float",
            "cc_approval": "string",
            "cc_avs_status": "string",
            "cc_cid_status": "string",
            "cc_debug_request_body": "string",
            "cc_debug_response_body": "string",
            "cc_debug_response_serialized": "string",
            "cc_exp_month": "string",
            "cc_exp_year": "string",
            "cc_last4": "string",
            "cc_number_enc": "string",
            "cc_owner": "string",
            "cc_secure_verify": "string",
            "cc_ss_issue": "string",
            "cc_ss_start_month": "string",
            "cc_ss_start_year": "string",
            "cc_status": "string",
            "cc_status_description": "string",
            "cc_trans_id": "string",
            "cc_type": "string",
            "echeck_account_name": "string",
            "echeck_account_type": "string",
            "echeck_bank_name": "string",
            "echeck_routing_number": "string",
            "echeck_type": "string",
            "entity_id": "int",
            "last_trans_id": "string",
            "method": "string",
            "parent_id": "int",
            "po_number": "string",
            "protection_eligibility": "string",
            "quote_payment_id": "int",
            "shipping_amount": "float",
            "shipping_captured": "float",
            "shipping_refunded": "float",
            "extension_attributes": "object{}"
        },
        "tracking_numbers": "array",
        "real_order_id": "string",
        "increment_id": "string",
        "items": [
            {
                "additional_data": "string",
                "amount_refunded": "float",
                "applied_rule_ids": "string",
                "base_amount_refunded": "float",
                "base_cost": "float",
                "base_discount_amount": "float",
                "base_discount_invoiced": "float",
                "base_discount_refunded": "float",
                "base_discount_tax_compensation_amount": "float",
                "base_discount_tax_compensation_invoiced": "float",
                "base_discount_tax_compensation_refunded": "float",
                "base_original_price": "float",
                "base_price": "float",
                "base_price_incl_tax": "float",
                "base_row_invoiced": "float",
                "base_row_total": "float",
                "base_row_total_incl_tax": "float",
                "base_tax_amount": "float",
                "base_tax_before_discount": "float",
                "base_tax_invoiced": "float",
                "base_tax_refunded": "float",
                "base_weee_tax_applied_amount": "float",
                "base_weee_tax_applied_row_amnt": "float",
                "base_weee_tax_disposition": "float",
                "base_weee_tax_row_disposition": "float",
                "created_at": "string",
                "description": "string",
                "discount_amount": "float",
                "discount_invoiced": "float",
                "discount_percent": "float",
                "discount_refunded": "float",
                "event_id": "int",
                "ext_order_item_id": "string",
                "free_shipping": "int",
                "gw_base_price": "float",
                "gw_base_price_invoiced": "float",
                "gw_base_price_refunded": "float",
                "gw_base_tax_amount": "float",
                "gw_base_tax_amount_invoiced": "float",
                "gw_base_tax_amount_refunded": "float",
                "gw_id": "int",
                "gw_price": "float",
                "gw_price_invoiced": "float",
                "gw_price_refunded": "float",
                "gw_tax_amount": "float",
                "gw_tax_amount_invoiced": "float",
                "gw_tax_amount_refunded": "float",
                "discount_tax_compensation_amount": "float",
                "discount_tax_compensation_canceled": "float",
                "discount_tax_compensation_invoiced": "float",
                "discount_tax_compensation_refunded": "float",
                "is_qty_decimal": "int",
                "is_virtual": "int",
                "item_id": "int",
                "locked_do_invoice": "int",
                "locked_do_ship": "int",
                "name": "string",
                "no_discount": "int",
                "order_id": "int",
                "original_price": "float",
                "parent_item_id": "int",
                "price": "float",
                "price_incl_tax": "float",
                "product_id": "int",
                "product_type": "string",
                "qty_backordered": "float",
                "qty_canceled": "float",
                "qty_invoiced": "float",
                "qty_ordered": "float",
                "qty_refunded": "float",
                "qty_returned": "float",
                "qty_shipped": "float",
                "quote_item_id": "int",
                "row_invoiced": "float",
                "row_total": "float",
                "row_total_incl_tax": "float",
                "row_weight": "float",
                "sku": "string",
                "store_id": "int",
                "tax_amount": "float",
                "tax_before_discount": "float",
                "tax_canceled": "float",
                "tax_invoiced": "float",
                "tax_percent": "float",
                "tax_refunded": "float",
                "updated_at": "string",
                "weee_tax_applied": "string",
                "weee_tax_applied_amount": "float",
                "weee_tax_applied_row_amount": "float",
                "weee_tax_disposition": "float",
                "weee_tax_row_disposition": "float",
                "weight": "float",
                "parent_item": "object{}",
                "product_option": "object{}",
                "extension_attributes": "object{}",
                "custom_attributes": [
                    {
                        "attribute_code": "string",
                        "value": "mixed"
                    }
                ]
            }
        ],
        "addresses": [
            {
                "address_type": "string",
                "city": "string",
                "company": "string",
                "country_id": "string",
                "customer_address_id": "int",
                "customer_id": "int",
                "email": "string",
                "entity_id": "int",
                "fax": "string",
                "firstname": "string",
                "lastname": "string",
                "middlename": "string",
                "parent_id": "int",
                "postcode": "string",
                "prefix": "string",
                "region": "string",
                "region_code": "string",
                "region_id": "int",
                "street": "string[]",
                "suffix": "string",
                "telephone": "string",
                "vat_id": "string",
                "vat_is_valid": "int",
                "vat_request_date": "string",
                "vat_request_id": "string",
                "vat_request_success": "int",
                "extension_attributes": "object{}"
            }
        ],
        "status_histories": [
            {
                "comment": "string",
                "created_at": "string",
                "entity_id": "int",
                "entity_name": "string",
                "is_customer_notified": "int",
                "is_visible_on_front": "int",
                "parent_id": "int",
                "status": "string",
                "extension_attributes": "object{}"
            }
        ],
        "adjustment_negative": "float",
        "adjustment_positive": "float",
        "applied_rule_ids": "string",
        "base_adjustment_negative": "float",
        "base_adjustment_positive": "float",
        "base_currency_code": "string",
        "base_discount_amount": "float",
        "base_discount_canceled": "float",
        "base_discount_invoiced": "float",
        "base_discount_refunded": "float",
        "base_grand_total": "float",
        "base_discount_tax_compensation_amount": "float",
        "base_discount_tax_compensation_invoiced": "float",
        "base_discount_tax_compensation_refunded": "float",
        "base_shipping_amount": "float",
        "base_shipping_canceled": "float",
        "base_shipping_discount_amount": "float",
        "base_shipping_discount_tax_compensation_amnt": "float",
        "base_shipping_incl_tax": "float",
        "base_shipping_invoiced": "float",
        "base_shipping_refunded": "float",
        "base_shipping_tax_amount": "float",
        "base_shipping_tax_refunded": "float",
        "base_subtotal": "float",
        "base_subtotal_canceled": "float",
        "base_subtotal_incl_tax": "float",
        "base_subtotal_invoiced": "float",
        "base_subtotal_refunded": "float",
        "base_tax_amount": "float",
        "base_tax_canceled": "float",
        "base_tax_invoiced": "float",
        "base_tax_refunded": "float",
        "base_total_canceled": "float",
        "base_total_invoiced": "float",
        "base_total_invoiced_cost": "float",
        "base_total_offline_refunded": "float",
        "base_total_online_refunded": "float",
        "base_total_paid": "float",
        "base_total_qty_ordered": "float",
        "base_total_refunded": "float",
        "base_to_global_rate": "float",
        "base_to_order_rate": "float",
        "billing_address_id": "int",
        "can_ship_partially": "int",
        "can_ship_partially_item": "int",
        "coupon_code": "string",
        "created_at": "string",
        "customer_dob": "string",
        "customer_email": "string",
        "customer_firstname": "string",
        "customer_gender": "int",
        "customer_group_id": "int",
        "customer_id": "int",
        "customer_is_guest": "int",
        "customer_lastname": "string",
        "customer_middlename": "string",
        "customer_note": "string",
        "customer_note_notify": "int",
        "customer_prefix": "string",
        "customer_suffix": "string",
        "customer_taxvat": "string",
        "discount_amount": "float",
        "discount_canceled": "float",
        "discount_description": "string",
        "discount_invoiced": "float",
        "discount_refunded": "float",
        "edit_increment": "int",
        "email_sent": "int",
        "ext_customer_id": "string",
        "ext_order_id": "string",
        "forced_shipment_with_invoice": "int",
        "global_currency_code": "string",
        "grand_total": "float",
        "discount_tax_compensation_amount": "float",
        "discount_tax_compensation_invoiced": "float",
        "discount_tax_compensation_refunded": "float",
        "hold_before_state": "string",
        "hold_before_status": "string",
        "is_virtual": "int",
        "order_currency_code": "string",
        "original_increment_id": "string",
        "payment_authorization_amount": "float",
        "payment_auth_expiration": "int",
        "protect_code": "string",
        "quote_address_id": "int",
        "quote_id": "int",
        "relation_child_id": "string",
        "relation_child_real_id": "string",
        "relation_parent_id": "string",
        "relation_parent_real_id": "string",
        "remote_ip": "string",
        "shipping_amount": "float",
        "shipping_canceled": "float",
        "shipping_description": "string",
        "shipping_discount_amount": "float",
        "shipping_discount_tax_compensation_amount": "float",
        "shipping_incl_tax": "float",
        "shipping_invoiced": "float",
        "shipping_refunded": "float",
        "shipping_tax_amount": "float",
        "shipping_tax_refunded": "float",
        "state": "string",
        "status": "string",
        "store_currency_code": "string",
        "store_id": "int",
        "store_name": "string",
        "store_to_base_rate": "float",
        "store_to_order_rate": "float",
        "subtotal": "float",
        "subtotal_canceled": "float",
        "subtotal_incl_tax": "float",
        "subtotal_invoiced": "float",
        "subtotal_refunded": "float",
        "tax_amount": "float",
        "tax_canceled": "float",
        "tax_invoiced": "float",
        "tax_refunded": "float",
        "total_canceled": "float",
        "total_invoiced": "float",
        "total_item_count": "int",
        "total_offline_refunded": "float",
        "total_online_refunded": "float",
        "total_paid": "float",
        "total_qty_ordered": "float",
        "total_refunded": "float",
        "updated_at": "string",
        "weight": "float",
        "x_forwarded_for": "string",
        "custom_attributes": [
            {
                "attribute_code": "string",
                "value": "mixed"
            }
        ]
    },
    "quote": {
        "currency": {
            "global_currency_code": "string",
            "base_currency_code": "string",
            "store_currency_code": "string",
            "quote_currency_code": "string",
            "store_to_base_rate": "float",
            "store_to_quote_rate": "float",
            "base_to_global_rate": "float",
            "base_to_quote_rate": "float",
            "extension_attributes": "object{}"
        },
        "items": [
            {
                "item_id": "int",
                "sku": "string",
                "qty": "float",
                "name": "string",
                "price": "float",
                "product_type": "string",
                "quote_id": "string",
                "product_option": "object{}",
                "extension_attributes": "object{}",
                "custom_attributes": [
                    {
                        "attribute_code": "string",
                        "value": "mixed"
                    }
                ]
            }
        ],
        "created_at": "string",
        "updated_at": "string",
        "converted_at": "string",
        "is_active": "bool",
        "items_count": "int",
        "items_qty": "float",
        "orig_order_id": "int",
        "reserved_order_id": "string",
        "customer_is_guest": "bool",
        "customer_note": "string",
        "customer_note_notify": "bool",
        "store_id": "int",
        "shared_store_ids": "array",
        "customer_group_id": "int",
        "customer_tax_class_id": "int",
        "items_summary_qty": "int",
        "item_virtual_qty": "int",
        "totals": [
            {
                "full_info": "array"
            }
        ],
        "messages": "array",
        "custom_attributes": [
            {
                "attribute_code": "string",
                "value": "mixed"
            }
        ]
    }
}
```

### observer.sales_order_creditmemo_save_after

Triggered after a credit memo is created or updated for an order, while the database transaction is still open. The write is not yet durable and can be rolled back. Use `observer.sales_order_creditmemo_save_commit_after` in most external integrations.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following sources:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "invoice": {
        "items": "object{}[]",
        "comments": "object{}[]",
        "increment_id": "string",
        "base_total_refunded": "float",
        "discount_description": "string",
        "base_currency_code": "string",
        "base_discount_amount": "float",
        "base_grand_total": "float",
        "base_discount_tax_compensation_amount": "float",
        "base_shipping_amount": "float",
        "base_shipping_discount_tax_compensation_amnt": "float",
        "base_shipping_incl_tax": "float",
        "base_shipping_tax_amount": "float",
        "base_subtotal": "float",
        "base_subtotal_incl_tax": "float",
        "base_tax_amount": "float",
        "base_to_global_rate": "float",
        "base_to_order_rate": "float",
        "billing_address_id": "int",
        "can_void_flag": "int",
        "created_at": "string",
        "discount_amount": "float",
        "email_sent": "int",
        "global_currency_code": "string",
        "grand_total": "float",
        "discount_tax_compensation_amount": "float",
        "is_used_for_refund": "int",
        "order_currency_code": "string",
        "order_id": "int",
        "shipping_address_id": "int",
        "shipping_amount": "float",
        "shipping_discount_tax_compensation_amount": "float",
        "shipping_incl_tax": "float",
        "shipping_tax_amount": "float",
        "state": "int",
        "store_currency_code": "string",
        "store_id": "int",
        "store_to_base_rate": "float",
        "store_to_order_rate": "float",
        "subtotal": "float",
        "subtotal_incl_tax": "float",
        "tax_amount": "float",
        "total_qty": "float",
        "transaction_id": "string",
        "updated_at": "string"
    },
    "increment_id": "string",
    "items": [
        {
            "additional_data": "string",
            "base_cost": "float",
            "base_discount_amount": "float",
            "base_discount_tax_compensation_amount": "float",
            "base_price": "float",
            "base_price_incl_tax": "float",
            "base_row_total": "float",
            "base_row_total_incl_tax": "float",
            "base_tax_amount": "float",
            "base_weee_tax_applied_amount": "float",
            "base_weee_tax_applied_row_amnt": "float",
            "base_weee_tax_disposition": "float",
            "base_weee_tax_row_disposition": "float",
            "description": "string",
            "discount_amount": "float",
            "entity_id": "int",
            "discount_tax_compensation_amount": "float",
            "name": "string",
            "order_item_id": "int",
            "parent_id": "int",
            "price": "float",
            "price_incl_tax": "float",
            "product_id": "int",
            "qty": "float",
            "row_total": "float",
            "row_total_incl_tax": "float",
            "sku": "string",
            "tax_amount": "float",
            "weee_tax_applied": "string",
            "weee_tax_applied_amount": "float",
            "weee_tax_applied_row_amount": "float",
            "weee_tax_disposition": "float",
            "weee_tax_row_disposition": "float",
            "extension_attributes": "object{}",
            "custom_attributes": [
                {
                    "attribute_code": "string",
                    "value": "mixed"
                }
            ]
        }
    ],
    "comments": [
        {
            "comment": "string",
            "created_at": "string",
            "entity_id": "int",
            "is_customer_notified": "int",
            "is_visible_on_front": "int",
            "parent_id": "int",
            "extension_attributes": "object{}"
        }
    ],
    "discount_description": "string",
    "adjustment": "float",
    "adjustment_negative": "float",
    "adjustment_positive": "float",
    "base_adjustment": "float",
    "base_adjustment_negative": "float",
    "base_adjustment_positive": "float",
    "base_currency_code": "string",
    "base_discount_amount": "float",
    "base_grand_total": "float",
    "base_discount_tax_compensation_amount": "float",
    "base_shipping_amount": "float",
    "base_shipping_discount_tax_compensation_amnt": "float",
    "base_shipping_incl_tax": "float",
    "base_shipping_tax_amount": "float",
    "base_subtotal": "float",
    "base_subtotal_incl_tax": "float",
    "base_tax_amount": "float",
    "base_to_global_rate": "float",
    "base_to_order_rate": "float",
    "billing_address_id": "int",
    "created_at": "string",
    "creditmemo_status": "int",
    "discount_amount": "float",
    "email_sent": "int",
    "global_currency_code": "string",
    "grand_total": "float",
    "discount_tax_compensation_amount": "float",
    "invoice_id": "int",
    "order_currency_code": "string",
    "order_id": "int",
    "shipping_address_id": "int",
    "shipping_amount": "float",
    "shipping_discount_tax_compensation_amount": "float",
    "shipping_incl_tax": "float",
    "shipping_tax_amount": "float",
    "state": "int",
    "store_currency_code": "string",
    "store_id": "int",
    "store_to_base_rate": "float",
    "store_to_order_rate": "float",
    "subtotal": "float",
    "subtotal_incl_tax": "float",
    "tax_amount": "float",
    "transaction_id": "string",
    "updated_at": "string",
    "_origData": "array",
    "_isNew": "boolean",
    "custom_attributes": [
        {
            "attribute_code": "string",
            "value": "mixed"
        }
    ]
}
```

### observer.sales_order_invoice_pay

Triggered when an invoice registers a payment, during the invoicing flow. This is a point-in-time workflow event dispatched before the surrounding invoice and order save is committed, so the underlying data can still be rolled back.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following sources:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "items": [
        {
            "additional_data": "string",
            "base_cost": "float",
            "base_discount_amount": "float",
            "base_discount_tax_compensation_amount": "float",
            "base_price": "float",
            "base_price_incl_tax": "float",
            "base_row_total": "float",
            "base_row_total_incl_tax": "float",
            "base_tax_amount": "float",
            "description": "string",
            "discount_amount": "float",
            "entity_id": "int",
            "discount_tax_compensation_amount": "float",
            "name": "string",
            "parent_id": "int",
            "price": "float",
            "price_incl_tax": "float",
            "product_id": "int",
            "row_total": "float",
            "row_total_incl_tax": "float",
            "sku": "string",
            "tax_amount": "float",
            "extension_attributes": "object{}",
            "order_item_id": "int",
            "qty": "float"
        }
    ],
    "comments": [
        {
            "is_customer_notified": "int",
            "parent_id": "int",
            "extension_attributes": "object{}",
            "comment": "string",
            "is_visible_on_front": "int",
            "created_at": "string",
            "entity_id": "int"
        }
    ],
    "increment_id": "string",
    "base_total_refunded": "float",
    "discount_description": "string",
    "base_currency_code": "string",
    "base_discount_amount": "float",
    "base_grand_total": "float",
    "base_discount_tax_compensation_amount": "float",
    "base_shipping_amount": "float",
    "base_shipping_discount_tax_compensation_amnt": "float",
    "base_shipping_incl_tax": "float",
    "base_shipping_tax_amount": "float",
    "base_subtotal": "float",
    "base_subtotal_incl_tax": "float",
    "base_tax_amount": "float",
    "base_to_global_rate": "float",
    "base_to_order_rate": "float",
    "billing_address_id": "int",
    "can_void_flag": "int",
    "created_at": "string",
    "discount_amount": "float",
    "email_sent": "int",
    "global_currency_code": "string",
    "grand_total": "float",
    "discount_tax_compensation_amount": "float",
    "is_used_for_refund": "int",
    "order_currency_code": "string",
    "order_id": "int",
    "shipping_address_id": "int",
    "shipping_amount": "float",
    "shipping_discount_tax_compensation_amount": "float",
    "shipping_incl_tax": "float",
    "shipping_tax_amount": "float",
    "state": "int",
    "store_currency_code": "string",
    "store_id": "int",
    "store_to_base_rate": "float",
    "store_to_order_rate": "float",
    "subtotal": "float",
    "subtotal_incl_tax": "float",
    "tax_amount": "float",
    "total_qty": "float",
    "transaction_id": "string",
    "updated_at": "string",
    "_origData": "array",
    "_isNew": "boolean"
}
```

### observer.sales_order_invoice_save_after

Triggered after an invoice is created or updated for an order, while the database transaction is still open. The write is not yet durable and can be rolled back. This is not a reliable event for external integrations.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "items": [
        {
            "additional_data": "string",
            "base_cost": "float",
            "base_discount_amount": "float",
            "base_discount_tax_compensation_amount": "float",
            "base_price": "float",
            "base_price_incl_tax": "float",
            "base_row_total": "float",
            "base_row_total_incl_tax": "float",
            "base_tax_amount": "float",
            "description": "string",
            "discount_amount": "float",
            "entity_id": "int",
            "discount_tax_compensation_amount": "float",
            "name": "string",
            "parent_id": "int",
            "price": "float",
            "price_incl_tax": "float",
            "product_id": "int",
            "row_total": "float",
            "row_total_incl_tax": "float",
            "sku": "string",
            "tax_amount": "float",
            "extension_attributes": "object{}"
        }
    ],
    "comments": [
        {
            "is_customer_notified": "int",
            "parent_id": "int",
            "extension_attributes": "object{}"
        }
    ],
    "increment_id": "string",
    "base_total_refunded": "float",
    "discount_description": "string",
    "base_currency_code": "string",
    "base_discount_amount": "float",
    "base_grand_total": "float",
    "base_discount_tax_compensation_amount": "float",
    "base_shipping_amount": "float",
    "base_shipping_discount_tax_compensation_amnt": "float",
    "base_shipping_incl_tax": "float",
    "base_shipping_tax_amount": "float",
    "base_subtotal": "float",
    "base_subtotal_incl_tax": "float",
    "base_tax_amount": "float",
    "base_to_global_rate": "float",
    "base_to_order_rate": "float",
    "billing_address_id": "int",
    "can_void_flag": "int",
    "created_at": "string",
    "discount_amount": "float",
    "email_sent": "int",
    "global_currency_code": "string",
    "grand_total": "float",
    "discount_tax_compensation_amount": "float",
    "is_used_for_refund": "int",
    "order_currency_code": "string",
    "order_id": "int",
    "shipping_address_id": "int",
    "shipping_amount": "float",
    "shipping_discount_tax_compensation_amount": "float",
    "shipping_incl_tax": "float",
    "shipping_tax_amount": "float",
    "state": "int",
    "store_currency_code": "string",
    "store_id": "int",
    "store_to_base_rate": "float",
    "store_to_order_rate": "float",
    "subtotal": "float",
    "subtotal_incl_tax": "float",
    "tax_amount": "float",
    "total_qty": "float",
    "transaction_id": "string",
    "updated_at": "string",
    "_origData": "array",
    "_isNew": "boolean"
}
```

### observer.sales_order_save_after

Triggered after an order is created or updated, while the database transaction is still open. The write is not yet committed and can be rolled back. Use `observer.sales_order_save_commit_after` for external integrations.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following sources:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "payment": {
        "account_status": "string",
        "additional_data": "string",
        "additional_information": "string[]",
        "address_status": "string",
        "amount_authorized": "float",
        "amount_canceled": "float",
        "amount_ordered": "float",
        "amount_paid": "float",
        "amount_refunded": "float",
        "anet_trans_method": "string",
        "base_amount_authorized": "float",
        "base_amount_canceled": "float",
        "base_amount_ordered": "float",
        "base_amount_paid": "float",
        "base_amount_paid_online": "float",
        "base_amount_refunded": "float",
        "base_amount_refunded_online": "float",
        "base_shipping_amount": "float",
        "base_shipping_captured": "float",
        "base_shipping_refunded": "float",
        "cc_approval": "string",
        "cc_avs_status": "string",
        "cc_cid_status": "string",
        "cc_debug_request_body": "string",
        "cc_debug_response_body": "string",
        "cc_debug_response_serialized": "string",
        "cc_exp_month": "string",
        "cc_exp_year": "string",
        "cc_last4": "string",
        "cc_number_enc": "string",
        "cc_owner": "string",
        "cc_secure_verify": "string",
        "cc_ss_issue": "string",
        "cc_ss_start_month": "string",
        "cc_ss_start_year": "string",
        "cc_status": "string",
        "cc_status_description": "string",
        "cc_trans_id": "string",
        "cc_type": "string",
        "echeck_account_name": "string",
        "echeck_account_type": "string",
        "echeck_bank_name": "string",
        "echeck_routing_number": "string",
        "echeck_type": "string",
        "entity_id": "int",
        "last_trans_id": "string",
        "method": "string",
        "parent_id": "int",
        "po_number": "string",
        "protection_eligibility": "string",
        "quote_payment_id": "int",
        "shipping_amount": "float",
        "shipping_captured": "float",
        "shipping_refunded": "float",
        "extension_attributes": "object{}"
    },
    "tracking_numbers": "array",
    "real_order_id": "string",
    "increment_id": "string",
    "items": [
        {
            "additional_data": "string",
            "amount_refunded": "float",
            "applied_rule_ids": "string",
            "base_amount_refunded": "float",
            "base_cost": "float",
            "base_discount_amount": "float",
            "base_discount_invoiced": "float",
            "base_discount_refunded": "float",
            "base_discount_tax_compensation_amount": "float",
            "base_discount_tax_compensation_invoiced": "float",
            "base_discount_tax_compensation_refunded": "float",
            "base_original_price": "float",
            "base_price": "float",
            "base_price_incl_tax": "float",
            "base_row_invoiced": "float",
            "base_row_total": "float",
            "base_row_total_incl_tax": "float",
            "base_tax_amount": "float",
            "base_tax_before_discount": "float",
            "base_tax_invoiced": "float",
            "base_tax_refunded": "float",
            "base_weee_tax_applied_amount": "float",
            "base_weee_tax_applied_row_amnt": "float",
            "base_weee_tax_disposition": "float",
            "base_weee_tax_row_disposition": "float",
            "created_at": "string",
            "description": "string",
            "discount_amount": "float",
            "discount_invoiced": "float",
            "discount_percent": "float",
            "discount_refunded": "float",
            "event_id": "int",
            "ext_order_item_id": "string",
            "free_shipping": "int",
            "gw_base_price": "float",
            "gw_base_price_invoiced": "float",
            "gw_base_price_refunded": "float",
            "gw_base_tax_amount": "float",
            "gw_base_tax_amount_invoiced": "float",
            "gw_base_tax_amount_refunded": "float",
            "gw_id": "int",
            "gw_price": "float",
            "gw_price_invoiced": "float",
            "gw_price_refunded": "float",
            "gw_tax_amount": "float",
            "gw_tax_amount_invoiced": "float",
            "gw_tax_amount_refunded": "float",
            "discount_tax_compensation_amount": "float",
            "discount_tax_compensation_canceled": "float",
            "discount_tax_compensation_invoiced": "float",
            "discount_tax_compensation_refunded": "float",
            "is_qty_decimal": "int",
            "is_virtual": "int",
            "item_id": "int",
            "locked_do_invoice": "int",
            "locked_do_ship": "int",
            "name": "string",
            "no_discount": "int",
            "order_id": "int",
            "original_price": "float",
            "parent_item_id": "int",
            "price": "float",
            "price_incl_tax": "float",
            "product_id": "int",
            "product_type": "string",
            "qty_backordered": "float",
            "qty_canceled": "float",
            "qty_invoiced": "float",
            "qty_ordered": "float",
            "qty_refunded": "float",
            "qty_returned": "float",
            "qty_shipped": "float",
            "quote_item_id": "int",
            "row_invoiced": "float",
            "row_total": "float",
            "row_total_incl_tax": "float",
            "row_weight": "float",
            "sku": "string",
            "store_id": "int",
            "tax_amount": "float",
            "tax_before_discount": "float",
            "tax_canceled": "float",
            "tax_invoiced": "float",
            "tax_percent": "float",
            "tax_refunded": "float",
            "updated_at": "string",
            "weee_tax_applied": "string",
            "weee_tax_applied_amount": "float",
            "weee_tax_applied_row_amount": "float",
            "weee_tax_disposition": "float",
            "weee_tax_row_disposition": "float",
            "weight": "float",
            "parent_item": "object{}",
            "product_option": "object{}",
            "extension_attributes": "object{}",
            "custom_attributes": [
                {
                    "attribute_code": "string",
                    "value": "mixed"
                }
            ]
        }
    ],
    "addresses": [
        {
            "address_type": "string",
            "city": "string",
            "company": "string",
            "country_id": "string",
            "customer_address_id": "int",
            "customer_id": "int",
            "email": "string",
            "entity_id": "int",
            "fax": "string",
            "firstname": "string",
            "lastname": "string",
            "middlename": "string",
            "parent_id": "int",
            "postcode": "string",
            "prefix": "string",
            "region": "string",
            "region_code": "string",
            "region_id": "int",
            "street": "string[]",
            "suffix": "string",
            "telephone": "string",
            "vat_id": "string",
            "vat_is_valid": "int",
            "vat_request_date": "string",
            "vat_request_id": "string",
            "vat_request_success": "int",
            "extension_attributes": "object{}"
        }
    ],
    "status_histories": [
        {
            "comment": "string",
            "created_at": "string",
            "entity_id": "int",
            "entity_name": "string",
            "is_customer_notified": "int",
            "is_visible_on_front": "int",
            "parent_id": "int",
            "status": "string",
            "extension_attributes": "object{}"
        }
    ],
    "adjustment_negative": "float",
    "adjustment_positive": "float",
    "applied_rule_ids": "string",
    "base_adjustment_negative": "float",
    "base_adjustment_positive": "float",
    "base_currency_code": "string",
    "base_discount_amount": "float",
    "base_discount_canceled": "float",
    "base_discount_invoiced": "float",
    "base_discount_refunded": "float",
    "base_grand_total": "float",
    "base_discount_tax_compensation_amount": "float",
    "base_discount_tax_compensation_invoiced": "float",
    "base_discount_tax_compensation_refunded": "float",
    "base_shipping_amount": "float",
    "base_shipping_canceled": "float",
    "base_shipping_discount_amount": "float",
    "base_shipping_discount_tax_compensation_amnt": "float",
    "base_shipping_incl_tax": "float",
    "base_shipping_invoiced": "float",
    "base_shipping_refunded": "float",
    "base_shipping_tax_amount": "float",
    "base_shipping_tax_refunded": "float",
    "base_subtotal": "float",
    "base_subtotal_canceled": "float",
    "base_subtotal_incl_tax": "float",
    "base_subtotal_invoiced": "float",
    "base_subtotal_refunded": "float",
    "base_tax_amount": "float",
    "base_tax_canceled": "float",
    "base_tax_invoiced": "float",
    "base_tax_refunded": "float",
    "base_total_canceled": "float",
    "base_total_invoiced": "float",
    "base_total_invoiced_cost": "float",
    "base_total_offline_refunded": "float",
    "base_total_online_refunded": "float",
    "base_total_paid": "float",
    "base_total_qty_ordered": "float",
    "base_total_refunded": "float",
    "base_to_global_rate": "float",
    "base_to_order_rate": "float",
    "billing_address_id": "int",
    "can_ship_partially": "int",
    "can_ship_partially_item": "int",
    "coupon_code": "string",
    "created_at": "string",
    "customer_dob": "string",
    "customer_email": "string",
    "customer_firstname": "string",
    "customer_gender": "int",
    "customer_group_id": "int",
    "customer_id": "int",
    "customer_is_guest": "int",
    "customer_lastname": "string",
    "customer_middlename": "string",
    "customer_note": "string",
    "customer_note_notify": "int",
    "customer_prefix": "string",
    "customer_suffix": "string",
    "customer_taxvat": "string",
    "discount_amount": "float",
    "discount_canceled": "float",
    "discount_description": "string",
    "discount_invoiced": "float",
    "discount_refunded": "float",
    "edit_increment": "int",
    "email_sent": "int",
    "ext_customer_id": "string",
    "ext_order_id": "string",
    "forced_shipment_with_invoice": "int",
    "global_currency_code": "string",
    "grand_total": "float",
    "discount_tax_compensation_amount": "float",
    "discount_tax_compensation_invoiced": "float",
    "discount_tax_compensation_refunded": "float",
    "hold_before_state": "string",
    "hold_before_status": "string",
    "is_virtual": "int",
    "order_currency_code": "string",
    "original_increment_id": "string",
    "payment_authorization_amount": "float",
    "payment_auth_expiration": "int",
    "protect_code": "string",
    "quote_address_id": "int",
    "quote_id": "int",
    "relation_child_id": "string",
    "relation_child_real_id": "string",
    "relation_parent_id": "string",
    "relation_parent_real_id": "string",
    "remote_ip": "string",
    "shipping_amount": "float",
    "shipping_canceled": "float",
    "shipping_description": "string",
    "shipping_discount_amount": "float",
    "shipping_discount_tax_compensation_amount": "float",
    "shipping_incl_tax": "float",
    "shipping_invoiced": "float",
    "shipping_refunded": "float",
    "shipping_tax_amount": "float",
    "shipping_tax_refunded": "float",
    "state": "string",
    "status": "string",
    "store_currency_code": "string",
    "store_id": "int",
    "store_name": "string",
    "store_to_base_rate": "float",
    "store_to_order_rate": "float",
    "subtotal": "float",
    "subtotal_canceled": "float",
    "subtotal_incl_tax": "float",
    "subtotal_invoiced": "float",
    "subtotal_refunded": "float",
    "tax_amount": "float",
    "tax_canceled": "float",
    "tax_invoiced": "float",
    "tax_refunded": "float",
    "total_canceled": "float",
    "total_invoiced": "float",
    "total_item_count": "int",
    "total_offline_refunded": "float",
    "total_online_refunded": "float",
    "total_paid": "float",
    "total_qty_ordered": "float",
    "total_refunded": "float",
    "updated_at": "string",
    "weight": "float",
    "x_forwarded_for": "string",
    "_origData": "array",
    "_isNew": "boolean",
    "custom_attributes": [
        {
            "attribute_code": "string",
            "value": "mixed"
        }
    ]
}
```

### observer.sales_order_save_commit_after

Triggered after an order is created or saved and the database transaction has committed. Because the write is durable at this point, this is the recommended event for integrations that react to order changes.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following sources:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "payment": {
        "account_status": "string",
        "additional_data": "string",
        "additional_information": "string[]",
        "address_status": "string",
        "amount_authorized": "float",
        "amount_canceled": "float",
        "amount_ordered": "float",
        "amount_paid": "float",
        "amount_refunded": "float",
        "anet_trans_method": "string",
        "base_amount_authorized": "float",
        "base_amount_canceled": "float",
        "base_amount_ordered": "float",
        "base_amount_paid": "float",
        "base_amount_paid_online": "float",
        "base_amount_refunded": "float",
        "base_amount_refunded_online": "float",
        "base_shipping_amount": "float",
        "base_shipping_captured": "float",
        "base_shipping_refunded": "float",
        "cc_approval": "string",
        "cc_avs_status": "string",
        "cc_cid_status": "string",
        "cc_debug_request_body": "string",
        "cc_debug_response_body": "string",
        "cc_debug_response_serialized": "string",
        "cc_exp_month": "string",
        "cc_exp_year": "string",
        "cc_last4": "string",
        "cc_number_enc": "string",
        "cc_owner": "string",
        "cc_secure_verify": "string",
        "cc_ss_issue": "string",
        "cc_ss_start_month": "string",
        "cc_ss_start_year": "string",
        "cc_status": "string",
        "cc_status_description": "string",
        "cc_trans_id": "string",
        "cc_type": "string",
        "echeck_account_name": "string",
        "echeck_account_type": "string",
        "echeck_bank_name": "string",
        "echeck_routing_number": "string",
        "echeck_type": "string",
        "entity_id": "int",
        "last_trans_id": "string",
        "method": "string",
        "parent_id": "int",
        "po_number": "string",
        "protection_eligibility": "string",
        "quote_payment_id": "int",
        "shipping_amount": "float",
        "shipping_captured": "float",
        "shipping_refunded": "float",
        "extension_attributes": "object{}"
    },
    "tracking_numbers": "array",
    "real_order_id": "string",
    "increment_id": "string",
    "items": [
        {
            "additional_data": "string",
            "amount_refunded": "float",
            "applied_rule_ids": "string",
            "base_amount_refunded": "float",
            "base_cost": "float",
            "base_discount_amount": "float",
            "base_discount_invoiced": "float",
            "base_discount_refunded": "float",
            "base_discount_tax_compensation_amount": "float",
            "base_discount_tax_compensation_invoiced": "float",
            "base_discount_tax_compensation_refunded": "float",
            "base_original_price": "float",
            "base_price": "float",
            "base_price_incl_tax": "float",
            "base_row_invoiced": "float",
            "base_row_total": "float",
            "base_row_total_incl_tax": "float",
            "base_tax_amount": "float",
            "base_tax_before_discount": "float",
            "base_tax_invoiced": "float",
            "base_tax_refunded": "float",
            "base_weee_tax_applied_amount": "float",
            "base_weee_tax_applied_row_amnt": "float",
            "base_weee_tax_disposition": "float",
            "base_weee_tax_row_disposition": "float",
            "created_at": "string",
            "description": "string",
            "discount_amount": "float",
            "discount_invoiced": "float",
            "discount_percent": "float",
            "discount_refunded": "float",
            "event_id": "int",
            "ext_order_item_id": "string",
            "free_shipping": "int",
            "gw_base_price": "float",
            "gw_base_price_invoiced": "float",
            "gw_base_price_refunded": "float",
            "gw_base_tax_amount": "float",
            "gw_base_tax_amount_invoiced": "float",
            "gw_base_tax_amount_refunded": "float",
            "gw_id": "int",
            "gw_price": "float",
            "gw_price_invoiced": "float",
            "gw_price_refunded": "float",
            "gw_tax_amount": "float",
            "gw_tax_amount_invoiced": "float",
            "gw_tax_amount_refunded": "float",
            "discount_tax_compensation_amount": "float",
            "discount_tax_compensation_canceled": "float",
            "discount_tax_compensation_invoiced": "float",
            "discount_tax_compensation_refunded": "float",
            "is_qty_decimal": "int",
            "is_virtual": "int",
            "item_id": "int",
            "locked_do_invoice": "int",
            "locked_do_ship": "int",
            "name": "string",
            "no_discount": "int",
            "order_id": "int",
            "original_price": "float",
            "parent_item_id": "int",
            "price": "float",
            "price_incl_tax": "float",
            "product_id": "int",
            "product_type": "string",
            "qty_backordered": "float",
            "qty_canceled": "float",
            "qty_invoiced": "float",
            "qty_ordered": "float",
            "qty_refunded": "float",
            "qty_returned": "float",
            "qty_shipped": "float",
            "quote_item_id": "int",
            "row_invoiced": "float",
            "row_total": "float",
            "row_total_incl_tax": "float",
            "row_weight": "float",
            "sku": "string",
            "store_id": "int",
            "tax_amount": "float",
            "tax_before_discount": "float",
            "tax_canceled": "float",
            "tax_invoiced": "float",
            "tax_percent": "float",
            "tax_refunded": "float",
            "updated_at": "string",
            "weee_tax_applied": "string",
            "weee_tax_applied_amount": "float",
            "weee_tax_applied_row_amount": "float",
            "weee_tax_disposition": "float",
            "weee_tax_row_disposition": "float",
            "weight": "float",
            "parent_item": "object{}",
            "product_option": "object{}",
            "extension_attributes": "object{}",
            "custom_attributes": [
                {
                    "attribute_code": "string",
                    "value": "mixed"
                }
            ]
        }
    ],
    "addresses": [
        {
            "address_type": "string",
            "city": "string",
            "company": "string",
            "country_id": "string",
            "customer_address_id": "int",
            "customer_id": "int",
            "email": "string",
            "entity_id": "int",
            "fax": "string",
            "firstname": "string",
            "lastname": "string",
            "middlename": "string",
            "parent_id": "int",
            "postcode": "string",
            "prefix": "string",
            "region": "string",
            "region_code": "string",
            "region_id": "int",
            "street": "string[]",
            "suffix": "string",
            "telephone": "string",
            "vat_id": "string",
            "vat_is_valid": "int",
            "vat_request_date": "string",
            "vat_request_id": "string",
            "vat_request_success": "int",
            "extension_attributes": "object{}"
        }
    ],
    "status_histories": [
        {
            "comment": "string",
            "created_at": "string",
            "entity_id": "int",
            "entity_name": "string",
            "is_customer_notified": "int",
            "is_visible_on_front": "int",
            "parent_id": "int",
            "status": "string",
            "extension_attributes": "object{}"
        }
    ],
    "adjustment_negative": "float",
    "adjustment_positive": "float",
    "applied_rule_ids": "string",
    "base_adjustment_negative": "float",
    "base_adjustment_positive": "float",
    "base_currency_code": "string",
    "base_discount_amount": "float",
    "base_discount_canceled": "float",
    "base_discount_invoiced": "float",
    "base_discount_refunded": "float",
    "base_grand_total": "float",
    "base_discount_tax_compensation_amount": "float",
    "base_discount_tax_compensation_invoiced": "float",
    "base_discount_tax_compensation_refunded": "float",
    "base_shipping_amount": "float",
    "base_shipping_canceled": "float",
    "base_shipping_discount_amount": "float",
    "base_shipping_discount_tax_compensation_amnt": "float",
    "base_shipping_incl_tax": "float",
    "base_shipping_invoiced": "float",
    "base_shipping_refunded": "float",
    "base_shipping_tax_amount": "float",
    "base_shipping_tax_refunded": "float",
    "base_subtotal": "float",
    "base_subtotal_canceled": "float",
    "base_subtotal_incl_tax": "float",
    "base_subtotal_invoiced": "float",
    "base_subtotal_refunded": "float",
    "base_tax_amount": "float",
    "base_tax_canceled": "float",
    "base_tax_invoiced": "float",
    "base_tax_refunded": "float",
    "base_total_canceled": "float",
    "base_total_invoiced": "float",
    "base_total_invoiced_cost": "float",
    "base_total_offline_refunded": "float",
    "base_total_online_refunded": "float",
    "base_total_paid": "float",
    "base_total_qty_ordered": "float",
    "base_total_refunded": "float",
    "base_to_global_rate": "float",
    "base_to_order_rate": "float",
    "billing_address_id": "int",
    "can_ship_partially": "int",
    "can_ship_partially_item": "int",
    "coupon_code": "string",
    "created_at": "string",
    "customer_dob": "string",
    "customer_email": "string",
    "customer_firstname": "string",
    "customer_gender": "int",
    "customer_group_id": "int",
    "customer_id": "int",
    "customer_is_guest": "int",
    "customer_lastname": "string",
    "customer_middlename": "string",
    "customer_note": "string",
    "customer_note_notify": "int",
    "customer_prefix": "string",
    "customer_suffix": "string",
    "customer_taxvat": "string",
    "discount_amount": "float",
    "discount_canceled": "float",
    "discount_description": "string",
    "discount_invoiced": "float",
    "discount_refunded": "float",
    "edit_increment": "int",
    "email_sent": "int",
    "ext_customer_id": "string",
    "ext_order_id": "string",
    "forced_shipment_with_invoice": "int",
    "global_currency_code": "string",
    "grand_total": "float",
    "discount_tax_compensation_amount": "float",
    "discount_tax_compensation_invoiced": "float",
    "discount_tax_compensation_refunded": "float",
    "hold_before_state": "string",
    "hold_before_status": "string",
    "is_virtual": "int",
    "order_currency_code": "string",
    "original_increment_id": "string",
    "payment_authorization_amount": "float",
    "payment_auth_expiration": "int",
    "protect_code": "string",
    "quote_address_id": "int",
    "quote_id": "int",
    "relation_child_id": "string",
    "relation_child_real_id": "string",
    "relation_parent_id": "string",
    "relation_parent_real_id": "string",
    "remote_ip": "string",
    "shipping_amount": "float",
    "shipping_canceled": "float",
    "shipping_description": "string",
    "shipping_discount_amount": "float",
    "shipping_discount_tax_compensation_amount": "float",
    "shipping_incl_tax": "float",
    "shipping_invoiced": "float",
    "shipping_refunded": "float",
    "shipping_tax_amount": "float",
    "shipping_tax_refunded": "float",
    "state": "string",
    "status": "string",
    "store_currency_code": "string",
    "store_id": "int",
    "store_name": "string",
    "store_to_base_rate": "float",
    "store_to_order_rate": "float",
    "subtotal": "float",
    "subtotal_canceled": "float",
    "subtotal_incl_tax": "float",
    "subtotal_invoiced": "float",
    "subtotal_refunded": "float",
    "tax_amount": "float",
    "tax_canceled": "float",
    "tax_invoiced": "float",
    "tax_refunded": "float",
    "total_canceled": "float",
    "total_invoiced": "float",
    "total_item_count": "int",
    "total_offline_refunded": "float",
    "total_online_refunded": "float",
    "total_paid": "float",
    "total_qty_ordered": "float",
    "total_refunded": "float",
    "updated_at": "string",
    "weight": "float",
    "x_forwarded_for": "string",
    "_origData": "array",
    "_isNew": "boolean",
    "custom_attributes": [
        {
            "attribute_code": "string",
            "value": "mixed"
        }
    ]
}
```

### observer.sales_order_shipment_save_after

Triggered after an order shipment is created or updated while the database transaction is still open. The write is not yet durable and can be rolled back.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following sources:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "shipping_label": "mixed",
    "increment_id": "string",
    "packages": "string",
    "items": [
        {
            "additional_data": "string",
            "description": "string",
            "entity_id": "int",
            "name": "string",
            "parent_id": "int",
            "price": "float",
            "product_id": "int",
            "row_total": "float",
            "sku": "string",
            "weight": "float",
            "extension_attributes": "object{}"
        }
    ],
    "tracks": [
        {
            "order_id": "int",
            "created_at": "string",
            "entity_id": "int",
            "parent_id": "int",
            "updated_at": "string",
            "weight": "float",
            "qty": "float",
            "description": "string",
            "extension_attributes": "object{}"
        }
    ],
    "billing_address_id": "int",
    "created_at": "string",
    "customer_id": "int",
    "email_sent": "int",
    "order_id": "int",
    "shipment_status": "int",
    "shipping_address_id": "int",
    "store_id": "int",
    "total_qty": "float",
    "total_weight": "float",
    "updated_at": "string",
    "comments": [
        {
            "is_customer_notified": "int",
            "parent_id": "int",
            "extension_attributes": "object{}"
        }
    ],
    "_origData": "array",
    "_isNew": "boolean"
}
```

### observer.sales_order_shipment_track_save_after

Triggered after a shipment tracking record is created or updated, while the database transaction is still open. The write is not yet durable and can be rolled back.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following sources:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "number": "string",
    "track_number": "string",
    "carrier_code": "string",
    "created_at": "string",
    "description": "string",
    "order_id": "int",
    "parent_id": "int",
    "qty": "float",
    "title": "string",
    "updated_at": "string",
    "weight": "float",
    "_origData": "array",
    "_isNew": "boolean"
}
```

### observer.sales_order_status_history_save_after

Triggered after an order status history record (a comment or status change) is created or updated, while the database transaction is still open. The write is not yet durable and can be rolled back.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following sources:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "comment": "string",
    "created_at": "string",
    "entity_id": "int",
    "entity_name": "string",
    "is_customer_notified": "int",
    "is_visible_on_front": "int",
    "parent_id": "int",
    "status": "string",
    "_origData": "array",
    "_isNew": "boolean"
}
```

### plugin.sales.api.order_management.place

Triggered after an order has been placed and persisted. The order is durable at this point, making this a reliable event for order-placement integrations.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following sources:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "adjustment_negative": "float",
    "adjustment_positive": "float",
    "applied_rule_ids": "string",
    "base_adjustment_negative": "float",
    "base_adjustment_positive": "float",
    "base_currency_code": "string",
    "base_discount_amount": "float",
    "base_discount_canceled": "float",
    "base_discount_invoiced": "float",
    "base_discount_refunded": "float",
    "base_grand_total": "float",
    "base_discount_tax_compensation_amount": "float",
    "base_discount_tax_compensation_invoiced": "float",
    "base_discount_tax_compensation_refunded": "float",
    "base_shipping_amount": "float",
    "base_shipping_canceled": "float",
    "base_shipping_discount_amount": "float",
    "base_shipping_discount_tax_compensation_amnt": "float",
    "base_shipping_incl_tax": "float",
    "base_shipping_invoiced": "float",
    "base_shipping_refunded": "float",
    "base_shipping_tax_amount": "float",
    "base_shipping_tax_refunded": "float",
    "base_subtotal": "float",
    "base_subtotal_canceled": "float",
    "base_subtotal_incl_tax": "float",
    "base_subtotal_invoiced": "float",
    "base_subtotal_refunded": "float",
    "base_tax_amount": "float",
    "base_tax_canceled": "float",
    "base_tax_invoiced": "float",
    "base_tax_refunded": "float",
    "base_total_canceled": "float",
    "base_total_due": "float",
    "base_total_invoiced": "float",
    "base_total_invoiced_cost": "float",
    "base_total_offline_refunded": "float",
    "base_total_online_refunded": "float",
    "base_total_paid": "float",
    "base_total_qty_ordered": "float",
    "base_total_refunded": "float",
    "base_to_global_rate": "float",
    "base_to_order_rate": "float",
    "billing_address_id": "int",
    "can_ship_partially": "int",
    "can_ship_partially_item": "int",
    "coupon_code": "string",
    "created_at": "string",
    "customer_dob": "string",
    "customer_email": "string",
    "customer_firstname": "string",
    "customer_gender": "int",
    "customer_group_id": "int",
    "customer_id": "int",
    "customer_is_guest": "int",
    "customer_lastname": "string",
    "customer_middlename": "string",
    "customer_note": "string",
    "customer_note_notify": "int",
    "customer_prefix": "string",
    "customer_suffix": "string",
    "customer_taxvat": "string",
    "discount_amount": "float",
    "discount_canceled": "float",
    "discount_description": "string",
    "discount_invoiced": "float",
    "discount_refunded": "float",
    "edit_increment": "int",
    "email_sent": "int",
    "entity_id": "int",
    "ext_customer_id": "string",
    "ext_order_id": "string",
    "forced_shipment_with_invoice": "int",
    "global_currency_code": "string",
    "grand_total": "float",
    "discount_tax_compensation_amount": "float",
    "discount_tax_compensation_invoiced": "float",
    "discount_tax_compensation_refunded": "float",
    "hold_before_state": "string",
    "hold_before_status": "string",
    "increment_id": "string",
    "is_virtual": "int",
    "order_currency_code": "string",
    "original_increment_id": "string",
    "payment_authorization_amount": "float",
    "payment_auth_expiration": "int",
    "protect_code": "string",
    "quote_address_id": "int",
    "quote_id": "int",
    "relation_child_id": "string",
    "relation_child_real_id": "string",
    "relation_parent_id": "string",
    "relation_parent_real_id": "string",
    "remote_ip": "string",
    "shipping_amount": "float",
    "shipping_canceled": "float",
    "shipping_description": "string",
    "shipping_discount_amount": "float",
    "shipping_discount_tax_compensation_amount": "float",
    "shipping_incl_tax": "float",
    "shipping_invoiced": "float",
    "shipping_refunded": "float",
    "shipping_tax_amount": "float",
    "shipping_tax_refunded": "float",
    "state": "string",
    "status": "string",
    "store_currency_code": "string",
    "store_id": "int",
    "store_name": "string",
    "store_to_base_rate": "float",
    "store_to_order_rate": "float",
    "subtotal": "float",
    "subtotal_canceled": "float",
    "subtotal_incl_tax": "float",
    "subtotal_invoiced": "float",
    "subtotal_refunded": "float",
    "tax_amount": "float",
    "tax_canceled": "float",
    "tax_invoiced": "float",
    "tax_refunded": "float",
    "total_canceled": "float",
    "total_due": "float",
    "total_invoiced": "float",
    "total_item_count": "int",
    "total_offline_refunded": "float",
    "total_online_refunded": "float",
    "total_paid": "float",
    "total_qty_ordered": "float",
    "total_refunded": "float",
    "updated_at": "string",
    "weight": "float",
    "x_forwarded_for": "string",
    "items": [
        {
            "additional_data": "string",
            "amount_refunded": "float",
            "applied_rule_ids": "string",
            "base_amount_refunded": "float",
            "base_cost": "float",
            "base_discount_amount": "float",
            "base_discount_invoiced": "float",
            "base_discount_refunded": "float",
            "base_discount_tax_compensation_amount": "float",
            "base_discount_tax_compensation_invoiced": "float",
            "base_discount_tax_compensation_refunded": "float",
            "base_original_price": "float",
            "base_price": "float",
            "base_price_incl_tax": "float",
            "base_row_invoiced": "float",
            "base_row_total": "float",
            "base_row_total_incl_tax": "float",
            "base_tax_amount": "float",
            "base_tax_before_discount": "float",
            "base_tax_invoiced": "float",
            "base_tax_refunded": "float",
            "base_weee_tax_applied_amount": "float",
            "base_weee_tax_applied_row_amnt": "float",
            "base_weee_tax_disposition": "float",
            "base_weee_tax_row_disposition": "float",
            "created_at": "string",
            "description": "string",
            "discount_amount": "float",
            "discount_invoiced": "float",
            "discount_percent": "float",
            "discount_refunded": "float",
            "event_id": "int",
            "ext_order_item_id": "string",
            "free_shipping": "int",
            "gw_base_price": "float",
            "gw_base_price_invoiced": "float",
            "gw_base_price_refunded": "float",
            "gw_base_tax_amount": "float",
            "gw_base_tax_amount_invoiced": "float",
            "gw_base_tax_amount_refunded": "float",
            "gw_id": "int",
            "gw_price": "float",
            "gw_price_invoiced": "float",
            "gw_price_refunded": "float",
            "gw_tax_amount": "float",
            "gw_tax_amount_invoiced": "float",
            "gw_tax_amount_refunded": "float",
            "discount_tax_compensation_amount": "float",
            "discount_tax_compensation_canceled": "float",
            "discount_tax_compensation_invoiced": "float",
            "discount_tax_compensation_refunded": "float",
            "is_qty_decimal": "int",
            "is_virtual": "int",
            "item_id": "int",
            "locked_do_invoice": "int",
            "locked_do_ship": "int",
            "name": "string",
            "no_discount": "int",
            "order_id": "int",
            "original_price": "float",
            "parent_item_id": "int",
            "price": "float",
            "price_incl_tax": "float",
            "product_id": "int",
            "product_type": "string",
            "qty_backordered": "float",
            "qty_canceled": "float",
            "qty_invoiced": "float",
            "qty_ordered": "float",
            "qty_refunded": "float",
            "qty_returned": "float",
            "qty_shipped": "float",
            "quote_item_id": "int",
            "row_invoiced": "float",
            "row_total": "float",
            "row_total_incl_tax": "float",
            "row_weight": "float",
            "sku": "string",
            "store_id": "int",
            "tax_amount": "float",
            "tax_before_discount": "float",
            "tax_canceled": "float",
            "tax_invoiced": "float",
            "tax_percent": "float",
            "tax_refunded": "float",
            "updated_at": "string",
            "weee_tax_applied": "string",
            "weee_tax_applied_amount": "float",
            "weee_tax_applied_row_amount": "float",
            "weee_tax_disposition": "float",
            "weee_tax_row_disposition": "float",
            "weight": "float",
            "parent_item": "object{}",
            "product_option": "object{}",
            "extension_attributes": "object{}",
            "custom_attributes": [
                {
                    "attribute_code": "string",
                    "value": "mixed"
                }
            ]
        }
    ],
    "billing_address": {
        "address_type": "string",
        "city": "string",
        "company": "string",
        "country_id": "string",
        "customer_address_id": "int",
        "customer_id": "int",
        "email": "string",
        "entity_id": "int",
        "fax": "string",
        "firstname": "string",
        "lastname": "string",
        "middlename": "string",
        "parent_id": "int",
        "postcode": "string",
        "prefix": "string",
        "region": "string",
        "region_code": "string",
        "region_id": "int",
        "street": "string[]",
        "suffix": "string",
        "telephone": "string",
        "vat_id": "string",
        "vat_is_valid": "int",
        "vat_request_date": "string",
        "vat_request_id": "string",
        "vat_request_success": "int",
        "extension_attributes": "object{}"
    },
    "payment": {
        "account_status": "string",
        "additional_data": "string",
        "additional_information": "string[]",
        "address_status": "string",
        "amount_authorized": "float",
        "amount_canceled": "float",
        "amount_ordered": "float",
        "amount_paid": "float",
        "amount_refunded": "float",
        "anet_trans_method": "string",
        "base_amount_authorized": "float",
        "base_amount_canceled": "float",
        "base_amount_ordered": "float",
        "base_amount_paid": "float",
        "base_amount_paid_online": "float",
        "base_amount_refunded": "float",
        "base_amount_refunded_online": "float",
        "base_shipping_amount": "float",
        "base_shipping_captured": "float",
        "base_shipping_refunded": "float",
        "cc_approval": "string",
        "cc_avs_status": "string",
        "cc_cid_status": "string",
        "cc_debug_request_body": "string",
        "cc_debug_response_body": "string",
        "cc_debug_response_serialized": "string",
        "cc_exp_month": "string",
        "cc_exp_year": "string",
        "cc_last4": "string",
        "cc_number_enc": "string",
        "cc_owner": "string",
        "cc_secure_verify": "string",
        "cc_ss_issue": "string",
        "cc_ss_start_month": "string",
        "cc_ss_start_year": "string",
        "cc_status": "string",
        "cc_status_description": "string",
        "cc_trans_id": "string",
        "cc_type": "string",
        "echeck_account_name": "string",
        "echeck_account_type": "string",
        "echeck_bank_name": "string",
        "echeck_routing_number": "string",
        "echeck_type": "string",
        "entity_id": "int",
        "last_trans_id": "string",
        "method": "string",
        "parent_id": "int",
        "po_number": "string",
        "protection_eligibility": "string",
        "quote_payment_id": "int",
        "shipping_amount": "float",
        "shipping_captured": "float",
        "shipping_refunded": "float",
        "extension_attributes": "object{}"
    },
    "status_histories": [
        {
            "comment": "string",
            "created_at": "string",
            "entity_id": "int",
            "entity_name": "string",
            "is_customer_notified": "int",
            "is_visible_on_front": "int",
            "parent_id": "int",
            "status": "string",
            "extension_attributes": "object{}"
        }
    ],
    "extension_attributes": {
        "shipping_assignments": "object{}[]",
        "payment_additional_info": "object{}[]",
        "company_order_attributes": "object{}",
        "base_customer_balance_amount": "float",
        "customer_balance_amount": "float",
        "base_customer_balance_invoiced": "float",
        "customer_balance_invoiced": "float",
        "base_customer_balance_refunded": "float",
        "customer_balance_refunded": "float",
        "base_customer_balance_total_refunded": "float",
        "customer_balance_total_refunded": "float",
        "applied_taxes": "object{}[]",
        "item_applied_taxes": "object{}[]",
        "converting_from_quote": "boolean",
        "taxes": "object{}[]",
        "additional_itemized_taxes": "object{}[]",
        "custom_fees": "object{}[]",
        "gift_cards": "object{}[]",
        "base_gift_cards_amount": "float",
        "gift_cards_amount": "float",
        "base_gift_cards_invoiced": "float",
        "gift_cards_invoiced": "float",
        "base_gift_cards_refunded": "float",
        "gift_cards_refunded": "float",
        "gift_message": "object{}",
        "gw_id": "string",
        "gw_allow_gift_receipt": "string",
        "gw_add_card": "string",
        "gw_base_price": "string",
        "gw_price": "string",
        "gw_items_base_price": "string",
        "gw_items_price": "string",
        "gw_card_base_price": "string",
        "gw_card_price": "string",
        "gw_base_tax_amount": "string",
        "gw_tax_amount": "string",
        "gw_items_base_tax_amount": "string",
        "gw_items_tax_amount": "string",
        "gw_card_base_tax_amount": "string",
        "gw_card_tax_amount": "string",
        "gw_base_price_incl_tax": "string",
        "gw_price_incl_tax": "string",
        "gw_items_base_price_incl_tax": "string",
        "gw_items_price_incl_tax": "string",
        "gw_card_base_price_incl_tax": "string",
        "gw_card_price_incl_tax": "string",
        "gw_base_price_invoiced": "string",
        "gw_price_invoiced": "string",
        "gw_items_base_price_invoiced": "string",
        "gw_items_price_invoiced": "string",
        "gw_card_base_price_invoiced": "string",
        "gw_card_price_invoiced": "string",
        "gw_base_tax_amount_invoiced": "string",
        "gw_tax_amount_invoiced": "string",
        "gw_items_base_tax_invoiced": "string",
        "gw_items_tax_invoiced": "string",
        "gw_card_base_tax_invoiced": "string",
        "gw_card_tax_invoiced": "string",
        "gw_base_price_refunded": "string",
        "gw_price_refunded": "string",
        "gw_items_base_price_refunded": "string",
        "gw_items_price_refunded": "string",
        "gw_card_base_price_refunded": "string",
        "gw_card_price_refunded": "string",
        "gw_base_tax_amount_refunded": "string",
        "gw_tax_amount_refunded": "string",
        "gw_items_base_tax_refunded": "string",
        "gw_items_tax_refunded": "string",
        "gw_card_base_tax_refunded": "string",
        "gw_card_tax_refunded": "string",
        "coupon_codes": "string[]",
        "coupon_discounts": "string[]",
        "pickup_location_code": "string",
        "notification_sent": "int",
        "send_notification": "int",
        "reward_points_balance": "int",
        "reward_currency_amount": "float",
        "base_reward_currency_amount": "float"
    },
    "custom_attributes": [
        {
            "attribute_code": "string",
            "value": "mixed"
        }
    ]
}
```

### plugin.sales.api.order_repository.save

Triggered after an order has been created or updated and persisted. The order is durable at this point, making this a reliable event for order-persistence integrations.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "adjustment_negative": "float",
    "adjustment_positive": "float",
    "applied_rule_ids": "string",
    "base_adjustment_negative": "float",
    "base_adjustment_positive": "float",
    "base_currency_code": "string",
    "base_discount_amount": "float",
    "base_discount_canceled": "float",
    "base_discount_invoiced": "float",
    "base_discount_refunded": "float",
    "base_grand_total": "float",
    "base_discount_tax_compensation_amount": "float",
    "base_discount_tax_compensation_invoiced": "float",
    "base_discount_tax_compensation_refunded": "float",
    "base_shipping_amount": "float",
    "base_shipping_canceled": "float",
    "base_shipping_discount_amount": "float",
    "base_shipping_discount_tax_compensation_amnt": "float",
    "base_shipping_incl_tax": "float",
    "base_shipping_invoiced": "float",
    "base_shipping_refunded": "float",
    "base_shipping_tax_amount": "float",
    "base_shipping_tax_refunded": "float",
    "base_subtotal": "float",
    "base_subtotal_canceled": "float",
    "base_subtotal_incl_tax": "float",
    "base_subtotal_invoiced": "float",
    "base_subtotal_refunded": "float",
    "base_tax_amount": "float",
    "base_tax_canceled": "float",
    "base_tax_invoiced": "float",
    "base_tax_refunded": "float",
    "base_total_canceled": "float",
    "base_total_due": "float",
    "base_total_invoiced": "float",
    "base_total_invoiced_cost": "float",
    "base_total_offline_refunded": "float",
    "base_total_online_refunded": "float",
    "base_total_paid": "float",
    "base_total_qty_ordered": "float",
    "base_total_refunded": "float",
    "base_to_global_rate": "float",
    "base_to_order_rate": "float",
    "billing_address_id": "int",
    "can_ship_partially": "int",
    "can_ship_partially_item": "int",
    "coupon_code": "string",
    "created_at": "string",
    "customer_dob": "string",
    "customer_email": "string",
    "customer_firstname": "string",
    "customer_gender": "int",
    "customer_group_id": "int",
    "customer_id": "int",
    "customer_is_guest": "int",
    "customer_lastname": "string",
    "customer_middlename": "string",
    "customer_note": "string",
    "customer_note_notify": "int",
    "customer_prefix": "string",
    "customer_suffix": "string",
    "customer_taxvat": "string",
    "discount_amount": "float",
    "discount_canceled": "float",
    "discount_description": "string",
    "discount_invoiced": "float",
    "discount_refunded": "float",
    "edit_increment": "int",
    "email_sent": "int",
    "entity_id": "int",
    "ext_customer_id": "string",
    "ext_order_id": "string",
    "forced_shipment_with_invoice": "int",
    "global_currency_code": "string",
    "grand_total": "float",
    "discount_tax_compensation_amount": "float",
    "discount_tax_compensation_invoiced": "float",
    "discount_tax_compensation_refunded": "float",
    "hold_before_state": "string",
    "hold_before_status": "string",
    "increment_id": "string",
    "is_virtual": "int",
    "order_currency_code": "string",
    "original_increment_id": "string",
    "payment_authorization_amount": "float",
    "payment_auth_expiration": "int",
    "protect_code": "string",
    "quote_address_id": "int",
    "quote_id": "int",
    "relation_child_id": "string",
    "relation_child_real_id": "string",
    "relation_parent_id": "string",
    "relation_parent_real_id": "string",
    "remote_ip": "string",
    "shipping_amount": "float",
    "shipping_canceled": "float",
    "shipping_description": "string",
    "shipping_discount_amount": "float",
    "shipping_discount_tax_compensation_amount": "float",
    "shipping_incl_tax": "float",
    "shipping_invoiced": "float",
    "shipping_refunded": "float",
    "shipping_tax_amount": "float",
    "shipping_tax_refunded": "float",
    "state": "string",
    "status": "string",
    "store_currency_code": "string",
    "store_id": "int",
    "store_name": "string",
    "store_to_base_rate": "float",
    "store_to_order_rate": "float",
    "subtotal": "float",
    "subtotal_canceled": "float",
    "subtotal_incl_tax": "float",
    "subtotal_invoiced": "float",
    "subtotal_refunded": "float",
    "tax_amount": "float",
    "tax_canceled": "float",
    "tax_invoiced": "float",
    "tax_refunded": "float",
    "total_canceled": "float",
    "total_due": "float",
    "total_invoiced": "float",
    "total_item_count": "int",
    "total_offline_refunded": "float",
    "total_online_refunded": "float",
    "total_paid": "float",
    "total_qty_ordered": "float",
    "total_refunded": "float",
    "updated_at": "string",
    "weight": "float",
    "x_forwarded_for": "string",
    "items": [
        {
            "additional_data": "string",
            "amount_refunded": "float",
            "applied_rule_ids": "string",
            "base_amount_refunded": "float",
            "base_cost": "float",
            "base_discount_amount": "float",
            "base_discount_invoiced": "float",
            "base_discount_refunded": "float",
            "base_discount_tax_compensation_amount": "float",
            "base_discount_tax_compensation_invoiced": "float",
            "base_discount_tax_compensation_refunded": "float",
            "base_original_price": "float",
            "base_price": "float",
            "base_price_incl_tax": "float",
            "base_row_invoiced": "float",
            "base_row_total": "float",
            "base_row_total_incl_tax": "float",
            "base_tax_amount": "float",
            "base_tax_before_discount": "float",
            "base_tax_invoiced": "float",
            "base_tax_refunded": "float",
            "base_weee_tax_applied_amount": "float",
            "base_weee_tax_applied_row_amnt": "float",
            "base_weee_tax_disposition": "float",
            "base_weee_tax_row_disposition": "float",
            "created_at": "string",
            "description": "string",
            "discount_amount": "float",
            "discount_invoiced": "float",
            "discount_percent": "float",
            "discount_refunded": "float",
            "event_id": "int",
            "ext_order_item_id": "string",
            "free_shipping": "int",
            "gw_base_price": "float",
            "gw_base_price_invoiced": "float",
            "gw_base_price_refunded": "float",
            "gw_base_tax_amount": "float",
            "gw_base_tax_amount_invoiced": "float",
            "gw_base_tax_amount_refunded": "float",
            "gw_id": "int",
            "gw_price": "float",
            "gw_price_invoiced": "float",
            "gw_price_refunded": "float",
            "gw_tax_amount": "float",
            "gw_tax_amount_invoiced": "float",
            "gw_tax_amount_refunded": "float",
            "discount_tax_compensation_amount": "float",
            "discount_tax_compensation_canceled": "float",
            "discount_tax_compensation_invoiced": "float",
            "discount_tax_compensation_refunded": "float",
            "is_qty_decimal": "int",
            "is_virtual": "int",
            "item_id": "int",
            "locked_do_invoice": "int",
            "locked_do_ship": "int",
            "name": "string",
            "no_discount": "int",
            "order_id": "int",
            "original_price": "float",
            "parent_item_id": "int",
            "price": "float",
            "price_incl_tax": "float",
            "product_id": "int",
            "product_type": "string",
            "qty_backordered": "float",
            "qty_canceled": "float",
            "qty_invoiced": "float",
            "qty_ordered": "float",
            "qty_refunded": "float",
            "qty_returned": "float",
            "qty_shipped": "float",
            "quote_item_id": "int",
            "row_invoiced": "float",
            "row_total": "float",
            "row_total_incl_tax": "float",
            "row_weight": "float",
            "sku": "string",
            "store_id": "int",
            "tax_amount": "float",
            "tax_before_discount": "float",
            "tax_canceled": "float",
            "tax_invoiced": "float",
            "tax_percent": "float",
            "tax_refunded": "float",
            "updated_at": "string",
            "weee_tax_applied": "string",
            "weee_tax_applied_amount": "float",
            "weee_tax_applied_row_amount": "float",
            "weee_tax_disposition": "float",
            "weee_tax_row_disposition": "float",
            "weight": "float",
            "parent_item": "object{}",
            "product_option": "object{}",
            "extension_attributes": "object{}",
            "custom_attributes": [
                {
                    "attribute_code": "string",
                    "value": "mixed"
                }
            ]
        }
    ],
    "billing_address": {
        "address_type": "string",
        "city": "string",
        "company": "string",
        "country_id": "string",
        "customer_address_id": "int",
        "customer_id": "int",
        "email": "string",
        "entity_id": "int",
        "fax": "string",
        "firstname": "string",
        "lastname": "string",
        "middlename": "string",
        "parent_id": "int",
        "postcode": "string",
        "prefix": "string",
        "region": "string",
        "region_code": "string",
        "region_id": "int",
        "street": "string[]",
        "suffix": "string",
        "telephone": "string",
        "vat_id": "string",
        "vat_is_valid": "int",
        "vat_request_date": "string",
        "vat_request_id": "string",
        "vat_request_success": "int",
        "extension_attributes": "object{}"
    },
    "payment": {
        "account_status": "string",
        "additional_data": "string",
        "additional_information": "string[]",
        "address_status": "string",
        "amount_authorized": "float",
        "amount_canceled": "float",
        "amount_ordered": "float",
        "amount_paid": "float",
        "amount_refunded": "float",
        "anet_trans_method": "string",
        "base_amount_authorized": "float",
        "base_amount_canceled": "float",
        "base_amount_ordered": "float",
        "base_amount_paid": "float",
        "base_amount_paid_online": "float",
        "base_amount_refunded": "float",
        "base_amount_refunded_online": "float",
        "base_shipping_amount": "float",
        "base_shipping_captured": "float",
        "base_shipping_refunded": "float",
        "cc_approval": "string",
        "cc_avs_status": "string",
        "cc_cid_status": "string",
        "cc_debug_request_body": "string",
        "cc_debug_response_body": "string",
        "cc_debug_response_serialized": "string",
        "cc_exp_month": "string",
        "cc_exp_year": "string",
        "cc_last4": "string",
        "cc_number_enc": "string",
        "cc_owner": "string",
        "cc_secure_verify": "string",
        "cc_ss_issue": "string",
        "cc_ss_start_month": "string",
        "cc_ss_start_year": "string",
        "cc_status": "string",
        "cc_status_description": "string",
        "cc_trans_id": "string",
        "cc_type": "string",
        "echeck_account_name": "string",
        "echeck_account_type": "string",
        "echeck_bank_name": "string",
        "echeck_routing_number": "string",
        "echeck_type": "string",
        "entity_id": "int",
        "last_trans_id": "string",
        "method": "string",
        "parent_id": "int",
        "po_number": "string",
        "protection_eligibility": "string",
        "quote_payment_id": "int",
        "shipping_amount": "float",
        "shipping_captured": "float",
        "shipping_refunded": "float",
        "extension_attributes": "object{}"
    },
    "status_histories": [
        {
            "comment": "string",
            "created_at": "string",
            "entity_id": "int",
            "entity_name": "string",
            "is_customer_notified": "int",
            "is_visible_on_front": "int",
            "parent_id": "int",
            "status": "string",
            "extension_attributes": "object{}"
        }
    ],
    "extension_attributes": {
        "shipping_assignments": "object{}[]",
        "payment_additional_info": "object{}[]",
        "company_order_attributes": "object{}",
        "base_customer_balance_amount": "float",
        "customer_balance_amount": "float",
        "base_customer_balance_invoiced": "float",
        "customer_balance_invoiced": "float",
        "base_customer_balance_refunded": "float",
        "customer_balance_refunded": "float",
        "base_customer_balance_total_refunded": "float",
        "customer_balance_total_refunded": "float",
        "applied_taxes": "object{}[]",
        "item_applied_taxes": "object{}[]",
        "converting_from_quote": "boolean",
        "taxes": "object{}[]",
        "additional_itemized_taxes": "object{}[]",
        "custom_fees": "object{}[]",
        "gift_cards": "object{}[]",
        "base_gift_cards_amount": "float",
        "gift_cards_amount": "float",
        "base_gift_cards_invoiced": "float",
        "gift_cards_invoiced": "float",
        "base_gift_cards_refunded": "float",
        "gift_cards_refunded": "float",
        "gift_message": "object{}",
        "gw_id": "string",
        "gw_allow_gift_receipt": "string",
        "gw_add_card": "string",
        "gw_base_price": "string",
        "gw_price": "string",
        "gw_items_base_price": "string",
        "gw_items_price": "string",
        "gw_card_base_price": "string",
        "gw_card_price": "string",
        "gw_base_tax_amount": "string",
        "gw_tax_amount": "string",
        "gw_items_base_tax_amount": "string",
        "gw_items_tax_amount": "string",
        "gw_card_base_tax_amount": "string",
        "gw_card_tax_amount": "string",
        "gw_base_price_incl_tax": "string",
        "gw_price_incl_tax": "string",
        "gw_items_base_price_incl_tax": "string",
        "gw_items_price_incl_tax": "string",
        "gw_card_base_price_incl_tax": "string",
        "gw_card_price_incl_tax": "string",
        "gw_base_price_invoiced": "string",
        "gw_price_invoiced": "string",
        "gw_items_base_price_invoiced": "string",
        "gw_items_price_invoiced": "string",
        "gw_card_base_price_invoiced": "string",
        "gw_card_price_invoiced": "string",
        "gw_base_tax_amount_invoiced": "string",
        "gw_tax_amount_invoiced": "string",
        "gw_items_base_tax_invoiced": "string",
        "gw_items_tax_invoiced": "string",
        "gw_card_base_tax_invoiced": "string",
        "gw_card_tax_invoiced": "string",
        "gw_base_price_refunded": "string",
        "gw_price_refunded": "string",
        "gw_items_base_price_refunded": "string",
        "gw_items_price_refunded": "string",
        "gw_card_base_price_refunded": "string",
        "gw_card_price_refunded": "string",
        "gw_base_tax_amount_refunded": "string",
        "gw_tax_amount_refunded": "string",
        "gw_items_base_tax_refunded": "string",
        "gw_items_tax_refunded": "string",
        "gw_card_base_tax_refunded": "string",
        "gw_card_tax_refunded": "string",
        "coupon_codes": "string[]",
        "coupon_discounts": "string[]",
        "pickup_location_code": "string",
        "notification_sent": "int",
        "send_notification": "int",
        "reward_points_balance": "int",
        "reward_currency_amount": "float",
        "base_reward_currency_amount": "float"
    },
    "custom_attributes": [
        {
            "attribute_code": "string",
            "value": "mixed"
        }
    ]
}
```

## SalesRule

### observer.salesrule_delete_after

Triggered after a cart price rule is deleted, while the database transaction is still open. The write is not yet durable and can still rollback, so this is not a safe hook for external integrations that require committed data.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following sources:

* GraphQL
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "customer_group_ids": "array",
    "store_labels": "array",
    "from_date": "string",
    "simple_action": "string",
    "to_date": "string",
    "_origData": "array",
    "_isNew": "boolean"
}
```

### observer.salesrule_rule_save_after

Triggered after a cart price rule is created or updated, while the database transaction is still open. The write is not yet durable and can be rolled back, so this is not a reliable event for external integrations that require committed data.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following sources:

* GraphQL
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "customer_group_ids": "array",
    "store_labels": "array",
    "from_date": "string",
    "simple_action": "string",
    "to_date": "string",
    "_origData": "array",
    "_isNew": "boolean"
}
```

### plugin.sales_rule.api.rule_repository.save

Triggered after the SalesRule `RuleRepository` service contract creates or updates a cart price rule. The repository fully persists the rule before returning, so the data is durable when the event fires, making this the recommended event for REST-based integrations.

**Event details**:

This event can be triggered from the following sources:

* REST

It cannot be triggered from the following sources:

* Admin
* GraphQL
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "rule_id": "int",
    "name": "string",
    "store_labels": [
        {
            "store_id": "int",
            "store_label": "string",
            "extension_attributes": "object{}"
        }
    ],
    "description": "string",
    "website_ids": "int[]",
    "customer_group_ids": "int[]",
    "from_date": "string",
    "to_date": "string",
    "uses_per_customer": "int",
    "is_active": "bool",
    "condition": {
        "condition_type": "string",
        "conditions": "object{}[]",
        "aggregator_type": "string",
        "operator": "string",
        "attribute_name": "string",
        "value": "mixed",
        "extension_attributes": "object{}"
    },
    "action_condition": {
        "condition_type": "string",
        "conditions": "object{}[]",
        "aggregator_type": "string",
        "operator": "string",
        "attribute_name": "string",
        "value": "mixed",
        "extension_attributes": "object{}"
    },
    "stop_rules_processing": "bool",
    "is_advanced": "bool",
    "product_ids": "int[]",
    "sort_order": "int",
    "simple_action": "string",
    "discount_amount": "float",
    "discount_qty": "float",
    "discount_step": "int",
    "apply_to_shipping": "bool",
    "times_used": "int",
    "is_rss": "bool",
    "coupon_type": "string",
    "use_auto_generation": "bool",
    "uses_per_coupon": "int",
    "simple_free_shipping": "string",
    "extension_attributes": {
        "reward_points_delta": "int"
    }
}
```

### plugin.sales_rule.model.resource_model.coupon.delete

Triggered after a SalesRule coupon resource model delete completes. Commit timing depends on context: the coupon resource normally commits its own transaction, but when the delete is nested inside a larger rule-save or rule-delete operation, the commit is deferred to that outer transaction, so the data isn't guaranteed to be durable when the event fires.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following sources:

* GraphQL

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "coupon_id": "int",
    "rule_id": "int",
    "code": "string",
    "usage_limit": "int",
    "usage_per_customer": "int",
    "times_used": "int",
    "expiration_date": "string",
    "is_primary": "bool",
    "created_at": "string",
    "type": "int",
    "_origData": "array",
    "_isNew": "boolean"
}
```

### plugin.sales_rule.model.resource_model.coupon.save

Triggered after a SalesRule coupon resource model create or update completes. Commit timing depends on context: the coupon resource normally commits its own transaction, but when the save is nested inside a larger rule-save operation, the commit is deferred to that outer transaction, so the data isn't guaranteed to be durable when the event fires.

**Event details**:

This event can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following sources:

* GraphQL

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "coupon_id": "int",
    "rule_id": "int",
    "code": "string",
    "usage_limit": "int",
    "usage_per_customer": "int",
    "times_used": "int",
    "expiration_date": "string",
    "is_primary": "bool",
    "created_at": "string",
    "type": "int",
    "_origData": "array",
    "_isNew": "boolean"
}
```

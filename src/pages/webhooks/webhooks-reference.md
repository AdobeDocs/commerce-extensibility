---
title:  Webhooks reference
description: Lists details about each webhook supported on Adobe Commerce as a Cloud Service.
edition: saas
keywords:
  - Webhooks
  - Extensibility
---

# Webhooks reference

This reference lists the full payload for each webhook supported on Adobe Commerce as a Cloud Service. Adobe recommends that you minimize the data that you send to the external endpoint, as described in [Configure hook contents](hooks.md).

* [Cart & Quote](#cart--quote)
* [Cart Price Rules](#cart-price-rules)
* [Catalog](#catalog)
* [Checkout](#checkout)
* [Customer](#customer)
* [Email & Notifications](#email--notifications)
* [Gift Card](#gift-card)
* [Payment (Out-of-Process)](#payment-out-of-process)
* [Sales](#sales)
* [Shipping (Out-of-Process)](#shipping-out-of-process)
* [Tax (Out-of-Process)](#tax-out-of-process)
* [Totals (Out-of-Process)](#totals-out-of-process)

Webhooks can be triggered from the Commerce Admin, REST APIs, GraphQL APIs, Edge Delivery Service (EDS) storefront calls, and import actions. The webhook details section for each webhook lists the sources that can trigger the webhook. In the cases where a source is not listed, whether the webhook can be triggered from that source cannot be determined.

## Cart & Quote

### observer.sales_quote_add_item

Triggered when a new item is added to the quote (cart). Available as the `observer.sales_quote_add_item` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* Admin
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "data": {
        "quoteItem": {
            "qty_options": "array",
            "product_type": "string",
            "real_product_type": "string",
            "item_id": "int",
            "sku": "string",
            "qty": "float",
            "name": "string",
            "price": "float",
            "quote_id": "string",
            "product_option": {
                "extension_attributes": "object{}"
            },
            "custom_attributes": [
                {
                    "attribute_code": "string",
                    "value": "mixed"
                }
            ]
        }
    },
    "result": "mixed"
}
```

### observer.sales_quote_address_discount_item

Triggered during item-level discount collection on a quote address, while quote totals are being collected. Available as the `observer.sales_quote_address_discount_item` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "result": "mixed"
}
```

### observer.sales_quote_item_delete_after

Triggered after a quote (cart) item has been deleted. Available as the `observer.sales_quote_item_delete_after` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* Admin
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "data": {
        "item": {
            "qty_options": "array",
            "product_type": "string",
            "real_product_type": "string",
            "item_id": "int",
            "sku": "string",
            "qty": "float",
            "name": "string",
            "price": "float",
            "quote_id": "string",
            "product_option": {
                "extension_attributes": "object{}"
            }
        }
    },
    "result": "mixed"
}
```

### observer.sales_quote_item_save_after

Triggered after a quote (cart) item has been saved. Available as the `observer.sales_quote_item_save_after` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* Admin
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "data": {
        "item": {
            "qty_options": "array",
            "product_type": "string",
            "real_product_type": "string",
            "item_id": "int",
            "sku": "string",
            "qty": "float",
            "name": "string",
            "price": "float",
            "quote_id": "string",
            "product_option": {
                "extension_attributes": "object{}"
            }
        }
    },
    "result": "mixed"
}
```

### observer.sales_quote_item_set_product

Triggered when a product is assigned to a quote (cart) item. Available as the `observer.sales_quote_item_set_product` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "result": "mixed"
}
```

### observer.sales_quote_merge_after

Triggered after one quote is merged into another, such as a guest cart into a customer cart. Available as the `observer.sales_quote_merge_after` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "data": {
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
            "messages": "array"
        },
        "source": {
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
            "messages": "array"
        }
    },
    "result": "mixed"
}
```

### observer.sales_quote_save_after

Triggered after the quote (cart) has been saved. Available as the `observer.sales_quote_save_after` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* Admin
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "data": {
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
            "messages": "array"
        }
    },
    "result": "mixed"
}
```

### plugin.quote.api.guest_coupon_management.set

Triggered when a coupon code is applied to a guest cart. Available as the `plugin.quote.api.guest_coupon_management.set` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook cannot be triggered from the following sources:

* REST
* GraphQL
* Storefront (EDS)
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "cartId": "string",
    "couponCode": "string",
    "result": "mixed"
}
```

### plugin.quote.api.shipment_estimation.estimate_by_extended_address

Triggered when the available shipping methods are estimated for a cart address. Available as the `plugin.quote.api.shipment_estimation.estimate_by_extended_address` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* REST
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "cartId": "mixed",
    "address": {
        "id": "int",
        "region": "string",
        "region_id": "int",
        "region_code": "string",
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
        "customer_id": "int",
        "email": "string",
        "same_as_billing": "int",
        "customer_address_id": "int",
        "save_in_address_book": "int",
        "extension_attributes": {
            "discounts": "object{}[]",
            "gift_registry_id": "int",
            "company_address_id": "int",
            "pickup_location_code": "string"
        },
        "custom_attributes": [
            {
                "attribute_code": "string",
                "value": "mixed"
            }
        ]
    },
    "result": "mixed"
}
```

### plugin.quote.model.resource_model.quote.address.save

Triggered when a quote address is persisted. Available as the `plugin.quote.model.resource_model.quote.address.save` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "object": {
        "all_items": [
            []
        ],
        "totals": "array",
        "applied_taxes": "array",
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
        "customer_id": "int",
        "email": "string",
        "same_as_billing": "int",
        "customer_address_id": "int",
        "save_in_address_book": "int",
        "shipping_method": "string"
    },
    "result": "mixed"
}
```

## Cart Price Rules

### observer.salesrule_validator_process

Triggered while cart price rule discounts are applied during quote totals collection. Available as the `observer.salesrule_validator_process` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* Admin
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "result": "mixed"
}
```

## Catalog

### observer.catalog_product_save_after

Triggered when the product model dispatches the `catalog_product_save_after` event, just after a product entity has been persisted. Available as the `observer.catalog_product_save_after` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "data": {
        "product": {
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
                "iterator": "ArrayIterator"
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
            "stock_data": "array"
        }
    },
    "result": "mixed"
}
```

### observer.catalog_product_save_before

Triggered when the product model dispatches the `catalog_product_save_before` event, just before a product entity is persisted. Available as the `observer.catalog_product_save_before` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "data": {
        "product": {
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
                "iterator": "ArrayIterator"
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
            "stock_data": "array"
        }
    },
    "result": "mixed"
}
```

## Checkout

### observer.checkout_cart_product_add_before

Triggered when the Checkout Cart model dispatches the `checkout_cart_product_add_before` event, just before a product is added to the cart. Available as the `observer.checkout_cart_product_add_before` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook cannot be triggered from the following sources:

* GraphQL
* Storefront (EDS)
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "data": {
        "info": "mixed",
        "product": {
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
                "iterator": "ArrayIterator"
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
            "stock_data": "array"
        }
    },
    "result": "mixed"
}
```

## Customer

### observer.customer_forgot_email_set_template_vars_before

Triggered while the template variables for the customer forgot-password email are assembled. Available as the `observer.customer_forgot_email_set_template_vars_before` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "data": {
        "transportObject": {
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
                        "extension_attributes": "object{}",
                        "custom_attributes": "object{}[]"
                    }
                ],
                "disable_auto_group_change": "int",
                "extension_attributes": {
                    "company_attributes": "object{}",
                    "all_company_attributes": "object{}[]",
                    "is_subscribed": "boolean",
                    "last_login_at": "string",
                    "assistance_allowed": "integer"
                },
                "custom_attributes": [
                    {
                        "attribute_code": "string",
                        "value": "mixed"
                    }
                ]
            },
            "store": {
                "id": "int",
                "code": "string",
                "name": "string",
                "website_id": "int",
                "store_group_id": "int",
                "is_active": "int",
                "extension_attributes": []
            }
        }
    },
    "result": "mixed"
}
```

### observer.customer_save_before

Triggered when the customer model dispatches the `customer_save_before` event, just before a customer entity is persisted. Available as the `observer.customer_save_before` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

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
    "eventName": "string",
    "data": {
        "customer": {
            "data_model": {
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
                "extension_attributes": "object{}",
                "custom_attributes": "object{}[]"
            },
            "group_id": "int",
            "tax_class_id": "int",
            "shared_store_ids": "array",
            "shared_website_ids": "int[]",
            "password_confirm": "string",
            "password": "string"
        }
    },
    "result": "mixed"
}
```

### plugin.customer.api.address_repository.save

Triggered when a customer address is persisted through `Magento\Customer\Api\AddressRepositoryInterface::save`. Available as the `plugin.customer.api.address_repository.save` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* GraphQL
* Storefront (EDS)

It cannot be triggered from the following sources:

* REST
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "address": {
        "id": "int",
        "customer_id": "int",
        "region": {
            "region_code": "string",
            "region": "string",
            "region_id": "int",
            "extension_attributes": "object{}"
        },
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
        "extension_attributes": [],
        "custom_attributes": [
            {
                "attribute_code": "string",
                "value": "mixed"
            }
        ]
    },
    "result": "mixed"
}
```

## Email & Notifications

### observer.email_invoice_comment_set_template_vars_before

Triggered while the template variables for the invoice comment email are assembled. Available as the `observer.email_invoice_comment_set_template_vars_before` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following source:

* Admin

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "result": "mixed"
}
```

### observer.email_invoice_set_template_vars_before

Triggered while the template variables for the invoice email are assembled. Available as the `observer.email_invoice_set_template_vars_before` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following source:

* Admin

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "result": "mixed"
}
```

### observer.email_order_set_template_vars_before

Triggered while the template variables for the order confirmation email are assembled. Available as the `observer.email_order_set_template_vars_before` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following source:

* Admin

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "result": "mixed"
}
```

### observer.email_ready_for_pickup_set_template_vars_before

Triggered while the template variables for the order ready-for-pickup notification email are assembled. Available as the `observer.email_ready_for_pickup_set_template_vars_before` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following source:

* REST

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "result": "mixed"
}
```

### observer.email_rejected_order_set_template_vars_before

Triggered while the template variables for the rejected asynchronous order email are assembled. Available as the `observer.email_rejected_order_set_template_vars_before` webhook with webhook type `before` or `after`.

**Webhook details**:

The sources that can trigger this webhook could not be determined.

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "result": "mixed"
}
```

### observer.email_shipment_comment_set_template_vars_before

Triggered while the template variables for the shipment comment email are assembled. Available as the `observer.email_shipment_comment_set_template_vars_before` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following source:

* Admin

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "result": "mixed"
}
```

### observer.email_shipment_set_template_vars_before

Triggered while the template variables for the shipment email are assembled. Available as the `observer.email_shipment_set_template_vars_before` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following source:

* Admin

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "result": "mixed"
}
```

## Gift Card

### plugin.gift_card_account.api.gift_card_account_management.check_gift_card

Triggered when a gift card code is validated against a cart. Available as the `plugin.gift_card_account.api.gift_card_account_management.check_gift_card` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook cannot be triggered from the following sources:

* REST
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "cartId": "int",
    "giftCardCode": "string",
    "result": "mixed"
}
```

### plugin.gift_card_account.api.gift_card_account_management.save_by_quote_id

Triggered when a gift card is applied to a cart. Available as the `plugin.gift_card_account.api.gift_card_account_management.save_by_quote_id` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "cartId": "int",
    "giftCardAccountData": {
        "gift_cards": "string[]",
        "gift_cards_amount": "float",
        "base_gift_cards_amount": "float",
        "gift_cards_amount_used": "float",
        "base_gift_cards_amount_used": "float",
        "extension_attributes": []
    },
    "result": "mixed"
}
```

## Payment (Out-of-Process)

### plugin.out_of_process_payment_methods.api.payment_method_filter.get_list

Triggered when the list of available payment methods is built for a cart. Available as the `plugin.out_of_process_payment_methods.api.payment_method_filter.get_list` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* Admin
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "payload": {
        "cart": {
            "id": "int",
            "created_at": "string",
            "updated_at": "string",
            "converted_at": "string",
            "is_active": "bool",
            "is_virtual": "bool",
            "items": "object{}[]",
            "items_count": "int",
            "items_qty": "float",
            "customer": "object{}",
            "billing_address": "object{}",
            "reserved_order_id": "string",
            "orig_order_id": "int",
            "currency": "object{}",
            "customer_is_guest": "bool",
            "customer_note": "string",
            "customer_note_notify": "bool",
            "customer_tax_class_id": "int",
            "store_id": "int",
            "extension_attributes": "object{}"
        },
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
            "addresses": "object{}[]",
            "disable_auto_group_change": "int",
            "extension_attributes": "object{}",
            "custom_attributes": "object{}[]"
        },
        "available_payment_methods": "array"
    },
    "result": "mixed"
}
```

## Sales

### observer.sales_order_creditmemo_save_before

Triggered when the credit memo model dispatches the `sales_order_creditmemo_save_before` event from its save routine. Available as the `observer.sales_order_creditmemo_save_before` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "data": {
        "creditmemo": {
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
                    "extension_attributes": "object{}"
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
            "updated_at": "string"
        }
    },
    "result": "mixed"
}
```

### observer.sales_order_invoice_cancel

Triggered when an invoice is cancelled, as the `sales_order_invoice_cancel` event is dispatched. Available as the `observer.sales_order_invoice_cancel` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following source:

* Admin

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "result": "mixed"
}
```

### observer.sales_order_invoice_save_before

Triggered when the invoice model dispatches the `sales_order_invoice_save_before` event from its save routine. Available as the `observer.sales_order_invoice_save_before` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "data": {
        "invoice": {
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
            "updated_at": "string"
        }
    },
    "result": "mixed"
}
```

### observer.sales_order_place_before

Triggered during order placement, when the `sales_order_place_before` event is dispatched. Available as the `observer.sales_order_place_before` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

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
    "eventName": "string",
    "data": {
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
        }
    },
    "result": "mixed"
}
```

### observer.sales_order_view_custom_attributes_update_before

Triggered when serializable order custom attributes are saved from the Admin, as the `sales_order_view_custom_attributes_update_before` event is dispatched. Available as the `observer.sales_order_view_custom_attributes_update_before` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following source:

* Admin

It cannot be triggered from the following sources:

* REST
* GraphQL
* Storefront (EDS)
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "eventName": "string",
    "data": {
        "custom_attributes": "object{}",
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
                    "extension_attributes": "object{}"
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
            "x_forwarded_for": "string"
        }
    },
    "result": "mixed"
}
```

### plugin.sales.api.order_management.cancel

Triggered when an order is cancelled through `Magento\Sales\Api\OrderManagementInterface::cancel`. Available as the `plugin.sales.api.order_management.cancel` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* Admin
* REST

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "id": "int",
    "result": "mixed"
}
```

### plugin.sales.api.order_management.place

Triggered when an order is placed through `Magento\Sales\Api\OrderManagementInterface::place`. Available as the `plugin.sales.api.order_management.place` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

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
            "applied_taxes": "object{}[]",
            "item_applied_taxes": "object{}[]",
            "converting_from_quote": "boolean",
            "taxes": "object{}[]",
            "additional_itemized_taxes": "object{}[]",
            "base_customer_balance_amount": "float",
            "customer_balance_amount": "float",
            "base_customer_balance_invoiced": "float",
            "customer_balance_invoiced": "float",
            "base_customer_balance_refunded": "float",
            "customer_balance_refunded": "float",
            "base_customer_balance_total_refunded": "float",
            "customer_balance_total_refunded": "float",
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
            "admin_assisted_order": "int",
            "reward_points_balance": "int",
            "reward_currency_amount": "float",
            "base_reward_currency_amount": "float",
            "custom_fees": "object{}[]"
        },
        "custom_attributes": [
            {
                "attribute_code": "string",
                "value": "mixed"
            }
        ]
    },
    "result": "mixed"
}
```

## Shipping (Out-of-Process)

### plugin.out_of_process_shipping_methods.api.shipping_rate_repository.get_rates

Triggered when shipping rates are resolved for a cart. Available as the `plugin.out_of_process_shipping_methods.api.shipping_rate_repository.get_rates` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* Admin
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "rateRequest": {
        "store_id": "int",
        "website_id": "int",
        "base_currency": {
            "currency_code": "string"
        },
        "all_items": [
            {
                "qty_options": "array",
                "product_type": "string",
                "real_product_type": "string",
                "item_id": "int",
                "sku": "string",
                "qty": "float",
                "name": "string",
                "price": "float",
                "quote_id": "string",
                "product_option": {
                    "extension_attributes": "object{}"
                },
                "product": {
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
                        "iterator": "ArrayIterator"
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
                    "stock_data": "array"
                },
                "custom_options": [
                    {
                        "label": "string",
                        "option_id": "string",
                        "option_value": "string"
                    }
                ]
            }
        ],
        "orig_country_id": "string",
        "orig_region_id": "int",
        "orig_postcode": "string",
        "orig_city": "string",
        "dest_country_id": "string",
        "dest_region_id": "int",
        "dest_region_code": "string",
        "dest_postcode": "string",
        "dest_city": "string",
        "dest_street": "string",
        "package_value": "float",
        "package_value_with_discount": "float",
        "package_physical_value": "float",
        "package_qty": "float",
        "package_weight": "float",
        "package_height": "int",
        "package_width": "int",
        "package_depth": "int",
        "package_currency": {
            "currency_code": "string"
        },
        "order_total_qty": "float",
        "order_subtotal": "float",
        "free_shipping": "bool",
        "free_method_weight": "float",
        "option_insurance": "bool",
        "option_handling": "float",
        "condition_name": "string",
        "limit_carrier": "string",
        "limit_method": "string",
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
                    "extension_attributes": "object{}",
                    "custom_attributes": "object{}[]"
                }
            ],
            "disable_auto_group_change": "int",
            "extension_attributes": {
                "company_attributes": "object{}",
                "all_company_attributes": "object{}[]",
                "is_subscribed": "boolean",
                "last_login_at": "string",
                "assistance_allowed": "integer"
            },
            "custom_attributes": [
                {
                    "attribute_code": "string",
                    "value": "mixed"
                }
            ]
        },
        "selected_shipping_method": {
            "carrier_code": "string|null",
            "method_code": "string|null"
        },
        "address_custom_attributes": {
            "attribute_code": "mixed"
        }
    }
}
```

## Tax (Out-of-Process)

### plugin.out_of_process_tax_management.api.oop_credit_memo_tax_collection.collect_taxes

Triggered when adjustment taxes are computed during credit memo creation. Available as the `plugin.out_of_process_tax_management.api.oop_credit_memo_tax_collection.collect_taxes` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following source:

* Admin

It cannot be triggered from the following sources:

* GraphQL
* Storefront (EDS)
* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "oopCreditMemo": {
        "order_id": "int",
        "adjustment": {
            "refund": "float",
            "refund_tax": "float",
            "fee": "float",
            "fee_tax": "float"
        },
        "customer_tax_class": "string",
        "items": [
            {
                "code": "string",
                "type": "string",
                "unit_price": "float",
                "quantity": "float",
                "discount_amount": "float",
                "is_tax_included": "bool",
                "tax_class": "string",
                "custom_attributes": "array",
                "sku": "string",
                "name": "string"
            }
        ],
        "ship_from_address": {
            "street": "string[]",
            "city": "string",
            "region": "string",
            "region_code": "string",
            "country": "string",
            "postcode": "string"
        },
        "ship_to_address": {
            "street": "string[]",
            "city": "string",
            "region": "string",
            "region_code": "string",
            "country": "string",
            "postcode": "string"
        },
        "billing_address": {
            "street": "string[]",
            "city": "string",
            "region": "string",
            "region_code": "string",
            "country": "string",
            "postcode": "string"
        },
        "shipping": {
            "shipping_method": "string",
            "shipping_description": "string"
        },
        "custom_attributes": "array",
        "customer": {
            "entity_id": "int",
            "website_id": "int",
            "group_id": "int",
            "email": "string",
            "firstname": "string",
            "lastname": "string",
            "middlename": "string"
        }
    },
    "result": "mixed"
}
```

### plugin.out_of_process_tax_management.api.oop_tax_collection.collect_taxes

Triggered when taxes are computed for a quote during totals collection. Available as the `plugin.out_of_process_tax_management.api.oop_tax_collection.collect_taxes` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* Admin
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "oopQuote": {
        "quote_id": "int",
        "customer_tax_class": "string",
        "items": [
            {
                "code": "string",
                "type": "string",
                "tax_class": "string",
                "unit_price": "float",
                "quantity": "float",
                "is_tax_included": "bool",
                "discount_amount": "float",
                "custom_attributes": "array",
                "sku": "string",
                "name": "string",
                "tax": "object{}",
                "tax_breakdown": "object{}[]"
            }
        ],
        "ship_from_address": {
            "street": "string[]",
            "city": "string",
            "region": "string",
            "region_code": "string",
            "country": "string",
            "postcode": "string"
        },
        "ship_to_address": {
            "street": "string[]",
            "city": "string",
            "region": "string",
            "region_code": "string",
            "country": "string",
            "postcode": "string"
        },
        "billing_address": {
            "street": "string[]",
            "city": "string",
            "region": "string",
            "region_code": "string",
            "country": "string",
            "postcode": "string"
        },
        "shipping": {
            "shipping_method": "string",
            "shipping_description": "string"
        },
        "custom_attributes": "array",
        "customer": {
            "entity_id": "int",
            "website_id": "int",
            "group_id": "int",
            "email": "string",
            "firstname": "string",
            "lastname": "string",
            "middlename": "string"
        }
    },
    "result": "mixed"
}
```

## Totals (Out-of-Process)

### plugin.out_of_process_totals_collector.api.get_total_modifications.custom_fees

Triggered while custom-fee modifications are retrieved during quote totals collection. Available as the `plugin.out_of_process_totals_collector.api.get_total_modifications.custom_fees` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* Admin
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "quote": {
        "entity_id": "int",
        "is_active": "bool",
        "items_count": "int",
        "items_qty": "float",
        "store_id": "int",
        "customer_group_id": "int",
        "customer_tax_class_id": "int",
        "subtotal": "float",
        "subtotal_with_discount": "float",
        "grand_total": "float",
        "base_subtotal": "float",
        "base_grand_total": "float",
        "currency": {
            "base_currency_code": "string",
            "store_currency_code": "string",
            "quote_currency_code": "string",
            "extension_attributes": "object{}"
        }
    },
    "shippingAssignment": {
        "shipping": {
            "address": "object{}",
            "method": "string",
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
                "row_total": "float",
                "tax_amount": "float",
                "discount_amount": "float"
            }
        ],
        "extension_attributes": []
    },
    "total": {
        "subtotal": "float",
        "base_subtotal": "float",
        "base_virtual_amount": "float",
        "virtual_amount": "float",
        "custom_fee_amount": "float",
        "base_custom_fee_amount": "float",
        "base_grand_total": "float",
        "grand_total": "float",
        "tax_amount": "float",
        "base_tax_amount": "float",
        "discount_tax_compensation_amount": "float",
        "base_discount_tax_compensation_amount": "float",
        "subtotal_incl_tax": "float",
        "base_subtotal_total_incl_tax": "float",
        "base_subtotal_incl_tax": "float",
        "discount_amount": "float",
        "base_discount_amount": "float",
        "discount_description": "string",
        "subtotal_with_discount": "float",
        "base_subtotal_with_discount": "float",
        "shipping_amount": "float",
        "base_shipping_amount": "float",
        "shipping_description": "string",
        "shipping_tax_calculation_amount": "float",
        "base_shipping_tax_calculation_amount": "float",
        "shipping_discount_tax_compensation_amount": "float",
        "base_shipping_discount_tax_compensation_amount": "float",
        "shipping_incl_tax": "float",
        "base_shipping_incl_tax": "float",
        "shipping_tax_amount": "float",
        "base_shipping_tax_amount": "float",
        "shipping_discount_amount": "float",
        "base_shipping_discount_amount": "float"
    },
    "result": "mixed"
}
```

### plugin.out_of_process_totals_collector.api.get_total_modifications.execute

Triggered while total (discount) modifications are retrieved during quote totals collection. Available as the `plugin.out_of_process_totals_collector.api.get_total_modifications.execute` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* Admin
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "quote": {
        "entity_id": "int",
        "is_active": "bool",
        "items_count": "int",
        "items_qty": "float",
        "store_id": "int",
        "customer_group_id": "int",
        "customer_tax_class_id": "int",
        "subtotal": "float",
        "subtotal_with_discount": "float",
        "grand_total": "float",
        "base_subtotal": "float",
        "base_grand_total": "float",
        "currency": {
            "base_currency_code": "string",
            "store_currency_code": "string",
            "quote_currency_code": "string",
            "extension_attributes": "object{}"
        }
    },
    "shippingAssignment": {
        "shipping": {
            "address": "object{}",
            "method": "string",
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
                "row_total": "float",
                "tax_amount": "float",
                "discount_amount": "float"
            }
        ],
        "extension_attributes": []
    },
    "total": {
        "subtotal": "float",
        "base_subtotal": "float",
        "base_virtual_amount": "float",
        "virtual_amount": "float",
        "custom_fee_amount": "float",
        "base_custom_fee_amount": "float",
        "base_grand_total": "float",
        "grand_total": "float",
        "tax_amount": "float",
        "base_tax_amount": "float",
        "discount_tax_compensation_amount": "float",
        "base_discount_tax_compensation_amount": "float",
        "subtotal_incl_tax": "float",
        "base_subtotal_total_incl_tax": "float",
        "base_subtotal_incl_tax": "float",
        "discount_amount": "float",
        "base_discount_amount": "float",
        "discount_description": "string",
        "subtotal_with_discount": "float",
        "base_subtotal_with_discount": "float"
    },
    "result": "mixed"
}
```

### plugin.out_of_process_totals_collector.api.get_total_modifications.item_prices

Triggered while item-price modifications are retrieved during quote totals collection. Available as the `plugin.out_of_process_totals_collector.api.get_total_modifications.item_prices` webhook with webhook type `before` or `after`.

**Webhook details**:

This webhook can be triggered from the following sources:

* Admin
* GraphQL
* Storefront (EDS)

It cannot be triggered from the following source:

* Import

**Payload**:

<Details slots="content" summary="Show payload" />

```json
{
    "quote": {
        "entity_id": "int",
        "is_active": "bool",
        "items_count": "int",
        "items_qty": "float",
        "store_id": "int",
        "customer_group_id": "int",
        "customer_tax_class_id": "int",
        "subtotal": "float",
        "subtotal_with_discount": "float",
        "grand_total": "float",
        "base_subtotal": "float",
        "base_grand_total": "float",
        "currency": {
            "base_currency_code": "string",
            "store_currency_code": "string",
            "quote_currency_code": "string",
            "extension_attributes": "object{}"
        }
    },
    "shippingAssignment": {
        "shipping": {
            "address": "object{}",
            "method": "string",
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
                "row_total": "float",
                "tax_amount": "float",
                "discount_amount": "float"
            }
        ],
        "extension_attributes": []
    },
    "total": {
        "subtotal": "float",
        "base_subtotal": "float",
        "base_virtual_amount": "float",
        "virtual_amount": "float"
    },
    "result": "mixed"
}
```

---
title: Webhooks commands
description: Provides details about the commands needed to use Adobe Commerce webhooks.
keywords:
  - Extensibility
---

# Webhooks commands

Adobe Commerce provides the following commands to configure and process webhooks:

* [webhooks:info](#display-the-payload-of-a-webhook)
* [webhooks:list:all](#return-a-list-of-supported-webhook-event-names)
* [webhooks:list](#return-a-list-of-subscribed-webhooks)
* [webhooks:generate:module](#generate-plugins)
* [webhooks:dev:run](#emulate-webhook-execution)

## Display the payload of a webhook

The `webhooks:info` command returns the payload of the specified webhook. You can optionally specify the depth of the payload to reduce the amount data returned.

<InlineAlert variant="info" slots="text" />

The actual payload of a transmitted webhook can be different from that returned by the `webhooks:info`. The command response is based on the current state of objects and variables.

The value of the `webhook-name` argument must be a valid Commerce event name. The value must use the following pattern:

```text
<type>.<event_name>
```

where:

*  `type` specifies the origin of the event. Specify `observer` if the event is emitted by a Commerce observer, or specify `plugin` if the event is emitted by a plugin.
*  `event_name` identifies the event. For example: `catalog_product_save_after`.

### Usage

`bin/magento webhooks:info <webhook-name> [--webhook-type="<value>"] [--depth=<integer>]`

### Arguments

&lt;webhook-name> Required. The name must begin with either `observer.` or `plugin.`

`--webhook-type` Optional. Indicates whether the plugin that generates the event is a `before` or `after` plugin. The default value is `before`. `around` plugins are not supported.

### Options

`--depth=<integer>` Determines how many nested levels of the payload to return. The default value is `3`.

### Example

```bash
bin/magento webhooks:info observer.catalog_product_save_before
```

### Response

```terminal
{
    "eventName": "string",
    "data": {
        "data_object": {
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
                "parent_category": "\Magento\Catalog\Model\Category",
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
                "children_data": "\Magento\Catalog\Api\Data\CategoryTreeInterface[]"
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
                "first_item": "\Magento\Framework\DataObject",
                "last_item": "\Magento\Framework\DataObject",
                "items": "\Magento\Framework\DataObject[]",
                "all_ids": "array",
                "new_empty_item": "\Magento\Framework\DataObject",
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
                    "values": "\Magento\Catalog\Api\Data\ProductCustomOptionValuesInterface[]",
                    "extension_attributes": "\Magento\Catalog\Api\Data\ProductCustomOptionExtensionInterface"
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
    }
}
```

## Return a list of supported webhook event names

The `webhooks:list:all` command returns a list of events defined in the specified module that can be used as the trigger for a webhook.

### Usage

`bin/magento webhooks:list:all <module_name>`

### Arguments

`<module_name>` Required. Specifies the module to query.

### Example

```bash
bin/magento webhooks:list:all Magento_Sales
```

### Response

```terminal
observer.admin_sales_order_address_update
observer.adminhtml_customer_orders_add_action_renderer
observer.adminhtml_sales_order_create_process_data
observer.adminhtml_sales_order_create_process_data_before
observer.adminhtml_sales_order_create_process_item_after
...
plugin.magento.sales.api.creditmemo_comment_repository.delete
plugin.magento.sales.api.creditmemo_comment_repository.save
plugin.magento.sales.api.creditmemo_item_repository.delete
plugin.magento.sales.api.creditmemo_item_repository.save
plugin.magento.sales.api.creditmemo_management.cancel
...
```

## Return a list of subscribed webhooks

The `webhooks:list` command returns details about all subscribed webhooks. The response contains the webhook name and the type of plugin that calls the webhook, (`before` or `after`). The batch column of the response contains a list of hooks that can be executed in parallel.

### Usage

`bin/magento webhooks:list`

### Example

```bash
bin/magento webhooks:list
```

### Response

```terminal
ok | 10:25:24 AM
+-------------------------------------------+--------+---------------------------------------------------------------------------+
| name                                      | type   | batches                                                                   |
+-------------------------------------------+--------+---------------------------------------------------------------------------+
| observer.catalog_product_save_after       | after  | [                                                                         |
|                                           |        |     [                                                                     |
|                                           |        |         {                                                                 |
|                                           |        |             "name": "product_updated",                                    |
|                                           |        |             "url": "{env:APP_BUILDER_PROJECT_URL}\/product-updated",      |
|                                           |        |             "method": "",                                                 |
|                                           |        |             "headers": [                                                  |
|                                           |        |                 "x-gw-ims-org-id : {env:APP_BUILDER_IMS_ORG_ID}",         |
|                                           |        |                 "Authorization : Bearer {env:APP_BUILDER_AUTH_TOKEN}",    |
|                                           |        |                 "Magento\\WebhookModule\\Model\\AddProductToCartResolver" |
|                                           |        |             ],                                                            |
|                                           |        |             "fields": [                                                   |
|                                           |        |                 "product.name : data.product.name",                       |
|                                           |        |                 "product.category_ids : data.product.category_ids",       |
|                                           |        |                 "product.sku : data.product.sku"                          |
|                                           |        |             ]                                                             |
|                                           |        |         }                                                                 |
|                                           |        |     ]                                                                     |
|                                           |        | ]                                                                         |
| observer.checkout_cart_product_add_before | before | [                                                                         |
|                                           |        |     [                                                                     |
|                                           |        |         {                                                                 |
|                                           |        |             "name": "validate_stock",                                     |
|                                           |        |             "url": "http:\/\/localhost:8085\/product-validate-stock",     |
|                                           |        |             "method": "",                                                 |
|                                           |        |             "headers": [                                                  |
|                                           |        |                 "Magento\\WebhookModule\\Model\\AddProductToCartResolver" |
|                                           |        |             ],                                                            |
|                                           |        |             "fields": [                                                   |
|                                           |        |                 "product.name : data.product.name",                       |
|                                           |        |                 "product.category_ids : data.product.category_ids",       |
|                                           |        |                 "product.sku : data.product.sku"                          |
|                                           |        |             ]                                                             |
|                                           |        |         }                                                                 |
|                                           |        |     ]                                                                     |
|                                           |        | ]                                                                         |
+-------------------------------------------+--------+---------------------------------------------------------------------------+
```

## Generate plugins

The `webhooks:generate:module` command generates the `AdobeCommerceWebhookPlugins` module with plugins based on webhook registrations and places it into the Commerce `app/code/Magento` directory.

### Usage

`bin/magento webhooks:generate:module`

### Example

```bash
bin/magento webhooks:generate:module
```

### Response

```terminal
Module was generated in the app/code/Magento directory
```

## Emulate webhook execution

The `webhooks:dev:run` command is used for development and testing purposes only. It emulates the execution of your registered webhook containing a custom payload with requiring changes to the Commerce application. 
This can be helpful during the development or testing of the webhook endpoint as you can emulate webhook execution with different payloads without making required changes in the Adobe Commerce application to trigger webhook execution.

### Usage

`bin/magento webhooks:dev:run <webhook-name> <webhook-arguments-payload>`

### Arguments

&lt;webhook-name> Required. The combination of webhook name and type, the name must begin with either `observer.` or `plugin.`. Example: `observer.checkout_cart_product_add_before:before`

&lt;webhook-arguments-payload> Required. The webhook arguments payload in JSON format. The payload will be filtered according to the `fields` rules before being sent to the webhook endpoint. This emulates how the real arguments will be filtered in the generated plugin for the webhool.

### Example

For example, you have registered the next webhook:

```xml
    <method name="observer.checkout_cart_product_add_before" type="before">
        <hooks>
            <batch>
                <hook name="validate_stock" url="{env:APP_BUILDER_PROJECT_URL}/product-validate-stock" timeout="2000" softTimeout="200" fallbackErrorMessage="The product stock validation failed">
                    <fields>
                        <field name='product.name' source='data.product.name' />
                        <field name='product.sku' source='data.product.sku' />
                    </fields>
                </hook>
            </batch>
        </hooks>
    </method>
```

Instead of trying to add the product to the cart through the Adobe Commerce UI, you can run the next command with custom payload:

`bin/magento webhooks:dev:run observer.checkout_cart_product_add_before:before '{"data":{"product":{"sku":"simple-product","name":"Simple Product"}}}'`

The webhook endpoint will receive the next payload according to `fields` configured for the webhook:

```json
{"product":{"name":"Simple Product","sku":"simple-product"}}
```

In case of error or returning the exception operation you will see the appropriate information in the command output

```bash
Failed to process webhook "observer.checkout_cart_product_add_before". Or webhook endpoint returned exception operation. Error: Webhook Response: The product is out of stock
Check logs for more information.
```

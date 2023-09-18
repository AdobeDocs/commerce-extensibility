---
title: Webhooks commands
description: Provides details about the commands needed to use Adobe Commerce webhooks.
keywords:
  - Extensibility
---

# Webhooks commands

## Display the payload of a webhook

The `webhooks:info` command returns the payload of the specified webhook. You can optionally specify the depth of the payload to reduce the amount data returned.
### Usage

`bin/magento webhooks:info <webhook-name> [--webhook-type=`before` | `after`] [--depth=<integer>]`

### Arguments

`webhook-name` Required.

`--webhook-type` Optional.

### Options

`--depth=<integer>` Determines how many nested levels of the payload to return. The default value is `?`.

### Example

```bash

```

### Response

```terminal

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

The `webhooks:generate:module` command generates plugins based on webhook registrations and places it into the Commerce `app/code/Magento` directory.

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

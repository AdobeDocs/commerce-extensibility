---
title: Adobe Commerce Webhooks Overview
description: An architectural overview of Adobe Commerce Webhooks.
keywords:
  - Extensibility
---

# Adobe Commerce Webhooks Overview

## Run a single webhook before adding a product to the cart

This example checks an external service to determine whether there is sufficient product before the shopper adds the product to the cart. It creates a webhook on method `observer.checkout_cart_product_add_before`, which runs before the observer `checkout_cart_product_add_before`.

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_AdobeCommerceWebhooks:etc/webhooks.xsd">
    <method name="observer.checkout_cart_product_add_before" type="before">
        <hooks>
            <batch>
                <hook name="validate_stock" url="https://example.com/product-validate-stock" timeout="2000" softTimeout="200" required="true" fallbackErrorMessage="Can't add the product to the cart right now">
                    <headers>
                        <header name="custom-header-one">header value one</header>
                        <header name="custom-header-two">header value two</header>
                    </headers>
                    <fields>
                        <field name='product.name' source='data.product.name' />
                        <field name='product.category_ids' source='data.product.category_ids' />
                        <field name='product.sku' source='data.product.sku' />
                    </fields>
                </hook>
            </batch>
        </hooks>
    </method>
</config>
```

The `fields` configuration defines the payload, which is sent to the registered URL with added headers from the `headers` section.

**Example payload**:

```json
{
  "product": {
    "name": "simple product 1",
    "sku": "simple-product-1",
    "category_ids": [1, 2, 3]
  }
}
```

**Example headers**:

```php
[
    'custom-header-one' => 'header value one',
    'custom-header-two' => 'header value two',
]
```

The `class` and `message` are optional. If not set, a `LocalizedException` will be thrown with the `fallbackErrorMessage`, or a default message if `fallbackErrorMessage` is not set.

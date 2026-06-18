---
title: Product Stock Validation XML Configuration
description: XML configuration for the product stock validation webhook use case.
---

```xml
<method name="observer.sales_quote_item_save_before" type="before">
    <hooks>
        <batch name="quote_item_stock">
            <hook name="validate_stock" url="{env:APP_BUILDER_URL}/validate-stock" fallbackErrorMessage="The product stock cannot be validated" method="POST" timeout="5000" softTimeout="1000">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name="item.sku" source="data.item.sku" />
                    <field name="item.qty" source="data.item.qty" />
                    <field name="item.name" source="data.item.name" />
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

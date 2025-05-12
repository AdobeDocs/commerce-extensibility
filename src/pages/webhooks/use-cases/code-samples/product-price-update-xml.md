```xml
    <method name="observer.sales_quote_item_set_product" type="before">
        <hooks>
            <batch name="product_price_update">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <hook name="sales_quote_item_update_product" url="{env:APP_BUILDER_URL}/validate-product-name" method="POST" fallbackErrorMessage="The product name cannot be validated" timeout="5000" softTimeout="1000">
                    <fields>
                        <field name='product.name' source='data.product.name' />
                        <field name='product.sku' source='data.product.sku' />
                        <field name='product.price' source='data.product.price' />
                    </fields>
                </hook>
            </batch>
        </hooks>
    </method>
```

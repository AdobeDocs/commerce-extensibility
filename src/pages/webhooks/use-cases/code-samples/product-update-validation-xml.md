```xml
<method name="observer.catalog_product_save_after" type="before">
    <hooks>
        <batch name="product_update">
            <hook name="validate_name" url="{env:APP_BUILDER_URL}/validate-product-name" fallbackErrorMessage="The product name cannot be validated" method="POST" timeout="5000" softTimeout="1000">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name="product.name" source="data.product.name" />
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

```xml
<method name="plugin.magento.sales.api.order_management.place" type="before">
    <hooks>
        <batch name="order_validation" order="200">
            <hook name="validate_product_shipping_address" url="{env:APP_BUILDER_URL}/validate-order" priority="100">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name="order.items[].sku"/>
                    <field name="order.addresses"/>
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

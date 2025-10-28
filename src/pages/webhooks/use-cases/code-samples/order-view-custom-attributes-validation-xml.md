```xml
<method name="observer.sales_order_view_custom_attributes_update_before" type="before">
    <hooks>
        <batch name="order_validation" order="100">
            <hook name="order_custom_attributes_validation" url="{env:APP_BUILDER_URL}/validate-order-attributes" priority="100" fallbackErrorMessage="Could not validate the order's attributes" timeout="5000" softTimeout="1000" required="true" method="POST">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name="custom_attributes" source="data.custom_attributes" />
                    <field name="order" source="data.order" />
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

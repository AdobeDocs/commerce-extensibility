```xml
<method name="observer.sales_order_place_before" type="before">
    <hooks>
        <batch name="order_validation" order="100">
            <hook name="order_custom_attributes_validation" url="{env:APP_BUILDER_URL}/validate-order-attributes" priority="100" fallbackErrorMessage="Could not validate the order's attributes" softTimeout="1000" required="true" method="POST">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name="custom_attributes" source="data.order.custom_attributes_serializable" />
                    <field name="order" source="data.order" />
                </fields>
                <rules>
                    <rule field="context_application_state.get_area_code" operator="equal" value="adminhtml" />
                </rules>
            </hook>
        </batch>
    </hooks>
</method>
```

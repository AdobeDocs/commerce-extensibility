```xml
<method name="plugin.magento.customer.api.address_repository.save" type="before">
    <hooks>
        <batch name="update_address">
            <hook name="update_address" url="{env:APP_BUILDER_URL}/update-address"
method="POST" timeout="5000" softTimeout="1000" fallbackErrorMessage="The address can not be updated">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name="address" />
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

```xml
<method name="plugin.magento.quote.api.guest_coupon_management.set" type="before">
    <hooks>
        <batch name="add_coupon">
            <hook name="validate_discount_code" url="{env:APP_BUILDER_URL}/validate-discount-code" method="POST" timeout="5000" softTimeout="1000" priority="300" required="true" fallbackErrorMessage="The discount code cannot be validated">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name="discountCode.cartId" source="cartId" />
                    <field name="discountCode.couponCode" source="couponCode" />
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

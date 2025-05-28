```xml
<method name="plugin.magento.gift_card_account.api.gift_card_account_management.check_gift_card" type="after">
    <hooks>
        <batch name="check_gift_card">
            <hook name="get_balance" url="{env:APP_BUILDER_URL}/get-gift-card-balance" timeout="5000" softTimeout="1000" fallbackErrorMessage="Could not get the gift card balance" required="true">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name="giftCardCode"/>
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

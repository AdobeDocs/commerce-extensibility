```xml
<method name="plugin.magento.gift_card_account.api.gift_card_account_management.save_by_quote_id" type="before">
    <hooks>
        <batch name="apply_gift_card">
            <hook name="validate_gift_card" url="{env:APP_BUILDER_URL}/validate-gift-card" method="POST" timeout="5000" softTimeout="1000" required="true" fallbackErrorMessage="The gift card cannot be validated">
                <headers>
                    <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                    <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
                </headers>
                <fields>
                    <field name="giftCard.cartId" source="cartId" />
                    <field name="giftCard.gift_cards" source="giftCardAccountData.gift_cards" />
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

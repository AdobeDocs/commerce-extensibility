**General configuration**:

Field | Value
--- | ---
Webhook method | `plugin.gift_card_account.api.gift_card_account_management.save_by_quote_id`
Webhook type | `before`
Batch name | `apply_gift_card`
Hook name | `validate_gift_card`
URL | `{env:APP_BUILDER_URL}/validate-gift-card`
Timeout | `5000`
Soft timeout | `1000`
Fallback error message | `The gift card cannot be validated`
Required | **Required**
Active | **Yes**
Method | **POST**

**Hook Fields**:

Name | Source
--- | ---
`giftCard.cartId` | `cartId`
`giftCard.gift_cards` |`giftCardAccountData.gift_cards`

**Hook Headers**:

Name | Value
--- | ---
`x-gw-ims-org-id` | `{env:APP_BUILDER_IMS_ORG_ID}`
`Authorization` | `Bearer {env:APP_BUILDER_AUTH_TOKEN}`

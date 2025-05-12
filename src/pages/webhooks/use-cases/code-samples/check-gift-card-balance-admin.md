**General configuration**:

Field | Value
--- | ---
Webhook method | `plugin.gift_card_account.api.gift_card_account_management.check_gift_card`
Webhook type | `after`
Batch name | `check_gift_card`
Batch order | -
Hook name | `get_balance`
Hook priority | -
URL | `{env:APP_BUILDER_URL}/get-gift-card-balance"`
Timeout | `5000`
Soft timeout | `1000`
Cache TTL | -
Fallback error message | `Could not get the gift card balance`
Required | **Required**
Active | **Yes**
Method | **POST**

**Hook Fields**:

Name | Source
--- | ---
`giftCardCode` | `giftCardCode`

**Hook Headers**:

Name | Value
--- | ---
`x-gw-ims-org-id` | `{env:APP_BUILDER_IMS_ORG_ID}`
`Authorization` | `Bearer {env:APP_BUILDER_AUTH_TOKEN}`

**General configuration**:

Field | Value
--- | ---
Webhook method | `plugin.gift_card_account.api.gift_card_account_management.save_by_quote_id`
Webhook type | `before`
Batch name | `apply_gift_card`
Hook name | `validate_gift_card`
URL | `<Host>/validate-gift-card`
Timeout | `5000`
Soft timeout | `1000`
Fallback error message | `The gift card cannot be validated`
Required | **Required**
Active | **Yes**
Method | **POST**

**Developer Console OAuth**:

Field | Value
--- | ---
Client ID | The client ID for the OAuth credential.
Client Secret | The client secret for the OAuth credential.
Organization ID | The organization ID for the OAuth credential.

**Hook Fields**:

Name | Source
--- | ---
`giftCard.cartId` | `cartId`
`giftCard.gift_cards` |`giftCardAccountData.gift_cards`

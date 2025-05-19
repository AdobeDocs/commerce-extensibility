```yaml
Hook Settings

Webhook method: plugin.gift_card_account.api.gift_card_account_management.check_gift_card
Webhook type: after
Batch name: check_gift_card
Hook name: get_balance
URL: <Host>/get-gift-card-balance
Timeout: 5000
Soft timeout: 1000
Fallback Error Message: Could not get the gift card balance
Required: Required
Active: Yes
Method: POST

Developer Console OAuth

Client ID: The client ID for the OAuth credential.
Client Secret: The client secret for the OAuth credential.
Organization ID: The organization ID for the OAuth credential.

Hook Fields

Name: giftCardCode
Source: giftCardCode
Active: Yes
```

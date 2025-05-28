```yaml
Hook Settings

Webhook method: plugin.quote.api.guest_coupon_management.set
Webhook type: before
Batch name: add_coupon
Hook name: validate_discount_code
Hook priority: 300
URL: {env:APP_BUILDER_URL}/validate-discount-code
Timeout: 5000
Soft timeout: 1000
Fallback Error Message: The discount code cannot be validated
Required: Required
Active: Yes
Method: POST

Developer Console OAuth

Client ID: The client ID for the OAuth credential.
Client Secret: The client secret for the OAuth credential.
Organization ID: The organization ID for the OAuth credential.

Hook Fields

Name: discountCode.cartId
Source: cartId
Active: Yes

Name: discountCode.couponCode 
Source: couponCode
Active: Yes

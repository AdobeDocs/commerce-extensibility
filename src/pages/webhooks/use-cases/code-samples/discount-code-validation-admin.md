**General configuration**:

Field | Value
--- | ---
Webhook method | `plugin.quote.api.guest_coupon_management.set`
Webhook type | `before`
Batch name | `add_coupon`
Hook name | `validate_discount_code`
Hook priority | `300`
URL | `{env:APP_BUILDER_URL}/validate-discount-code`
Timeout | `5000`
Soft timeout | `1000`
Fallback error message | `The discount code can not be validated`
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
`discountCode.cartId` | `cartId`
`discountCode.couponCode` |`couponCode`

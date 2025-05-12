**General configuration**:

Field | Value
--- | ---
Webhook method | `plugin.quote.api.guest_coupon_management.set`
Webhook type | `before`
Batch name | `add_coupon`
Batch order | -
Hook name | `validate_discount_code`
Hook priority | `300`
URL | `{env:APP_BUILDER_URL}/validate-discount-code`
Timeout | `5000`
Soft timeout | `1000`
Cache TTL | -
Fallback error message | `The discount code can not be validated`
Required | **Required**
Active | **Yes**
Method | **POST**

**Hook Fields**:

Name | Source
--- | ---
`discountCode.cartId` | `cartId`
`discountCode.couponCode` |`couponCode`

**Hook Headers**:

Name | Value
--- | ---
`x-gw-ims-org-id` | `{env:APP_BUILDER_IMS_ORG_ID}`
`Authorization` | `Bearer {env:APP_BUILDER_AUTH_TOKEN}`

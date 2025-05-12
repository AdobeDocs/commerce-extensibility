**General configuration**:

Field | Value
--- | ---
Webhook method | `observer.checkout_cart_product_add_before`
Webhook type | `before`
Batch name | `validate_stock`
Hook name | `validate_stock`
Hook priority | 100
URL | `{env:APP_BUILDER_URL}/product-validate-stock`
Timeout | `5000`
Soft timeout | `1000`
Fallback error message | `The product stock validation failed`
Required | **Required**
Active | **Yes**
Method | **POST**

**Hook Fields**:

Name | Source
--- | ---
`product.name` | `data.product.name`
`product.category_ids` | `data.product.category_ids`
`product.sku` | `data.product.sku`

**Hook Headers**:

Name | Value
--- | ---
`x-gw-ims-org-id` | `{env:APP_BUILDER_IMS_ORG_ID}`
`Authorization` | `Bearer {env:APP_BUILDER_AUTH_TOKEN}`

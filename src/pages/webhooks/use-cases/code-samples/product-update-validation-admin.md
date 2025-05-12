**General configuration**:

Field | Value
--- | ---
Webhook method | `observer.catalog_product_save_after`
Webhook type | `after`
Batch name | `product_update`
Batch order | -
Hook name | `validate_name`
Hook priority | -
URL | `{env:APP_BUILDER_URL}/validate-product-name`
Timeout | `5000`
Soft timeout | `1000`
Cache TTL | -
Fallback error message | -
Required | **Required**
Active | **Yes**
Method | **POST**

**Hook Fields**:

Name | Source
--- | ---
`product.name` | `data.product.name`

**Hook Headers**:

Name | Value
--- | ---
`x-gw-ims-org-id` | `{env:APP_BUILDER_IMS_ORG_ID}`
`Authorization` | `Bearer {env:APP_BUILDER_AUTH_TOKEN}`

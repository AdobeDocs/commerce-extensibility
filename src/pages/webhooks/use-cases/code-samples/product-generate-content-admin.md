**General configuration**:

Field | Value
--- | ---
Webhook method | `observer.catalog_product_save_before`
Webhook type | `before`
Batch name | `product_generate_content`
Hook name | `product_generate_content`
URL | `{env:APP_BUILDER_URL}/product-description`
Timeout | 1000
Soft timeout | 5000
Fallback error message | `The product could not be updated`
Required | **Required**
Active | **Yes**
Method | **POST**

**Hook Fields**:

Name | Source
--- | ---
`product.name` | `data.product.name`
`product.sku` | `data.product.sku`

**Hook Headers**:

Name | Value
--- | ---
`x-gw-ims-org-id` | `{env:APP_BUILDER_IMS_ORG_ID}`
`Authorization` | `Bearer {env:APP_BUILDER_AUTH_TOKEN}`

**Hook Rules**:

Name | Operator
--- | ---
`product.short_description` | `isEmpty`
`product.description` | `isEmpty`

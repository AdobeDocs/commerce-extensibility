**General configuration**:

Field | Value
--- | ---
Webhook method | `observer.sales_quote_item_set_product`
Webhook type | `before`
Batch name | `product_price_update`
Hook name | `sales_quote_item_update_product`
URL | `{env:APP_BUILDER_URL}/validate-product-name`
Timeout | `5000`
Soft timeout | `1000`
Fallback error message | `The product name cannot be validated`
Required | **Required**
Active | **Yes**
Method | **POST**

**Hook Fields**:

Name | Source
--- | ---
`product.name` | `data.product.name`
`product.sku` | `data.product.sku`
`product.price` | `data.product.price`

**Hook Headers**:

Name | Value
--- | ---
`x-gw-ims-org-id` | `{env:APP_BUILDER_IMS_ORG_ID}`
`Authorization` | `Bearer {env:APP_BUILDER_AUTH_TOKEN}`

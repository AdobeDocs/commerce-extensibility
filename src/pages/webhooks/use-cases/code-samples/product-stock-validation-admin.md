**General configuration**:

Field | Value
--- | ---
Webhook method | `observer.checkout_cart_product_add_before`
Webhook type | `before`
Batch name | `validate_stock`
Batch order | -
Hook name | `validate_stock`
Hook priority | 100
URL | `{env:APP_BUILDER_URL}/product-validate-stock`
Timeout | `5000`
Soft timeout | `100`
Cache TTL | -
Fallback error message | -
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
`resolver` | `Magento\WebhookModule\Model\AddProductToCartResolver`

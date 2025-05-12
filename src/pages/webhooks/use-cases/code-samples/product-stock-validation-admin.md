**General configuration**:

Field | Value
--- | ---
Webhook method | `observer.checkout_cart_product_add_before`
Webhook type | `before`
Batch name | `validate_stock`
Hook name | `validate_stock`
Hook priority | 100
URL | `<Host>/product-validate-stock`
Timeout | `5000`
Soft timeout | `1000`
Fallback error message | `The product stock validation failed`
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
`product.name` | `data.product.name`
`product.category_ids` | `data.product.category_ids`
`product.sku` | `data.product.sku`

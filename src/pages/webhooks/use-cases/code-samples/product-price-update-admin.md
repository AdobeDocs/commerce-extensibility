**General configuration**:

Field | Value
--- | ---
Webhook method | `observer.sales_quote_item_set_product`
Webhook type | `before`
Batch name | `product_price_update`
Hook name | `sales_quote_item_update_product`
URL | `<Host>/validate-product-name`
Timeout | `5000`
Soft timeout | `1000`
Fallback error message | `The product name cannot be validated`
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
`product.sku` | `data.product.sku`
`product.price` | `data.product.price`

**General configuration**:

Field | Value
--- | ---
Webhook method | `observer.catalog_product_save_before`
Webhook type | `before`
Batch name | `product_generate_content`
Hook name | `product_generate_content`
URL | `<Host>/product-description`
Timeout | 1000
Soft timeout | 5000
Fallback error message | `The product could not be updated`
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

**Hook Rules**:

Name | Operator
--- | ---
`product.short_description` | `isEmpty`
`product.description` | `isEmpty`

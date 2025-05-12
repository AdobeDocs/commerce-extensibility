**General configuration**:

Field | Value
--- | ---
Webhook method | `observer.catalog_product_save_after`
Webhook type | `after`
Batch name | `product_update`
Hook name | `validate_name`
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

```yaml
Webhook method: observer.catalog_product_save_before
Webhook type: before
Batch name: product_generate_content
Hook name: product_generate_content
URL: <Host>/product-description
Timeout: 1000
Soft timeout: 5000
Fallback Error Message: The product could not be updated
Required: Required
Active: Yes
Method: POST

Developer Console OAuth

Client ID: The client ID for the OAuth credential.
Client Secret: The client secret for the OAuth credential.
Organization ID: The organization ID for the OAuth credential.

Hook Fields

Name: product.name
Source: data.product.name
Active: Yes

Name: product.sku
Source: data.product.sku
Active: Yes

Hook Rules

Name: product.short_description
Operator: isEmpty
Active: Yes

Name: product.description
Operator: isEmpty
Active: Yes
```

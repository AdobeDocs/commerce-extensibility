```yaml
Hook Settings

Webhook method: observer.checkout_cart_product_add_before
Webhook type: before
Batch name: validate_stock
Hook name: validate_stock
Hook priority: 100
URL: <Host>/product-validate-stock
Timeout: 5000
Soft timeout: 1000
Fallback Error Message: The product stock validation failed
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

Name: product.category_ids
Source: data.product.category_ids
Active: Yes

Name: product.sku
Source: data.product.sku
Active: Yes
```

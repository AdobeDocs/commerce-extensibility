```yaml
Hook Settings

Webhook method: observer.sales_quote_item_set_product
Webhook type: before
Batch name: product_price_update
Hook name: sales_quote_item_update_product
URL: <Host>/change-product-price
Timeout: 5000
Soft timeout: 1000
Fallback Error Message: The product price cannot be updated
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

Name: product.price
Source: data.product.price
Active: Yes
```

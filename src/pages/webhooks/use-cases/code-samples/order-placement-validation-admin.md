```yaml
Hook Settings

Webhook method: plugin.sales.api.order_management.place
Webhook type: before
Batch name: order_validation
Batch order: 200
Hook name: validate_product_shipping_address
Hook priority: 100
URL: <Host>/validate-order
Timeout: 5000
Soft timeout: 1000
Fallback Error Message: Could not validate the shipping address
Required: Required
Active: Yes
Method: POST

Developer Console OAuth

Client ID: The client ID for the OAuth credential.
Client Secret: The client secret for the OAuth credential.
Organization ID: The organization ID for the OAuth credential.

Hook Fields

Name: order.items[].sku
Source: order.items[].sku
Active: Yes

Name: order.addresses
Source: order.addresses
Active: Yes
```

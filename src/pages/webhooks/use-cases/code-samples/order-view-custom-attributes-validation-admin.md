```yaml
Hook Settings

Webhook method: observer.sales_order_view_custom_attributes_update_before
Webhook type: before
Batch name: order_validation
Batch order: 100
Hook name: order_custom_attributes_validation
Hook priority: 100
URL: <Host>/validate-order-attributes
Timeout: 5000
Soft timeout: 1000
Fallback Error Message: Could not validate the order's attributes
Required: Required
Active: Yes
Method: POST

Developer Console OAuth

Client ID: The client ID for the OAuth credential.
Client Secret: The client secret for the OAuth credential.
Organization ID: The organization ID for the OAuth credential.

Hook Fields

Name: custom_attributes
Source: data.custom_attributes
Active: Yes

Name: order
Source: data.order
Active: Yes
```

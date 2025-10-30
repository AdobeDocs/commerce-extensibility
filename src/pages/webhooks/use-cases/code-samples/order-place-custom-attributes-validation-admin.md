```yaml
Hook Settings

Webhook method: observer.sales_order_place_before
Webhook type: before
Batch name: order_validation
Batch order: 100
Hook name: order_custom_attributes_validation
Hook priority: 100
URL: <Host>/validate-order-attributes
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
Source: data.order.custom_attributes_serializable
Active: Yes

Name: order
Source: data.order
Active: Yes

Hook Rules

Field: context_application_state.get_area_code
Value: adminhtml
Operator: equal
Active: Yes
```

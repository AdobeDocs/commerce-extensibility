**General configuration**:

Field | Value
--- | ---
Webhook method | `plugin.sales.api.order_management.place`
Webhook type | `before`
Batch name | `order_validation`
Batch order | 200
Hook name | `validate_product_shipping_address`
Hook priority | 100
URL | `{env:APP_BUILDER_URL}/validate-order`
Timeout | -
Soft timeout | -
Cache TTL | -
Fallback error message | -
Required | **Required**
Active | **Yes**
Method | **POST**

**Hook Fields**:

Name | Source
--- | ---
`order.items[].sku` | `order.items[].sku`
`order.addresses` |`order.addresses`

**Hook Headers**:

Name | Value
--- | ---
`x-gw-ims-org-id` | `{env:APP_BUILDER_IMS_ORG_ID}`
`Authorization` | `Bearer {env:APP_BUILDER_AUTH_TOKEN}`

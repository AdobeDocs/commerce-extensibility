**General configuration**:

Field | Value
--- | ---
Webhook method | `plugin.magento.customer.api.address_repository.save`
Webhook type | `before`
Batch name | `update_address`
Batch order | -
Hook name | `update_address`
Hook priority | -
URL | `{env:APP_BUILDER_URL}/update-address`
Timeout | `5000`
Soft timeout | `1000`
Cache TTL | -
Fallback error message | `The address cannot be updated`
Required | **Required**
Active | **Yes**
Method | **POST**

**Hook Fields**:

Name | Source
--- | ---
`address` | `address`

**Hook Headers**:

Name | Value
--- | ---
`x-gw-ims-org-id` | `{env:APP_BUILDER_IMS_ORG_ID}`
`Authorization` | `Bearer {env:APP_BUILDER_AUTH_TOKEN}`

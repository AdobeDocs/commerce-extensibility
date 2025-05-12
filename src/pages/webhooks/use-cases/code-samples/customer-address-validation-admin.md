**General configuration**:

Field | Value
--- | ---
Webhook method | `plugin.customer.api.address_repository.save`
Webhook type | `before`
Batch name | `save_address`
Hook name | `validate_address`
URL | `{env:APP_BUILDER_URL}/validate-address`
Timeout | `5000`
Soft timeout | `1000`
Fallback error message | `The address cannot be validated`
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

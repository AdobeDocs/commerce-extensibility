**General configuration**:

Field | Value
--- | ---
Webhook method | `plugin.magento.customer.api.address_repository.save`
Webhook type | `before`
Batch name | `update_address`
Hook name | `update_address`
URL | `<Host>/update-address`
Timeout | `5000`
Soft timeout | `1000`
Fallback error message | `The address cannot be updated`
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
`address` | `address`

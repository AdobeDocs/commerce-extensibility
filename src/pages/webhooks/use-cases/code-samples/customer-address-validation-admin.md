```yaml
Hook Settings

Webhook method: plugin.customer.api.address_repository.save
Webhook type: before
Batch name: save_address
Hook name: validate_address
URL: <Host>/validate-address
Timeout: 5000
Soft timeout: 1000
Fallback Error Message: The address cannot be validated
Required: `true`
Active: `true`
Method: `POST`

Developer Console OAuth

Client ID: The client ID for the OAuth credential.
Client Secret: The client secret for the OAuth credential.
Organization ID: The organization ID for the OAuth credential.

Hook Fields

Name: address
Source: address
Active: Yes
```

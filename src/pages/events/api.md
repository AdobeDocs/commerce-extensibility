---
title: Event API Endpoints
description: Provides details about the eventing API endpoints.
keywords:
  - Events
  - Extensibility
---

# Eventing API endpoints

## Configure commerce eventing

You can configure commerce eventing with sending `PUT` request to `/V1/eventing/updateConfiguration`. User role must have access to the ACL resource `Magento_AdobeIoEventsClient::configuration_update`.

```json
{
  "config": {
    "enabled": true,
    "merchant_id": "string",
    "environment_id": "string",
    "provider_id": "string",
    "instance_id": "string",
    "workspace_configuration": "string"
  }
}
```

Example of CURL command:

```bash
curl -i -X PUT \
   -H "Content-Type:application/json" \
   -H "Authorization:Bearer <AUTH_TOKEN>" \
   -d \
'{
  "config": {
    "enabled": 1,
    "merchant_id":  "test_merchant",
    "environment_id":  "test_environment",
    "instance_id":  "my_instance_id",
    "provider_id":  "1902bc50-12345-41e8-955b-af4a9667823f",
    "workspace_configuration": "{\"project\":{\"id\":\"12324124123123\",\"name\":\"884CoralMockingbird\",\"title\":\"Test Project\",\"org\":{\"id\":\"123455\",\"name\":\"my-org-name\",\"ims_org_id\":\"12321423414134@AdobeOrg\"},\"workspace\":{\"id\":\"123455\",\"name\":\"Stage\",\"title\":\"Stage\",\"action_url\":\"https://custom-url-stage.adobeioruntime.net\",\"app_url\":\"https://custom-url-stage.adobeio-static.net\",\"details\":{\"credentials\":[{\"id\":\"581153\",\"name\":\"Credential in Beta3php83test - Stage\",\"integration_type\":\"oauth_server_to_server\",\"oauth_server_to_server\":{\"client_id\":\"xxxxxxx\",\"client_secrets\":[\"p8e-xxxxx-xxx\"],\"technical_account_email\":\"xxxxx@techacct.adobe.com\",\"technical_account_id\":\"xxxxx@techacct.adobe.com\",\"scopes\":[\"AdobeID\",\"openid\",\"read_organizations\",\"additional_info.projectedProductContext\",\"additional_info.roles\",\"adobeio_api\",\"read_client_secret\",\"manage_client_secrets\"]}}],\"services\":[{\"code\":\"AdobeIOManagementAPISDK\",\"name\":\"I/O Management API\"},{\"code\":\"commerceeventing\",\"name\":\"Adobe I/O Events for Adobe Commerce\"}],\"runtime\":{\"namespaces\":[{\"name\":\"1339710-884coralmockingbird-stage\",\"auth\":\"xxxxxxxxxxx\"}]},\"events\":{\"registrations\":[]},\"mesh\":{}}}}}"
  }
}' \
 '<ADOBE_COMMERCE_URL>/rest/all/V1/eventing/updateConfiguration'
 ```

How to generate the admin token https://developer.adobe.com/commerce/webapi/rest/tutorials/prerequisite-tasks/

## Subscribing to events

To subscribe to the event via API you can send a `POST` request to `/V1/eventing/eventSubscribe`.  User role must have access to the ACL resource `Magento_AdobeIoEventsClient::event_subscribe`.

The example of request body:

```json
{
  "event": {
    "name": "string",
    "parent": "string",
    "fields": [
      {
        "name": "string",
        "converter": "string"
      }
    ],
    "rules": [
      {
        "field": "string",
        "operator": "string",
        "value": "string"
      }
    ],
    "destination": "string",
    "priority": true
  },
  "force": true
}
```

Example of CURL command for subscribing to the event `observer.catalog_category_save_after` with fields `name` and `entity_id` and setting this event as a priority:

```bash
curl -i -X PUT \
   -H "Content-Type:application/json" \
   -H "Authorization:Bearer <AUTH_TOKEN>" \
   -d \
'{
  "event": {
    "name": "observer.catalog_category_save_after",
    "fields": [
      {
        "name": "name"
      },
      {
        "name": "entity_id"
      }
    ],
    "priority": true
  }
}' \
 '<ADOBE_COMMERCE_URL>/rest/all/V1/eventing/eventSubscribe'
```

**Warning** Keep in mind that after subscribing to `plugin-type` events the module with event plugins must be generated manually [events:generate:module](commands.md#generate-a-commerce-module-based-on-a-list-of-subscribed-events)

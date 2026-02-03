---
title: REST Endpoints for Eventing
description: Provides details about the eventing API endpoints.
keywords:
  - Events
  - Extensibility
---

# REST endpoints for eventing

Adobe Commerce provides several REST endpoints that interact with the eventing processes. These endpoints require an [admin token](https://developer.adobe.com/commerce/webapi/rest/tutorials/prerequisite-tasks/).

## Subscribe to events

The `POST /rest/<store_view_code>/V1/eventing/eventSubscribe` endpoint subscribes the event defined in the payload. The request body has the following format:

```json
{
  "event": {
    "name": "string",
    "parent": "string",
    "fields": [
      {
        "name": "string",
        "converter": "string",
        "source": "string"
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
    "priority": true,
    "hipaa_audit_required": true,
    "provider_id": "string"
  },
  "force": true
}
```

<InlineAlert variant="info" slots="text" />

After you subscribe to a `plugin-type` event, you must manually generate the module that defines the event plugins with the [events:generate:module](commands.md#generate-a-commerce-module-based-on-a-list-of-subscribed-events) command.

**Headers:**

`Content-Type: application/json`
`Authorization: Bearer <administrator token>`

The administrator must be granted access to the `Magento_AdobeCommerceEventsClient::event_subscribe` resource.

**Payload Parameters:**

Review the [`events:subscribe` command](./commands.md#subscribe-to-an-event) to understand the possible values for each item in the request body payload.

**Example usage:**

The following cURL command subscribes to the `observer.catalog_category_save_after` event. The event contains the `name`, `entity_id`, and `context.store_id` fields. The priority setting expedites the transmission of this event.

The `context.store_id` field uses a source to retrieve the store ID from the [context of the application](./context-fields.md).

```bash
curl -i -X POST \
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
      },
      {
        "name": "context.store_id",
        "source": "context_store.get_store.get_id"
      }
    ],
    "priority": true
  }
}' \
 '<ADOBE_COMMERCE_URL>/rest/all/V1/eventing/eventSubscribe'
```

## Unsubscribe from events

The `POST /rest/<store_view_code>/V1/eventing/eventUnsubscribe/<event_name>` endpoint unsubscribes from the specified event.

**Header:**

`Authorization: Bearer <administrator token>`

The administrator must be granted access to the `Magento_AdobeCommerceEventsClient::event_unsubscribe` resource.

**Example usage:**

The following cURL command unsubscribes from the `observer.catalog_category_save_after` event.

```bash
curl -i -X POST \
   -H "Authorization:Bearer <AUTH_TOKEN>" \
 '<ADOBE_COMMERCE_URL>/rest/all/V1/eventing/eventUnsubscribe/observer.catalog_category_save_after'
```

## Get a list of all subscribed events

The `GET /rest/all/V1/eventing/getEventSubscriptions` endpoint returns a list of all subscribed events that are enabled. The response body is similar to the following:

```json
[{
  "name": "observer.catalog_product_save_after.price_check",
  "parent": "observer.catalog_product_save_after",
  "fields": [
    {
      "name": "name",
      "converter": "Magento\\CustomModule\\Model\\TestConverter"
    },
    {
      "name": "price"
    },
    {
      "name": "sku"
    },
    {
      "name": "context.store_id",
      "source": "context_store.get_store.get_id"
    }
  ],
  "rules": [
    {
      "field": "price",
      "operator": "lessThan",
      "value": "300.00"
    }
  ],
  "destination": "default",
  "priority": false,
  "hipaa_audit_required": false,
  "provider_id": "1902bc50-12345-41e8-955b-af4a9667823f"
}]
```

The administrator must be granted access to the `Magento_AdobeCommerceEventsClient::event_subscriptions` resource.

**Example usage:**

The following cURL command returns returns a list of all subscribed events that are enabled.

```bash
curl --request GET \
   --url <ADOBE_COMMERCE_URL>/rest/all/V1/eventing/getEventSubscriptions \
   --header 'Authorization: Bearer <TOKEN>'
```

## Update event subscriptions

The `PUT /rest/<store_view_code>/V1/eventing/eventSubscribe/<event_name>` endpoint updates an existing subscription to the specified event. The request body has the following format:

```json
{
  "event": {
    "parent": "string",
    "fields": [
      {
        "name": "string",
        "converter": "string",
        "source": "string"
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
    "priority": true,
    "hipaa_audit_required": true,
    "provider_id": "string"
  }
}
```

Field and rule configurations provided in the request body are merged with the existing field and rule configurations set for the event subscription.

**Headers:**

`Content-Type: application/json`
`Authorization: Bearer <administrator token>`

The administrator must be granted access to the `Magento_AdobeCommerceEventsClient::event_subscribe` resource.

**Payload Parameters:**

Review the [`events:subscribe` command](./commands.md#subscribe-to-an-event) to understand the possible values for each item in the request body payload.

**Example usage:**

The following cURL command updates an `observer.catalog_category_save_after` event subscription. This update adds the `parent_id` field to the existing list of subscribed fields and sets standard priority for the event.

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
        "name": "parent_id"
      }
    ],
    "priority": false
  }
}' \
 '<ADOBE_COMMERCE_URL>/rest/all/V1/eventing/eventSubscribe/observer.catalog_category_save_after'
```

## Configure Commerce eventing

The `PUT /rest/<store_view_code>/V1/eventing/updateConfiguration` endpoint updates the Adobe I/O [eventing configuration](configure-commerce.md) originally defined on the **Stores** > Settings > **Configuration** > **Adobe Services** > **Adobe I/O Events** > **General configuration** page of the Admin.

The request body has the following format:

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

**Headers:**

`Content-Type: application/json`
`Authorization: Bearer <administrator token>`

The administrator must be granted access to the `Magento_AdobeIoEventsClient::configuration_update` resource.

**Payload Parameters:**

All parameters are optional.

Name | Format | Description
--- | --- | ---
`enabled` | boolean | A `true` value indicates eventing is enabled.
`merchant_id` | string | The merchant's company name. The value can contain alphanumeric characters and underscores only.
`environment_id` | string | A label for your environment. The value can contain alphanumeric characters and underscores only.
`provider_id` | string | An event provider ID generated by the [`bin/magento events:create-event-provider` command](./commands.md#create-an-event-provider).
`instance_id` | string | A unique identifier. This value can contain English alphanumeric characters, underscores (_), and hyphens (-) only.
`workspace_configuration` | string | The contents of the workspace configuration file downloaded from the Adobe Developer Console.

**Example usage:**

The following cURL command updates the eventing configuration:

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

## Event provider management

The event provider management endpoints allow you to create, update, and delete event providers. The event provider must be created in the Adobe Developer Console before registering it in Adobe Commerce.

### Create an event provider

The `POST /rest/<store_view_code>/V1/eventing/eventProvider` endpoint registers a new event provider in an Adobe Commerce instance. The event provider must be created in the Adobe Developer Console before it can be registered in Adobe Commerce.

**Headers:**

`Authorization: Bearer <administrator token>`

The administrator must be granted access to the `Magento_AdobeIoEventsClient::event_provider_edit` resource.

**Payload Parameters:**

Name | Format | Required | Description
--- |--------| --- | ---
`provider_id` | string | required | The event provider ID.
`instance_id` | string | required | The instance ID of event provider.
`label` | string | optional | A label of the event provider.
`description` | string | optional | A description of the event provider.
`workspace_configuration` | string | optional | The contents of the workspace configuration file downloaded from the Adobe Developer Console associated with the event provider.

**Example usage:**

The following cURL command registers a new event provider:

```bash
curl -i -X POST \
   -H "Content-Type:application/json" \
   -H "Authorization:Bearer <AUTH_TOKEN>" \
   -d \
'{
  "eventProvider": {
    "provider_id": "1902bc50-12345-41e8-955b-af4a9667823f",
    "instance_id": "my_instance_id",
    "label": "My provider",
    "description": "Additional event provider",
    "workspace_configuration": "{<WORKSPACE_CONFIGURATION_FROM_ADOBE_DEVELOPER_CONSOLE>}"
  }
}' \
 '<ADOBE_COMMERCE_URL>/rest/all/V1/eventing/eventProvider'
 ```

**Example response:**

```json
{
    "id": "3",
    "provider_id": "1902bc50-12345-41e8-955b-af4a9667823f",
    "instance_id": "my_instance_id",
    "label": "My provider",
    "description": "Additional event provider",
    "workspace_configuration": "****"
  }
```

### Update an event provider

The `PUT /rest/<store_view_code>/V1/eventing/eventProvider/<provider_id>` endpoint updates the event provider with the specified ID. The request body has the same format as the `POST` request except that `id` must be provided.

**Headers:**

`Authorization: Bearer <administrator token>`

The administrator must be granted access to the `Magento_AdobeIoEventsClient::event_provider_edit` resource.

**Payload Parameters:**

Name | Format | Required | Description
--- |--------| --- | ---
`id` | integer | required | The ID assigned to the registered event provider.
`provider_id` | string | required | The event provider ID.
`instance_id` | string | required | The instance ID of event provider.
`label` | string | optional | A label of the event provider.
`description` | string | optional | A description of the event provider.
`workspace_configuration` | string | optional | The contents of the workspace configuration file downloaded from the Adobe Developer Console associated with the event provider.

**Example usage:**

The following cURL command updates an event provider:

```bash
curl -i -X PUT \
   -H "Content-Type:application/json" \
   -H "Authorization:Bearer <AUTH_TOKEN>" \
   -d \
'{
  "eventProvider": {
    "id": "3",
    "provider_id": "1902bc50-12345-41e8-955b-af4a9667823f",
    "instance_id": "my_instance_id",
    "label": "My Updated provider",
    "description": "Updated description of additional event provider"
  }
}' \
 '<ADOBE_COMMERCE_URL>/rest/all/V1/eventing/eventProvider'
 ```

**Example response:**

```json
{
    "id": "3",
    "provider_id": "1902bc50-12345-41e8-955b-af4a9667823f",
    "instance_id": "my_instance_id",
    "label": "My Updated provider",
    "description": "Updated description of additional event provider",
    "workspace_configuration": "****"
  }
```

### Delete event provider

The `DELETE /rest/<store_view_code>/V1/eventing/eventProvider/<provider_id>` endpoint deletes the event provider with the specified ID from the Adobe Commerce instance. The event provider is not removed from the Adobe Developer Console.

To delete an event provider, you must first delete all event subscriptions that use this provider. An event provider cannot be deleted if it is used in any event subscriptions.

**Headers:**

`Authorization: Bearer <administrator token>`

The administrator must be granted access to the `Magento_AdobeIoEventsClient::event_provider_delete` resource.

**Example usage:**

The following cURL command deletes an event provider:

```bash
curl -i -X DELETE \
-H "Authorization:Bearer <AUTH_TOKEN>" \
'<ADOBE_COMMERCE_URL>/rest/all/V1/eventing/eventProvider/1902bc50-12345-41e8-955b-af4a9667823f'
 ```

The response will return a 200 status code if the event provider was deleted successfully. If the provider ID is not found, an appropriate error is returned.

### Get list of all event providers

The `GET /rest/<store_view_code>/V1/eventing/eventProvider` endpoint returns a list of all event providers configured for the Commerce instance.

**Headers:**

`Authorization: Bearer <administrator token>`

The administrator must be granted access to the `Magento_AdobeIoEventsClient::event_provider_list` resource.

**Example usage:**

The following cURL command retrieves information about all configured event providers:

```bash
curl -H "Authorization:Bearer <AUTH_TOKEN>" \
'<ADOBE_COMMERCE_URL>/rest/all/V1/eventing/eventProvider'
```

**Example response:**

```json
[
  {
    "provider_id": "ad667bc6-1678-49ff-99fc-215d71ebf82f",
    "instance_id": "my_instance",
    "label": "my_provider",
    "description": "Provides out-of-process extensibility for Adobe Commerce",
    "workspace_configuration": "******"
  },
  {
    "provider_id": "1902bc50-12345-41e8-955b-af4a9667823f",
    "instance_id": "my_instance_id",
    "label": "my_provider_2",
    "description": "Additional event provider",
    "workspace_configuration": "******"
  }
]
```

### Get event provider by ID

The `GET /rest/<store_view_code>/V1/eventing/eventProvider/<provider_id>` endpoint returns the event provider with the specified ID. If the provider ID is not found, a 404 error is returned.

**Headers:**

`Authorization: Bearer <administrator token>`

The administrator must be granted access to the `Magento_AdobeIoEventsClient::event_provider_list` resource.

The following cURL command retrieves information about the configured event provider:

```bash
curl -H "Authorization:Bearer <AUTH_TOKEN>" \
'<ADOBE_COMMERCE_URL>/rest/all/V1/eventing/eventProvider/1902bc50-12345-41e8-955b-af4a9667823f'
```

**Example response:**

```json
{
  "id": "3",
  "provider_id": "1902bc50-12345-41e8-955b-af4a9667823f",
  "instance_id": "my_instance_id",
  "label": "my_provider_2",
  "description": "Additional event provider",
  "workspace_configuration": "******"
}
```

## Get supported events for SaaS

<Edition name="saas" />

The `GET /V1/eventing/supportedList` endpoint returns the events supported in Adobe Commerce as a Cloud Service (SaaS). The response body is similar to the following:

```json
[
    {
        "name": "observer.customer_login"
    },
    {
        "name": "observer.customer_register_success"
    },
    {
        "name": "observer.customer_save_after"
    },
  ...
]
```

The access token used in the request must have access to the `Eventing Framework > Event List` resource. See [REST authentication](https://developer.adobe.com/commerce/services/cloud/guides/rest/authentication/) for information on authentication for SaaS.

**Example usage:**

The following cURL command returns a list of all suported events in SaaS.

```bash
curl --request GET \
   --url <ADOBE_COMMERCE_SAAS_REST_ENDPOINT>/V1/eventing/supportedList \
   --header 'Authorization: Bearer <TOKEN>'
```

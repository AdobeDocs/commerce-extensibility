---
title: Set up event providers and metadata in Adobe Commerce
description: Learn how to set up your Adobe Commerce instance as an event provider and create event metadata for asynchronous events.
keywords:
  - Extensibility
  - Events
---

# Set up event providers and metadata in Adobe Commerce

The workflow to create an event provider and event metadata in Adobe Commerce involves both the Adobe I/O Event Provider API and the Adobe Commerce Admin. The general steps are as follows:

1. Use the Adobe Event Provider API to create an Adobe I/O event provider and event metadata. Inputs such as the label, description, and instance ID are provided during this step.

1. Take note of the provider ID from the response for future use.

1. Using these details, a corresponding event provider is then created in the Adobe Commerce Admin. The instanceId input from the API request is used here to establish the link between Adobe Commerce and Adobe I/O Events.

1. The configured provider is finally registered in the Adobe Developer Console during event registration for the App Builder project.

## Set up event providers

This section covers creating and configuring an **Event Provider** in Adobe Commerce and registering it with the Adobe Developer Console, as well as creating **Event Metadata** for specific events.

### Parameters and authentication for Adobe I/O Events API

These parameters are used for **both** event provider creation and event metadata creation. Values are obtained from the App Builder project's configuration JSON file, which can be downloaded from the Adobe Developer Console:

1. Go to [Adobe Developer Console](https://developer.adobe.com/console).  
1. Select your project.  
1. Choose the desired environment (Stage or Prod).  
1. Click **Download All** to get the configuration JSON file.  

### Path parameters (common)

The following path parameters are required for both event provider and event metadata API calls:

| Parameter       | JSON Field             | Purpose |
|-----------------|------------------------|---------|
| `workspaceId`   | `project.workspace.id` | The ID of the environment workspace where you are creating the provider and metadata. |
| `projectId`     | `project.id`           | The ID of the App Builder project. |
| `consumerOrgId` | `project.org.id`       | The organization ID for your Adobe account. |

### Additional path parameter for Event Metadata creation

| Parameter     | Source | Purpose |
|---------------|--------|---------|
| `providerId`  | From Event Provider API response (`id` field) | The ID of the event provider for which you are creating metadata. |

### Header parameters (common)

| Header          | JSON Field | Purpose |
|-----------------|------------|---------|
| `Authorization` | Generated from Adobe Developer Console (OAuth Server-to-Server) | Used for authenticating API calls. |
| `x-api-key`     | `project.workspace.details.credentials[0].oauth_server_to_server.client_id` | Client ID for authentication. |

### Use REST to create an Adobe I/O event provider

The event provider acts as a bridge between Adobe Commerce and Adobe's event-driven ecosystem. It enables Adobe Commerce to emit system events (such as product updates or order placements) to external systems or applications through Adobe I/O. Before configuring the event provider in Adobe Commerce, an Adobe I/O event provider must be created. To do this using the Adobe Events API:

- Visit the [Adobe I/O Events API documentation](https://developer.adobe.com/events/docs/api#operation/createProvider).
- Click **Try it** under the **Create an Adobe I/O Events Provider** section.
- The user interface allows you to enter the required provider details and send the payload directly to the Adobe I/O API.

### Key fields to include in the API body

| Field Name        | Description |
|-------------------|-------------|
| `description`     | A short explanation of what this event provider does. |
| `instance_id`     | A unique string that can be any value, used internally to identify the Commerce provider instance and distinguish it from others. |
| `label`           | A user-friendly display name for the provider. |
| `provider_metadata` | A technical identifier used to map the event provider to Adobe Commerce. |

**Sample payload**

```json
{
  "label": "Adobe Commerce EventsProduction",
  "description": "Event provider for Adobe Commerce to emit real-time commerce events to Adobe I/O.",
  "instance_id": "commerceeventsprod",
  "provider_metadata": "dx_commerce_events"
}
```

Once all required fields are completed, click the **Send** button to create the event provider. The API response will be similar to the following:

``` json
{
"_links": {
    "rel:eventmetadata": {},
    "rel:update": {},
    "self": {}
  },
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "label": "Your Event Provider Name",
  "description": "A brief description of your event provider",
  "source": "urn:uuid:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "docs_url": "https://developer.adobe.com/commerce/extensibility/events/",
  "provider_metadata": "dx_commerce_events",
  "instance_id": "your_provider_instance_id",
  "event_delivery_format": "cloud_events_v1",
  "publisher": "YourPublisher@AdobeOrg"
}
```

This response confirms that the event provider has been registered successfully in Adobe I/O. The `id`, `label`, `description`, and `instance_id` values from the response will be used in the next step.

## Create event metadata

Event metadata defines the individual events that your event provider can emit. Each metadata entry includes a label, description, instance identifier, provider metadata, and a unique event code. To do this:

- Visit the [Adobe I/O Events API documentation](https://developer.adobe.com/events/docs/api#operation/createProvider).
- Click **Try it** under the **Create an Adobe I/O Events Provider** section.
- The user interface allows you to enter the required provider details and send the payload directly to the Adobe I/O API.

### Key fields to include in the API body

| Field Name         | Description |
|--------------------|-------------|
| `label`            | A user-friendly display name for the event. |
| `description`      | A short explanation of what the event does. |
| `instance_id`      | A unique identifier for the Commerce provider instance (must match the Event Provider). |
| `provider_metadata`| A technical identifier linking the event to Adobe Commerce. |
| `event_code`       | The unique code for this event, used to identify it in Adobe I/O. |

**Sample payload**

```json
{
  "label": "Adobe Commerce EventsProduction",
  "description": "Event provider for Adobe Commerce to emit real-time commerce events to Adobe I/O.",
  "instance_id": "your_instance_id_here",
  "provider_metadata": "dx_commerce_events",
  "event_code": "observer.catalog_product_save_commit_after"
}
```

**Expected response**
Once all required fields are completed, click the **Send** button. The  response will be similar to the following:

```json
{
  "_links": {
    "rel:sample_event": {},
    "rel:update": {},
    "self": {}
  },
  "description": "Event provider for Adobe Commerce to emit real-time commerce events to Adobe I/O.",
  "label": "Adobe Commerce *************",
  "event_code": "observer.*****************_after"
}
```

## Create and configure an event provider in Adobe Commerce

Event providers act as connectors that enable Adobe Commerce to send system events (like order creation or product updates) to Adobe I/O. They define the source of events and ensure that events are delivered securely and in the correct format to subscribed applications. After noting down the values from the API call, use the following steps to add a new event provider in Adobe Commerce.

1. Navigate to **System** > **Events** > **Event Providers**.

1. Click **Add New Provider** and provide the required details. These fields are essential for establishing the connection between Adobe Commerce and the newly created Event Provider.

   ![Add new provider](../../_images/events/tutorial/adobe-commerce-create-event-provider.png)

   - **Provider ID** and **Instance ID** are required fields.

   - The **Workspace Configuration** value must come from the same Adobe Developer Console workspace where the event provider was originally created. You can download this configuration file directly from the Developer Console.

1. After filling in the details, click **Save** to create the event provider.

## Create a subscription in Adobe Commerce

This step links a specific Adobe Commerce event to the event provider created earlier. It defines which events should be sent, how they should be identified, and what data should be included in the payload. Refer to the  [Create events from the Admin](https://developer.adobe.com/commerce/extensibility/events/create-events/) for more information about subscriptions.

1. Navigate to **System** > **Events** > **Events Subscriptions**.

1. Click **Add New Subscription** to create event metadata for specific events you want to emit. Provide the following details in the **Event subscription settings** section:

  Field | Value
  --- | ---
  **Event Name** | `observer.catalog_product_save_commit_after`
  **Event Name Alias** | Optional. Any user-friendly name.
  **Event Provider** | Select the Event Provider created in the previous step.
  **Is Enabled** | Yes
  **Priority** | Yes

1. In the **Event Subscription Fields** section, specify the following fields to be included in the event payload. This limits the payload to only the selected fields rather than sending the full event data, improving efficiency.

   - `id`
   - `sku`
   - `name`
   - `created_at`
   - `updated_at`
   - `description`
   - `stock_data.qty`
   - `price`

1. After filling in all the details, click **Save** to create the subscription.

## Sync event metadata with App Builder

The next step is to sync the workspace details, subscription, and event provider configuration so that it becomes available during the event registration step in your App Builder project.

1. Click **Stores** > Configuration, **Adobe I/O** > **Adobe I/O Events**.

1. In the **General Configuration** section, click **Execute Synchronization**. This ensures that the event provider is registered and can be selected while setting up event registration in the App Builder project.

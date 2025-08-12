---
title: Extend Adobe Commerce with Events and App Builder
description: Learn how to configure and build event-driven integrations between Adobe Commerce and Adobe App Builder using asynchronous events.
keywords:
  - Extensibility
noIndex: true

---

# Extend Adobe Commerce with Events and App Builder

This guide explains how to create and configure an end-to-end event-driven integration using Adobe App Builder and Adobe Commerce asynchronous events. Whether the goal is to capture product updates, send order confirmation data to external systems, or trigger downstream workflows, Adobe Commerce asynchronous events and Adobe App Builder offer a scalable way to extend platform functionality.

The guide covers:

- Creating an Adobe I/O Event Provider using API
- Configuring Adobe Commerce to emit events using the event provider
- Setting up an Adobe App Builder project and writing action code to handle events
- Registering Event Provider and Consumer for the Event
- Viewing event payloads and logs to validate the integration
- Debugging Code and Development Tips
- Understanding limitations of Runtime actions and alternatives

A simple use case involving product updates is used to illustrate these steps and demonstrate event-based communication between Adobe Commerce and App Builder.

## How it works

This guide walks you through a typical event-driven integration using Adobe Commerce and Adobe App Builder. For an overview of Adobe I/O Events and how they facilitate building reactive applications across various Adobe services, see the [Adobe I/O Events Overview](https://developer.adobe.com/events/docs). **Figure 1** illustrates how events triggered within Adobe Commerce flow through to Adobe App Builder, enabling responsive downstream processing.

![Event-driven integration](../../_images/events/tutorial/adobe-io-events-integration-architecture.png)

Consider a use case where a product is saved or updated in Adobe Commerce. At this point, an asynchronous event is emitted. For this event to reach Adobe App Builder, an event provider must first be created in Adobe I/O Events. This provider defines the types of events that can be emitted, such as product updates, and ensures that Adobe I/O Events can receive and route them correctly.The event provider is then configured in Adobe Commerce using the Adobe I/O Events for Adobe Commerce module. This setup allows Adobe Commerce to emit specific events to Adobe I/O Events.

The provider is then linked during event registration in App Builder. Event registration specifies how and where the event should be delivered, such as to a Runtime action. To explore this and other supported registration types, refer to event registration in Adobe I/O Events.

Events emitted from Adobe Commerce are routed through Adobe I/O Events. This routing is enabled by the event provider configuration and the corresponding registration. Based on the registration setup, Adobe I/O Events invokes the appropriate consumer. In this case, the consumer is a Runtime action deployed as part of an App Builder app.

The Runtime action receives the event payload and processes it. In this use case, it checks whether there is a price change or if the stock falls below a defined threshold.

If either condition is met, the function logs the details using App Builder’s built-in logger. These logs help trace the flow of events and verify that the logic is executing correctly.

The function can also be extended to trigger alerts, update external systems, or launch downstream workflows, all without modifying the Commerce runtime

<InlineAlert variant="info" slots="text"/>

This tutorial specifically covers event registration using a Runtime action in Adobe App Builder. We will also discuss its limitations, including execution time constraints, in later sections.

## Setting up Event Provider in Adobe Commerce

This section covers creating and configuring an event provider in Adobe Commerce, which is then registered in the Adobe Developer Console as part of the App Builder project setup.To enable this flow:

1. An Adobe I/O Event Provider must first be created using the Adobe Event Provider API. Inputs such as the label, description, and instanceId are provided during this step.

1. Once Event Provider is created, the provider ID from the response should be noted.

1. Using these details, a corresponding event provider is then created in the Adobe Commerce Admin. The instanceId input from the API request is used here to establish the link between Adobe Commerce and Adobe I/O Events.

1. The configured provider is finally registered in the Adobe Developer Console during event registration for the App Builder project.

## Create an Adobe I/O Event Provider Using the API

This step sets up the event provider in Adobe I/O, which acts as a bridge between Adobe Commerce and Adobe's event-driven ecosystem. It enables Adobe Commerce to emit specific system events (such as product updates or order placements) to external systems or applications through Adobe I/O.

Before configuring the event provider in Adobe Commerce, Adobe I/O Event Provider must be created using the Adobe Events API. To do this:

- Visit the [Adobe I/O Events API documentation](https://developer.adobe.com/events/docs/api#operation/createProvider).
- Click **Try it** under the **Create an Adobe I/O Events Provider** section.
- The interface will allow you to enter the required provider details and send the payload directly to the Adobe I/O API.

**Key Fields to Include in the API Body**

When creating an Adobe I/O Event Provider via the Adobe Events API, include the following key fields in the request body:

|  Field Name | Description|
|---|---|
|`description`| A short explanation of what this event provider does.
|`instance_id`| A unique string that can be any value, used internally to identify the Commerce provider instance and distinguish it from others.
|`label`| A user-friendly display name for the provider. This appears in the Adobe Developer Console UI.
|`provider_metadata`| A technical identifier used to map the event provider to Adobe Commerce. This value can be found in Adobe Commerce Admin by navigating to Stores → Configuration → Adobe Services → Adobe I/O Events → Adobe I/O Event Provider Metadata.

**Sample Payload for creating Event Provider**

```json
{
  "label": "Adobe Commerce EventsProduction",
  "description": "Event provider for Adobe Commerce to emit real-time commerce events to Adobe I/O.",
  "instance_id": "commerceeventsprod",
  "provider_metadata": "dx_commerce_events"
} 
```

**Path and Header Parameters for Adobe I/O Events API**

To authenticate and call the Adobe I/O Events API (such as creating a provider), you need specific **path parameters** and **header parameters**. These values are available in the **JSON configuration file**, which can be downloaded from your App Builder project.

**JSON file can be downloaded from:**

1. Go to the [Adobe Developer Console](https://developer.adobe.com/console).
2. Select your project.
3. Choose the desired environment (e.g., Stage or Prod).
4. Click **Download All** to get the configuration JSON file.

This file contains necessary credentials and configuration details, including **client ID**, **client secret**, **organization ID** that will be used to authenticate  API requests.

**Path Parameters (used in the API endpoint URL)**

|  Parameter | Element in JSON File |
|---|---|
|`workspaceId`| project.workspace.id
|`projectId` | project.id
|`consumerOrgId`| project.org.id

**Header Parameters (for authentication)**

|  Header | Element in JSON File |
|---|---|
|`Authorization`| To generate the Authorization token, go to the Adobe Developer Console, navigate to your project and select the appropriate environment. Under the OAuth Server-to-Server section in the left menu, you’ll find an option to generate an access token.Click Generate access token and copy the value. This token should be used as the Authorization header in your API request in the `format: Bearer [token value]`
|`x-api-key` | project.workspace.details.credentials[0].oauth_server_to_server.client_id.

Once all required fields are completed and Click **Send** button, the Event Provider will be created successfully. The API response will look like this:

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

This response confirms that the Event Provider has been registered successfully in Adobe I/O.Make sure to note down the **id**, **label**, **description**, and **instance_id** values from the response, as these will needed in the next step.

## Create and Configure an Event Provider in Adobe Commerce

Event Providers act as connectors that enable Adobe Commerce to send system events (like order creation or product updates) to Adobe I/O. They define the source of events and ensure that events are delivered securely and in the correct format to subscribed applications. After noting down the values from the API call, to add a new Event Provider in Adobe Commerce, navigate to **System** > **Events** > **Event Providers**. Then click **Add New Event Provider** and provide the required details. These fields are essential for establishing the connection between Adobe Commerce and the newly created Event Provider.

![Add-New-Event Provider](../../_images/events/tutorial/adobe-commerce-create-event-provider.png)

Enter a user-friendly name in the **Event Name Alias** field. The Event Provider created in the earlier step will appear in the dropdown; select it to link the subscription to the correct provider.

In the **Event Subscription Fields** section, enter the specific fields to include in the event payload. This limits the payload to only the selected fields rather than sending the full event data, improving efficiency.Other configuration fields such as **Is Enabled** and **Priority** should be left to their default values unless specific requirements dictate otherwise. For additional details and advanced configuration options, refer to the  [Create events from the Admin](https://developer.adobe.com/commerce/extensibility/events/create-events/).

- **Provider ID** and **Instance ID** are required fields.

- The **Workspace Configuration** value must come from the same Adobe Developer Console workspace where the event provider was originally created. You can download this configuration file directly from the Developer Console.

## Configure Subscriber for Event Provider in Adobe Commerce

This step links a specific Adobe Commerce event to the Event Provider created earlier. It defines which events should be sent, how they should be identified, and what data should be included in the payload.  To create an Event Subscriber in Adobe Commerce, go to **System** > **Event Subscriptions** and click **Add New Subscription**. In this tutorial example, select **observer.catalog_product_save_commit_after** as the event to subscribe to.After filling in all the details, click Save to create the subscription.

![Add-New-Event Subscription](../../_images/events/tutorial/adobe-commerce-create-subscription.png)

![Configure-Subscription-Fields](../../_images/events/tutorial/adobe-commerce-configure-subscription-fields.png)

## Syncing Event Metadata with App Builder

After creating the event provider, you need to sync the workspace details, subscription, and event provider configuration so that it becomes available during the event registration step in your App Builder project. To do, in the Commerce instance Admin UI, navigate to **Admin** > **Stores** > **Configuration**, then navigate to **Adobe I/O** > **Adobe I/O Events** under **Adobe Services**. In the **General Configuration** section, click **Execute Synchronization**. This ensures that the event provider is registered and can be selected while setting up event registration in the App Builder project.

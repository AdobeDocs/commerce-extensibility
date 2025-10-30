---
title: Register and validate your journaling integration
description: Learn how to configure and build event-driven integrations between Adobe Commerce and Adobe App Builder using Journaling API.
edition: saas
keywords:
  - Extensibility
  - Events
---

# Register and validate your journaling integration

In this section, you will register your Commerce events in the Adobe Developer Console to enable journaling and then validate that events are correctly recorded and accessible. This ensures your integration is properly configured before building event-driven extensions.

## Prerequisite setup

Before configuring journaling, ensure that you have completed the standard setup for Adobe Commerce Events and App Builder.

- To create and configure an Event Provider in Adobe Commerce, follow the steps outlined in (Setting up Event Provider in Adobe Commerce) [https://developer.adobe.com/commerce/extensibility/events/tutorial/event-providers/#set-up-event-providers] up to the section
**Sync event metadata with App Builder**

- To set up your App Builder project, follow the steps in (Set up the Adobe Developer Console and App Builder project locally) https://developer.adobe.com/commerce/extensibility/events/tutorial/deployment/#set-up-the-adobe-developer-console-and-app-builder-project-locally up to the section **Set up your local App Builder environment using the CLI**.

## Register Commerce events in Adobe Developer Console for Journaling

Follow these steps to register Commerce events in the Adobe Developer Console:

1. Open your Adobe Developer Console project workspace.

1. From the **Add Service** menu, select **Event**.

1. On the Add Events page, choose **Commerce Events**, then click **Next**.

   ![Event Selection in developer console Project](../../_images/events/journaling/developer-console-adding-event.png)

1. In the Configure Event Registration step, select the event provider that you created earlier in Adobe Commerce and click **Next** to review the list of available events from that provider. For Journaling, do not select any specific delivery method or runtime action. The Journaling API is automatically enabled for this integration.

   ![Journaling selection in Event registration Selection](../../_images/events/journaling/developer-console-journaling-selection.png)

## Validate your integration

After registering Commerce events, you can verify that Adobe Commerce is successfully sending events to the journaling endpoint. This ensures your event registration and integration are working as expected.

Follow these steps to validate event delivery:

1. In your Adobe Commerce Admin panel, delete a product from the catalog. (**Catalog** > **Products** > **Delete Product**. This action triggers a product deletion event.

1. Open the Adobe Developer Console and navigate to the event browser within your project workspace.

1. Verify that the product deletion event appears in the event browser.

1. Click the **Go to Start** button to refresh and load the latest events.

The event browser provides a visual preview of received events and displays basic metadata such as the event ID, timestamp, and provider. Once confirmed, the event flow from Adobe Commerce to the Journaling API is successfully validated.

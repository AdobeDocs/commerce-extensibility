---
title: Register your integration with the Journaling API
description: Learn how to register Adobe Commerce events for journaling and validate that the integration is functioning correctly.
edition: saas
keywords:
  - Extensibility
  - Events
---

# Register and validate your integration with the Journaling API

This topic guides you through registering Adobe Commerce events for journaling and validating that the integration is functioning correctly.

## Prerequisite setup

Before configuring journaling, ensure that you've completed the standard setup for Adobe Commerce Events and App Builder.

- To create and configure an Event Provider in Adobe Commerce, follow the steps outlined in [Setting up Event Provider in Adobe Commerce](../tutorial/event-providers.md#set-up-event-providers/) up to the section "Sync event metadata with App Builder.

- To set up your App Builder project, follow the steps in [Set up the Adobe Developer Console and App Builder project locally](../tutorial/deployment.md#set-up-the-adobe-developer-console-and-app-builder-project-locally) up to the section "Set up your local App Builder environment using the CLI".

## Register Commerce Events in Adobe Developer Console for Journaling

Define which Commerce events to subscribe to and register them within the Adobe Developer Console project. Return to the project workspace in the Developer Console, open the **Add Service** menu, and select **Event**. On the Add Events page, choose **Commerce Events** and select **Next**.

**Insert Image**

In the Configure Event Registration step, select the event provider created earlier in Adobe Commerce. Select **Next** and review the events available from the provider. For journaling, do not choose any specific delivery method or runtime action. The Journaling API renders by default for the integration.

**Insert Image**

On the final screen, update the **Event Registration Name** and **Description** fields. Save the configuration. After saving, the journaling endpoint (journal URL) generates automatically and becomes available for the App Builder application to poll events at its own pace.

## Validate your integration

Validate that events from Adobe Commerce reach the journaling endpoint.

1. In Adobe Commerce, delete a product from the catalog.

1. Open the Adobe Developer Console and navigate to the event browser in the project workspace.

1. Confirm that the product deletion event appears in the event browser.

1. Click the **Go to Start** button. The event browser provides a visual preview of events and includes basic metadata such as event ID, timestamp, and provider.

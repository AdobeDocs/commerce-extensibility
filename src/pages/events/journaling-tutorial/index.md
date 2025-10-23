---
title: Integrate events with Adobe I/O Events Journaling API
description: Learn how to configure and build event-driven integrations between Adobe Commerce and Adobe App Builder using Journaling API.
edition: saas
keywords:
  - Extensibility
  - Events
---

# Integrate Adobe Commerce events with App Builder using Adobe I/O Events Journaling API

When integrating Adobe I/O Events with App Builder, developers often configure event registrations to directly invoke a _runtime action_. While this approach works for lightweight use cases, it has an important limitation: runtime actions must complete within **60 seconds**. If the action does not return a response within this time, Adobe I/O Runtime will terminate it.  This makes direct event-to-runtime invocation unsuitable for **long-running** or **blocking** operations.

To address this, Adobe IO Events provides event journaling as an alternative. Journaling captures incoming events and stores them for up to seven days, allowing developers to:

- Fetch events asynchronously.
- Process them in bulk at their own pace.
- Avoid runtime execution timeouts.

## How it works

Adobe I/O Events Journaling provides a reliable way to consume events asynchronously without requiring direct delivery to a webhook or runtime action. Journaling stores events temporarily in a dedicated endpoint, allowing applications to pull events at their own pace. This approach supports batch processing, error recovery, and ensures that events are not lost when a consumer is temporarily unavailable. [Adobe I/O Events Journaling Guide](https://developer.adobe.com/events/docs/guides/journaling-intro) provides an overview of journaling concepts and benefits.

Consider a use case where a product is deleted from the Adobe Commerce catalog. At that point, an event is emitted asynchronously and sent to Adobe I/O Events. An event provider must first be created. The provider defines the supported event types, such as product deletions or inventory changes, and ensures proper routing. The Adobe I/O Events for Adobe Commerce module enables Adobe Commerce to subscribe to this provider.

When a product deletion event is emitted, Adobe I/O Events stores it in a journaling endpoint. The endpoint holds events for a period of seven days. making them available for consumption. Consumers gain access to the journal URL during event registration.

In this integration, an events registration is created with the provider, which returns a journal URL. The App Builder application is then configured with this journal URL so that a runtime action can use the Events SDK to poll and retrieve events from the journal. A runtime action then uses the Events SDK to poll the journal. During each execution, the action:

- Retrieves the last saved position (cursor) from state storage using `aio-lib-state`.
- Calls the journaling API to fetch all new events since that position.
- Processes and logs event payloads, such as product identifiers and metadata related to the deletion.
- Updates the stored position so the next execution continues from the correct point in the journal.

For more details on journaling behavior, see the [Adobe I/O Events Journaling FAQ](https://developer.adobe.com/events/docs/support/faq#journaling-faq).

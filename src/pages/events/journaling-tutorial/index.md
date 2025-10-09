---
title: Use Events and App Builder to Extend Adobe Commerce
description: Learn how to configure and build event-driven integrations between Adobe Commerce and Adobe App Builder using Journaling API.
edition: saas
keywords:
  - Extensibility
  - Events
---

When integrating Adobe I/O Events with App Builder, developers often configure event registrations to directly invoke a **Runtime action**. While this approach works for lightweight use cases, it has an important limitation: Runtime actions must complete within **60 seconds**. If the action does not return a response within this time, Adobe I/O Runtime will terminate it.  This makes direct event-to-runtime invocation unsuitable for **long-running** or **blocking** operations.
To address this, Adobe IO Event provides event journaling as an alternative. Journaling captures incoming events and stores them for up to 7 days, allowing developers to:

- Fetch events asynchronously.
- Process them in bulk at their own pace.
- Avoid runtime execution timeouts.

## How it works

Adobe I/O Events Journaling provides a reliable way to consume events asynchronously without requiring direct delivery to a webhook or Runtime action. Journaling stores events temporarily in a dedicated endpoint, allowing applications to pull events at their own pace. This approach supports batch processing, error recovery, and ensures that events are not lost when a consumer is temporarily unavailable. You can read in detail here:[Adobe I/O Events Journaling Guide](https://developer.adobe.com/events/docs/guides/journaling-intro)

Consider a use case where a product is deleted from the Adobe Commerce catalog. At that point, At that point, an event is emitted asynchronously and sent to Adobe I/O Events.An event provider must first be created.The provider defines the supported event types, such as product deletions or inventory changes, and ensures proper routing.The Adobe I/O Events for Adobe Commerce module enables Adobe Commerce to subscribe to this provider.

When a product deletion event is emitted, Adobe I/O Events stores it in a journaling endpoint. The endpoint holds events for a period of 7 days. making them available for consumption. Consumers gain access to the journal URL during event registration.
In this integration, an events registration is created with the provider, which returns a journal URL. The App Builder application is then configured with this journal URL so that a Runtime action can use the Events SDK to poll and retrieve events from the journal.A Runtime action then uses the Events SDK to poll the journal. During each execution, the action:

- Retrieves the last saved position (cursor) from state storage using aio-lib-state.
- Calls the journaling API to fetch all new events since that position.
- Processes and logs event payloads, such as product identifiers and metadata related to the deletion.
- Updates the stored position so the next execution continues from the correct point in the journal.

For more details on journaling behavior, see the [Adobe I/O Events Journaling FAQ](https://developer.adobe.com/events/docs/support/faq#journaling-faq).

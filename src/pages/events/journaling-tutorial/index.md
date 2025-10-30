---
title: Integrate events with Adobe I/O Events Journaling API
description: Learn how to configure and build event-driven integrations between Adobe Commerce and Adobe App Builder using Journaling API.
edition: saas
keywords:
  - Extensibility
  - Events
---

# Integrate Adobe Commerce events with App Builder using Adobe I/O Events Journaling API

When integrating Adobe I/O Events with App Builder, developers often configure event registrations to directly invoke a runtime action. While this approach works for lightweight use cases, it has an important limitation: runtime actions must complete within **60 seconds**. If the action does not return a response within this time, Adobe I/O Runtime will terminate it. _This makes direct event-to-runtime invocation unsuitable for long-running or blocking operations._

To address this, Adobe IO Events provides event journaling as an alternative. Journaling captures incoming events and stores them for up to seven days, allowing developers to:

- Fetch events asynchronously.
- Process them in bulk at their own pace.
- Avoid runtime execution timeouts.

## How it works

Adobe I/O Events Journaling provides a reliable way to consume events asynchronously. Journaling stores events temporarily in a dedicated endpoint, allowing applications to pull events at their own pace. The [Adobe I/O Events Journaling Guide](https://developer.adobe.com/events/docs/guides/journaling-intro) explains the journaling concept and its benefits.

Consider a Commerce use case where an event is triggered when a product is deleted from the catalog. If the project uses event registration through a journaling endpoint, the event is sent asynchronously to Adobe I/O Events. Adobe I/O Events stores these events in the journaling endpoint for 7 days, making them available for consumption. Developers receive the journal URL during event registration.

The App Builder app is then set up with this journal URL. A Runtime action uses the Events SDK to poll the journal and fetch new events. Each time it runs, it reads and processes the available events.Every time. the App runs, the program:

In this integration, an events registration is created with the provider, which returns a journal URL. The App Builder application is then configured with this journal URL so that a runtime action can use the Events SDK to poll and retrieve events from the journal. A runtime action then uses the Events SDK to poll the journal. During each execution, the action:

- Retrieves the last saved position (cursor) from state storage using `aio-lib-state`.
- Calls the journaling API to fetch all new events since that position.
- Processes and logs event payloads, such as product identifiers and metadata related to the deletion.
- Updates the stored position so the next execution continues from the correct point in the journal.

For more details on journaling behavior, see the [Adobe I/O Events Journaling FAQ](https://developer.adobe.com/events/docs/support/faq#journaling-faq).

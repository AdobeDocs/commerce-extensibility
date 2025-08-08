---
title: Extend Adobe Commerce with Events and App Builder
description: Learn how to configure and build event-driven integrations between Adobe Commerce and Adobe App Builder using asynchronous events.
keywords:
  - Extensibility
noIndex: true

---

## Limitation of Configuring via Event Registration as Runtime Action

When configuring an event registration to invoke a Runtime action in Adobe App Builder, be aware of the following key limitation:

### Execution Timeout Constraint

The registered Runtime action **must complete within 60 seconds**. If the action does not return a response within this period, it will be **terminated by the Adobe I/O Runtime Platform**.This makes it unsuitable for long-running operations in action code.

### Suggested Alternatives

#### 1. Asynchronous Processing

Modify the Runtime action to **immediately acknowledge the event** and offload the actual processing to:

- An external service
- A queue (such as **Kafka** or **Pub/Sub**)
- A background worker

This approach helps ensure a **fast response** to the event system while managing heavier workloads efficiently.

**Important Notes:**

 - Debug Tracing might not capture full details if something goes wrong during the offloaded processing.
 - I/O Events will not retry the event if the processing fails after it has been acknowledged.

#### 2. Journaling-Based Event Registration

Instead of directly triggering a Runtime action, configure **Journaling** through Adobe’s event registration system.

- Journaling **persists incoming events for up to 7 days**, allowing developers to consume and process them **asynchronously** at their own pace.
- Journalling provides better flexibility for longer or deferred processing.
- Journaling does **not support persisting events to external data stores**.
Learn more about Journalling in [Adobe Events Runtime Journalling Guide](https://developer.adobe.com/events/docs/guides/api/journaling-api).

For further assistance or inquiries, please post your question in the [#app-builder-community](https://magentocommeng.slack.com/).

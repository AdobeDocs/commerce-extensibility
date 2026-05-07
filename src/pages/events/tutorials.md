---
title: Adobe Commerce Events Tutorials
description: Learn how to build event-driven integrations between Adobe Commerce and Adobe App Builder using asynchronous events and the Adobe I/O Events Journaling API.
keywords:
  - Extensibility
  - Events
---

# Events tutorials

These tutorials walk you through building event-driven integrations between Adobe Commerce and Adobe App Builder. Each tutorial covers a distinct delivery model for Commerce events, so you can choose the approach that fits your use case.

## Use events and App Builder to extend Adobe Commerce

&#8203;<Edition name="saas" />

This tutorial covers the most direct event delivery model: a Commerce event triggers an Adobe I/O Events registration that immediately invokes an App Builder runtime action. A product update use case illustrates each step, from configuring an event provider and event metadata to writing and deploying the runtime action code.

**In this tutorial, you will learn how to:**

- Set up an Adobe I/O event provider and event metadata in Adobe Commerce.
- Create an event subscription and sync it with App Builder.
- Initialize an App Builder project and write a runtime action that processes product events.
- Register Commerce events in the Adobe Developer Console and verify end-to-end delivery.
- Debug runtime actions locally using VS Code and the Adobe I/O CLI.

<InlineAlert variant="info" slots="text"/>

Runtime actions invoked directly by an event registration must complete within 60 seconds. For long-running or blocking workloads, see the journaling tutorial below.

[Start the tutorial](./tutorial/index.md)

## Integrate Commerce events using the Adobe I/O Events Journaling API

The journaling tutorial covers journaling as an alternative to direct runtime invocation. Instead of immediately invoking a runtime action, Commerce events are stored in a journaling endpoint for up to seven days. A scheduled runtime action polls the journal, fetches batches of events, and processes them asynchronously.

This tutorial is appliable to all versions of Adobe Commerce.

**In this tutorial you will learn how to:**

- Register Commerce events in the Adobe Developer Console using the journaling delivery model.
- Validate that events flow from Commerce to the journaling endpoint.
- Write a runtime action that uses the Adobe I/O Events SDK to poll the journal, maintain a cursor in state storage, and process event payloads.
- Validate that the runtime action correctly fetches and processes journaled events.

**When to use this approach:**

- Your processing logic may exceed the 60-second runtime action limit.
- You need to process events in bulk or at a controlled pace.
- You want resilience against missed events, since the journal retains events for seven days.

[Start the tutorial](./journaling-tutorial/index.md)

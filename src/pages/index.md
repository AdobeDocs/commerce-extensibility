---
title: Adobe Commerce extensibility
description: Build integrations, extensions, Admin experiences, and storefront experiences for Adobe Commerce.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---


<SuperHero slots="image, heading, text"/>

![Commerce Extensibility](images/home-bg.jpeg)

# Commerce Extensibility

Extend Adobe Commerce without modifying core code.

This guide covers everything you need to build out-of-process extensions for Adobe Commerce, including starter kits, event-driven integrations, Admin UI extensions. Out-of-process extensions run independently of the core application, so they stay compatible across Commerce upgrades and work across deployment models without modification.

## Choose your path

Start with the use case you need to solve.

### Integrate and extend

Connect Commerce to external systems or extend its behavior using event-driven and real-time patterns. The Integration and Checkout Starter Kits provide scaffolding for the most common scenarios. Events and Webhooks are the underlying mechanisms that power both.

<Cards slots="heading, text" width="25%" />

#### [Integration Starter Kit](./starter-kit/integration/index.md)

Scaffold event-driven integrations between Commerce and back-office systems using reference data flows for orders, products, customers, and inventory.

<Cards slots="heading, text" width="25%" />

#### [Checkout Starter Kit](./starter-kit/checkout/index.md)

Accelerate payment, shipping, tax, pricing, inventory, and checkout extension scenarios.

<Cards slots="heading, text" width="25%" />

#### [Events](./events/index.md)

Use asynchronous, event-driven flows for downstream sync, notifications, and background processing.

<Cards slots="heading, text" width="25%" />

#### [Webhooks](./webhooks/index.md)

Use real-time callbacks when Commerce must wait for an external decision before continuing.

### Customize Commerce surfaces

Add functionality to the Admin, the checkout flow, and the storefront without modifying core code. The Admin UI SDK embeds custom React apps in Commerce Admin. OOPE modules register external payment, shipping, tax, and custom-attribute implementations. Edge Delivery Services powers composable storefronts connected to Commerce APIs.

<Cards slots="heading, text" width="33%" />

#### [Admin UI SDK](./admin-ui-sdk/index.md)

Add custom pages, navigation, workflows, and merchant-facing interfaces inside Commerce Admin.

<Cards slots="heading, text" width="33%" />

#### [OOPE modules](./oope-modules/index.md)

Add out-of-process payment, shipping, tax, totals-collector, and custom-attribute modules to Commerce without modifying core code.

<Cards slots="heading, text" width="33%" />

#### [Edge Delivery Services](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/content-and-commerce/introduction)

Build fast, composable storefront experiences using Edge Delivery Services connected to Commerce APIs.

### Build and operate

Manage the full lifecycle of App Builder applications from a single interface in Commerce Admin, monitor distributed workloads with OpenTelemetry, and use Commerce-aware AI tooling to accelerate development across all of the above.

<Cards slots="heading, text" width="33%" />

#### [AI developer tools](./developer-agent/index.md)

Use Commerce-aware AI agent skills and an MCP server to build, maintain, and debug extensions with reduced friction.

<Cards slots="heading, text" width="33%" />

#### [App Management](./app-management/index.md)

Install, configure, and manage App Builder applications in Commerce Admin with schema-driven configuration and a unified lifecycle view.

<Cards slots="heading, text" width="33%" />

#### [Observability](./observability/index.md)

Set up OpenTelemetry-based monitoring for metrics, logs, and traces across Commerce, App Builder apps, and third-party integrations.

## How it works

Traditional Adobe Commerce extensions run in-process: custom PHP code executes inside the same server process as the core application. That model gives extensions direct access to Commerce internals, but it also means upgrades can break extensions, and a poorly written extension can destabilize the entire installation.

**Out-of-process extensibility** moves custom logic outside the core application. Instead of modifying Commerce directly, you build independent services, integrations, and UI extensions that communicate with Commerce through APIs, events, and webhooks. These apps run on their own runtime, scale independently, and survive Commerce upgrades without modification. Adobe recommends out-of-process patterns for all new extension and integration work.

**Adobe Developer App Builder** is the serverless runtime that makes this practical. It provides the infrastructure to host, deploy, and run your extension logic without provisioning or managing servers. Within App Builder, the key building blocks are:

- **Runtime actions** — Node.js functions that process events, call external APIs, transform data, and respond to webhook requests on demand.
- **Events** — Asynchronous subscriptions to Commerce activity (order placed, product updated, customer registered) that invoke runtime actions without polling.
- **Webhooks** — Synchronous callbacks that let Commerce call your App Builder action and wait for a response before continuing — for example, during tax calculation, shipping rate lookup, or order validation.
- **Admin UI SDK** — A React application served from App Builder and embedded as a native panel or page inside Commerce Admin, authenticated with IMS.
- **API Mesh** — A GraphQL gateway that composes Commerce APIs and third-party APIs behind a single endpoint, reducing round trips from the storefront or App Builder actions.

In practice, most extensions combine several of these. An order management integration, for example, uses Events to receive order data asynchronously, runtime actions to transform and forward it to an external OMS, and Webhooks to validate specific order states in real time. Observability then collects logs, metrics, and traces from every layer into a single backend. Building this way means each piece can be developed, tested, and deployed independently of the Commerce release cycle — reducing upgrade risk and enabling faster iteration.

## Build for all Adobe Commerce platforms

The principles described in this guide apply to all variants of Adobe Commerce. However, there are some key architectural differences that you need to consider and validate when building your extension:

- **Authentication** — Prefer IMS-based authentication where possible.
- **Module availability** — Account for preinstalled extensibility capabilities versus manual installation requirements.
- **Events and webhooks** — Validate supported events, supported webhooks, and how they are registered in each environment.
- **Admin UI SDK** — Confirm runtime behavior and token access in - **REST and GraphQL endpoints** — Confirm the endpoint format and assumptions used by your app.
each environment.
- **Storefront testing** — Validate storefront integrations with the supported storefront model for the target environment.

Use the [extension compatibility guide](./app-development/extension-compatibility.md) to avoid common issues across deployment models.

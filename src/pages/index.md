---
title: Adobe Commerce extensibility
description: Build out-of-process extensions for Adobe Commerce using Adobe Developer App Builder.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---

<Hero slots="image, heading, text"/>

![Commerce Extensibility](_images/home-bg.jpeg)

# Adobe Commerce extensibility

Build apps that extend Adobe Commerce using the Adobe Developer App Builder framework.

Traditional Commerce extensions run inside the application, sharing resources and release cycles with core code. **Out-of-process extensibility** (OOPE) moves your custom code outside Commerce to Adobe's serverless infrastructure, where it communicates through APIs and events.

This separation means your apps deploy independently, scale on their own, and don't block Commerce upgrades. When issues arise, Commerce keeps running while you debug and redeploy.

[Learn more about extensibility approaches](./get-started/index.md)

## Your development journey

Building an out-of-process app follows the following phases:

| Phase | What you'll do |
|-------|----------------|
| **Setup** | Learn about OOPE apps and set up your development environment  |
| **Plan** | Define requirements, set up App Builder access, connect to Commerce |
| **Build** | Develop using starter kits or core capabilities (Events, Webhooks, Admin UI SDK) |
| **Submit** | Prepare documentation, meet security requirements, submit for review |

You can explore each phase in detail.

## Start building

<DiscoverBlock slots="link, text"/>

[Integration starter kit](./starter-kit/integration/index.md)

Connect Commerce to ERP, OMS, PIM, or CRM systems with pre-built data flows.

<DiscoverBlock slots="link, text"/>

[Checkout starter kit](./starter-kit/checkout/index.md)

Build custom payment, shipping, or tax integrations.

<DiscoverBlock slots="link, text"/>

[Events](./events/index.md)

React to Commerce activities asynchronously.

<DiscoverBlock slots="link, text"/>

[Webhooks](./webhooks/index.md)

Intercept and modify Commerce behavior synchronously.

<DiscoverBlock slots="link, text"/>

[Admin UI SDK](./admin-ui-sdk/index.md)

Add custom pages and configuration to the Commerce Admin.

## Additional resources

- [Learning path](./get-started/learning-path.md) - Curated tutorials and videos for developers new to App Builder
- [Extensibility examples](./get-started/examples.md) - See how App Builder, API Mesh, and Events work together
- [PHP to App Builder comparison](./plan/app-development-comparison.md) - Map familiar PHP patterns to App Builder equivalents
- [App submission guidelines](./app-development/app-submission-guidelines.md) - Requirements for publishing to Adobe Exchange

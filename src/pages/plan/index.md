---
title: Plan your App Builder app
description: Learn about the complete lifecycle for building, distributing, and managing App Builder apps that extend Adobe Commerce.
keywords:
  - App Builder
  - Extensibility
  - Lifecycle
  - Getting Started
---

# Plan your App Builder app

This guide provides a roadmap for creating App Builder applications that extend Adobe Commerce. Whether you're building an integration for your own business or developing an app for the Adobe Exchange marketplace, understanding the complete lifecycle helps you plan your project and navigate the documentation.

Before writing code, define your requirements and prepare your development environment.

## Define your requirements

Identify what your app needs to accomplish:

- What Commerce activities should trigger your app? (orders, customers, products, inventory)
- Does your app need to validate or modify data synchronously, or can it react asynchronously?
- Will merchants need to configure your app through the Admin interface?
- What external systems will your app integrate with?

## Choose your approach

Based on your requirements, determine which capabilities you'll need:

| If you need to... | Use |
|-------------------|-----|
| React to Commerce events without blocking operations | [Events](../events/index.md) |
| Validate or modify data before Commerce continues | [Webhooks](../webhooks/index.md) |
| Add configuration or management pages to the Admin | [Admin UI SDK](../admin-ui-sdk/index.md) |
| Combine multiple APIs into a single endpoint | [API Mesh](https://developer.adobe.com/graphql-mesh-gateway/) |

## Set up your environment

Prepare the foundation for development:

1. **Get App Builder access** - Request access through your Adobe organization or obtain a trial license
2. **Configure Adobe Developer Console** - Create a project and workspace for your app
3. **Connect to Commerce** - Establish the connection between your App Builder workspace and Commerce instance
4. **Choose a starter kit** - If your use case aligns with common patterns, start with the [Integration](../starter-kit/integration/index.md) or [Checkout](../starter-kit/checkout/index.md) starter kit

The [learning path](../get-started/learning-path.md) provides detailed guidance for each setup step.

## Build your app

With your environment ready, develop your application.

### Choose your starting point

<DiscoverBlock slots="link, text"/>

[Integration starter kit](../starter-kit/integration/index.md)

Best for connecting Commerce to back-office systems like ERP, PIM, OMS, or CRM. Includes pre-built data flows for customers, orders, products, inventory, and shipments.

<DiscoverBlock slots="link, text"/>

[Checkout starter kit](../starter-kit/checkout/index.md)

Best for customizing checkout experiences with custom payment, shipping, or tax integrations.

<DiscoverBlock slots="link, text"/>

[Build from scratch](../get-started/learning-path.md)

Best for unique requirements not covered by starter kits. Start with the learning path to understand the full App Builder ecosystem.

### Core extensibility capabilities

Your app can leverage one or more of these capabilities:

| Capability | Use when | Learn more |
|------------|----------|------------|
| **Events** | You need to react to Commerce activities asynchronously (order placed, customer created, product updated) | [Events overview](../events/index.md) |
| **Webhooks** | Commerce must wait for a synchronous response before continuing (validate stock, calculate tax, authorize payment) | [Webhooks overview](../webhooks/index.md) |
| **Admin UI SDK** | You need to add custom pages, menus, or mass actions to the Commerce Admin | [Admin UI SDK overview](../admin-ui-sdk/index.md) |
| **API Mesh** | You need to combine multiple APIs into a single GraphQL endpoint | [API Mesh documentation](https://developer.adobe.com/graphql-mesh-gateway/) |

<InlineAlert variant="info" slots="text"/>

Many apps combine multiple capabilities. For example, an order management integration might use Events to receive order notifications, Webhooks to validate inventory during checkout, and the Admin UI SDK to provide a management interface.

### Events vs W\webhooks: Which should I use?

| Scenario | Recommended | Why |
|----------|-------------|-----|
| Notify external system when an order is placed | **Events** | External system doesn't need to respond immediately |
| Validate product stock before adding to cart | **Webhooks** | Commerce must wait for the validation result |
| Sync customer data to CRM | **Events** | Sync can happen asynchronously |
| Calculate custom shipping rates at checkout | **Webhooks** | Rates must be returned before checkout continues |
| Send order to fulfillment system | **Events** | Fulfillment processing is asynchronous |
| Validate discount code with external promotion engine | **Webhooks** | Validation result affects the current transaction |

### Development best practices

As you build, follow these practices to ensure a smooth path to production:

- [Credentials management](./best-practices/credentials.md) - Securely handle API keys, tokens, and secrets
- [Logging and troubleshooting](./best-practices/logging-troubleshooting.md) - Implement effective logging for debugging
- [Database storage](./best-practices/database-storage.md) - Choose appropriate storage solutions for your app data

## Quick reference: Documentation by task

| I want to... | Start here |
|--------------|------------|
| Get started with App Builder | [Learning path](../get-started/learning-path.md) |
| Set up my development environment | [App Builder getting started](https://developer.adobe.com/app-builder/docs/getting_started/) |
| Integrate with an ERP/OMS/PIM | [Integration starter kit](../starter-kit/integration/index.md) |
| Add custom payment/shipping/tax | [Checkout starter kit](../starter-kit/checkout/index.md) |
| React to Commerce events | [Events overview](../events/index.md) |
| Intercept and modify Commerce behavior | [Webhooks overview](../webhooks/index.md) |
| Add pages to the Admin | [Admin UI SDK overview](../admin-ui-sdk/index.md) |
| Submit my app to Adobe Exchange | [App submission guidelines](./app-submission-guidelines.md) |
| Install an app in Commerce | [Associate and configure apps](../app-management/associate-apps.md) |
| Monitor my app in production | [Observability overview](../observability/index.md) |
| Debug event delivery issues | [Events troubleshooting](../events/troubleshooting.md) |

## Related topics

- [Extensibility approaches](../get-started/index.md) - Understand in-process, out-of-process, and hybrid development
- [Extensibility examples](../get-started/examples.md) - See how App Builder, API Mesh, and Events work together
- [Learning path](../get-started/learning-path.md) - Curated tutorials and videos for App Builder

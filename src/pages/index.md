---
title: Adobe Commerce extensibility
description: Learn how to create out-of-process extensions for Adobe Commerce.
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

# Adobe Commerce extensibility

Learn how to create out-of-process extensions for Adobe Commerce using App Builder and App Management.

## Extend Adobe Commerce without changing the Commerce core

Adobe Commerce supports **out-of-process extensibility**: custom business logic, integrations, and user experiences run as applications outside the Commerce application process. These applications communicate with Commerce using supported APIs, events, webhooks, and extension points rather than adding PHP code directly to the Commerce codebase.

Adobe implements this model through **Adobe Developer App Builder** and **Commerce App Management**:

- **App Builder** provides the platform for building secure, scalable Commerce applications. See [App development](/app-development/index.md) and the [App Builder documentation](https://developer.adobe.com/app-builder/docs/get_started/) to get started.
- **I/O Runtime** hosts serverless actions that execute your custom logic.
- **Commerce [APIs](https://developer.adobe.com/commerce/webapi/)**, [events](/events/index.md), and [webhooks](/webhooks/index.md)** connect your application to Commerce data and behavior.
- **Commerce SDKs and libraries** provide reusable patterns for authentication, configuration, event handling, and Commerce integration, including the [Admin UI SDK](/admin-ui-sdk/index.md) and [OOPE modules](/oope-modules/index.md).
- **[App Management](/app-management/index.md)** provides the application lifecycle: associate, configure, install, update, and remove Commerce apps.

This separation lets developers create and deploy an app independently from the Commerce release cycle. It also helps isolate custom workloads, reduce upgrade coupling, and make integrations easier to operate and evolve.

### Out-of-process and in-process extensibility

Traditional Commerce extensions use an **in-process** model. PHP modules, plugins, observers, and other customizations run inside the Commerce application process and interact directly with its runtime, services, and database. This model can provide deep control, but it also couples custom code to the Commerce version, PHP runtime, internal APIs, deployment process, and available application resources.

Out-of-process extensibility moves that custom logic outside the Commerce process:

| Characteristic | Out-of-process extensibility | In-process extensibility |
|---|---|---|
| **Where code runs** | Outside Commerce, on App Builder and its supporting services | Inside the Commerce application process |
| **How it connects to Commerce** | APIs, events, webhooks, SDKs, and supported extension points | PHP extension points and runtime services |
| **Release lifecycle** | Independently developed, tested, deployed, and operated | Coupled to Commerce deployment and upgrades |
| **Upgrade considerations** | Custom logic is decoupled from the Commerce codebase | Custom code must remain compatible with Commerce and its runtime |
| **Scaling and resource use** | Can scale and process independently of the Commerce application | Shares Commerce application resources |
| **Typical strengths** | Upgrade safety, integration flexibility, isolation, and independent delivery | Deep, synchronous control of the Commerce runtime |

The two models are not interchangeable implementation details. They represent different lifecycle and operating models. **For new Commerce apps and modernizing existing customizations, start with App Management and build using the out-of-process extensibility model.**

## Build with App Management

Use [App Management](/app-management/index.md) as the foundation for your Commerce extension lifecycle. It establishes how an app is defined, associated with a Commerce instance, configured, installed, updated, and removed.

Start here to:

1. **[Define the app](/app-management/define-app.md)** and its Commerce capabilities.
1. **[Build the app](/app-development/index.md)** with App Builder, Commerce SDKs, and supported integration patterns.
1. **Connect the app** to Commerce through APIs, [events](/events/index.md), [webhooks](/webhooks/index.md), or [UI extension points](/admin-ui-sdk/index.md).
1. **[Deploy and associate the app](/app-management/build-deploy.md)** with Commerce.
1. **Configure, test, and operate the app** across its supported environments. See [Observability](/observability/index.md) for monitoring guidance.

### When to use a starter kit

[Starter kits](/starter-kit/integration/index.md) are **opinionated accelerators**, not alternate application lifecycle systems. They provide scaffolding, examples, and recommended patterns for common scenarios such as [creating an integration](/starter-kit/integration/index.md) and [customizing the checkout process](/starter-kit/checkout/index.md).

Choose a starter kit when you want to:

- Quickly explore a common Commerce use case.
- Start from a working reference implementation.
- Adopt a recommended integration or UI pattern.
- Customize an established foundation for your requirements.

Regardless of whether you start from an empty App Builder project or a starter kit, the resulting application follows the App Management lifecycle.

**Build with App Management. Start with a starter kit if you need an accelerator.**

## Related resources

- [Developer agent](/developer-agent/index.md) — get AI-assisted help while building Commerce apps.
- [App development](/app-development/index.md) — learn how to build, port, and submit Commerce apps.
- [Events](/events/index.md), [Webhooks](/webhooks/index.md), [Admin UI SDK](/admin-ui-sdk/index.md), and [OOPE modules](/oope-modules/index.md) — the supported extension points for connecting your app to Commerce.
- [Observability](/observability/index.md) — monitor and troubleshoot your Commerce apps.
- [API Mesh](https://developer.adobe.com/graphql-mesh-gateway/) — A GraphQL gateway that composes Commerce APIs and third-party APIs behind a single endpoint, reducing round trips from the storefront or App Builder actions.
- The [#app-builder-community](https://magentocommeng.slack.com/archives/C04KT43Q75K) Slack channel allows you to ask questions, share your work, and connect with other developers interested in Adobe Commerce extensibility and App Builder.

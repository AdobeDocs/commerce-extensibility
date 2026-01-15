---
title: App Management overview
description: Learn how to manage App Builder applications in Adobe Commerce.
keywords:
  - App Builder
  - Extensibility
  - App Management
---

# App Management

<InlineAlert variant="warning" slots="text" />

**Adobe Commerce App Management is for Beta users only and is not yet accessible to all customers.**

App Management provides a unified experience for installing, configuring, and managing App Builder applications in Adobe Commerce. Define your configuration schema once, and the system auto-generates the runtime actions and Admin UI—no custom code required.

![App Management UI](../_images/app-management/app-management-ui.png)

## Key benefits

* **Auto-generated runtime actions**–Define a configuration schema and the library generates all required runtime actions automatically.

* **Auto-generated Admin UI**–Configuration forms are rendered dynamically based on your schema, eliminating custom UI development.

* **Scope inheritance**–Configuration values cascade through Global, Website, Store, and Store View levels.

* **Unified lifecycle management**–Associate, configure, and unassociate apps from a single interface.

## Requirements

| Requirement | Description |
|-------------|-------------|
| Adobe Commerce | SaaS or PaaS environment |
| App Builder | Deployed application with `commerce/configuration/1` extension point |
| Configuration library | Initialized with `npx @adobe/commerce-lib-config init` |

## How it works

1. **Define app metadata**–Add your [app metadata](./app-metadata.md) in `app.commerce.config`.

1. **Define config schema**–Create your [configuration schema](./configuration-schema.md) in `app.commerce.config`.

1. **Generate actions**–Run `npx @adobe/commerce-lib-config init` to [auto-generate runtime actions](./runtime-actions.md).

1. **Deploy**–Build and deploy your app with `aio app build && aio app deploy`.

1. **Associate**–[Link your app](./associate-apps.md) to a Commerce instance in the Admin.

1. **Configure**–Merchants configure settings through the auto-generated UI.

## Next steps

<DiscoverBlock slots="link, text"/>

[App metadata reference](./app-metadata.md)

Define your app metadata in `app.commerce.config`.

<DiscoverBlock slots="link, text"/>

[Configuration schema reference](./configuration-schema.md)

Define your app configuration schema in `app.commerce.config`.

<DiscoverBlock slots="link, text"/>

[Runtime actions reference](./runtime-actions.md)

Initialize the configuration library and understand the generated runtime actions.

<DiscoverBlock slots="link, text"/>

[Associate and configure apps](./associate-apps.md)

Link apps to Commerce instances and configure business settings.

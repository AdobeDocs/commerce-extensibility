---
title: App Management overview
description: Learn how to manage App Builder applications in Adobe Commerce.
keywords:
  - App Builder
  - Extensibility
edition: beta
---

# App Management

<InlineAlert variant="warning" slots="text" />

**Adobe Commerce App Management is for Beta users only and is not yet accessible to all customers.**

App Management provides a unified experience for installing, configuring, and managing App Builder applications in Adobe Commerce. Define your configuration schema once, and the system auto-generates the runtime actions and Admin UI—no custom code required.

## Key benefits

* **Auto-generated runtime actions**–Define a configuration schema and the library generates all required runtime actions automatically.

* **Auto-generated Admin UI**–Configuration forms are rendered dynamically based on your schema, eliminating custom UI development.

* **Scope inheritance**–Configuration values cascade through Global, Website, Store, and Store View levels.

* **Unified lifecycle management**–Install, configure, update, and uninstall apps from a single interface.

## Requirements

| Requirement | Description |
|-------------|-------------|
| Adobe Commerce | ACCS (SaaS) or PaaS environment |
| App Builder | Deployed application with `commerce/backend-ui/1` extension point |
| Configuration library | Initialized with `npx @adobe/commerce-lib-config init` |

## How it works

1. **Define schema**–Create your [configuration schema](./configuration-schema.md) in `extensibility.config.js`.

1. **Generate actions**–Run `npx @adobe/commerce-lib-config init` to [auto-generate runtime actions](./runtime-actions.md).

1. **Deploy**–Build and deploy your app with `aio app build && aio app deploy`.

1. **Associate**–[Link your app](./associate-apps.md) to a Commerce instance in the Admin.

1. **Configure**–Merchants configure settings through the auto-generated UI.

## Next steps

<DiscoverBlock slots="link, text"/>

[Configuration schema reference](./configuration-schema.md)

Define your app's configuration schema in `extensibility.config.js`.

<DiscoverBlock slots="link, text"/>

[Runtime actions reference](./runtime-actions.md)

Initialize the configuration library and understand the generated runtime actions.

<DiscoverBlock slots="link, text"/>

[Associate and configure apps](./associate-apps.md)

Link apps to Commerce instances and configure business settings.

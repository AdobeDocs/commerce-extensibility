---
title: App Management overview
description: Learn how to manage App Builder applications in Adobe Commerce.
keywords:
  - App Builder
  - Extensibility
  - App Management
edition: beta
---

# App Management

<InlineAlert variant="warning" slots="text" />

**Adobe Commerce App Management is for Beta users only and is not yet accessible to all customers.**

App Management provides a unified experience for installing, configuring, and managing App Builder applications in Adobe Commerce. It streamlines onboarding, reduces manual configuration steps, and offers a first-class Admin UI for app lifecycle management:

* **Unified installation experience** - A single, consistent flow for installing any App Builder application.
* **Admin UI integration** - A native interface within the Commerce Admin for managing installed apps.
* **Configuration schema** - Apps are configured based on the configuration schema defined by the developer.
* **Lifecycle management** - Tools to enable, disable, update, and uninstall apps.

## Key capabilities

### App installation orchestrator

The installation orchestrator streamlines the process of setting up App Builder applications. When an app is associated with a Commerce instance, the orchestrator:

* Reads the app configuration schema to set up the auto-generated configuration UI.
* Syncs Commerce scopes to enable scope-specific configuration.
* Registers the app extensibility points (events, webhooks, UI extensions).

This approach reduces complexity for merchants, prevents configuration collisions between apps, and ensures predictable app behavior across environments.

### App-to-instance linking

Each application must be linked to a specific Commerce instance. App Management handles this association automatically:

* **ACCS environments** - Apps are linked using a tenant ID.
* **PaaS and on-premises environments** - Apps are linked using the Commerce base URL.

Once linked, the app can retrieve instance information and apply configurations specific to that Commerce deployment.

### Configuration schema and auto-generated runtime actions

Apps define their configuration requirements using a declarative schema in the [`extensibility.config.js`](./configuration-schema.md) file. This schema specifies the settings that merchants can customize, including field types, labels, and validation rules.

Based on this schema, the configuration library **automatically generates the runtime actions** required for App Management. These [generated runtime actions](./runtime-actions.md) handle reading the schema, saving configuration values, managing scopes, and more—eliminating the need for developers to write this boilerplate code.

App Management leverages the [Admin UI SDK](../admin-ui-sdk/index.md) extension point to discover apps with configuration schemas. When an app defines a configuration schema, it automatically appears in the App Management interface, ready for merchants to configure.

### Configuration scopes

App Management supports Commerce's native configuration scope hierarchy. Configuration values can be set at different levels and inherit appropriately:

* **Global** - Default values that apply to all scopes
* **Website** - Override values for a specific website
* **Store** - Override values for a specific store
* **Store View** - Override values for a specific store view

This scope inheritance ensures apps behave correctly across multi-site Commerce deployments.

## Next steps

<DiscoverBlock slots="link, text"/>

[Configuration schema reference](./configuration-schema.md)

Learn how to define your app's configuration schema in `extensibility.config.js`.

<DiscoverBlock slots="link, text"/>

[Runtime actions reference](./runtime-actions.md)

Understand the generated runtime actions and how to initialize the configuration library.

<DiscoverBlock slots="link, text"/>

[Associate and configure apps](./associate-apps.md)

Learn how to associate apps with Commerce instances and configure business settings.

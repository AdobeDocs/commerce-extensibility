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

App Management provides a unified experience for installing, configuring, and managing App Builder applications in Adobe Commerce. It streamlines onboarding, reduces manual configuration steps, and offers a first-class Admin UI for app lifecycle management.

App Management provides:

* **Unified installation experience** - A single, consistent flow for installing any App Builder application.
* **Admin UI integration** - A native interface within the Commerce Admin for managing installed apps.
* **Automatic configuration** - Apps are automatically configured based on the configuration schema defined by the developer.
* **Lifecycle management** - Tools to enable, disable, update, and uninstall apps.

## Key capabilities

### App installation orchestrator

The installation orchestrator streamlines the process of setting up App Builder applications. When an app is associated with a Commerce instance, the orchestrator:

* Reads the app's configuration schema to set up the auto-generated configuration UI
* Syncs Commerce scopes to enable scope-specific configuration
* Registers the app's extensibility points (events, webhooks, UI extensions)

This approach reduces complexity for merchants, prevents configuration collisions between apps, and ensures predictable app behavior across environments.

### App-to-instance linking

Each application must be linked to a specific Commerce instance. App Management handles this association automatically:

* **ACCS environments** - Apps are linked using a tenant ID.
* **PaaS and on-premises environments** - Apps are linked using the Commerce base URL.

Once linked, the app can retrieve instance information and apply configurations specific to that Commerce deployment.

### Configuration schema and auto-generated runtime actions

Apps define their configuration requirements using a declarative schema in the [`extensibility.config.js`](./configuration-schema.md) file. This schema specifies the settings that merchants can customize, including field types, labels, and validation rules.

Based on this schema, the configuration library **automatically generates the runtime actions** required for App Management. These [generated runtime actions](./runtime-actions.md) handle reading the schema, saving configuration values, managing scopes, and more—eliminating the need for developers to write this boilerplate code.

The App Management UI then uses these runtime actions to render a user-friendly configuration form within the Commerce Admin. Developers define the fields once, and the system renders the appropriate form controls—text inputs, number fields, checkboxes, and dropdowns—without requiring any custom UI development.

App Management leverages the [Admin UI SDK](../admin-ui-sdk/index.md) extension point to discover apps with configuration schemas. When an app defines a configuration schema, it automatically appears in the App Management interface, ready for merchants to configure.

### Configuration scopes

App Management supports Commerce's native configuration scope hierarchy. Configuration values can be set at different levels and inherit appropriately:

* **Global** - Default values that apply to all scopes
* **Website** - Override values for a specific website
* **Store** - Override values for a specific store
* **Store View** - Override values for a specific store view

This scope inheritance ensures apps behave correctly across multi-site Commerce deployments.

### Unified extensibility libraries

App Management consolidates extensibility logic into unified libraries, providing a consistent foundation for:

- Event handling
- Webhook registration
- UI component rendering
- Configuration management

This unification ensures apps work consistently whether deployed on Adobe Commerce as a Cloud Service (ACCS) or PaaS environments.

## How it works

1. **App definition** - Developers define their app's capabilities and configuration schema in the [`extensibility.config.js`](./configuration-schema.md) file.

1. **Initialization** - Run the [configuration library](./runtime-actions.md) to auto-generate the required runtime actions based on your schema.

1. **Deployment** - The app is deployed to Adobe App Builder and registered with the `commerce/backend-ui/1` extension point.

1. **Instance linking** - The app is [associated with a Commerce instance](./associate-apps.md) using the tenant ID (ACCS) or base URL (PaaS/on-premises).

1. **Discovery** - App Management discovers installed apps by querying the Admin UI SDK for registrations that define configuration schemas.

1. **Configuration** - Merchants configure app settings through the App Management interface. Values are stored with appropriate scope inheritance.

1. **Execution** - The app retrieves its configuration at runtime and executes logic based on the current settings.

## Benefits

| Benefit | Description |
|---------|-------------|
| Faster onboarding | Reduce installation time from hours to minutes with automated configuration |
| Fewer errors | Eliminate manual configuration mistakes with schema validation |
| Better visibility | Monitor app status and health from a central dashboard |
| Simplified updates | Update apps without manual reconfiguration |
| Consistent experience | Same installation flow across all App Builder applications |

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

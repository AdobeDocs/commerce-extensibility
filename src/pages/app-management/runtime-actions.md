---
title: Configure your project
description: Initialize the configuration library and understand auto-generated runtime actions
keywords:
  - App Builder
  - Extensibility
  - App Management
---

# Configure your project

<InlineAlert variant="warning" slots="text" />

**Adobe Commerce App Management is for Beta users only and is not yet accessible to all customers.**

The `@adobe/aio-commerce-lib-config` library auto-generates runtime actions based on the `businessConfig` section in your [configuration schema](./configuration-schema.md). An additional action is generated for app metadata by the `@adobe/aio-commerce-lib-app` library. These actions power the App Management UI with no required boilerplate code.

## Initialize the library

Run the following command to set up your App Builder project with the configuration library. This command structures the required files, installs dependencies, and generates runtime actions based on your schema.

```bash
npx @adobe/aio-commerce-lib-config init
```

The initialization process:

* Creates `app.commerce.config` with a template schema if it does not exist. If the file exists but lacks the `businessConfig` property, the library attempts to add it automatically. If the library cannot add the property, the script fails and prompts user to add `businessConfig` manually.
* Installs `@adobe/aio-commerce-lib-config` and `@adobe/aio-commerce-sdk`
* Adds a `postinstall` script to `package.json` to ensure up-to-date generated runtime actions on library updates.
* Generates all required artifacts (schema and runtime actions)
* Creates the `ext.config.yaml` needed for the `commerce/configuration/1` extension point and updates the `app.config.yaml` with the appropriate reference
* Creates or updates `install.yaml` with the extension point reference
* Creates or updates `.env` file with placeholder environment variables

## Generated files

The initialization process creates the following files in your project:

| File | Description |
|------|-------------|
| `app.commerce.config` | Your [configuration schema](./configuration-schema.md) |
| `src/commerce-configuration-1/.generated/` | Auto-generated runtime actions and schema |
| `src/commerce-configuration-1/ext.config.yaml` | Action declarations for App Builder |
| `install.yaml` | Extension point references |

## Generated runtime actions

The libraries generate the following runtime actions to handle configuration and scope operations:

### Scope management actions

Scopes define the hierarchical boundaries where configuration values can be set and inherited:

| Action | Description |
|--------|-------------|
| `get-scope-tree` | Retrieves scope hierarchies. |
| `sync-commerce-scopes` | Syncs scopes from Adobe Commerce. |
| `set-custom-scope-tree` | Defines custom scope hierarchies for external systems. |

### Configuration management actions

These actions handle reading and writing configuration values:

| Action | Description |
|--------|-------------|
| `get-config-schema` | Retrieves the configuration schema. UI uses this to render the form. |
| `get-configuration` | Gets configuration values with inheritance for a scope. |
| `set-configuration` | Saves configuration values for a scope. |

### App metadata action

The `@adobe/aio-commerce-lib-app` library generates an additional runtime action for retrieving app metadata:

| Action | Description |
|--------|-------------|
| `get-app-config` | Returns the app configuration. |

This action is generated in `src/commerce-extensibility-1/.generated/actions/` along with the extensibility manifest.

<InlineAlert variant="warning" slots="text"/>

Do not manually edit files in `src/commerce-configuration-1/` or `src/commerce-extensibility-1/`. These are auto-generated directories and any manual changes can be lost at any time during regeneration.

## Build and deploy

After initializing the library, build and deploy your application to make it available in App Management:

```bash
aio app build
aio app deploy
```

Once deployed, your app appears in App Management and can be [associated with a Commerce instance](./associate-apps.md).

## Update the library

When a new version of the configuration library is available, update your project to get the latest features and fixes.

Install the latest version of the libraries:

```bash
npm install @adobe/aio-commerce-lib-config@latest
```

```bash
npm install @adobe/aio-commerce-lib-app@latest
```

<InlineAlert variant="info" slots="text"/>

npm update only updates to the latest version compatible with the semver range defined in the `package.json` file. To get a specific or newer version outside that range, manually edit the `package.json` file.

The `postinstall` script regenerates runtime actions when you install or update the library.

Then, rebuild and redeploy your application:

```bash
aio app build
aio app deploy
```

## Troubleshooting

Use the following solutions to resolve common issues with runtime actions.

**Runtime actions not generated**

1. Verify `app.commerce.config` exists with a valid schema.

1. Run manually: `npx @adobe/aio-commerce-lib-config generate all`.

**Schema validation fails**

1. Run: `npx @adobe/aio-commerce-lib-config validate schema`.

1. Fix issues in `app.commerce.config` and rebuild.

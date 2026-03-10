---
title: Initialize your app
description: Set up your App Builder project for App Management
keywords:
  - App Builder
  - Extensibility
  - App Management
---

# Initialize your app

Before initializing your App Builder application for App Management, ensure you have completed the prerequisites and have the required services configured.

## Prerequisites

Complete the following steps before initializing your app:

1. **Create a project in the Adobe Developer Console**

   Create a new project or use an existing one in the [Adobe Developer Console](https://developer.adobe.com/console).

1. **Add required services**

   Add the following services to your project:

   * **I/O Management API**. Required for App Builder runtime actions.
   * **I/O Events**. Required only if your app uses events.
   * **I/O Events for Adobe Commerce**. Required only if your app uses events.
   * **Adobe Commerce as a Cloud Service**. Required only for Adobe Commerce as a Cloud Service instances.

<InlineAlert variant="info" slots="text"/>

Only add the services your app needs. This keeps your credentials scoped to the minimum required permissions.

1. **Set up App Builder**

   Ensure you have the [Adobe I/O CLI](https://developer.adobe.com/app-builder/docs/getting_started/) installed and configured.

## Initialize

Run the following command to set up your App Builder project:

```bash
npx @adobe/aio-commerce-lib-app init
```

The initialization process:

* Creates `app.commerce.config` with a template (prompts you to choose format and features if the file doesn't exist)
* Installs required dependencies (`@adobe/aio-commerce-lib-app`, `@adobe/aio-commerce-sdk`, and `@adobe/aio-commerce-lib-config` when business configuration is enabled)
* Adds a `postinstall` hook to `package.json`
* Generates all required artifacts (`commerce/configuration/1` resources are only generated when `businessConfig` is defined)
* Updates `app.config.yaml` and `install.yaml` with the appropriate extension references. Creates these files if they do not exist.

The command automatically detects your package manager and uses the appropriate package runner (`npx` for npm, `yarn dlx` for Yarn, `pnpm dlx` for pnpm, `bunx` for Bun).

## CLI commands

The library provides the following CLI commands:

```bash
# Initialize the project (recommended for first-time setup)
npx @adobe/aio-commerce-lib-app init

# Generate all artifacts (manifest + schema + runtime actions)
# The @adobe prefix is only required for the init command
npx aio-commerce-lib-app generate all

# Or generate individually:
npx aio-commerce-lib-app generate manifest
npx aio-commerce-lib-app generate actions
npx aio-commerce-lib-app generate schema
```

## Update the library

When a new version of the library is available, update your project to get the latest features and fixes:

```bash
npm install @adobe/aio-commerce-lib-app@latest @adobe/aio-commerce-sdk@latest
```

If you use a business configuration, also run the following command:

```bash
npm install @adobe/aio-commerce-lib-config@latest
```

The `postinstall` hook regenerates runtime actions when you install or update the library.

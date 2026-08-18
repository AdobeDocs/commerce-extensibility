---
title: Customize
description: Customize the installation process for your App Builder application
keywords:
  - App Builder
  - App Management
  - Configuration
  - Extensibility
---

# Customize

The `installation` field in your `app.commerce.config` file allows you to customize the installation experience with messages and custom scripts.

## Installation messages

Define messages that display to users before and after the installation process:

```js
import { defineConfig } from "@adobe/aio-commerce-lib-app/config"

export default defineConfig({
  metadata: {
    // ...
  },
  installation: {
    messages: {
      preInstallation: "This app requires configuration A & B to be completed before clicking Install.",
      postInstallation: "Configure your email settings to complete the setup.",
    },
  },
});
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `preInstallation` | string | No | Message displayed before installation starts. Maximum 1000 characters. |
| `postInstallation` | string | No | Message displayed after installation completes. Maximum 1000 characters. |

## Custom installation steps

The `customInstallationSteps` field allows you to define custom scripts that run during the application installation process. These scripts are loaded and executed in the order they are defined.

```js
import { defineConfig } from "@adobe/aio-commerce-lib-app/config"

export default defineConfig({
  metadata: {
    // ...
  },
  installation: {
    messages: {
      preInstallation: "Please ensure all prerequisites are met before installation.",
    },
    customInstallationSteps: [
      {
        script: "./scripts/configure-webhooks.js",
        name: "Configure Webhooks",
        description: "Set up webhook endpoints for order notifications",
      },
      {
        script: "./scripts/initialize-database.ts",
        name: "Initialize Database",
        description: "Create required database tables and indexes",
      },
    ],
  },
});
```

### Step properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `script` | string | Yes | Path to the script file relative to your project root. Must end with a `.js` or `.ts` extension. |
| `name` | string | Yes | Display name for the installation step. Maximum 255 characters. |
| `description` | string | No | Description of what the step does. Maximum 255 characters. |

<InlineAlert variant="info" slots="text"/>

Two custom installation steps cannot have the same name. Step names must be unique.

### Working with TypeScript

You can write custom installation step scripts as `.ts` files instead of `.js` once your project has the TypeScript build setup in place. See [Working with TypeScript](../initialize-app.md#working-with-typescript) for details.

### Writing installation scripts

Your custom installation scripts must export a default value using `defineCustomInstallationStep`. It accepts either a plain handler function (install only) or an object with `install` and optional `uninstall` handlers.

The `context` passed to each handler exposes:

| Property | Description |
|----------|--------------|
| `appData` | Credentials of the app being managed. |
| `params` | Raw action parameters from the App Builder runtime action. |
| `logger` | Logger instance for workflow logging. |

#### Plain function form

```js
import { defineCustomInstallationStep } from "@adobe/aio-commerce-lib-app/management";

export default defineCustomInstallationStep(async (config, context) => {
  const { logger, params } = context;

  logger.info("Installation step started");

  // Your installation logic here

  logger.info("Installation step completed");

  return {
    status: "success",
    message: "Custom installation step completed",
    timestamp: new Date().toISOString(),
  };
});
```

#### Object form with install and uninstall

Use the object form when your step needs to clean up resources it created when the app is uninstalled:

```js
import { defineCustomInstallationStep } from "@adobe/aio-commerce-lib-app/management";

export default defineCustomInstallationStep({
  install: async (config, context) => {
    context.logger.info(`Registering ${config.metadata.displayName}...`);
    return { status: "success" };
  },
  uninstall: async (config, context) => {
    context.logger.info(`Removing ${config.metadata.displayName}...`);
  },
});
```

<InlineAlert variant="info" slots="text"/>

On uninstall, steps run in the **same declared order as install**, not reversed. Steps without an `uninstall` handler are silently skipped during uninstallation.

### Script with error handling

```js
import { defineCustomInstallationStep } from "@adobe/aio-commerce-lib-app/management";

export default defineCustomInstallationStep(async (config, context) => {
  const { logger } = context;

  logger.info("Initializing database...");

  try {
    if (!config.businessConfig?.schema) {
      throw new Error("Business configuration schema is required");
    }

    logger.info(`Setting up database for ${config.metadata.displayName}`);

    // Database initialization logic
    await initializeDatabase();

    logger.info("Database initialized successfully");

    return {
      status: "success",
      message: "Database tables and indexes created",
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`Database initialization failed: ${errorMessage}`);
    throw error;
  }
});
```

### Script requirements

* Scripts **must** use `export default` to export either a handler function or an object with `install`/`uninstall` handlers.
* Scripts are executed **sequentially** in the order defined, for both installation and uninstallation (uninstall does **not** reverse the order).
* If any script throws an error, the installation fails and subsequent scripts are not executed.
* Scripts have access to the complete app configuration.

After you modify custom installation scripts, you must manually run the `npx aio-commerce-lib-app` generate actions command before building and deploying. This ensures the installation action picks up your changes. For all other `app.commerce.config` updates, build and deploy alone is sufficient, as artifacts are regenerated during pre-app-build.

---
title: Customize
description: Customize the installation process for your App Builder application
keywords:
  - App Builder
  - Extensibility
  - App Management
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
        script: "./scripts/initialize-database.js",
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
| `script` | string | Yes | Path to the script file relative to your project root. |
| `name` | string | Yes | Display name for the installation step. Maximum 255 characters. |
| `description` | string | No | Description of what the step does. Maximum 255 characters. |

<InlineAlert variant="info" slots="text"/>

Two custom installation steps cannot have the same name. Step names must be unique.

### Writing installation scripts

Your custom installation scripts must export a default function using `defineCustomInstallationStep`:

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

* Scripts **must** use `export default` to export the main function.
* Scripts are executed **sequentially** in the order defined.
* If any script throws an error, the installation fails and subsequent scripts are not executed.
* Scripts have access to the complete app configuration.

After modifying custom installation scripts, run `npx aio-commerce-lib-app generate actions` to regenerate the installation action.

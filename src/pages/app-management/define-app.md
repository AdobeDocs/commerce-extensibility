---
title: Define your app
description: Learn how to configure your App Builder application for App Management
edition: paas
keywords:
  - App Builder
  - Extensibility
  - App Management
---

# Define your app

<InlineAlert variant="warning" slots="text" />

**Adobe Commerce App Management is for Beta users only and is not yet accessible to all customers.**

The `app.commerce.config` file is the central configuration file for your App Builder application. It defines your app metadata, business configuration schema, and other settings.

Create an `app.commerce.config` file consisting of **[app metadata](./app-metadata.md)** and **[business configuration](./configuration-schema.md)**.

<InlineAlert variant="info" slots="text"/>

The `app.commerce.config` file supports both JavaScript (`app.commerce.config.js`) and TypeScript (`app.commerce.config.ts`) file types.

## Example

The following example shows a complete `app.commerce.config`:

```js
import { defineConfig } from "@adobe/aio-commerce-lib-app/config"

export default defineConfig({
  metadata: {
    id: "my-commerce-application",
    displayName: "My Commerce Application",
    description: "This is a description for my application",
    version: "1.0.0"
  },
  businessConfig: {
    schema: [
      {
        name: "api-name",
        label: "API name",
        type: "text",
        default: "",
      },
      {
        name: "api-endpoint",
        label: "API Endpoint",
        type: "url",
        default: "https://api.example.com",
      },
      {
        name: "api-key",
        label: "API Key",
        type: "password",
      },
      {
        name: "level",
        label: "Risk Level",
        type: "list",
        options: [
          { label: "Low", value: "low" },
          { label: "Medium", value: "medium" },
          { label: "High", value: "high" },
        ],
        default: "medium",
        selectionMode: "single",
      },
    ],
  },
});
```

See the **[Configure your project](./runtime-actions.md)** topic for more information about initializing the configuration library to generate the required runtime actions, and project structure.

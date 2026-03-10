---
title: Define your app
description: Learn how to configure your App Builder application for App Management
keywords:
  - App Builder
  - Extensibility
  - App Management
---

# Define your app

The `app.commerce.config` file is the central configuration file for your App Builder application. It defines your app metadata, business configuration schema, and other settings.

Create an `app.commerce.config` file consisting of **[app metadata](./app-metadata.md)** and **[business configuration](./configuration-schema.md)**.

<InlineAlert variant="info" slots="text"/>

The `app.commerce.config` file supports both JavaScript and TypeScript file types.

## Example

The following example shows a complete `app.commerce.config` file:

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
  eventing: {
    commerce: [
      {
        provider: {
          label: "Commerce Events Provider",
          description: "A description for your Commerce Events provider.",
        },
        events: [
          {
            name: "observer.catalog_product_save_commit_after",
            fields: [{ name: "sku" }],
            label: "Product Save Commit After",
            description: "Used to react to a product save in Commerce",
            runtimeActions: ["my-package/handle-event"],
            priority: true,
          },
        ],
      },
    ],
    external: [
      {
        provider: {
          label: "External Events Provider",
          description: "A description for your External Events provider.",
        },
        events: [
          {
            name: "external.sample_event",
            label: "External Sample Event",
            description: "An event reacting to something in an external system.",
            runtimeActions: ["my-package/handle-event"],
          },
        ],
      },
    ],
  },
  installation: {
    messages: {
      preInstallation: "Do something before installation",
      postInstallation: "Do something after installation",
    },
    customInstallationSteps: [
      {
        name: "custom-step",
        description: "Run custom logic after installation",
        script: "./scripts/custom.js",
      },
    ],
  },
});
```

See [Initialize your app](./initialize-app.md) for setup instructions and [Build and deploy](./build-deploy.md) for information about generated runtime actions and project structure. If your schema includes password fields, see [Password field encryption](./configuration-schema.md#password-field-encryption).

---
title: Webhooks
description: Configure webhook endpoints for your App Builder application
keywords:
  - App Builder
  - Extensibility
  - App Management
  - Webhooks
---

# Webhooks

Webhooks allow external systems to send real-time notifications to your App Builder application. Use webhooks to integrate with third-party services and respond to events from external sources.

## Overview

When you configure [external events](./events.md#external-events), you can set up webhook endpoints that receive incoming requests from external services. These requests trigger your runtime actions, enabling real-time integrations.

## Webhook configuration

Configure webhooks as external event sources in your `app.commerce.config` file:

```js
import { defineConfig } from "@adobe/aio-commerce-lib-app/config"

export default defineConfig({
  metadata: {
    // ...
  },
  eventing: {
    external: [
      {
        provider: {
          label: "Webhook Provider",
          description: "Incoming webhooks from external services",
        },
        events: [
          {
            name: "payment_webhook",
            label: "Payment Webhook",
            description: "Receives payment notifications",
            runtimeActions: ["my-package/handle-payment"],
          },
          {
            name: "shipping_webhook",
            label: "Shipping Webhook",
            description: "Receives shipping updates",
            runtimeActions: ["my-package/handle-shipping"],
          },
        ],
      },
    ],
  },
});
```

## Handling webhook requests

Your runtime action receives the webhook payload in the `params` object:

```js
async function main(params) {
  const webhookPayload = params.data;
  
  // Process the webhook
  console.log("Received webhook:", webhookPayload);
  
  return {
    statusCode: 200,
    body: { received: true },
  };
}

exports.main = main;
```

## Security considerations

- Validate webhook signatures when provided by the external service
- Use HTTPS endpoints for all webhook communications
- Implement idempotency to handle duplicate webhook deliveries

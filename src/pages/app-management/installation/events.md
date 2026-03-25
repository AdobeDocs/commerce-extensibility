---
title: Events
description: Configure event subscriptions for your App Builder application
keywords:
  - App Builder
  - Extensibility
  - App Management
  - Events
---

# Events

The `eventing` field in your `app.commerce.config` file allows you to configure event sources for your application. There are two types of event sources:

* **commerce** (for Adobe Commerce events).
* **external** (for third-party events).

## Commerce events

Commerce events are triggered by actions within Adobe Commerce, such as order placement or catalog updates.

```js
import { defineConfig } from "@adobe/aio-commerce-lib-app/config"

export default defineConfig({
  metadata: {
    // ...
  },
  eventing: {
    commerce: [
      {
        provider: {
          label: "My Commerce Events",
          description: "Events from Adobe Commerce",
        },
        events: [
          {
            name: "plugin.order_placed",
            fields: [
              { name: "order_id" },
              { name: "customer_id" },
            ],
            runtimeActions: ["my-package/handle-order"],
            description: "Triggered when an order is placed",
          },
          {
            name: "observer.catalog_product_save_after",
            fields: [
              { name: "price" },
              { name: "sku" },
            ],
            rules: [
              {
                field: "price",
                operator: "lessThan",
                value: "300.00",
              },
            ],
            runtimeActions: ["my-package/handle-product"],
            description: "Triggered when a product is saved with price filter",
          },
        ],
      },
    ],
  },
});
```

### Commerce event properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Event name. Must start with `plugin.` or `observer.` followed by lowercase letters and underscores. |
| `label` | string | No | Display name for the event. Maximum 100 characters. |
| `description` | string | No | Description of the event. Maximum 255 characters. |
| `fields` | array | No | Array of field objects with `name` (required) and `source` (optional) properties. |
| `rules` | array | No | Array of filtering rules. See [Event rules](#event-rules). |
| `runtimeActions` | array | Yes | Array of runtime actions to invoke (format: `package/action`). |
| `destination` | string | No | Destination for the event. Must be a valid destination name. |
| `hipaaAuditRequired` | boolean | No | Indicates if the event requires HIPAA audit. |
| `prioritary` | boolean | No | Indicates if the event is prioritary. |
| `force` | boolean | No | Indicates if the event should be forced. |

### Event rules

Rules filter events before they reach your runtime actions:

| Property | Type | Description |
|----------|------|-------------|
| `field` | string | The field name to filter on. |
| `operator` | string | Comparison operator: `greaterThan`, `lessThan`, `equal`, `regex`, `in`, `onChange`. |
| `value` | string | The value to compare against. |

## External events

External events are triggered by third-party services outside Adobe Commerce.

```js
eventing: {
  external: [
    {
      provider: {
        label: "External Events Provider",
        description: "Events from third-party services",
      },
      events: [
        {
          name: "webhook_received",
          label: "Webhook Received",
          description: "Triggered when a webhook is received",
          runtimeActions: ["my-package/handle-webhook"],
        },
      ],
    },
  ],
}
```

### External event properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Event name. Word characters, hyphens, underscores, and dots allowed. |
| `label` | string | Yes | Display name for the event. Maximum 100 characters. |
| `description` | string | No | Description of the event. Maximum 255 characters. |
| `runtimeActions` | array | Yes | Array of runtime actions to invoke. |

## Provider configuration

Both commerce and external event sources require a provider configuration:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | string | Yes | Display name for the provider. Maximum 100 characters. |
| `description` | string | No | Description of the provider. Maximum 255 characters. |
| `key` | string | No | Optional unique key for the provider. Maximum 50 characters, alphanumeric with hyphens. |

## Related topics

To declare Commerce webhooks in `app.commerce.config` for App Management (separate from event subscriptions), see [Webhooks](./webhooks.md).

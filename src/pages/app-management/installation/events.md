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
            label: "Order Placed",
            fields: [
              { name: "order_id" },
              { name: "customer_id" },
            ],
            runtimeActions: ["my-package/handle-order"],
            description: "Triggered when an order is placed",
          },
          {
            name: "observer.catalog_product_save_after",
            label: "Product Price Updated",
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
| `label` | string | Yes | Display name for the event. Maximum 100 characters. |
| `description` | string | Yes | Description of the event. Maximum 255 characters. |
| `fields` | array | Yes | Array of field objects with `name` (required) and `source` (optional) properties. |
| `rules` | array | No | Array of filtering rules. See [Event rules](#event-rules). |
| `runtimeActions` | array | Yes | Array of runtime actions to invoke (format: `package/action`). |
| `destination` | string | No | Destination for the event. Must be a valid destination name. |
| `env` | array | No | Restricts the event to **PaaS** (`paas`) and/or **SaaS** (`saas`). Omit or specify both to apply to all environments. |
| `hipaa_audit_required` | boolean | No | Indicates whether the event requires HIPAA audit. |
| `priority` | boolean | No | Indicates whether the event is high priority. |
| `force` | boolean | No | Indicates whether the event should be forced. |

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
| `description` | string | Yes | Description of the event. Maximum 255 characters. |
| `runtimeActions` | array | Yes | Array of runtime actions to invoke. |
| `env` | array | No | Restricts the event to **PaaS** (`paas`) and/or **SaaS** (`saas`). Omit or specify both to apply to all environments. |
| `hipaa_audit_required` | boolean | No | Indicates whether the event requires HIPAA audit. |

## Provider configuration

Both commerce and external event sources require a provider configuration:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | string | Yes | Display name for the provider. Maximum 100 characters. |
| `description` | string | Yes | Description of the provider. Maximum 255 characters. |
| `key` | string | No | Optional unique key for the provider. Maximum 50 characters, alphanumeric with hyphens. |

## Related topics

[Webhooks](webhooks.md): Learn how to declare Commerce webhook subscriptions in `app.commerce.config` for App Management

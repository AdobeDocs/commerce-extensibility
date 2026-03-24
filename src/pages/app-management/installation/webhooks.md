---
title: Webhooks
description: Use Commerce Webhooks API from App Builder with aio-commerce-lib-webhooks
keywords:
  - App Builder
  - Extensibility
  - App Management
  - Webhooks
---

# Webhooks

Use [`@adobe/aio-commerce-lib-webhooks`](https://github.com/adobe/aio-commerce-sdk/tree/main/packages/aio-commerce-lib-webhooks) to work with the [Adobe Commerce Webhooks API](https://developer.adobe.com/commerce/extensibility/webhooks/) from your App Builder runtime actions. This is separate from [external events](./events.md#external-events) in `app.commerce.config`, which declare subscriptions for I/O Events; the webhooks library manages Commerce webhook subscriptions and builds handler responses.

## Capabilities

* **Webhooks API client** — List, subscribe, and unsubscribe webhook subscriptions in Commerce
* **Webhook operations** — Build responses such as success, exception, add, replace, and remove
* **Action response helpers** — Combine operations with HTTP responses (for example, `ok()`)
* **TypeScript** — Discriminated unions, generics, and preset or builder helpers where applicable

## Installation

Run the following command:

```bash
npm install @adobe/aio-commerce-lib-webhooks
```

## Package entry points

The package exposes dedicated subpaths for tree-shaking:

| Entry | Purpose |
|-------|---------|
| `@adobe/aio-commerce-lib-webhooks/api` | Webhooks API client and standalone API functions |
| `@adobe/aio-commerce-lib-webhooks/responses` | Webhook operations and HTTP response helpers |

## Webhooks API client

Create a client with your Commerce base URL, flavor (`paas` or `saas`), and authentication (IMS or integration, same patterns as other Commerce SDK clients).

```typescript
import { createCommerceWebhooksApiClient } from "@adobe/aio-commerce-lib-webhooks/api";

const client = createCommerceWebhooksApiClient({
  config: {
    baseUrl: "https://my-commerce-instance.com",
    flavor: "paas",
  },
  auth: {
    /* IMS or integration auth params */
  },
});
```

**List subscriptions**

```typescript
const webhooks = await client.getWebhookList();
```

**Subscribe**

```typescript
await client.subscribeWebhook({
  webhook_method: "observer.catalog_product_save_after",
  webhook_type: "after",
  batch_name: "my_batch",
  hook_name: "my_hook",
  url: "https://my-app.com/webhook",
  headers: [{ name: "Authorization", value: "Bearer token123" }],
  fields: [{ name: "product_id", value: "entity_id" }],
});
```

**Unsubscribe**

```typescript
await client.unsubscribeWebhook({ webhook_id: "123" });
```

**Supported webhook methods**

```typescript
const supportedWebhooks = await client.getSupportedWebhookList();
```

### Standalone API functions

You can call `getWebhookList`, `subscribeWebhook`, `unsubscribeWebhook`, and `getSupportedWebhookList` with an `AdobeCommerceHttpClient` from `@adobe/aio-commerce-lib-api` instead of using `createCommerceWebhooksApiClient`. See the [usage guide in the SDK repo](https://github.com/adobe/aio-commerce-sdk/blob/main/packages/aio-commerce-lib-webhooks/docs/usage.md#using-standalone-functions).

## Webhook operations and responses

Handlers return **HTTP 200** with one or more **operations** that tell Commerce how to treat the event (continue, block with a message, add or change payload data, and so on). **HTTP 4xx/5xx** indicates system or validation failures, not business-rule blocks.

Import helpers from `@adobe/aio-commerce-lib-webhooks/responses`:

| Operation | Role |
|-----------|------|
| `successOperation()` | Let the Commerce process continue unchanged |
| `exceptionOperation()` | Block the process with an error message (optional exception class) |
| `addOperation()` | Add data to the event |
| `replaceOperation()` | Replace data on a path in the event |
| `removeOperation()` | Remove data from the event |

Wrap operations with `ok()` (or equivalent) so the runtime returns the shape Commerce expects.

```typescript
import { successOperation, ok } from "@adobe/aio-commerce-lib-webhooks/responses";

export async function handleWebhook(params) {
  return ok(successOperation());
}
```

```typescript
import { exceptionOperation, ok } from "@adobe/aio-commerce-lib-webhooks/responses";

export async function validateStock(params) {
  if (/* out of stock */) {
    return ok(
      exceptionOperation("The product cannot be added to the cart because it is out of stock"),
    );
  }
  return ok(successOperation());
}
```

You can return **multiple operations** in one response; they run in order. For full examples (add, replace, remove, generics), see the [package usage guide](https://github.com/adobe/aio-commerce-sdk/blob/main/packages/aio-commerce-lib-webhooks/docs/usage.md) and [Commerce webhook responses](https://developer.adobe.com/commerce/extensibility/webhooks/responses/).

## Related documentation

* [Adobe Commerce Webhooks](https://developer.adobe.com/commerce/extensibility/webhooks/) references.
* [`aio-commerce-lib-webhooks` on GitHub](https://github.com/adobe/aio-commerce-sdk/tree/main/packages/aio-commerce-lib-webhooks)

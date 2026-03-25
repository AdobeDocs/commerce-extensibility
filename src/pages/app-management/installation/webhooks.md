---
title: Webhooks
description: Hook into real-time Commerce processes with webhooks declared in the app.commerce.config file
keywords:
  - App Builder
  - Extensibility
  - App Management
  - Webhooks
---

# Webhooks

The `webhooks` field in your `app.commerce.config` file declares [Adobe Commerce Webhooks](https://developer.adobe.com/commerce/extensibility/webhooks/) subscriptions for your application. App Management uses this definition so merchants can create webhooks similarly to how [Events](./events.md) are declared for event subscriptions. Webhooks let your app **hook into live Commerce processes**, such as checkout, delivery estimates, or cart validation.

## App developers and merchants

**App developers** declare webhooks in the `webhooks` field of `app.commerce.config`: which Commerce methods to use, batches and hooks, fields, rules, headers, and either a fixed URL or a **runtime action** that resolves the URL after deploy. That manifest is what App Management uses to know which webhook subscriptions belong to your app.

**Merchants** complete whatever App Management and the Commerce Admin require **after** the app is associated—typically confirming or supplying connection details the app cannot hard-code (for example, OAuth or credentials where the Admin stores secrets, or reviewing subscription labels so hooks register against the right instance). The exact steps depend on your app and Commerce edition; see [Install and access App Management](https://experienceleague.adobe.com/en/docs/commerce/app-management/install#access-app-management) and [Commerce webhooks and apps](https://experienceleague.adobe.com/en/docs/commerce/app-management/install#commerce-webhooks-and-apps) on Experience League.

Use [Events](./events.md) and webhooks together when you need both asynchronous event delivery and synchronous hooks inside Commerce processes.

## Webhook entries

Add a `webhooks` array at the top level of `defineConfig`. When present, it must contain **at least one** entry.

Each entry must use **one** of these patterns (not both):

1. **`runtimeAction`**. No `url` inside `webhook`. The runtime action (format `package/action`) supplies the webhook URL at runtime. Optional `requireAdobeAuth` controls Adobe auth on that resolution path.

1. **Explicit `url`**. The nested `webhook` object includes a valid absolute `https` URL. Do not set `runtimeAction` on the entry, or your configuration will be flagged as invalid.

Commerce properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | string | Yes | Display label in App Management. |
| `description` | string | Yes | Description shown in App Management. |
| `category` | string | No | One of `validation`, `append`, or `modification` (used for conflict grouping). |
| `runtimeAction` | string | Conditional | Required when not using an explicit `url` in `webhook`. Runtime action that resolves the webhook URL. |
| `requireAdobeAuth` | boolean | No | When using `runtimeAction`, whether Adobe authentication is required. |
| `webhook` | object | Yes | Webhook method, hook identity, HTTP method, and optional fields, rules, headers, timeouts, and either a `url` or no `url` (if `runtimeAction` is set). |

### Nested `webhook` object

The `webhook` object contains the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `webhook_method` | string | Yes | Commerce webhook method (for example, `observer.catalog_product_save_after`). |
| `webhook_type` | string | Yes | Typically `before` or `after` the original action. |
| `batch_name` | string | Yes | Batch identifier. Letters, numbers, and underscores only. |
| `hook_name` | string | Yes | Hook identifier within the batch. Same character rules as `batch_name`. |
| `method` | string | Yes | HTTP method for the outbound request (for example, `POST`). |
| `url` | string | Conditional | Absolute HTTPS URL. Required when the entry does **not** use `runtimeAction`. Omit when using `runtimeAction`. |
| `batch_order` | number | No | Positive number; order among batches. |
| `priority` | number | No | Positive priority hint. |
| `required` | boolean | No | Whether the hook is required. |
| `soft_timeout` | number | No | Positive soft timeout. |
| `timeout` | number | No | Positive timeout. |
| `fallback_error_message` | string | No | Message if the webhook fails. |
| `ttl` | number | No | Positive TTL for cached responses, when applicable. |
| `fields` | array | No | Payload field mapping. Each item: `name` (required), `source` (optional). |
| `rules` | array | No | Conditional execution. Each item: `field`, `operator`, `value` (all strings). |
| `headers` | array | No | Outbound headers. Each item: `name`, `value`. |

See [Webhooks API reference](../../webhooks/api.md) topic for more information.

## Example with explicit URL

```js
import { defineConfig } from "@adobe/aio-commerce-lib-app/config"

export default defineConfig({
  metadata: {
    // ...
  },
  webhooks: [
    {
      label: "Product save notification",
      description: "POST to your endpoint after a product is saved",
      category: "append",
      webhook: {
        webhook_method: "observer.catalog_product_save_after",
        webhook_type: "after",
        batch_name: "product_batch",
        hook_name: "notify_external",
        method: "POST",
        url: "https://my-app.example.com/webhooks/product-save",
        headers: [
          { name: "Authorization", value: "Bearer ${token}" },
        ],
        fields: [
          { name: "sku", source: "product.sku" },
        ],
      },
    },
  ],
});
```

## Example with runtime action (URL resolved at runtime)

Use this when the webhook URL depends on deployment or configuration resolved by your action (App Management still shows the subscription; the action provides the final URL).

```js
import { defineConfig } from "@adobe/aio-commerce-lib-app/config"

export default defineConfig({
  metadata: {
    // ...
  },
  webhooks: [
    {
      label: "Cart validation",
      description: "Runtime-resolved endpoint for cart validation",
      category: "validation",
      runtimeAction: "my-package/resolve-webhook-url",
      requireAdobeAuth: true,
      webhook: {
        webhook_method: "observer.checkout_cart_product_add_after",
        webhook_type: "after",
        batch_name: "cart_validation",
        hook_name: "stock_check",
        method: "POST",
        rules: [
          { field: "product.qty", operator: "greaterThan", value: "0" },
        ],
      },
    },
  ],
});
```

After changing `webhooks`, rebuild and deploy your app so the `pre-app-build` hook refreshes generated artifacts. See [Build and deploy](../build-deploy.md) for more information.

## Handler implementation (optional)

When your runtime action **handles** the HTTP callback from Commerce, you build the response body with [Webhook operations](https://developer.adobe.com/commerce/extensibility/webhooks/responses/) (success, exception, add, replace, remove). The [`@adobe/aio-commerce-lib-webhooks`](https://github.com/adobe/aio-commerce-sdk/tree/main/packages/aio-commerce-lib-webhooks) package (responses entry point) is optional tooling for that; declaring webhooks in `app.commerce.config` does not require installing it.

## Related documentation

* [Install and access App Management](https://experienceleague.adobe.com/en/docs/commerce/app-management/install#access-app-management) (Experience League) — user guide for App Management in the Admin.
* [Adobe Commerce Webhooks](https://developer.adobe.com/commerce/extensibility/webhooks/) — product concepts and Admin behavior.
* [Webhook responses](https://developer.adobe.com/commerce/extensibility/webhooks/responses/) — operation types for handler actions.

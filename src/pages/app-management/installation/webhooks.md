---
title: Webhooks
description: Configure webhooks in the app.commerce.config file to receive real-time HTTP callbacks when Commerce events occur, such as order creation.
keywords:
  - App Builder
  - Extensibility
  - App Management
  - Webhooks
---

# Webhooks

The `webhooks` field in your `app.commerce.config` file declares [Adobe Commerce Webhook](https://developer.adobe.com/commerce/extensibility/webhooks/) subscriptions for your application. App Management uses that definition during installation to provision the subscriptions your app needs, similar to how [Events](./events.md) subscriptions are driven from your configuration so merchants get an out-of-the-box experience instead of assembling webhook setup themselves. Webhooks allow your app to respond to live Commerce processes, such as checkout, or cart validation.

## Responsibilities by role

**App developers** declare webhooks in the `webhooks` field of `app.commerce.config`. That manifest is what App Management uses to know which webhook subscriptions belong to your app.

**Merchants** complete whatever steps are required for App Management and the Commerce Admin **after** the app is associated. That typically means confirming or supplying connection details that the app cannot hard-code (for example, OAuth or credentials that the Admin stores as secrets, or reviewing subscription labels so hooks register against the right instance). The exact steps depend on your app and Commerce edition. See [Install and access App Management](https://experienceleague.adobe.com/en/docs/commerce/app-management/install#access-app-management) and [Commerce webhooks and apps](https://experienceleague.adobe.com/en/docs/commerce/app-management/install#commerce-webhooks-and-apps) on Experience League.

### Use Events and webhooks together

Use [Events](./events.md) and webhooks when you need both asynchronous event delivery and synchronous hooks inside Commerce processes.

## Webhook entries

Add a `webhooks` array at the top level of `defineConfig`. When present, it must contain **at least one** entry.

Each entry must use **one** of these patterns (not both):

- **`runtimeAction`**. No `url` inside `webhook`. The runtime action (format `package/action`) supplies the webhook URL at runtime. Optional `requireAdobeAuth` controls Adobe auth on that resolution path.

- **Explicit `url`**. The nested `webhook` object includes a valid absolute `https` URL. Do not set `runtimeAction` on the entry, or your configuration will be flagged as invalid.

Each webhook entry uses the following properties:

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

For the full property reference, see [Webhooks API](../../webhooks/api.md).

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

Use this pattern when you resolve the webhook URL at runtime with a `runtimeAction` instead of declaring an explicit URL in configuration.

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

When your runtime action **handles** the HTTP callback from Commerce, you build the response body with [Webhook operations](https://developer.adobe.com/commerce/extensibility/webhooks/responses/) (success, exception, add, replace, remove). The [`@adobe/aio-commerce-lib-webhooks`](https://github.com/adobe/aio-commerce-sdk/tree/main/packages/aio-commerce-lib-webhooks) package (responses entry point) provides optional helpers for that workflow. Declaring webhooks in `app.commerce.config` does not require installing it.

## Related documentation

* [Install and access App Management](https://experienceleague.adobe.com/en/docs/commerce/app-management/install#access-app-management) (Experience League) — user guide for App Management in the Admin.
* [Adobe Commerce Webhooks](https://developer.adobe.com/commerce/extensibility/webhooks/) — product concepts and Admin behavior.
* [Webhook responses](https://developer.adobe.com/commerce/extensibility/webhooks/responses/) — operation types for handler actions.

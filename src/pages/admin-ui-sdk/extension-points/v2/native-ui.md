---
title: Native UI form replacements
description: Replace a supported native Adobe Commerce Admin form with a page from your App Builder application.
edition: paas
keywords:
  - App Builder
  - Extensibility
  - Admin UI SDK
---

# Native UI form replacements

The native UI form replacement extension point replaces a supported Commerce Admin form with an App Builder page rendered in an iframe. Use it to provide a custom experience in place of the native form.

Declare replacements under `adminUi.nativeUi.replacedPages` in `app.commerce.config.ts`. This is a V2 extension point on `commerce/backend-ui/2`, built on [App Management](../../../app-management/index.md).

## Example customization

The following configuration replaces the native order creation form with the app route `#/create-order`:

```typescript
import { defineConfig } from "@adobe/aio-commerce-lib-app/config";

export default defineConfig({
  metadata: {
    id: "custom-order-creation",
    displayName: "Custom order creation",
    version: "1.0.0",
    description: "A custom order creation experience in Commerce Admin.",
  },
  adminUi: {
    nativeUi: {
      replacedPages: [
        {
          target: "order.create",
          path: "#/create-order",
          title: "Create Order (App)",
          sandboxPermissions: ["allow-modals"],
        },
      ],
    },
  },
});
```

## How it works

1. Declare the replacement in `adminUi.nativeUi.replacedPages`.
1. Add a matching route and page in the app's `web-src`. The SDK does not generate the replacement page or verify that the route exists.
1. Run the app's generation and build workflow. When at least one replacement is configured, the SDK includes the Admin UI `view` operation and web source. Registration is served through the generated `app-config` action; no separate registration action or worker handler is needed for the replacement.
1. When the native form is opened in Commerce Admin, Commerce renders the app page at the configured `path` in an iframe.
1. The app reads the context supplied by Commerce through `useNativeUiContext()`. Available context depends on the native form being replaced.

App Management tracks each replacement by its `target` during registration, refresh, and uninstall. See [Build and deploy](../../../app-management/build-deploy.md) for the generation and deployment workflow.

## Supported targets

The following targets are currently supported:

| Target | Native form |
| --- | --- |
| `order.create` | Create order |

Targets not listed above fail app configuration validation. Each target must be unique within the app's `replacedPages` array.

## Parameters

Each entry in `adminUi.nativeUi.replacedPages` accepts the following fields:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `target` | string | Yes | The native form to replace. See [Supported targets](#supported-targets) for accepted values. |
| `path` | string | Yes | A non-empty route in the app's web source, such as `#/create-order`. It must match the route implemented by your frontend. |
| `title` | string | Yes | A non-empty title for the replacement page. |
| `sandboxPermissions` | array of strings | No | Additional iframe permissions. If provided, the array must be non-empty and contain no duplicates. Allowed values are `allow-downloads`, `allow-modals`, and `allow-popups`. |

The replacement entry is a strict object. Fields used by other extension points, such as `id`, `type`, `runtimeAction`, and `aclProtected`, are not accepted.

## ACL protection

A replacement follows the ACL permissions of the native form in Commerce. Admin users must have permission to access the native form to access its replacement. The replacement does not define a separate `aclProtected` resource.

## Read the replacement context

Use `useNativeUiContext` from `@adobe/aio-commerce-lib-admin-ui/web` inside the replacement page. The following example reads customer and store identifiers for an order creation replacement:

```tsx
import { useNativeUiContext } from "@adobe/aio-commerce-lib-admin-ui/web";

export function CreateOrderPage() {
  const { data, error } = useNativeUiContext();

  if (error) {
    return <p role="alert">{error.message}</p>;
  }

  return (
    <dl>
      <dt>Customer</dt>
      <dd>{data.customerId ?? "Not selected"}</dd>
      <dt>Store</dt>
      <dd>{data.storeId ?? "Not provided"}</dd>
    </dl>
  );
}
```

This example displays the context only. Implement the replacement form and its submission logic in your app.

The hook returns `{ data, error }`. On success, `data` contains:

| Property | Type | Description |
| --- | --- | --- |
| `customerId` | string or number, optional | The customer identifier supplied by Commerce, if available. |
| `storeId` | string or number, optional | The store identifier supplied by Commerce, if available. |

The hook preserves identifiers as supplied; it does not convert numbers to strings. Missing or `null` values are omitted, and a context with neither identifier is valid. Handle both identifiers as optional rather than assuming a customer or store has already been selected.

The hook returns an error if a provided identifier is neither a string nor a finite number, or if the page runs outside the Commerce shared context, such as standalone or in the Experience Cloud shell.

## Limitations

* Only one app can replace a given native target on a Commerce instance at a time. Do not install multiple apps that replace the same target on the same instance.
* The SDK validates duplicate targets within one app, but cannot validate conflicts with other apps. Do not rely on SDK validation to detect cross-app conflicts at installation time.
* The app owns the replacement experience, including form behavior, validation, and submission. Replacing the native form does not automatically reproduce its features.

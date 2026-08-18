---
title: App Management helpers
description: Use the helpers that @adobe/aio-commerce-lib-app provides to call the associated Adobe Commerce instance and publish configured I/O Events from App Builder runtime actions.
keywords:
  - App Builder
  - App Management
  - Extensibility
  - Events
---

# App Management helpers

Once an app is associated with an Adobe Commerce instance through App Management, `@adobe/aio-commerce-lib-app` exposes a set of helpers you can call from any runtime action: connecting to the associated Commerce instance, publishing a configured I/O Event, and handling the errors those helpers can throw. This page describes each helper and how to use it. You don't need custom storage or to thread parameters through every layer of the call stack.

<InlineAlert variant="info" slots="text"/>

Every helper on this page (`getCommerceInstance`, `getCommerceClient`, `publishEvent`, `resolveIoEventCode`, and the error classes in [Handle errors](#handle-errors)) is available since `@adobe/aio-commerce-lib-app` version 1.8.0.

## Connect to the associated Commerce instance

`@adobe/aio-commerce-lib-app` stores the Commerce instance an app is associated with, so any runtime action can retrieve it or call the Commerce API without custom storage.

### How association is stored

Every app generated with `@adobe/aio-commerce-lib-app` includes a standalone `association` runtime action alongside `app-config`. App Management calls it automatically during the association lifecycle: you don't call it yourself.

* **During association**: stores the Commerce instance's `baseUrl` and `env` (`"saas"` or `"paas"`).
* **During unassociation**: clears the stored data when the app.

<InlineAlert variant="info" slots="text"/>

Apps scaffolded before this feature shipped don't have the `association` action yet. After upgrading `@adobe/aio-commerce-lib-app`, run `npx aio-commerce-lib-app generate actions` (or `generate all`) and redeploy so the endpoint exists. A plain `aio app deploy` does not add it: the `pre-app-build` hook only regenerates actions already declared in `ext.config.yaml`. If the app was already associated under the older SDK, re-associate it after redeploying so the store call runs and backfills the instance data.

Two helpers are exported from `@adobe/aio-commerce-lib-app` to read that stored data back:

| Helper | Returns |
|--------|---------|
| `getCommerceClient(auth, fetchOptions?)` | A ready-to-use `AdobeCommerceHttpClient` for calling the Commerce API. |
| `getCommerceInstance()` | The raw `{ baseUrl, env }` association data. |

Both throw `AssociationRecordNotFoundError` if the app is not currently associated, was unassociated, or was associated by an older SDK that did not store this data. See [Handle errors](#handle-errors).

### Get a ready-to-use client

`getCommerceClient` builds the base URL and flavor from the stored association data; you supply the resolved IMS auth. App Management requires IMS, so `auth` accepts only IMS auth: resolve it with `resolveImsAuthParams` (available since `@adobe/aio-commerce-lib-auth` version 1.0.1) from `@adobe/aio-commerce-lib-auth`, or pass an `ImsAuthProvider` built with `getImsAuthProvider` or `forwardImsAuthProvider`. The optional `fetchOptions` ([ky](https://github.com/sindresorhus/ky#options) options such as `headers`, `timeout`, or `retry`) are forwarded to the underlying client.

```js
import { getCommerceClient } from "@adobe/aio-commerce-lib-app";
import { resolveImsAuthParams } from "@adobe/aio-commerce-lib-auth";

export async function main(params) {
  const client = await getCommerceClient(resolveImsAuthParams(params));
  const products = await client.get("products").json();
}
```

### Get the raw instance data

Use `getCommerceInstance` when you only need the metadata: for example, for logging or to build a custom client.

```js
import { getCommerceInstance } from "@adobe/aio-commerce-lib-app";

export async function main() {
  const instance = await getCommerceInstance();

  // instance.baseUrl: Commerce API base URL
  // instance.env: "saas" | "paas"
}
```

### Handle the unassociated state

Wrap the call in `try`/`catch` to respond gracefully when the app isn't associated yet:

```js
import { badRequest, ok } from "@adobe/aio-commerce-lib-core/responses";
import {
  AssociationRecordNotFoundError,
  getCommerceClient,
} from "@adobe/aio-commerce-lib-app";
import { resolveImsAuthParams } from "@adobe/aio-commerce-lib-auth";

export async function main(params) {
  try {
    const client = await getCommerceClient(resolveImsAuthParams(params));
    return ok({ body: await client.get("products").json() });
  } catch (error) {
    if (error instanceof AssociationRecordNotFoundError) {
      return badRequest({
        body: { message: "App is not associated with a Commerce instance." },
      });
    }
    throw error;
  }
}
```

## Publish a configured event

Runtime actions can publish a custom I/O Event by referencing the provider and event exactly as declared in the `eventing` section of `app.commerce.config`. At installation time, the SDK writes each configured provider's I/O Events ID and event codes to system storage. `publishEvent` resolves those automatically by key and name and publishes the event.

`publishEvent(params)` takes:

| Property | Description |
|----------|-------------|
| `client` | An `AdobeIoEventsApiClient` (from `@adobe/aio-commerce-lib-events`) created with the IMS auth to use for the ingress call. |
| `provider` | The `key` of an event provider declared in `app.commerce.config`. |
| `event` | The `name` of an event declared under that provider. |
| `payload` | The event payload: any JSON object. The SDK wraps it in a CloudEvents 1.0 envelope before sending. |

<InlineAlert variant="info" slots="text"/>

In general, prefer to use `publishEvent` for your app's own **external** events (declared under `eventing.external`). Adobe Commerce publishes its own Commerce events (declared under `eventing.commerce`) for you; your app subscribes to those with `runtimeActions` instead of publishing them.

For example, declare an external provider with `key: "order-events"` and an event named `order.created` in `app.commerce.config` (see [Events](installation/events.md) and [Provider configuration](installation/events.md#provider-configuration)):

```js
import { defineConfig } from "@adobe/aio-commerce-lib-app/config";

export default defineConfig({
  metadata: {
    // ...
  },
  eventing: {
    external: [
      {
        provider: {
          key: "order-events",
          label: "Order Events",
          description: "Events published when an order changes",
        },
        events: [
          {
            name: "order.created",
            label: "Order Created",
            description: "Triggered when a new order is created",
            runtimeActions: ["my-package/handle-order-created"],
          },
        ],
      },
    ],
  },
});
```

A runtime action then publishes it by referencing the same `key` and event `name`:

```js
import { publishEvent } from "@adobe/aio-commerce-lib-app";
import { createAdobeIoEventsApiClient } from "@adobe/aio-commerce-lib-events";
import { resolveImsAuthParams } from "@adobe/aio-commerce-lib-auth";

export async function main(params) {
  const client = createAdobeIoEventsApiClient({
    auth: resolveImsAuthParams(params),
    config: { ingressBaseUrl: params.AIO_EVENTS_INGRESS_BASE_URL },
  });

  await publishEvent({
    client,
    provider: "order-events",
    event: "order.created",
    payload: { orderId: "100000123", total: 149.99 },
  });
}
```

### Resolve an event's I/O Events code ahead of time

`resolveIoEventCode(appId, eventName, providerType)` computes the same event code `publishEvent` sends, matching the prefixing rules used at installation time. This is useful when a caller needs to know an event's code in advance: for example, to match it against an incoming I/O Event.

| Property | Description |
|----------|-------------|
| `appId` | The application's [`metadata.id`](app-metadata.md#metadata-properties), as declared in `app.commerce.config`. |
| `eventName` | The `name` of the event, as declared in `app.commerce.config`. |
| `providerType` | `"commerce"` or `"external"`, matching the section the event is declared under. |

```js
import { resolveIoEventCode } from "@adobe/aio-commerce-lib-app";

resolveIoEventCode("my-app", "observer.order_placed", "commerce");
// => "com.adobe.commerce.my_app.observer.order_placed"

resolveIoEventCode("my-app", "webhook.received", "external");
// => "my_app.webhook.received"
```

Instead of hardcoding `appId`, read it from the generated [`#app.commerce.config`](build-deploy.md#generated-files) import:

```js
import { resolveIoEventCode } from "@adobe/aio-commerce-lib-app";
import appConfig from "#app.commerce.config";

const eventCode = resolveIoEventCode(appConfig.metadata.id, "order.created", "external");
```

## Handle errors

`@adobe/aio-commerce-lib-app` exports five typed error classes for the helpers on this page. `PublishEventError` is the base class for the three `publishEvent` errors, so you can catch it alone to handle any publish failure, or narrow with `instanceof` on the specific subclass.

| Error | Thrown by | Trigger |
|-------|-----------|---------|
| `AssociationRecordNotFoundError` | `getCommerceInstance`, `getCommerceClient` | The app is not associated, was unassociated, or was associated by an older SDK that didn't store this data. Re-associate the app to resolve it. |
| `PublishEventError` | `publishEvent` | Base class for the three errors below: catch this to handle any publish failure in one clause. |
| `EventsDataNotInitializedError` | `publishEvent` | No eventing installation data is in system storage. The app installation hasn't run yet, or ran with an older SDK. Re-run the installation to initialize it. |
| `ProviderNotFoundError` | `publishEvent` | The `provider` key doesn't match any provider declared in `app.commerce.config`. |
| `EventNotFoundError` | `publishEvent` | The `event` name doesn't match any event declared under the given provider. |

```js
import {
  EventNotFoundError,
  EventsDataNotInitializedError,
  ProviderNotFoundError,
  PublishEventError,
  publishEvent,
} from "@adobe/aio-commerce-lib-app";

try {
  await publishEvent({ client, provider, event, payload });
} catch (error) {
  if (error instanceof EventsDataNotInitializedError) {
    // The app installation hasn't run, or ran with an older SDK.
  } else if (error instanceof ProviderNotFoundError) {
    // The provider key doesn't match app.commerce.config.
  } else if (error instanceof EventNotFoundError) {
    // The event name doesn't match app.commerce.config.
  } else if (error instanceof PublishEventError) {
    // Any other publish-event failure.
  } else {
    throw error;
  }
}
```

## Related topics

* [Events](installation/events.md): Declare the `eventing` provider and event configuration that `publishEvent` and `resolveIoEventCode` reference.
* [Business configuration > Retrieve configuration at runtime](configuration-schema.md#retrieve-configuration-at-runtime): Read or write business configuration values from a runtime action.

---
title: Purchase Approval reference app
description: A complete App Builder reference application that implements a B2B purchase-approval workflow for Adobe Commerce using App Management, webhooks, events, and the Admin UI SDK.
keywords:
  - App Builder
  - App Management
  - Extensibility
  - Webhooks
  - Events
  - Admin UI SDK
---

# Purchase Approval reference app

The **Purchase Approval** app is a complete, end-to-end App Builder reference application that implements a B2B purchase-approval workflow for Adobe Commerce. It is a real-world example that combines several extensibility technologies in a single app: [App Management](./index.md) for installation and configuration, [Webhooks](../webhooks/index.md) for real-time checkout evaluation, [Adobe I/O Events](../events/index.md) for an order-driven workflow, and the [Admin UI SDK](../admin-ui-sdk/index.md) for an in-Admin approver experience.

Use it as a starting point or as a reference for how these components fit together. See [Get the code](#get-the-code) for the source repository and setup steps.

<InlineAlert variant="info" slots="text" />

This code is provided as a learning reference. It is not production-ready and should not be deployed as-is in a production environment without further review of security, performance, and error handling.

## What it demonstrates

The app shows how a single App Builder application can participate in the entire lifecycle of a business scenario:

1. **Install and configure** — The app is installed from Adobe Exchange, associated with a Commerce instance in the App Management view, and configured (approval threshold, currency, approver emails) through the auto-generated Admin UI — no custom configuration UI code is required.
2. **Checkout evaluation** — At checkout, Commerce calls the app through a webhook to evaluate the approval policy in real time and flag orders that require approval.
3. **Event-driven workflow** — When an order is placed, Commerce emits an order event; for orders at or above the configured approval threshold, the app's event handler creates an approval request in an App Builder Database.
4. **Approver dashboard** — A lightweight single-page app (React + Adobe Spectrum), surfaced through the Admin UI SDK, lets finance or procurement reviewers list pending approvals and approve or reject orders.
5. **Observability** — An execution log, stored alongside the approval requests in the App Builder Database, records webhook and event-handler invocations for troubleshooting.

## Extension points

The app registers three Commerce extension points, declared in `app.config.yaml` and `app.commerce.config.ts`:

| Extension point | Purpose |
|---|---|
| `commerce/configuration/1` | Business configuration schema (approval threshold, currency, approver emails) rendered by the App Management Admin UI. |
| `commerce/extensibility/1` | Checkout approval webhook subscription and the order-placed event subscription. |
| `commerce/backend-ui/2` | Admin menu entry, order grid columns, and the approver dashboard SPA (requires Admin UI SDK 3.3.1 or greater). |

## How it works

### Installation and configuration

The app is defined with [`@adobe/aio-commerce-lib-app`](./index.md#sdk-libraries) and [`@adobe/aio-commerce-lib-config`](./index.md#sdk-libraries). The configuration schema in `app.commerce.config.ts` drives the auto-generated [business configuration](./configuration-schema.md) form, where an app manager sets:

* **Approval threshold amount** — orders at or above this value require approval.
* **Currency code** — for example, `USD`.
* **Approver emails** — a comma-separated list for reference.
* **Approval message** — added to the order as a comment when the checkout webhook holds an order.

For the general install-and-associate flow, see [Installation](./installation/index.md).

### Checkout webhook

The `commerce/extensibility/1` extension registers a webhook subscription on `observer.sales_order_place_before` (type `after`). Commerce sends the order payload to the app's runtime action, which compares the order total against the configured threshold. For an order at or above the threshold, the action places the order on hold in Commerce (via REST) and adds the approval message as an order comment, then returns webhook operations that set the order status to `holded` and store the approval message as a custom attribute. Orders below the threshold pass through unchanged. The webhook uses Adobe IMS authentication (`require-adobe-auth`), which is a SaaS-only capability; on PaaS, configure authorization in `webhooks.xml` or use [signature verification](../webhooks/signature-verification.md). See [Webhooks installation](./installation/webhooks.md) for how webhook subscriptions are provisioned during app installation.

### Order-placed event

The app subscribes to the `observer.checkout_submit_all_after` event (declared under `eventing.commerce` in `app.commerce.config.ts`), which is provisioned automatically for the app's event provider during installation. When an order is placed, the event handler evaluates the order total against the configured threshold and, for orders at or above it, creates an approval request in an App Builder Database (via `@adobe/aio-lib-db`). Approval requests and the execution log are stored in this database in separate collections. See [Events installation](./installation/events.md) for how event subscriptions are provisioned.

### Approver dashboard

Through the `commerce/backend-ui/2` extension point, the app adds an Admin menu entry and order grid columns, and serves an approver dashboard SPA where reviewers list pending approvals and approve or reject orders. Approving an order releases the hold in Commerce and returns it to the `pending` status; rejecting an order cancels it. In both cases the app writes an order comment back to Commerce via REST and updates the approval request. This requires [Admin UI SDK](../admin-ui-sdk/index.md) 3.3.1 or greater.

## Prerequisites

* Node.js 24 or later.
* An Adobe Developer Console project and workspace, with Adobe I/O Runtime for deployment.
* [Admin UI SDK](../admin-ui-sdk/index.md) 3.3.1 or greater, enabled and configured — required for the `commerce/backend-ui/2` extension point.
* The Commerce Webhooks module and the Adobe I/O Events for Commerce module, both enabled — required for the checkout webhook and the order-placed event subscription.
* Adobe Commerce 2.4.5 or later. The app runs on both Adobe Commerce as a Cloud Service (SaaS) and Adobe Commerce on PaaS/on-premises, and authenticates to Commerce with Adobe IMS in both cases (via `@adobe/aio-commerce-lib-auth`), so no Commerce integration (OAuth1) credentials are required. Note that the checkout webhook's IMS authentication (`require-adobe-auth`) is SaaS-only; on PaaS, configure the webhook's authorization as described in [Checkout webhook](#checkout-webhook) above.

## Get the code

Clone or browse the sample repository, then follow the setup steps in the sample README.

 * Source code: [Purchase Approval reference app](https://github.com/adobe/adobe-commerce-samples/tree/main/purchase-approval)

To build and deploy the app, install dependencies, generate the manifest and App Management actions by running `npx aio-commerce-lib-app generate all`, and then deploy it with App Builder. Follow the sample `README.md` for the complete step-by-step instructions.

## Related documentation

* [App Management overview](./index.md)
* [Define your app](./define-app.md)
* [Business configuration](./configuration-schema.md)
* [Installation](./installation/index.md)
* [Webhooks](../webhooks/index.md)
* [Adobe I/O Events](../events/index.md)
* [Admin UI SDK](../admin-ui-sdk/index.md)

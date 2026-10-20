---
title: invoice view button
description: Add custom iframe and runtime action buttons to the invoice detail page in the Adobe Commerce Admin.
edition: paas
keywords:
  - App Builder
  - Extensibility
  - Admin UI SDK
---

# invoice view button

The `invoice view button` extension point adds custom buttons to the invoice detail page in the Adobe Commerce Admin. Declare buttons under `adminUi.invoice.viewButtons` in `app.commerce.config.ts`. Use `type: "view"` to open an app page in an iframe, or `type: "worker"` to invoke a runtime action without displaying an iframe.

## Example customization

The following configuration adds an **Invoice details** button that opens an iframe and a **Send invoice** button that invokes a runtime action after confirmation:

```typescript
adminUi: {
  invoice: {
    viewButtons: [
      {
        id: "invoice-details",
        label: "Invoice details",
        type: "view",
        path: "#/invoice-details",
        title: "Custom invoice details",
        level: 0,
        sortOrder: 100,
        sandboxPermissions: ["allow-modals"],
      },
      {
        id: "send-invoice",
        label: "Send invoice",
        type: "worker",
        runtimeAction: "invoice/send",
        timeout: 15,
        sortOrder: 110,
        confirm: { message: "Send this invoice?" },
        notifications: {
          success: "Invoice sent successfully.",
          error: "Unable to send the invoice.",
        },
      },
    ],
  },
}
```

V2 registration is served through the generated `app-config` action. The SDK generates the required web and worker operation declarations and includes invoice buttons in installation and upgrade planning. Implement the frontend route or runtime handler referenced by each button. See [Build and deploy](../../../../app-management/build-deploy.md).

## How it works

1. A merchant opens an invoice in Commerce Admin.
1. Commerce renders the buttons declared in `invoice.viewButtons` alongside the built-in buttons.
1. If configured, Commerce shows a confirmation dialog before running the action.
1. A `view` button opens the configured `path` in an iframe. The page reads the invoice ID with `useInvoiceViewButtonContext()` and closes with `useHostConnection()`.
1. A `worker` button invokes the configured `runtimeAction` with the invoice ID. No iframe is shown.
1. Commerce uses the configured success or error notifications when the action completes.

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | A non-empty button identifier. IDs must be unique within `invoice.viewButtons` after Commerce ID sanitization. |
| `label` | string | Yes | A non-empty label displayed on the button. |
| `description` | string | No | A non-empty description of the button. |
| `type` | string | Yes | Either `view` (opens an iframe) or `worker` (invokes a runtime action). |
| `path` | string | Only for `type: "view"` | A non-empty route in the app's frontend, such as `#/invoice-details`. |
| `title` | string | No; `view` only | A non-empty title for the iframe page. Not supported on `worker` buttons. |
| `sandboxPermissions` | array of strings | No; `view` only | Additional iframe permissions. If provided, the array must be non-empty and contain no duplicates. Allowed values are `allow-downloads`, `allow-modals`, and `allow-popups`. |
| `runtimeAction` | string | Only for `type: "worker"` | The runtime action in `<package>/<action>` format from the app's runtime manifest. The SDK generates its `workerProcess` declaration. |
| `timeout` | number | No; `worker` only | A positive request timeout in seconds. |
| `confirm.title` | string | No | The title of the confirmation dialog. |
| `confirm.message` | string | No | The message displayed in the confirmation dialog. |
| `level` | integer | No | The toolbar position: `-1` (left), `0` (center), or `1` (right). |
| `sortOrder` | number | No | A positive number controlling the button's order within its level. |
| `notifications.success` | string | No | The success banner message shown when the action completes successfully. |
| `notifications.error` | string | No | The error banner message shown when the action fails. |
| `aclProtected` | boolean | No | When `true`, gates the button behind a dedicated Commerce ACL resource scoped to the app. The default is `false`. |

The variants are strict. Setting `runtimeAction` or `timeout` on a `view` button, or `path`, `title`, or `sandboxPermissions` on a `worker` button, fails configuration validation.

## Read the iframe context

`useInvoiceViewButtonContext()` returns `{ data, error }`, with `data.invoiceId` as a string on success. It reads `invoiceId` from the page URL's search parameters or hash-route query, not from the Commerce shared context. A missing or blank invoice ID returns an error.

```tsx
import {
  useHostConnection,
  useInvoiceViewButtonContext,
} from "@adobe/aio-commerce-lib-admin-ui/web";

export function InvoiceDetailsPage() {
  const { data, error } = useInvoiceViewButtonContext();
  const { actions, error: hostError } = useHostConnection();

  if (error || hostError) {
    return <p role="alert">{(error || hostError)?.message}</p>;
  }

  return (
    <div>
      <p>Invoice: {data.invoiceId}</p>
      <button onClick={() => actions.close()}>Done</button>
    </div>
  );
}
```

Call `actions.close()` to complete the iframe flow and return to the originating invoice, or `actions.closeWithError()` to return with an error indication.

## Implement a worker handler

Use the helpers exported by `@adobe/aio-commerce-lib-admin-ui/invoice-view-buttons` to parse requests and build responses:

```typescript
import {
  okInvoiceViewButtonResponse,
  parseInvoiceViewButtonRequest,
} from "@adobe/aio-commerce-lib-admin-ui/invoice-view-buttons";

import { sendInvoice } from "./invoice-service.js";

export async function main(params: unknown) {
  const { invoiceId } = parseInvoiceViewButtonRequest(params);
  await sendInvoice(invoiceId);

  return okInvoiceViewButtonResponse();
}
```

Implement `sendInvoice` in your app's `invoice-service.js` module to perform the business operation.

The parsed request contains three required, non-empty strings:

| Field | Description |
| --- | --- |
| `requestId` | The identifier of the request. |
| `id` | The identifier of the clicked button. |
| `invoiceId` | The invoice being viewed. An `orderId` cannot substitute for this field. |

`parseInvoiceViewButtonRequest` strips extra runtime parameters and throws `CommerceSdkValidationError` for malformed requests. `okInvoiceViewButtonResponse()` returns HTTP 200 with an empty `{}` body. To report a failure, return `invoiceViewButtonErrorResponse(statusCode, message)`, which preserves the supplied HTTP status and returns `{ message }` in the body.

## ACL protection

Set `aclProtected: true` to generate a dedicated resource for the invoice button. Commerce administrators can grant or restrict that resource per role. See [Access control list protection](../index.md#access-control-list-protection).

In a protected worker handler, check permissions with `getAdminUiPermissionClient` before performing the operation. Derive the resource ID with `getInvoiceViewButtonAclResourceId(metadataId, buttonId)` from `@adobe/aio-commerce-lib-admin-ui/invoice-view-buttons`. Use the clicked button's `id`, not `invoiceId`. See [ACL-protected extension points](../../../../app-management/installation/admin-ui-sdk.md#acl-protected-extension-points) for the permission-check pattern.

---
title: return view button
description: Add custom iframe and runtime action buttons to return detail pages in the Adobe Commerce Admin.
keywords:
  - App Builder
  - Extensibility
  - Admin UI SDK
---

# return view button

The `return view button` extension point adds custom buttons to return (RMA) detail pages in the Adobe Commerce Admin. Starting with Admin UI SDK 5.2.0, declare buttons under `adminUi.rma.viewButtons` in `app.commerce.config`. Use `type: "view"` to open an app page in an iframe, or `type: "worker"` to invoke a runtime action without an iframe.

This extension point adds buttons to an existing return. To replace the **New Return** form instead, use the [`return.create` native UI replacement](../native-ui.md#supported-targets).

## Example customization

```typescript
adminUi: {
  rma: {
    viewButtons: [
      {
        id: "return-details",
        label: "Return details",
        type: "view",
        path: "#/return",
        title: "Custom return details",
        sandboxPermissions: ["allow-modals"],
      },
      {
        id: "custom-return-flow",
        label: "Custom Return Flow",
        type: "worker",
        runtimeAction: "rma/custom-flow",
        timeout: 15,
        confirm: { message: "Run the custom return flow?" },
        notifications: {
          success: "Custom return flow completed.",
          error: "Unable to run the custom return flow.",
        },
      },
    ],
  },
}
```

Registration is served through the generated `app-config` action. Run `npx aio-commerce-lib-app generate all` to register worker operations and scaffold web assets when needed. Implement each referenced frontend route or runtime handler. See [Build and deploy](../../../../app-management/build-deploy.md).

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | A non-empty button identifier, unique within `rma.viewButtons` after Commerce ID sanitization. |
| `label` | string | Yes | A non-empty button label. |
| `description` | string | No | A non-empty description of the button. |
| `type` | string | Yes | `view` opens an iframe; `worker` invokes a runtime action. |
| `path` | string | For `view` | A non-empty frontend route, such as `#/return`. |
| `title` | string | No; `view` only | A non-empty iframe page title. |
| `sandboxPermissions` | array of strings | No; `view` only | Additional iframe permissions: `allow-downloads`, `allow-modals`, or `allow-popups`. If provided, the array must be non-empty with no duplicates. |
| `runtimeAction` | string | For `worker` | The runtime manifest action in `<package>/<action>` format. |
| `timeout` | number | No; `worker` only | A positive request timeout in seconds. |
| `confirm.title` | string | No | Confirmation dialog title. |
| `confirm.message` | string | No | Confirmation dialog message. |
| `level` | integer | No | Toolbar position: `-1` (left), `0` (center), or `1` (right). |
| `sortOrder` | number | No | A positive number controlling order within the level. |
| `notifications.success` | string | No | Success banner message. |
| `notifications.error` | string | No | Error banner message. |
| `aclProtected` | boolean | No | Generates a dedicated Commerce ACL resource when `true`. Defaults to `false`. |

The variants are strict: `runtimeAction` and `timeout` are not allowed on `view` buttons; `path`, `title`, and `sandboxPermissions` are not allowed on `worker` buttons.

## Read the iframe context

Register a frontend route matching the configured `path`. `useRmaViewButtonContext()` reads `rmaId` from the URL search parameters or hash-route query and returns `{ data, error }`. Handle context and host errors before accessing the return ID or host actions:

```tsx
import {
  useHostConnection,
  useRmaViewButtonContext,
} from "@adobe/aio-commerce-lib-admin-ui/web";

export function ReturnDetailsPage() {
  const { data, error } = useRmaViewButtonContext();
  const { actions, error: hostError } = useHostConnection();

  if (error || hostError) {
    return <p role="alert">{(error || hostError)?.message}</p>;
  }

  return (
    <div>
      <p>Return: {data.rmaId}</p>
      <button onClick={() => actions.close()}>Done</button>
    </div>
  );
}
```

Use `actions.close()` to complete the flow, or `actions.closeWithError()` to signal failure.

## Implement a worker handler

Commerce POSTs `{ rmaId, buttonId }` and supplies the request ID in the `X-Request-ID` header. Pass raw runtime action parameters to `parseRmaViewButtonRequest`; it maps `buttonId` to `id` and the header in `__ow_headers` to `requestId`.

```typescript
import {
  okRmaViewButtonResponse,
  parseRmaViewButtonRequest,
} from "@adobe/aio-commerce-lib-admin-ui/rma-view-buttons";

import { processReturn } from "./return-service.js";

export async function main(params: unknown) {
  const { rmaId } = parseRmaViewButtonRequest(params);
  await processReturn(rmaId);
  return okRmaViewButtonResponse();
}
```

Implement `processReturn` in your app's `return-service.js` module.

The parsed request contains required non-empty strings `requestId`, `id` (clicked button), and `rmaId` (return being viewed). An `orderId` cannot substitute for `rmaId`. Extra runtime parameters are stripped; malformed requests throw `CommerceSdkValidationError`.

`okRmaViewButtonResponse()` returns HTTP 200 with an empty `{}` body. `rmaViewButtonErrorResponse(statusCode, message)` preserves the supplied status and returns `{ message }`.

## ACL protection

Set `aclProtected: true` to generate a dedicated resource for the return button. In protected runtime handlers, derive the resource with `getRmaViewButtonAclResourceId(metadataId, buttonId)` from `@adobe/aio-commerce-lib-admin-ui/rma-view-buttons` and check it with `getAdminUiPermissionClient` before performing the operation. Use the clicked button's `id`, not `rmaId`, and the return-specific helper, not the order helper.

See [ACL-protected extension points](../../../../app-management/installation/admin-ui-sdk.md#acl-protected-extension-points) for the permission-check pattern.

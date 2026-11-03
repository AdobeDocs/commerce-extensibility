---
title: credit memo view button
description: Add custom iframe and runtime action buttons to the credit memo detail page in the Adobe Commerce Admin.
edition: paas
keywords:
  - App Builder
  - Extensibility
  - Admin UI SDK
---

# credit memo view button

The `credit memo view button` extension point adds custom buttons to the credit memo detail page in the Adobe Commerce Admin. Declare buttons under `adminUi.creditMemo.viewButtons` in `app.commerce.config.ts`. Use `type: "view"` to open an app page in an iframe, or `type: "worker"` to invoke a runtime action without displaying an iframe.

## Example customization

The following configuration adds a **Credit memo details** button that opens an iframe and a **Send credit memo** button that invokes a runtime action after confirmation:

```typescript
adminUi: {
  creditMemo: {
    viewButtons: [
      {
        id: "credit-memo-details",
        label: "Credit memo details",
        type: "view",
        path: "#/credit-memo-details",
        title: "Custom credit memo details",
        level: 0,
        sortOrder: 100,
        sandboxPermissions: ["allow-modals"],
      },
      {
        id: "send-credit-memo",
        label: "Send credit memo",
        type: "worker",
        runtimeAction: "credit-memo/send",
        timeout: 15,
        sortOrder: 110,
        confirm: { message: "Send this credit memo?" },
        notifications: {
          success: "Credit memo sent successfully.",
          error: "Unable to send the credit memo.",
        },
      },
    ],
  },
}
```

V2 registration is served through the generated `app-config` action. The SDK generates the required web and worker operation declarations and includes credit memo buttons in installation and upgrade planning. Implement the frontend route or runtime handler referenced by each button. See [Build and deploy](../../../../app-management/build-deploy.md).

## How it works

1. A merchant opens a credit memo in Commerce Admin.
1. Commerce renders the buttons declared in `creditMemo.viewButtons` alongside the built-in buttons.
1. If configured, Commerce shows a confirmation dialog before running the action.
1. A `view` button opens the configured `path` in an iframe. The page reads the credit memo ID with `useCreditMemoViewButtonContext()` and closes with `useHostConnection()`.
1. A `worker` button invokes the configured `runtimeAction` with the credit memo ID. No iframe is shown.
1. Commerce uses the configured success or error notifications when the action completes.

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | A non-empty button identifier. IDs must be unique within `creditMemo.viewButtons` after Commerce ID sanitization. |
| `label` | string | Yes | A non-empty label displayed on the button. |
| `description` | string | No | A non-empty description of the button. |
| `type` | string | Yes | Either `view` (opens an iframe) or `worker` (invokes a runtime action). |
| `path` | string | Only for `type: "view"` | A non-empty route in the app's frontend, such as `#/credit-memo-details`. |
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

`useCreditMemoViewButtonContext()` returns `{ data, error }`, with `data.creditMemoId` as a string on success. It reads `creditMemoId` from the page URL's search parameters or hash-route query, not from the Commerce shared context. A missing or blank credit memo ID returns an error.

```tsx
import {
  useCreditMemoViewButtonContext,
  useHostConnection,
} from "@adobe/aio-commerce-lib-admin-ui/web";

export function CreditMemoDetailsPage() {
  const { data, error } = useCreditMemoViewButtonContext();
  const { actions, error: hostError } = useHostConnection();

  if (error || hostError) {
    return <p role="alert">{(error || hostError)?.message}</p>;
  }

  return (
    <div>
      <p>Credit memo: {data.creditMemoId}</p>
      <button onClick={() => actions.close()}>Done</button>
    </div>
  );
}
```

Call `actions.close()` to complete the iframe flow and return to the originating credit memo, or `actions.closeWithError()` to return with an error indication.

## Implement a worker handler

Use the helpers exported by `@adobe/aio-commerce-lib-admin-ui/credit-memo-view-buttons` to parse requests and build responses:

```typescript
import {
  okCreditMemoViewButtonResponse,
  parseCreditMemoViewButtonRequest,
} from "@adobe/aio-commerce-lib-admin-ui/credit-memo-view-buttons";

import { sendCreditMemo } from "./credit-memo-service.js";

export async function main(params: unknown) {
  const { creditMemoId } = parseCreditMemoViewButtonRequest(params);
  await sendCreditMemo(creditMemoId);

  return okCreditMemoViewButtonResponse();
}
```

Implement `sendCreditMemo` in your app's `credit-memo-service.js` module to perform the business operation.

The parsed request contains three required, non-empty strings:

| Field | Description |
| --- | --- |
| `requestId` | The identifier of the request. |
| `id` | The identifier of the clicked button. |
| `creditMemoId` | The credit memo being viewed. |

`parseCreditMemoViewButtonRequest` strips extra runtime parameters and throws `CommerceSdkValidationError` for malformed requests. `okCreditMemoViewButtonResponse()` returns HTTP 200 with an empty `{}` body. To report a failure, return `creditMemoViewButtonErrorResponse(statusCode, message)`, which preserves the supplied HTTP status and returns `{ message }` in the body.

## ACL protection

Set `aclProtected: true` to generate a dedicated resource for the credit memo button. Commerce administrators can grant or restrict that resource per role. See [Access control list protection](../index.md#access-control-list-protection).

In a protected worker handler, check permissions with `getAdminUiPermissionClient` before performing the operation. Derive the resource ID with `getCreditMemoViewButtonAclResourceId(metadataId, buttonId)` from `@adobe/aio-commerce-lib-admin-ui/credit-memo-view-buttons`. Use the clicked button's `id`, not `creditMemoId`. See [ACL-protected extension points](../../../../app-management/installation/admin-ui-sdk.md#acl-protected-extension-points) for the permission-check pattern.

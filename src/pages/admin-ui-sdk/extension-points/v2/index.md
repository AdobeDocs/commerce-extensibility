---
title: Extension points (V2)
description: Learn about the Admin UI SDK V2 extension points built on App Management.
edition: paas
keywords:
  - App Builder
  - Extensibility
---

# Adobe Commerce Admin UI SDK V2 extension points

This topic describes how to use the `commerce/backend-ui/2` extension points in any Adobe Developer App Builder application that customizes Adobe Commerce Admin. These extension points are built on [App Management](../../../app-management/index.md), the current foundation for Admin UI SDK extensions, and replace the [V1 extension points](../index.md), which are deprecated and will be removed in a future release.

The [Adobe Commerce Samples repository](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/v2) contains samples for each V2 extension point. Use these samples to see how App Management projects register menus, mass actions, view buttons, and grid columns with the Admin Commerce UI.

## Declaring extension points

V2 extension points are declared in a single `app.commerce.config.ts` file at the root of your App Builder project, using `defineConfig` from `@adobe/aio-commerce-lib-app/config`. There is no `ExtensionRegistration` component to implement, and no separate registration runtime action to deploy.

```typescript
import { defineConfig } from '@adobe/aio-commerce-lib-app/config'

export default defineConfig({
  metadata: {
    id: 'custommenu',
    displayName: 'Adobe Commerce custom menu',
    version: '1.0.0',
    description: 'Adobe Commerce custom menu example in admin panel',
  },
  adminUi: {
    menu: {
      id: 'CustomMenu::first',
      label: 'First App on App Builder',
      pageTitle: 'Adobe Commerce First App on App Builder',
      description: 'First App on App Builder',
    },
  },
})
```

The `adminUi` object is where every extension point in this section is registered:

* [menu](menu.md) &mdash; a single object at `adminUi.menu`.
* [customer](customer/index.md), [order](order/index.md), and [product](product/index.md) &mdash; each accepts `massActions` and `gridColumns`; `order` additionally accepts `viewButtons`.

## Access control list protection

Any menu item, mass action, view button, or grid column can be gated behind a dedicated Commerce ACL resource by setting `aclProtected: true`:

```typescript
{
  id: 'flag-orders',
  label: 'Flag for review',
  type: 'view',
  path: '#/flag-orders',
  aclProtected: true,
}
```

When `aclProtected` is `true`, Commerce generates a nested ACL resource scoped to your app so administrators can grant or restrict access to individual menu items, mass actions, view buttons, or grid columns per admin role. When `aclProtected` is omitted or `false`, the item uses the shared `Magento_CommerceBackendUix::adminuisdk_extensions` resource used by all unprotected V2 extension points.

## Reading context in your app

V2 iframe pages read context through React hooks exported from `@adobe/aio-commerce-lib-admin-ui/web`:

| Hook | Available in | Returns |
| --- | --- | --- |
| `useIms()` | Any page | The signed-in admin's `imsOrgId` and `imsToken`. |
| `useHostConnection()` | Any iframe page | A `close()` function to close the iframe and return to the Commerce Admin grid or view or `closeWithError()` to return to the opening view with an error banner. |
| `useMassActionContext()` | Mass action `view` pages | `selectedIds`, the array of grid row IDs the mass action was triggered with. |
| `useOrderViewButtonContext()` | Order view button `view` pages | `orderId`, the order the button was rendered for. |
| `useCommerce()` | Any page | The host (domain) of the Commerce Admin the extension is embedded in. |
| `useSharedContext()` | Any page | The raw Commerce shared context and host proxy from the guest connection. |

### Read IMS credentials

`useIms` returns the IMS credentials provided by the host (`{ imsToken, imsOrgId }`). It works inside both the Commerce Admin and the Experience Cloud shell, and returns an error when the app runs standalone because no host provides credentials:

```jsx
import { useIms } from "@adobe/aio-commerce-lib-admin-ui/web";

function Welcome() {
  const { data, error } = useIms();
  if (error) return <span>{error.message}</span>;

  // Use data.imsToken to call IMS-authenticated APIs on behalf of the admin user.
  return <span>{data.imsOrgId}</span>;
}
```

When a component is guaranteed to render within a supported host and you do not need explicit error handling, you can ignore the error and use optional chaining:

```tsx
function Welcome() {
  const { data } = useIms();
  return <span>{data?.imsOrgId}</span>;
}
```

This approach is valid, but it is less explicit and not recommended. If the component renders outside the expected host, it silently renders an absent value instead of explaining or forwarding the error.

### Interact with the Commerce Admin host

`useHostConnection` returns typed helpers for closing the extension iframe and returning control to the Commerce Admin. Note that these helpers are only useful in flows that need to close the current iframe and navigate back, such as mass actions and order view buttons.

```tsx
import { useHostConnection } from "@adobe/aio-commerce-lib-admin-ui/web";

function Actions() {
  const { actions, error } = useHostConnection();
  if (error) return null;

  // actions.close() closes the current iframe and navigates back to the originating grid or order.
  // actions.closeWithError() does the same, flagging that an error occurred.
}
```

### Read mass action context

`useMassActionContext` returns the selected IDs for a mass action. It only works in mass action `view` pages, and returns an error when used outside that context:

```tsx
import { useMassActionContext } from "@adobe/aio-commerce-lib-admin-ui/web";

function MassActionPage() {
  const { data, error } = useMassActionContext();
  if (error) return null;

  // data.selectedIds is a non-empty string[].
}
```

### Read the order view-button context

`useOrderViewButtonContext` returns the order ID for an order view button. It only works in order view button `view` pages, and returns an error when used outside that context:

```tsx
import { useOrderViewButtonContext } from "@adobe/aio-commerce-lib-admin-ui/web";

function OrderViewButtonPage() {
  const { data, error } = useOrderViewButtonContext();
  if (error) return null;

  return <span>{data.orderId}</span>;
}
```

### Resolve the Commerce host

`useCommerce` returns the host (domain) of the Commerce Admin the extension is embedded in. The value is resolved over the guest connection using the host's integration API. It returns an error when used outside the Commerce Admin frame, when the host doesn't expose that integration API, or when host resolution fails:

```tsx
import { useCommerce } from "@adobe/aio-commerce-lib-admin-ui/web";

function CommerceInfo() {
  const { data, error } = useCommerce();
  if (error) return <span>Commerce features aren't available here.</span>;

  return <span>{data.commerceHost}</span>;
}
```

### Shared context access

`useSharedContext` exposes the raw Commerce shared context and host proxy from the guest connection. Use `useCommerce`, `useMassActionContext`, `useOrderViewButtonContext`, or `useHostConnection`) whenever possible.

`useSharedContext` (and the hooks built on it) require the Commerce guest connection. In Experience Cloud Shell or a standalone page, they always return an error.

```tsx
import { useSharedContext } from "@adobe/aio-commerce-lib-admin-ui/web";

function Advanced() {
  const { data, error } = useSharedContext();
  if (error) return null;

  const selectedIds = data.sharedContext.get("selectedIds");
}
```

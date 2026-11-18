---
title: menu
description: Create a new menu that redirects to the App Builder app.
keywords:
  - App Builder
  - Extensibility
---

# menu

The `menu` extension point creates a new menu item that redirects to your App Builder app. Unlike V1, which registered an array of `menuItems`, V2 declares a single `menu` object. Each app is limited to one menu item; to add multiple menus, create a separate app for each one.

Commerce automatically creates a section for the menu item, titled with your app's `displayName` (from `metadata.displayName`). By default, the section is nested under **Apps**. Set `parentMenu` to nest it under an existing Commerce menu instead.

## Example customization

The following example creates the **Sales** > *App display name* > **Approval Dashboard** menu item.

```typescript
adminUi: {
  menu: {
    id: 'approval_dashboard',
    label: 'Approval Dashboard',
    description: 'Review and approve purchase requests from Commerce Admin.',
    parentMenu: 'sales',
    pageTitle: 'Purchase Approval Requests',
  },
},
```

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | A unique ID to identify the menu item. Allowed characters are uppercase and lowercase letters (a-z, A-Z), digits (0-9), forward slash (/), colons (:), and underscores (_). |
| `label` | string | Yes | The label to display in the menu bar. |
| `description` | string | Yes | A description of the menu item. |
| `pageTitle` | string | No | The title displayed at the top of the page when the menu item is opened. If not specified, no page title is displayed. |
| `parentMenu` | string | No | The Commerce menu to nest the app's section under. Allowed values are `content`, `marketing`, `stores`, `system`, `catalog`, `customers`, `reports`, and `sales`. If not specified, the section is nested under **Apps**. If specified but not one of the allowed values, the menu registration is rejected. |
| `sandboxPermissions` | array of strings | No | Applies additional restrictions to the content within an iFrame. Allowed values are `allow-downloads`, `allow-modals`, and `allow-popups`. |
| `aclProtected` | boolean | No | When `true`, gates the menu item behind a dedicated Commerce ACL resource scoped to your app. See [ACL protection](index.md#acl-protection). The default value is `false`. |

## Reading IMS context

When your menu page uses an iFrame, use the [`useIms()` hook](index.md#reading-context-in-your-app) to read the signed-in admin's IMS Org ID.

```tsx
import { useIms } from '@adobe/aio-commerce-lib-admin-ui/web'

export function Welcome() {
  const { imsOrgId } = useIms()
  return <p>Your IMS Org ID is {imsOrgId}</p>
}
```

## Sample code

The Adobe Commerce Extensibility Code Samples repository demonstrates how to customize a [menu](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/v2/menu/custom-menu).

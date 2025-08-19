---
title: menu
description: Create a new menu that redirects to the App Builder app.
keywords:
  - App Builder
  - Extensibility
---

# menu

The `menu` extension point creates a new menu that redirects to the App Builder app.

When you implement a menu that uses an iFrame, use a [`sharedContext`](./index.md#shared-contexts) to read the IMS token.

Each application is limited to one section and one menu. To implement multiple menus, you must create a separate application for each menu.

## Example customization

The following example creates the **Apps** > **First App on App Builder** menu option.

```javascript
menuItems: [
    {
        id: `${extensionId}::first`,
        title: 'App on App Builder',
        parent: `${extensionId}::apps`,
        sortOrder: 1
    }
]
```

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | A unique ID to identify the application menu in Adobe Commerce Admin. The input allowed is uppercase and lowercase letters (a-z, A-Z), digits (0-9), forward slash (/), colons (:), and underscores (_). |
| `isSection` | boolean | No | Indicates whether the menu item is a new section. The default value is `false`. |
| `parent` | string | No | The parent menu. |
| `sortOrder` | integer | No | The position of the menu, relative to other menus in the section. A value of `1` indicates the menu will be listed first. If this parameter is not specified, it will be placed randomly.
| `title`  | string | No | The title to display in the menu bar. For the page title of the menu, check the [page extension point](./page.md). |
| `sandbox` | string | No | The sandbox attribute applies additional restrictions to the content within an iFrame. Allowed values are `allow-downloads` and `allow-popups`. Separate multiple values with a single space (" "). |

## Sample code

The Adobe Commerce Extensibility Code Samples repository demonstrates how to customize a [menu](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/menu/custom-menu).

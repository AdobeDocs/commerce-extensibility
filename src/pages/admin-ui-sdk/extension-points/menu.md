---
title: menu
description: Create a new menu that redirects to the App Builder app.
keywords:
  - App Builder
  - Extensibility
---

# menu

The `menu` extension point creates a new menu that redirects to the App Builder app.

When you implement a menu that uses an iFrame, use a [`sharedContext`](../index.md#shared-contexts) to read the IMS token.

## Example customization

The following example creates the **Apps** > **First App on App Builder** menu option.

```javascript
      menu: {
        getItems() {
          return [
            {
              id: `${extensionId}::first`,
              title: 'First App on App Builder',
              parent: `${extensionId}::apps`,
              sortOrder: 1
            },
            {
              id: `${extensionId}::apps`,
              title: 'Apps',
              isSection: true
            }
          ]
        }
      }
```

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | A unique ID to identify the application menu in Adobe Commerce Admin. |
| `isSection` | boolean | No | Indicates whether the menu item is a new section. The default value is `false`. |
| `parent` | string | No | The parent menu. |
| `sortOrder` | integer | No | The position of the menu, relative to other menus in the section. A value of `1` indicates the menu will be listed first. If this parameter is not specified, it will be placed randomly.
| `title`  | string | No | The title to display. |

## Sample code

The Adobe Commerce Extensibility Code Samples repository demonstrates how to customize a [menu](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/menu/custom-menu).

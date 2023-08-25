---
title: menu
description: Create a new menu that redirects to the App Builder app.
---

# menu

The `menu` extension point creates a new menu that redirects to the App Builder app.

## Example customization

The following example creates the **Marketing** > **First App on App Builder** menu option.

```javascript
menu: {
    getItems() {
        return [
            {
                id: `${extensionId}`,
                title: 'First App on App Builder',
                parent: 'Magento_Backend::marketing'
            }
        ]
    }
}
```

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | A unique ID to identify the application menu in Adobe Commerce Admin. |
| `parent` | string | No | The parent menu. |
| `title`  | string | No | The title to display. |

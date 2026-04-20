---
title: Admin UI SDK configuration
description: Configure Adobe Commerce Admin UI SDK for your App Builder application
keywords:
  - App Builder
  - Extensibility
  - App Management
---

# Admin UI SDK configuration

The `adminUiSdk` field in your `app.commerce.config` file allows you to configure the menu items managed by the Adobe Commerce Admin UI SDK.

## Menu registration

The `registration` field allows you to declare menu items that will be registered in the Adobe Commerce Admin UI when your application is installed. Menu items can be top-level or nested under a parent menu item.

### Example

The following example shows how to register two menu items, "Apps" and "First App on App Builder", where "First App on App Builder" is nested under "Apps":

```js
import { defineConfig } from "@adobe/aio-commerce-lib-app/config"

export default defineConfig({
  metadata: {
    // ...
  },
  adminUiSdk: {
    registration: {
        menuItems: [
        {
          id: `purchase-approval::first`,
          title: 'First App on App Builder',
          parent: `purchase-approval::apps`,
          sortOrder: 1
        },
        {
          id: `purchase-approval::apps`,
          title: 'Apps',
          isSection: true,
          sortOrder: 100
        }
      ],
    },
  },
});
```

### Menu item properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for the menu item. |
| `title` | string | No | Display title for the menu item. |
| `parent` | string | No | The parent menu item identifier, used to nest this item under an existing menu. |
| `sortOrder` | number | No | Numeric value that determines the position of the menu item relative to its siblings. |
| `sandbox` | string | No | The sandbox URL to load when the menu item is clicked. |
| `isSection` | boolean | No | When `true`, the menu item acts as a section header rather than a navigable link. |

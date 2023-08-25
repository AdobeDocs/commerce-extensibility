---
title: page
description: 
---

# page

The `page` extension point allows to create a new menu that redirects to the App Builder app.

## Example customization

```javascript
page: {
    getTitle() {
        return 'Adobe Commerce First App on App Builder'
    }
}
```

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | string | Yes | Page title to display in the Adobe Commerce Admin Panel when loading the application |

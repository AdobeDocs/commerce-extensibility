---
title: page
description: Create a new page that redirects to your App Builder app.
---

# page

The `page` extension point creates a new page that redirects to your App Builder app.

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

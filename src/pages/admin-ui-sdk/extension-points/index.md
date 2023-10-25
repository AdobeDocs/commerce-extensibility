---
title: Extension points
description: Learn about the Admin UI SDK extension points
keywords:
  - App Builder
  - Extensibility
---

# Adobe Commerce Admin UI SDK extension points

This section describes how to use existing extension points in any Adobe Developer App Builder application that customizes Adobe Commerce Admin.

## Shared contexts

The `sharedContext` constant contains a set of selected IDs, the Commerce base URL, and an IMS token, as shown below:

```js
const sharedContext = {
  selectedIds: config.productMassAction.selectedIds,
  commerceBaseUrl: config.baseUrl,
  imsToken: registryConfig.auth.imsToken
}
```

In the following code example, the `getGuestConnection()` call uses a `sharedContext` to retrieve a list of selected IDs.

```js
getGuestConnection().then((guestConnection) => {
  guestConnection.sharedContext.get('selectedIds').forEach((id) => {
    items.push({id: id})
  })
  setIsLoading(false)
})

The `path` parameter for a `productMassAction` specifies where to send the selected IDs.

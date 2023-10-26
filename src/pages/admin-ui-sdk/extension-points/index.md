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

The `sharedContext` constant contains a set of selected IDs, the Commerce base URL, and an IMS token, as shown below. It is available only when a mass action is selected in the Commerce Admin.

```js
const sharedContext = {
  selectedIds: array,
  commerceBaseUrl: string,
  imsToken: string
}
```

In the following code example, the `getGuestConnection()` call uses a `sharedContext` to retrieve a list of selected IDs. The `extensionId` must match the ID used to register the app in the `ExtensionRegistration.js` file.

```js
const getGuestConnection = async () => {
    return await attach({
        id: extensionId
   })
}
    
getGuestConnection().then((guestConnection) => {
  guestConnection.sharedContext.get('selectedIds')
})

The `path` parameter for a `productMassAction` specifies where to redirect the mass action UI.

---
title: Extension points
description: Learn about the Admin UI SDK extension points
keywords:
  - App Builder
  - Extensibility
---

# Adobe Commerce Admin UI SDK extension points

This section describes how to use existing extension points in any Adobe Developer App Builder application that customizes Adobe Commerce Admin.

The [Adobe Commerce Samples repository](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk) contains samples for different extension points of the Adobe Commerce Admin UI SDK. Use these samples to gain insight on how the Admin SDK injects menus and pages into the Admin.

<InlineAlert variant="info" slots="text1" />

Read the README.md in each sample repository for prerequisites, deployment steps, and known issues.

## Implementation requirements

### For Adobe Commerce as a Cloud Service (SaaS)

<Edition name="saas" />

Extensions render only if your app is **published** in Adobe Developer Console. Draft apps will not display. See [Publish your app](../publish.md).

## Shared contexts

The `sharedContext` constant is available only when a mass action, menu, or order view button performs a redirection to an iFrame page. For mass actions, `sharedContext` contains a set of selected IDs, the Commerce base URL, the client ID, an IMS token, and the IMS org ID, as shown below.

```js
const sharedContext = {
  selectedIds: array,
  commerceBaseUrl: string,
  imsToken: string,
  imsOrgId: string,
  clientId: string
}
```

For menus and order view buttons, `sharedContext` contains only an IMS token of the logged in user in Commerce and the IMS org ID.

```js
const sharedContext = {
  imsToken: string,
  imsOrgId: string
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
```

The `path` parameter for a `productMassAction` specifies where to redirect the mass action UI.

## Migrate your extension point from version 1.x to 2.0

Perform the following steps to update your extension points from Admin UI SDK 1.x to 2.0.

### In your app on App Builder

1. Create a [new runtime action](../app-registration.md#create-a-registration-runtime-action) under `actions/registration/index.js`. Use the updated example customization shown in the documentation for your extension point as a guide.Refer to the provided samples to create a new runtime action in your app.

1. Modify the [`app.config.yaml` file](../app-registration.md#update-the-appconfigyaml-file) to include the registration attached to the admin-ui-sdk package.

1. Remove all content from the methods in the [`ExtensionRegistration` class](../app-registration.md#add-an-extensionregistration-component) to prepare for the new version.

1. [Deploy and publish](../publish.md) your app for testing.

### In the Commerce instance

Clear the cache in your Commerce instance to ensure all changes take effect properly by running the following command:

```bash
bin/magento cache:clean
```

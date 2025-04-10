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

## Shared contexts

The `sharedContext` constant is available only when a mass action, menu, or order view button performs a redirection to an iFrame page. For mass actions, `sharedContext` contains a set of selected IDs, the Commerce base URL, the client ID, an IMS token, and the IMS org ID, as shown below.

```js
const sharedContext = {
  selectedIds: array,
  commerceBaseUrl: string,
  imsToken: string,
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

## Mass actions without iFrames

When a mass action `displayIframe` parameter is set to `false`, you must account for additional factors.

### Mass action request headers

Use the following request headers when you perform a mass action without implementing an iFrame.

| Header | Description |
| --- | --- |
| `X-Request-ID` | A unique UUID v4 generated when the request is sent as a unique identifier. |
| `Content-Type` | The request content type is `application/json`. |
| `Accept` | The request accepts a response type of `application/json`. |
| `Authorization` | The request is authenticated using an IMS token generated for the organization attached to the Commerce instance. |
| `x-gw-ims-org-id` | The organization ID. |

### Application failures

Commerce expects application responses to contain the error status and message.
Commerce logs the error and displays an error banner notification to the user.

### Connection interruption failures

By default, Commerce waits 10 seconds for a response, though the extension point can customize this value.
When the timeout is reached, Commerce:

- Logs a 408 timeout status and error message.
- Displays an error banner notification.
- Sends the `admin_ui_sdk_mass_action_request_failed` event. The application can subscribe to this event to take action, such as rolling back updates in Commerce.

The application can access details of the failed request using the `GET V1/adminuisdk/massaction/<requestId>` REST API. The token used to authenticate the request must have access to the Admin UI SDK. The call returns an error message if the request ID was not found or if it associated with a successful action.

### Recommendations

- Use bulk update in Commerce to avoid inconsistency issues in case of failures.
- Event and REST API responses contain the list of selected IDs for a request. It is the application's responsibility to monitor updates or failures in Commerce.

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

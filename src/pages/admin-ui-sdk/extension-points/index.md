---
title: Extension points
description: Learn about the Admin UI SDK extension points
keywords:
  - App Builder
  - Extensibility
---

# Adobe Commerce Admin UI SDK extension points

This section describes how to use existing extension points in any Adobe Developer App Builder application that customizes Adobe Commerce Admin.

The [Adobe Commerce Samples repository](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/menu/custom-menu) contains samples for different extension points of the Adobe Commerce Admin UI SDK. Use these samples to gain insight on how the Admin SDK injects menus and pages into the Admin.

## Shared contexts

The `sharedContext` constant contains a set of selected IDs, the Commerce base URL, and an IMS token, as shown below. It is available only when a mass action is selected in the Commerce Admin.

```js
const sharedContext = {
  selectedIds: array,
  commerceBaseUrl: string,
  imsToken: string,
  clientId: string
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

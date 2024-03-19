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

## Mass action without iFrame display

When a mass action `displayIframe` parameter is set to `false`, you must account for additional factors.

### Mass action request headers

| Header | Description |
| --- | --- |
| `X-Request-ID` | A unique UUID v4 generated when the request is sent as a unique identifier. |
| `Content-Type` | The request content type is `application/json`. |
| `Accept` | The request accepts a response type is `application/json`. |
| `Authorization` | The request is authenticated using an IMS token generated to the organization attached to the Commerce instance. |
| `x-gw-ims-org-id` | The organization id. |

### Failure on application side

Commerce expects an answer from the application with the error status and message.
The error will be logged in Commerce and an error banner notification will be displayed to user.

### Failure due to connection interruption

The timeout will be applied in case a response is not sent to Commerce. By default it's 10 seconds unless it's customized in the extension point.
When the timeout is reached:

- A 408 timeout status with error message will be logged.
- An error banner notification will be displayed to user.
- An event will be dispatched: `admin_ui_sdk_mass_action_request_failed`. Application can subscribe to this event to take action such as rollback what is already updated in Commerce.
- Application can access details of the failed request via REST API `V1/adminuisdk/massaction/<requestId>`. A token to Commerce with access to Admin UI SDK rights should be generated. If request is not found, it either do not exist or it succeeded in Commerce.

### Recommendations

- Bulk update in Commerce to avoid inconsistency issues is case of failures.
- Event and REST API answer contain the list of selected ids for the request. It is the application responsability to monitor what was updated or failed in Commerce.

---
title: API Refrence
description: Provides details about the Admin UI SDK API endpoints.
keywords:
  - App Builder
  - Extensibility
---

# REST endpoints for Admin UI SDK

Adobe Commerce provides several REST endpoints that interact with the Admin UI SDK processes. These endpoints require an [admin token](https://developer.adobe.com/commerce/webapi/get-started/authentication/gs-authentication-token/) on PaaS systems or a token using [Adobe's Identity Management System (IMS)](https://developer.adobe.com/commerce/webapi/rest/authentication/user/) on SaaS systems.

## Mass actions without iFrames

When a mass action `displayIframe` parameter is set to false, you must account for additional factors.

**Application failures**:

- Commerce expects application responses to contain the error status and message.
- Commerce logs the error and displays an error banner notification to the user.

**Connection interruption failures**:

By default, Commerce waits 10 seconds for a response, though the extension point can customize this value.
When the timeout is reached, Commerce:

- Logs a 408 timeout status and error message.
- Displays an error banner notification.
- Sends the `admin_ui_sdk_mass_action_request_failed` event. The application can subscribe to this event to take action, such as rolling back updates in Commerce.

**Additional details through REST API**:

The `GET V1/adminuisdk/massaction/<requestId>` endpoint returns details of the failed request when a mass action without an iFrame fails to execute.

**Headers**:

| Header | Value |
| --- | --- |
| `Authorization` | Bearer `<Token>` |
| `Content-Type` | application/json |

**Responses**:

- **200**: Successful response with the following response payload:

    ```json
    {
        "id": Unique internal ID,
        "request_id": Request ID,
        "action_id": Mass Action ID that failed,
        "grid_type": Grid type: product, order or customer,
        "error_status": Error Status,
        "error_message": Error Message,
        "request_timestamp": Timestamp,
        "selected_ids": Array of selected IDs in the grid
    }
    ```

**Example usage**:

```bash
curl -X GET \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <TOKEN>" \
    '<ADOBE_COMMERCE_URL>/rest/V1/adminuisdk/massaction/<REQUEST_ID>'
```

**Recommendations**:

- Use bulk update in Commerce to avoid inconsistency issues in case of failures.
- Event and REST API responses contain the list of selected IDs for a request. It is the application's responsibility to monitor updates or failures in Commerce.

## Order view button without iFrames

When an order view button `displayIframe` parameter is set to false, you must account for additional factors.

**Application failures**:

- Commerce expects application responses to contain the error status and message.
- Commerce logs the error and displays an error banner notification to the user.

**Connection interruption failures**:

By default, Commerce waits 10 seconds for a response, though the extension point can customize this value.
When the timeout is reached, Commerce:

- Logs a 408 timeout status and error message.
- Displays an error banner notification.
- Sends the `admin_ui_sdk_order_view_button_request_failed` event. The application can subscribe to this event to take action, such as rolling back updates in Commerce.

**Additional details through REST API**:

The `GET V1/adminuisdk/orderviewbutton/<requestId>` endpoint returns details of the failed request when an order view button without iFrame fails to execute.

**Headers:**

| Header | Value |
| --- | --- |
| `Authorization` | Bearer `<Token>` |
| `Content-Type` | application/json |

**Responses:**

- **200**: Successful response with the following response payload:

    ```json
    {
        "id": Unique internal ID,
        "request_id": Request ID,
        "button_id": Button ID that failed,
        "order_id": Order ID that failed,
        "error_status": Error Status,
        "error_message": Error Message,
        "request_timestamp": Timestamp
    }
    ```

**Example usage:**

```bash
curl -X GET \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <TOKEN>" \
    '<ADOBE_COMMERCE_URL>/rest/V1/adminuisdk/orderviewbutton/<REQUEST_ID>'
```

### Recommendations

- Event and REST API responses contain the order ID for a request. It is the application's responsibility to monitor updates or failures in Commerce.

## App Management

The following endpoints manage selected extensions stored in the Commerce database.

### Save a selected extension

`POST /V1/adminuisdk/extension`

Saves a selected extension record to the database.

**Headers:**

| Header | Value |
| --- | --- |
| `Authorization` | Bearer `<Token>` |
| `Content-Type` | application/json |

**Request body:**

All fields are defined in the `extension` object.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `extension_name` | string | Yes | The extension name |
| `extension_title` | string | Yes | The extension title |
| `extension_url` | string | Yes | The extension URL |
| `extension_workspace` | string | Yes | The extension workspace |
| `id` | string | No | Unique ID field |

**Example usage:**

```bash
curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <TOKEN>" \
    -d '{"extension": {"extension_name": "my-extension", "extension_title": "My Extension", "extension_url": "https://example.com", "extension_workspace": "production"}}' \
    '<ADOBE_COMMERCE_URL>/rest/V1/adminuisdk/extension'
```

**Responses:**

- **400**: Bad request
- **401**: Unauthorized
- **500**: Internal server error

### Delete a selected extension

`DELETE /V1/adminuisdk/extension/<workspace_name>/<extension_name>`

Deletes the specified extension from the database by workspace name and extension name.

**Headers:**

| Header | Value |
| --- | --- |
| `Authorization` | Bearer `<Token>` |
| `Content-Type` | application/json |

**Path parameters:**

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `workspace_name` | string | Yes | The workspace name |
| `extension_name` | string | Yes | The extension name |

**Request body:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `workspaceName` | string | Yes | The workspace name |
| `extensionName` | string | Yes | The extension name |

**Example usage:**

```bash
curl -X DELETE \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <TOKEN>" \
    -d '{"workspaceName": "production", "extensionName": "my-extension"}' \
    '<ADOBE_COMMERCE_URL>/rest/V1/adminuisdk/extension/<WORKSPACE_NAME>/<EXTENSION_NAME>'
```

**Responses:**

- **401**: Unauthorized
- **500**: Internal server error

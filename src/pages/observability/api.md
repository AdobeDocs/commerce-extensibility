---
title: REST endpoints for observability
description: Provides details about the webhook API endpoints.
keywords:
  - Extensibility
  - REST
  - App Builder
  - Observability
  - OpenTelemetry
---

# REST endpoints for observability

Adobe Commerce provides several REST endpoints that interact with the observability module. These endpoints require an [admin token](https://developer.adobe.com/commerce/webapi/rest/tutorials/prerequisite-tasks/).

| **Route URL**                             | **Method** | **Description**                                          |
|-------------------------------------------| ---------- |----------------------------------------------------------|
| `/V1/oope_observability/subscription/:id` | GET        | Retrieve an observability subscription                  |
| `/V1/oope_observability/subscription?searchCriteria[pageSize]=100`     | GET        | Retrieve a list of observability subscriptions       |
| `/V1/oope_observability/subscription`     | POST       | Create a new observability subscription                  |
| `/V1/oope_observability/subscription`     | PUT        | Update an observability subscription                   |
| `/V1/oope_observability/subscription/:id` | DELETE     | Delete observability subscription by ID                  |

## Create a new subscription

The `POST` request to `/V1/oope_observability/subscription` requires a JSON payload. The following example shows a request body to create a new subscription:

**Request**:

```json
{
    "subscription": {
        "type": "logs",
        "destination_endpoint": "https://<abc>.ngrok-free.app/v1/logs",
        "component": [
            "webhooks",
            "eventing"
        ],
        "headers": [
            {
                "name": "api-key",
                "value": "abcd1234-abcdabc-afs",
                "secret": true
            }
        ],
        "log_message_settings": [
            "log_webhook_request_body"
        ],
        "is_active": "true"
    }
}
```

## Update an existing subscription

To update an existing subscription, make a `PUT` request to the `/V1/oope_observability/subscription` endpoint. The request body must contain the updated subscription information, including the subscription `id`. The following example shows a request body to update a subscription:

**Request**:

```json
{
  "subscription": {
    "id": 3,
    "type": "logs",
    "destination_endpoint": "https://<abc>.ngrok-free.app/v1/logs",
    "component": [
      "webhooks",
      "eventing",
      "admin-ui-sdk"
    ],
    "is_active": "true"
  }
}
```

## Retrieve a list of subscriptions

To retrieve a list of all observability subscriptions, make a `GET` request to `/V1/oope_observability/subscription?searchCriteria[pageSize]=100`. This returns a paginated list of subscriptions, with a maximum of 100 subscriptions per page.

**Response**:

```json
{
  "items": [
    {
      "id": 1,
      "type": "logs",
      "destination_endpoint": "https://<abc>.ngrok-free.app/v1/logs",
      "component": [
        "webhooks",
        "eventing",
        "admin-ui-sdk"
      ],
      "headers": [],
      "service_name": "my-app-builder-app",
      "is_active": true,
      "log_message_settings": [
        "log_webhook_request_headers",
        "log_webhook_request_body",
        "log_webhook_response_body"
      ]
    },
    {
      "id": 2,
      "type": "metrics",
      "destination_endpoint": "https://<abc>.ngrok-free.app/v1/metrics",
      "component": [
        "webhooks",
        "eventing"
      ],
      "headers": [],
      "service_name": "",
      "is_active": false,
      "log_message_settings": [
        "log_webhook_request_headers",
        "log_webhook_request_body",
        "log_webhook_response_body"
      ]
    }
  ]
}
```

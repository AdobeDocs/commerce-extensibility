---
title: Adobe Commerce Observability
description: Adobe Commerce Observability
keywords:
  - Extensibility
---

import InstallObservabilityModule from '/src/_includes/observability-module-installation'

# Adobe Commerce Observability Overview

<InlineAlert variant="important" slots="text" />

This functionality is automatically available on [Adobe Commerce as a Cloud Service](https://experienceleague.adobe.com/en/docs/commerce/cloud-service/overview) (SaaS) projects. Adobe Commerce on-premises and Cloud infrastructure (PaaS) projects can [install separate modules](#install-observability-module) to provide this functionality.

Observability allows you to monitor and understand the behavior of extensibility tools such as Webhooks, Events, and Admin UI SDK. It allows you to forward logs from Adobe Commerce and connect them with App Builder logs using context propagation. This enables you to trace the flow of requests and responses across different components of your application, providing a comprehensive view of your system's performance and behavior.

<Edition name="paas" />

**Note:** The message queue must be configured and running to use observability. The message queue is used to send logs asynchronously, ensuring that the main application flow is not blocked by logging operations. Consumers must be configured to run by cron jobs or as a workers.

## Configure observability

To start using observability, you need to configure Adobe Commerce by creating a new subscription. A subscription can be created in two ways: in the Admin UI or through the Rest API. You can create multiple subscriptions, each with its own configuration. The subscription configuration includes the following parameters:

- **Type**: The type of subscription, at the moment only `logs` is supported.
- **Destination**: The type of destination where the logs will be sent. Supported values are `NewRelic`, `Datadog`, and `Splunk` and `OpenTelemetry`.
- **Destination endpoint**: The endpoint of the destination where the logs will be sent.
- **Destination API key**: The API key for the destination, if required.
- **Component**: The component for which the subscription is created. Supported values are `Webhooks`, `Eventing`, and `Admin UI SDK`. You can select one or more components to monitor.
- **Service name**: The name of the service that will be used to identify the logs in the destination.
- **Is active**: A flag that indicates whether the subscription is active or not.
- **Headers**: Additional headers that will be sent with the logs to the destination. This is useful for adding custom metadata or authentication information. You can specify if header has secret value or not to hide in the Admin UI or Rest API response.
- **Log message configuration**: Enables or disables the additional data in the log message. This includes such options as the request headers and payload, and response payloads for webhooks.

### Configuration Admin UI

To configure observability in the Admin UI, navigate to `System > Observability > Subscription List`. Here you can create, update, and delete subscriptions.

![Observability Admin UI](../_images/observability/list-of-subscriptions-admin-ui.png)

To create a new subscription, click the **Add New Subscription** button. Fill in the required fields and click **Save Subscription**. The new subscription will be added to the list.

![Observability New Subscription Admin UI](../_images/observability/create-subscription-admin-ui.png)


### Rest API

To manage subscriptions using the REST API, you can use the following endpoints:

| **Route URL**                             | **Method** | **Description**                                          |
|-------------------------------------------| ---------- |----------------------------------------------------------|
| `/V1/oope_observability/subscription/:id` | GET        | Retrieve an observability subscriptions                  |
| `/V1/oope_observability/subscription?searchCriteria[pageSize]=100`     | GET        | Retrieve a list of all observability subscriptions       |
| `/V1/oope_observability/subscription`     | POST       | Create a new observability subscription                  |
| `/V1/oope_observability/subscription`     | PUT        | Update an observability subscription                   |
| `/V1/oope_observability/subscription/:id` | DELETE     | Delete observability subscription by ID                  |

#### Create a new subscription

The `POST` request to `/V1/oope_observability/subscription` requires a JSON payload with the subscription information. Here is an example of the request body to create a new subscription:

```json
{
	"subscription": {
		"type": "logs",
		"destination": "OpenTelemetry",
		"destination_endpoint": "https://otlp.nr-data.net:4318/v1/logs",
		"component": [
			"webhooks",
			"eventing"
		],
		"headers": [
			{
				"name": "api-key",
				"value": "asdf24b2hk-adfasf-afs",
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

#### Update an existing subscription

To update an existing subscription, you can use the `PUT` request to `/V1/oope_observability/subscription`. The request body should contain the updated subscription information, including the subscription ID. Here is an example of the request body to update a subscription:

```json
{
  "subscription": {
    "id": 3,
    "type": "logs",
    "destination": "NewRelic",
    "destination_endpoint": "https://log-api.newrelic.com/log/v1",
    "component": [
      "webhooks",
      "eventing",
      "admin-ui-sdk"
    ],
    "is_active": "true"
  }
}
```

#### Retrieve a list of subscriptions

To retrieve a list of all observability subscriptions, you can use the `GET` request to `/V1/oope_observability/subscription?searchCriteria[pageSize]=100`. This will return a paginated list of subscriptions, with a maximum of 100 subscriptions per page.

```json
{
  "items": [
    {
      "id": 1,
      "type": "logs",
      "destination": "OpenTelemetry",
      "destination_endpoint": "https:\/\/ab34c78214c7.ngrok-free.app\/v1\/logs",
      "destination_api_key": "",
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
      "id": 3,
      "type": "logs",
      "destination": "NewRelic",
      "destination_endpoint": "https:\/\/log-api.newrelic.com\/log\/v1 ",
      "destination_api_key": "********",
      "component": [
        "webhooks",
        "eventing",
        "admin-ui-sdk"
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

## Install observability module

<InstallObservabilityModule />

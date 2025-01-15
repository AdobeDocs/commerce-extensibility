---
title: REST Endpoints for Webhooks
description: Provides details about the webhook API endpoints.
keywords:
  - Webhooks
  - Extensibility
---

# REST endpoints for webhook.

Adobe Commerce provides several REST endpoints that interact with the webhooks processes. These endpoints require an [admin token](https://developer.adobe.com/commerce/webapi/rest/tutorials/prerequisite-tasks/).

## Get a list of all subscribed webhooks

The `GET /rest/all/V1/webhooks/list` endpoint returns a list of all subscribed webhooks. The response body looks like below:

```json
[
	{
		"webhook_method": "observer.sales_order_place_before",
		"webhook_type": "after",
		"batch_name": "sales_order",
		"batch_order": 100,
		"hook_name": "sales_order_status",
		"url": "/hook-url",
		"priority": 100,
		"required": true,
		"soft_timeout": 1000,
		"timeout": 2000,
		"method": "",
		"fallback_error_message": "Unable to validate product",
		"ttl": 6000,
		"fields": [
			{
				"name": "name",
				"source": "data.product.name"
			},
			{
				"name": "price",
				"source": "data.product.price"
			}
		],
		"rules": [
			{
				"field": "data.product.sku",
				"operator": "regex",
				"value": "\/.*car.*\/"
			}
		],
		"headers": [
			{
				"name": "header-name",
				"value": "header-value"
			}
		]
	}
]
```

The administrator must be granted access to the `Magento_AdobeCommerceWebhooks::webhooks_list` resource.

**Example usage:**

The following cURL command returns returns a list of all subscribed webhooks.
```bash
curl --request GET \
   --url <ADOBE_COMMERCE_URL>/rest/all/V1/webhooks/list \
   --header 'Authorization: Bearer <TOKEN>'
```
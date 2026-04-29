---
title: API Integration Module
description: Learn about the REST endpoints provided by the Magento_OopeApiIntegrations module for Adobe Commerce out-of-process extensibility.
keywords:
 - Extensibility
 - App Builder
 - REST
 - Starter Kit
 - Tools
---

# API Integration module

The `Magento_OopeApiIntegrations` module (`magento/module-oope-api-integrations`) exposes a REST endpoint that allows external applications and out-of-process services to read Commerce configuration data that has no existing REST surface in core Commerce.

## REST endpoint

The `GET /V1/order-statuses` endpoint returns all order statuses configured in the Commerce instance, joined with their state assignments. It requires an admin token with the `Magento_OopeApiIntegrations::order_statuses` ACL resource.

A status assigned to multiple states appears as one entry per state. A status not assigned to any state appears once with `state: null`.

The response combines data from two tables:

- `sales_order_status` — status code and label
- `sales_order_status_state` — state assignment, default flag, and storefront visibility (LEFT JOINed, so unassigned statuses are included)

**Response fields:**

| Field | Type | Description |
|-------|------|-------------|
| `status` | String | The status code (primary key from `sales_order_status`). |
| `label` | String | The human-readable label for the status. |
| `state` | String or null | The order state this status is assigned to, or `null` if not assigned to any state. |
| `is_default` | Boolean | Whether this status is the default for its assigned state. |
| `visible_on_front` | Boolean | Whether this status is visible to customers on the storefront. |

**Example request**:

```bash
curl --request GET \
--url <ADOBE_COMMERCE_API_URL>/rest/V1/order-statuses \
--header 'Authorization: Bearer <admin_token>'
```

**Example response**:

```json
[
  {
    "status": "pending",
    "label": "Pending",
    "state": "new",
    "is_default": true,
    "visible_on_front": false
  },
  {
    "status": "pending_payment",
    "label": "Pending Payment",
    "state": "pending_payment",
    "is_default": true,
    "visible_on_front": false
  },
  {
    "status": "processing",
    "label": "Processing",
    "state": "processing",
    "is_default": true,
    "visible_on_front": true
  },
  {
    "status": "complete",
    "label": "Complete",
    "state": "complete",
    "is_default": true,
    "visible_on_front": true
  },
  {
    "status": "custom_status",
    "label": "My Custom Status",
    "state": null,
    "is_default": false,
    "visible_on_front": false
  }
]
```

## ACL resources

| Resource ID | Title | Description |
|-------------|-------|-------------|
| `Magento_OopeApiIntegrations::oope` | OOPE API Integrations | Parent resource. |
| `Magento_OopeApiIntegrations::order_statuses` | Order Statuses | Required to call the order statuses endpoint. |

## Installation

This module is available automatically on Adobe Commerce as a Cloud Service. For on-premises and cloud infrastructure projects, install it with Composer:


1. Run the following command to install the module:

   ```bash
   composer require magento/module-oope-api-integrations=^1.0
   ```

1. Enable the module.

   ```bash
   bin/magento module:enable Magento_OopeApiIntegrations
   bin/magento setup:upgrade
   ```

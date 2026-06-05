---
title: Install the totals collector module
description: Learn about the Adobe Commerce out-of-process totals collector for the checkout starter kit and how you can get started.
keywords:
  - App Builder
  - Extensibility
---

# Install the totals collector module

To begin using the totals collector module with the checkout starter kit, ensure that you have completed the [getting started](getting-started.md) and [configuration](configure.md) steps.

For more ideas on how you can use the totals collector module, refer to [totals collector use cases](totals-collector-use-cases.md).

## Prerequisites

* Adobe Commerce on cloud infrastructure or on-premises: 2.4.5+
* PHP 8.1+
* The [magento/module-adobe-commerce-webhooks](https://developer.adobe.com/commerce/extensibility/webhooks/) module (required by the totals collector).

## Installation

<Fragment src="/_includes/checkout-version.md" />

To enable out-of-process discount totals collection (from an external service) in Adobe Commerce, install the `magento/module-out-of-process-totals-collector` module using the following command:

```bash
composer require magento/module-out-of-process-totals-collector --with-dependencies
```

## Configuration

<Fragment src="/_includes/checkout-configuration.md" />

After installation, register one or more webhooks so that Adobe Commerce can call your App Builder application during quote totals collection:

- **Discounts** — fires during cart totals collection. See [Discount use cases](totals-collector-use-cases.md#totals-collector-webhook) for registration details and response format.
- **Item prices** — fires during cart totals collection, immediately after the subtotal is computed. See [Item price use cases](totals-collector-item-prices.md#item-prices-webhook) for registration details and response format.

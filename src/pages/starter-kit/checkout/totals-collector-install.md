---
title: Install the totals collector module
description: Learn about the Adobe Commerce out-of-process totals collector for the checkout starter kit and how you can get started.
keywords:
  - App Builder
  - Extensibility
---

# Install the totals collector module

To begin using the `totals-collector` app, ensure that you have completed the [getting started](getting-started.md) and [configuration](configure.md) steps.

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

The `totals-collector` app does not have a custom installation step. Unlike the `shipping-method`, `payment-method`, and `tax-integration` apps, it does not create any Commerce entities. It only implements webhook-based discount and fee actions. There is nothing to install or uninstall beyond the app itself.

After installation, register one or more webhooks so that Adobe Commerce can call your app during quote totals collection:

- **Discounts**. Fires during cart totals collection. The app ships with nine example discount actions and declares this webhook out-of-the-box, defaulting to one of them. Pick which example to use (or write your own) and set it as the webhook's runtime action. See [Discount use cases](totals-collector-use-cases.md#totals-collector-webhook) for registration details and response format.
- **Custom fees**. Fires during cart totals collection, after shipping costs and discounts are computed. Your app will have access to the computed shipping cost and any shipping discount. The app does not declare this webhook out-of-the-box. You must add your own runtime action and register it. See [Custom fees use cases](totals-collector-fees.md#custom-fees-webhook) for registration details and response format.
- **Item prices**. Fires during cart totals collection, immediately after the subtotal is computed. The app does not declare this webhook out-of-the-box. Add your own runtime action and register it. See [Item price use cases](totals-collector-item-prices.md#item-prices-webhook) for registration details and response format.

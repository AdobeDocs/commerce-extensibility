---
title: Install the payment module
description: Learn about the Adobe Commerce payment integration for the checkout starter kit and how you can get started.
keywords:
  - App Builder
  - Extensibility
---

# Install the payment module

To begin using the `payment-method` app, ensure that you have completed the [getting started](getting-started.md) and [configuration](configure.md) steps.

For more ideas on how you can use the payment module, refer to [payment use cases](payment-use-cases.md).

## Prerequisites

* Adobe Commerce on cloud infrastructure or on-premises: 2.4.5+
* PHP 8.1+
* Magento Open Source is not supported.

## Installation

<Fragment src="/_includes/checkout-version.md" />

To enable out-of-process payment methods in Commerce, install the `magento/module-out-of-process-payment-methods` module using the following command:

```bash
composer require magento/module-out-of-process-payment-methods --with-dependencies
```

## Configuration

<Fragment src="/_includes/checkout-configuration.md" />

The `payment-method` app registers [`create-payment-methods`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/apps/payment-method/scripts/create-payment-methods.js) as a [custom installation step](../../app-management/installation/customize.md#custom-installation-steps), so it runs automatically when the app is installed, creating the payment methods in Adobe Commerce.

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

The `payment-method` app sets up Commerce for you automatically as part of installation, using an [App Management custom installation step](../../app-management/installation/customize.md#custom-installation-steps).

### Install

Installing the app creates a demo payment method, **Method one**, using the `/V1/oope_payment_method` REST endpoint, so you can try out out-of-process payment validation right away.

### Uninstall

Uninstalling the app disables this payment method via the same endpoint, so it immediately stops appearing as a payment option at checkout. Orders that were already placed with it aren't affected. If you install the app again later, the same payment method is turned back on instead of being created again.

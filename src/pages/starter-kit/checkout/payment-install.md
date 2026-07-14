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

The `payment-method` app registers [`create-payment-methods`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/apps/payment-method/scripts/create-payment-methods.js) as a [custom installation step](../../app-management/installation/customize.md#custom-installation-steps), so it runs automatically when the app is installed or uninstalled.

### Install

Creates (or reactivates) one out-of-process payment method, `method-1`, on the associated Commerce instance via `POST oope_payment_method/`, with `active: true` explicitly forced in the payload.

### Uninstall

Deactivates the payment method (`active: false`) via the same endpoint. Commerce has no delete endpoint for out-of-process payment methods, so this is the only mechanism the platform supports, not a workaround.

Setting `active: false` triggers `PaymentMethodAdapter::isActive()`, which excludes the method from checkout's available-payment-methods list — the same first-class hook any core payment method's active flag uses. Historical orders aren't affected: `sales_order_payment.method` stores the code as a plain string, not a foreign key.

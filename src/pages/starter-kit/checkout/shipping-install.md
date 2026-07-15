---
title: Install the shipping module
description: Learn about the Adobe Commerce shipping integration for the checkout starter kit and how you can get started.
keywords:
  - App Builder
  - Extensibility
---

# Install the shipping module

To begin using the `shipping-method` app, ensure that you have completed the [getting started](getting-started.md) and [configuration](configure.md) steps.

For more ideas on how you can use the shipping module, refer to [shipping use cases](shipping-use-cases.md).

## Prerequisites

* Adobe Commerce on cloud infrastructure or on-premises: 2.4.5+
* PHP 8.1+
* Magento Open Source is not supported.

## Installation

<Fragment src="/_includes/checkout-version.md" />

To enable out-of-process shipping methods in Adobe Commerce, install the `magento/module-out-of-process-shipping-methods` module using the following command:

```bash
composer require magento/module-out-of-process-shipping-methods --with-dependencies
```

## Configuration

<Fragment src="/_includes/checkout-configuration.md" />

The `shipping-method` app sets up Commerce for you automatically as part of installation, using an [App Management custom installation step](../../app-management/installation/customize.md#custom-installation-steps).

### Install

Installing the app creates two demo shipping carriers you can use right away to try out out-of-process shipping rates: **DPS** (Demo Postal Service) and **Fedex**.

### Uninstall

Uninstalling the app disables these carriers, so they immediately stop appearing as shipping options at checkout. If you install the app again later, the same carriers are turned back on instead of being created again.

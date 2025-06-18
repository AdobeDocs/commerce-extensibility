---
title: Install the payment module
description: Learn about the Adobe Commerce payment integration for the checkout starter kit and how you can get started.
keywords:
  - App Builder
  - Extensibility
---

import Configuration from '/src/_includes/checkout-configuration.md'
import Version from '/src/_includes/checkout-version.md'

# Install the payment module

To begin using the payment module with the checkout starter kit, ensure that you have completed the [getting started](./getting-started.md) and [configuration](./configure.md) steps.

For more ideas on how you can use the payment module, refer to [payment use cases](./payment-use-cases.md).

## Prerequisites

* Adobe Commerce on cloud infrastructure or on-premises: 2.4.5+
* PHP 8.1+
* Magento Open Source is not supported.

## Installation

<Version />

To enable out-of-process payment methods in Commerce, install the `magento/module-out-of-process-payment-methods` module using the following command:

```bash
composer require magento/module-out-of-process-payment-methods --with-dependencies
```

## Configuration

<Configuration />

The starter kit provides the [`create-payment-methods`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/create-payment-methods.js) script to help configure Adobe Commerce. It reads the payment methods configuration from the `payment-methods.yaml` file and creates the payment methods in Adobe Commerce.

To run this script, use the following command:

```bash
npm run create-payment-methods
```

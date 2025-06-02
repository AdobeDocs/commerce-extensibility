---
title: Install the shipping module
description: Learn about the Adobe Commerce shipping integration for the checkout starter kit and how you can get started.
keywords:
  - App Builder
  - Extensibility
---

import Version from '/src/_includes/checkout-version.md'

# Install the shipping module

To begin using the shipping module with the checkout starter kit, ensure that you have completed the [getting started](./getting-started.md) and [configuration](./configure.md) steps.

For more ideas on how you can use the shipping module, refer to [shipping use cases](./shipping-use-cases.md).

## Prerequisites

* Adobe Commerce on cloud infrastructure or on-premises: 2.4.5+
* PHP 8.2+
* Magento Open Source is not supported.

## Installation

<Version />

To enable out-of-process shipping methods in Adobe Commerce, install the `magento/module-out-of-process-shipping-methods` module using the following command:

```bash
composer require magento/module-out-of-process-shipping-methods --with-dependencies
```

## Configuration

The starter kit provides the [`create-shipping-carriers`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/create-shipping-carriers.js) script to help configure Adobe Commerce. It reads the shipping carriers configuration from the `shipping-carriers.yaml` file and creates the shipping carriers in Adobe Commerce.

To run this script, use the following command:

```bash
npm run create-shipping-carriers
```

To retrieve shipping carriers from Commerce, use the [`get-shipping-carriers`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/get-shipping-carriers.js) script:

```bash
npm run get-shipping-carriers
```

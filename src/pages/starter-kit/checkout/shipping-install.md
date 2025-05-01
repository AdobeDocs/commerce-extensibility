---
title: Install the shipping module
description: Learn about the Adobe Commerce shipping integration for the checkout starter kit and how you can get started.
keywords:
  - App Builder
  - Extensibility
---

# Install the shipping module

To begin using the shipping module with the checkout starter kit, ensure that you have completed the [getting started](./getting-started.md) and [configuration](./configure.md) steps.

For more ideas on how you can use the shipping module, refer to [shipping use cases](./shipping-use-cases.md).

To enable out-of-process shipping methods in Adobe Commerce, install the `magento/module-out-of-process-shipping-methods` module using the following command:

```bash
  composer require magento/module-out-of-process-shipping-methods --with-dependencies
```

## Configuration

The starter kit provides scripts to help you create shipping carriers for your project. Run these scripts by using the following format: `npm run <script-name>`.

### `create-shipping-carriers` script

To add shipping methods to the Adobe Commerce instance using webhooks, you must first create shipping carriers.

The [`create-shipping-carriers`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/create-shipping-carriers.js) script creates shipping carriers in Adobe Commerce, by reading the shipping carriers configuration from `shipping-carriers.yaml`.

### `get-shipping-carriers` script

To retrieve shipping carriers from Commerce, use the [`get-shipping-carriers`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/get-shipping-carriers.js) script.

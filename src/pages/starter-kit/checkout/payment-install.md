---
title: Install the payment module
description: Learn about the Adobe Commerce payment integration for the checkout starter kit and how you can get started.
keywords:
  - App Builder
  - Extensibility
---

# Install the payment module

To begin using the payment module with the checkout starter kit, ensure that you have completed the [getting started](./getting-started.md) and [configuration](./configure.md) steps.

For more ideas on how you can use the payment module, refer to [payment use cases](./payment-use-cases.md).

To enable out-of-process payment methods in Commerce, install the `magento/module-out-of-process-payment-methods` module using the following command:

```bash
  composer require magento/module-out-of-process-payment-methods --with-dependencies
```

## Configuration

The starter kit provides a script to help you create payment methods for your project. Run this script by using the following format: `npm run <script-name>`.

### create-payment-methods

The [`create-payment-methods`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/create-payment-methods.js) script creates payment methods in Adobe Commerce.

It reads the payment methods configuration from the `payment-methods.yaml` file and creates the payment methods in Adobe Commerce.

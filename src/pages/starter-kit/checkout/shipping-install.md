---
title: Install the shipping module
description: Learn about the Adobe Commerce shipping integration for the checkout starter kit and how you can get started.
keywords:
  - App Builder
  - Extensibility
---

# Install the shipping module

To begin using the shipping module with the checkout starter kit, ensure that you have completed the [getting started](getting-started.md) and [configuration](configure.md) steps.

For more ideas on how you can use the shipping module, refer to [shipping use cases](shipping-use-cases.md).

## Prerequisites

* Adobe Commerce on cloud infrastructure or on-premises: 2.4.5+
* PHP 8.1+
* Magento Open Source is not supported.

## Installation

<InlineAlert variant="info" slots="text"/>

Adobe Commerce as a Cloud Service is preconfigured with all the required modules for the checkout starter kit. Cloud Service users can proceed by [configuring an App Builder project](./getting-started.md#initial-configuration) or [configuring Commerce](./configure.md).

<Edition slots="text" backgroundcolor="blue" />

PaaS Only

Before installing Commerce modules, ensure that you have the required credentials in `auth.json` with [access to the Adobe Commerce repository](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/prerequisites/authentication-keys).

To enable out-of-process shipping methods in Adobe Commerce, install the `magento/module-out-of-process-shipping-methods` module using the following command:

```bash
composer require magento/module-out-of-process-shipping-methods --with-dependencies
```

## Configuration

<InlineAlert variant="info" slots="text"/>

This step requires the [Adobe Commerce HTTP Client](./connect.md#connect-to-adobe-commerce) to authenticate the Commerce instance.

The starter kit provides the [`create-shipping-carriers`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/create-shipping-carriers.js) script to help configure Adobe Commerce. It reads the shipping carriers configuration from the `shipping-carriers.yaml` file and creates the shipping carriers in Adobe Commerce.

To run this script, use the following command:

```bash
npm run create-shipping-carriers
```

To retrieve shipping carriers from Commerce, use the [`get-shipping-carriers`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/get-shipping-carriers.js) script:

```bash
npm run get-shipping-carriers
```

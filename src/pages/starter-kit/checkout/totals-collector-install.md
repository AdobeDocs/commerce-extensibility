---
title: Install the totals collector module
description: Learn about the Adobe Commerce out-of-process totals collector for the checkout starter kit and how you can get started.
keywords:
  - App Builder
  - Extensibility
---

import Configuration from '/src/_includes/checkout-configuration.md'
import Version from '/src/_includes/checkout-version.md'

# Install the totals collector module

To begin using the totals collector module with the checkout starter kit, ensure that you have completed the [getting started](./getting-started.md) and [configuration](./configure.md) steps.

For more ideas on how you can use the totals collector module, refer to [totals collector use cases](./totals-collector-use-cases.md).

## Prerequisites

* Adobe Commerce on cloud infrastructure or on-premises: 2.4.5+
* PHP 8.1+
* The [magento/module-adobe-commerce-webhooks](https://developer.adobe.com/commerce/extensibility/webhooks/) module (required by the totals collector).

## Installation

<Version />

To enable out-of-process quote totals collection (for example, discounts from an external service) in Adobe Commerce, install the `magento/module-out-of-process-totals-collector` module using the following command:

```bash
composer require magento/module-out-of-process-totals-collector --with-dependencies
```

## Configuration

<Configuration />

After installation, register a webhook so that Adobe Commerce can call your App Builder application when quote totals are collected. The webhook runs after the core discount totals collector; your endpoint returns a JSON Patch response that is applied to the quote totals and items.

For webhook registration details and payload/response format, see [totals collector use cases](./totals-collector-use-cases.md#totals-collector-webhook).

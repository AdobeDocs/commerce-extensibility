---
title: Install the tax module
description: Learn about the Adobe Commerce tax integration for the checkout starter kit and how you can get started.
keywords:
  - App Builder
  - Extensibility
---

import Version from '/src/_includes/checkout-version.md'

# Install the tax module

To begin using the checkout starter kit, ensure that you have completed the [getting started](./getting-started.md) and [configuration](./configure.md) steps.

For more ideas on how you can use the tax module, refer to [tax use cases](./tax-use-cases.md).

## Prerequisites

* Adobe Commerce on cloud infrastructure or on premises: 2.4.6+
* PHP 8.2+
* Magento Open Source is not supported.

## Installation

<Version />

To enable out-of-process tax management in Adobe Commerce, install the `magento/module-out-of-process-tax-management` module using the following command:

```bash
 composer require magento/module-out-of-process-tax-management --with-dependencies
```

## Configuration

The starter kit provides the [`create-tax-integrations`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/create-tax-integrations.js) script to help configure Adobe Commerce. It reads the tax integrations configuration from the `tax-integrations.yaml` file and creates tax integrations in Adobe Commerce.

To run this script, use the following command:

```bash
npm run create-tax-integrations
```

## Limitations

This extension overrides the class `Magento\Tax\Model\Sales\Total\Quote\Tax` in the `di.xml` file

```xml
<preference for="Magento\Tax\Model\Sales\Total\Quote\Tax"
                type="Magento\OutOfProcessTaxManagement\Model\Tax\Sales\Total\Quote\Tax"/>
```

As a result, this extension is not compatible with other tax extensions that also override this class, such as TaxJar or Avalara.

If you need to use another tax extension, Adobe recommends disabling this extension to prevent conflicts.

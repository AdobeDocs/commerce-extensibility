---
title: Install the tax module
description: Learn about the Adobe Commerce tax integration for the checkout starter kit and how you can get started.
keywords:
  - App Builder
  - Extensibility
---

# Install the tax module

To begin using the `tax-integration` app, ensure that you have completed the [getting started](getting-started.md) and [configuration](configure.md) steps.

For more ideas on how you can use the tax module, refer to [tax use cases](tax-use-cases.md).

## Prerequisites

* Adobe Commerce on cloud infrastructure or on-premises: 2.4.5+
* PHP 8.1+
* Magento Open Source is not supported.

## Installation

<Fragment src="/_includes/checkout-version.md" />

To enable out-of-process tax management in Adobe Commerce, install the `magento/module-out-of-process-tax-management` module using the following command:

```bash
composer require magento/module-out-of-process-tax-management --with-dependencies
```

For Adobe Commerce version 2.4.5, run the following command if you encounter any issues during `magento setup:install` process:

```bash
magento setup:di:compile
````

## Configuration

<Fragment src="/_includes/checkout-configuration.md" />

The `tax-integration` app sets up Commerce for you automatically as part of installation, using an [App Management custom installation step](../../app-management/installation/customize.md#custom-installation-steps).

### Install

Installing the app creates a demo tax integration, **My tax integration**, using the `/V1/oope_tax_management/tax_integration` REST endpoint, so you can try out out-of-process tax calculation right away.

### Uninstall

Uninstalling the app disables this tax integration via the same endpoint, so Commerce immediately goes back to calculating tax itself instead of calling out to the app. If you install the app again later, the same tax integration is turned back on instead of being created again.

## Limitations

This extension overrides the class `Magento\Tax\Model\Sales\Total\Quote\Tax` in the `di.xml` file

```xml
<preference for="Magento\Tax\Model\Sales\Total\Quote\Tax"
                type="Magento\OutOfProcessTaxManagement\Model\Tax\Sales\Total\Quote\Tax"/>
```

As a result, this extension is not compatible with other tax extensions that also override this class, such as TaxJar or Avalara.

If you need to use another tax extension, Adobe recommends disabling this extension to prevent conflicts.

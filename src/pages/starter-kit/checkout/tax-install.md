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

The `tax-integration` app registers [`create-tax-integrations`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/apps/tax-integration/scripts/create-tax-integrations.js) as a [custom installation step](../../app-management/installation/customize.md#custom-installation-steps), so it runs automatically when the app is installed or uninstalled.

### Install

Creates (or reactivates) one out-of-process tax integration, `oop-tax-integration`, on the associated Commerce instance via `POST oope_tax_management/tax_integration`, with `active: true` explicitly forced in the payload.

### Uninstall

Deactivates the tax integration (`active: false`) via the same endpoint. Commerce has no delete endpoint at all for this entity — `active: false` is the only mechanism the platform supports, not a workaround.

Setting `active: false` makes `OopTaxIntegrationHelper::getActiveIntegration()` return `null`, so Commerce's tax calculation falls back entirely to core Magento tax calculation instead of dispatching the OOPE webhook. There's no referential-integrity concern: orders and quotes don't store a foreign key to this row.

## Limitations

This extension overrides the class `Magento\Tax\Model\Sales\Total\Quote\Tax` in the `di.xml` file

```xml
<preference for="Magento\Tax\Model\Sales\Total\Quote\Tax"
                type="Magento\OutOfProcessTaxManagement\Model\Tax\Sales\Total\Quote\Tax"/>
```

As a result, this extension is not compatible with other tax extensions that also override this class, such as TaxJar or Avalara.

If you need to use another tax extension, Adobe recommends disabling this extension to prevent conflicts.

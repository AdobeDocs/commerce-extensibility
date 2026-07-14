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

The `shipping-method` app registers [`create-shipping-carriers`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/apps/shipping-method/scripts/create-shipping-carriers.js) as a [custom installation step](../../app-management/installation/customize.md#custom-installation-steps), so it runs automatically when the app is installed or uninstalled.

### Install

Creates (or reactivates) two out-of-process shipping carriers on the associated Commerce instance via `POST oope_shipping_carrier`, both with `active: true` explicitly forced in the payload:

- **DPS** (Demo Postal Service, US/CA)
- **Fedex** (Fedex Service, US)

### Uninstall

Deactivates both carriers (`active: false`) via the same endpoint, rather than deleting them. Commerce does expose a `DELETE /V1/oope_shipping_carrier/:code` endpoint that hard-deletes the row, but this app deliberately doesn't use it, for consistency with the payment and tax apps, which have no delete endpoint available to them.

Setting `active: false` immediately removes the carrier from checkout rate collection (`ShippingPlugin::appendRates` skips inactive carriers, so no shipping rates are quoted for it) and from the list of active carriers checkout uses. It doesn't remove the carrier from Commerce's unfiltered carrier listing (for example, admin dropdowns), so a deactivated carrier can still appear there — a cosmetic difference from a true delete, not a functional one.

Reinstalling the app reactivates the same rows (upsert by code).

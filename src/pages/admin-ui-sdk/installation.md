---
title: Install Adobe Commerce Admin UI SDK
description: Learn how to install the Adobe Commerce Admin UI SDK.
---

# Install Adobe Commerce Admin UI SDK

This topic describes the basic steps to install the Admin UI SDK.

## Prerequisites

### Adobe Commerce

* Adobe Commerce on cloud infrastructure or on premises: 2.4.5+
* PHP 8.1+
* [Adobe Identity Management Service (IMS) for Adobe Commerce](https://experienceleague.adobe.com/docs/commerce-admin/start/admin/ims/adobe-ims-integration-overview.html)

<InlineAlert variant="info" slots="text1" />

Magento Open Source is not supported.

### Adobe App Builder

The [Adobe App Builder _Getting Started_ guide](https://developer.adobe.com/app-builder/docs/getting_started/) lists the latest software requirements for creating App Builder apps.

## Installation steps

You can install the Admin UI SDK on Adobe Commerce on cloud infrastructure and on-premises instances.

### Adobe Commerce on cloud infrastructure

This method installs the SDK on a cloud instance.

1. On your local workstation, change to the Cloud project root directory.

1. Update your `composer.json` file:

   ```bash
   composer require magento/module-commerce-backend-uix": ">=1.0
   ```

1. Update dependencies and install the extension:

   ```bash
   composer update
   ```

   The `composer update` command updates all dependencies. If you do not want to update all dependencies at the same time, use this command instead:

   ```bash
   composer update magento/module-commerce-backend-uix
   ```

1. Commit and push your changes.

### On-premises

This method installs the SDK on an On-premises instance.

1. Add the SDK module to the `require` section of the `composer.json` file:

   ```bash
   composer require magento/module-commerce-backend-uix": ">=1.0
   ```

1. Update dependencies and install the extension:

   ```bash
   composer update
   ```

   The `composer update` command updates all dependencies. If you do not want to update all dependencies at the same time, use this command instead:

   ```bash
   composer update magento/module-commerce-backend-uix
   ```

1. Upgrade Adobe Commerce:

   ```bash
   bin/magento setup:upgrade
   ```

1. Clear the cache:

   ```bash
   bin/magento cache:clean
   ```

1. Commit your changes.

1. Update your on-premises instance to ensure the committed code is deployed.

---
title: Install Adobe I/O Events for Adobe Commerce
description: Learn how to install the Commerce modules needed for Adobe I/O Events for Adobe Commerce.
keywords:
  - Events
  - Extensibility
---

# Install Adobe I/O Events for Adobe Commerce

Adobe I/O Events for Adobe Commerce requires Adobe Commerce 2.4.4 or higher.

Magento Open Source is not supported.

After you have created an [App Builder project](./project-setup.md), you must install the Commerce modules that enable integrations with Adobe I/O Events.

## Install Adobe I/O modules on Commerce

The following steps apply to both Adobe Commerce on cloud infrastructure and on-premises installations. Cloud customers must perform additional steps to configure the `ece-tools` package.

1. If you are running Commerce 2.4.4 or 2.4.5, use the following command to load the eventing modules:

   ```bash
   composer require magento/commerce-eventing=^1.0 --no-update
   ```

   Commerce 2.4.6 and later loads these modules automatically.

1. Update the project dependencies.

   ```bash
   composer update
   ```

1. Enable the new modules:

   ```bash
   bin/magento module:enable Magento_AdobeCommerceEventsClient Magento_AdobeCommerceEventsGenerator Magento_AdobeIoEventsClient Magento_AdobeCommerceOutOfProcessExtensibility
   ```

## On-premise installation

1. Run the following command to initialize the `AdobeCommerceEvents` module. This module consists of generated plugins based on a list of subscribed events and helps publish and process events.

   ```bash
   bin/magento events:generate:module
   ```

1. Enable the generated module:

   ```bash
   bin/magento module:enable Magento_AdobeCommerceEvents
   ```

1. Upgrade your instance:

   ```bash
   bin/magento setup:upgrade
   ```

1. Compile your instance to generate new classes:

   ```bash
   bin/magento setup:di:compile
   ```

## Cloud configuration

Use the following steps to perform additional configuration for Adobe Commerce on cloud infrastructure:

1. Add the `app/etc/config.php` file to your working repository:

   ```bash
   git add app/etc/config.php
   ```

1. Run the `composer info magento/ece-tools` command to determine your version of ece-tools. If the version is less than `2002.1.13`, [update to the most recent version](https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/dev-tools/ece-tools/update-package.html).

1. Enable eventing in the `.magento.env.yaml` file:

   ```yaml
   stage:
      global:
         ENABLE_EVENTING: true
   ```

1. Commit and push updated files to the Cloud environment.

## Update Adobe I/O Events for Adobe Commerce

Use the following procedure to update patch versions of Adobe I/O Events for Adobe Commerce, such as from V1.3.0 to V1.4.0.

## On-premise updates

Use the following steps to update to version 1.4.0.

1. Disable the eventing modules:

   ```bash
   bin/magento module:disable Magento_AdobeCommerceEventsClient Magento_AdobeCommerceEventsGenerator Magento_AdobeCommerceEvents
   ```

1. Update the eventing modules:

   ```bash
   composer update magento/commerce-eventing --with-dependencies
   ```

1. Re-enable the pre-existing modules and enable the new `Magento_AdobeCommerceOutOfProcessExtensibility` module.

   ```bash
   bin/magento module:enable Magento_AdobeCommerceEventsClient Magento_AdobeCommerceEventsGenerator Magento_AdobeCommerceEvents Magento_AdobeCommerceOutOfProcessExtensibility
   ```

1. Upgrade Commerce:

   ```bash
   bin/magento setup:upgrade
   ```

1. Clear the cache:

   ```bash
   bin/magento cache:clean
   ```

1. Compile the dependencies:

   ```bash
   bin/magento bin/magento setup:di:compile
   ```

## Cloud updates

Run the following command to update the eventing modules. ECE tools performs the other steps required by on-premises installations.

```bash
composer update magento/commerce-eventing --with-dependencies
```

---
title: Install Adobe Commerce Webhooks
description: Learn how to install the Commerce modules needed to implement webhooks.
keywords:
  - Extensibility
---

# Install Adobe Commerce Webhooks

The following steps apply to both Adobe Commerce on cloud infrastructure and on-premises installations. Cloud customers must perform additional steps to configure the `ece-tools` package.

1. Use the following command to load the webhooks modules:

   ```bash
   composer require magento/commerce-webhooks=^1.0 --no-update
   ```

1. Update the project dependencies.

   ```bash
   composer update
   ```

1. Enable the new modules:

   ```bash
   bin/magento module:enable --all
   ```

## On-premise installation

1. Run the following command to initialize the `AdobeCommerceWebhookPlugins` module. This module consists of generated plugins based on a list of subscribed webhooks.

   ```bash
   bin/magento webhooks:generate:module
   ```

1. Enable the generated modules:

   ```bash
   bin/magento module:enable Magento_AdobeCommerceWebhookPlugins
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

1. Run the `composer info magento/ece-tools` command to determine your version of ece-tools. If the version is less than `2002.1.16`, [update to the most recent version](https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/dev-tools/ece-tools/update-package.html).

1. Enable webhooks in the `.magento.env.yaml` file:

   ```yaml
   stage:
      global:
         ENABLE_WEBHOOKS: true
   ```

1. Commit and push updated files to the Cloud environment.

## Update Adobe Commerce Webhooks

Use the following procedure to update minor or patch versions of Adobe Commerce Webhooks, such as from V1.0.0 to V1.1.0.

1. Run the following command to update the webhook modules:

   ```bash
   composer update magento/commerce-webhooks --with-dependencies
   ```

1. For on-premises installations, run the following command to upgrade Adobe Commerce and clear the cache.

   ```bash
   bin/magento setup:upgrade && bin/magento cache:clean
   ```

   **Note:** Adobe Commerce on cloud infrastructure upgrades automatically.
   
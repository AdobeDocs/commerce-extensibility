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
   bin/magento module:enable AdobeCommerceWebhookPlugins
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

If the ece-tools version `2002.1.16` is not released yet, use the develop branch from the git:

Add to the repositories section of your `composer.json`

```json
        "ece-tools": {
            "type": "git",
            "url": "git@github.com:magento/ece-tools.git"
        },
```

Add to the `require` section of your `composer.json`

```json
    "magento/ece-tools": "dev-develop as 2002.1.16",
```

Run the `composer update`.

1. Enable webhooks in the `.magento.env.yaml` file:

   ```yaml
   stage:
      global:
         ENABLE_WEBHOOKS: true
   ```

1. Commit and push updated files to the Cloud environment.

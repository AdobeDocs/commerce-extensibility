---
title: Getting started with checkout starter kit
description: Learn about the Adobe Commerce checkout starter kit and how you can get started.
keywords:
  - App Builder
  - Extensibility
---

# Getting started

To begin using the checkout starter kit, ensure that your Adobe Commerce installation meets the following prerequisites:

- Install the Out-of-Process Payment Extensions (OOPE) Module in Adobe Commerce

    To enable out-of-process payment methods in Commerce, install the `magento/module-out-of-process-payment-methods`. This module enables out-of-process payment functionalities.
    To install the module, run the following command using Composer:

    ```bash
    composer require magento/module-out-of-process-payment-methods --with-dependencies
    ```

- Install the Commerce Eventing Module

    The [Commerce Eventing module](https://developer.adobe.com/commerce/extensibility/events/) is crucial for handling events within Adobe Commerce. The eventing module is installed automatically in Adobe Commerce version `2.4.6` and higher.

    This starter kit requires version `1.10.0` or higher of the Commerce Eventing module. To view your installed version, run the following command:

    ```bash
    composer show magento/commerce-eventing
    ```

    To install this module, run the following command using Composer:

    ```bash
    composer update magento/commerce-eventing --with-dependencies
    ```

    For Adobe Commerce versions `2.4.4` or `2.4.5`, you must install the Adobe I/O Events for Adobe Commerce module manually. Follow the instructions provided in [Adobe I/O Events installation](https://developer.adobe.com/commerce/extensibility/events/installation/).

## Prerequisites

You must install or have access to the following prerequisites to develop with the Adobe Commerce checkout starter kit:

- [Node.js](https://nodejs.org/) version 22. If you have Node Version Manager (`nvm`) installed, you can run the following command to install and use the required version:

  ```bash
  nvm install 22 && nvm use
  ```

- [Adobe I/O CLI](https://developer.adobe.com/runtime/docs/guides/tools/cli_install/).

- Access to the [Adobe Developer Console](https://console.adobe.io/) with an App
  Builder license. If you do not have access to the Adobe Developer Console or App Builder, refer to [get access to App Builder](https://developer.adobe.com/app-builder/docs/overview/getting_access/#get-access-to-app-builder).

## Initial configuration

Use the following steps to configure your local environment:

1. Create a folder for your project and navigate to it.

1. Execute the following command to create an Adobe Developer Console project in your organization and using the Commerce checkout starter kit as a template:

  ```bash
  aio app init --repo adobe/commerce-checkout-starter-kit --github-pat $GITHUB_PAT
  ```

  Replace `$GITHUB_PAT` with your GitHub personal access token. For more information, refer to [managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

1. The starter kit requires you to add the following services in the console project:

   - I/O Management API
   - I/O Events
   - Adobe I/O Events for Adobe Commerce

  Execute the following command to add the services by selecting them from the list:

  ```bash
  aio app add service
  ```

1. Copy the environment variables from the [`env.dist`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/env.dist) to a local `.env` file and enter the required values.

After completing the previous steps you are ready to deploy the initial project in app builder. However, consider reviewing the scripts provided to configure the Commerce events provider, its subscriptions, any 3rd party events or an out-of-process payment method. We review these scripts in detail on the [Project structure](./structure.md) page.

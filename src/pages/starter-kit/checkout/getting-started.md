---
title: Getting started with checkout starter kit
description: Learn about the Adobe Commerce checkout starter kit and how you can get started.
keywords:
  - App Builder
  - Extensibility
---

# Getting started

To begin using the checkout starter kit, ensure that your Adobe Commerce installation meets the following prerequisites and then proceed with the installation and configuration.

## Prerequisites

You must install or have access to the following prerequisites to develop with the Adobe Commerce checkout starter kit:

- Adobe Commerce as a Cloud Service or Adobe Commerce version `2.4.5` or higher.

- [Node.js](https://nodejs.org/) version 24. If you have Node Version Manager (`nvm`) installed, you can run the following command to install and use the required version:

  ```bash
  nvm install 24 && nvm use
  ```

- [Adobe I/O CLI](https://developer.adobe.com/app-builder/docs/guides/runtime_guides/tools/cli-install).

- Access to the [Adobe Developer Console](https://developer.adobe.com/console/) with an App
  Builder license. If you do not have access to the Adobe Developer Console or App Builder, refer to [get access to App Builder](https://developer.adobe.com/app-builder/docs/get_started/app_builder_get_started/set-up).

- If you intend to use the Admin UI SDK (version `3.0` and higher), you must also complete the [Admin UI SDK installation process](../../admin-ui-sdk/installation.md).

<InlineAlert variant="help" slots="text1, text2"/>

When completing the steps to [install the Admin UI SDK](../../admin-ui-sdk/installation.md), use the following command to get a version compatible with the checkout starter kit:

```bash
composer require "magento/commerce-backend-sdk": ">=3.0"
```

## Initialize your app

Each checkout domain (payment, shipping, tax, totals collector) is an independent app. Initialize the one you need using one of the following approaches:

- To start from this starter kit's app as a template, run the following command, where `<dir>` is the name of the project directory to create:

  ```bash
  aio app init <dir> --repo adobe/commerce-checkout-starter-kit/apps/<app> --github-pat $GITHUB_PAT
  ```

  Replace `<app>` with the domain you want to install (`shipping-method`, `payment-method`, `tax-integration`, or `totals-collector`), and `$GITHUB_PAT` with your GitHub personal access token. For more information, refer to [managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

  This creates an Adobe Developer Console project (or lets you select an existing one), but does not add the services the app needs. Add them manually in the [Adobe Developer Console](https://developer.adobe.com/console/), or run:

  ```bash
  aio app add service
  ```

  and select the services required for your app, such as I/O Management API and Adobe Commerce as a Cloud Service.

- To build your own App Management app from scratch instead, refer to [Initialize your app](../../app-management/initialize-app.md).

After completing these steps you can:

- [Connect to Adobe Commerce](connect.md)
- [Configure Commerce](configure.md)
- [Deploy your app](development.md#deploy-the-application)

## Install Commerce modules

<Fragment src="/_includes/checkout-version.md" />

### Install the individual modules

To install the individual modules, refer to the following topics:

- [Payment](payment-install.md)
- [Shipping](shipping-install.md)
- [Tax](tax-install.md)
- [Totals collector](totals-collector-install.md)

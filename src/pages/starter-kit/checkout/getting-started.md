---
title: Getting started with checkout starter kit
description: Learn about the Adobe Commerce checkout starter kit and how you can get started.
keywords:
  - App Builder
  - Extensibility
---

import Version from '/src/_includes/checkout-version.md'

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

- Access to the [Adobe Developer Console](https://console.adobe.io/) with an App
  Builder license. If you do not have access to the Adobe Developer Console or App Builder, refer to [get access to App Builder](https://developer.adobe.com/app-builder/docs/overview/getting_access/#get-access-to-app-builder).

- If you intend to use the Admin UI SDK (version `3.0` and higher), you must also complete the [Admin UI SDK installation process](../../admin-ui-sdk/installation.md).

<InlineAlert variant="help" slots="text1, text2"/>

When completing the steps to [install the Admin UI SDK](../../admin-ui-sdk/installation.md), use the following command to get a version compatible with the checkout starter kit:

```bash
composer require "magento/commerce-backend-sdk": ">=3.0"
```

## Initial configuration

Use the following steps to configure your local environment:

1. Create a folder for your project and navigate to it.

  ```bash
  mkdir <your-project-name> && cd <your-project-name>
  ```

1. Execute the following command to create an Adobe Developer Console project in your organization and using the Commerce checkout starter kit as a template:

  ```bash
  aio app init --repo adobe/commerce-checkout-starter-kit --github-pat $GITHUB_PAT
  ```
  
  Replace `$GITHUB_PAT` with your GitHub personal access token. For more information, refer to [managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

1. You can create an app builder project, or select the existing one, while initializing the starter kit. The created project can be found in the [Adobe Developer Console](https://console.adobe.io/).

  ```bash
  ? Select Org: <your-ims-org>
  ? Select a Project, or press + to create new:
  ?   > do you wish to create a new Project? Yes
  Enter Project details:
  ? Name: <your-project-name>
  ? Title: <your-project-title>
  ? Description: <your-project-description>
  ```

  This creates a new project using **App Builder** as a template, including **runtime environment with each workspace**.

1. The starter kit requires you to add the following services in the console project:

   - I/O Management API
   - I/O Events
   - Adobe I/O Events for Adobe Commerce
   - &#8203;<Edition name="saas" /> Adobe Commerce as a Cloud Service. When asked to select a product profile, choose **Default - Cloud Manager**. If this option is not displayed, make sure you have [developer permissions](https://experienceleague.adobe.com/en/docs/commerce/cloud-service/user-management#add-users-developers-and-product-profile-admins) to **Adobe Commerce as a Cloud Service - Backend - Commerce Cloud Manager**.

   Execute the following command to add the services by selecting them from the list:

   ```bash
   aio app add service
   ```

   The variable `AIO_ims_contexts_{credential}_scopes` will be automatically populated but may need to be updated with the scopes required for your project.
   The scopes depend on the services you selected in the previous step. If you included all the specified services, the set of scopes should look like this:

   - &#8203;<Edition name="paas" />

      ```env
      ["AdobeID","openid","read_organizations","additional_info.projectedProductContext","additional_info.roles","adobeio_api","read_client_secret","manage_client_secrets","event_receiver_api"]
      ```

   - &#8203;<Edition name="saas" />

      ```env
      ["AdobeID","openid","read_organizations","additional_info.projectedProductContext","additional_info.roles","adobeio_api","read_client_secret","manage_client_secrets","event_receiver_api","profile","email","org.read","commerce.accs"]
      ```

1. Copy the environment variables from the [`env.dist`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/env.dist) to a local `.env` file and enter the required values.

After completing the previous steps you can:

- [Connect to Adobe Commerce](./connect.md)
- [Configure the available scripts](./configure.md)
- [Deploy your initial project in App Builder](./development.md#deploy-the-application)

## Install Commerce modules

<Version />

### Install the Payment, Shipping, or Tax modules

To install the individual modules, refer to the following topics:

- [Payment](./payment-install.md)
- [Shipping](./shipping-install.md)
- [Tax](./tax-install.md)

### Install the Commerce Eventing module (Commerce 2.4.5 only)

The [Commerce Eventing module](https://developer.adobe.com/commerce/extensibility/events/) is crucial for handling events within Adobe Commerce. The eventing module is installed automatically in Adobe Commerce version `2.4.6` and higher.

This starter kit requires the **Commerce Eventing** module version `1.12.1` or higher, which introduces support for multi-event-provider functionality. It allows multiple App Builder extensions to connect to the same Adobe Commerce instance using isolated event providers.

To view your installed version, run the following command:

```bash
composer show magento/commerce-eventing
```

To install this module, run the following command using Composer:

```bash
composer update magento/commerce-eventing --with-dependencies
```

For Adobe Commerce versions `2.4.5`, you must install the Adobe I/O Events for Adobe Commerce module manually. Follow the instructions provided in [Adobe I/O Events installation](https://developer.adobe.com/commerce/extensibility/events/installation/).

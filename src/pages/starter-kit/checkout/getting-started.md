---
title: Getting started with checkout starter kit
description: Learn about the Adobe Commerce checkout starter kit and how you can get started.
keywords:
  - App Builder
  - Extensibility
---


## Prerequisites

Before starting with the starter kit, ensure that your Adobe Commerce installation meets the following prerequisites:

### Install Out-of-Process Payment Extensions (OOPE) Module in Adobe Commerce

To enable out-of-process payment methods in your Commerce instance, install the `magento/module-out-of-process-payment-methods` in your Commerce instance. This module enables out-of-process payment functionalities.
Execute the following command using Composer:

```bash
composer require magento/module-out-of-process-payment-methods --with-dependencies
```

### Install Commerce Eventing Module in Adobe Commerce

The [Commerce Eventing module](https://developer.adobe.com/commerce/extensibility/events/) is crucial for handling events within Adobe Commerce and has been included in the core since Adobe Commerce version 2.4.6.
Ensure your installation is up-to-date, especially if you are using this starter kit, which requires at least version 1.10.0 of the Commerce Eventing module:

```bash
composer update magento/commerce-eventing --with-dependencies
```

For Adobe Commerce versions 2.4.4 or 2.4.5, the Adobe I/O Events for Adobe Commerce module will need to be installed manually. Follow the instructions provided in the [Adobe I/O Events installation documentation](https://developer.adobe.com/commerce/extensibility/events/installation/).
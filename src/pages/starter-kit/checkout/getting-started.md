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

    The [Commerce Eventing module](https://developer.adobe.com/commerce/extensibility/events/) is crucial for handling events within Adobe Commerce. The eventing module is available in Adobe Commerce version `2.4.6` and higher.

    This starter kit requires version `1.10.0` or higher of the Commerce Eventing module. To install this module, run the following command using Composer:

    ```bash
    composer update magento/commerce-eventing --with-dependencies
    ```

    For Adobe Commerce versions `2.4.4` or `2.4.5`, you must install the Adobe I/O Events for Adobe Commerce module manually. Follow the instructions provided in [Adobe I/O Events installation](https://developer.adobe.com/commerce/extensibility/events/installation/).

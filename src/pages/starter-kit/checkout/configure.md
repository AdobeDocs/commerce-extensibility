---
title: Configure Commerce
description: Learn about how to configure Adobe Commerce to use it with the checkout starter kit.
keywords:
  - App Builder
  - Extensibility
---

# Configure Commerce

This section provides an overview of configuring out-of-process extensibility on Adobe Commerce for developing an app using the checkout starter kit.

Each app's configuration follows the standard [App Management](../../app-management/index.md) conventions.

## Configure Commerce modules

Select one of the following modules to learn about configuring it:

- [Payment](payment-install.md#configuration)
- [Shipping](shipping-install.md#configuration)
- [Tax](tax-install.md#configuration)
- [Totals collector](totals-collector-install.md#configuration)

## Configure OAuth Server-to-Server Credential

OAuth Server-to-Server credential setup happens as part of [initializing your app](../../app-management/initialize-app.md). If OAuth credentials are missing, review [Verify your application is initialized](development.md#verify-your-application-is-initialized).

## Configure Eventing

<InlineAlert variant="info" slots="text, text1"/>

The following configuration is required if you want to use the [Eventing feature](https://developer.adobe.com/commerce/extensibility/events/). Skip this process if you do not plan to use the Eventing feature.

Each app declares its own events in its `app.commerce.config` file. See [Events](../../app-management/installation/events.md) for the full reference on Commerce event subscriptions, external events, and provider configuration.

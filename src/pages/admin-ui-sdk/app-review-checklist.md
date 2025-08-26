---
title: Admin UI SDK App review checklist
description: Learn how to prepare App Builder apps that implement the Admin UI SDK for review.
keywords:
  - App Builder
  - Extensibility
---

# Admin UI SDK App Review Checklist

The following checklist helps you prepare your App Builder apps that implement the Admin UI SDK for review. The checklist includes the required and preferred items that you must complete before submitting your app.

The [App submission guidelines](../app-development/app-submission-guidelines.md) topic further describes the requirements for submitting your App Builder app, including the required information and assets.

Category | Description | Required?
--- | --- | ---
`@adobe/uix-core` and `@adobe/uix-guest` version | The [dependencies version](./app-registration.md#add-an-extensionregistration-component) from `@adobe/uix-sdk` must be set to `1.0.3` to be compatible with Admin UI SDK.| Required
`app.config.yaml`| Apps that include the Admin UI SDK must be configured as an [extension](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/extensions/extensions), and not as a single page application. Therefore, your `app.config.yaml` file must contain an `extensions` block and no `application` block. If you used the integration or checkout starter kit as the foundation of your app, you must convert it to an extension. | Required
Application routing | [App routing](./app-registration.md#update-the-appjs-routing) must redirect to the `ExtensionRegistration` component, which redirects to the main page.| Required
Code layout | The code is organized within a `commerce-backend-ui-1` folder that includes `actions` and `web-src` subdirectories, as shown in [Code layout best practices](./app-registration.md#code-layout-best-practices).| Preferred
`ext.config.yaml` | An [`ext.config.yaml` file](./app-registration.md#add-or-update-the-extconfigyaml) is created with at least one runtime action for the Admin UI SDK registration. It must be secured with `require-adobe-auth` set to `true`. | Required
Extension Registration | The extension registration is correctly coded with a unique [extension ID](https://developer.adobe.com/commerce/extensibility/admin-ui-sdk/app-registration/#add-an-extensionregistration-component).| Required
Extension Registration | Use the same extension ID in the `extension-manifest` file, the `registration` action, the `attach` function, and the `register` function. Using the same extension ID is only mandatory when attaching and registering.| Preferred
Main page requiring shared data | If the main page requires data from the [shared context](https://developer.adobe.com/commerce/extensibility/admin-ui-sdk/extension-points/#shared-contexts) (such as an IMS token or org ID), ensure the extension ID used to `attach` is the same as the one used to `register` in the `ExtensionRegistration` component. | Required
Mandatory config files | The application has `extension-manifest.json` and `install.yaml` [files](https://developer.adobe.com/commerce/extensibility/admin-ui-sdk/app-registration/#add-or-update-the-installyml-file). The `install.yaml` file references the `commerce/backend-ui/1` extension point.|Required
Registration runtime action | Registration runtime action is correctly coded to return the Admin UI SDK registration based on the available [extension points](./extension-points/index.md). | Preferred
Local testing files | `server.js`, `key.pem`, and `cert.pem` files for [local testing](./configuration.md#local-testing) are not included in the app submission. | Preferred

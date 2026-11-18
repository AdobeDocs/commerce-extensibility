---
title: Admin UI SDK App review checklist
description: Prepare Admin UI SDK V1 extensions and V2 App Management extensions for review using version-specific checklists.
keywords:
  - App Builder
  - Extensibility
---

# Admin UI SDK App review checklist

Use the checklist for the extension point your app implements:

* [V2 Extension points](#v2-extension-points) for `commerce/backend-ui/2`.
* [V1 Extension points](#v1-extension-points) for `commerce/backend-ui/1`.

<InlineAlert variant="warning" slots="text" />

V1 extension points are deprecated. New extensions must use V2. See [Migration from V1](extension-points/v2/migration-from-v1.md) when updating an existing extension.

Both checklists supplement the [App submission guidelines](../app-development/app-submission-guidelines.md), which cover documentation, security, dependencies, and submission assets. Complete required items and apply preferred items where relevant. Review conditional requirements only for the capabilities your app implements.

These checklists cover only Admin UI SDK integration. Business configuration, events, webhooks, and general App Management lifecycle requirements are outside their scope.

## V2 Extension points

V2 extensions use App Management. They declare extension points in `app.commerce.config` instead of a V1 `ExtensionRegistration` component or a custom registration action. Review the files and code below; a running Commerce environment is not required.

| Category | Description | Required? |
|---|---|---|
| Dependency versions | The app documentation lists the Admin UI SDK module and library versions required by its [V2 features](../app-management/installation/admin-ui-sdk.md). The V1 `@adobe/uix-sdk` version requirement does not apply to V2. | Required |
| `app.commerce.config` | Extension points are declared under `adminUi`, with valid IDs and the required fields for each [extension point](extension-points/v2/index.md). Fields for `view` and `worker` actions are not mixed. | Required |
| `app.config.yaml` and `install.yaml` | The files reference the `commerce/backend-ui/2` extension and its generated `ext.config.yaml`. See [Generated files](../app-management/build-deploy.md#generated-files). | Required |
| `ext.config.yaml` | The `pre-app-build` hook generates the Admin UI configuration and worker operations from the declared `runtimeAction` values. See [Admin UI SDK registration](../app-management/build-deploy.md#admin-ui-sdk-registration-on-commercebackend-ui2). | Required |
| Extension registration | Registration uses the generated `app-config` action. Changes are made in `app.commerce.config`, not in `.generated` files. | Required |
| Application routing | If the app renders UI, it uses [`createExtensionApp`](../app-management/installation/admin-ui-sdk.md#develop-the-admin-ui). A configured menu has a `menu` page component, and each view `path` has a matching page component in `routes`. Worker-only apps do not require frontend routing. | Required when applicable |
| Pages requiring shared data | Pages use the appropriate [context hooks](extension-points/v2/index.md#reading-context-in-your-app) to read IMS credentials, the Commerce host, selected IDs, or entity IDs. Returned errors are handled before using the data. | Required when applicable |
| Closing iframe actions | Iframe action pages call `actions.close()` or `actions.closeWithError()` from `useHostConnection()` to finish the action. | Required when applicable |
| Runtime actions | Each `runtimeAction` uses `<package>/<action>` format and matches an action and handler in the runtime manifest. The handler follows the matching [V2 request and response format](../app-management/installation/admin-ui-sdk.md), including IDs and error responses. | Required when applicable |
| Action authentication | Runtime actions used by the Admin UI, including `app-config`, have `require-adobe-auth` set to `true`. See [Security requirements](../app-development/app-submission-guidelines.md#security). | Required |
| ACL-protected actions | If an item has `aclProtected: true`, its handler checks permissions with [`getAdminUiPermissionClient`](../app-management/installation/admin-ui-sdk.md#acl-protected-extension-points) before reading protected data or running the operation. The check uses the matching SDK resource ID helper and the administrator's forwarded IMS credentials, not server-to-server credentials. | Required |
| Use of `innerHTML` | The use of `innerHTML` within the Admin UI frontend is prohibited. | Required |
| Tests | Tests cover custom Admin UI handlers and pages, including invalid requests, denied permissions, and errors where applicable. | Preferred |

## V1 Extension points

The following checklist applies only to `commerce/backend-ui/1` extensions. It retains the V1 registration and packaging requirements; these are not the registration model for App Management V2 extensions.

| Category | Description | Required? |
|---|---|---|
| `@adobe/uix-core` and `@adobe/uix-guest` version | The [dependencies version](app-registration.md#add-an-extensionregistration-component) from `@adobe/uix-sdk` must be set to `1.1.11` to be compatible with Admin UI SDK.| Required|
| `app.config.yaml`| Apps that include the Admin UI SDK must be configured as an [extension](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/extensions/extensions), and not as a single page application. Therefore, your `app.config.yaml` file must contain an `extensions` block where the App is configured. An `applications` block should only be included if [database storage](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/storage/database) is required. If you used the integration or checkout starter kit as the foundation of your app, you must convert it to an extension. | Required|
| Application routing | [App routing](app-registration.md#update-the-appjs-routing) must redirect to the `ExtensionRegistration` component. If the menu extension point is being used, the `ExtensionRegistration` component must also redirect to the main page.| Required|
| Code layout | The code is organized within a `commerce-backend-ui-1` folder that includes `actions` and `web-src` subdirectories, as shown in [Code layout best practices](app-registration.md#code-layout-best-practices).| Preferred |
| `ext.config.yaml` | An [`ext.config.yaml` file](app-registration.md#add-or-update-the-extconfigyaml) is created with at least one runtime action for the Admin UI SDK registration. It must be secured with `require-adobe-auth` set to `true`. | Required |
| Extension Registration | The extension registration is correctly coded with a unique [extension ID](app-registration.md#add-an-extensionregistration-component).| Required |
| Extension Registration | If the menu extension point is used, the extension ID should only contain the allowed characters mentioned in the [menu parameters documentation](extension-points/menu.md#parameters).| Required |
| Extension Registration | Use the same extension ID in the `extension-manifest` file, the `registration` action, the `attach` function, and the `register` function. Using the same extension ID is only mandatory when attaching and registering.| Preferred |
| Main page requiring shared data | If the main page requires data from the [shared context](extension-points/index.md#shared-contexts) (such as an IMS token or org ID), ensure the extension ID used to `attach` is the same as the one used to `register` in the `ExtensionRegistration` component. | Required |
| Mandatory config files | The application has `extension-manifest.json` and `install.yaml` [files](app-registration.md#add-or-update-the-installyml-file). The `install.yaml` file references the `commerce/backend-ui/1` extension point.|Required |
| Registration runtime action | Registration runtime action is correctly coded to return the Admin UI SDK registration based on the available [extension points](extension-points/index.md). | Preferred |
| Local testing files | `server.js`, `key.pem`, and `cert.pem` files for [local testing](configuration.md#local-testing) are not included in the app submission. | Required |
| Use of `innerHtml` | The use of `innerHTML` within the SPA is prohibited to prevent potential cross‑site scripting (XSS) vulnerabilities. | Required |

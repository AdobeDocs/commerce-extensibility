---
title: Admin UI SDK App review checklist
description: Prepare Admin UI SDK V1 extensions and V2 App Management extensions for review using version-specific checklists.
keywords:
  - App Builder
  - Extensibility
---

# Admin UI SDK App Review Checklist

Use the checklist for the extension point your app implements:

* [V2 Extension points](#v2-extension-points) for `commerce/backend-ui/2`.
* [V1 Extension points](#v1-extension-points) for `commerce/backend-ui/1`.

V1 and V2 refer to extension point versions, not the installed Admin UI SDK module version. V1 extension points are deprecated. Use V2 for new extensions and see [Migration from V1](extension-points/v2/migration-from-v1.md) when updating an existing extension.

Both checklists supplement the [App submission guidelines](../app-development/app-submission-guidelines.md), which cover documentation, security, dependencies, and submission assets. Complete required items and apply preferred items where relevant. Review conditional requirements only for the capabilities your app implements.

These checklists cover only Admin UI SDK integration. Business configuration, events, webhooks, and general App Management lifecycle requirements are outside their scope.

Review the submitted source code, configuration files, and dependency manifests. These checks do not require deployment, installation, or access to a running Commerce environment.

## V2 Extension points

V2 extensions declare their Admin UI in `app.commerce.config` and are associated and installed through App Management. Commerce reads their registration from the generated `app-config` runtime action. Do not apply V1 requirements for an `ExtensionRegistration` component, registration route, hand-authored registration action, or `commerce-backend-ui-1` folder to a V2-only app.

| Category | Description | Required? |
|---|---|---|
| Admin UI compatibility | Document the Admin UI SDK module and library versions required by the V2 extension points your app uses. Follow [Admin UI configuration](../app-management/installation/admin-ui-sdk.md); do not apply the V1 checklist's direct `@adobe/uix-sdk` dependency pin to V2. | Required |
| Admin UI declarations | Declare supported extension points under `adminUi` in `app.commerce.config`. Validate each declaration against its [V2 extension point reference](extension-points/v2/index.md), including identifiers, required fields, and view-versus-worker field restrictions. | Required |
| Generated Admin UI configuration | `app.config.yaml` and `install.yaml` reference `commerce/backend-ui/2` and its generated `ext.config.yaml`. The `pre-app-build` hook regenerates Admin UI artifacts, including `workerProcess` operations derived from `runtimeAction`. See [Admin UI SDK registration](../app-management/build-deploy.md#admin-ui-sdk-registration-on-commercebackend-ui2). | Required |
| Admin UI registration | Registration uses the generated `app-config` action and the `adminUi` declarations in `app.commerce.config`, not a hand-authored V1 registration action. Custom registration changes are made in the source configuration, not in `.generated` files. | Required |
| Frontend entry point and routing | The frontend uses [`createExtensionApp`](../app-management/installation/admin-ui-sdk.md#develop-the-admin-ui). Its `menu` property supplies a page component when `adminUi.menu` is configured. Each configured view path has a matching page component in `routes`. Routing does not depend on a V1 `ExtensionRegistration` component. | Required when the app renders UI |
| Host context and completion | Pages use the appropriate [context hooks](extension-points/v2/index.md#reading-context-in-your-app) for IMS credentials, Commerce host, selected IDs, and entity IDs, and handle returned errors. Iframe action pages use `useHostConnection()` and call `actions.close()` or `actions.closeWithError()` to complete the flow. | Required when applicable |
| Runtime handlers | Each `runtimeAction` uses `<package>/<action>` format and matches an action declared in the runtime manifest with an implemented handler. Handlers parse requests and return responses according to the matching V2 contract, including selection or entity IDs and error responses. See [Admin UI configuration](../app-management/installation/admin-ui-sdk.md). | Required when the app declares runtime actions |
| Action authentication | Runtime action configuration sets `require-adobe-auth: true` for actions used by the Admin UI, including `app-config`. See the general [security requirements](../app-development/app-submission-guidelines.md#security). | Required |
| Authorization | For items with `aclProtected: true`, runtime handlers check the corresponding resource with [`getAdminUiPermissionClient`](../app-management/installation/admin-ui-sdk.md#acl-protected-extension-points) before accessing protected data or performing the operation. They derive the resource ID with the matching SDK helper and forward the administrator's IMS credentials, rather than using server-to-server credentials for the permission check. | Required when the app declares ACL-protected items |
| Safe rendering | Do not use `innerHTML` in the Admin UI frontend. | Required |
| Automated coverage | The submission includes tests for custom Admin UI handlers and UI flows, including malformed requests, denied permissions, and failure responses where applicable. | Preferred |

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

---
title: Adobe Commerce Admin UI SDK Release Notes
description: This page lists new features and known issues for each release of Adobe Commerce Admin UI SDK
keywords:
  - App Builder
  - Extensibility
---

# Admin UI SDK release notes

## Version 4.1.0

<InlineAlert variant="info" slots="text" />

Admin UI SDK 4.0 was not released externally.

### Release Date

May 18, 2026

### Enhancements

* Extensions are no longer configured from the Adobe Commerce Admin. See [Manage your app](https://experienceleague.adobe.com/en/docs/commerce/app-management/manage-app/manage-app) in the _App Management User Guide_ for installation and setup details. Extension developers should review [App Management](../app-management/index.md) for information about packaging your extension without using the Admin UI SDK for registration.

  Clicking the [**Configure extensions** button](./eligible-extensions-config.md) on **Stores** > Settings > **Configuration** > **Adobe Services** > **Admin UI SDK** > **General Configuration** page now displays a modal dialog that has two tabs. The **Installed Extensions** tab displays the extensions that were installed with App Management. The **Manual Extensions Selection** tab allows you to manage previously-installed extensions, but this tab is deprecated and will be removed in a future release. Extension developers should migrate their extensions to App Management.

* Added the `POST /V1/adminuisdk/extension` and `DELETE /V1/adminuisdk/extension/<workspace_name>/<extension_name>` [REST endpoints](./api.md#app-management) to manage extensions stored in the Commerce database. These endpoints automatically refresh registrations upon execution.

## Version 3.4.1

### Release date

April 10, 2026

### Bug fixes

* Fixed an issue where the Order Extension mass action failed when selecting a large number of orders (700+).

## Version 3.4.0

### Release date

March 3, 2026

### Enhancements

* Added `allow-modals` to the list of allowed values for the `sandbox` parameter in multiple extension points.

### Bug fixes

* Fixed Unit Tests for compatibility with latest version of PHPUnit.

## Version 3.3.2

### Release date

February 13, 2026

### Bug fixes

* Fixed an issue where App Management was available despite the IMS module being disabled.

## Version 3.3.1

### Release date

February 11, 2026

### Enhancements

* Improved navigation by grouping SPA menu items under the Apps main menu.

## Version 3.3.0

### Release date

January 21, 2026

### Enhancements

* Added an [App Management](../app-management/index.md) menu in the Admin, enabling App Managers to view and manage deployed applications within the same IMS organization.

## Version 3.2.7

### Release date

Feb 2, 2026

### Enhancements

* Added PHP 8.5 support.

## Version 3.2.6

### Release date

January 27, 2026

### Bug fixes

* Fixed a crash in the Admin caused by menu registrations referencing non-existent parent menus.

## Version 3.2.5

### Release date

December 9, 2025

### Enhancements

* Updated the `React` version in `uix` to 19.2.1.

### Bug fixes

* Fixed exporting of custom column data from Admin grids.

* Fixed an error that occurred on Commerce instances with JavaScript minification enabled.

## Version 3.2.4

### Release date

November 11, 2025

### Bug fixes

* Fixed handling of invalid extension ID characters for menu extensions to avoid error screens in Adobe Commerce as a Cloud Service.

* Fixed the **Refresh Registrations** button by adding registration cache invalidation before reloading.

## Version 3.2.3

### Release date

October 2, 2025

### Bug fixes

* Fixed an error that occurred when placing an order with custom fees.

* Fixed an issue where custom menu items would disappear in Adobe Commerce as a Cloud Service after a period of inactivity, requiring a refresh of registrations to restore them.

## Version 3.2.2

### Release date

September 19, 2025

### Bug fixes

* Fixed a crash that occurred when placing an order with payment method configuration set to **Authorize and Capture** while the Admin UI SDK is enabled.

## Version 3.2.1

### Release date

August 25, 2025

### Bug fixes

* Fixed spinner behavior when an error occurs while refreshing registrations.

* Fixed a crash in the Admin Panel when multiple applications define sections within the same organization.

## Version 3.2.0

### Release date

August 18, 2025

### Enhancements

* Updated dependencies to ensure all resolved security issues are addressed and the system remains up-to-date.

* Added request IDs to logs when database logging is enabled.

### Bug fixes

* Fixed mapping of API Mesh for applications deployed on non-Production workspaces.

## Version 3.1.0

### Release date

July 18, 2025

### Enhancements

* Added new ACL resources for Admin UI SDK.

* Removed the "Refresh registrations on schedule" feature.

* Added the `sandbox` attribute to iFrame extension points to allow flexibility.

* Added a blocking spinner when clicking on **Refresh Registrations** button.

* The order view button can now be implemented [without an iFrame](api.md#order-view-button-without-iframes).

### Bug fixes

* Fixed incorrect debug logs caused by incorrect object mapping.

* Fixed log cleaning based on log retention period.

* Fixed potential Commerce instance crash if same section/menu ID is found.

## Version 3.0.0

### Release date

April 15, 2025

### Enhancements

* This release changes how extensions are integrated into the Adobe Commerce Admin. Previously, the Admin directly loaded published extensions. Now, extensions must be selected in the **Configure extensions** screen, resulting in a better developer experience. The limitation on **Production**-only workspaces has been resolved.

* Added the IMS organization ID to the [shared context](extension-points/index.md#shared-contexts) when loading a menu, a mass action, or an order view button in an iFrame.

* Updated dependencies to ensure all resolved security issues are addressed and the system remains up-to-date.

* Added **Refresh registrations on schedule** to automatically fetch registrations of selected extensions.

## Version 2.3.0

### Release date

March 14, 2025

### Enhancements

* Renamed Staging **Test mode** to Sandbox.

* Aligned the **App Status** label with the App Registry.

* Added a tooltip to clarify the **Test mode** options.

### Bug fixes

* Fixed a REST API order retrieval error that could occur when the Admin UI SDK custom fees module was enabled.

* Fixed a timeout issue that could occur when contacting the App Registry.

## Version 2.2.0

### Release date

February 4, 2025

### Enhancements

* The Admin UI SDK supports PHP 8.4.

## Version 2.1.1

### Release date

December 18, 2024

### Bug fixes

* Accessing the Admin UI SDK configuration in Commerce versions prior to 2.4.8-beta1 no longer causes crashes.

## Version 2.1.0

### Release date

December 17, 2024

### Enhancements

* Added the ability to save Admin UI SDK logs to the database and access them from the Admin.

* Registrations can now be secured with Adobe IMS authentication.

* Admin UI SDK is now compatible with edge API Mesh. Legacy API Mesh is deprecated.

* Custom columns can now send an optional default value for unmatched data instead of leaving the cell empty.

* Custom columns data can now be secured with Adobe IMS authentication.

* Enhanced loading of custom column data by retrieving only the necessary items for display.

* Registrations automatically refresh when saving Admin UI SDK configurations.

* Enhanced developer experience with the option to enable staging testing.

## Version 2.0.0

### Release date

September 4, 2024

### Enhancements

* This release changes how registrations are declared. Previously, calls were performed asynchronously. This could result in delayed retrieval and availability of registrations when loading pages. Registrations are now declared synchronously.

  You must update any extension points developed with Admin UI SDK 1.x. For details, see [Migrate your extension point from 1.x to 2.0](extension-points/index.md#migrate-your-extension-point-from-version-1x-to-20).

* Added a custom fee column to the invoice and credit memo grids.

## Version 1.4.1

### Release date

January 10, 2025

### Bug fixes

Fixed an error with a missed class during dependency injection compilation in Adobe Commerce.

## Version 1.4.0

### Release date

June 28, 2024

### Enhancements

* Added the following extension points:

  * [`banner notification`](extension-points/banner-notification.md)
  * [`customer grid columns`](extension-points/customer/grid-columns.md)
  * [`customer mass action`](extension-points/customer/mass-action.md)
  * [`order get custom fees`](extension-points/order/custom-fees.md)

* Mass actions can now be implemented [without an iFrame](api.md#mass-actions-without-iframes).

* Added the `GET V1/adminuisdk/massaction/<requestId>` [REST API](api.md) to debug mass action failures.

* Added the **Refresh registrations** button to the configuration page. This button allows the administrator to  refresh the `admin_ui_sdk` cache and reload all extensions.

* Refactored multiple sanitizers. As a result, incomplete or invalid input data from an extension point no longer causes display problems in the Admin.

* The `class` parameter has been removed from the `order view button` extension point.

* Updated project dependencies.

## Version 1.3.2

### Release date

March 4, 2024

### Bug fixes

* Corrected a condition that allowed administrators who did not have proper permissions to view data in grid columns.

## Version 1.3.1

### Release date

January 25, 2024

### Enhancements

* Enhanced unit coverage by 150%.

* Added the ability to optionally specify a page title for a mass action.

* The Admin UI SDK cache is now flushed weekly instead of every 12 hours.

* The Admin UI SDK now supports PHP 8.3.

### Bug fixes

* The Admin now displays extensions correctly when they are loaded from the extension manager registry.

## Version 1.3.0

### Release date

November 30, 2023

### Enhancements

* Enabled the following extension points:
  * [Add buttons to the orders view](extension-points/order/view-button.md)
  * [Add mass actions to the orders grid](extension-points/order/mass-action.md)
  * [Add columns to the products grid](extension-points/product/grid-columns.md)
* Menus and extensions are cached to improve performance.
* When selecting a mass action, now only the needed extension is loaded.
* A spinner is now displayed when content is being loaded on customized extension points.
* Added the ability to redirect back to a grid page after executing a mass action.
* Added the `clientId` parameter to [`sharedContext`](extension-points/index.md#shared-contexts).

### Bug fixes

* Corrected a timeout issue caused by an incorrectly-applied ACL resource.
* Customized columns are now exported as expected when exporting data from the Orders page.

## Version 1.2.1

### Release date

October 31, 2023

### Enhancements

* Added the **Mock AdobeAdminIms Module** field to the Admin UI SDK configuration page in the Admin. This field determines whether to send mock or real Adobe IMS credentials.

* Added the **Admin UI SDK** (`Magento_CommerceBackendUix::admin`) resource. Administrators who are not assigned this resource will not have access the Admin UI SDK configuration page.

* Custom date columns in the order grid now use ISO 8601 formatting. Previously, these values were simple timestamps.

### Bug fixes

* Menus display correctly when the Admin UI SDK is enabled but no menu registrations are found.

## Version 1.2.0

### Release date

October 18, 2023

### Enhancements

* Created the [`order` extension point](extension-points/order/grid-columns.md), which adds columns to the order grid.

* Added the `admin_ui_sdk` cache type. When enabled, Commerce caches customizations to the Admin.

* Added the `isSection` and `sortOrder` parameters to the [`menu` extension point](extension-points/menu.md). The `isSection` parameter allows you to define a menu section, while `sortOrder` defines the sort order of the section.

* Added the `productSelectLimit` parameter for mass actions in the [`product` extension point](extension-points/product/mass-action.md).

### Bug fixes

* Minimized the number of calls needed to build a menu.

## Version 1.1.2

### Release date

October 6, 2023

### Enhancements

Fixed cross-site scripting (XSS) and password hash security vulnerabilities.

## Version 1.1.1

### Release date

September 12, 2023

### Bug fixes

* Fixed an issue with a missing tab ID that occurred due to a dependency on a non-mandatory module.

* Mass actions are now correctly cleared when the last app is removed.

## Version 1.1.0

### Release date

August 25, 2023

### Enhancements

* You can now customize the [mass actions](extension-points/product/mass-action.md) on the Product grid.
* The API for registering a [menu](extension-points/menu.md) has changed.
* Updated the Admin [configuration screen](configuration.md) to give the option of enabling the Admin UI SDK.

### Bug fixes

* Menus are now rendered correctly when no registrations are found.

## Known issues

* You cannot deploy an app that uses the Admin UI SDK in a staging environment. Instead, you must deploy it in a production environment. See [Prepare your app for production](publish.md) for details.

## Version 1.0.0

### Release date

June 13, 2023

### Compatibility

Adobe Commerce for Cloud and on-premises

*  2.4.5 and higher

### Known issues

None

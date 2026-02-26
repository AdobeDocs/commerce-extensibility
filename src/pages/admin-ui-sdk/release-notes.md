---
title: Release notes
description: This page lists new features and known issues for each release of Adobe Commerce Admin UI SDK
keywords:
  - App Builder
  - Extensibility
---

# Adobe Commerce Admin UI SDK release notes

## Version 3.3.2

<InlineAlert variant="warning" slots="text"/>

Available for Beta users only and is not yet accessible to all customers.

### Release date

February 13, 2026

### Bug fixes

* Fixed an issue where App Management was available despite the IMS module being disabled. <!-- CEXT-5755 -->

## Version 3.3.1

<InlineAlert variant="warning" slots="text"/>

Available for Beta users only and is not yet accessible to all customers.

### Release date

February 11, 2026

### Enhancements

* Improved navigation by grouping SPA menu items under the Apps main menu. <!-- CEXT-5727 -->

## Version 3.3.0

<InlineAlert variant="warning" slots="text"/>

Available for Beta users only and is not yet accessible to all customers.

### Release date

January 21, 2026

### Enhancements

* Added an [App Management](../app-management/index.md) menu in the Admin, enabling App Managers to view and manage deployed applications within the same IMS organization.

## Version 3.2.7

### Release date

Feb 2, 2026

### Enhancements

* Added PHP 8.5 support. <!-- CEXT-5736 -->

## Version 3.2.6

### Release date

January 27, 2026

### Bug fixes

* Fixed a crash in the Admin caused by menu registrations referencing non-existent parent menus. <!-- CEXT-5701 -->

## Version 3.2.5

### Release date

December 9, 2025

### Enhancements

* Updated the `React` version in `uix` to 19.2.1. <!-- CEXT-5593 -->

### Bug fixes

* Fixed exporting of custom column data from Admin grids. <!-- CEXT-5529 -->

* Fixed an error that occurred on Commerce instances with JavaScript minification enabled. <!-- CEXT-5595 -->

## Version 3.2.4

### Release date

November 11, 2025

### Bug fixes

* Fixed handling of invalid extension ID characters for menu extensions to avoid error screens in Adobe Commerce as a Cloud Service. <!-- CEXT-5299 -->

* Fixed the **Refresh Registrations** button by adding registration cache invalidation before reloading. <!-- CEXT-5414 -->

## Version 3.2.3

### Release date

October 2, 2025

### Bug fixes

* Fixed an error that occurred when placing an order with custom fees. <!-- CEXT-5312 -->

* Fixed an issue where custom menu items would disappear in Adobe Commerce as a Cloud Service after a period of inactivity, requiring a refresh of registrations to restore them. <!-- CCSAAS-3696 -->

## Version 3.2.2

### Release date

September 19, 2025

### Bug fixes

* Fixed a crash that occurred when placing an order with payment method configuration set to **Authorize and Capture** while the Admin UI SDK is enabled. <!-- CCSAAS-3449 -->

## Version 3.2.1

### Release date

August 25, 2025

### Bug fixes

* Fixed spinner behavior when an error occurs while refreshing registrations. <!-- CEXT-5111 -->

* Fixed a crash in the Admin Panel when multiple applications define sections within the same organization. <!-- CEXT-5106 -->

## Version 3.2.0

### Release date

August 18, 2025

### Enhancements

* Updated dependencies to ensure all resolved security issues are addressed and the system remains up-to-date. <!--- CEXT-5049 -->

* Added request IDs to logs when database logging is enabled. <!-- CEXT-4848, CEXT-5056 -->

### Bug fixes

* Fixed mapping of API Mesh for applications deployed on non-Production workspaces. <!-- CEXT-5052 -->

## Version 3.1.0

### Release date

July 18, 2025

### Enhancements

* Added new ACL resources for Admin UI SDK. <!--- CEXT-4581 -->

* Removed the "Refresh registrations on schedule" feature. <!--- CEXT-4819 -->

* Added the `sandbox` attribute to iFrame extension points to allow flexibility. <!--- CEXT-4659 -->

* Added a blocking spinner when clicking on **Refresh Registrations** button. <!--- CEXT-4846 -->

* The order view button can now be implemented [without an iFrame](./api.md#order-view-button-without-iframes). <!-- CEXT-4885 -->

### Bug fixes

* Fixed incorrect debug logs caused by incorrect object mapping. <!--- CEXT-4886 -->

* Fixed log cleaning based on log retention period. <!--- CEXT-4573 -->

* Fixed potential Commerce instance crash if same section/menu ID is found. <!--- CEXT-4811 -->

## Version 3.0.0

### Release date

April 15, 2025

### Enhancements

* This release changes how extensions are integrated into the Adobe Commerce Admin. Previously, the Admin directly loaded published extensions. Now, extensions must be selected in the **Configure extensions** screen, resulting in a better developer experience. The limitation on **Production**-only workspaces has been resolved.

* Added the IMS organization ID to the [shared context](./extension-points/index.md#shared-contexts) when loading a menu, a mass action, or an order view button in an iFrame. <!--- CEXT-4396  -->

* Updated dependencies to ensure all resolved security issues are addressed and the system remains up-to-date. <!--- CEXT-4464  -->

* Added **Refresh registrations on schedule** to automatically fetch registrations of selected extensions. <!-- CEXT-4258, CEXT-4402, CEXT-4493 -->

## Version 2.3.0

### Release date

March 14, 2025

### Enhancements

* Renamed Staging **Test mode** to Sandbox. <!--- CEXT-4072  -->

* Aligned the **App Status** label with the App Registry. <!--- CEXT-4071  -->

* Added a tooltip to clarify the **Test mode** options. <!--- CEXT-4134  -->

### Bug fixes

* Fixed a REST API order retrieval error that could occur when the Admin UI SDK custom fees module was enabled. <!--- CEXT-4348  -->

* Fixed a timeout issue that could occur when contacting the App Registry. <!--- CEXT-4205  -->

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

* This release changes how registrations are declared. Previously, calls were performed asynchronously. This could result with delayed retrieval and availability of registrations when loading pages in the Admin. Registrations are now loaded synchronously. resulting in a better merchant experience.

  You must update any extension points developed with Admin UI SDK 1.x. [Migrate your extension point from 1.x to 2.0](./extension-points/index.md#migrate-your-extension-point-from-version-1x-to-20) describes how.

* Added a custom fee column to the invoice and credit memo grids.

## Version 1.4.1

### Release date

January 10, 2025

### Bug fixes

Fixed an error with a missed class during dependency injection compilation in Adobe Commerce.  <!--- CEXT-4013  -->

## Version 1.4.0

### Release date

June 28, 2024

### Enhancements

* Added the following extension points:

  * [`banner notification`](./extension-points/banner-notification.md)
  * [`customer grid columns`](./extension-points/customer/grid-columns.md)  <!--- CEXT-2867  -->
  * [`customer mass action`](./extension-points/customer/mass-action.md)
  * [`order get custom fees`](./extension-points/order/custom-fees.md)  <!--- CEXT-2733  -->

* Mass actions can now be implemented [without an iFrame](./api.md#mass-actions-without-iframes). <!--- CEXT-2590, CEXT-2825, CEXT-2932, CEXT-2903 -->

* Added the `GET V1/adminuisdk/massaction/<requestId>` [REST API](./api.md) to debug mass action failures.

* Added the **Refresh registrations** button to the configuration page. This button allows the administrator to  refresh the `admin_ui_sdk` cache and reload all extensions. <!--- CEXT-2642 -->

* Refactored multiple sanitizers. As a result, incomplete or invalid input data from an extension point no longer causes display problems in the Admin.  <!--- CEXT-2649, CEXT-2732, CEXT-2731, CEXT-2730, CEXT-2727, CEXT-2767, CEXT-2758, CEXT-2826, CEXT-2823, CEXT-2758, CEXT-2826, CEXT-2823, CEXT-2807, CEXT-2825 -->

* The `class` parameter has been removed from the `order view button` extension point.

* Updated project dependencies. <!--- CEXT-2766 -->

## Version 1.3.2

### Release date

March 4, 2024

### Bug fixes

* Corrected a condition that allowed administrators who did not have proper permissions to view data in grid columns.

## Version 1.3.1

### Release date

January 25, 2024

### Enhancements

* Enhanced unit coverage by 150%. <!-- CEXT-2345, CEXT-2425, CEXT-2593, CEXT-2596, CEXT-2600, CEXT-2601, CEXT-2602, CEXT-2603, CEXT-2604 -->

* Added the ability to optionally specify a page title for a mass action. <!-- CEXT-2598 -->

* The Admin UI SDK cache is now flushed weekly instead of every 12 hours. <!-- CEXT-2643 -->

* The Admin UI SDK now supports PHP 8.3. <!-- CEXT-2724 -->

### Bug fixes

* The Admin now displays extensions correctly when they are loaded from the extension manager registry. <!-- CEXT-2595 -->

## Version 1.3.0

### Release date

November 30, 2023

### Enhancements

* Enabled the following extension points:
  * [Add buttons to the orders view](./extension-points/order/view-button.md)
  * [Add mass actions to the orders grid](./extension-points/order/mass-action.md)
  * [Add columns to the products grid](./extension-points/product/grid-columns.md)
* Menus and extensions are cached to improve performance.
* When selecting a mass action, now only the needed extension is loaded.
* A spinner is now displayed when content is being loaded on customized extension points.
* Added the ability to redirect back to a grid page after executing a mass action.
* Added the `clientId` parameter to [`sharedContext`](./extension-points/index.md#shared-contexts).

### Bug fixes

* Corrected a timeout issue caused by an incorrectly-applied ACL resource.
* Customized columns are now exported as expected when exporting data from the Orders page.

## Version 1.2.1

### Release date

October 31, 2023

### Enhancements

* Added the **Mock AdobeAdminIms Module** field to the Admin UI SDK configuration page in the Admin. This field determines whether to send mock or real Adobe IMS credentials. <!-- CEXT-2449 -->

* Added the **Admin UI SDK** (`Magento_CommerceBackendUix::admin`) resource. Administrators who are not assigned this resource will not have access the Admin UI SDK configuration page. <!-- CEXT-2425 -->

* Custom date columns in the order grid now use ISO 8601 formatting. Previously, these values were simple timestamps. <!-- CEXT-2436 -->

### Bug fixes

* Menus display correctly when the Admin UI SDK is enabled but no menu registrations are found. <!-- CEXT-2438 -->

## Version 1.2.0

### Release date

October 18, 2023

### Enhancements

* Created the [`order` extension point](extension-points/order/grid-columns.md), which adds columns to the order grid. <!-- CEXT-2272 -->

* Added the `admin_ui_sdk` cache type. When enabled, Commerce caches customizations to the Admin. <!-- CEXT-2377 -->

* Added the `isSection` and `sortOrder` parameters to the [`menu` extension point](extension-points/menu.md). The `isSection` parameter allows you to define a menu section, while `sortOrder` defines the placement of a menu item. <!-- CEXT 2249, CEXT-2289 -->

* Added the `productSelectLimit` parameter for mass actions in the [`product` extension point](extension-points/product/mass-action.md). <!-- CEXT-2357 -->

### Bug fixes

* Minimized the number of calls needed to build a menu. <!-- CEXT-2396 -->

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

* You cannot deploy an app that uses the Admin UI SDK in a staging environment. Instead, you must deploy it in a production environment. See [Prepare your app for production](publish.md) for details about this workaround.

## Version 1.0.0

### Release date

June 13, 2023

### Compatibility

Adobe Commerce for Cloud and on-premises

*  2.4.5 and higher

### Known issues

None

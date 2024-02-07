---
title: Release notes
description: This page lists new features and known issues for each release of Adobe Commerce Admin UI SDK
keywords:
  - App Builder
  - Extensibility
---

# Adobe Commerce Admin UI SDK release notes

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

* Added the [`admin_ui_sdk` cache type](configuration.md#clean-the-admin-ui-sdk-cache). When enabled, Commerce caches customizations to the Admin. <!-- CEXT-2377 -->

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

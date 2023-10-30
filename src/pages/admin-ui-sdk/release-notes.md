---
title: Release notes
description: This page lists new features and known issues for each release of Adobe Commerce Admin UI SDK
keywords:
  - App Builder
  - Extensibility
---

# Adobe Commerce Admin UI SDK release notes

## Version 1.2.1

### Release date

October 31, 2023

### Enhancements

* Added the **Mock AdobeAdminIms Module** field to the Admin UI SDK configuration page in the Admin. This field determines whether to send mock or real Adobe IMS credentials. <!-- CEXT-2449 -->

* Added the **Admin UI SDK** (`Magento_CommerceBackendUix::admin`) resource. Administrators who are not assigned this resource will not have access the Admin UI SDK configuration page. <!-- CEXT-2425 -->

* Custom date columns in the order grid now use ISO 8601 formatting. Previously, these values were simple timestamps. <!-- CEXT-2436 -->

### Bug fixes

* Menus display correctly when the Admin UI SDK is enabled but no menu registrations are found. <!-- CEXT-2438 -->

* Orders exported in CSV format from the orders grid now include data in custom columns as expected. <!-- CEXT-2440 -->

## Version 1.2.0

### Release date

October 18, 2023

### Enhancements

* Created the [`order` extension point](extension-points/order.md), which adds columns to the order grid. <!-- CEXT-2272 -->

* Added the [`admin_ui_sdk` cache type](configuration.md#clean-the-admin-ui-sdk-cache). When enabled, Commerce caches customizations to the Admin. <!-- CEXT-2377 -->

* Added the `isSection` and `sortOrder` parameters to the [`menu` extension point](extension-points/menu.md). The `isSection` parameter allows you to define a menu section, while `sortOrder` defines the placement of a menu item. <!-- CEXT 2249, CEXT-2289 -->

* Added the `productSelectLimit` parameter for mass actions in the [`product` extension point](extension-points/product.md). <!-- CEXT-2357 -->

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

* You can now customize the [mass actions](extension-points/product.md) on the Product grid.
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

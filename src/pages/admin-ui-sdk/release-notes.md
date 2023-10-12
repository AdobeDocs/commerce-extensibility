---
title: Release notes
description: This page lists new features and known issues for each release of Adobe Commerce Admin UI SDK
keywords:
  - App Builder
  - Extensibility
---

# Adobe Commerce Admin UI SDK release notes

## Version 1.2.0

### Release date

October 18, 2023

### Enhancements

* Added the `order` extension point. You can use this extension point to add columns to the Sales Order grid. <!-- CEXT-2272 -->

* Added the `admin_ui_sdk` cache type. When enabled, Commerce caches customizations to the Admin. <!-- CEXT-2377 -->

Add the possibility to add a section in the menu, API now support isSection attribute. <!-- CEXT- -->

* Added the `sortOrder` parameter to the `menu` extension point. <!-- CEXT-2289 -->

* Added the `productSelectLimit` parameter for mass actions in the `product` extension point. <!-- CEXT-2357 -->

Enhance performance on Admin UI SDK. <!-- CEXT- -->

### Bug fixes

* Minimized the number of calls needed to build a menu. <!-- CEXT-2396 -->

## Version 1.1.2

### Release date

October 6, 2023

### Enhancements

Fixed security cross-site scripting (XSS) and password hash security vulnerabilities.

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

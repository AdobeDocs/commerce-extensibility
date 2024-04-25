---
title: Adobe Commerce Webhooks Release Notes
description: This page lists new features and known issues for each release of Adobe Commerce Webhooks.
keywords:
  - Extensibility
---

# Release notes

These release notes describe the latest version of Adobe Commerce Webhooks.

## Version 1.3.1

### Release date

April 22, 2024

### Enhancements

* Added sanitization of sensitive data in webhooks payload. <!--CEXT-3063 -->

* Making disallowed webhook expression case-insensitive. <!--CEXT-3076 -->

## Version 1.3.0

### Release date

April 22, 2024

### Enhancements

* Added additional validation while saving webhooks in the Admin. <!--CEXT-3053 -->

* Added a list of disallowed plugins. <!--CEXT-3051-->

## Version 1.2.1

### Release date

March 19, 2024

### Enhancements

* Enhanced test coverage for the `AdobeCommerceWebhooksAdminUi` module. <!--CEXT-2834 -->

### Bug fixes

* Fixed integration test errors. <!--- CEXT-2920 -->
* Removed the **Default View** drop down menu from the **Webhooks** page of the Admin. <!--- CEXT-2941 -->

## Version 1.2.0

### Release date

February 7, 2024

### Enhancements

* Added the ability to [manage webhooks from the Admin](admin-configuration.md), at **System** > **Webhooks**. You can now perform the following tasks:

  * Create new webhooks.
  * Modify webhooks that are defined in an XML file.
  * Modify and create webhooks rules, headers, and fields.

 The `AdobeCommerceWebhooksAdminUi` module provides this support.

### Backward-incompatible changes

To support managing webhooks from the Admin, we introduced the `method.hooks.batch.name` field. This field is required and helps track changes made in the Admin. You must update all existing `webhooks.xml` files to include batch names. All new webhooks, whether created from a file or from the Admin, must define a batch name.

## Version 1.1.0

### Release date

November 30, 2023

### Enhancements

* You can now define [conditional webhooks](conditional-webhooks.md) that run only when configured conditions are met. <!--- CEXT-2541 -->

* Added support for data-modifying webhooks by introducing new [response operations](responses.md#responses): `add`, `remove`, and `replace`. <!--- CEXT-2405, 2413, 2468 -->

* Added the ability to cache webhook responses and specify cache duration. The `ttl` attribute in the [`hook` element](xml-schema.md#hooks-element) of the `webhooks.xml` file defines the duration. Also added a new cache type, `webhooks_response`, to store webhook responses. <!--- CEXT-2403 -->

* You can now use a [converter class](hooks.md#field-converters) to convert the value in a hook endpoint response object that has an operation status of `replace`. <!--- CEXT-2455 -->

### Bug fixes

* Fixed a TypeError that occurred when accessing a nested field given a scalar value. <!--- CEXT-2415 -->

## Version 1.0.0

### Release date

October 10, 2023

### Compatibility

Adobe Commerce for Cloud

*  2.4.4 and higher
*  `ece-tools` 2002.1.16+

Adobe Commerce (on-premises)

*  2.4.4 and higher

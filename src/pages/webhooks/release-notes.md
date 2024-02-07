---
title: Adobe Commerce Webhooks Release Notes
description: This page lists new features and known issues for each release of Adobe Commerce Webhooks.
keywords:
  - Extensibility
---

# Release notes

These release notes describe the latest version of Adobe Commerce Webhooks.

## Version 1.2.0

### Release date

February 7, 2024

### Enhancements

* Added a new module `AdobeCommerceWebhooksAdminUi` for managing webhooks from the Admin UI

* Added an ability to modify and create webhooks from the Admin UI

* Added an ability to modify and create webhooks rules, headers and fields from the Admin UI

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

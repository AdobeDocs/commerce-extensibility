---
title: Adobe Commerce Webhooks Release Notes
description: This page lists new features and known issues for each release of Adobe Commerce Webhooks.
keywords:
  - Extensibility
---

# Release notes

These release notes describe the latest version of Adobe Commerce Webhooks.

## Version 1.1.0

### Release date

November 30, 2023

### Enhancements
 
* You can now define [conditional webhooks](conditional-webhooks.md) that run only when configured conditions are met. <!--- CEXT-2541 -->

* Prior to this release, the only supported webhook response values were `success` and `exception`. This release adds support for `add`, `remove`, and `replace` [responses](responses.md#responses). <!--- CEXT-2405, 2413, 2468 -->

* You can now [configure specific fields within an array](hooks.md#configure-hooks) to transmit in a webhook. <!--- CEXT-2521 -->

* Added the `webhooks_response` cache type. <!--- CEXT-2403 -->

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

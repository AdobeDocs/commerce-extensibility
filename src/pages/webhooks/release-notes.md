---
title: Adobe Commerce Webhooks Release Notes
description: This page lists new features and known issues for each release of Adobe Commerce Webhooks.
keywords:
  - Extensibility
---

# Release notes

These release notes describe the latest version of Adobe Commerce Webhooks.

## Version 1.18.0

### Release date

Mar 31, 2026

### Enhancements

* Added filtration functionality for the context fields.

## Version 1.17.1

### Release date

Mar 9, 2026

### Bug fix

* Fixed an issue that caused quote items to not be converted properly when retrieved from the webhook quote context.

## Version 1.17.0

### Release date

Mar 9, 2026

### Enhancements

* Improved the ability to retrieve an active Quote in the webhook context.

## Version 1.16.0

### Release date

Feb 2, 2026

### Enhancements

* Added PHP 8.5 support.

## Version 1.15.0

### Release date

Jan 30, 2026

### Enhancements

* Improved logged webhook messages for better observability integration.

## Version 1.14.0

### Release date

Jan 7, 2026

### Enhancements

* Added fields and made improvements to multiple webhooks.

* Resolved compatibility issues with new versions of dependencies.

## Version 1.13.0

### Release date

Nov 10, 2025

### Enhancements

* PaaS installations now support the `POST /V1/webhooks/subscribe` and `POST /V1/webhooks/unsubscribe` [REST endpoints](api.md). Previously, these endpoints were only available on SaaS.

* Added the [`developerConsoleOauth`](xml-schema.md#developerconsoleoauth-element) XML configuration option to set Adobe Developer Console credentials for webhooks.

* Added the exception message to the log context in webhook plugins.

## Version 1.12.0

### Release date

Oct 30, 2025

### Enhancements

* Added support for context fields in webhook payloads.

## Version 1.11.0

### Release date

September 11, 2025

### Enhancements

* Added the ability to apply webhook rules to context fields.

### Bug fix

* Fixed an issue that caused an error during the installation of some versions of Adobe Commerce.

## Version 1.10.0

### Release date

July 28, 2025

### Enhancements

* Added a store context to retrieve information about the store in the webhook payload.

* Added the ability to retrieve object values from the context.

* Added a **Copy public key** button to the webhook Digital Signature configuration panel.

* Added logging improvements.

## Version 1.9.0

### Release date

February 14, 2025

### Enhancements

* Added the ability to configure the log grid message detail in the Admin configuration.

* Improved the database logging to add logging in case of failed requests.

* Updated php version requirement in the generated module.

### Bug fix

* Fixed the webhook data filtration logic when the source is an empty string.

## Version 1.8.0

### Release date

January 23, 2025

### Enhancements

* Added the `GET /rest/<store_view_code>/V1/webhooks/list` REST endpoint for retrieving a list of configured webhooks.

### Bug fix

* Fixed an issue causing the `depth` option value to not impact the output of the `webhooks:info` command.

## Version 1.7.0

### Release date

December 18, 2024

### Enhancements

* Added webhook options to skip SSL certificate validation and to set the path to the certificate file.

* Fixed the resource name needed to access webhook logs in the Admin.

## Version 1.6.0

### Release date

October 30, 2024

### Enhancements

* Added the **Webhooks Logs** grid to the Admin for viewing webhook execution information.

* Added additional debug logging related to webhooks response caching.

* Added additional observer events to the list of supported webhook event names.

* Updated copyrights in the generated module files.

### Bug fix

* Fixed an issue causing `null` values to be returned in some payloads output by the `webhooks:info` command

## Version 1.5.1

### Release date

July 10, 2024

* Improved caching of webhook responses during single request.

* Fixed a possible vulnerability issue with showing the public key in the Admin UI configuration page.

## Version 1.5.0

### Release date

May 20, 2024

### Changes

The Admin configuration UI for webhooks was removed as part of a security risk mitigation. Webhooks provide developer-oriented functionality and the Admin UI gave an unprecedented amount of access to admins, which could be inappropriate in some cases. All other webhooks functionality is still supported.

Upgrading to the latest version could impact existing webhooks. If you previously had webhooks that were created in the Admin UI, you must recreate them in an XML file.

## Version 1.4.0

### Release date

May 15, 2024

### Enhancements

* Added the ability to enable [digital signatures for webhooks](signature-verification.md).

* Updated the list of disallowed webhooks.

## Version 1.3.1

### Release date

April 25, 2024

### Enhancements

* Added the ability to sanitize sensitive data in the payload of webhooks.

* Made disallowed webhook expressions case-insensitive.

## Version 1.3.0

### Release date

April 22, 2024

### Enhancements

* Added additional validation while saving webhooks in the Admin.

* Added a list of disallowed plugins.

## Version 1.2.1

### Release date

March 19, 2024

### Enhancements

* Enhanced test coverage for the `AdobeCommerceWebhooksAdminUi` module.

### Bug fixes

* Fixed integration test errors.
* Removed the **Default View** drop down menu from the **Webhooks** page of the Admin.

## Version 1.2.0

### Release date

February 7, 2024

### Enhancements

* Added the ability to manage webhooks from the Admin, at **System** > **Webhooks**. You can now perform the following tasks:

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

* You can now define [conditional webhooks](conditional-webhooks.md) that run only when configured conditions are met.

* Added support for data-modifying webhooks by introducing new [response operations](responses.md#responses): `add`, `remove`, and `replace`.

* Added the ability to cache webhook responses and specify cache duration. The `ttl` attribute in the [`hook` element](xml-schema.md#hooks-element) of the `webhooks.xml` file defines the duration. Also added a new cache type, `webhooks_response`, to store webhook responses.

* You can now use a [converter class](hooks.md#field-converters) to convert the value in a hook endpoint response object that has an operation status of `replace`.

### Bug fixes

* Fixed a TypeError that occurred when accessing a nested field given a scalar value.

## Version 1.0.0

### Release date

October 10, 2023

### Compatibility

Adobe Commerce for Cloud

*  2.4.4 and higher
*  `ece-tools` 2002.1.16+

Adobe Commerce (on-premises)

*  2.4.4 and higher

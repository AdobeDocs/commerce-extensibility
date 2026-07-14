---
title: Adobe I/O Events for Adobe Commerce Release Notes
description: This page lists new features and known issues for each release of Adobe I/O Events for Adobe Commerce.
keywords:
  - Events
  - Extensibility
---

# Release notes

These release notes describe the latest version of Adobe I/O Events for Adobe Commerce.

See [Update Adobe I/O Events for Adobe Commerce](installation.md#update-adobe-io-events-for-adobe-commerce) for upgrade instructions.

## Version 1.21.0

### Release date

July 14, 2026

### Enhancements

* Added event name validation for new event subscriptions.

* Improved event name validation and removed unnecessary files from module generation.

### Bug fixes

* Fixed event field filtering for events with uppercase alias characters.

## Version 1.20.0

### Release date

Mar 31, 2026

### Enhancements

* Added filtration functionality for the context fields.

### Bug fixes

* Fixed event payload information for several events.

* Fixed an issue where the `workspace_configuration.json` file generated in App Builder could exceed size of the configuration field, leading to corrupted data. The workspace configuration is now cleaned up before saving.

## Version 1.19.0

Feb 19, 2026

### Enhancements

* Added support for context fields in event rules.

## Version 1.18.0

### Release date

Feb 2, 2026

### Enhancements

* Added PHP 8.5 support.

## Version 1.17.0

### Release date

Jan 30, 2026

### Enhancements

* You can now add event payload values [from the application context](context-fields.md)

### Bug fixes

* Fixed event payload information for several order-related events.

## Version 1.16.0

### Release date

Jan 7, 2026

### Enhancements

* Added fields and made improvements to multiple events.

* Resolved compatibility issues with new versions of dependencies.

## Version 1.15.0

### Release date

Nov 26, 2025

### Bug fixes

* Fixed the event size payload validation to verify the size after payload filtering.

## Version 1.14.0

### Release date

Oct 30, 2025

### Enhancements

* Added [original data](events-original-data.md) to the event payload.

* Added [on-change rules](conditional-events.md#trigger-events-on-specific-field-changes) for event subscriptions.

* Added event size validation.

## Version 1.13.1

### Release date

Sep 2, 2025

### Enhancements

* Added validation to check the request format of the event subscribe API.

* Improved error responses for multiple event providers management.

### Bug fixes

* Updated the plugin generation to handle the case when API interface methods return a scalar type.

## Version 1.13.0

### Release date

July 30, 2025

### Enhancements

* Updated logic for the **Send Test Event** button to support multiple event providers.

* Added logging improvements.

### Bug fixes

* Fixed validation of supported plugin-type events with empty parent code.

## Version 1.12.1

### Release date

April 30, 2025

### Enhancements

* Returns the provider ID instead of "default" in the REST API.

* Improves the message during the removal of providers with linked event subscriptions.

* Allows the removal of event providers with inactive subscriptions.

## Version 1.12.0

### Release date

April 17, 2025

### Enhancements

* Added support of [multiple event providers](configure-additional-event-providers.md)

* Improved conversion of event payloads. In some cases payload of extension attributes was not converted correctly.

## Version 1.11.1

### Release date

February 25, 2025

### Enhancements

* Removed the requirement for Merchant ID and Environment ID to start with letters.

## Version 1.11.0

### Release date

January 23, 2025

### Enhancements

* Event subscriptions created/updated via API or CLI now get stored in `env.php`. These subscriptions were previously stored in `config.php`. Event subscriptions remaining in `config.php` continue to be read by the modules to preserve backward compatibility.

* Added the `GET /rest/<store_view_code>/V1/eventing/getEventSubscriptions` REST endpoint for retrieving a list of enabled event subscriptions.

* Added the `PUT /rest/<store_view_code>/V1/eventing/eventSubscribe/{name}` REST endpoint for updating event subscriptions.

* Added the `POST /rest/<store_view_code>/V1/eventing/eventUnsubscribe/{name}` REST endpoint for unsubscribing from events.

* Event name prefix validation is now skipped when subscribing to an event with a parent name.

## Version 1.10.0

### Release date

December 10, 2024

### Enhancements

* Added the `GET /rest/<store_view_code>/V1/eventing/getEventProviders` REST endpoint for retrieving information about the configured event provider.

## Version 1.9.0

### Release date

October 30, 2024

### Enhancements

* Added the **Events Status** grid to the Admin. This grid can be used to monitor the status of triggered events.

* Added more detailed error messages for the **Execute Synchronization** and **Test Connection** buttons in the Adobe I/O Events configuration section of the Admin.

* Added additional observer events to the list of supported event names.

* Renamed the **Events** item in the System menu of the Admin to **Events List**.

## Version 1.8.2

### Release date

August 15, 2024

### Enhancements

* Minor code improvements.

### Bug fixes

* Fixed the test connection button handling of error status codes

## Version 1.8.1

### Release date

August 6, 2024

### Enhancements

* Improved error handling while managing event metadata.

## Version 1.8.0

### Release date

July 31, 2024

### Enhancements

* Added the **Execute Synchronization** button the eventing general configuration in the Admin. This button performs the same action as running the `bin/magento events:metadata:populate` command.

* Added the **Create Event Provider** button, which replicates the function of the `bin/magento events:create-event-provider` command.

* Updated copyrights in the generated module files.

### Bug fixes

* Improved the conversion of event payloads, which fixes an issue with missing data for some events.

## Version 1.7.1

### Release date

June 21, 2024

### Enhancements

* Added additional validation on HIPAA customers. Events now contain the `cst:aio:x-event-phidata` header.

## Version 1.7.0

### Release date

May 15, 2024

### Enhancements

* Added the `--hipaaAuditRequired` option to the `bin/magento events:subscribe` command. Use this command to indicate the event contains data that is subject to HIPAA auditing.

* Added the ability to log data sent from Adobe Commerce to the Commerce Eventing Service. As a result, events are dispatched at the moment when data is sent.

## Version 1.6.0

### Release date

April 3, 2024

### Enhancements

Added [REST endpoints](api.md) that perform the following operations:

* Configure the eventing module.

* Subscribe to events.

## Version 1.5.1

### Release date

March 4, 2024

### Enhancements

* Changed the format of the event tracking ID to uuid4.

* Added the `--destination` option to the `event:subscribe` command.

* Fixed an issue that occurred when the event metadata was created for a configured event provider for events with a custom destination.

## Version 1.5.0

### Release date

February 7, 2024

### Enhancements

* Added support for [field converters](convert-field-values.md). You can now create a converter class that changes the data type or value of fields in an event payload.

* Added an event tracking ID field for better tracking of the event delivery process.

* Increased test coverage of eventing modules.

## Version 1.4.1

### Release date

December 14, 2023

### Bug fixes

* Fixed an error that occurred when on-premise instances updated to version 1.4.0.

## Version 1.4.0

### Release date

November 30, 2023

## Commerce Eventing modules updates

### Enhancements

* Events can now be defined in the Commerce `app/etc/io_events.xml` file.

* Added support for using nested fields in the rules of conditional events.

* Increased the default value of the **Maximum retries to send events** configuration field from three to seven.

* Updated the conversion logic for child array elements in an event.

* Added the ability to switch to a development environment when testing the transmission of events.

* Common logic for data collecting has been moved to a new module, `OutOfProcessExtensibility`. This module must be enabled as described in the [update instructions](installation.md#update-adobe-io-events-for-adobe-commerce).

### Bug fixes

* Corrected a condition that caused the `bin/magento setup:upgrade` command to return an error when the eventing module has been disabled.

* The **Test Connection** is now disabled when the provider ID is removed.

## Adobe IO Events client module updates

### Enhancements

* Added validation to ensure the workspace configuration has the correct structure of project > workspace credentials.

* Added the ability to switch to a development environment when testing the transmission of events.

* The eventing template in App Builder works correctly when the Adobe I/O Authorization type is set to OAuth.

* Updated an error message that occurred when eventing is not configured.

### Bug fixes

* Corrected an issue that caused the Adobe Services tab of the Admin to disappear.

## Version 1.3.0

### Release date

August 24, 2023

### Enhancements

* You can transmit all the fields within an event by setting the value of the `field` element to `*` (`<field name="*" />`). To perform the same action from the command line, specify the `--fields='*'` attribute when running the `bin/magento events:subscribe` command.

* You can create an event processor class that injects custom fields into an event. See [Add custom fields](custom-event-fields.md) for more information.

* Added the **Send Test Event** button to the **Commerce events** configuration screen in the Admin.

* Added authorization token caching to improve performance.

* Added the [`bin/magento events:registrations:list` command](commands.md#get-details-about-configured-event-registrations-in-your-app-builder-application).

### Bug fixes

* Corrected a problem that occurred when an array in an event payload does not contain an index upon creation, but contains an index in a subsequent update event.

## Version 1.2.2

### Release date

June 15, 2023

### Enhancements

* Corrected the `Event publishing failed: OAuth credential is not found in the Adobe I/O Workspace Configuration` error that occurred when a project `workspace.json` file contained a `oauth_server_to_server` section and a `jwt` section.

* Added the `events:provider:info` command, which returns details about an event provider.

## Version 1.2.1

### Release date

June 5, 2023

### Enhancements

*  I/O Events for Adobe Commerce now supports 2.4.4.

### Compatibility

Adobe Commerce for Cloud

*  2.4.4 and higher
*  `ece-tools` 2002.1.13+

Adobe Commerce (on-premises)

*  2.4.4 and higher

## Version 1.2.0

### Release date

May 25, 2023

### Enhancements

*  The Adobe I/O Service Account (JWT) credentials have been deprecated in favor of the OAuth Server-to-Server credentials. Adobe Commerce Eventing now supports the OAuth Server-to-Server credentials. The [Create an App Builder project](project-setup.md) and [Configure Adobe Commerce](configure-commerce.md) topics have been updated to include instructions for setting up OAuth authentication. See the [_Adobe Developer Authentication Guide_](https://developer.adobe.com/developer-console/docs/guides/authentication/) for details about OAuth support.

*  Improved batch event processing, which significantly speeds up the processing of a large number of events.

*  Added a re-try mechanism with an incremental delay for failed attempts to publish events.

## Version 1.1.0

### Release date

April 20, 2023

### Enhancements

*  Added support for delivering events using message queues. Previously, all events were delivered by cron, which could delay delivery by up to a minute. Use the `bin/magento events:subscribe --priority` command to register the event as requiring expedited delivery. See [Configure Adobe Commerce](configure-commerce.md#check-cron-and-message-queue-configuration) for information about configuring the message queues.

*  Added the ability to filter on fields in an array of nested objects. For example, you can retrieve the `sku` and `qty` fields in an `items[]` array as shown:

   ```text
   items[].sku
   items[].qty
   ```

Previously, you could not specify individual fields within an array. All fields within the array would be returned. [Commerce module development](module-development.md#array-of-nested-objects) demonstrates this feature in full context.

### Bug fixes

*  Fixed conversion of a nested array of objects. Previously they were omitted in the final payload.
*  Fixed displayed event information for multiple events that are based on `DataObjects`.
*  Fixed performance degradation that occurred when an event was being saved.
*  Made other minor bug fixes.

## Version 1.0.1

### Release date

February 8, 2023

### Enhancements

*  Added the `storeId`, `websiteId`, and `storeGroupId` to the event payload metadata whenever it is available.

*  Changed the template engine that is used in the generation of the module with plugins for eventing.

### Bug fixes

*  Fixed multiple static and integration test failures.

## Version 1.0.0

### Release date

January 17, 2023

### Compatibility

Adobe Commerce for Cloud

*  2.4.5 and higher
*  `ece-tools` 2002.1.13+

Adobe Commerce (on-premises)

*  2.4.5 and higher

### Known issues

*  Registering a plugin-type event rule causes the system to generate a plugin for the parent rule. No additional generation is required for observer-type events.

*  Conditional events that evaluate as false are not stored in the database or sent to the eventing service.

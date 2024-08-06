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

## Version 1.8.0

### Release date

August 6, 2024

### Enhancements

* Improved error handling during managing event metadata. <!--- CEXT-3430 -->

* Making Commerce Eventing Service Urls configurable.

## Version 1.8.0

### Release date

July 31, 2024

### Enhancements

* Added the **Execute Synchronization** button the eventing general configuration in the Admin. This button performs the same action as running the `bin/magento events:metadata:populate` command. <!--- CEXT-3337 -->

* Added the **Create Event Provider** button, which replicates the function of the `bin/magento events:create-event-provider` command. <!--- CEXT-3336 -->

* Updated copyrights in the generated module files. <!--- CEXT-3425 -->

### Bug fixes

* Improved the conversion of event payloads, which fixes an issue with missing data for some events. <!--- CEXT-3360 -->

## Version 1.7.1

### Release date

June 21, 2024

### Enhancements

* Added additional validation on HIPAA customers. Events now contain the `cst:aio:x-event-phidata` header. <!--- CEXT-3322 -->

## Version 1.7.0

### Release date

May 15, 2024

### Enhancements

* Added the `--hipaaAuditRequired` option to the `bin/magento events:subscribe` command. Use this command to indicate the event contains data that is subject to HIPAA auditing. <!--- CEXT-3129 -->

* Added the ability to log data sent from Adobe Commerce to the Commerce Eventing Service. As a result, events are dispatched at the moment when data is sent. <!--- CEXT-3156 -->

## Version 1.6.0

### Release date

April 3, 2024

### Enhancements

Added [REST endpoints](api.md) that perform the following operations:

* Configure the eventing module. <!--- CEXT-2912 -->

* Subscribe to events. <!--- CEXT-2911 -->

## Version 1.5.1

### Release date

March 4, 2024

### Enhancements

* Changed the format of the event tracking ID to uuid4. <!--- CEXT-2853 -->

* Added the `--destination` option to the `event:subscribe` command. <!--- CEXT-2895 -->

* Fixed an issue that occurred when the event metadata was created for a configured event provider for events with a custom destination. <!--- CEXT-2857 -->

## Version 1.5.0

### Release date

February 7, 2024

### Enhancements

* Added support for [field converters](convert-field-values.md). You can now create a converter class that changes the data type or value of fields in an event payload. <!--- CEXT-1699 -->

* Added an event tracking ID field for better tracking of the event delivery process.  <!--- CEXT-2759 -->

* Increased test coverage of eventing modules. <!--- CEXT-2640 -->

## Version 1.4.1

### Release date

December 14, 2023

### Bug fixes

* Fixed an error that occurred when on-premise instances updated to version 1.4.0.  <!--- CEXT-2606 -->

## Version 1.4.0

### Release date

November 30, 2023

## Commerce Eventing modules updates

### Enhancements

* Events can now be defined in the Commerce `app/etc/io_events.xml` file. <!--- CEXT-2360 -->

* Added support for using nested fields in the rules of conditional events. <!--- CEXT-2482 -->

* Increased the default value of the **Maximum retries to send events** configuration field from three to seven. <!--- CEXT-2466 -->

* Updated the conversion logic for child array elements in an event. <!--- CEXT-2245 -->

* Added the ability to switch to a development environment when testing the transmission of events. <!--- CEXT-2121 -->

* Common logic for data collecting has been moved to a new module, `OutOfProcessExtensibility`. This module must be enabled as described in the [update instructions](./installation.md#update-adobe-io-events-for-adobe-commerce). <!--- CEXT-2215, 2266, 2267, 2312, 2503-->

### Bug fixes

* Corrected a condition that caused the `bin/magento setup:upgrade` command to return an error when the eventing module has been disabled. <!--- CEXT-2569 -->

* The **Test Connection** is now disabled when the provider ID is removed. <!--- CEXT-2216 -->

## Adobe IO Events client module updates

### Enhancements

* Added validation to ensure the workspace configuration has the correct structure of project > workspace credentials. <!--- CEXT-2174 -->

* Added the ability to switch to a development environment when testing the transmission of events. <!--- CEXT-2121 -->

* The eventing template in App Builder works correctly when the Adobe I/O Authorization type is set to OAuth. <!--- CEXT-2254 -->

* Updated an error message that occurred when eventing is not configured. <!--- CEXT-2568 -->

### Bug fixes

* Corrected an issue that caused the Adobe Services tab of the Admin to disappear. <!--- PR-50 -->

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

*  Added support for delivering events using message queues. Previously, all events were delivered by cron, which could delay delivery by up to a minute. Use the `bin/magento events:subscribe --priority` command to register the event as requiring expedited delivery. See [Configure Adobe Commerce](./configure-commerce.md#check-cron-and-message-queue-configuration) for information about configuring the message queues.

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

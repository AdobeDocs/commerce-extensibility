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

## Version 1.4.0

* Increased the default value of retry count from three to seven to improve deliveries of failed events.

* Added support for using nested fields in the rules of conditional events.

* Added support of `io_events.xml` from the root `app/etc` directory.

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

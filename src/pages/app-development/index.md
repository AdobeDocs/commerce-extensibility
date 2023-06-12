---
title: Adobe Commerce App Developer's Guide Overview
description: 
---

# Adobe Commerce App Developer's Guide Overview

Developers have traditionally used PHP to create in-process extensions that add features, functionality, services, and integrations to Adobe Commerce. This model requires any new code to be compatible with upgrades, the server's PHP version, and many other essential server applications and services that Commerce uses.

Adobe Developer App Builder uses out-of-process extensibility to avoid these compatibility issues. It provides a unified third-party extensibility framework for integrating and creating custom applications that extend Adobe Commerce. Since this extensibility framework is built on Adobe's infrastructure, developers can build custom microservices, and extend and integrate Adobe Commerce across other Adobe solutions and third-party integrations.

## How do I port an extension into an app?

Start by becoming familiar with the [App Builder documentation](https://developer.adobe.com/app-builder/docs/overview/) and [create an Adobe developer account](https://developer.adobe.com/app-builder/docs/overview/getting_access/).

Once you've become comfortable with the Adobe I/O infrastructure, analyze  your current extensions and begin mapping its in-process features into the App Builder and Adobe I/O environment. Key areas to consider include:

*  Service contracts
*  Plugins and observers
*  Backend development
*  Custom cron jobs
*  Database data
*  Filesystem

## APIs

[API Mesh for Adobe Developer App Builder](https://developer.adobe.com/graphql-mesh-gateway/) enables developers to integrate private and third-party APIs and other software interfaces with Adobe Commerce and other Adobe products using Adobe I/O.

## Plugins and observers

[Adobe I/O Events for Adobe Commerce](https://developer.adobe.com/commerce/events/) makes Commerce transactional data available to App Builder using Adobe I/O. You can define the events to transmit data each time an event triggers, or only under circumstances defined within configuration rules.

##  Admin development

The [Adobe Commerce Admin UI SDK](../admin-ui-sdk/index.md) enables an App Builder developer to extend the [Commerce Admin](https://experienceleague.adobe.com/docs/commerce-admin/start/admin/admin.html) to include custom menus and pages.

## Custom cron jobs

App Builder uses Apache OpenWhisk Alarms to perform the scheduling services traditionally provided by cron jobs. [Scheduling Cron Jobs with Alarms](https://developer.adobe.com/app-builder/docs/resources/cron-jobs/) walks you through the process of implementing this feature.

## Database data

The [Adobe I/O Key/Value Storage library](https://github.com/adobe/aio-lib-state) is an npm module that provides a JavaScript abstraction on top of distributed/cloud databases with a simple key-value store state persistence API.

## Filesystem

the [Adobe I/O Files library](https://github.com/adobe/aio-lib-state) provides a JavaScript abstraction on top of cloud blob storages with a simple file-system like persistence API.

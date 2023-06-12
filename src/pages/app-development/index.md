---
title: Adobe Commerce App Developer's Guide Overview
description: Learn how to make the transition from developing Commerce PHP extensions to developing Out-of-Process apps.
---

# Adobe Commerce App Developer's Guide Overview

Developers have traditionally used PHP to create in-process extensions that add features, functionality, services, and integrations to Adobe Commerce. This model requires any new code to be compatible with upgrades, the server's PHP version, and many other essential server applications and services that Commerce uses.

Adobe Developer App Builder uses out-of-process extensibility to avoid these compatibility issues. It provides a unified third-party extensibility framework for integrating and creating custom applications that extend Adobe Commerce. Since this extensibility framework is built on Adobe's infrastructure, developers can build custom microservices, and extend and integrate Adobe Commerce across other Adobe solutions and third-party integrations.

## How do I port an extension into an app?

Start by becoming familiar with the [App Builder documentation](https://developer.adobe.com/app-builder/docs/overview/) and [create an Adobe developer account](https://developer.adobe.com/app-builder/docs/overview/getting_access/).

Once you've become comfortable with the Adobe I/O infrastructure, analyze  your current extensions and begin mapping its in-process features into the App Builder and Adobe I/O environment. Key areas to consider include:

*  Frontend development
*  APIs
*  Plugins and observers
*  Backend development
*  Custom cron jobs
*  Database data
*  Filesystem

### Frontend development

[Spectrum](https://spectrum.adobe.com/page/principles/) provides all the tools you need to create the next generation of React-based applications. Adobe Commerce continues support of legacy [PWA Studio](https://developer.adobe.com/commerce/pwa-studio/) and [Luma](https://developer.adobe.com/commerce/frontend-core/) storefronts.

### APIs

[API Mesh for Adobe Developer App Builder](https://developer.adobe.com/graphql-mesh-gateway/) enables developers to integrate private and third-party APIs and other software interfaces with Adobe Commerce and other Adobe products using Adobe I/O.

### Plugins and observers

[Adobe I/O Events for Adobe Commerce](https://developer.adobe.com/commerce/events/) makes Commerce transactional data available to App Builder using Adobe I/O. You can define the events to transmit data each time an event triggers, or only under circumstances defined within configuration rules.

### Admin development

The [Adobe Commerce Admin UI SDK](../admin-ui-sdk/index.md) enables an App Builder developer to extend the [Commerce Admin](https://experienceleague.adobe.com/docs/commerce-admin/start/admin/admin.html) to include custom menus and pages.

### Custom cron jobs

App Builder uses Apache OpenWhisk Alarms to perform the scheduling services traditionally provided by cron jobs. [Scheduling Cron Jobs with Alarms](https://developer.adobe.com/app-builder/docs/resources/cron-jobs/) walks you through the process of implementing this feature.

### Database data

The [Adobe I/O Key/Value Storage library](https://github.com/adobe/aio-lib-state) is an npm module that provides a JavaScript abstraction on top of distributed/cloud databases with a simple key-value store state persistence API.

### Filesystem

The [Adobe I/O Files library](https://github.com/adobe/aio-lib-state) provides a JavaScript abstraction on top of cloud blob storages with a simple file-system like persistence API.

## Related information

View the following tutorials for more information about using App Builder to build out-of-process apps:

*  [Introduction to App Builder](https://experienceleague.adobe.com/docs/commerce-learn/tutorials/adobe-developer-app-builder/introduction-to-app-builder.html)

*  [Extensibility Framework for App Builder](https://experienceleague.adobe.com/docs/commerce-learn/tutorials/adobe-developer-app-builder/extensibility-framework-commerce-eventing.html)

*  [Functional demonstration for App Builder](https://experienceleague.adobe.com/docs/commerce-learn/tutorials/adobe-developer-app-builder/app-builder-functional-demonstration.html)

*  [Build your first App Builder app](https://experienceleague.adobe.com/docs/commerce-learn/tutorials/adobe-developer-app-builder/first-app/overview.html)

*  [Get started with API Mesh](https://experienceleague.adobe.com/docs/commerce-learn/tutorials/adobe-developer-app-builder/api-mesh/getting-started-api-mesh.html)

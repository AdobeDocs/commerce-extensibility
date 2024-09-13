---
title: App Development Comparison
description: Learn about the differences in app development between Adobe Commerce and App Builder.
keywords:
  - App Builder
  - Extensibility
---

# App Development Comparison

Adobe Commerce is a powerful e-commerce platform that allows developers to use in-process extensibility to enhance its functionality. By combining Commerce with Adobe Developer App Builder, developers now have a new out-of-process set of tools. This guide highlights key differences and benefits between using Commerce's built-in extensibility offerings and App Builder's [out-of-process development tools](../index.md).

The following sections help developers transition from Adobe Commerce extension development to Adobe Developer App Builder development.

- [Coding convention](#coding-conventions)
- [Integrating third-party modules](#integrating-third-party-modules)
- [Services Comparison](./services-comparison.md)

## Coding conventions

Coding conventions are a set of guidelines that define how developers write and format code. This section highlights the differences in coding conventions between Commerce and App Builder.

### Models and resource models

This section highlights the differences in models and resource models between Commerce and App Builder.

#### Commerce

Models in Commerce are responsible for:

- Data operations
- Interacting with the database
- Encapsulating business logic

Commerce models are usually found in `app/code/<Vendor>/<Module>/Model/`. They often extend from core Magento classes such as `\Magento\Framework\Model\AbstractModel`.

#### App Builder

App Builder replaces the concept of Models with API endpoints and business logic functions that interact with external data sources or Adobe services.

These JavaScript functions are typically contained in the [`actions` directory](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/configuring-and-extending/app-builder/actions). 

### Controllers

This section highlights the differences in controllers between Commerce and App Builder.

#### Commerce

Controllers handle HTTP requests and route them to the appropriate business logic within the Commerce codebase. `app/code/<Vendor>/<Module>/Controller/` contains most controllers.

These controllers usually extend from Magento's core controller classes like `\Magento\Framework\App\Action\Action`.

#### App Builder

App Builder uses actions to handle HTTP requests and execute the necessary business logic. They are similar to controllers in traditional Model-View-Controller (MVC) frameworks.

The controllers are JavaScript functions within the [`actions` directory](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/configuring-and-extending/app-builder/actions).

### Plugins and observers

This section highlights the differences in plugins and observers between Commerce and App Builder.

#### Commerce

Plugins (or interceptors) in Commerce allow developers to modify the behavior of public methods by intercepting calls to those methods. They extend or alter the functionality of existing classes modularly without modifying the original code.

Commerce observers listen to dispatch events during various points of the application lifecycle and execute custom logic in response to those events.

`app/code/<Vendor>/<Module>/Plugin/` contains most plugins.

#### App Builder

In App Builder, you can create plugins and observers using [Adobe I/O Events](https://developer.adobe.com/events/docs/). Adobe I/O Events allows Commerce to publish events that services built on App Builder can consume. This enables you to extend the capabilities of Commerce by triggering actions in your custom App Builder application.

Commerce plugins dispatch these events and App Builder actions handle them. For more information, see the [Adobe I/O Events for Adobe Commerce Overview](https://developer.adobe.com/commerce/extensibility/events/).

### Cron jobs and alarms

The following section highlights the differences between cron jobs in Commerce and alarms in App Builder.

#### Commerce

Cron jobs in Commerce are scheduled tasks that execute at specific intervals. They are for recurring tasks such as reindexing, sending emails, and generating reports.

In Commerce, you define Cron jobs in the module's `crontab.xml` file, but the actual logic is in classes found in the `cron` directory within the module.

#### App Builder

Alarms in Adobe I/O Runtime are trigger provided by the OpenWhisk ecosystem. They allow you to schedule actions to run at specified intervals, similar to how [cron jobs](https://developer.adobe.com/app-builder/docs/resources/cron-jobs/) work in a traditional server environment.

You can set these alarms to trigger at specific times or on a recurring schedule using cron expressions.

Alarms can trigger any action, such as [Controllers](#controllers), you define in the YAML configuration file.

### Message queue

This section highlights the differences in message queues between Commerce and App Builder.

#### Commerce

Message queues in Commerce manage background processes and decouple tasks to improve performance and scalability. They handle asynchronous communication between different parts of the application.

Message producers send messages to the queue, and message consumers process those messages.

#### App Builder

In App Builder, [Adobe I/O Events](https://developer.adobe.com/events/docs/) provides a substitute to message queues. Adobe I/O Events allows you to publish events and consume them asynchronously using Webhooks or the Journaling API. This mechanism helps manage background processes, decouple tasks, and handle asynchronous communication between different parts of the application.

The configuration requires managing multiple XML files.

- Event Publisher - This is analogous to the producer in a message queue system. It publishes events to Adobe I/O Events. You can publish events from different sources, such as Adobe services or custom applications.

- Event Consumer - This is analogous to the consumer in a message queue system. It processes the events asynchronously. You can implement consumers using Webhooks or the Journaling API to listen for and process events.

### Admin modules

This section highlights the differences in Admin modules between Commerce and App Builder.

#### Commerce

Commerce delivers extensive capabilities for developing custom Admin interfaces. These interfaces empower administrators to interact with and manage aspects of the extensions, enhancing the functionality and user experience of the platform. The Commerce Admin user interface uses a combination of PHP, XML, and JavaScript, and it includes a wide array of UI components that developers can use to construct sophisticated and highly interactive admin pages.

#### App Builder

App Builder brings a modern approach to creating and integrating admin interfaces by leveraging the [Admin UI SDK](https://developer.adobe.com/commerce/extensibility/admin-ui-sdk/). This SDK allows developers to integrate Single Page Applications (SPAs) directly into the Commerce Admin interface, providing a seamless experience.

## Integrating third-party modules

This section highlights the differences in integrating third-party modules between Commerce and App Builder.

### Composer (Commerce) and NPM (App Builder)

In modern web development, integrating third-party modules and libraries is a common practice which enhances functionality, streamlines development, and leverages community-driven solutions. Both Commerce and App Builder provide robust mechanisms for managing these integrations through different tools.

#### Commerce

Commerce uses Composer, a dependency management tool for PHP, to manage the installation and updates of the Commerce system, as well as third-party extensions and libraries. Composer simplifies the process of declaring and resolving dependencies, ensuring that all necessary packages install properly and are compatible with each other. This tool maintains the integrity and functionality of a Commerce-based application, enabling developers to add, update, and manage PHP packages and Commerce modules.

#### App Builder

App Builder leverages Node Package Manager (NPM) to manage dependencies for its serverless functions and other JavaScript-based components. NPM is the default package manager for Node.js and is essential for managing the vast ecosystem of JavaScript libraries and tools. It allows developers to install, update, and manage third-party modules, facilitating the rapid development and deployment of serverless applications within App Builder.

#### Feature Comparison

While both tools serve the same fundamental purpose of dependency management, they operate in different environments and cater to distinct programming languages and ecosystems. The following comparison highlights the key features and differences between Composer packages in Commerce and NPM packages in App Builder.

<p></p>

| Feature | Composer (Commerce) | NPM (App Builder) |
|---------|---------------------------|-------------------------|
| Language | PHP | JavaScript or Node.js |
| Package Management | Manages PHP packages and Commerce modules | Manages JavaScript packages and Node.js modules |
| Dependency Resolution | Automatically resolves and installs dependencies | Automatically resolves and installs dependencies |
| Version Control | Supports version constraints and ranges | Supports version constraints and ranges |
| Autoloading | PSR-4 autoloading for PHP classes | CommonJS or ES6 module system (require/import) |
| Repositories | Default: Packagist, supports private and custom repositories | Default: NPM registry, supports private and custom registries |
| Scripts | Limited script capabilities (via Composer scripts) | Extensive script capabilities via scripts field in `package.json` |
| Use Cases | Installing Commerce and third-party PHP modules | Installing Node.js modules, building serverless functions |
| Configuration File | `composer.json` | `package.json ` |
| Example Command to Add Module | `composer require vendor/module-name` | `npm install module-name` |
| Example Command to Update | `composer update` | `npm update` |

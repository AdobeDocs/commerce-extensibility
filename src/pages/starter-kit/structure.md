---
title: Starter Kit structure
description: Something
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---

import BetaNote from '/src/_includes/starter-kit-beta.md'

<BetaNote />

# Starter Kit structure

The Adobe Commerce Integration Starter Kit provides boilerplate code to synchronize the following entities across systems:

- Customer
- Customer Group
- Order
- Product
- Shipment
- Stock

By default, object synchronization is bi-directional. Changes in Commerce are propagated to the external backoffice application and vice versa.

The source code follows the [file structure](https://developer.adobe.com/app-builder/docs/guides/extensions/extension_migration_guide/#old-file-structure) of a typical App Builder application. Most importantly, the `actions` directory contains the source code for all the serverless actions.

The following diagram shows the directory structure of the Starter Kit project:

```tree
|__ root
|   |__ actions
|   |   |__ <entity>
|   |   |   |__ commerce
|   |   |   |   |__ consumer
|   |   |   |   |__ <action>
|   |   |   |__ external
|   |   |   |   |__ consumer
|   |   |   |   |__ <action>
|   |   |__ ingestion
|   |   |   |__ webhook
|   |   |__ webhook
|   |   |   |__ <action>
|   |__ onboarding
|   |__ test
|   |__ utils
```

The most important directories and files are described below.

### `actions` directory

The `actions` directory has the following subdirectories:

- `ingestion` - contains the source code for an alternative events ingestion endpoint.
- `webhook` - contains the source for synchronous webhooks that can be called from Commerce.
- Separate directories for each entity to be synchronized, including `customer`, `order`, and `product`.

Each entity directory has `commerce` and `external` subdirectories. The `commerce` directory contains the runtime actions responsible for handling incoming events from Commerce and synchronizing the data with the 3rd-party external system. The `external` directory defines the runtime actions that handle incoming events from the external system and updates entities in Commerce.

The contents of the `commerce` and `external` directories are similar. Each contains

- A `consumer` directory. This directory contains the code for the runtime action that routes incoming events to the action responsible for handling each event.
- One or more directories that are named after an action, such as `created`, `deleted`, and other actions that are appropriate for the entity. Each of these directories contains the code for the runtime action responsible for handling one particular event.
- An `actions.config.yaml` file. This file declares the runtime actions responsible for handling the events for an entity originating in Commerce or the external system.

Individual directories that define actions contain the following files:

File | Purpose
--- | ---
`index.js` | Contains the main method that gets invoked when handling an event. It is responsible for coordinating the different activities involved in that handling, such as validating the incoming payload, transforming the payload to the target API, and interacting with the target API.
`pre.js` and `post.js` | Provide convenient extension points to introduce custom business logic before and after interacting with the target API.
`sender.js` | Implements the logic to interact with the target API so that the changes are propagated. For actions in the `external` directory, Commerce APIs are the target. Actions in the `commerce` directory target external APIs.
`schema.json` | (`external` directories only) Defines the schema to be validated against the incoming event payload.
`transformer.js` | Implements the logic to transform the incoming event payload to make it suitable for the target API being called to propagate the changes.
`validator.js` | Implements the logic to validate the incoming event payload.

### `onboarding` directory

The `onboarding` directory contains the scripting needed to install and set up the Starter Kit. The `./onboarding/custom/starter-kit-registrations.json` configuration file creates all the registrations for all entities that are present in the repo's `app.config.yaml` file. You can edit this file to remove any unnecessary Commerce or back office registrations. [Onboarding](./create-integration.md#onboarding) describes the installation process.

### `test` directory

The Starter Kit provides unit tests for most of the included runtime actions. These tests are in the `test/actions` directory. You can also find unit tests for the onboarding script in the `test/onboarding` directory.

[Testing a Serverless Action](https://developer.adobe.com/app-builder/docs/resources/barcode-reader/test/) provides details about unit testing.

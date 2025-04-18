---
title: Development
description: Learn about developing with the Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - Extensibility
---

# Development

This guide provides basic information for software development using the checkout starter kit.

## Prerequisites

Before you begin, make sure you've completed the initial setup of the starter kit.  
See [Initial configuration](./getting-started.md) for more details.

## Running locally

The starter kit consists of two main parts, as defined in [`app.config.yaml`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/app.config.yaml):

- `application`: The main app builder actions and event handlers of the starter kit.
- `commerce/backend-ui/1`: UI-specific components and related actions for the Adobe Commerce Admin UI.

Note that only one extension can be run locally or deployed to a given runtime environment at a time.

To run the project locally, use the following commands:

```bash
# Run the project locally
aio app dev -e application
aio app dev -e commerce/backend-ui/1

# Run the project locally but deploy to the runtime environment
aio app run -e application
aio app run -e commerce/backend-ui/1
```

See [aio app dev vs. aio app run](https://developer.adobe.com/app-builder/docs/guides/development/#aio-app-dev-vs-aio-app-run) to understand the differences between the two modes.

## Deploy the application

To deploy the app using the Adobe I/O CLI, use the following commands:

```bash
aio app deploy -e application --force-deploy
aio app deploy -e commerce/backend-ui/1 --force-deploy
```

## Undeploy the application

To remove the app and clean up all deployed resources from Adobe I/O Runtime and web resources, use the following commands:

```bash
aio app undeploy
```

## Linting and formatting

The starter kit uses [Prettier](https://prettier.io) and [ESLint](https://eslint.org) to enforce code style and formatting. The following commands are available for linting and formatting:

- Fix linting

  ```bash
  npm run lint:fix
  ```

- Fix format

  ```bash
  npm run format:fix
  ```

- Fix both linting and format

  ```bash
  npm run code:fix
  ```

Use the following links to configure formatting for your IDE:

- [VS Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Jetbrains](https://blog.jetbrains.com/webstorm/2016/08/using-external-tools/)

## Debugging

For debugging applications created with the starter kit, refer to the [App Builder debugging](https://developer.adobe.com/app-builder/docs/guides/development/#debugging) documentation.

## Testing

The testing framework is in [Jest](https://jestjs.io) and execution is based on the [`aio` CLI](https://developer.adobe.com/runtime/docs/guides/tools/cli_install/).

Run unit tests for the UI and actions:

```bash
aio app test
```

Run end-to-end tests:

```bash
aio app test --e2e
```

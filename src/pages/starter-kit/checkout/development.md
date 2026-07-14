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

Before you begin, make sure you've completed the initial setup of your app.  
See [Getting started](getting-started.md) for more details.

### Verify your application is initialized

When the App Builder application is initialized, you should see the following:

- The project and workspace information is generated in `.aio`. You can verify your current location by running `aio where`.
- Your `.env` is updated with App Builder credentials.

If any configuration is missing or outdated, run the following command to sync with the [Adobe Developer Console project](https://developer.adobe.com/console):

```bash
aio app use --merge
```

## Running locally

Each app is organized by extension point (`commerce/extensibility/1`, and for `tax-integration`, `commerce/backend-ui/2` for its Admin UI) — see [Generated files](../../app-management/build-deploy.md#generated-files) for what each contains.

To run an app locally, use the following commands from within its `apps/<name>/` directory:

```bash
# Run the project locally
aio app dev

# Run the project locally but deploy to the runtime environment
aio app run
```

See [aio app dev vs. aio app run](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/development) to understand the differences between the two modes.

## Deploy the application

See [Build and deploy](../../app-management/build-deploy.md) for the build, deploy, and association steps.

## Undeploy the application

To remove an app and clean up all deployed resources from Adobe I/O Runtime and web resources, run the following command from within its `apps/<name>/` directory:

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

For debugging applications created with the starter kit, refer to the [App Builder debugging](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/development#debugging) documentation.

## Testing

The testing framework is in [Jest](https://jestjs.io) and execution is based on the [`aio` CLI](https://developer.adobe.com/app-builder/docs/guides/runtime_guides/tools/cli-install).

Run unit tests for the UI and actions:

```bash
aio app test
```

Run end-to-end tests:

```bash
aio app test --e2e
```

## Troubleshooting

This section provides solutions to common issues you may encounter while developing with the checkout starter kit.

### AioCoreSDKError 403 Forbidden

If you encounter the error `AioCoreSDKError [EventsSDKError]: [EventsSDK:ERROR_GET_ALL_PROVIDERS] Error: 403 - Forbidden` when creating an event provider, perform the following steps:

1. Ensure you have added the I/O Management API while [initializing your app](getting-started.md#initialize-your-app).
1. Verify that you have the following permissions in the [Adobe Developer Console](https://developer.adobe.com/console) in the side-navigation menu under **OAuth Server-to-Server** > **Scope**:

  ```bash
  ["AdobeID","openid","read_organizations","additional_info.projectedProductContext","additional_info.roles","adobeio_api","read_client_secret","manage_client_secrets","event_receiver_api"]
  ```

1. If any permissions are missing, update your [Adobe I/O CLI](https://developer.adobe.com/app-builder/docs/guides/runtime_guides/tools/cli-install) to the latest version. Then delete and re-add the I/O Management API service:

  ```bash
  npm install -g @adobe/aio-cli
  aio app delete service # Delete I/O Management API
  aio app add service # Add I/O Management API again
  ```

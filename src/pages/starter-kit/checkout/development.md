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

#### Verify your application is initialized

When the App Builder application is initialized, you should see the following:

- The project and workspace information is generated in `.aio`. You can verify your current location by running `aio where`.
- Your `.env` is updated with App Builder credentials.

If any configuration is missing or outdated, run the following command to sync with the [Adobe Developer Console project](https://developer.adobe.com/console):

```bash
aio app use --merge
```

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

#### AioCoreSDKError 403 Forbidden

If you encounter the error `AioCoreSDKError [EventsSDKError]: [EventsSDK:ERROR_GET_ALL_PROVIDERS] Error: 403 - Forbidden` when creating an event provider, please follow these steps:

1. Select the project and workspace you set up during the [initial configuration](./getting-started.md#initial-configuration).
1. Ensure you have added the [I/O Management API](./getting-started.md#initial-configuration)
1. Verify that you have the required permissions in the [Adobe Developer Console](https://developer.adobe.com/console) > **OAuth Server-to-Server** in the side-navigation menu > **Scope**:

  ```bash
  ["AdobeID","openid","read_organizations","additional_info.projectedProductContext","additional_info.roles","adobeio_api","read_client_secret","manage_client_secrets","event_receiver_api"]
  ```

1. If any permissions are missing, update your [Adobe I/O CLI](https://developer.adobe.com/app-builder/docs/guides/runtime_guides/tools/cli-install) to the latest version. Then delete and re-add the I/O Management API service:

  ```bash
  npm install -g @adobe/aio-cli
  aio app delete service # Delete I/O Management API
  aio app add service # Add I/O Management API again
  ```

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

Each app implements the `commerce/extensibility/1` extension point, which is required for App Management integration. Additionally, `tax-integration` implements the `commerce/backend-ui/2` extension point, which is required for its Admin UI SDK integration.

App Management hooks into the `aio` CLI lifecycle to auto-configure and generate the code under these extension points. For more details, refer to the [App Management](../../app-management/build-deploy.md) documentation.

To run an app locally, use the following commands from within your app's project directory:

```bash
# Run the project locally
aio app dev

# Run the project locally but deploy to the runtime environment
aio app run
```

See [aio app dev vs. aio app run](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/development) to understand the differences between the two modes.

## Deploy the application

To deploy the app using the Adobe I/O CLI, run the following command from within your app's project directory:

```bash
aio app deploy --force-build --force-deploy
```

See [Build and deploy](../../app-management/build-deploy.md) for the full build, deploy, and association steps.

## Undeploy the application

To remove an app and clean up all deployed resources from Adobe I/O Runtime and web resources, run the following command from within your app's project directory:

```bash
aio app undeploy
```

## Continuous integration and delivery (CI/CD)

Each app is an independent App Builder project with its own workspaces, so you set up CI/CD per app.

The recommended pattern provisions each workspace once (as a human with Adobe Developer Console access), downloads its `workspace.json`, and stores it as a GitHub Actions secret. The pipeline then injects those values into the `aio app build` and `aio app deploy` commands. It never calls Console management APIs itself.

See [Setting up a CI/CD pipeline using GitHub Actions](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/deployment/cicd-using-github-actions) for the full setup.

## Linting and formatting

The starter kit uses [Biome](https://biomejs.dev) to enforce code style and formatting. The following commands are available:

- Check for linting and formatting issues

  ```bash
  npm run code:check
  ```

- Fix linting and formatting issues

  ```bash
  npm run code:fix
  ```

To configure Biome for your IDE, refer to the [Biome editor integrations](https://biomejs.dev/guides/editors/first-party-extensions/).

## Debugging

For debugging applications created with the starter kit, refer to the [App Builder debugging](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/development#debugging) documentation.

## Testing

The testing framework is [Vitest](https://vitest.dev).

Run unit tests for the UI and actions:

```bash
npm test
```

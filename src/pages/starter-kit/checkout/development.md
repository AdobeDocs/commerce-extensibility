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

You must install or have access to the following prerequisites to develop with the Adobe Commerce checkout starter kit:

- [Node.js](https://nodejs.org/) version 22. If you have Node Version Manager (`nvm`) installed, you can run the following command to install and use the required version:

  ```bash
  cat .nvmrc | nvm install && nvm use
  ```

- [Adobe I/O CLI](https://developer.adobe.com/runtime/docs/guides/tools/cli_install/).

- Access to the [Adobe Developer Console](https://console.adobe.io/) with an App
  Builder license. If you do not have access to the Adobe Developer Console or App Builder, refer to [get access to App Builder](https://developer.adobe.com/app-builder/docs/overview/getting_access/#get-access-to-app-builder).

## Initial configuration

Use the following steps to configure your local environment:

1. Create a folder for your project and navigate to it.

1. Execute the following command to create an Adobe Developer Console project in your organization and using the Commerce checkout starter kit as a template:

  ```bash
  aio app init --repo adobe/commerce-checkout-starter-kit --github-pat $GITHUB_PAT
  ```

  Replace `$GITHUB_PAT` with your GitHub personal access token. For more information, refer to [managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

1. The starter kit requires you to add the following services in the console project:

   - I/O Management API
   - I/O Events
   - Adobe I/O Events for Adobe Commerce

  Execute the following command to add the services by selecting them from the list:

  ```bash
  aio app add service
  ```

## Testing

The testing framework is in [Jest](https://jestjs.io) and execution is based on the [`aio` CLI](https://developer.adobe.com/runtime/docs/guides/tools/cli_install/).

```bash
# Run unit tests for ui and actions
aio app test

# Run e2e tests
aio app test --e2e
```

These are example tests and do not provide any relevant testing. These tests are only examples of how to use the available tooling. Use the tests to create your own tests relevant to your implementation.

## Linting and formatting

The starter kit uses [Prettier](https://prettier.io) and [ESLint](https://eslint.org) to enforce code style and formatting. The following commands are available for linting and formatting:

```bash
# Check linting
npm run lint:check
# Fix linting
npm run lint:fix

# Check format
npm run format:check
# Fix format
npm run format:fix

# Check both linting and format
npm run code:check
# Fix both linting and format
npm run code:fix
```

Use the following links to configure formatting for your IDE:

- [VS Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Jetbrains](https://blog.jetbrains.com/webstorm/2016/08/using-external-tools/)

## Debugging

For debugging applications created with the starter kit, refer to the [App Builder debugging](https://developer.adobe.com/app-builder/docs/guides/development/#debugging) documentation.

### Deploy & Cleanup

The starter kit uses the Adobe I/O CLI to deploy and undeploy the application, using the following commands:

```bash
# Builds and deploys all actions on Runtime and static files to CDN
aio app deploy

# Undeploys the application
aio app undeploy
```

---
title: Development
description: Learn about developing with the Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - Extensibility
---

# Development

This guide provides basic information for software development using the checkout starter kit.

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

These are example tests and do not provide any relevant testing. These tests are only examples of how to use the available tooling. Use the tests to create your own tests relevant to your implementation.

## Linting and formatting

The starter kit uses [Prettier](https://prettier.io) and [ESLint](https://eslint.org) to enforce code style and formatting. The following commands are available for linting and formatting:

- Check linting

  ```bash
  npm run lint:check
  ```

- Fix linting

  ```bash
  npm run lint:fix
  ```

- Check format

  ```bash
  npm run format:check
  ```

- Fix format

  ```bash
  npm run format:fix
  ```

- Check both linting and format

  ```bash
  npm run code:check
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

### Deploy and cleanup

The starter kit uses the Adobe I/O CLI to deploy and undeploy the application, using the following commands:

```bash
aio app deploy
```

```bash
aio app undeploy
```

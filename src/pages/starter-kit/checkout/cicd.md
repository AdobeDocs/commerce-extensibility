---
title: Continuous integration and continuous delivery (CI/CD)
description: Learn about continuous integration and continuous delivery (CI/CD) for Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - Extensibility
---

# CI/CD

Continuous Integration and Continuous Delivery (CI/CD) is a software development practice that enables developers to automate the process of building, testing, and deploying applications. This practice helps to deliver code changes more frequently and reliably, ensuring that the application is always in a deployable state.

To learn more about CI/CD for App builder, refer to [CI/CD for App Builder Applications](https://developer.adobe.com/app-builder/docs/guides/deployment/ci_cd_for_firefly_apps/).

To assist with CI/CD implementation, review the following workflow examples.

## Workflow Examples

The following workflow examples implement the continuous integration using Github Actions.

### Production deployment example

The [deploy_prod.yml](https://github.com/adobe/commerce-checkout-starter-kit/tree/main/.github/workflows-samples/deploy_prod.yml) workflow triggers on a release event ([Github Events that trigger Workflows](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#release)), which is when a release is marked as released.  It also defines a single job called `deploy`, which performs the following steps sequentially to deploy the application to production.

1. **Environment Setup** - Performs the following setup steps:
   - [Matrix Strategy](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/running-variations-of-jobs-in-a-workflow#about-matrix-strategies): The job runs on Ubuntu (ubuntu-latest) using Node.js version 20. It only allows one parallel execution (`max-parallel: 1`) and executes the following steps:
     - Checkout Code: Retrieves the code from the repository using `actions/checkout`.
     - Setup Node.js: Configures the specified Node.js version (20).

1. **NPM Install** - Installs the required dependencies for the application, like Node Package manager.

1. **CLI Setup** - Installs and configures the `Adobe I/O CLI` tool using the `adobe/aio-cli-setup-action` action.

1. **Authentication** - Authenticates with `Adobe I/O` using secure credentials stored as secrets (for example, `CLIENTID_PROD` and `CLIENTSECRET_PROD`). Refer to [Secrets in Github Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions#about-secrets) to configure variables as secrets.

1. **Build Process** - Builds the application using the build command from `adobe/aio-apps-action`.

1. **Deployment** - Deploys the application to production using the `deploy` command. Relevant credentials, like `AIO_RUNTIME_NAMESPACE` and `AIO_RUNTIME_AUTH` and project details like `AIO_PROJECT_NAME` and `AIO_PROJECT_WORKSPACE_NAME`, are securely provided as environment variables. You must define these variables in the repository settings.

### Stage deployment example

The [deploy_stage.yml](https://github.com/adobe/commerce-checkout-starter-kit/tree/main/.github/workflows-samples/deploy_stage.yml) workflow is the same as the [Production deployment example](#production-deployment-example), with the following key differences:

1. The workflow triggers on a push to the `main` branch.

1. Authentication and deployment secrets are staging-specific which means you must define them separately for this environment.

### Pull request testing example

The [pr_test.yml](https://github.com/adobe/commerce-checkout-starter-kit/tree/main/.github/workflows-samples/pr_test.yml) workflow triggers when you open, update, or synchronize a pull request, which creates a [Pull request event](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#pull_request). This workflow allows you to test changes in the pull request across multiple operating systems and Node.js versions before merging it into the main branch.

The testing workflow performs the following steps:

1. **Environment Setup** - Checks out the code using the `checkout` action and configures Node.js using the `setup-node` action.

1. **Dependency Installation** - Installs necessary dependencies with `npm i`.

1. **CLI Setup** - Installs and configures the `Adobe I/O CLI` tool.

1. **Authentication** - Authenticates using staging credentials stored in GitHub secrets, ensuring secure access to `Adobe I/O` services.

1. **Build Process** - Builds the application to ensure all components compile successfully.

1. **Testing** - Runs the `test` command via `adobe/aio-apps-action` to validate functionality.

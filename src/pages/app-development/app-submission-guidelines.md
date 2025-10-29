---
title: App submission guidelines for Adobe Commerce apps
description: Learn how to submit your app for review and app requirements and best practices.
keywords:
  - Extensibility
---

import Webhook from '/src/_includes/webhook-auth.md'

# App submission guidelines

This page provides a list of requirements and best practices for Adobe Commerce app developers to ensure your app is ready for submission. Following these guidelines will help reduce rejection rates and improve the quality of your app.

The Adobe Commerce App Builder review process evaluates submissions across multiple criteria including documentation quality, security practices, code structure, and functionality.

<InlineAlert variant="info" slots="text, text1"/>

For more general information on the application submission process, refer to the [App Builder distribution documentation](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/distribution).

## Review process

When you submit your Commerce App Builder extension, our review team will evaluate your submission against the criteria outlined on this page.

- **[Requirements](#requirements)** - Critical requirements that must be addressed before approval
- **[Best practices](#best-practices)** - Recommended improvements that enhance quality but don't block approval

## If your app is rejected

If your submission is rejected:

1. Review the specific feedback provided by the review team.
1. Address all requirements listed in the rejection notice.
1. Consider implementing best practices to improve quality.
1. Resubmit your updated extension.

## Requirements

The following requirements must be met for your app to be accepted. If your app does not meet these requirements, it will be rejected.

To ensure that your submission's documentation contains the expected information, we recommend using relevant sections of the [Commerce Integration Starter Kit documentation](https://github.com/adobe/commerce-integration-starter-kit/blob/main/README.md) or the [Commerce Checkout Starter Kit documentation](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/README.md) as a starting point.

Some requirements will differ based on whether you indicated the app was non-downloadable during the submission process. This is because non-downloadable apps are installed in auto-generated environments, and users do not have access to the project files.

### Documentation

- General documentation guidelines
  - **Project-specific language**: Use project-specific language. Avoid generic references to "Adobe", "Magento" or "starter kit".
  - **Configuration details**: Clearly list the app configuration and any third-party service-specific setup steps.
  - **Clear summary**: Provide a compact description that captures the app’s purpose and primary use cases.
  - **Usage instructions**: Add instructions on how to use the app post-installation.
  - For non-downloadable apps:
      - All installation steps and usage instructions must be posted at the application documentation URL provided in Exchange. Because the app is not downloadable, README files and similar documents will not be accessible to customers.
- Installation guide clarity
  - **Prerequisites**: Add clear prerequisites (example: Admin UI SDK must be enabled and configured, as described in [the Admin UI SDK documentation](https://developer.adobe.com/commerce/extensibility/admin-ui-sdk/configuration/#general-configuration)).

      - If the app is compatible with the EDS storefront, include instructions for setup. [Example documentation](https://experienceleague.adobe.com/developer/commerce/storefront/get-started/create-storefront/)
      - If the app uses a Mesh, provide detailed information on how to configure it according to Adobe guidelines. [Example documentation](https://developer.adobe.com/commerce/extensibility/app-development/app-submission-guidelines/)
      - If the app uses eventing, provide information about the events used in the project and how to subscribe to them. [Example documentation](https://github.com/adobe/commerce-integration-starter-kit?tab=readme-ov-file#onboarding)
      - If the app uses webhooks, provide information on how to create a webhook. [Example documentation](https://github.com/adobe/commerce-checkout-starter-kit?tab=readme-ov-file#create-webhooks)
  - **Version requirements**: Indicate the required module versions (example: Admin UI SDK minimum version `3.0.0`).
  - **Developer documentation**: Include links to relevant Adobe developer documentation (example: App Builder [getting started guide](https://developer.adobe.com/app-builder/docs/get_started/)).
  - **PaaS support**: Documentation must include installation steps for PaaS merchants. This means if you are submitting an app for Adobe Commerce as a Cloud Service (SaaS), you also need to support Adobe Commerce on cloud infrastructure (PaaS) and Adobe Commerce on-premises (on-prem).
  - **Action scoping**: All runtime actions must be scoped and documented, if they are exposed as webhooks.
  - **PaaS vs SaaS configuration**: Document variables that differ based on Commerce flavor.
    - Explain differences in the structure of the `COMMERCE_BASE_URL` value  if the variable is used (see [Download and configure the integration starter kit](https://developer.adobe.com/commerce/extensibility/starter-kit/integration/create-integration/#download-and-configure-the-integration-starter-kit) for an explanation)
    - Mention in the documentation how to obtain auth credentials for [PaaS](https://developer.adobe.com/commerce/extensibility/starter-kit/integration/create-integration/#paas-or-saas) and [SaaS](https://developer.adobe.com/commerce/extensibility/starter-kit/integration/create-integration/#create-an-integration-in-adobe-commerce-as-a-cloud-service)
  - For downloadable apps:
    - **Environment setup**: Label all required environment variables in an `.env.dist` file with clear guidance. Add a setup instruction to create an `.env` file from `.env.dist`.
    - **API requirements**: List the required services for your application following [this template](https://github.com/adobe/commerce-checkout-starter-kit?tab=readme-ov-file#initialize-app-builder-project).
    - **Project creation**:
        - Document how to create a project and workspaces for deploying the app. Please consider linking to [Create your First App Builder Application](https://developer.adobe.com/app-builder/docs/get_started/app_builder_get_started/first-app)
        - Document CLI commands for installing dependencies and connecting to the created project, which are mentioned in [Configure the starter kit](https://developer.adobe.com/commerce/extensibility/starter-kit/integration/create-integration/#configure-the-starter-kit)
  - For non-downloadable apps:
    - **Environment creation**: Add documentation on how an environment gets created when installing the app from the app page on Adobe Exchange. Please consider linking to the [Discover and Manage](https://developer.adobe.com/developer-distribution/experience-cloud/docs/guides/discoverAndManage/app-builder-discover) documentation for App Builder apps.
    - **Required credentials**: Provide an explanation of the credentials to fill out in the Exchange configuration page.
    - **Please do not mention the following**:
        - Making modifications to an `.env` file
        - Adding files to the app filesystem
        - Running `aio` or `npm` commands from the CLI
- Security awareness
  - **Screenshot security**: Ensure no screenshots contain access tokens, secrets, or API keys.
  - **Sensitive data**: Do not expose credentials or sensitive information in the documentation.

### Security

- Authentication and authorization
  - **Action security**: All runtime actions used by webhooks or admin apps must use `require-adobe-auth: true` in the action configuration.
    - This requires that PaaS apps use Admin UI SDK 3.0 or later. You can add the following to your `composer.json` file to avoid version restrictions:

      ```json
      "magento/commerce-backend-sdk": "3.0.0 as 2.0.0"
      ```

  - **Webhook protection**: For webhooks, actions need to be protected by [signature verification](../webhooks/signature-verification.md) or by enabling the use of IMS authentication in your configuration file.

    <Webhook />

- Credential management
  - **Hardcoded secrets**: No hardcoded secrets (account IDs or tokens) in the code or configuration files.
  - **Encryption**: Secrets or credentials provided in runtime must be encrypted before persisting in state/files.
  - See [Best Practices for Credentials](https://developer.adobe.com/commerce/extensibility/app-development/best-practices/credentials/).
  - **No logging of secrets**: No logging of sensitive credentials or tokens in any runtime action.

- **Publication**: If your app is hosted on GitHub or other platforms for collaboration or other reasons, the repository should be private.

- Vulnerability assessment
  - **Security audit**: Run `npm audit` to ensure there are no `critical` or `high` vulnerabilities.
  - **Dependency check**: Review all dependencies for known security issues.

### Project structure

- Configuration files
  - **Environment variables**:
      - For downloadable apps:
          - Provide a clear `.env.dist` file containing all needed keys used by YAML files. Remove any unused keys.
      - For non-downloadable apps:
          - An `.env.dist` file is optional.
          - All environment variables must be listed under `configSchema` in `app.config.yaml`. See [Customer configuration](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/distribution#customer-configuration) for more information on defining configuration options.
          - All required APIs should be included in `deploy.yaml`.
  - **Package metadata**: Ensure `package.json` is updated with an app-specific `name`, `version`, and `author`.
  - **YAML configuration**: Review `deploy.yaml` and `app.config.yaml` for accurate app IDs, event configs, and scopes.
  - **Commerce product**: Define `commerce` as a required product in `app.config.yaml`. See [required products](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/distribution#required-products) for more information.

      ```yaml
      productDependencies:
        - code: COMMC
          minVersion: 2.4.5
      ```

  - **Events configuration**: Review [`events.config.yaml`](/starter-kit/checkout/configure/#eventsconfigyaml) to verify event providers and registrations, document usage, and prefix events with your app's scope to avoid collisions. Remove this file if your app does not use events.
  - **Admin UI SDK configuration**: If an app implements the Admin UI SDK, please make sure requirements in the [Admin UI SDK review checklist](https://developer.adobe.com/commerce/extensibility/admin-ui-sdk/app-review-checklist/) are met.
  - **API Mesh configuration**: For non-downloadable apps, having an automatically-created mesh that is configured for an app builder action deployed within the same environment is not currently supported. If this is needed by an app, we recommend adding a `mesh.json` example in the documentation or in a public repo and providing instructions for setting up the mesh after the auto-generated environment is created.

- Project cleanup
  - **Unused folders**: Remove any unused or unnecessary folders.
  - **Adobe compliance files**: Do not include any Adobe compliance files, such as `CODE_OF_CONDUCT` or `COPYRIGHT`, that you copied from a starter kit.
  - **Multi-environment support**: Provide out-of-the-box support for SaaS and PaaS deployments by using configuration or different initialization scripts.

### Code review

- Code quality
  - **`state` usage**: Avoid inappropriate use of `state`. For example, when log forwarding instead of using `state`, use more modern solutions such as App Builder's [log forwarding](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/application_logging/logging#forwarding-application-logs) feature.
  - **Hardcoded values**: Look for hardcoded values that should be configurable

- Commerce compatibility
  - **Multi-flavor support**: Ensure compatibility between commerce flavors (PaaS & SaaS):
    - &#8203;<Edition name="saas" /> Use [IMS](/starter-kit/checkout/connect/#adobe-identity-management-service-ims) for authentication instead of [Commerce integrations (OAuth1)](/starter-kit/checkout/connect/#create-a-commerce-integration).
  - For detailed guidelines on supporting both SaaS and PaaS, see [Extension Compatibility](./extension-compatibility.md).

- Quality assurance
  - **Test suite**: Ensure tests all tests are passing. Run `npm test` to validate.

### Dependency management

- Version management
  - **Direct dependencies**: Check for missing dependencies using `npx npm-check` (`PKG ERR` label).
  - **SDK migration**: Fully migrate Admin UI SDK 1.x extension points to 3.x if applicable.
  - **Node.js version**: Use an actively supported version of Node.js to ensure you get the latest security updates. Adobe recommends the latest [long-term support (LTS) version](https://nodejs.org/en/about/previous-releases).

## Best practices

The following best practices are not required for your app to be accepted, but they are recommended to improve the quality of your app and its integration with Adobe Commerce.

### Project enhancement

- Tracking and monitoring
  - **Starter kit info**: Include the [`starter-kit-info`](https://github.com/adobe/commerce-integration-starter-kit/blob/main/actions/starter-kit-info/index.js) runtime action for deployment tracking.
  - **Feature utilization**: Leverage new starter kit features where applicable.
    - [Integration starter kit](https://developer.adobe.com/commerce/extensibility/starter-kit/integration/)
    - [Checkout starter kit](https://developer.adobe.com/commerce/extensibility/starter-kit/checkout/)

- Script management
  - **Script validation**: Execute everything in `package.json` scripts section and ensure there are no errors.
  - **Script cleanup**: Ensure there are no unused or non-working scripts.

### Runtime and testing

- Functional testing
  - **Deployment testing**: Deploy the project and conduct minimal functional testing.
  - **End-to-end validation**: Verify all major functionality works as documented.

To facilitate proper testing during review, ensure you provide:

- Clear installation and setup instructions
- Required environment configurations
- Test credentials or demo environments (if applicable)
- Documentation of any third-party service dependencies

<InlineAlert variant="help" slots="header, text1, text2, text3" />

Alternative options

In cases where it is not possible to provide test credentials or a demo environment, such as when access restrictions or security concerns apply, consider the following options:

**Option 1**: Coordinate a live demo with the Adobe review team

**Option 2**: Submit a recorded video demonstrating the app's functionality to the Adobe review team

### Code review

- Code cleanup
  - **Development artifacts**: Remove `TODO` comments and unused scripts or handlers.
  - **Test scripts**: Add or remove test scripts in `package.json` based on actual test coverage.
  - **Development logs**: Remove unused development logs and console outputs.
  - **Handler cleanup**: Clean up any unused handlers or unused code, such as empty `preProcess` or `transformData` functions.

- Code quality
  - **Action consistency**: Ensure consistency and correctness in action names and routes.
  - **Duplicated logic**: Avoid duplicating SDK logic unnecessarily, such as OAuth or fetch wrappers.

- Configuration best practices
  - **Package-level inputs**: Use package-level inputs in YAML files instead of repeating environment variables.
  - **Environment variables**: Avoid structured data in environment variables, unless necessary.

### Dependency management

- Version management
  - **Package updates**: Check for up-to-date package versions using `npx npm-check` (`MAJOR UP` label).
  - **Unused dependency check**: Check for unused dependencies using `npx npm-check` (`NOTUSED?` label).

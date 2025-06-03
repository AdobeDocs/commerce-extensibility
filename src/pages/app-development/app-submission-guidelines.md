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

### Documentation

- Installation guide clarity
  - **Prerequisites**: Add clear prerequisites (example: Admin UI SDK must be enabled).
  - **Version requirements**: Indicate the required module versions (example: Admin UI SDK minimum version `3.0.0`).
  - **Developer documentation**: Include links to relevant Adobe developer documentation (example: App Builder [getting started guide](https://developer.adobe.com/app-builder/docs/get_started/)).
  - **Environment setup**: Provide a `.env.dist` file with all required environment variables, clearly labeled with guidance.
  - **PaaS support**: Documentation must include installation steps for PaaS merchants. This means if you are submitting an app for Adobe Commerce as a Cloud Service (SaaS), you also need to support Adobe Commerce on cloud infrastructure (PaaS) and Adobe Commerce on-premises (on-prem).

- Security awareness
  - **Screenshot security**: Ensure no screenshots contain access tokens, secrets, or API keys.
  - **Sensitive data**: Do not expose credentials or sensitive information in the documentation.

- `README` content quality
  - **Project-specific language**: Use project-specific language. Avoid generic references to "Adobe", "Magento" or "starter kit".
  - **Configuration details**: Clearly list the app configuration and any third-party service-specific setup steps.
  - **Usage instructions**: Add instructions on how to use the app post-installation.
  - **Professional writing**: Remove any placeholder content and fix any typos.

### Security

- Authentication and authorization
  - **Action security**: All runtime actions must use `require-adobe-auth: true` in the action configuration.
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

- Vulnerability assessment
  - **Security audit**: Run `npm audit` to ensure there are no `critical` or `high` vulnerabilities.
  - **Dependency check**: Review all dependencies for known security issues.

### Project structure

- Configuration files
  - **Environment variables**: Provide a clear `.env.dist` file containing all needed keys. Remove any unused keys.
  - **YAML configuration**: Review `deploy.yaml` and `app.config.yaml` for accurate app IDs, event configs, and scopes.
  - **Commerce product**: Define `commerce` as a required product in `app.config.yaml`. See [required products](https://developer.adobe.com/commerce/extensibility/app-development/required-products/) for more information.
  - **Package metadata**: Ensure `package.json` is updated with an app-specific `name`, `version`, and `author`.

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
    - &#8203;<Edition name="saas" /> IMS Auth instead of OAuth1
    - &#8203;<Edition name="saas" /> Base URL with tenantId and without "rest"
  - **Action scoping**: All runtime actions must be scoped and documented, if they are exposed as webhooks.

### Dependencies

- Dependency management
  - **Unused dependencies**: Remove any unused dependencies reported by `npx npm-check`.
  - **Direct dependencies**: Ensure all direct dependencies are declared in `package.json`.
  - **Version updates**: Update major versions of critical packages.

### Cleanup and quality assurance

- Code cleanup
  - **Test suite**: Ensure tests all tests are passing. Run `npm test` to validate.

### Configuration

- Configuration best practices
  - **Input validation**: Ensure that all inputs in YAML files are defined as variables in the `.env.dist` file.
  - **Commerce product**: Define `commerce` as a required product in `app.config.yaml`. See [required products](https://developer.adobe.com/commerce/extensibility/app-development/required-products/) for more information.

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

### Cleanup and quality assurance

- Code cleanup
  - **Development artifacts**: Remove `TODO` comments and unused scripts or handlers.
  - **Test scripts**: Add or remove test scripts in `package.json` based on actual test coverage.
  - **Development logs**: Remove unused development logs and console outputs.

### Code review

- Code quality
  - **Unused imports**: Remove any unused `imports` and validate with `npx npm-check`.
  - **Action consistency**: Ensure consistency and correctness in action names and routes.
  - **SDK migration**: Fully migrate Admin UI SDK 1.x extension points to 3.x if applicable.
  - **Hardcoded values**: Look for hardcoded values that should be configurable
  - **Duplicated logic**: Avoid duplicating SDK logic unnecessarily, such as OAuth or fetch wrappers.
  - **Action scoping**: All runtime actions must be scoped and documented, if they are exposed as webhooks.

### Dependencies and maintenance

- Version management
  - **Package updates**: Check for up-to-date package versions using `npx npm-check` (`MAJOR UP` label).
  - **Unused dependency check**: Check for unused dependencies using `npx npm-check` (`NOTUSED?` label).

- Code optimization
  - **Handler cleanup**: Clean up any unused handlers or unused code, such as empty `preProcess` or `transformData` functions.
  - **Development cleanup**: Remove any unused logs that were during development.
  - **SDK logic**: Avoid duplicating SDK logic unnecessarily, such as OAuth or fetch wrappers.

### Configuration

- Configuration best practices
  - **Package-level inputs**: Use package-level inputs in YAML files instead of repeating environment variables.
  - **Environment variables**: Avoid structured data in environment variables, unless necessary.

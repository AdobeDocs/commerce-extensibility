---
title: App development lifecycle
description: Learn about the complete lifecycle for building, distributing, and managing App Builder apps that extend Adobe Commerce.
keywords:
  - App Builder
  - Extensibility
  - Lifecycle
  - Getting Started
---

# App development lifecycle

This guide provides a roadmap for creating App Builder applications that extend Adobe Commerce. Whether you're building an integration for your own business or developing an app for the Adobe Exchange marketplace, understanding the complete lifecycle helps you plan your project and navigate the documentation.

## Lifecycle overview

Building an App Builder app for Commerce involves five main phases:

| Phase | Description | Key activities |
|-------|-------------|----------------|
| **Plan** | Define requirements and set up your environment | Identify use case, configure App Builder workspace, connect to Commerce |
| **Build** | Develop your application using Adobe's extensibility tools | Choose architecture, write code, integrate with Commerce |
| **Submit** | Prepare your app and submit for review | Documentation, security requirements, submission package |
| **Distribute** | Pass review and publish to Adobe Exchange | Address feedback, receive approval, publish listing |
| **Operate** | Install, configure, and monitor apps in production | Associate with Commerce instances, configure settings, monitor health |

## Phase 1: Plan your app

Before writing code, define your requirements and prepare your development environment.

### Define your requirements

Identify what your app needs to accomplish:

- What Commerce activities should trigger your app? (orders, customers, products, inventory)
- Does your app need to validate or modify data synchronously, or can it react asynchronously?
- Will merchants need to configure your app through the Admin interface?
- What external systems will your app integrate with?

### Choose your approach

Based on your requirements, determine which capabilities you'll need:

| If you need to... | Use |
|-------------------|-----|
| React to Commerce events without blocking operations | [Events](../events/index.md) |
| Validate or modify data before Commerce continues | [Webhooks](../webhooks/index.md) |
| Add configuration or management pages to the Admin | [Admin UI SDK](../admin-ui-sdk/index.md) |
| Combine multiple APIs into a single endpoint | [API Mesh](https://developer.adobe.com/graphql-mesh-gateway/) |

### Set up your environment

Prepare the foundation for development:

1. **Get App Builder access** - Request access through your Adobe organization or obtain a trial license
2. **Configure Adobe Developer Console** - Create a project and workspace for your app
3. **Connect to Commerce** - Establish the connection between your App Builder workspace and Commerce instance
4. **Choose a starter kit** - If your use case aligns with common patterns, start with the [Integration](../starter-kit/integration/index.md) or [Checkout](../starter-kit/checkout/index.md) starter kit

The [learning path](../get-started/learning-path.md) provides detailed guidance for each setup step.

## Phase 2: Build your app

With your environment ready, develop your application.

### Choose your starting point

<DiscoverBlock slots="link, text"/>

[Integration starter kit](../starter-kit/integration/index.md)

Best for connecting Commerce to back-office systems like ERP, PIM, OMS, or CRM. Includes pre-built data flows for customers, orders, products, inventory, and shipments.

<DiscoverBlock slots="link, text"/>

[Checkout starter kit](../starter-kit/checkout/index.md)

Best for customizing checkout experiences with custom payment, shipping, or tax integrations.

<DiscoverBlock slots="link, text"/>

[Build from scratch](../get-started/learning-path.md)

Best for unique requirements not covered by starter kits. Start with the learning path to understand the full App Builder ecosystem.

### Core extensibility capabilities

Your app can leverage one or more of these capabilities:

| Capability | Use when | Learn more |
|------------|----------|------------|
| **Events** | You need to react to Commerce activities asynchronously (order placed, customer created, product updated) | [Events overview](../events/index.md) |
| **Webhooks** | Commerce must wait for a synchronous response before continuing (validate stock, calculate tax, authorize payment) | [Webhooks overview](../webhooks/index.md) |
| **Admin UI SDK** | You need to add custom pages, menus, or mass actions to the Commerce Admin | [Admin UI SDK overview](../admin-ui-sdk/index.md) |
| **API Mesh** | You need to combine multiple APIs into a single GraphQL endpoint | [API Mesh documentation](https://developer.adobe.com/graphql-mesh-gateway/) |

<InlineAlert variant="info" slots="text"/>

Many apps combine multiple capabilities. For example, an order management integration might use Events to receive order notifications, Webhooks to validate inventory during checkout, and the Admin UI SDK to provide a management interface.

### Events vs Webhooks: Which should I use?

| Scenario | Recommended | Why |
|----------|-------------|-----|
| Notify external system when an order is placed | **Events** | External system doesn't need to respond immediately |
| Validate product stock before adding to cart | **Webhooks** | Commerce must wait for the validation result |
| Sync customer data to CRM | **Events** | Sync can happen asynchronously |
| Calculate custom shipping rates at checkout | **Webhooks** | Rates must be returned before checkout continues |
| Send order to fulfillment system | **Events** | Fulfillment processing is asynchronous |
| Validate discount code with external promotion engine | **Webhooks** | Validation result affects the current transaction |

### Development best practices

As you build, follow these practices to ensure a smooth path to production:

- [Credentials management](./best-practices/credentials.md) - Securely handle API keys, tokens, and secrets
- [Logging and troubleshooting](./best-practices/logging-troubleshooting.md) - Implement effective logging for debugging
- [Database storage](./best-practices/database-storage.md) - Choose appropriate storage solutions for your app data

## Phase 3: Submit your app

If you're building an app for the Adobe Exchange marketplace, prepare and submit it for review.

### Submission checklist

Before submitting, ensure your app meets all requirements:

**Documentation requirements**

- [ ] Clear installation instructions for both PaaS and SaaS environments
- [ ] Configuration details for all environment variables
- [ ] Usage instructions explaining how to use the app post-installation
- [ ] Prerequisites listed (Admin UI SDK version, module dependencies)

**Security requirements**

- [ ] All runtime actions use `require-adobe-auth: true`
- [ ] No hardcoded secrets in code or configuration
- [ ] Webhooks protected by [signature verification](../webhooks/signature-verification.md)
- [ ] No critical or high vulnerabilities (`npm audit` passes)
- [ ] Repository is private if hosted on GitHub

**Project structure requirements**

- [ ] Updated `package.json` with app-specific name, version, and author
- [ ] Proper `app.config.yaml` configuration
- [ ] Commerce defined as a required product dependency
- [ ] Clean `.env.dist` file with all required variables
- [ ] Unused folders and files removed

**Testing requirements**

- [ ] All tests pass (`npm test`)
- [ ] Events are received and processed correctly
- [ ] Webhooks respond with proper format and timing
- [ ] Admin UI renders correctly
- [ ] Works on both PaaS and SaaS Commerce environments

<InlineAlert variant="warning" slots="text"/>

Apps must support both PaaS (Commerce on cloud infrastructure, on-premises) and SaaS (Commerce as a Cloud Service) deployments. See [Extension compatibility](./extension-compatibility.md) for guidance.

### Submit for review

1. Review the complete [App submission guidelines](./app-submission-guidelines.md)
2. Prepare your submission package following the [App Builder distribution documentation](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/distribution)
3. Submit through the Adobe Developer Console

### Downloadable vs non-downloadable apps

| Type | Description | User experience |
|------|-------------|-----------------|
| **Downloadable** | Users download source code and deploy to their own App Builder environment | Full access to customize and extend |
| **Non-downloadable** | App runs in an auto-generated environment managed by Adobe | Simplified installation, no code access |

Your submission requirements differ based on which type you choose. See the [submission guidelines](./app-submission-guidelines.md) for details.

## Phase 4: Distribute your app

After submission, your app goes through the review process before publication.

### Review process

The Adobe review team evaluates your submission against:

- **Documentation quality** - Clear, complete, and accurate
- **Security practices** - Proper authentication, no exposed secrets
- **Code structure** - Clean, maintainable, follows best practices
- **Functionality** - Works as documented across supported environments

### If your app is rejected

1. Review the specific feedback provided by the review team
2. Address all requirements listed in the rejection notice
3. Consider implementing suggested best practices
4. Resubmit your updated app

### Upon approval

Once approved, your app is published to [Adobe Exchange](https://exchange.adobe.com/) where merchants can discover and install it.

## Phase 5: Operate your app

Once distributed, apps need to be installed, configured, and monitored in production environments.

### Install and configure

<InlineAlert variant="warning" slots="text"/>

App Management is currently in Beta and not yet accessible to all customers.

[App Management](../app-management/index.md) provides a unified experience for installing and configuring App Builder apps in Commerce:

**For app developers:**

1. [Define app metadata](../app-management/app-metadata.md) - Specify your app's identity and capabilities
2. [Create configuration schema](../app-management/configuration-schema.md) - Define the settings merchants can configure
3. [Configure runtime actions](../app-management/runtime-actions.md) - Set up the actions that power your app

**For merchants and administrators:**

1. [Associate apps](../app-management/associate-apps.md) - Connect deployed apps to your Commerce instance
2. Configure settings through the auto-generated Admin UI
3. Manage app lifecycle (enable, disable, unassociate)

### Monitor and maintain

Keep your app running smoothly in production:

- [Observability overview](../observability/index.md) - Set up monitoring and alerting
- [App Builder log forwarding](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/application_logging/logging#forwarding-application-logs) - Stream logs to external systems
- [Configuration options](../observability/configuration.md) - Fine-tune observability settings

### Debugging tools

- [Events troubleshooting](../events/troubleshooting.md) - Debug event delivery and processing issues
- [App Builder logging](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/application_logging/) - Access runtime logs for your actions

## Quick reference: Documentation by task

| I want to... | Start here |
|--------------|------------|
| Get started with App Builder | [Learning path](../get-started/learning-path.md) |
| Set up my development environment | [App Builder getting started](https://developer.adobe.com/app-builder/docs/getting_started/) |
| Integrate with an ERP/OMS/PIM | [Integration starter kit](../starter-kit/integration/index.md) |
| Add custom payment/shipping/tax | [Checkout starter kit](../starter-kit/checkout/index.md) |
| React to Commerce events | [Events overview](../events/index.md) |
| Intercept and modify Commerce behavior | [Webhooks overview](../webhooks/index.md) |
| Add pages to the Admin | [Admin UI SDK overview](../admin-ui-sdk/index.md) |
| Submit my app to Adobe Exchange | [App submission guidelines](./app-submission-guidelines.md) |
| Install an app in Commerce | [Associate and configure apps](../app-management/associate-apps.md) |
| Monitor my app in production | [Observability overview](../observability/index.md) |
| Debug event delivery issues | [Events troubleshooting](../events/troubleshooting.md) |

## Related topics

- [Extensibility approaches](../get-started/index.md) - Understand in-process, out-of-process, and hybrid development
- [Extensibility examples](../get-started/examples.md) - See how App Builder, API Mesh, and Events work together
- [Learning path](../get-started/learning-path.md) - Curated tutorials and videos for App Builder

---
title: Commerce Developer Agent
description: Learn what the Commerce Developer Agent can and cannot do, including supported entry points, code generation, and known limitations.
keywords:
  - Developer Agent
  - Capabilities
  - Limitations
---

# Commerce Developer Agent

The Commerce Developer Agent allows you to migrate existing application, extension, and module code to App Builder, or to create new development from scratch. The agent is designed to help you plan and execute your development work in a structured and efficient way.

This page defines what the Commerce Developer Agent can and cannot do. It is intended to set accurate expectations and help you plan your use of the Commerce Developer Agent. The capabilities will continue to expand and improve over time, and this page will be updated accordingly.

## Access the Commerce Developer Agent

Launch the Commerce Developer Agent directly at the following URL:

`https://experience.adobe.com/#/@<your-ims-org-name>/commerce-migration-assessment/developer-agent`

Replace `<your-ims-org-name>` with your own IMS organization ID.

For step-by-step access instructions and entry points, see [Getting started](getting-started.md).

## Capabilities

* A structured **Blueprint** that allows you to iterate through a phased migration and review the architecture plans, allowing you as a developer to review and approve before execution.
* Generated code artifacts based on the Adobe Developer App Builder scaffolded extensions designed for Adobe Commerce and supported workflow outputs based on the approved Blueprint.

## Current limitations

* Access to Adobe Experience Manager's Experience Modernization Agent. Content-specific Edge Delivery Service (EDS) use cases are not currently supported by the Commerce Developer Agent.
* API Mesh integrations
* Self-service provisioning or access requests
* Usage dashboards

## What to expect from generated code quality

The Commerce Developer Agent generates code grounded in Adobe Commerce documentation and extensibility patterns:

* Commerce Developer Agent runs validation checks on generated code or workspace output.
* Generated code is structured to follow App Builder best practices where applicable.
* **You must review all generated code before using it in a production environment.** The agent is a starting-point generator, not a fully autonomous developer.
* Complex custom business logic, especially payment processing and security-sensitive features, should receive extra scrutiny.

## FAQ

**Is the generated code production-ready?**

Commerce Developer Agent runs validation checks on generated code or workspace output, but the results should still be reviewed, tested, and validated in your own development workflow before production use. Treat it as high-quality scaffolding, not a finished production implementation.

**What happens if the Commerce Developer Agent generates incorrect code?**

Use the Develop stage to correct it through follow-up prompts. If the generated code is fundamentally incorrect, start a new run with a more specific blueprint. Report significant quality issues through the [feedback channel](./support.md).

**Can I share a project with a colleague?**

Multi-user project sharing is not currently available. Each provisioned user only has access to their own projects.

**Why does my session sometimes feel slow?**

LLM inference latency varies. Blueprint generation and code generation involve multiple sequential model calls. Typical blueprint generation completes in under 60 seconds, while full code generation runs typically take up to 5 minutes depending on scope.

**What data does Adobe retain from my sessions?**

Session data, generated code, and usage telemetry are retained per [Adobe's privacy and data governance](https://www.adobe.com/privacy/policy.html) policies. Token usage is tracked for cost management. Contact your Adobe representative for data handling specifics.

## Capabilities reference

The following tables summarize the capabilities of the Commerce Developer Agent. The capabilities will continue to expand and improve over time, and this page will be updated accordingly.

### Blueprint generation

| Capability | Status | Notes |
| --- | --- | --- |
| Generate phased migration plan from module context | Supported | Includes risk flags, dependency mapping, phase breakdown. |
| Generate architecture blueprint for net-new projects | Supported | Based on project intake responses. |
| Conversational blueprint refinement | Supported | Multiple turns; each refinement creates a new blueprint version. |
| Blueprint version history | Supported | Prior blueprint versions are retained and viewable. |
| Explicit approval gate before execution | Required | No code generates without approval. |

### Code generation (App Builder)

| Capability | Status | Notes |
| --- | --- | --- |
| App Builder Commerce extension scaffolding | Supported | Commerce Developer Agent generates scaffolded App Builder Commerce extensions compatible with App Management. |
| Event-based extension mechanisms | Supported | Commerce Developer Agent can generate extensions that react to Adobe Commerce events. |
| Webhook-based extension mechanisms | Supported | Commerce Developer Agent can generate extensions that use Adobe Commerce webhooks where request interception or synchronous validation is appropriate. |
| Business configuration | Supported | Generated extensions can include merchant-configurable settings exposed through Commerce App Management. |
| Persistence | Supported | Generated extensions can include persistence patterns for extension-owned data where appropriate. |
| Generated code validation | Supported | Commerce Developer Agent runs validation checks on the generated code or workspace. |
| Artifact export | Supported | Users can download a ZIP file containing the extension code generated by Commerce Developer Agent. |
| Conversational code refinement | Supported | Users can request follow-up changes in the Develop stage. |

### Session and project management

| Capability | Status | Notes |
| --- | --- | --- |
| Project-scoped memory (LTM) | Supported | Decisions and context persist across sessions within a project. |
| Resumable execution runs | Supported | Runs can be paused and resumed. |
| Real-time execution progress | Supported | Real-time progress updates in the UI over the agent connection. |
| IMS authentication | Required | All sessions require a valid IMS token. |

## Limitations

The following limitations currently apply to the Commerce Developer Agent. Adobe continues to expand the agent's capabilities, and this page is updated as limitations are addressed.

### Deployment and integration

The following capabilities are not available:

* CI/CD pipeline integration
* Local environment setup (Docker, Composer config)

### Development limitations

The following limitations apply when developing net new or migration-based projects:

* API Mesh generation is not available.
* Multi-lane projects (App Builder + API Mesh + EDS simultaneously) are not supported.
* A local development environment setup is not generated. Commerce Developer Agent generates the project workspace, but users are responsible for local environment setup and dependency installation.
* Users are limited to a single generated project per session. Multi-project management dashboards will be available in a future release.
* Non-Adobe assessment formats are not supported as input.

### Access and administration

The following capabilities are not available:

* Self-service access requests
* Customer-facing usage dashboards
* Organization-level role-based access control hierarchies
* Non-Adobe identity provider federation (SAML/OIDC)

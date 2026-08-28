---
title: Getting started
description: Learn how to access and begin using the Commerce Developer Agent for the first time, including IMS login, interface overview, and your first session.
keywords:
  - Developer Agent
  - Getting Started
  - App Builder
---

# Getting started

This guide provides everything you need to access and start using the Commerce Developer Agent for the first time.

## Prerequisites

To access the developer agent, you must have access to the following:

* An Adobe Commerce entitlement. The Commerce Developer Agent is available to Adobe Commerce customers only.
* Adobe Developer App Builder access. App Builder access is required to use the Commerce Developer Agent.
* An active Adobe IMS identity (Adobe ID or Federated ID) associated with your organization

## Use cases

There are two main ways to start a Commerce Developer Agent session, one for new development and one for migration related development:

* [Net-new development](./new-development.md) — for creating new development not based on any previous Adobe Commerce code.
* [From a Migration Assessment](./assessment-development.md) — for migrating existing Adobe Commerce modules, plugins, or customizations based on a completed [Migration Assessment](https://experienceleague.adobe.com/en/docs/commerce/cloud-service/migration/migration-tools/assessment).

## Access the Commerce Developer Agent

Accessing the developer agent differs depending on your use case:

#### Net-new development

1. Navigate directly to the [Commerce Developer Agent home screen](https://experience.adobe.com/commerce-migration-assessment/developer-agent).
1. Sign in with your Adobe IMS credentials when prompted.
1. After successful authentication, you land on the Commerce Developer Agent home screen.

For more information on starting a net-new project, see [Net-new development](new-development.md).

#### Migration development

1. Navigate to the [Migration Assessment list](https://experience.adobe.com/commerce-migration-assessment/shared-assessments).
1. Select a completed assessment and navigate to the **Module Reports** section.
1. Select a report and click **Open in Developer Agent**. You are redirected to the Commerce Developer Agent home screen with the assessment context pre-loaded.

For more information on starting a project from a migration assessment, see [Migration assessment development](assessment-development.md).

## Understand the interface

The Commerce Developer Agent workspace is organized into tabs or stages that correspond to a development lifecycle:

* **Blueprint** — View and refine proposed architecture and implementation plans.
* **Develop** — Generate and refine the project workspace from the approved blueprint.
* **Integrations** — Configure external connections, such as GitHub or App Builder.
* **Deployments** — Initiate App Builder deployment actions.

The **Blueprint** and **Develop** sections should function without much setup, however some **Integrations** and **Deployments** capabilities might require additional setup.

## Understand how the agent works

Before diving in, it helps to understand the Commerce Developer Agent's mental model.

The agent operates in two distinct modes:

* **Planning** — When you describe what you want, the agent interprets your intent and proposes a blueprint, which is a structured, versioned architecture plan. This phase is conversational and iterative. You can refine the blueprint through natural language prompts before approving it.
* **Execution** — Once you explicitly approve a blueprint, the developer agent generates or updates the project workspace from the approved plan. No code is generated without your explicit approval of the blueprint.

The developer agent features to consider when planning your workflow:

* **Memory persists across sessions** — the agent remembers decisions and generated content within your project. If you return to a project, prior context carries forward.
* **The project is the source of truth** — all blueprints, runs, and artifacts live under a project. A new chat thread within the same project is not a fresh start.
* **Execution can be paused and resumed** — if you need to step away mid-execution, the run can be paused and picked up later.

## View your usage

The **Usage** tab displays the percentage of your org's capacity that has been used. Currently, the allocated capacity is provided at no additional charge. Expanded usage details and pricing information will be available at a later date.

### Request additional capacity

If you need additional capacity, contact your Adobe Commerce representative. An administrator can also raise your organization's limit in the Adobe Admin Console.

## Next steps

* Start developing:
  * [Net-new development](./new-development.md)
  * [Migration assessment development](./assessment-development.md)
* [Prompting tips](prompting.md)
* [Understanding limitations](index.md).
* [Reporting issues](support.md).

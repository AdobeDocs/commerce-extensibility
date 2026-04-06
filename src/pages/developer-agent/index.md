---
title: AI developer tools for Commerce extensibility
description: Overview of Adobe-provided AI coding tools, agent skills, and MCP servers for Adobe Commerce and App Builder development.
keywords:
  - App Builder
  - Cloud
  - Extensibility
  - Tools
---

# AI developer tools for Commerce extensibility

Adobe provides AI developer tooling so you can build and maintain Adobe Developer App Builder applications for Adobe Commerce with less friction. The same stack supports teams who are migrating from in-process PHP extensions to out-of-process apps and teams who are starting new integrations from the starter kits.

This section documents the current tooling and is structured so additional guides (for new agents, skills, or workflows) can be added alongside these pages.

## Who this is for

- Developers using Adobe Commerce as a Cloud Service (and related SaaS offerings) who want guided, Commerce-aware assistance in the IDE.
- Teams standardizing on agent skills and MCP (Model Context Protocol) integrations for documentation and App Builder workflows.

## What you get

| Capability | Description |
| --- | --- |
| Agent skills | Commerce- and App Builder–specific skills that guide architecture, implementation, DevOps, requirements, docs, testing, and learning workflows. |
| Adobe Commerce App Builder MCP server | IDE integration for Commerce development tasks, documentation-aware assistance, and tooling aligned with App Builder application development patterns. |

Together, these improve workflow integration, context-aware generation, and repeatable development and deployment steps.

## Guides in this section

| Guide | Description |
| --- | --- |
| [Coding tools setup](./coding-tools.md) | Prerequisites, installation with `aio commerce extensibility tools-setup`, post-install CLI auth, and IDE configuration (for example Cursor and GitHub Copilot). |
| [Use cases](./use-cases.md) | Common extension patterns — REST APIs, checkout extensions, storefront components, event-driven integrations, and more. |
| [Skills, prompts, and commands](./skills-and-prompts.md) | Slash commands, sample prompts, and the `/search-commerce-docs` command. |
| [Best practices](./best-practices.md) | Planning mode, session checklists, workflow and protocol, MCP vs CLI, testing, deployment, monitoring, anti-patterns, and feedback. |

## Related resources

- [Create an integration](../starter-kit/integration/create-integration.md) — Integration starter kit
- [Checkout starter kit](../starter-kit/checkout/) — Checkout and payments
- [Project setup](../events/project-setup.md) — App Builder project and events
- [App Builder sample applications](https://developer.adobe.com/app-builder/docs/resources/sample_apps)

## Updating the tools

After the initial [installation](./coding-tools.md#installation), update to the latest version from your project or tooling directory:

```bash
aio commerce extensibility tools-setup
```

See [Coding tools setup](./coding-tools.md#updating-to-the-latest-version) for details.

---
title: Skills, prompts, and commands for AI Commerce tooling
description: Slash commands, sample prompts, and documentation search for Adobe Commerce AI coding tools and App Builder development.
keywords:
  - App Builder
  - Extensibility
  - Starter Kit
  - Tools
---

# Skills, prompts, and commands

This page describes sample prompts, the `/search-commerce-docs` command, and skill slash commands used with the Commerce AI extensibility tooling. For installation and IDE setup, see [Coding tools setup](coding-tools.md). For workflow guidance, see [Best practices](best-practices.md).

## Sample prompts

### Integration starter kit — ERP order notification

Example prompt using the integration starter kit to send notifications when an order is placed:

```shell
Implement an Adobe Commerce SaaS application that will send an ERP notification when a customer places an order. The ERP notification must be sent as a POST HTTP call to <ERP URL> with the following details in the request JSON body:

Order ID -> orderID
Order Total -> total
Customer Email ID -> emailID
Payment Type -> pType
```

### Checkout starter kit — custom shipping

Example prompt using the checkout starter kit for custom shipping methods:

```shell
Implement an Adobe Commerce SaaS application that provides custom shipping methods.
The extension should:
1. Return shipping options based on the destination postal code
2. If postal code is in California, add an "Express California" option for $15
3. If postal code is outside US, add an "International Standard" option for $25
4. The carrier code should be "MYSHIP"
```

## Prompt commands — search documentation

In addition to natural-language prompting, you can use the `/search-commerce-docs` command to search documentation in conversations with your agent:

```shell
/search-commerce-docs "How do I subscribe to Commerce events?"
```

## Skills

Skills are invoked automatically when you chat with your coding agent. You can also invoke them manually with these commands:

| Command | Purpose |
| --- | --- |
| `/architect` | Designs architecture for Adobe Commerce extensions using App Builder and the selected starter kit. Use when planning integrations, selecting events, designing data flows, or making architectural decisions. |
| `/developer` | Implements Adobe Commerce extensions following App Builder patterns and file structure. Use when generating code, updating configuration files, or implementing runtime actions. |
| `/devops-engineer` | Deploys and operates App Builder extensions. Use when deploying applications, configuring environments, troubleshooting deployment, setting up CI/CD, or resolving onboarding errors. |
| `/product-manager` | Gathers and documents requirements for Adobe Commerce extensions. Use when starting a project, defining acceptance criteria, clarifying business objectives, or creating `REQUIREMENTS.md`. |
| `/technical-writer` | Creates comprehensive documentation for App Builder applications. Use when writing `README.md`, user guides, API documentation, changelogs, or ensuring documentation completeness. |
| `/tester` | Creates comprehensive tests for App Builder applications. Use when writing unit tests, integration tests, validating security, or ensuring code quality and coverage. |
| `/tutor` (experimental) | Teaches Adobe Commerce application development concepts with clear explanations and examples. Use when learning App Builder, understanding events, or needing guidance on development patterns. |

## Storefront skills

When you select the **AEM Boilerplate Commerce** starter kit during [setup](coding-tools.md#dropins-mcp-server-for-storefront-development), a separate set of skills is installed for storefront development. These skills route drop-in data queries (slots, events, containers, and API functions) to the `dropins` MCP server as the primary reference, and fallback to the TypeScript definitions in `node_modules/@dropins/` when the server is unavailable.

| Command | Purpose |
| --- | --- |
| `/project-manager` | Gathers storefront requirements, analyzes the current project state with `dropins:analyze_project`, and manages the phased development protocol. |
| `/researcher` | Looks up authoritative drop-in data for slots, events, containers, API functions, models, design tokens, and i18n keys before any implementation work. |
| `/dropin-developer` | Scaffolds blocks, slots, and checkout extensions wired to real drop-in containers, and then suggests slot implementations and event handlers. |
| `/block-developer` | Implements and modifies AEM blocks that consume drop-in containers, following the boilerplate's file structure and conventions. |
| `/content-modeler` | Models content structures and authoring patterns for AEM Universal Editor blocks. |
| `/tester` | Runs pre-test health checks (`dropins:check_config`, `dropins:check_block_health`, `dropins:get_upgrade_diff`) and validates storefront behavior in the browser. |

### `dropins` MCP tools

The storefront skills call the following `dropins` MCP tools directly. You can also invoke them yourself in a prompt.

| Need to know | MCP tool |
| --- | --- |
| Lists slot names and context shapes for a container | `dropins:list_slots` |
| Lists event names, payloads, producers, and consumers | `dropins:list_events` |
| Lists container names and their props | `dropins:list_containers` |
| Lists public API function signatures | `dropins:list_api_functions` |
| Lists shared model/type definitions, such as `CartModel` or `Price` | `dropins:list_models` |
| Lists CSS design tokens by category | `dropins:list_design_tokens` |
| Lists i18n dictionary keys and defaults | `dropins:list_i18n_keys` |
| Lists available GraphQL operations | `dropins:list_graphql_queries` |
| Explains event emitters, consumers, and sample code | `dropins:explain_event_flow` |
| Performs a keyword search across storefront docs | `dropins:search_docs` |
| Checks the block health and indicates any outdated container, slot, or API references | `dropins:check_block_health` |
| Validates the storefront configuration, including endpoints and environment settings | `dropins:check_config` |
| Performs a diff comparing drop-in version gaps and the registry | `dropins:get_upgrade_diff` |
| Analyzes installed drop-ins, block inventory, and version state | `dropins:analyze_project` |
| Scaffolds a block, slot, or checkout extension | `dropins:scaffold_block` / `dropins:scaffold_slot` / `dropins:scaffold_extension` |

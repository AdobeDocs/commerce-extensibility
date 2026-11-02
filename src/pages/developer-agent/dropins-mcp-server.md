---
title: Dropins AI Tools for storefront development
description: Install, configure, and update Dropins AI Tools for AEM Boilerplate Commerce storefront development.
keywords:
  - App Builder
  - Cloud
  - Extensibility
  - Tools
  - Storefront
  - AEM Boilerplate Commerce
---

# Dropins AI Tools for storefront development

If you select the `AEM Boilerplate Commerce` starter kit, the Commerce development MCPs and skills additionally install [Dropins AI Tools](https://www.npmjs.com/package/@dropins/ai-tools) (`@dropins/ai-tools`) and a set of storefront-specific agent skills, alongside the standard `commerce-extensibility` MCP server and App Builder skills. This applies whether you choose the starter kit through the [automated setup](coding-tools.md#automated-setup-recommended) (`app-setup`) or the [manual setup](coding-tools.md#manual-setup) (`tools-setup`) flow.

Dropins AI Tools provides structured, authoritative data about every drop-in component extracted directly from the drop-in source repositories. Agent skills use it as the primary reference for storefront customization tasks, and fallback to the TypeScript definitions in `node_modules/@dropins/` when it is unavailable.

Dropins AI Tools acts as an MCP server. When you select `AEM Boilerplate Commerce`, the setup process configures your coding agent to run it with `npx --yes @dropins/ai-tools`, under the `dropins` server key, so it starts automatically without prompting.

<InlineAlert variant="info" slots="text" />

The package is fetched the first time your agent starts the server, which can take a little longer than usual.

For the list of storefront skills and the `dropins` tools they use, see [Storefront skills](skills-and-prompts.md#storefront-skills).

## Updating Dropins AI Tools

The server checks npm on startup and prints a warning to `stderr` if a newer stable version is available. The update command varies based on your configuration:

* Configured with `npx` during setup (default):

  ```bash
  npx --yes @dropins/ai-tools@latest
  ```

* Installed globally - use this command if you also use the standalone `dropins-ai-tools` CLI:

  ```bash
  npm update -g @dropins/ai-tools
  ```

## Migrating from `@dropins/mcp`

Dropins AI Tools was previously published as `@dropins/mcp`, with a `dropins-mcp` binary. The following commands have changed:

| Before | After |
| --- | --- |
| `npx --yes @dropins/mcp` | `npx --yes @dropins/ai-tools` |
| `npm install -g @dropins/mcp` | `npm install -g @dropins/ai-tools` |
| `dropins-mcp check-health` | `dropins-ai-tools check-health` |

The configured server key remains as `dropins` and every tool keeps its `dropins:*` name, so existing prompts, skills, and agent rules are not impacted.

To migrate, rerun the [`tools-setup` command](./coding-tools.md#updating-to-the-latest-version) and accept the configuration change, or edit the `dropins` entry in your agent's MCP configuration manually.

`@dropins/mcp` remains published, so that existing configurations keep working. However, it stays at its last published version and receives no further updates.

---
title: dropins MCP server for storefront development
description: Install, configure, and update the dropins MCP server for AEM Boilerplate Commerce storefront development.
keywords:
  - App Builder
  - Cloud
  - Extensibility
  - Tools
  - Storefront
  - AEM Boilerplate Commerce
---

# `dropins` MCP server for storefront development

If you select the `AEM Boilerplate Commerce` starter kit, the AI coding tools additionally install the [`@dropins/mcp`](https://www.npmjs.com/package/@dropins/mcp) server and a set of storefront-specific agent skills, alongside the standard `commerce-extensibility` MCP server and App Builder skills. This applies whether you choose the starter kit through the [automated setup](coding-tools.md#automated-setup-recommended) (`app-setup`) or the [manual setup](coding-tools.md#manual-setup) (`tools-setup`) flow.

The `dropins` MCP server provides structured, authoritative data about every drop-in component extracted directly from the drop-in source repositories. Agent skills use this server as the primary reference for storefront customization tasks, and fallback to the TypeScript definitions in `node_modules/@dropins/` when the server is unavailable.

When you select `AEM Boilerplate Commerce`, the setup process:

* Installs `@dropins/mcp` globally (`npm install -g @dropins/mcp@latest`), so the latest version is available immediately.
* Configures your coding agent to run the server with `npx --yes @dropins/mcp`, so it starts automatically without prompting.

For the list of storefront skills and the `dropins` MCP tools they use, see [Storefront skills](skills-and-prompts.md#storefront-skills).

## Updating the `dropins` MCP server

The server checks npm on startup and prints a warning to `stderr` if a newer stable version is available. To update manually run the following command:

```bash
npm update -g @dropins/mcp
```

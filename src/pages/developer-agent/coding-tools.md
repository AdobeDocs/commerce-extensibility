---
title: AI coding tools setup for Commerce App Builder and storefront
description: Install and configure Adobe AI coding developer tooling for Commerce App Builder—prerequisites, Adobe I/O CLI, starter kits, and IDE setup.
keywords:
  - App Builder
  - Cloud
  - Extensibility
  - Tools
---

# AI coding tools setup for Commerce App Builder and storefront

When migrating to Adobe Commerce as a Cloud Service, you can use the AI coding tools to convert existing Adobe Commerce PHP extensions to Adobe Developer App Builder applications.

You can also use these tools to create completely new App Builder applications as well as storefront customizations.

The AI coding tools provide the following benefits:

* **Enhanced development workflow** — Integrated Adobe Commerce development tools.
* **AI-powered assistance** — Context-aware code generation and debugging.
* **Commerce-specific features** — Specialized tools for Adobe Commerce App Builder development.
* **Automated workflows** — Streamlined development and deployment processes.

By installing the AI coding tools, you get access to:

* Skills - An Adobe Commerce and App Builder specific skill set designed to guide and inform your application development.
* Developer MCP Server
* App Builder MCP Server

For skills, prompts, and best practices after setup, see [Skills, prompts, and commands](./skills-and-prompts.md) and [Best practices](./best-practices.md).

## Updating to the latest version

After [installing the AI coding developer tooling](#installation), update to the latest version by running:

```bash
aio commerce extensibility tools-setup
```

This updates the tools to the latest version.

## Prerequisites

* Any coding agent that supports [agent skills](https://agentskills.io/home#adoption), such as:

   * [Cursor](https://cursor.com/download)
   * [Claude Code](https://www.claude.com/product/claude-code)
   * [GitHub Copilot](https://github.com/features/copilot)
   * [Windsurf](https://windsurf.com)
   * [Gemini CLI](https://github.com/google-gemini/gemini-cli)
   * [OpenAI Codex](https://openai.com/index/introducing-codex/)
   * [Cline](https://cline.bot)

* [Node.js](https://nodejs.org/en/download): LTS version
* Package manager: [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
* [Git](https://github.com/git-guides/install-git): For repository cloning and version control

## Installation

1. Install the latest [Adobe I/O CLI](https://github.com/adobe/aio-cli) globally:

   ```bash
   npm install -g @adobe/aio-cli
   ```

1. Install the following plugins:

   * [Adobe I/O CLI Commerce](https://github.com/adobe-commerce/aio-cli-plugin-commerce)
   * [Adobe I/O CLI Runtime](https://github.com/adobe/aio-cli-plugin-runtime)
   * [App Builder CLI](https://github.com/adobe/aio-cli-plugin-app-dev)

   ```bash
   aio plugins:install https://github.com/adobe-commerce/aio-cli-plugin-commerce @adobe/aio-cli-plugin-app-dev @adobe/aio-cli-plugin-runtime
   ```

1. Clone one of the following:

   * Commerce [integration starter kit](../starter-kit/integration/create-integration.md) — for building back-office integrations.

      ```bash
      git clone git@github.com:adobe/commerce-integration-starter-kit.git
      ```

   * Commerce [checkout starter kit](../starter-kit/checkout/) for building or extending the checkout experience, including payments, shipping, and taxes.

      ```bash
      git clone git@github.com:adobe/commerce-checkout-starter-kit.git
      ```

1. Navigate to the starter kit directory that you cloned:

   ```bash
   cd commerce-integration-starter-kit
   ```

   ```bash
   cd commerce-checkout-starter-kit
   ```

1. Install the Commerce AI extensibility tools by running the interactive setup command:

   ```bash
   aio commerce extensibility tools-setup
   ```

   The setup process prompts you with configuration options. Follow the prompts to complete the installation. The tools are installed in the selected directory.

   * Select the starter kit you want to use for your project. This configures the tooling for your selected starter kit.

      ```shell
      ? Which starter kit would you like to use?
      ❯ Integration starter kit
         Checkout starter kit
      ```

   * Select your preferred coding agent. Over 40 coding agents are supported; if you do not see your preferred agent, use the `Other` option to install skills for any coding agent. Refer to your coding agent's documentation for how to configure skills.

      ```shell
      ? Which coding agent would you like to install skills for?
      ❯ Cursor
         Claude Code
         GitHub Copilot
         Windsurf
         Gemini CLI
         OpenAI Codex
         Cline
         ...
      ```

   * The installer detects NPM or Yarn when present. If neither is installed, you are prompted to choose a package manager. Adobe recommends using `npm` for consistency:

      ```shell
      ? Which package manager would you like to use?
      ❯ npm
         yarn
      ```

1. After a successful install, the process configures:

   * MCP server integration for Adobe Commerce development
   * [Agent skills](./skills-and-prompts.md#skills) for enhanced development experience
   * Commerce-specific development tools and workflows

   Skills and MCP tools are installed. If you do not see them, restart your coding agent.

<InlineAlert variant="info" slots="text" />

Before deploying your project, complete configuration tasks: log in to [Adobe Developer Console](https://developer.adobe.com/console) using the Adobe I/O CLI, create an App Builder project (see [Project setup](../events/project-setup.md)), and set up environment variables in an `.env` file. You can do these steps manually or use the AI coding tools for guidance. See [Create an integration](../starter-kit/integration/create-integration.md) for detailed configuration instructions.

## Post-installation configuration

### Log in to the Adobe I/O CLI

After installing the Adobe I/O CLI, log in whenever you want to use the MCP server.

```bash
aio auth login
```

To verify you are logged in:

```bash
aio where
```

If you encounter issues, try logging out and back in:

```bash
aio auth logout
aio auth login
```

<InlineAlert variant="info" slots="text" />

Some features of the MCP server will work without logging in, but the RAG (Retrieval-Augmented Generation) service will not work. The RAG service provides the AI coding agent with access to relevant parts of the Adobe Commerce documentation set, enabling it to answer questions and generate code based on current Commerce development practices, APIs, and architectural patterns.

### Cursor

1. Restart the Cursor IDE to load the new MCP tools and configuration.
1. Verify the installation by confirming that skills are present under the `.cursor/skills/` folder.
1. Enable the MCP server:

   * Open the Command Palette: **Cmd+Shift+P** (macOS) or **Ctrl+Shift+P** (Windows and Linux).
   * Run **View: Open MCP Settings**.
   * Find **commerce-extensibility MCP Server** in the list.
   * Turn the server **on** to enable the coding tools.

1. Verify server status. The Commerce extensibility MCP Server should look like:

   ```shell
   Status: Connected/Active
   Server: commerce-extensibility
   Configuration: Automatically configured via .cursor/mcp.json
   ```

1. Use a prompt to confirm the agent uses the MCP server. If it does not, ask the agent explicitly to use the available MCP tools.

   ```shell
   What are the differences between Adobe Commerce PaaS and Adobe Commerce as a Cloud Service when configuring a webhook that activates an App Builder runtime action?
   ```

### GitHub Copilot (VS Code)

1. Restart Visual Studio Code to load the new MCP tools and configuration.
1. Verify the installation by confirming that `copilot-instructions.md` exists in the `.github` folder.
1. Enable the MCP server:

   * Open the Extensions view (**Extensions** in the Activity Bar or **Cmd+Shift+X** / **Ctrl+Shift+X**).
   * Open **MCP SERVERS - INSTALLED**.
   * Use the gear icon next to **commerce-extensibility MCP Server** and select **Start Server** if the server is stopped.
   * Use the gear icon again and select **Show Output** to view logs.

1. Verify the server status. The `MCP:commerce-extensibility` output should match the following:

   ```shell
   2025-11-13 12:58:50.652 [info] Starting server commerce-extensibility
   2025-11-13 12:58:50.652 [info] Connection state: Starting
   2025-11-13 12:58:50.652 [info] Starting server from LocalProcess extension host
   2025-11-13 12:58:50.657 [info] Connection state: Starting
   2025-11-13 12:58:50.657 [info] Connection state: Running

   (...)

   2025-11-13 12:58:50.753 [info] Discovered 10 tools
   ```

1. Use the following prompt to see if the agent uses the MCP server. If it does not, ask the agent explicitly to use the MCP tools available.

   ```shell
   What are the differences between Adobe Commerce PaaS and Adobe Commerce as a Cloud Service when configuring a webhook that activates an App Builder runtime action?
   ```

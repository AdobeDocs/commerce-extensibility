---
title: Working with AI
description: Agent skills for building and migrating Adobe Commerce App Management apps with AI coding tools, and how to install them.
keywords:
  - App Builder
  - App Management
  - Extensibility
  - Tools
---

# Working with AI

Adobe publishes agent skills that guide AI coding tools through building and migrating App Management apps. These skills follow the open [agentskills.io](https://agentskills.io) standard, so they work with Claude Code, Cursor, VS Code Copilot, Gemini CLI, and other supported coding agents.

Two plugins are available in the [`adobe/skills`](https://github.com/adobe/skills) repository:

* **App Management** — scaffolds a new app and adds extensibility features to it, one at a time.
* **App Migration** — converts an existing Integration Starter Kit or Checkout Starter Kit project to the App Management approach.

## App Management skills

Use these skills when building a new App Builder application with App Management. Start with `commerce-app-init` to scaffold your app, then chain in any of the other skills to add the capabilities your app needs.

| Skill | What it does |
|-------|--------------|
| `commerce-app-init` | Scaffolds a new app with metadata only, ready for you to extend. |
| `commerce-app-eventing` | Adds Commerce and external event subscriptions so your app reacts to store activity. |
| `commerce-app-webhooks` | Adds webhooks that validate, enrich, or modify Commerce operations before or after they run. |
| `commerce-app-business-config` | Adds merchant-configurable settings that appear as fields in the Commerce Admin. |
| `commerce-app-storage` | Adds persistent, queryable storage backed by App Builder Database Storage. |
| `commerce-app-admin-ui` | Adds Admin UI extensions, such as grid columns, mass actions, order view buttons, and custom menu entries. |

### Installation

Install skills with the [`npx skills`](https://www.npmjs.com/package/skills) command, run from your project directory. You only need the skills for the capabilities you plan to use — for example, an app that only needs events and webhooks only requires `commerce-app-init`, `commerce-app-eventing`, and `commerce-app-webhooks`.

```bash
npx skills add adobe/skills --skill commerce-app-init
npx skills add adobe/skills --skill commerce-app-eventing
npx skills add adobe/skills --skill commerce-app-webhooks
npx skills add adobe/skills --skill commerce-app-business-config
npx skills add adobe/skills --skill commerce-app-storage
npx skills add adobe/skills --skill commerce-app-admin-ui
```

Restart your coding agent to load the new skills.

## App Migration skills

Use this skill when you already have an App Builder project built on the Integration Starter Kit, Checkout Starter Kit, or Admin UI SDK, and want to move it to App Management.

| Skill | What it does |
|-------|--------------|
| `commerce-app-migrate` | Analyzes your project, asks any clarifying questions it needs, and generates the App Management configuration for you. It also flags README and environment file content that is no longer needed after the move. |

### Installation

Install the skill with the [`npx skills`](https://www.npmjs.com/package/skills) command, run from your project directory.

```bash
npx skills add adobe/skills --skill commerce-app-migrate
```

Restart your coding agent to load the new skill.

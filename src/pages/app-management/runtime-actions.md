---
title: Runtime actions reference
description: Learn about the generated runtime actions and how to initialize the configuration library.
keywords:
  - App Builder
  - Extensibility
  - App Management
edition: beta
---

# Runtime actions reference

<InlineAlert variant="warning" slots="text" />

**Adobe Commerce App Management is for Beta users only and is not yet accessible to all customers.**

The App Management configuration library **automatically generates a set of runtime actions** based on your configuration schema. These auto-generated actions enable the App Management UI to configure your application without requiring you to write boilerplate code.

This page describes how to initialize the library and the runtime actions it generates.

## Initialize the configuration library

To enable App Management support in your application, run the initialization command:

```bash
npx @adobe/commerce-lib-config init
```

### What the init command does

The initialization command performs the following actions:

| Step | Description |
|------|-------------|
| 1. Create `extensibility.config.js` | Creates the central configuration file with a sample schema. Skips if the file already exists. |
| 2. Install dependencies | Adds `@adobe/commerce-lib-config` and `@adobe/commerce-sdk` as project dependencies. |
| 3. Add post-install script | Adds a script to `package.json` that regenerates runtime actions when dependencies are updated. |
| 4. Generate runtime actions | Creates the runtime actions in `src/commerce-configuration-1/`. |
| 5. Create `ext.config.yaml` | Declares the generated runtime actions for App Builder. |
| 6. Update `app.config.yaml` | Includes the new `ext.config.yaml` in your app configuration. |
| 7. Update `.env` | Adds placeholder environment variables required by the library. |
| 8. Validate schema | Runs schema validation to ensure your configuration is valid. |

## Generated files

After initialization, the following files are created in your project:

| File/Folder | Description |
|-------------|-------------|
| `extensibility.config.js` | Your configuration schema definition. See [Configuration schema reference](./configuration-schema.md). |
| `src/commerce-configuration-1/` | Folder containing generated runtime actions. |
| `src/commerce-configuration-1/schema.json` | JSON version of your schema, deployed with the runtime actions. |
| `ext.config.yaml` | Declares the generated runtime actions for the App Builder runtime. |

## Generated runtime actions

The library generates the following runtime actions in the `src/commerce-configuration-1/` folder. These actions power the auto-generated configuration UI in the Commerce Admin:

| Action | Description |
|--------|-------------|
| `get-schema` | Returns the configuration schema defined in `extensibility.config.js`. The App Management UI uses this schema to automatically generate the configuration form with the appropriate field types. |
| `get-config` | Retrieves the current configuration values for a specific scope. Returns default values if no configuration has been saved. |
| `save-config` | Saves configuration values for a specific scope. Handles scope inheritance and validation. |
| `delete-config` | Removes configuration values for a specific scope, reverting to inherited or default values. |
| `get-scopes` | Returns the list of available scopes (global, websites, stores, store views) for the application. |
| `sync-scopes` | Synchronizes Commerce scopes from the linked Commerce instance to the application. |
| `get-instance` | Returns the Commerce instance information (base URL) that the application is linked to. |

## Post-install regeneration

The initialization command adds a post-install script to your `package.json`:

```json
{
  "scripts": {
    "postinstall": "commerce-lib-config generate"
  }
}
```

This script automatically regenerates the runtime actions whenever you update the `@adobe/commerce-lib-config` library. This ensures your app always uses the latest action templates.

<InlineAlert variant="warning" slots="text"/>

Do not manually edit the files in `src/commerce-configuration-1/`. They are regenerated when the library is updated and your changes will be lost.

## The ext.config.yaml file

The `ext.config.yaml` file declares the generated runtime actions:

```yaml
operations:
  commerce-configuration:
    impl: commerce-configuration-1/index.js
    actions:
      get-schema:
        function: getSchema
      get-config:
        function: getConfig
      save-config:
        function: saveConfig
      delete-config:
        function: deleteConfig
      get-scopes:
        function: getScopes
      sync-scopes:
        function: syncScopes
      get-instance:
        function: getInstance
```

This file is automatically included in your `app.config.yaml` during initialization.

## Build and deploy

After configuring your schema and initializing the library, build and deploy your application:

```bash
aio app build
aio app deploy
```

The deployment includes:

- Your configuration schema (`schema.json`)
- The generated runtime actions
- Your application code

Once deployed, your app appears in the App Management UI and can be [associated with a Commerce instance](./associate-apps.md).

## Updating the library

When a new version of `@adobe/commerce-lib-config` is released:

1. Update the dependency:

   ```bash
   npm update @adobe/commerce-lib-config
   ```

1. The post-install script automatically regenerates the runtime actions.

1. Rebuild and redeploy your application:

   ```bash
   aio app build
   aio app deploy
   ```

## Troubleshooting

### Runtime actions not generated

If the `src/commerce-configuration-1/` folder is empty or missing:

1. Ensure `extensibility.config.js` exists and contains a valid schema.
2. Run the generate command manually:

   ```bash
   npx @adobe/commerce-lib-config generate
   ```

### Schema validation fails during build

If the build fails with schema validation errors:

1. Run the validation command to see detailed errors:

   ```bash
   npx @adobe/commerce-lib-config validate-schema
   ```

2. Fix the issues in `extensibility.config.js` and rebuild.

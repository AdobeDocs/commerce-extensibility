---
title: Troubleshooting
description: Resolve App Management permissions, local Commerce limits, schema validation, deployment, generated actions, and encryption key issues.
keywords:
  - App Builder
  - App Management
  - Extensibility
---

# Troubleshooting

Use the following solutions to resolve common issues with App Management.

## Cannot access App Management (permissions)

Only Admin users whose **role** includes the **App Management** resource can use App Management in the Adobe Commerce Admin. If **Apps** > **App Management** is missing or access is denied, the user’s role likely does not grant that permission.

1. Sign in as an Admin user who can edit roles.

1. Go to **System** > **User Roles** and open the role assigned to the user who needs access (or create or adjust a role for app managers).

1. Open the **Role Resources** tab. If you choose specific resources instead of **All**, set **Resource Access** to **Custom**.

1. In the tree, expand **Admin UI SDK** and select **App Management**.

![App Management selected under Admin UI SDK in Role Resources](../_images/app-management/app-management-role-resources.png)

1. Save the role and have the user sign out and back in if the menu does not update immediately.

For the full association and installation workflow, see [Manage your app](https://experienceleague.adobe.com/en/docs/commerce/app-management/manage-app/manage-app).

## Local Adobe Commerce instances

App Management is **not supported** for local Adobe Commerce development instances. Association, installation, and workflows in the Admin require an Adobe Commerce deployment that App Management can integrate with.

If you are developing against a local stack, plan to validate App Management behavior in a non-local environment.

## Configuration validation errors

`app.commerce.config` is validated against its schema every time the config is loaded. This happens during the `postinstall` and `pre-app-build` hooks, and whenever you run an `npx aio-commerce-lib-app generate …` command manually. If validation fails, check:

1. **Required properties**. Fields must have `name`, `label`, and `type`.

1. **Type-matched defaults**. Default values must match the field type.

1. **Valid metadata**. App metadata must include `id`, `displayName`, `description`, and `version`.

## App not appearing in App Management

1. Verify app is deployed:

  ```bash
  aio app get-url

  # Only if you don't see listed the `app-management` actions
  aio app deploy --force-build --force-deploy
  ```

1. Check runtime actions are generated in `.generated` folders.

1. Ensure your commerce app configuration is valid.

1. Verify correct organization in Developer Console.

### Runtime actions

Code generation is a mandatory step for App Management to work. The `pre-app-build` hook only regenerates the commerce app manifest (a snapshot of your config), and the configuration schema, so runtime actions must be generated manually with the following command (idempotent):

<CodeBlock slots="heading, code" repeat="4" languages="BASH, BASH, BASH, BASH" />

#### npm

```bash
npx aio-commerce-lib-app generate all
```

#### yarn

```bash
yarn exec aio-commerce-lib-app generate all
```

#### pnpm

```bash
pnpm exec aio-commerce-lib-app generate all
```

#### bun

```bash
bun x aio-commerce-lib-app generate all
```

## Encryption key errors

### Generate an encryption key

Ensure your encryption key is present in the `.env` by running the command below. It only creates a new key if one does not already exist.

<CodeBlock slots="heading, code" repeat="4" languages="BASH, BASH, BASH, BASH" />

#### npm

```bash
npx aio-commerce-lib-config encryption setup
```

#### yarn

```bash
yarn exec aio-commerce-lib-config encryption setup
```

#### pnpm

```bash
pnpm exec aio-commerce-lib-config encryption setup
```

#### bun

```bash
bun x aio-commerce-lib-config encryption setup
```

### Validate your encryption key configuration.

If it's already there, validate it has the expected format:

<CodeBlock slots="heading, code" repeat="4" languages="BASH, BASH, BASH, BASH" />

#### npm

```bash
npx aio-commerce-lib-config encryption validate
```

#### yarn

```bash
yarn exec aio-commerce-lib-config encryption validate
```

#### pnpm

```bash
pnpm exec aio-commerce-lib-config encryption validate
```

#### bun

```bash
bun x aio-commerce-lib-config encryption validate
```

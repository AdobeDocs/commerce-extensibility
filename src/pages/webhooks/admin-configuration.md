---
title: Admin configuration
description: Learn how to extend, override, and create hooks using the Admin.
keywords:
  - Extensibility
---

# Admin configuration

You can use the Commerce Admin to extend and override existing hooks defined in `webhooks.xml` files and to create new hooks. You can make webhook configuration changes without updating the source `webhooks.xml` files by filling out a form for editing hooks. In Cloud instances, you do not need to redeploy after making hook configuration changes through the Admin, provided that the plugin classes for any new hooks already exist.

Configuration changes made using the Commerce Admin will impact webhook execution and the output of the `webhooks:list` command.

## View registered hooks

In the Admin, select **System** > Webhooks > **Webhooks** to display the _Webhooks_ grid page.

![Webhooks grid](../_images/webhooks/webhooks-grid.png)

The rows of this grid show configuration settings for all registered hooks, both active and inactive.

## Create a new hook

Click **Add New Webhook** from the grid page to display the form for creating a new hook. If the plugin for the webhook method entered into the form has not been generated for the Commerce instance, a warning to run the `webhooks:generate:module` command will appear upon clicking **Save**.

<InlineAlert variant="warning" slots="text" />

On Cloud instances, due to the read-only file system, the `webhooks:generate:module` command cannot be run. If a plugin-type webhook is added through the Admin, the method name and type should be declared in a `webhooks.xml` file.

## Edit an existing hook

Click **Edit** in the **Action** column to modify an existing hook.

![Edit hook settings](../_images/webhooks/edit-hook-settings.png)

You can fully edit any hook that was originally defined in the Admin. However, hooks defined in a `webhooks.xml` file are only partially editable. For these hooks, you cannot change the value of the webhook method, webhook type, batch name, or hook name. You can use the **Active** toggle to override the value of the `remove` attribute for any hook defined in an XML file.

The **Hook fields**, **Hook Headers**, and **Hook Rules** form subsections can be used to edit or add hook fields, headers, and rules, respectively. For fields, headers, and rules defined in `webhooks.xml` files, the values of certain attributes cannot be changed through the form.

![Edit hook fields](../_images/webhooks/edit-hook-fields.png)

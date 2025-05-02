---
title: Eligible extensions configuration
description: Learn how to to configure eligible extensions for the Adobe Commerce Admin UI SDK.
keywords:
  - App Builder
  - Extensibility
---

# Eligible extensions configuration

The eligible extensions configuration allows you to select the extensions for a specific Commerce instance. Commerce loads all eligible extensions from the App Registry. An extension is considered eligible when the deployed workspace is published to the `commerce/backend-ui/1` extension point.

## Configuration

Navigate to **Stores** > Settings > **Configuration** > **Adobe Services** > **Admin UI SDK**. In the **General Configuration** section, click the **Configure extensions**` button.

![Admin UI SDK eligible extensions configuration](../_images/admin-ui-sdk/configuration/eligible-extensions.png)

1. Select the workspace of extensions you want to map to the Commerce instance. Click **Apply** to load the eligible extensions. Workspace choices are: **Stage**, **Production**, or **Custom**. If **Custom** is selected, be sure to provide the workspace name corresponding to the extension in App Builder. Only English alphanumeric and Latin alphabet characters are allowed.

1. Select the extensions you want to include in the Commerce instance.

1. Save the selection to have registrations correctly included in the Commerce Admin.

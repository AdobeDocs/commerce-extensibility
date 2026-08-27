---
title: Deploy and Install a Commerce Developer Agent App
description: Learn how to deploy an app from the Commerce Developer Agent, then associate, install, and configure it in Commerce App Management to make your app live.
keywords:
  - Developer Agent
  - Deployment
  - App Management
---

# Deploy and install your app

After you [configure integrations](integrations.md), you can deploy the generated app directly from the Commerce Developer Agent. Deployment is not the final step in this process, the app must also be associated and installed in Commerce App Management before it becomes active.

![develop tab](../images/developer-agent/develop.png)

## Prerequisites

* You have generated and validated code on the **Develop** stage.
* You have completed the [Integrations](integrations.md) configuration, including the App Builder workspace, Commerce connection, and any required environment variables.

## Deploy from the developer agent

To validate before you deploy, click **Run validation**. This runs `npm install` and `npm build` against the workspace.

1. Click **Deploy to App Builder** on the **Develop** tab.
1. Review the **Confirm deployment** message, which displays the target **Organization**, **Project**, **Workspace**, and **Runtime namespace**.
1. Confirm the deployment.
1. Review the logs on the **Deploy** tab.

The agent runs pre-deploy validation (`aio app build`) followed by deployment (`aio app deploy`), indicating the progress for each stage. If validation or deployment fails, the agent self-corrects the generated code and retries.

To undeploy, click **Undeploy workspace** at any time.

## Associate the app in App Management

After deploying, you must associate the app in App Management to make it available for installation.

1. Navigate to your Adobe Commerce as a Cloud Service instance Admin URL and sign in.
1. In the Admin, select **Apps** > **App Management**.
1. Click **Associate App**.
1. Select the **Project** and **Workspace** that the developer agent deployed to.

   App Management displays a card showing the application name, version, and the capabilities the application implements, such as **Business Configuration**, **Webhooks**, or **Events**.

1. Click **Associate**.

<InlineAlert variant="info" slots="text"/>

To update an app that is already associated with your Commerce project, you must **Unassociate** and then **Associate** it again in App Management.

## Install and configure the app

1. On the row for the application you associated, click **Install**.

   App Management displays a card showing the application name, description, and version, along with the extensibility features to be installed, such as events, webhooks and custom installations.

1. Click **Install**. When the installation completes, click **Close**.
1. On the application row, click **Configure** to fill in the business configuration values or any other information.

   The configuration form shows every field defined by the blueprint, prefilled with the defaults it specified.

1. Click **Close**.

Your app is now deployed, installed, and configured. Any events, webhooks, or business configuration defined by the blueprint are active on your Commerce instance.

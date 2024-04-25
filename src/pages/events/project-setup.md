---
title: Create an App Builder project
description: Create a project in the Adobe Developer Console, generate API credentials, and download the workspace configuration.
keywords:
  - Events
  - Extensibility
---

# Create an App Builder project

Adobe I/O Events for Adobe Commerce allows you to send and monitor custom Adobe Commerce user-driven events. Follow the instructions on this page to create and configure a project for Adobe I/O Events.

## Requirements

To get started with Adobe I/O Events, you must:

import ProjectRequirements from '/src/_includes/project-requirements.md'

<ProjectRequirements />

## Set up a project

[Projects Overview](https://developer.adobe.com/developer-console/docs/guides/projects/) describes the different types of projects and how to manage them. Here, we'll create a templated project.

1. Log in to the Adobe Developer Console and select the desired organization from the dropdown menu in the top-right corner.

1. Click **Create new project** > **Project from template**.

   ![Create a project](../_images/events/create-project.png)

1. Select **App Builder**. The **Set up templated project** page displays.

   ![Templated project](../_images/events/set-up-templated-project.png)

1. Specify a project title and app name. Make sure the **Include Runtime with each workspace** checkbox is selected. Click **Save**. The Console creates a workspace.

   ![New workspace](../_images/events/workspaces.png)

1. In your workspace, click the **Add service** pop-up menu and select **API**.

   ![Add an API to your workspace](../_images/events/stage-add-api.png)

1. On the **Add an API** page, filter on **Adobe Services** and select **I/O Management API**. Then click **Next**.

   ![Select IO events](../_images/events/add-io-management.png)

1. On the **Configure API** page, select the **OAuth Server-to-Server** option and click **Save configured API**.

   ![generate a key pair](../_images/events/setup-api-oauth.png)

   **Note**: You can set up server-to-server authentication using JSON Web Tokens (JWT). However, this method has been deprecated in favor of OAuth and must be replaced no later than January 1, 2025. See [Service Account (JWT) Authentication](https://developer.adobe.com/developer-console/docs/guides/authentication/JWT/) for details on implementing this solution.

1. On the front page of your workspace, click the **Add service** pop-up menu and select **API**.

   ![Generate a key pair](../_images/events/add-another-api.png)

1. On the **Add an API** page, filter by **Experience Cloud** and select **Adobe I/O Events for Adobe Commerce**. Then click **Next**.

1. On the **Configure API** page, click **Save configured API**.

1. If you are using JWT authentication, unzip the downloaded `config.zip` file. The extracted `config` directory should contain a `certificate_pub.crt` and a `private.key` file. The `private.key` file is required to configure the Commerce Admin.

## Download the workspace configuration file

The console can generate a JSON file that defines the configuration of your workspace. You will use this file to configure the Commerce Admin.

To download a `.json` file containing your workspace configuration:

1. Go to the overview page of your workspace.

1. Click the **Download All** button in the top-right corner.

   ![Download the workspace config](../_images/events/download-workspace-config.png)

   The `<Workspace-name>.json` file downloads automatically. In this example, the file is named `485PeachHare-283976-Stage.json`.

## Set up App Builder and define a runtime action

The first step to setting up your App Builder template is to set up your environment and create a runtime action. For details about this process, see [Setting up Your Environment](https://developer.adobe.com/runtime/docs/guides/getting-started/setup/) in the _Adobe IO Runtime Guide_ and [Create a templated project](https://developer.adobe.com/developer-console/docs/guides/projects/projects-template/) in the _Developer Console Guide_.

1. Create a project directory on your local filesystem and change to that directory.

   ```bash
   mkdir myproject && cd myproject
   ```

1. Log in to Adobe IO from a terminal:

   ```bash
   aio login
   ```

   Your web browser displays the login page.

1. Enter your Adobe ID credentials.

1. Close the browser tab and return to your terminal. Enter the following command to bootstrap your application:

   ```bash
   aio app init
   ```

   The terminal prompts you to select the path to your workspace.

   * Select your project's organization.

   * Select your project.

   * Select the  **DX Experience Cloud SPA v1** option.

   The command initializes a project with a default UI and creates a default Adobe I/O Runtime Action with an internal name of `dx-excshell-1/generic`. This action will be specified later when configuring your workspace to register events.

1. Launch App Builder by running the following command:

   ```bash
   aio app run
   ```

   The command displays the URL where you can access the default UI. Running the command enables the runtime action referenced in [Subscribe and register events](configure-commerce.md#subscribe-and-register-events).

You've completed the basic setup of your project. The next step is to install Adobe I/O Events for Adobe Commerce.

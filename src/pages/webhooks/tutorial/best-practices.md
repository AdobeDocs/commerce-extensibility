---
title: Development best practices
description: Considerations for building extensibility applications for Adobe Commerce.
keywords:
  - Extensibility
---

# Development best practices

This section provides best practices for developing extensibility applications in Adobe Commerce, focusing on webhooks and secure communication.

## Secure webhook communication using OAuth credentials

Since the webhook URL is easily accessible, it's important to secure it. The following steps outline recommended best practices for secure communication between App Builder and Adobe Commerce:

### Step 1: Generate OAuth credentials from Developer Console

1. Navigate to your project and select **Stage**.
1. On the left-hand menu, go to **Credentials** and click on **OAuth Server-to-Server**.
1. Here, you will find the Client ID and Organization ID. Click on **Retrieve Client Secret** and make a note of the client secret. This will only be displayed once. These credentials will be required in the next step when configuring the integration on the Commerce side.

### Step 2: Configure OAuth in Adobe Commerce

Log in to the Commerce Admin in Commerce Instance > Webhook Subscriptions and select the webhook you want to configure.
Expand the Developer Console OAuth section, enable it, and enter the required credentials: Client ID, Client Secret, and Organization ID.

![oAuth Section in Webhooks Subscription](../../_images/webhooks/tutorial/developer-console-oauth-commerce.png)

### Step 3: Enable Adobe Authentication in App Builder

1. In your App Builder project code, open the `app.config.yaml` file and set `require-adobe-auth` to `true`. Then, rebuild and deploy the project using the command:

  ```bash
  aio app deploy
  ```

### Step 4: Test the secure webhook call

You can now test the webhook from Adobe Commerce by adding a product. The calls will be securely authenticated using the configured OAuth credentials.

## Accessing the Developer Console

Ensure you have Developer Access to the Adobe Developer Console. This is required to create and manage projects.

If you don't have developer access, your role will be shown as "User" in the top right corner, and a blue box will highlight restricted access.

To proceed, request Developer Access from your organization admin.
Below are screenshots showing both restricted and developer access views for quick reference.

![Without Developer Access:](../../_images/webhooks/tutorial/restrcited-access-developer-console.png)

![With Developer Access:](../../_images/webhooks/tutorial/developer-access-dev-console.png)

## Redeploy changes

1. If you've made changes to the action code, run the below commands:

   ```bash
   aio app build
   ```

1. If you have multiple actions in your project and want to deploy only a specific action you modified, run the following command to rebuild and redeploy only the specified action.

   ```bash
   aio app deploy --action=webhook/product-update
   ```

## Retrieve an action URL

To get the URL of an action you've created, run:

```bash
aio runtime action get testwebhook --url
```

## Webhook troubleshooting and debugging tips

For detailed webhook logs, navigate to **System** > **Webhook** Logs in the Admin.

If there are configuration errors in the webhook setup for this specific use case, when a product is added to the catalog, the Commerce UI will display the message: **"Cannot perform the operation due to an error."** For instance, if hook fields are configured wrongly, this can occur.

To rule out an issue with the App Builder code, you can use the **aio app dev** command to generate the action URL, which should point to localhost. Then test the action code with the payload using Postman, Postbuster, or a curl command. If the action executes successfully outside of Commerce, the issue is likely a configuration error within the Commerce instance.

## App Builder configuration considerations

If you set **web: 'no'** in **app-config.yaml**, the action will be treated as a non-web action.

This means:

* The action will not have a public HTTP endpoint.
* It cannot be invoked directly by external systems (such as Adobe Commerce).
* It is only accessible internally within Adobe I/O Runtime, such as through events or other actions.

If a webhook in Adobe Commerce is configured to call this non-web action, it will fail silently or throw a generic error. For example, when trying to add and save a product in the Commerce Admin UI, you will see the following error message:

`Cannot perform the operation due to an error.`

This error occurs because Commerce cannot reach the non-web action endpoint.

## Recommended practice for webhooks

For any action meant to be triggered by a Commerce webhook, make sure to define it as a web action by setting set **web: 'yes'** in **app-config.yaml**.
This ensures the action is exposed via a public URL and can be properly invoked by Adobe Commerce.

For further assistance or inquiries, please post your question in the [#app-builder-community](https://magentocommeng.slack.com/).

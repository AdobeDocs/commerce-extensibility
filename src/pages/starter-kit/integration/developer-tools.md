---
title: Developer tools
description: Learn how to use environment variables, logging, and testing with the starter kit.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Starter Kit
 - Tools
---

# Developer tools

The following sections describe development tools and processes available in the starter kit.

## Parameters as environment variables

The `actionparams` object allows you to pass values from your environment variables to an action. Add the parameter to your `.env` file:

`YOUR_PARAM=your_value`

To pass the parameters to the action, add the parameter as an `input` under the corresponding action in the `actions/{entity}/../../actions.config.yaml` file:

```yaml
{action name}:
  function: {action name}/index.js
  web: 'no'
  runtime: nodejs:16
  inputs:
    LOG_LEVEL: debug
    YOUR_PARAM: $YOUR_PARAM
  annotations:
    require-adobe-auth: true
    final: true
```

This parameter is now accessible in the `params` object.

```js
async function main(params) {
  params.YOUR_PARAM
}
```

## Logging

Application logs allow developers to debug an application in development as well as monitor it in production. By default, the starter kit uses the [Adobe I/O SDK](https://github.com/adobe/aio-sdk) to store logs in Adobe I/O Runtime. You can find additional details in [Managing Application Logs](https://developer.adobe.com/app-builder/docs/guides/application_logging/).

Alternatively, the application logs can be forwarded to a customer-owned log management solution. Use [When to use Log Forwarding](https://developer.adobe.com/app-builder/docs/guides/application_logging/#when-to-use-log-forwarding) to inform your decision when choosing to store logs in Adobe I/O Runtime or forward them to a log management platform.

If you are using Adobe Commerce on Cloud Infrastructure, you have access to a New Relic instance. [Forwarding Logs to New Relic](https://developer.adobe.com/app-builder/docs/guides/application_logging/new_relic/) page describes the process necessary to configure starter kit to forward logs to New Relic.

### Hiding secrets in logs

`stringParameters` in the `./actions/utils.js` file can help you prevent exposing secrets when logging the parameters received by a runtime action. It replaces the authorization header value with `<hidden>` and any parameters containing a term present in the hidden array with `<hidden>`.

By default, the following parameters are hidden:

```js
const hidden = [
  'secret',
  'token'
]
```

Adjust these values to hide any secrets you want to pass as `params` to your runtime actions.

## Testing

The starter kit provides unit tests for most of the predefined runtime actions. These tests are located in the `./test/actions` folder.

Additionally, unit tests for the onboarding script can be found in the `.test/scripts` folder.

For more details about unit testing, refer to [Testing a Serverless Action](https://developer.adobe.com/app-builder/docs/resources/barcode-reader/test/).

## Create or modify an event

The starter kit comes with predefined events for each entity. If you need to add a new event to an entity or modify an existing one, use the following steps.

1. Add the event to the `scripts/onboarding/config/events.json` file under the corresponding entity. For example, if the event is related to a customer and is coming from commerce, you should add it under the `customer` entity in the `commerce` section. To modify an existing event, edit the event in the corresponding section of the `./onboarding/config/events.json` file.
  
  ```json
      "customer": {
        "commerce": [
          "com.adobe.commerce.observer.customer_save_commit_after",
          "com.adobe.commerce.observer.customer_delete_commit_after",
          "com.adobe.commerce.observer.customer_group_save_commit_after",
          "com.adobe.commerce.observer.customer_group_delete_commit_after",
          "com.adobe.commerce.THE_NEW_CUSTOMER_EVENT"
        ],
      ...
      }
  ```

1. Run the onboarding script:

  ```bash
  npm run onboard
  ```

1. In the `action/{entity}/{flow}` directory, add or modify the action that will handle this event, such as `actions/customer/commerce/NEW_OPERATION/index.js`.

1. Add the newly created operation action to the `action/{entity}/{flow}/actions.config.yaml` config file or edit the existing action flow.

  ```yaml
  NEW_OPERATION:
    function: NEW_OPERATION/index.js
    web: 'no'
    runtime: nodejs:16
    inputs:
      LOG_LEVEL: debug
    annotations:
      require-adobe-auth: true
      final: true
  ```

1. Add a new `case` to the switch statement in the consumer of the entity flow `action/{entity}/{flow}` or edit the existing `case`:

  ```javascript
    case 'com.adobe.commerce.observer.NEW_CUSTOMER_EVENT': {
      logger.info('Invoking NEW OPERATION')
      const res = await openwhiskClient.invokeAction('customer-commerce/NEW_OPERATION', params.data.value)
      response = res?.response?.result?.body
      statusCode = res?.response?.result?.statusCode
      break
    }
  ```

1. Deploy the changes:

    ```bash
    `aio app deploy`
    ```

After completing this process, you can consume the new or updated event.

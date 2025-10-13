---
title: Code development and deployment
description: Learn how to write, deploy, and manage runtime action code that processes events from Adobe Commerce using the Adobe I/O Events Journaling API.
edition: saas
keywords:
  - Extensibility
  - Events
---

# Code development and deployment

This topic explains how to write, deploy, and manage runtime action code in an Adobe App Builder project that processes events from Adobe Commerce using the Adobe I/O Events Journaling API.

## Writing runtime action code in App Builder project

Create a runtime action that processes product event data from Adobe Commerce. The runtime action invokes when product-related events such as product deletions are captured and delivered through Adobe I/O Events Journaling.
When initializing an App Builder project using the app init command, a default folder structure generates under `actions/<action-name>`. The folder includes an initial `index.js` file, which serves as the entry point for the runtime action.

### `index.js` file

The `index.js` file implements an Adobe I/O Runtime action that consumes events from the Adobe I/O Events Journaling API. Its primary role is to continuously fetch product-related events from Adobe Commerce (such as stock updates, price changes, or deletions), process them, and maintain state for seamless event consumption.

### High-Level Flow

- **Authenticate** → Connects to Adobe IMS and retrieves an access token using the provided credentials.
- **Read State** → Checks the Adobe State Library for the last saved journal position (to ensure continuity).
- **Fetch New Events** → Calls the Journaling API to retrieve only the latest events since the last position.
- **Process and Log Events** → Iterates over the events, extracts key details (e.g., SKU, product name, price, stock quantity), and logs them.
- **Update State** → Saves the newest journal position in the state store for the next invocation.

``` js
const { Core, Events } = require('@adobe/aio-sdk')
const stateLib = require('@adobe/aio-lib-state')
const { errorResponse } = require('../utils')
const { context, getToken } = require('@adobe/aio-lib-ims')
const fetch = require('node-fetch')
 
/**
 * Retrieves an Adobe IMS access token using the provided credentials.
 *
 * @param {Object} params - Parameters containing IMS configuration and credentials.
 * @param {string} params.client_id - Adobe client ID.
 * @param {string} params.client_secret - Adobe client secret.
 * @param {string} params.ims_org_id - Adobe IMS organization ID.
 * @param {string} params.technical_account_id - Technical account ID.
 * @param {string} params.technical_account_email - Technical account email.
 * @param {string|string[]} params.scopes - Scopes for the token (space/comma separated string or JSON array).
 * @returns {Promise<string>} - Returns the generated access token.
 * @throws {Error} If token generation fails.
 */
async function getAccessToken(params) {
  const scopesArray = parseScopes(params.scopes)
 
  const config = {
    client_id: params.client_id,
    client_secrets: [params.client_secret], // must be array for aio-lib-ims
    ims_org_id: params.ims_org_id,
    technical_account_id: params.technical_account_id,
    technical_account_email: params.technical_account_email,
    scopes: scopesArray
  }
 
  // Set IMS configuration in context
  await context.set('my_event_provider', config)
  await context.setCurrent('my_event_provider')
 
  // Retrieve access token
  const token = await getToken()
  return token
}
 
/**
 * Parses the given scopes parameter into an array of scope strings.
 *
 * @param {string} scopesParam - The scopes parameter from environment or config.
 *                              Can be a JSON array string or a space/comma separated string.
 * @returns {string[]} - Array of parsed scopes.
 * @throws {Error} If the scopes cannot be parsed.
 */
function parseScopes(scopesParam) {
  if (!scopesParam) return []
 
  try {
    // If it's a JSON array string from .env
    if (scopesParam.startsWith('[')) {
      return JSON.parse(scopesParam)
    }
    // Otherwise fallback to space/comma split
    return scopesParam.split(/[ ,]+/)
  } catch (e) {
    throw new Error(`Failed to parse scopes: ${scopesParam}`)
  }
}
 
/**
 * Fetches events from the Adobe I/O Journaling API.
 *
 * @param {Object} params - Action parameters containing IMS and Journaling details.
 * @param {string} params.ims_org_id - Adobe IMS organization ID.
 * @param {string} params.apiKey - Adobe API key.
 * @param {string} params.journalling_url - Journaling endpoint URL.
 * @param {string} accessToken - Adobe IMS access token.
 * @param {string} [sincePosition] - Optional position marker to fetch events since last processed position.
 * @returns {Promise<Object[]>} - Array of event objects fetched from Journaling API.
 * @throws {Error} If required parameters are missing or request fails.
 */
async function fetchEvent(params, accessToken, sincePosition) {
  const { ims_org_id, apiKey, journalling_url } = params
 
  if (!ims_org_id || !apiKey || !accessToken || !journalling_url) {
    throw new Error('Missing Adobe I/O credentials in action params')
  }
 
  // Initialize Adobe Events client
  const eventsClient = await Events.init(ims_org_id, apiKey, accessToken)
 
  // Request options
  const options = {}
  if (sincePosition) {
    options.since = sincePosition
  }
  options.limit = 100 // Fetch up to 100 events in one call
 
  // Fetch events from journal
  const journalling = await eventsClient.getEventsFromJournal(journalling_url, options)
  return journalling.events || []
}
 
/**
 * Main entrypoint for the Adobe I/O action.
 *
 * @param {Object} params - Action input parameters.
 * @param {string} params.LOG_LEVEL - (Optional) Log level (info, debug, error).
 * @returns {Promise<Object>} - Returns a success response with fetched events or an error response.
 */
async function main(params) {
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })
  logger.info('Fetching events from journaling endpoint...')
 
  try {
    // Retrieve access token
    const accessToken = await getAccessToken(params)
    if (!accessToken) {
      throw new Error('Missing access_token in params')
    }
 
    // Initialize state store (Adobe Runtime State)
    const state = await stateLib.init()
 
    // Load last saved journal position to continue from
    const lastPositionRes = await state.get('last_journal_position')
    const lastPosition = lastPositionRes ? lastPositionRes.value : undefined
    logger.info(`Last Position >>> ${lastPosition}`)
 
    // Fetch events from Adobe Journaling API
    const events = await fetchEvent(params, accessToken, lastPosition)
    logger.info(`Fetched ${events.length} new event(s).`)
 
    if (events.length > 0) {
      events.forEach((event, index) => {
        logger.info(`--- Event #${index + 1} ---`)
        logger.info(`Raw Payload:\n${JSON.stringify(event, null, 2)}`)
 
        // Extract and log event details if available
        if (event.event) {
          logger.info(`Event ID: ${event.event.id}`)
          logger.info(`Type: ${event.event.type}`)
          logger.info(`Time: ${event.event.time}`)
 
          if (event.event.data && event.event.data.value) {
            const data = event.event.data.value
            if (data.sku) logger.info(`SKU: ${data.sku}`)
            if (data.name) logger.info(`Name: ${data.name}`)
            if (data.price) logger.info(`Price: ${data.price}`)
            if (data.quantity_and_stock_status?.qty !== undefined) {
              logger.info(`Quantity in stock: ${data.quantity_and_stock_status.qty}`)
            }
          }
        }
      })
 
      // Save newest journal position for next invocation
      const newestPosition = events[events.length - 1].position
      await state.put('last_journal_position', newestPosition) // default TTL
      logger.info(`Updated last processed position: ${newestPosition}`)
    }
 
    // Return success response
    return { success: true, events_fetched: events.length, events }
  } catch (error) {
    logger.error('Fetch failed with error:', error)
    return errorResponse(500, error.message, logger)
  }
}
 
exports.main = main
```

## Reading through Adobe I/O journals

Adobe I/O Journaling API acts as a queue that holds events temporarily. Each event has a position marker that serves as a cursor. The `fetchEvent()` function retrieves events from the journaling URL provided in the parameters.
If a previous position exists, the function fetches events starting from that position so only new events are processed. A maximum of 100 events are retrieved per call.

After processing, the newest position from the last event is saved in the state store. This ensures that events are read sequentially and not re-processed.

## StateLib Variable (aio-lib-state)

`aio-lib-state` is a key-value store that persists metadata across function executions. In this code, it stores the last journal position.

- `state.get('last_journal_position')` retrieves the saved position from the previous run.

- `state.put('last_journal_position', newestPosition)` updates the stored position with the latest marker after events are processed.

This persistence enables the function to resume from the correct point in the journal even after restarts or failures.

## Getting IMS Access Token in Detail

Adobe APIs require an IMS (Identity Management System) access token for authentication. The code uses `aio-lib-ims` to generate this token. The `parseScopes()`1 function converts the scopes parameter into an array, either by parsing a JSON array string or splitting by spaces/commas.

A configuration object is created with:

- client_id
- client_secret (wrapped in an array as required by the library)
- ims_org_id
- technical_account_id
- technical_account_email
- scopes

The configuration is stored in context under the key `my_event_provider` and set as the current provider. The `getToken()` call uses the configuration to generate an IMS access token. The resulting access token is then used by the Events SDK to authenticate calls to the journaling API.

### `utils.js` file

The `utils.js` file provides reusable utilities to keep the main action (`index.js`) clean and focused. It contains helper functions used by the runtime action:

- `stringParameters` - Formats parameters into a string (mainly for logging/debugging).
- `fetchEvent` - Makes a simple HTTP request to the journaling endpoint using an access token.
- `errorResponse` Returns a consistent error response object and logs the error if a logger is provided.

``` js
const fetch = require('node-fetch'); // Import fetch for Node.js (<18). For Node 18+, global fetch is available.
 
/**
 * Converts a parameters object into a comma-separated string of key=value pairs.
 *
 * @param {Object} params - Key-value pairs to convert.
 * @returns {string} A string representation of the parameters.
 */
function stringParameters(params) {
  return Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join(', ');
}
 
/**
 * Fetches events from the journaling endpoint.
 *
 * @async
 * @param {Object} params - Configuration for the fetch request.
 * @param {string} params.journalling_url - URL of the journaling endpoint.
 * @param {string} params.access_token - Access token used for authorization.
 * @returns {Promise<Object>} JSON response body containing events.
 * @throws {Error} If the request fails or the response is not OK (non-200).
 */
async function fetchEvent(params) {
  const response = await fetch(params.journalling_url, {
    headers: {
      'Authorization': `Bearer ${params.access_token}`,
      'Content-Type': 'application/json'
    }
  });
 
  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.statusText}`);
  }
 
  return await response.json();
}
 
/**
 * Creates a standardized error response object.
 *
 * @param {number} statusCode - HTTP status code of the error.
 * @param {string} message - Description of the error.
 * @param {Object} [logger] - Optional logger instance to log the error.
 * @returns {Object} A structured error response object.
 */
function errorResponse(statusCode, message, logger) {
  if (logger) logger.error(`${statusCode}: ${message}`);
  return { success: false, statusCode, message };
}
 
// Export utility functions for use in other modules
module.exports = {
  stringParameters,
  fetchEvent,
  errorResponse
  }
```

### Changes to the `.env` file

A `.env` file is an environment file that stores sensitive values such as API keys, client secrets, and org IDs required by your Adobe App Builder app. It is auto-generated by the Adobe Developer CLI (aio) when you bootstrap a project, using the json configuration file you download from the Adobe Developer Console.

When a new Adobe I/O Runtime project is created, .env variables are generated with long names tied to the project and workspace. For example, for a project named journalTest1 in the Stage workspace, you will see entries like:

``` js
AIO_ims_contexts_Credential__in__MyEventsApp__-__Stage_client__id
AIO_ims_contexts_Credential__in__MyEventsApp__-__Stage_client__secrets
AIO_ims_contexts_Credential__in__MyEventsApp__-__Stage_technical__account__email
AIO_ims_contexts_Credential__in__MyEventsApp__-__Stage_technical__account__id
AIO_ims_contexts_Credential__in__MyEventsApp__-__Stage_scopes
AIO_ims_contexts_Credential__in__MyEventsApp__-__Stage_ims__org__id 
```

Sometimes referencing these names in `appconfig.yaml` causes errors when generating tokens.  In these cases, simplify the contents.

```js
### Adobe I/O Console service account credentials

CLIENT_ID=***************
CLIENT_SECRET=***************
TECH_ACCOUNT_EMAIL=***************@techacct.adobe.com
TECH_ACCOUNT_ID=***************@techacct.adobe.com
IMS_ORG_ID=***************@AdobeOrg

 **Scopes as a JSON array**
AIO_IMS_SCOPES=["AdobeID","openid","read_organizations",
"additional_info.projectedProductContext",
"additional_info.roles","adobeio_api",
"read_client_secret","manage_client_secrets"]
```

| Before (auto generated)                                                         | After (Simplified)    |
|---------------------------------------------------------------------------------|-----------------------|
| `AIO_ims_contexts_Credential__in__journalTest1__-__Stage_client__id`            | `CLIENT_ID`           |
| `AIO_ims_contexts_Credential__in__journalTest1__-__Stage_client__secrets`       | `CLIENT_SECRET`       |
| `AIO_ims_contexts_Credential__in__journalTest1__-__Stage_technical__account__email` | `TECH_ACCOUNT_EMAIL`  |
| `AIO_ims_contexts_Credential__in__journalTest1__-__Stage_technical__account__id`    | `TECH_ACCOUNT_ID`     |
| `AIO_ims_contexts_Credential__in__journalTest1__-__Stage_scopes`                | `AIO_IMS_SCOPES`      |
| `AIO_ims_contexts_Credential__in__journalTest1__-__Stage_ims__org__id`          | `IMS_ORG_ID`          |

All other credentials (such as CLIENT_ID, CLIENT_SECRET, TECH_ACCOUNT_ID, IMS_ORG_ID, and AIO_IMS_SCOPES) are auto-generated by the Adobe Developer CLI when you set up your project using the downloaded json configuration file from the Adobe Developer Console. These values should not be edited manually.
Two inputs must always be provided explicitly by the developer:

- JOURNALLING_URL: Obtain this from **Developer Console** > [Your Project] > **journalSep Stage** > **Event Registration** > **Event Delivery Method** by copying the Journaling Unique API Endpoint.

- DB_EVENT_KEY: Define any string key (such as `journalposition1`). This key is used by the App Builder State Library to persist the last processed journaling position.

When setting your environment variables, ensure that values like CLIENT_SECRET are provided without quotes if they are specified as strings.

### How to get the JOURNALLING_URL value

You can fetch the Journaling Unique API Endpoint from the Adobe Developer Console:

1. Navigate to your project > journalSep (Stage).
1. Go to **Event Registration**.
1. Under **Event Delivery Method**, select **Journaling**.
1. Copy the **JOURNALING UNIQUE API ENDPOINT**.
1. Paste it into your `.env` file as the value of `JOURNALLING_URL`.

### Changes to `appconfig.yaml`

The `appconfig.yaml` describes your Adobe App Builder project's runtime actions.
It pulls inputs dynamically from `.env` using `$VARIABLE_NAME`. To do this, copy the variable names from `.env` and place them under the inputs section of the runtime action in `appconfig.yaml`. This way, developers don't manually copy-paste secrets into the YAML, deployments can update credentials by simply changing `.env`, and secrets stay out of source code while remaining easy to rotate.

```yaml
application:
  actions: actions
  web: web-src
  runtimeManifest:
    packages:
      journaltestfinal:
        license: Apache-2.0
        actions:
          journaltest:
            function: actions/journaltest/index.js
            web: 'yes'
            runtime: nodejs:22
            inputs:
              LOG_LEVEL: info
              apiKey: $SERVICE_API_KEY
              journalling_url: $JOURNALLING_URL
              client_id: $CLIENT_ID
              client_secret: $CLIENT_SECRET
              technical_account_email: $TECH_ACCOUNT_EMAIL
              technical_account_id: $TECH_ACCOUNT_ID
              ims_org_id: $IMS_ORG_ID
              db_event_key: $DB_EVENT_KEY
              scopes: $AIO_IMS_SCOPES
            annotations:
              require-adobe-auth: false
              final: true
            limits:
              timeout: 70000  
        triggers:
          everyMin:
            feed: /whisk.system/alarms/interval
            inputs:
              minutes: 1
        rules:
          everyMinToEventjournal:
            trigger: everyMin
            action: <Name of the action>

```

A trigger in Adobe I/O Runtime (built on Apache OpenWhisk) represents an event source. Triggers can fire on a schedule, in response to external events, or based on system activity. They do not execute code by themselves but are linked to actions through rules.

In this example, the trigger `everyMin` is created using the system-provided alarm `feed/whisk.system/alarms/interval`. The alarm feed generates periodic events at a defined interval. The inputs specify the interval configuration.

- Minutes: 1 means the trigger will fire every one minute.
- Each time the trigger fires, it produces an event document that can be consumed by one or more rules.

This trigger acts as a scheduler for invoking actions at regular intervals.
A rule links a trigger to an action. When the trigger fires, the associated action is automatically executed.
In this example, the rule `everyMinToEventjournal` connects the `everyMin` trigger to the `eventjournal` action. The flow works as follows:

- The limits.timeout parameter defines how long (in milliseconds) the action can run before it is terminated automatically by Adobe I/O Runtime
- The everyMin trigger fires every minute.
- The rule detects that the trigger has fired.
- The linked `eventjournal` action is invoked automatically.
- The `eventjournal` action is expected to contain the logic for reading events from the Adobe I/O Events Journaling API. By wiring the rule this way, the journaling action runs once per minute, polling the journal for any new events and processing them.

## Building and deploying application

Before building and deploying the App Builder project, ensure the following dependencies are installed and available:

```bash
npm install @adobe/aio-sdk
npm install @adobe/aio-lib-state
npm install @adobe/aio-lib-ims
```

Now deploy application using:

```bash
aio app deploy
```

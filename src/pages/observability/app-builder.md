---
title: Adobe Commerce Observability
description: Adobe Commerce Observability
keywords:
  - Extensibility
---

# Adobe Commerce Observability with App Builder

To align logs from Commerce and App Builder the context propagation is used. The context is automatically propagated from Adobe Commerce to App Builder as webhooks headers or as a part of event payload. This allows you to correlate logs from both systems and get a complete picture of the request flow.

If your App Builder app is making requests to other services, you can also propagate the context to those services. This way, you can trace the request flow across multiple systems and get a complete picture of the request flow.

To forward logs from App Builder the `@adobe/aio-lib-telemetry` package can be used. [Documentation](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/usage.md)

## Example

Create a file with the Telemetry configuration, for example `telemetry.js` in the `application` directory of your App Builder app. Replace `<EXPORT_URL>` with the URL of your telemetry collector. You can use a Ngrok or other tunneling service to expose your local development environment.

```javascript
const {
    defineTelemetryConfig,
    getPresetInstrumentations,
    getAioRuntimeResource
} = require("@adobe/aio-lib-telemetry")

const {
    OTLPLogExporterHttp,
    SimpleLogRecordProcessor
} = require("@adobe/aio-lib-telemetry/otel");

function localCollectorConfig(exportUrl) {
    const makeExporterConfig = (path) => ({
        url: `${exportUrl}/${path}`,
    });

    return {
        logRecordProcessors: [
            new SimpleLogRecordProcessor(
                new OTLPLogExporterHttp(makeExporterConfig("v1/logs"))
            ),
        ],
    };
}

const telemetryConfig = defineTelemetryConfig((params, isDev) => {
    // Use the tunnel URL instead of localhost
    const exportUrl = "<EXPORT_URL>"; // Replace with your actual export URL

    return {
        sdkConfig: {
            serviceName: "<YOUR_SERVICE>", // Replace with your service name. User the name in observability subscription to match the logs
            instrumentations: getPresetInstrumentations("simple"),
            resource: getAioRuntimeResource(),

            ...localCollectorConfig(exportUrl),
        }
    };
});

exports.telemetryConfig = telemetryConfig
```

### Handling context propagation from Commerce webhook headers

Update your action code to use the telemetry configuration. For example, in `index.js`:

```javascript
const { HTTP_OK } = require('../../lib/http');
const { telemetryConfig } = require('../telemetry');
const { instrumentEntrypoint, getLogger } = require('@adobe/aio-lib-telemetry');

async function main(params) {
    const logger = getLogger('my-custom-action', { level: params.LOG_LEVEL || 'info' });
    try {
        logger.debug('My custom action called with params: ', params);
        logger.info('Headers: ', params.__ow_headers);


        // Your action logic goes here

        logger.warn('Some warnings can be logged here for debugging purposes in AppBuilder action');

        const operations = [];

        operations.push({
            op: 'success',
        })

        logger.info(`Returning operations from AppBuilder action: ${JSON.stringify(operations)}`);

        return {
            statusCode: HTTP_OK,
            body: JSON.stringify(operations)
        }
    } catch (error) {
        logger.error(error);
    }
}

// The next requires for passing context propagation from Commerce webhook headers
const instrumentedMain = instrumentEntrypoint(main, {
    ...telemetryConfig,
    propagation: {
        getContextCarrier: (params) => {
            if (params && params.__ow_headers && params.__ow_headers["traceparent"]) {
                return {
                    carrier: {
                        traceparent: params && params.__ow_headers && params.__ow_headers["traceparent"] || "",
                        tracestate: params && params.__ow_headers && params.__ow_headers["tracestate"] || ""
                    }
                }
            } else {
                return {
                    carrier: {}
                }
            }
        }
    }
});
exports.main = instrumentedMain
```

### Handling context propagation from Commerce eventing payload

```javascript
const {HTTP_OK} = require("../../lib/http");
const {instrumentEntrypoint, getLogger} = require("@adobe/aio-lib-telemetry");
const {telemetryConfig} = require("../telemetry");

async function main(params) {
  const logger = getLogger('commerce-events/consume', { level: params.LOG_LEVEL || 'info' });

  logger.debug(`Received Commerce event ${type}`);

  logger.warn('Event processing is not implemented yet, returning a dummy response');

  logger.debug('Consumed Commerce event.', {type});

  return {
    statusCode: HTTP_OK,
    body: JSON.stringify({
      message: `Received Commerce event ${type}`
    })
  }
}

// The next requires for passing context propagation from Commerce events payload
const instrumentedMain = instrumentEntrypoint(main, {
  ...telemetryConfig,
  propagation: {
    getContextCarrier: (params) => {
      if (params.data._metadata && params.data._metadata["traceparent"]) {
        return {
          carrier: {
            traceparent: params.data._metadata["traceparent"] || "",
            tracestate: params.data._metadata["tracestate"] || ""
          }
        }
      } else {
        return {
          carrier: {}
        }
      }
    }
  }
});
exports.main = instrumentedMain
```

## Local development

You can run the observability tool locally to test Commerce extensibility tools in the connection App Builder. The example of [how to run Grafana locally here](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/use-cases/grafana.md#local-development).

To forward logs to your local development machine from the Commerce instance and deployed App Builder action the tunnel service can be used. For example, you can use [Ngrok](https://ngrok.com/) to expose your local development environment to the internet. More details about how to use tunneling tools can be found [here](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/use-cases/support/tunnel-forwarding.md).

![Grafana logs](../_images/observability/grafana-all-logs.png)

To filter logs for a single request you can use trace_id filter and logs for the particular request will be shown. The trace_id is propagated from Commerce to App Builder and can be used to correlate logs from both systems.

![Grafana filtered logs](../_images/observability/grafana-filtered-logs.png)

---
title: OpenTelemetry integration
description: Monitor and trace your checkout application with built-in observability tools
keywords:
  - Starter Kit
  - Extensibility
  - App Builder
---

# OpenTelemetry integration

OpenTelemetry enables you to monitor and trace your checkout application's performance, helping you identify bottlenecks, debug issues, and understand how your actions interact with Adobe Commerce. The integration automatically collects metrics and traces for key checkout operations without requiring manual instrumentation.

This starter kit includes built-in observability using [`@adobe/aio-lib-telemetry`](https://github.com/adobe/aio-lib-telemetry), which provides OpenTelemetry instrumentation for App Builder actions.

## What's included

The starter kit demonstrates telemetry instrumentation on webhook actions used in the checkout process. The following actions are instrumented:

- [collect-taxes](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/collect-taxes/index.js)
- [filter-payment](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/filter-payment/index.js)
- [shipping-methods](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/shipping-methods/index.js)
- [validate-payment](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/validate-payment/index.js)

These webhook actions serve as examples of how to implement telemetry in your own custom actions.

## Configuration

Telemetry is an optional feature controlled via the `ENABLE_TELEMETRY` environment variable in [`app.config.yaml`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/app.config.yaml). It's enabled by default for all checkout actions:

```yaml
actions:
  collect-taxes:
    inputs:
      ENABLE_TELEMETRY: true
```

The telemetry behavior and settings are configured in the [`actions/telemetry.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/telemetry.js) file, which provides centralized control over instrumentation, diagnostics, and export options. For more information about the `ENABLE_TELEMETRY` configuration, see the [OpenTelemetry configuration documentation](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/usage.md#configuration).

### Viewing telemetry data

By default, diagnostics logging is disabled in the starter kit (`diagnostics: false` in [`actions/telemetry.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/telemetry.js)). This means telemetry data is collected but not automatically forwarded to an external collector.

If you want to view and analyze telemetry data, you'll need to configure a telemetry exporter and collector.

#### Export telemetry data (cloud or local)

To forward telemetry (logs, traces, metrics) to any OTLP‑compatible service (including collectors, Grafana, DataDog, and New Relic), you only need to adjust two places:

1. `actions/telemetry.js` – add exporter wiring
2. [`app.config.yaml`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/app.config.yaml) – surface endpoint / auth values as action inputs (or use secrets)

Template (`actions/telemetry.js`):

```javascript
// actions/telemetry.js (template)
const {
  defineTelemetryConfig,
  getAioRuntimeResource,
  getPresetInstrumentations,
  // localCollectorConfig, // optional helper if you want a local collector
  // other helpers from @adobe/aio-lib-telemetry as needed
} = require('@adobe/aio-lib-telemetry');

module.exports.telemetryConfig = defineTelemetryConfig((params, isDev) => ({
  sdkConfig: {
    serviceName: 'commerce-checkout-starter-kit',
    instrumentations: getPresetInstrumentations('simple'),
    resource: getAioRuntimeResource(),
    // Exporter configuration placeholder:
    // Insert log / trace / metric exporter objects here following service/provider examples.
    // Example placeholder (replace with actual service configuration):
    // logRecordProcessors: params.OTLP_ENDPOINT ? [ buildYourLogExporter(params) ] : []
    // spanProcessors: params.OTLP_TRACES_ENDPOINT ? [ buildYourTraceExporter(params) ] : []
    // metricsExporters: [] // if metrics are enabled

    // For a local collector you could uncomment:
    // ...localCollectorConfig(),
  },
  diagnostics: false // set true only when debugging telemetry setup
}));
```

Surface endpoint / auth inputs ([`app.config.yaml`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/app.config.yaml) excerpt):

```yaml
actions:
  collect-taxes:
    inputs:
      ENABLE_TELEMETRY: true
      OTLP_ENDPOINT: ${OTLP_ENDPOINT}        # e.g. https://otel.example.com/v1/logs
      OTLP_TRACES_ENDPOINT: ${OTLP_TRACES_ENDPOINT} # optional distinct traces URL
      OTLP_API_KEY: ${OTLP_API_KEY}          # token/key if service requires
  # repeat for other actions or centralize pattern
```

Local development `.env` example:

```text
OTLP_ENDPOINT=http://localhost:4318
OTLP_TRACES_ENDPOINT=http://localhost:4318
OTLP_API_KEY=LOCAL_DEV_KEY_OR_EMPTY
```

Deploy your changes:

```bash
aio app deploy
```

For concrete exporter code (constructing OTLP exporters, using batch processors, service specific headers), refer to:

- [Use cases (configuration examples)](https://github.com/adobe/aio-lib-telemetry/tree/main/docs/use-cases)
- [Exporting data guide](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/usage.md#exporting-data)

## Additional information

- [OpenTelemetry Collector documentation](https://opentelemetry.io/docs/collector/)
- [`@adobe/aio-lib-telemetry` API reference](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/usage.md)
- [OpenTelemetry core concepts](https://opentelemetry.io/docs/concepts/)

## Troubleshooting

If you enable diagnostics logging and encounter connection errors like:

```text
error: {"stack":"AggregateError [ECONNREFUSED]: ...","errors":"Error: connect ECONNREFUSED ::1:4318,Error: connect ECONNREFUSED 127.0.0.1:4318","code":"ECONNREFUSED","name":"AggregateError"}
```

These errors occur when any of the configured endpoints (such as Grafana, DataDog, New Relic, or an OpenTelemetry collector) cannot be reached during the export of telemetry data. For configuration examples, see the [use cases documentation](https://github.com/adobe/aio-lib-telemetry/tree/main/docs/use-cases). To resolve this:

- **Option 1**: Set `diagnostics: false` in [`actions/telemetry.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/telemetry.js) to disable diagnostic logging
- **Option 2**: Set up and run your OTLP-compatible service at the expected endpoint
- **Option 3**: Disable telemetry entirely by setting `ENABLE_TELEMETRY: false` in [`app.config.yaml`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/app.config.yaml) for specific action.

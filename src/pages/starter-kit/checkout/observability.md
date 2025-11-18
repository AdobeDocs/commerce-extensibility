---
title: OpenTelemetry integration
description: Monitor and trace your checkout application with built-in observability tools
keywords:
  - Starter Kit
  - Extensibility
  - App Builder
---

# OpenTelemetry integration

This starter kit includes built-in observability using [`@adobe/aio-lib-telemetry`](https://github.com/adobe/aio-lib-telemetry), which provides OpenTelemetry instrumentation for App Builder actions.

OpenTelemetry enables you to monitor and trace your checkout application's performance, helping you identify bottlenecks, debug issues, and understand how your actions interact with Adobe Commerce. The integration automatically collects metrics and traces for key checkout operations without requiring manual instrumentation.

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

By default, diagnostics logging is disabled in the starter kit (`diagnostics: false` in [[`actions/telemetry.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/telemetry.js)]). This setting only suppresses internal OpenTelemetry diagnostic output (SDK self‑logs). It does not control or forward your actual telemetry signals (logs, traces, metrics). Signals remain local until you configure exporters.

**Diagnostics configuration (optional):** Provide an object instead of `false` to enable and tune internal OpenTelemetry logs. Example:

```javascript
{
  // It's an object, this will enable OpenTelemetry internal logs
  diagnostics: {
    // Will only show warning logs and above
    logLevel: "warning",
    // The internal logs of OpenTelemetry will not get exported, only printed.
    // This means you won't see them in your observability backend, but you will
    // in the Adobe I/O Runtime logs (queryable via `aio rt activation logs <id>`)
    exportLogs: false
  }
}
```

Set back to `false` to silence these internal logs:

```javascript
diagnostics: false
```

### Export telemetry data (cloud or local)

To forward telemetry (logs, traces, metrics) to any OTLP‑compatible service (such as collectors, Grafana, DataDog, or New Relic), you only need to adjust these places:

- [`actions/telemetry.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/telemetry.js)
- [`app.config.yaml`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/app.config.yaml)

1. Update the telemetry template ([`actions/telemetry.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/telemetry.js)) to wire in the appropriate exporters for your use case. A minimal template is provided below:

   ```javascript
   // actions/telemetry.js (template)
   
   import {
     defineTelemetryConfig,
     getAioRuntimeResource,
     getPresetInstrumentations,
     // localCollectorConfig, // optional helper if you want a local collector
     // other helpers from '@adobe/aio-lib-telemetry' as needed
   } from '@adobe/aio-lib-telemetry';
   
   // Exporter wiring helper (keep minimal – replace stubs with real exporters per use case docs)
   function buildExporters(params) {
     return {
       // Logs: add your log record processor + exporter instance here
       // logRecordProcessors: params.OTLP_ENDPOINT ? [buildYourLogExporter(params)] : [],
   
       // Traces: uncomment and provide span processor/exporter if you enable tracing
       // spanProcessors: params.OTLP_TRACES_ENDPOINT ? [buildYourTraceExporter(params)] : [],
   
       // Metrics: provide metrics exporters if metrics collection is enabled
       // metricsExporters: [],
     };
   }
   
   const telemetryConfig = defineTelemetryConfig((params, isDev) => ({
     sdkConfig: {
       serviceName: 'commerce-checkout-starter-kit',
       instrumentations: getPresetInstrumentations('simple'),
       resource: getAioRuntimeResource(),
   
       // Optional: uncomment for local collector convenience
       // ...localCollectorConfig(),
   
       // Insert log / trace / metric exporter objects via helper
       ...buildExporters(params),
     },
     // Set true only when debugging telemetry setup
     diagnostics: false,
   }));
   
   export { telemetryConfig };
   ```

1. Surface endpoint and auth inputs in [`app.config.yaml`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/app.config.yaml), as shown in the following excerpt. (You can also use secrets.)

   ```yaml
   actions:
     collect-taxes:
     inputs:
        ENABLE_TELEMETRY: true
        OTLP_ENDPOINT: $OTLP_ENDPOINT        # e.g. https://otel.example.com/v1/logs
        OTLP_API_KEY: $OTLP_API_KEY          # token/key if service requires
        # repeat for other actions or centralize pattern
   ```

1. Update your local development `.env` file with the appropriate endpoint and auth values. Example for a local OpenTelemetry collector:

   ```text
   OTLP_ENDPOINT=http://localhost:4318
   OTLP_API_KEY=LOCAL_DEV_KEY_OR_EMPTY
   ```

For concrete exporter code (such as constructing OTLP exporters, using batch processors, service specific headers), refer to:

- [Use cases (configuration examples)](https://github.com/adobe/aio-lib-telemetry/tree/main/docs/use-cases)
- [Exporting data guide](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/usage.md#exporting-data)

## Troubleshooting

If you enable diagnostics logging and encounter connection errors like:

```text
error: {"stack":"AggregateError [ECONNREFUSED]: ...","errors":"Error: connect ECONNREFUSED ::1:4318,Error: connect ECONNREFUSED 127.0.0.1:4318","code":"ECONNREFUSED","name":"AggregateError"}
```

These errors occur when any of the configured endpoints (such as Grafana, DataDog, New Relic, or an OpenTelemetry collector) cannot be reached during the export of telemetry data. For configuration examples, see the [use cases documentation](https://github.com/adobe/aio-lib-telemetry/tree/main/docs/use-cases).

To resolve this:

- **Option 1**: Set `diagnostics: false` in [`actions/telemetry.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/telemetry.js) to silence internal SDK diagnostics while keeping signal collection.
- **Option 2**: Verify exporter configuration (endpoints, auth headers, ports) and ensure the destination is reachable; retry after confirming network/firewall and credentials.
- **Option 3**: Temporarily remove exporter wiring (leave telemetry enabled but with empty processors) to stop external forwarding without impacting instrumentation.
- **Option 4**: As a last resort, disable telemetry (`ENABLE_TELEMETRY: false`) in [`app.config.yaml`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/app.config.yaml) for a specific action—only after confirming your code does not require telemetry initialization.
- **Option 5**: Implement (or await) a no‑op shim that safely replaces exporter initialization to avoid code changes when disabling forwarding.

<InlineAlert variant="warning" slots="text" />

Completely disabling telemetry (`ENABLE_TELEMETRY: false`) removes instrumentation setup. If your custom code directly invokes telemetry APIs or relies on context propagation, this may cause runtime errors or lost diagnostics until a planned no‑op implementation/shim is provided. Prefer keeping telemetry enabled with minimal/no exporters instead of disabling, unless you have verified no such dependencies.

## Additional information

[OpenTelemetry Collector documentation](https://opentelemetry.io/docs/collector/)
[Usage guide](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/usage.md)
[`@adobe/aio-lib-telemetry`](https://github.com/adobe/aio-lib-telemetry)
[API reference](https://github.com/adobe/aio-lib-telemetry/tree/main/docs/api-reference)
[OpenTelemetry core concepts](https://opentelemetry.io/docs/concepts/)

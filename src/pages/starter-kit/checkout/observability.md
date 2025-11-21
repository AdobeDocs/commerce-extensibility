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

By default, no telemetry data (logs/traces/metrics) is forwarded externally until you configure exporters. If exporters are not configured, collected telemetry data is discarded. Instrumentation still runs because `ENABLE_TELEMETRY` is set to `true`, but can be disabled at any time by setting it to `false` for specific actions.

### Export telemetry data (cloud or local)

To forward telemetry (logs, traces, metrics) to any OTLP‑compatible service (such as collectors, Grafana, DataDog, or New Relic), you only need to adjust these places:

- [`actions/telemetry.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/telemetry.js)
- [`app.config.yaml`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/app.config.yaml)

1. Update the telemetry template ([`actions/telemetry.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/telemetry.js)) to wire in the appropriate exporters for your use case. A minimal template is provided below:

   ```javascript
   import {
     defineTelemetryConfig,
     getAioRuntimeResource,
     getPresetInstrumentations,
     // other helpers from '@adobe/aio-lib-telemetry' as needed
   } from '@adobe/aio-lib-telemetry';

   // Import exporters and processors from '@adobe/aio-lib-telemetry/otel'
   // See API Reference: https://github.com/adobe/aio-lib-telemetry/blob/main/docs/api-reference/README.md

   // Exporter wiring helper (replace with your service-specific config)
   function buildExporters(params) {
     return {
       // Logs: replace buildYourLogExporter with your actual log exporter
       logRecordProcessors: params.OTLP_ENDPOINT ? [buildYourLogExporter(params)] : [],

       // Traces: replace buildYourTraceExporter with your actual trace exporter
       spanProcessors: params.OTLP_ENDPOINT ? [buildYourTraceExporter(params)] : [],

       // Metrics: replace with your actual metrics exporters array
       metricsExporters: [],
     };
   }

   const telemetryConfig = defineTelemetryConfig((params, isDev) => ({
     sdkConfig: {
       serviceName: 'commerce-checkout-starter-kit',
       instrumentations: getPresetInstrumentations('simple'),
       resource: getAioRuntimeResource(),
       // Insert log / trace / metric exporter objects via helper
       ...buildExporters(params),
     },
     // Set true only when debugging telemetry setup
     diagnostics: false,
   }));

   export { telemetryConfig };
   ```

2. Surface endpoint and auth inputs in [`app.config.yaml`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/app.config.yaml), as shown in the following excerpt. (You can also use secrets.)

   ```yaml
   actions:
     collect-taxes:
       inputs:
         ENABLE_TELEMETRY: true
         OTLP_ENDPOINT: $OTLP_ENDPOINT        # Base URL, e.g. https://otel.example.com
         OTLP_API_KEY: $OTLP_API_KEY          # token/key if service requires
         # repeat for other actions or centralize pattern
   ```

3. Update your local development `.env` file with the appropriate endpoint and auth values. Example for a local OpenTelemetry collector:

   ```text
   OTLP_ENDPOINT=http://localhost:4318
   OTLP_API_KEY=LOCAL_DEV_KEY_OR_EMPTY
   ```

For concrete exporter code (such as constructing OTLP exporters, using batch processors, service specific headers), refer to:

- [API reference for `@adobe/aio-lib-telemetry`](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/api-reference/README.md)
- [Use cases (configuration examples)](https://github.com/adobe/aio-lib-telemetry/tree/main/docs/use-cases)
- [Exporting data guide](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/usage.md#exporting-data)

## Troubleshooting

Use the following guidance to troubleshoot common telemetry issues.

### Connection errors when exporting telemetry

If you encounter connection errors when exporting telemetry data, such as: `error: {"stack":"AggregateError [ECONNREFUSED]: ...","errors":"Error: connect ECONNREFUSED ::1:4318,Error: connect ECONNREFUSED 127.0.0.1:4318","code":"ECONNREFUSED","name":"AggregateError"}`, the configured OTLP endpoint cannot be reached during export.

The root cause is typically one of the following:

- **Incorrect endpoint configuration**: Check that URLs, ports, and paths in your exporter configuration match your observability service requirements
- **Network connectivity issues**: Ensure the destination service is running and accessible from your runtime environment
- **Authentication problems**: Verify that API keys, tokens, or other credentials are correct and have proper permissions

**To resolve:**

1. Review your exporter configuration in [`actions/telemetry.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/telemetry.js) and [`app.config.yaml`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/app.config.yaml).
2. Confirm the destination endpoint is reachable and properly configured.
3. Refer to the [use cases documentation](https://github.com/adobe/aio-lib-telemetry/tree/main/docs/use-cases) for service-specific configuration examples.

### Diagnostics (internal SDK logs)

Diagnostics are an optional feature of the [`@adobe/aio-lib-telemetry`](https://github.com/adobe/aio-lib-telemetry) library. They can be used to enable and configure internal OpenTelemetry SDK logs (not your application's), which you may need when troubleshooting your telemetry setup, in case it's not working as expected. By default, they are disabled (`diagnostics: false` in [`actions/telemetry.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/telemetry.js)).

**Enable diagnostics example:**

```javascript
const telemetryConfig = defineTelemetryConfig((params, isDev) => ({
  sdkConfig: { /* ... */ },
  diagnostics: {
    logLevel: 'warning',    // minimum level printed
    exportLogs: false       // print only; do not export internal SDK logs
  }
}));
```

Key points:

- Set `diagnostics: false` to silence internal SDK logs entirely.
- If you want them enabled, configure them by setting an object implementing the [`TelemetryDiagnosticsConfig`](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/api-reference/type-aliases/TelemetryDiagnosticsConfig.md) interface.
- These logs appear in Adobe I/O Runtime activation logs (accessible via `aio rt activation logs <activation-id>` or visible in `aio app dev` output), filtered by the configured `logLevel`. They are not exported unless you also configure log exporters.

### Completely disable telemetry

Setting `ENABLE_TELEMETRY: false` in [`app.config.yaml`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/app.config.yaml) completely disables telemetry and removes instrumentation setup. If your custom code directly invokes telemetry APIs (such as `getInstrumentationHelpers()`) or relies on context propagation, you will encounter runtime errors like:

`Error: getInstrumentationHelpers has been called in a runtime action that has not telemetry enabled. Ensure the ENABLE_TELEMETRY environment variable is set to true. Otherwise, instrumentation will not work.`

To resolve this error, you must remove those calls and use alternative core logging utilities from [`@adobe/aio-sdk`](https://github.com/adobe/aio-sdk) instead.

---
title: Observability
description: Monitor and trace your checkout application with built-in observability tools
keywords:
  - Starter Kit
  - Extensibility
  - App Builder
---

# Observability

Monitor and trace your checkout application with built-in observability tools.

## OpenTelemetry Integration

This starter kit includes built-in observability using [`@adobe/aio-lib-telemetry`](https://github.com/adobe/aio-lib-telemetry), which provides OpenTelemetry instrumentation for App Builder actions.

### Overview

OpenTelemetry enables you to monitor and trace your checkout application's performance, helping you identify bottlenecks, debug issues, and understand how your actions interact with Adobe Commerce. The integration automatically collects metrics and traces for key checkout operations without requiring manual instrumentation.

### What's Included

The starter kit demonstrates telemetry instrumentation on webhook actions used in the checkout process. The following actions are instrumented:

- [collect-taxes](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/collect-taxes/index.js)
- [filter-payment](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/filter-payment/index.js)
- [shipping-methods](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/shipping-methods/index.js)
- [validate-payment](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/validate-payment/index.js)

These webhook actions serve as examples of how to implement telemetry in your own custom actions.

### Configuration

Telemetry is an optional feature controlled via the `ENABLE_TELEMETRY` environment variable in [`app.config.yaml`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/app.config.yaml). It's enabled by default for all checkout actions:

```yaml
actions:
  collect-taxes:
    inputs:
      ENABLE_TELEMETRY: true
```

The telemetry behavior and settings are configured in the [`actions/telemetry.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/telemetry.js) file, which provides centralized control over instrumentation, diagnostics, and export options. For more information about the `ENABLE_TELEMETRY` configuration, see the [OpenTelemetry configuration documentation](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/usage.md#configuration).

#### Viewing Telemetry Data

By default, diagnostics logging is disabled in the starter kit (`diagnostics: false` in [`actions/telemetry.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/telemetry.js)). This means telemetry data is collected but not automatically forwarded to an external collector.

If you want to view and analyze telemetry data, you'll need to configure a telemetry exporter and collector. The starter kit includes a commented-out example configuration in [`actions/telemetry.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/telemetry.js):

```javascript
const telemetryConfig = defineTelemetryConfig((params, isDev) => {
  return {
    sdkConfig: {
      serviceName: 'commerce-checkout-starter-kit',
      instrumentations: getPresetInstrumentations('simple'),
      resource: getAioRuntimeResource(),
      // ...localCollectorConfig(), // Uncomment and configure to export telemetry data
    },
    diagnostics: false, // Set to true if you want to enable diagnostic logs
  };
});
```

To enable telemetry data export and viewing:

1. Configure your preferred telemetry exporter in `actions/telemetry.js`
2. Set up a local or remote OpenTelemetry collector
3. Optionally enable diagnostics logging by setting `diagnostics: true` or providing detailed diagnostics configuration

For detailed instructions on configuring exporters and collectors, refer to the official documentation:

- [Export Data Guide](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/usage.md#exporting-data)
- [OpenTelemetry Collector Documentation](https://opentelemetry.io/docs/collector/)

### Advanced Configuration

The current telemetry configuration is centralized in `actions/telemetry.js` and serves as a sample implementation. For advanced use cases such as exporting collected data or additional configuration customizations, please refer to the official documentation:

- [OpenTelemetry Usage Guide](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/usage.md)
- [`@adobe/aio-lib-telemetry` API Reference](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/api.md)
- [OpenTelemetry Concepts](https://opentelemetry.io/docs/concepts/)
- [Export Data Guide](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/usage.md#exporting-data)

## Troubleshooting

### Connection Errors When Diagnostics Are Enabled

If you enable diagnostics logging and encounter connection errors like:

```text
error: {"stack":"AggregateError [ECONNREFUSED]: ...","errors":"Error: connect ECONNREFUSED ::1:4318,Error: connect ECONNREFUSED 127.0.0.1:4318","code":"ECONNREFUSED","name":"AggregateError"}
```

These errors occur when the telemetry export cannot reach the configured OTLP-compatible endpoint (such as Grafana, DataDog, New Relic, or an OpenTelemetry collector). For configuration examples, see the [use cases documentation](https://github.com/adobe/aio-lib-telemetry/tree/main/docs/use-cases). To resolve this:

- **Option 1**: Set `diagnostics: false` in [`actions/telemetry.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/telemetry.js) to disable diagnostic logging
- **Option 2**: Set up and run your OTLP-compatible service at the expected endpoint
- **Option 3**: Disable telemetry entirely by setting `ENABLE_TELEMETRY: false` in [`app.config.yaml`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/app.config.yaml) for specific action.

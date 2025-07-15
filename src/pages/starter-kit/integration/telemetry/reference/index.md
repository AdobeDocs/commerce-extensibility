---
title: Telemetry API reference
description: Reference for telemetry and observability functions in the integration starter kit.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Starter Kit
 - Tools
---

# Telemetry API reference

The API provided by the `@aio-lib-telemetry` library allows you to instrument your code, collect metrics and traces, and export telemetry data to your preferred observability platform.

## Available imports

These are all the imports you can get from this library when importing from `@adobe/aio-lib-telemetry`.

```ts
import {
  // Configuration
  defineTelemetryConfig,
  defineMetrics,

  // Configuration Helpers
  getAioRuntimeAttributes,
  getAioRuntimeResource,
  getAioRuntimeResourceWithAttributes,
  getPresetInstrumentations,

  // Tracing Helpers
  getActiveSpan,
  tryGetActiveSpan,
  addEventToActiveSpan,
  serializeContextIntoCarrier,
  deserializeContextFromCarrier,

  // Instrumentation
  instrument,
  instrumentEntrypoint,
  getInstrumentationHelpers,

  // Logging
  getLogger,

  // Global Telemetry API
  getGlobalTelemetryApi,
} from '@adobe/aio-lib-telemetry';
```

### OpenTelemetry API

OpenTelemetry features a modular architecture consisting of over 25 packages, which can make importing specific APIs rather complex. To streamline this process, our library offers a convenient metapackage import path, which allows you to import all the necessary OpenTelemetry APIs from a single source, simplifying the setup.

While this does not include every OpenTelemetry API, it covers the most common ones you will need in your code. If you find any essential APIs missing, open an issue or submit a PR in the [starter kit repository](https://github.com/adobe/commerce-integration-starter-kit). You can also import the APIs you need from the individual OpenTelemetry packages, but this is a convenient way to import all the APIs you need in a single import.

<InlineAlert variant="info" slots="text" />

When working with OpenTelemetry exporters, you have three protocols to choose from:

- OTLP/GRPC
- OTLP/HTTP
- OTLP/Proto

The official packages use the same class name for exporters across all protocols, which can make it difficult to pick the right one or get reliable auto-completion. To help with this, our library re-exports them with clear protocol suffixes, for example:

- `OTLPTraceExporter`
  - `@opentelemetry/exporter-trace-otlp-http` is now `OTLPTraceExporterHttp`
  - `@opentelemetry/exporter-trace-otlp-grpc` is now `OTLPTraceExporterGrpc`
  - `@opentelemetry/exporter-trace-otlp-proto` is now `OTLPTraceExporterProto`

Using them is the same as using the original class, but with a more predictable and consistent naming convention.

```ts
import {
  // Import all the OpenTelemetry APIs you need
  SimpleSpanProcessor,
  CompressionAlgorithm,
  OTLPTraceExporterProto,
  OTLPMetricExporterHttp,
  OTLPLogExporterGrpc,
  // ...
} from '@adobe/aio-lib-telemetry/otel';
```

## Interfaces

| Interface                        | Description                                                                       |
| -------------------------------- | --------------------------------------------------------------------------------- |
| [EntrypointInstrumentationConfig](./interfaces#entrypointinstrumentationconfig)  | The configuration for entry point instrumentation.                                 |
| [InstrumentationConfig](./interfaces#instrumentationconfig)            | The configuration for instrumentation.                                            |
| [InstrumentationContext](./interfaces#instrumentationcontext)           | The context for the current operation.                                            |
| [TelemetryApi](./interfaces#telemetryapi)                     | Defines the global telemetry API. These items should be set once per-application. |
| [TelemetryConfig](./interfaces#telemetryconfig)                  | The configuration options for the telemetry module.                               |
| [TelemetryDiagnosticsConfig](./interfaces#telemetrydiagnosticsconfig)       | The configuration for the telemetry diagnostics.                                  |
| [TelemetryPropagationConfig](./interfaces#telemetrypropagationconfig)       | Configuration related to context propagation (for distributed tracing).           |

## Type aliases

| Type Alias                      | Description                                             |
| ------------------------------- | ------------------------------------------------------- |
| [DiagnosticsLogLevel](./aliases#diagnosticsloglevel)             | Available log levels for the OpenTelemetry DiagLogger.  |
| [TelemetryInstrumentationPreset](./aliases#telemetryinstrumentationpreset)  | Defines the names of available instrumentation presets. |

## Functions

| Function                                | Description                                                                                                                                                                                                                                    |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [addEventToActiveSpan](./functions#addeventtoactivespan)                    | Adds an event to the given span.                                                                                                                                                                                                               |
| [defineMetrics](./functions#definemetrics)                           | Helper to define a record of metrics.                                                                                                                                                                                                          |
| [defineTelemetryConfig](./functions#definetelemetryconfig)                   | Helper to define the telemetry config for an entry point.                                                                                                                                                                                       |
| [deserializeContextFromCarrier](./functions#deserializecontextfromcarrier)           | Deserializes the context from a carrier and augments the given base context with it.                                                                                                                                                           |
| [getActiveSpan](./functions#getactivespan)                           | Gets the active span from the given context.                                                                                                                                                                                                   |
| [getAioRuntimeAttributes](./functions#getaioruntimeattributes)                 | Infers some useful attributes for the current action from the Adobe I/O Runtime and returns them as a record of key-value pairs.                                                                                                               |
| [getAioRuntimeResource](./functions#getaioruntimeresource)                   | Creates a [resource](https://open-telemetry.github.io/opentelemetry-js/interfaces/_opentelemetry_sdk-node.resources.Resource.html) from the attributes inferred from the Adobe I/O Runtime and returns it as an OpenTelemetry Resource object. |
| [getAioRuntimeResourceWithAttributes](./functions#getaioruntimeresourcewithattributes)     | Creates a [resource](https://open-telemetry.github.io/opentelemetry-js/interfaces/_opentelemetry_sdk-node.resources.Resource.html) that combines the attributes inferred from the Adobe I/O Runtime with the provided attributes.              |
| [getGlobalTelemetryApi](./functions#getglobaltelemetryapi)                   | Gets the global telemetry API.                                                                                                                                                                                                                 |
| [getInstrumentationHelpers](./functions#getinstrumentationhelpers)               | Access helpers for the current instrumented operation.                                                                                                                                                                                         |
| [getLogger](./functions#getlogger)                               | Get a logger instance.                                                                                                                                                                                                                         |
| [getPresetInstrumentations](./functions#getpresetinstrumentations)               | Get the instrumentations for a given preset.                                                                                                                                                                                                   |
| [instrument](./functions#instrument)                              | Instruments a function.                                                                                                                                                                                                                        |
| [instrumentEntrypoint](./functions#instrumententrypoint)                    | Instruments the entrypoint of a runtime action. Needs to be used ONLY with the `main` function of a runtime action.                                                                                                                            |
| [serializeContextIntoCarrier](./functions#serializecontextintocarrier)             | Serializes the current context into a carrier.                                                                                                                                                                                                 |
| [tryGetActiveSpan](./functions#trygetactivespan)                        | Tries to get the active span from the given context.                                                                                                                                                                                           |

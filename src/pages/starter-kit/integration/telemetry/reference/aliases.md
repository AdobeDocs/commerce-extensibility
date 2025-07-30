---
title: Telemetry API reference type aliases
description: Comprehensive reference for all telemetry API type aliases in the integration starter kit.
keywords:
  - Extensibility
  - App Builder
  - Events
  - Starter Kit
  - Tools
---

# Telemetry API type aliases

- [DiagnosticsLogLevel](#diagnosticsloglevel)
- [TelemetryInstrumentationPreset](#telemetryinstrumentationpreset)
- [types.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/types.ts)

## DiagnosticsLogLevel

```ts
type DiagnosticsLogLevel = Lowercase<keyof typeof DiagLogLevel>;
```

Available log levels for the OpenTelemetry DiagLogger.

**Defined in:** [types.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/types.ts)

## TelemetryInstrumentationPreset

```ts
type TelemetryInstrumentationPreset = "simple" | "full";
```

Defines the names of available instrumentation presets.

**Available Options:**

- `"simple"` - Basic instrumentations for HTTP, GraphQL, Undici, and Winston.
- `"full"` - All Node.js auto-instrumentations.

**Defined in:** [types.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/types.ts)

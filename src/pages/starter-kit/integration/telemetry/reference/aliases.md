---
title: Telemetry API Reference Type Aliases
description: Comprehensive reference for all telemetry API type aliases in the integration starter kit.
keywords:
  - Extensibility
  - App Builder
  - API Mesh
  - Events
  - REST
  - Starter Kit
  - Tools
---

# Telemetry API type aliases

- [DiagnosticsLogLevel](#diagnosticsloglevel)
- [TelemetryInstrumentationPreset](#telemetryinstrumentationpreset)

## DiagnosticsLogLevel

```ts
type DiagnosticsLogLevel = Lowercase<keyof typeof DiagLogLevel>;
```

Available log levels for the OpenTelemetry DiagLogger.

**Defined in:** [types.ts:30](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/types.ts#L30)

## TelemetryInstrumentationPreset

```ts
type TelemetryInstrumentationPreset = "simple" | "full";
```

Defines the names of available instrumentation presets.

**Available Options:**

- `"simple"` - Basic instrumentations for HTTP, GraphQL, Undici, and Winston
- `"full"` - All Node.js auto-instrumentations

**Defined in:** [types.ts:33](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/types.ts#L33)

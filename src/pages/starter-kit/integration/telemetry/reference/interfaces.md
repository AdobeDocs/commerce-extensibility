---
title: Telemetry API Reference Interfaces
description: Comprehensive reference for all telemetry API interfaces in the integration starter kit.
keywords:
  - Extensibility
  - App Builder
  - Events
  - Starter Kit
  - Tools
---

# Telemetry API interfaces

- [EntrypointInstrumentationConfig](#entrypointinstrumentationconfig)
- [InstrumentationConfig](#instrumentationconfig)
- [InstrumentationContext](#instrumentationcontext)
- [TelemetryApi](#telemetryapi)
- [TelemetryConfig](#telemetryconfig)
- [TelemetryDiagnosticsConfig](#telemetrydiagnosticsconfig)
- [TelemetryPropagationConfig](#telemetrypropagationconfig)

## EntrypointInstrumentationConfig

The configuration for entrypoint instrumentation.

**Extends:** [`InstrumentationConfig`](#instrumentationconfig)\<`T`\>

**Type Parameters:**

| Type Parameter              | Default type  |
| --------------------------- | ------------- |
| `T` _extends_ `AnyFunction` | `AnyFunction` |

**Properties:**

### initializeTelemetry()

```ts
initializeTelemetry: (params: RecursiveStringRecord, isDevelopment: boolean) =>
  TelemetryConfig;
```

This function is called at the start of the action.

**Parameters:**

| Parameter       | Type                    | Description                                        |
| --------------- | ----------------------- | -------------------------------------------------- |
| `params`        | `RecursiveStringRecord` | The parameters of the action.                      |
| `isDevelopment` | `boolean`               | Whether the action is running in development mode. |

**Returns:** [`TelemetryConfig`](#telemetryconfig)

### propagation?

```ts
optional propagation: TelemetryPropagationConfig<T>;
```

Configuration options related to context propagation. Refer to the [TelemetryPropagationConfig](#telemetrypropagationconfig) for the interface.

**Defined in:** [types.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/types.ts)

## InstrumentationConfig

The configuration for instrumentation.

**Extended by:** [`EntrypointInstrumentationConfig`](#entrypointinstrumentationconfig)

**Type Parameters:**

| Type Parameter              |
| --------------------------- |
| `T` _extends_ `AnyFunction` |

**Properties:**

### hooks?

```ts
optional hooks: {
  onError?: (error: unknown, span: Span) => undefined | Error;
  onResult?: (result: ReturnType<T>, span: Span) => void;
};
```

Hooks that can act on a span depending on the result of the function.

#### onError()?

```ts
optional onError: (error: unknown, span: Span) => undefined | Error;
```

A function that is called if the instrumented function fails. You can use it to do something with the span.

**Parameters:**

| Parameter | Type      | Description                                      |
| --------- | --------- | ------------------------------------------------ |
| `error`   | `unknown` | The error produced by the instrumented function. |
| `span`    | `Span`    | The span of the instrumented function.           |

**Returns:** `undefined` \| `Error`

#### onResult()?

```ts
optional onResult: (result: ReturnType<T>, span: Span) => void;
```

A function that is called with any result of the instrumented function, if there is no error. You can use it to do something with the span.

**Parameters:**

| Parameter | Type                | Description                              |
| --------- | ------------------- | ---------------------------------------- |
| `result`  | `ReturnType`\<`T`\> | The result of the instrumented function. |
| `span`    | `Span`              | The span of the instrumented function.   |

**Returns:** `void`

### isSuccessful()?

```ts
optional isSuccessful: (result: ReturnType<T>) => boolean;
```

A function that determines if the instrumented function was successful. By default, the function is considered successful if it does not throw an error.

**Parameters:**

| Parameter | Type                | Description                              |
| --------- | ------------------- | ---------------------------------------- |
| `result`  | `ReturnType`\<`T`\> | The result of the instrumented function. |

**Returns:** `boolean` - Whether the instrumented function was successful.

### spanConfig?

```ts
optional spanConfig: SpanOptions & {
  getBaseContext?: (...args: Parameters<T>) => Context;
  spanName?: string;
};
```

Configuration options related to the span started by the instrumented function. Refer to the [SpanOptions](https://open-telemetry.github.io/opentelemetry-js/interfaces/_opentelemetry_api._opentelemetry_api.SpanOptions.html) interface for more details.

#### getBaseContext()?

```ts
optional getBaseContext: (...args: Parameters<T>) => Context;
```

The base context to use for the started span.

**Parameters:**

| Parameter | Type                | Description                                 |
| --------- | ------------------- | ------------------------------------------- |
| ...`args` | `Parameters`\<`T`\> | The arguments of the instrumented function. |

**Returns:** `Context` - The base context to use for the started span.

#### spanName?

```ts
optional spanName: string;
```

The name of the span. Defaults to the name of given function. You must use a named function or a provide a name here.

**Defined in:** [types.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/types.ts)

## InstrumentationContext

The context for the current operation.

**Properties:**

### contextCarrier

```ts
contextCarrier: Record<string, string>;
```

Holds a carrier that can propagate the active context.

### currentSpan

```ts
currentSpan: Span;
```

The span of the current operation.

### logger

```ts
logger: AioLogger;
```

The logger for the current operation.

### meter

```ts
meter: Meter;
```

The global (managed by the library) meter instance used to create metrics.

### tracer

```ts
tracer: Tracer;
```

The global (managed by the library) tracer instance used to create spans.

**Defined in:** [types.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/types.ts)

## TelemetryApi

Defines the global telemetry API. These items should be set once per-application.

**Properties:**

### meter

```ts
meter: Meter;
```

The meter used to create metrics.

### tracer

```ts
tracer: Tracer;
```

The tracer used to create spans.

**Defined in:** [types.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/types.ts)

## TelemetryConfig

The configuration options for the telemetry module.

**Extends:** `Partial`\<[`TelemetryApi`](#telemetryapi)\>

**Properties:**

### diagnostics?

```ts
optional diagnostics: false | TelemetryDiagnosticsConfig;
```

The configuration options for the telemetry diagnostics.

### meter?

```ts
optional meter: Meter;
```

The meter used to create metrics.

**Inherited from:** `Partial.meter`

### sdkConfig

```ts
sdkConfig: Partial<NodeSDKConfiguration>;
```

The configuration options for the OpenTelemetry SDK. Refer to the [NodeSDKConfiguration](https://open-telemetry.github.io/opentelemetry-js/interfaces/_opentelemetry_sdk-node.NodeSDKConfiguration.html) interface for more details.

### tracer?

```ts
optional tracer: Tracer;
```

The tracer used to create spans.

**Inherited from:** `Partial.tracer`

**Defined in:** [types.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/types.ts)

## TelemetryDiagnosticsConfig

The configuration for the telemetry diagnostics.

**Properties:**

### exportLogs?

```ts
optional exportLogs: boolean;
```

Whether to make OpenTelemetry also export the diagnostic logs to the configured exporters. Set to `false` if you do not want to see diagnostic logs in your observability platform.

**Default:** `true`

### loggerName?

```ts
optional loggerName: string;
```

The name of the logger to use for the diagnostics.

**Default:** `${actionName}/otel-diagnostics`

### logLevel

```ts
logLevel: "info" | "error" | "none" | "warn" | "debug" | "verbose" | "all";
```

The log level to use for the diagnostics.

**Defined in:** [types.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/types.ts)

## TelemetryPropagationConfig

Configuration related to context propagation for distributed tracing.

**Type Parameters:**

| Type Parameter              |
| --------------------------- |
| `T` _extends_ `AnyFunction` |

**Properties:**

### getContextCarrier()?

```ts
optional getContextCarrier: (...args: Parameters<T>) => {
  baseCtx?: Context;
  carrier: Record<string, string>;
};
```

A function that returns the carrier for the current context. Use it to specify where your carrier is located in the incoming parameters, when it is not one of the defaults.

**Parameters:**

| Parameter | Type                | Description                                 |
| --------- | ------------------- | ------------------------------------------- |
| ...`args` | `Parameters`\<`T`\> | The arguments of the instrumented function. |

**Returns:**

```ts
{
  baseCtx?: Context;
  carrier: Record<string, string>;
}
```

The carrier of the context to retrieve and an optional base context to use for the started span (defaults to the active context).

#### baseCtx?

```ts
optional baseCtx: Context;
```

#### carrier

```ts
carrier: Record<string, string>;
```

### skip?

```ts
optional skip: boolean;
```

By default, an instrumented entrypoint will try to automatically read and use the context from the incoming request. Set to `true` if you want to skip this automatic context propagation.

**Default:** `false`

**Defined in:** [types.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/types.ts)

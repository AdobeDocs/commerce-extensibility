---
title: Telemetry API Reference Functions
description: Comprehensive reference for all telemetry API functions in the integration starter kit.
keywords:
  - Extensibility
  - App Builder
  - Events
  - Starter Kit
  - Tools
---

# Telemetry API functions

- [addEventToActiveSpan](#addeventtoactivespan)
- [defineMetrics](#definemetrics)
- [defineTelemetryConfig](#definetelemetryconfig)
- [deserializeContextFromCarrier](#deserializecontextfromcarrier)
- [getActiveSpan](#getactivespan)
- [getAioRuntimeAttributes](#getaioruntimeattributes)
- [getAioRuntimeResource](#getaioruntimeresource)
- [getAioRuntimeResourceWithAttributes](#getaioruntimeresourcewithattributes)
- [getGlobalTelemetryApi](#getglobaltelemetryapi)
- [getInstrumentationHelpers](#getinstrumentationhelpers)
- [getLogger](#getlogger)
- [getPresetInstrumentations](#getpresetinstrumentations)
- [instrument](#instrument)
- [instrumentEntrypoint](#instrumententrypoint)
- [serializeContextIntoCarrier](#serializecontextintocarrier)
- [tryGetActiveSpan](#trygetactivespan)

## addEventToActiveSpan

Adds an event to the given span.

```ts
function addEventToActiveSpan(event: string, attributes?: Attributes): void;
```

**Parameters:**

| Parameter     | Type         | Description                         |
| ------------- | ------------ | ----------------------------------- |
| `event`       | `string`     | The event name to add.              |
| `attributes?` | `Attributes` | The attributes to add to the event. |

**Returns:**

`void`

**Example:**

```ts
addEventToActiveSpan("my-event", { foo: "bar" });
```

**Defined in:** [api/global.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/api/global.ts)

## defineMetrics

Helper to define a record of metrics.

```ts
function defineMetrics<T>(createMetrics: (meter: Meter) => T): T;
```

**Type Parameters:**

| Type Parameter                                    |
| ------------------------------------------------- |
| `T` _extends_ `Record`\<`string`, `MetricTypes`\> |

**Parameters:**

| Parameter       | Type                      | Description                                                               |
| --------------- | ------------------------- | ------------------------------------------------------------------------- |
| `createMetrics` | (`meter`: `Meter`) => `T` | A function which receives a meter that can be used to create the metrics. |

**Returns:**

`T`

**Example:**

```ts
const metrics = defineMetrics((meter) => {
  return {
    myMetric: meter.createCounter("my-metric", { description: "My metric" }),
  };
});
```

**See:** https://opentelemetry.io/docs/concepts/signals/metrics/

**Defined in:** [core/config.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/core/config.ts)

## defineTelemetryConfig

Helper to define the telemetry configuration for an entrypoint.

```ts
function defineTelemetryConfig(
  init: (
    params: RecursiveStringRecord,
    isDevelopment: boolean,
  ) => TelemetryConfig,
): {
  initializeTelemetry: (
    params: RecursiveStringRecord,
    isDevelopment: boolean,
  ) => TelemetryConfig;
};
```

**Parameters:**

| Parameter | Type                                                                                                                     | Description                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| `init`    | (`params`: `RecursiveStringRecord`, `isDevelopment`: `boolean`) => [`TelemetryConfig`](./interfaces.md#telemetryconfig) | The function to initialize the telemetry. |

**Returns:**

```ts
{
  initializeTelemetry: (
    params: RecursiveStringRecord,
    isDevelopment: boolean,
  ) => TelemetryConfig;
}
```

**Defined in:** [core/config.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/core/config.ts)

## deserializeContextFromCarrier

Deserializes the context from a carrier and augments the given base context with it.

```ts
function deserializeContextFromCarrier<Carrier>(
  carrier: Carrier,
  baseCtx: Context,
): Context;
```

**Type Parameters:**

| Type Parameter                                     |
| -------------------------------------------------- |
| `Carrier` _extends_ `Record`\<`string`, `string`\> |

**Parameters:**

| Parameter | Type      | Description                                                  |
| --------- | --------- | ------------------------------------------------------------ |
| `carrier` | `Carrier` | The carrier object to extract the context from.              |
| `baseCtx` | `Context` | The base context to augment. Defaults to the active context. |

**Returns:**

`Context`

**Example:**

```ts
const carrier = { traceparent: "...00-069ea333a3d430..." };
const ctx = deserializeContextFromCarrier(carrier);
// ctx now contains the context data from the carrier
```

**Defined in:** [api/propagation.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/api/propagation.ts)

## getActiveSpan

Gets the active span from the given context.

```ts
function getActiveSpan(ctx: Context): Span;
```

**Parameters:**

| Parameter | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `ctx`     | `Context` | The context to get the span from. |

**Returns:**

`Span`

Returns an error if no span is found.

**Example:**

```ts
const span = getActiveSpan();
span.addEvent("my-event", { foo: "bar" });
```

**Defined in:** [api/global.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/api/global.ts)

## getAioRuntimeAttributes

Infers some useful attributes for the current action from the Adobe I/O Runtime and returns them as a record of key-value pairs.

```ts
function getAioRuntimeAttributes(): {
  action.activation_id: string;
  action.deadline?: string;
  action.namespace: string;
  action.package_name: string;
  action.transaction_id: string;
  deployment.cloud: string;
  deployment.environment: string;
  deployment.region: string;
  service.name: string;
  service.version: string;
};
```

**Returns:**

```ts
{
  action.activation_id: string;
  action.deadline?: string;
  action.namespace: string;
  action.package_name: string;
  action.transaction_id: string;
  deployment.cloud: string;
  deployment.environment: string;
  deployment.region: string;
  service.name: string;
  service.version: string;
}
```

**Example:**

```ts
const attributes = getAioRuntimeAttributes();
// attributes = { action.namespace: "my-namespace", action.name: "my-action", ... }
```

**Defined in:** [api/attributes.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/api/attributes.ts)

## getAioRuntimeResource

Creates a [resource](https://open-telemetry.github.io/opentelemetry-js/interfaces/_opentelemetry_sdk-node.resources.Resource.html) from the attributes inferred from the Adobe I/O Runtime and returns it as an OpenTelemetry Resource object.

```ts
function getAioRuntimeResource(): Resource;
```

**Returns:**

`Resource`

**Example:**

```ts
const resource = getAioRuntimeResource();
// use this resource in your OpenTelemetry configuration
```

**See:** https://opentelemetry.io/docs/languages/js/resources/

**Defined in:** [api/attributes.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/api/attributes.ts)

## getAioRuntimeResourceWithAttributes

Creates a [resource](https://open-telemetry.github.io/opentelemetry-js/interfaces/_opentelemetry_sdk-node.resources.Resource.html) that combines the attributes inferred from the Adobe I/O Runtime with the provided attributes.

```ts
function getAioRuntimeResourceWithAttributes(
  attributes: Record<string, string>,
): Resource;
```

**Parameters:**

| Parameter    | Type                           | Description                                                                        |
| ------------ | ------------------------------ | ---------------------------------------------------------------------------------- |
| `attributes` | `Record`\<`string`, `string`\> | The attributes to combine with the attributes inferred from the Adobe I/O Runtime. |

**Returns:**

`Resource`

**Example:**

```ts
const resource = getAioRuntimeResourceWithAttributes({ foo: "bar" });
// resource = { action.namespace: "my-namespace", action.name: "my-action", foo: "bar", ... }
// use this resource in your OpenTelemetry configuration
```

**See:** https://opentelemetry.io/docs/languages/js/resources/

**Defined in:** [api/attributes.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/api/attributes.ts)

## getGlobalTelemetryApi

Gets the global telemetry API.

```ts
function getGlobalTelemetryApi(): TelemetryApi;
```

**Returns:**

[`TelemetryApi`](./interfaces.md#telemetryapi)

Returns an error, if the telemetry API is not initialized.

**Example:**

```ts
function someNonAutoInstrumentedFunction() {
  const { tracer } = getGlobalTelemetryApi();
  return tracer.startActiveSpan("some-span", (span) => {
    // ...
  });
}
```

**Defined in:** [core/telemetry-api.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/core/telemetry-api.ts)

## getInstrumentationHelpers

Access helpers for the current instrumented operation.

```ts
function getInstrumentationHelpers(): InstrumentationContext;
```

**Returns:**

[`InstrumentationContext`](./interfaces.md#instrumentationcontext)

**Defined in:** [core/instrumentation.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/core/instrumentation.ts)

## getLogger

Get a logger instance.

```ts
function getLogger(name: string, config?: AioLoggerConfig): AioLogger;
```

**Parameters:**

| Parameter | Type              | Description                      |
| --------- | ----------------- | -------------------------------- |
| `name`    | `string`          | The name of the logger.           |
| `config?` | `AioLoggerConfig` | The configuration for the logger. |

**Returns:**

`AioLogger`

**Example:**

```ts
const logger = getLogger("my-logger", { level: "debug" });
logger.debug("Hello, world!");
```

**Defined in:** [core/logging.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/core/logging.ts)

## getPresetInstrumentations

Get the instrumentations for a given preset.

```ts
function getPresetInstrumentations(
  preset: TelemetryInstrumentationPreset,
):
  | (
      | HttpInstrumentation
      | GraphQLInstrumentation
      | UndiciInstrumentation
      | WinstonInstrumentation
    )[]
  | Instrumentation<InstrumentationConfig>[];
```

**Parameters:**

| Parameter | Type                                                                                  | Description                                 |
| --------- | ------------------------------------------------------------------------------------- | ------------------------------------------- |
| `preset`  | [`TelemetryInstrumentationPreset`](./aliases.md#telemetryinstrumentationpreset) | The preset to get instrumentations for. |

**Returns:**

| (
| `HttpInstrumentation`
| `GraphQLInstrumentation`
| `UndiciInstrumentation`
| `WinstonInstrumentation`)[]
| `Instrumentation`\<`InstrumentationConfig`\>[]

The instrumentations for the given preset:

- `full`: All the Node.js [auto-instrumentations](https://www.npmjs.com/package/@opentelemetry/auto-instrumentations-node)
- `simple`: Instrumentations for:
  - [Http](https://www.npmjs.com/package/@opentelemetry/instrumentation-http)
  - [GraphQL](https://www.npmjs.com/package/@opentelemetry/instrumentation-graphql)
  - [Undici](https://www.npmjs.com/package/@opentelemetry/instrumentation-undici)
  - [Winston](https://www.npmjs.com/package/@opentelemetry/instrumentation-winston)

**Example:**

```ts
const instrumentations = getPresetInstrumentations("simple");
// instrumentations = [HttpInstrumentation, GraphQLInstrumentation, UndiciInstrumentation, WinstonInstrumentation]
```

**Defined in:** [api/presets.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/api/presets.ts)

## instrument

Instruments a function.

```ts
function instrument<T>(
  fn: T,
  config: InstrumentationConfig<T>,
): (...args: Parameters<T>) => ReturnType<T>;
```

**Type Parameters:**

| Type Parameter              |
| --------------------------- |
| `T` _extends_ `AnyFunction` |

**Parameters:**

| Parameter | Type                                                                     | Description                                |
| --------- | ------------------------------------------------------------------------ | ------------------------------------------ |
| `fn`      | `T`                                                                      | The function to instrument.                |
| `config`  | [`InstrumentationConfig`](./interfaces.md#instrumentationconfig)\<`T`\> | The configuration for the instrumentation. |

**Returns:**

A wrapped function with the same signature as the original function, but with telemetry instrumentation.

```ts
(...args: Parameters<T>): ReturnType<T>;
```

**Example:**

```ts
const instrumentedFn = instrument(someFunction, {
  // Optional configuration
  spanConfig: {
    spanName: "some-span",
    attributes: {
      "some-attribute": "some-value",
    },
  },
});
```

**Defined in:** [core/instrumentation.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/core/instrumentation.ts)

## instrumentEntrypoint

Instruments the entrypoint of a runtime action. Only use with the `main` function of a runtime action.

```ts
function instrumentEntrypoint<T>(
  fn: T,
  config: EntrypointInstrumentationConfig<T>,
): (params: RecursiveStringRecord) => Promise<Awaited<ReturnType<T>>>;
```

**Type Parameters:**

| Type Parameter                                             |
| ---------------------------------------------------------- |
| `T` _extends_ (`params`: `RecursiveStringRecord`) => `any` |

**Parameters:**

| Parameter | Type                                                                                         | Description                                           |
| --------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `fn`      | `T`                                                                                          | The entrypoint function to instrument.                |
| `config`  | [`EntrypointInstrumentationConfig`](./interfaces.md#entrypointinstrumentationconfig)\<`T`\> | The configuration for the entrypoint instrumentation. |

**Returns:**

A wrapped function with the same signature as the original function, but with telemetry instrumentation.

```ts
(params: RecursiveStringRecord): Promise<Awaited<ReturnType<T>>>;
```

**Example:**

```ts
import { telemetryConfig } from "../telemetry";

const instrumentedEntrypoint = instrumentEntrypoint(main, {
  ...telemetryConfig,
  // Optional configuration
});
```

**Defined in:** [core/instrumentation.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/core/instrumentation.ts)

## serializeContextIntoCarrier

Serializes the current context into a carrier.

```ts
function serializeContextIntoCarrier<Carrier>(
  carrier?: Carrier,
  ctx?: Context,
): Carrier;
```

**Type Parameters:**

| Type Parameter                                     |
| -------------------------------------------------- |
| `Carrier` _extends_ `Record`\<`string`, `string`\> |

**Parameters:**

| Parameter  | Type      | Description                                               |
| ---------- | --------- | --------------------------------------------------------- |
| `carrier?` | `Carrier` | The carrier object to inject the context into.            |
| `ctx?`     | `Context` | The context to serialize. Defaults to the active context. |

**Returns:**

`Carrier`

**Examples:**

```ts
const carrier = serializeContextIntoCarrier();
// carrier is now a record with the context data
```

```ts
const myCarrier = { more: "data" };
const carrier = serializeContextIntoCarrier(myCarrier);
// carrier now contains both the existing data and the context data
// carrier = { more: 'data', ...contextData }
```

**Defined in:** [api/propagation.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/api/propagation.ts)

## tryGetActiveSpan

Tries to get the active span from the given context.

```ts
function tryGetActiveSpan(ctx: Context): null | Span;
```

**Parameters:**

| Parameter | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `ctx`     | `Context` | The context to get the span from. |

**Returns:**

`null` \| `Span`

**Example:**

```ts
const span = tryGetActiveSpan();
if (span) {
  span.addEvent("my-event", { foo: "bar" });
}
```

**Defined in:** [api/global.ts](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/source/api/global.ts)

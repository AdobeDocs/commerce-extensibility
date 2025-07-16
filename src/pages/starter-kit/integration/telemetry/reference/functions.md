---
title: Telemetry API Reference Functions
description: Comprehensive reference for all telemetry API functions in the integration starter kit.
keywords:
  - Extensibility
  - App Builder
  - API Mesh
  - Events
  - REST
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

```ts
function addEventToActiveSpan(event: string, attributes?: Attributes): void;
```

Adds an event to the given span.

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

**Defined in:** [api/global.ts:66](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/api/global.ts#L66)

## defineMetrics

```ts
function defineMetrics<T>(createMetrics: (meter: Meter) => T): T;
```

Helper to define a record of metrics.

**Type Parameters:**

| Type Parameter                                    |
| ------------------------------------------------- |
| `T` _extends_ `Record`\<`string`, `MetricTypes`\> |

**Parameters:**

| Parameter       | Type                      | Description                                                               |
| --------------- | ------------------------- | ------------------------------------------------------------------------- |
| `createMetrics` | (`meter`: `Meter`) => `T` | A function that receives a meter which can be used to create the metrics. |

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

**Defined in:** [core/config.ts:44](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/core/config.ts#L44)

## defineTelemetryConfig

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

Helper to define the telemetry config for an entrypoint.

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

**Defined in:** [core/config.ts:22](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/core/config.ts#L22)

## deserializeContextFromCarrier

```ts
function deserializeContextFromCarrier<Carrier>(
  carrier: Carrier,
  baseCtx: Context,
): Context;
```

Deserializes the context from a carrier and augments the given base context with it.

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

**Defined in:** [api/propagation.ts:55](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/api/propagation.ts#L55)

## getActiveSpan

```ts
function getActiveSpan(ctx: Context): Span;
```

Gets the active span from the given context.

**Parameters:**

| Parameter | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `ctx`     | `Context` | The context to get the span from. |

**Returns:**

`Span`

**Throws:**

An error if no span is found.

**Example:**

```ts
const span = getActiveSpan();
span.addEvent("my-event", { foo: "bar" });
```

**Defined in:** [api/global.ts:26](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/api/global.ts#L26)

## getAioRuntimeAttributes

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

Infers some useful attributes for the current action from the Adobe I/O Runtime and returns them as a record of key-value pairs.

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

**Defined in:** [api/attributes.ts:26](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/api/attributes.ts#L26)

## getAioRuntimeResource

```ts
function getAioRuntimeResource(): Resource;
```

Creates a [resource](https://open-telemetry.github.io/opentelemetry-js/interfaces/_opentelemetry_sdk-node.resources.Resource.html) from the attributes inferred from the Adobe I/O Runtime and returns it as an OpenTelemetry Resource object.

**Returns:**

`Resource`

**Example:**

```ts
const resource = getAioRuntimeResource();
// use this resource in your OpenTelemetry configuration
```

**See:** https://opentelemetry.io/docs/languages/js/resources/

**Defined in:** [api/attributes.ts:41](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/api/attributes.ts#L41)

## getAioRuntimeResourceWithAttributes

```ts
function getAioRuntimeResourceWithAttributes(
  attributes: Record<string, string>,
): Resource;
```

Creates a [resource](https://open-telemetry.github.io/opentelemetry-js/interfaces/_opentelemetry_sdk-node.resources.Resource.html) that combines the attributes inferred from the Adobe I/O Runtime with the provided attributes.

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

**Defined in:** [api/attributes.ts:58](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/api/attributes.ts#L58)

## getGlobalTelemetryApi

```ts
function getGlobalTelemetryApi(): TelemetryApi;
```

Gets the global telemetry API.

**Returns:**

[`TelemetryApi`](./interfaces.md#telemetryapi)

**Throws:**

If the telemetry API is not initialized.

**Example:**

```ts
function someNonAutoInstrumentedFunction() {
  const { tracer } = getGlobalTelemetryApi();
  return tracer.startActiveSpan("some-span", (span) => {
    // ...
  });
}
```

**Defined in:** [core/telemetry-api.ts:32](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/core/telemetry-api.ts#L32)

## getInstrumentationHelpers

```ts
function getInstrumentationHelpers(): InstrumentationContext;
```

Access helpers for the current instrumented operation.

**Returns:**

[`InstrumentationContext`](./interfaces.md#instrumentationcontext)

**Defined in:** [core/instrumentation.ts:61](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/core/instrumentation.ts#L61)

## getLogger

```ts
function getLogger(name: string, config?: AioLoggerConfig): AioLogger;
```

Get a logger instance.

**Parameters:**

| Parameter | Type              | Description                      |
| --------- | ----------------- | -------------------------------- |
| `name`    | `string`          | The name of the logger           |
| `config?` | `AioLoggerConfig` | The configuration for the logger |

**Returns:**

`AioLogger`

**Example:**

```ts
const logger = getLogger("my-logger", { level: "debug" });
logger.debug("Hello, world!");
```

**Defined in:** [core/logging.ts:81](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/core/logging.ts#L81)

## getPresetInstrumentations

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

Get the instrumentations for a given preset.

**Parameters:**

| Parameter | Type                                                                                  | Description                                 |
| --------- | ------------------------------------------------------------------------------------- | ------------------------------------------- |
| `preset`  | [`TelemetryInstrumentationPreset`](./aliases.md#telemetryinstrumentationpreset) | The preset to get the instrumentations for. |

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
  [Http](https://www.npmjs.com/package/@opentelemetry/instrumentation-http),
  [GraphQL](https://www.npmjs.com/package/@opentelemetry/instrumentation-graphql),
  [Undici](https://www.npmjs.com/package/@opentelemetry/instrumentation-undici), and
  [Winston](https://www.npmjs.com/package/@opentelemetry/instrumentation-winston)

**Example:**

```ts
const instrumentations = getPresetInstrumentations("simple");
// instrumentations = [HttpInstrumentation, GraphQLInstrumentation, UndiciInstrumentation, WinstonInstrumentation]
```

**Defined in:** [api/presets.ts:57](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/api/presets.ts#L57)

## instrument

```ts
function instrument<T>(
  fn: T,
  config: InstrumentationConfig<T>,
): (...args: Parameters<T>) => ReturnType<T>;
```

Instruments a function.

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

**Defined in:** [core/instrumentation.ts:91](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/core/instrumentation.ts#L91)

## instrumentEntrypoint

```ts
function instrumentEntrypoint<T>(
  fn: T,
  config: EntrypointInstrumentationConfig<T>,
): (params: RecursiveStringRecord) => Promise<Awaited<ReturnType<T>>>;
```

Instruments the entrypoint of a runtime action. Needs to be used ONLY with the `main` function of a runtime action.

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

**Defined in:** [core/instrumentation.ts:249](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/core/instrumentation.ts#L249)

## serializeContextIntoCarrier

```ts
function serializeContextIntoCarrier<Carrier>(
  carrier?: Carrier,
  ctx?: Context,
): Carrier;
```

Serializes the current context into a carrier.

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

**Defined in:** [api/propagation.ts:34](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/api/propagation.ts#L34)

## tryGetActiveSpan

```ts
function tryGetActiveSpan(ctx: Context): null | Span;
```

Tries to get the active span from the given context.

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

**Defined in:** [api/global.ts:47](https://github.com/adobe/commerce-integration-starter-kit/blob/6d4d9f7c629d2abc0e81fce4567de926c2bddb60/packages/aio-lib-telemetry/source/api/global.ts#L47)

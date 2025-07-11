---
title: Telemetry API Reference Functions
description: Comprehensive reference for all telemetry API functions in the integration starter kit.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Starter Ki
 - Tools
---

# Telemetry API functions

- [addEventToActiveSpan](#addeventtoactivespan)
- [defineMetrics](#definemetrics)
- [defineTelemetryConfig](#definetelemetryconfig)
- [deserializeContextFromCarrier](#deserializecontextfromcarrier)
- [getActiveSpan](#getactivespan)
- [getAioRuntimeAttributes](#getaioRuntimeattributes)
- [getAioRuntimeResource](#getaioRuntimeresource)
- [getAioRuntimeResourceWithAttributes](#getaioRuntimeresourcewithattributes)
- [getGlobalTelemetryApi](#getglobaltelemetryapi)
- [getInstrumentationHelpers](#getinstrumentationhelpers)
- [getLogger](#getlogger)
- [getPresetInstrumentations](#getpresetinstrumentations)
- [instrument](#instrument)
- [instrumentEntrypoint](#instrumententrypoint)
- [serializeContextIntoCarrier](#serializecontextintocarrier)
- [tryGetActiveSpan](#trygetactivespan)

## addEventToActiveSpan

`addEventToActiveSpan(eventName, attributes)`

Adds a custom event to the currently active span in the telemetry trace.

**Parameters:**

- `eventName` (string): The name of the event.
- `attributes` (object): Key-value pairs of event attributes.

**Returns:**

- void

## defineMetrics

`defineMetrics(metricsConfig)`

Defines custom metrics for telemetry collection.

**Parameters:**

- `metricsConfig` (object): Configuration object for metrics.

**Returns:**

- void

## defineTelemetryConfig

`defineTelemetryConfig(config)`

Defines the configuration for telemetry instrumentation and export.

**Parameters:**

- `config` (object): Telemetry configuration object.

**Returns:**

- void

## deserializeContextFromCarrier

`deserializeContextFromCarrier(carrier)`

Deserializes a telemetry context from a carrier object (such as HTTP headers).

**Parameters:**

- `carrier` (object): The carrier containing serialized context.

**Returns:**

- `context` (object): The deserialized telemetry context.

## getActiveSpan

`getActiveSpan()`

Returns the currently active telemetry span, if any.

**Returns:**

- `span` (object | undefined): The active span object, or undefined if none is active.

## getAioRuntimeAttributes

`getAioRuntimeAttributes()`

Returns runtime attributes for the current Adobe I/O Runtime environment.

**Returns:**

- `attributes` (object): Key-value pairs of runtime attributes.

## getAioRuntimeResource

`getAioRuntimeResource()`

Returns the resource descriptor for the current Adobe I/O Runtime environment.

**Returns:**

- `resource` (object): The resource descriptor object.

## getAioRuntimeResourceWithAttributes

`getAioRuntimeResourceWithAttributes()`

Returns the resource descriptor with additional runtime attributes for the current Adobe I/O Runtime environment.

**Returns:**

- `resource` (object): The resource descriptor object with attributes.

## getGlobalTelemetryApi

`getGlobalTelemetryApi()`

Returns the global telemetry API instance.

**Returns:**

- `api` (object): The global telemetry API instance.

## getInstrumentationHelpers

`getInstrumentationHelpers()`

Returns helper functions for telemetry instrumentation.

**Returns:**

- `helpers` (object): Helper functions for instrumentation.

## getLogger

`getLogger()`

Returns a logger instance for telemetry diagnostics.

**Returns:**

- `logger` (object): Logger instance for diagnostics.

## getPresetInstrumentations

`getPresetInstrumentations()`

Returns a list of preset instrumentations for telemetry.

**Returns:**

- `instrumentations` (array): List of preset instrumentations.

## instrumen

`instrument(target, options)`

Instruments a target (function, module, and more) for telemetry collection.

**Parameters:**

- `target` (any): The target to instrument.
- `options` (object): Instrumentation options.

**Returns:**

- void

## instrumentEntrypoin

`instrumentEntrypoint(entrypoint, options)`

Instruments an entry point (main function, handler, and more) for telemetry collection.

**Parameters:**

- `entrypoint` (function): The entry point function to instrument.
- `options` (object): Instrumentation options.

**Returns:**

- void

## serializeContextIntoCarrier

`serializeContextIntoCarrier(context, carrier)`

Serializes a telemetry context into a carrier object (such as HTTP headers).

**Parameters:**

- `context` (object): The telemetry context to serialize.
- `carrier` (object): The carrier to receive the serialized context.

**Returns:**

- void

## tryGetActiveSpan

`tryGetActiveSpan()`

Attempts to return the currently active telemetry span, if any.

**Returns:**

- `span` (object | undefined): The active span object, or undefined if none is active.

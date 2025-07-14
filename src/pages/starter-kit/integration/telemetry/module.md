---
title: Telemetry Module
description: Learn how to integrate observability into App Builder actions using the Adobe Commerce Integration Starter Kit telemetry module.
keywords:
  - Extensibility
  - App Builder
  - API Mesh
  - Events
  - REST
  - Starter Kit
  - Tools
---

# Telemetry module for Adobe DeveloperApp Builder actions

This module contains a set of utilities for integrating observability into App Builder actions. It leverages OpenTelemetry to enable developers to capture, export, and analyze traces, metrics and logs. You can use these tools to monitor action performance, diagnose issues, and gain insights into application behavior, without significant changes to your codebase.

<InlineAlert variant="info" slots="text" />

This module serves as a wrapper around the [OpenTelemetry SDK](https://opentelemetry.io/docs/languages/js/) for Node.js. It is not intended to be a full-fledged observability solution, but rather a tool to help you get started with OpenTelemetry and collect telemetry data in the context of Adobe App Builder runtime actions. It does not cover all the features of OpenTelemetry, but rather provides a simple and easy to use interface to get you started. For advanced use cases you will need to use the configuration options provided by this module to directly configure the underlying OpenTelemetry SDK, or use the OpenTelemetry SDK directly.

## Introduction

This guide assumes you have a basic understanding of OpenTelemetry and are familiar with its core concepts, as we will be referencing them throughout this document without detailed explanation. If you are not familiar with OpenTelemetry yet, refer to the [OpenTelemetry general overview](open-telemetry.md), which introduces the fundamental concepts and provides the context you need to begin understanding how OpenTelemetry (and this module) works.

<InlineAlert variant="info" slots="text" />

To understand how this library works, and the reasoning behind some of its design decisions, you must first understand the core concepts of OpenTelemetry. If you are new to the framework, we highly recommend reading the overview before continuing.

## Installation and setup

This library is written in TypeScript and distributed as a JavaScript bundle compatible with both CommonJS (CJS) and ECMAScript Modules (ESM) formats.

### Prerequisites

This library is designed for use within an [Adobe App Builder](https://developer.adobe.com/app-builder/docs/intro_and_overview/) runtime action. You will need:

- An [Adobe App Builder](https://developer.adobe.com/app-builder/docs/intro_and_overview/) project
- A package manager of your choice. The examples in this documentation use `npm`.
- A destination for your telemetry signals, such as [Grafana](./use-cases/grafana.md) or [New Relic](./use-cases/new-relic.md).

<InlineAlert variant="info" slots="text" />

Throughout this guide, we will distinguish between `development` and `production` environments. For context, deployed App Builder runtime actions do not differentiate between these environments. A deployed runtime action is always considered to be in `production`, regardless of the namespace. References to the `development` environment specifically refer to when you are **running your runtime actions locally** through `aio app dev`.

### Installing the module

<InlineAlert variant="warning" slots="text" />

This package is not yet published to the NPM Registry. After running `npm run build` in it, you can either: Copy the minified files from `dist/` and import them directly in your project, or install it as a [workspace package](https://docs.npmjs.com/cli/v11/using-npm/workspaces) in a monorepo using `npm install` as you would with any other package.

```bash
npm install @adobe/aio-lib-telemetry
```

## Configuration

This library uses the [Open Telemetry Node SDK](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-sdk-node).

<InlineAlert variant="info" slots="text" />

The Open Telemetry Node SDK remains experimental and under active development. Despite this status, it has proven reliable and complete for our production use cases. Across our integration and testing in App Builder actions, we have not observed any major gaps or operational issues affecting standard observability workflows.

The library is designed to configure OpenTelemetry on a **per-action basis**. You will not need to write your configuration multiple times, but you can if you need different telemetry configurations for specific actions.

### OpenTelemetry configuration

There are 2 different ways to configure Open Telemetry in Node.js:

- [Using environment variables](https://opentelemetry.io/docs/languages/sdk-configuration/) is currently not supported.
- At runtime, through the [Node SDK configuration](https://open-telemetry.github.io/opentelemetry-js/modules/_opentelemetry_sdk-node.html#configuration) object

#### Environment variables

<InlineAlert variant="warning" slots="text" />

This method is currently not supported. When searching for OpenTelemetry usage examples, you will find numerous tutorials demonstrating how to configure the SDK using environment variables. These variables are automatically processed by the SDK to configure its behavior. However, these variables need to be present in `process.env`, and due to how App Builder handles environment variables, which are fed through `params`.

#### Node SDK configuration

Use a Node SDK to configure OpenTelemetry with this library. You will need to provide a NodeSDK configuration object that will be passed directly to the `NodeSDK` constructor.

For detailed information about each configuration option, please refer to the [official OpenTelemetry documentation](https://opentelemetry.io/docs/languages/js/instrumentation/#initialize-the-sdk).

### Writing your telemetry configuration

This section focuses on general telemetry configuration rather than backend-specific setup. Since observability backends require different configurations, we have created dedicated guides for popular options. See the [use cases](use-cases/) section for links to detailed backend setup instructions.

Begin by creating a `telemetry.js` file (or `telemetry.ts` if using TypeScript). This file will export your global telemetry configuration, which will be shared across all instrumented runtime actions.

If a single configuration does not meet your requirements, you can export multiple configurations from this file or create separate configuration files and use them as needed.

```js
// telemetry.{js|ts}
import { defineTelemetryConfig, getPresetInstrumentations, getAioRuntimeResource } from "@adobe/aio-lib-telemetry"

// Use the `defineTelemetryConfig` helper to define your configuration.
// The given callback receives your `env` params and must return the OpenTelemetry config.
const telemetryConfig = defineTelemetryConfig((params, isDev) => {
  return {
    sdkConfig: {
      serviceName: "my-app-builder-app",
      instrumentations: getPresetInstrumentations("simple"),
      resource: getAioRuntimeResource(),
      // ... see other options in the OpenTelemetry documentation
    }
  }
});

export { telemetryConfig }
```

## Using the telemetry module

The following sections explain how to configure the telemetry module, write your own configuration, and instrument your App Builder actions for end-to-end observability.

### Setup

Once you have your telemetry configuration established, you can start instrumenting your runtime actions. The library provides two main helpers:

- `instrument`: For instrumenting individual functions within your codebase
- `instrumentEntrypoint`: For instrumenting the main function of your runtime action

```js
// actions/my-action/index.{js|ts}
import { instrumentEntrypoint } from "@adobe/aio-lib-telemetry"
import { telemetryConfig } from "./telemetry"

// Implementation of your main function
function main(params) {
  // Your action logic here
}

// Export the instrumented main function
export default instrumentEntrypoint(main, telemetryConfig)
```

### Traces

The library automatically creates spans for instrumented functions. You can access the current span and create custom spans using the tracer:

```js
import { instrument } from "@adobe/aio-lib-telemetry"

function myFunction() {
  // Your function logic here
}

// Instrument your function
const instrumentedFunction = instrument(myFunction, (helpers) => {
  const { currentSpan, tracer } = helpers;
  
  // Add attributes to the current span
  currentSpan.setAttribute("my-attribute", "my-value");
  
  // Create a child span
  const childSpan = tracer.startSpan("child-operation");
  childSpan.end();
});
```

### Logs

The library provides an auto-configured logger that integrates with your telemetry setup:

```js
import { instrument } from "@adobe/aio-lib-telemetry"

const instrumentedFunction = instrument(myFunction, (helpers) => {
  const { logger } = helpers;
  
  logger.info("This is an info message");
  logger.error("This is an error message");
});
```

### Metrics

You can create and use metrics through the meter instance:

```js
import { instrument } from "@adobe/aio-lib-telemetry"

const instrumentedFunction = instrument(myFunction, (helpers) => {
  const { meter } = helpers;
  
  // Create a counter
  const counter = meter.createCounter("my-counter");
  counter.add(1, { "attribute": "value" });
  
  // Create a histogram
  const histogram = meter.createHistogram("my-histogram");
  histogram.record(100, { "attribute": "value" });
});
```

### Instrumentation helpers

The instrumentation callback receives several helpers:

- `currentSpan`: The active span for the current operation
- `contextCarrier`: A pre-serialized carrier object for propagating trace context
- `tracer`: The global tracer instance for creating spans
- `meter`: The global meter instance for creating metrics
- `logger`: An auto-configured logger for the current operation

### Configuring a custom tracer and meter

The library automatically creates a default tracer and meter if none are provided alongside the `sdkConfig`. However, you can supply your own custom implementations if you need more specific functionality.

```js
// telemetry.{js|ts}
import { defineTelemetryConfig } from "@adobe/aio-lib-telemetry"
import { trace, metrics } from "@adobe/aio-lib-telemetry/otel"

const telemetryConfig = defineTelemetryConfig((params, isDev) => {
  const tracer = trace.getTracer("my-custom-tracer");
  const meter = metrics.getMeter("my-custom-meter");
  
  return {
    sdkConfig: {
      /* SDK Configuration */
    },
    tracer,
    meter
  }
});

export { telemetryConfig }
```

### Instrumentation configuration

In most cases, instrumenting your functions works seamlessly without additional configuration. However, certain scenarios may require further customization.

The `instrument` helper accepts an optional **second argument** that allows you to fine-tune the instrumentation:

```js
import { instrument } from "@adobe/aio-lib-telemetry"

function externalApiRequest() {
  /* ... */
}

instrument(externalApiRequest, {
  // Place instrumentation options here.
});
```

## Troubleshooting and known issues

If you experience any of these issues or any other expected behavior, [create an issue](https://github.com/adobe/commerce-integration-starter-kit/issues) in GitHub with the steps to reproduce the error, so we can investigate.

### Enabling OpenTelemetry diagnostics

OpenTelemetry includes an internal diagnostic logging API for troubleshooting configuration and instrumentation issues. When your OpenTelemetry setup is not behaving as expected, you can enable these `diagnostics` through your telemetry configuration:

```js
import { defineTelemetryConfig } from "@adobe/aio-lib-telemetry"

const telemetryConfig = defineTelemetryConfig((params, isDev) => {
  return {
    sdkConfig: {
      /* SDK Configuration */
    },
    diagnostics: {
      logLevel: "debug",
      // Optional properties.
      exportLogs: false, // Defaults to `true`
      loggerName: "otel-diag-logger" // Defaults to `${actionName}/otel-diagnostics`
    }
  }
});

export { telemetryConfig }
```

### Hot reloading

OpenTelemetry uses global state to manage its internal components. When developing locally with `aio app dev`, your code is hot-reloaded as you make changes. While this module handles the underlying OpenTelemetry SDK to work smoothly with hot reloading, it is possible that some edge cases may encounter issues.

### Telemetry signals not exporting

Due to the ephemeral nature of runtime actions, telemetry signals can occasionally fail to export before the container shuts down. While the module attempts to flush all signals when an action completes, certain edge cases can prevent this from occurring.

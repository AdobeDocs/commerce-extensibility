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

# Telemetry Module for App Builder Actions

This module contains a set of utilities for integrating observability into App Builder actions. It leverages OpenTelemetry to enable developers to capture, export, and analyze traces, metrics and logs. You can use these tools to monitor action performance, diagnose issues, and gain insights into application behavior, without significant changes to your codebase.

<InlineAlert variant="info" slots="text" />

Keep in mind that this is only a thin wrapper around the [OpenTelemetry SDK](https://opentelemetry.io/docs/languages/js/) for Node.js. It's not intended to be a full-fledged observability solution, but rather a tool to help you get started with OpenTelemetry and collect telemetry data in the context of Adobe App Builder runtime actions. It doesn't cover all the features of OpenTelemetry, but rather provides a simple and easy to use interface to get you started. For advanced use cases you'll need to use the configuration options provided by this module to directly configure the underlying OpenTelemetry SDK, or use the OpenTelemetry SDK directly.

## Introduction

This guide assumes you have a basic understanding of OpenTelemetry and are familiar with its core concepts, as we will be referencing them throughout this document without detailed explanation. If you're not familiar with OpenTelemetry yet, don't worry, we've put together a general overview to help you get started. It introduces the fundamental concepts and provides the context you need to begin understanding how OpenTelemetry (and this module) works.

The overview distills the most important OpenTelemetry concepts and patterns from the (quite extensive) official documentation. For topics not covered in the overview, you'll find links throughout this guide that point directly to relevant sections of the official OpenTelemetry documentation. Use these links to explore details or advanced topics as needed.

Find it here: [OpenTelemetry General Overview](open-telemetry.md)

<InlineAlert variant="info" slots="text" />

To understand how this library works (and the reasoning behind some of its design decisions) it's important to first grasp the core concepts of OpenTelemetry. If you're new to the framework, we highly recommend reading the overview before continuing.

## Installation and Setup

This library is written in TypeScript and distributed as a JavaScript bundle compatible with both ESM and CJS.

### Prerequisites

This library is designed for use within an [Adobe App Builder](https://developer.adobe.com/app-builder/docs/intro_and_overview/) runtime action, as it expects to find relevant information in the environment. You'll need:

- An [Adobe App Builder](https://developer.adobe.com/app-builder/docs/intro_and_overview/) project
- A package manager of your choice (we'll use `npm` in our code examples)
- A destination for your telemetry signals (we'll guide you through available options and setup)

<InlineAlert variant="info" slots="text" />

Throughout this guide, we will occasionally distinguish between `development` and `production` environments. For context, deployed App Builder runtime actions do not differentiate between these environments (a deployed runtime action is always considered to be in `production`, regardless of the namespace). When we refer to the `development` environment, we are specifically referring to when you're **running your runtime actions locally** through `aio app dev`.

### Installing the Module

<InlineAlert variant="warning" slots="text" />

This package is not yet published to the NPM Registry. After running `npm run build` in it, you can either: Copy the minified files from `dist/` and import them directly in your project, or install it as a [workspace package](https://docs.npmjs.com/cli/v11/using-npm/workspaces) in a monorepo using `npm install` as you would with any other package.

```bash
npm install @adobe/aio-lib-telemetry
```

## Configuration

This library uses the [Open Telemetry Node SDK](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-sdk-node).

<InlineAlert variant="info" slots="text" />

The Open Telemetry Node SDK remains experimental and under active development. Despite this status, it has proven reliable and complete for our production use cases. Across our integration and testing in App Builder actions, we have not observed any major gaps or operational issues affecting standard observability workflows.

The library is designed to configure OpenTelemetry on a **per-action basis**, but don't worry, you won't need to write your configuration multiple times (though you can if you need different telemetry configurations for specific actions).

### Open Telemetry Configuration

There are 2 different ways to configure Open Telemetry in Node.js:

- [Using environment variables](https://opentelemetry.io/docs/languages/sdk-configuration/) (currently not supported)
- At runtime, through the [Node SDK configuration](https://open-telemetry.github.io/opentelemetry-js/modules/_opentelemetry_sdk-node.html#configuration) object

#### Environment Variables

<InlineAlert variant="warning" slots="text" />

This method is currently not supported. When searching for OpenTelemetry usage examples, you'll find numerous tutorials demonstrating how to configure the SDK using environment variables. These variables are automatically processed by the SDK to configure its behavior. However, these variables need to be present in `process.env`, and due to how App Builder handles environment variables (fed through `params`), this configuration method is currently not supported.

#### Node SDK Configuration

This is the currently supported method for configuring OpenTelemetry with this library. You'll need to provide a NodeSDK configuration object that will be passed directly to the `NodeSDK` constructor.

For detailed information about each configuration option, please refer to the [official OpenTelemetry documentation](https://opentelemetry.io/docs/languages/js/instrumentation/#initialize-the-sdk).

### Writing your Telemetry Configuration

Before you start using this library you need to configure it.

<InlineAlert variant="info" slots="text" />

This section focuses on general telemetry configuration rather than backend-specific setup. Since observability backends require different configurations, we've created dedicated guides for popular options. See the [use cases](use-cases/) section for links to detailed backend setup instructions.

Begin by creating a `telemetry.js` file (or `telemetry.ts` if using TypeScript). This file will export your global telemetry configuration, which will be shared across all instrumented runtime actions.

If a single configuration doesn't meet your requirements, you can export multiple configurations from this file (or create separate configuration files) and use them as needed.

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

## How to Use

### Setup

Once you have your telemetry configuration, you can start instrumenting your runtime actions. The library provides two main helpers:

- `instrumentEntrypoint`: For instrumenting the main function of your runtime action
- `instrument`: For instrumenting individual functions within your codebase

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

### Instrumentation Helpers

The instrumentation callback receives several helpers:

- `currentSpan`: The active span for the current operation
- `contextCarrier`: A pre-serialized carrier object for propagating trace context
- `tracer`: The global tracer instance for creating spans
- `meter`: The global meter instance for creating metrics
- `logger`: An auto-configured logger for the current operation

## Advanced Usage

### Configuring a Custom Tracer and Meter

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

### Instrumentation Configuration

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

## Troubleshooting

### Enabling OpenTelemetry Diagnostics

OpenTelemetry includes an internal diagnostic logging API for troubleshooting configuration and instrumentation issues. When your OpenTelemetry setup isn't behaving as expected, you can enable these `diagnostics` through your telemetry configuration:

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

### Known Issues

#### Hot Reloading

OpenTelemetry uses global state to manage its internal components. When developing locally with `aio app dev`, your code is hot-reloaded as you make changes. While this module handles the underlying OpenTelemetry SDK to work smoothly with hot-reloading, there might be some edge cases we haven't encountered or tested yet.

If you notice any unexpected behavior, please file a GitHub issue with reproduction steps so we can investigate and improve the module. As a temporary solution, you can restart the development server to start fresh.

#### Telemetry Signals Not Being Exported

Due to the ephemeral nature of runtime actions, telemetry signals may occasionally fail to export before the container shuts down. While the module attempts to flush all signals when an action completes, certain edge cases can prevent this from occurring.

If you experience this issue, please file a GitHub issue with reproduction steps so we can address it.

## Resources

- [OpenTelemetry General Overview](open-telemetry.md)
- [Use Cases](use-cases/)
- [Reference Documentation](reference/index.md)

*Source: [Adobe Commerce Integration Starter Kit Telemetry Module](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/README.md)* 
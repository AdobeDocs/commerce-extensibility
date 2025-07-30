---
title: Telemetry integration overview
description: Learn about the telemetry and observability features in the integration starter kit, including OpenTelemetry support and usage patterns.
keywords:
  - Extensibility
  - App Builder
  - API Mesh
  - Events
  - REST
  - Starter Kit
  - Tools
---

# Telemetry integration overview

The integration starter kit provides built-in support for telemetry and observability using OpenTelemetry standards. This enables you to collect, export, and analyze metrics and traces from your integration flows, making it easier to monitor, troubleshoot, and optimize your integrations.

## Features

- **Automatic instrumentation** for serverless actions
- **Custom metrics and traces** for business and technical events
- **Pluggable exporters** such as Grafana and New Relic
- **Context propagation** across distributed systems
- **Developer-friendly API** for adding custom telemetry

## Getting started

1. Review the [API reference](./reference/index.md) for available telemetry functions.
1. See [use cases](./use-cases/) for practical examples, such as Grafana and New Relic instrumentation.
1. Explore [OpenTelemetry concepts](./open-telemetry.md) for background and best practices.

## Why use telemetry?

Telemetry provides visibility into your integration flows, helping you:

- Detect and diagnose issues quickly
- Measure performance and reliability
- Gain insights into business processes
- Meet compliance and operational requirements

## Integrating OpenTelemetry

The integration starter kit has the `@adobe/aio-lib-telemetry` package pre-installed as a local, non-published dependency in the `packages` folder. This library makes it easy to instrument your App Builder actions using OpenTelemetry, enabling you to collect and export:

- **Traces** (with distributed tracing support)
- **Metrics** (for monitoring)
- **Logs** (for debugging)

For detailed guides and examples, see the [telemetry module documentation](./module.md).

### Example integration

<InlineAlert variant="info" slots="text" />

For detailed integration instructions, refer to the [Using the telemetry module](./module.md#using-the-telemetry-module) section in the module documentation.

The starter kit demonstrates telemetry integration in the `actions/customer/commerce` workflow, specifically in the `consumer` and `created` actions. These examples use:

- Telemetry configuration: [`actions/telemetry.js`](https://github.com/adobe/commerce-integration-starter-kit/blob/main/actions/telemetry.js)
- Metrics definitions: [`actions/customer/commerce/metrics.js`](https://github.com/adobe/commerce-integration-starter-kit/blob/main/actions/customer/commerce/metrics.js)

**Key points:**

- Instrumentation is minimally invasive and does not disrupt existing logic.
- Telemetry is opt-in:  
  - Instrument each runtime action individually.
  - Configure exporters in [`telemetry.js`](https://github.com/adobe/commerce-integration-starter-kit/blob/main/actions/telemetry.js).
  - Set the `ENABLE_TELEMETRY` environment variable to `true` in each action's `inputs` section.
- To fully enable telemetry, complete your configuration in [`telemetry.js`](https://github.com/adobe/commerce-integration-starter-kit/blob/main/actions/telemetry.js).

The provided integration supports all three OpenTelemetry signals, **traces**, **metrics**, and **logs**, and enables automatic context propagation. For example, triggering the `consumer` action will generate a unified trace that spans the entire execution flow, including any instrumented downstream actions like `created`.

### Running a local telemetry stack

A ready-to-use Docker Compose setup is included for running a local telemetry stack, refer to the [Grafana use case](https://github.com/adobe/commerce-integration-starter-kit/blob/main/packages/aio-lib-telemetry/docs/use-cases/grafana.md) for more information.

To start the stack, run:

```bash
docker-compose up
```

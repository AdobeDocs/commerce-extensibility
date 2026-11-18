---
title: OpenTelemetry integration
description: Monitor and trace your checkout apps with built-in observability tools
keywords:
  - Starter Kit
  - Extensibility
  - App Management
---

# OpenTelemetry integration

Each checkout starter kit app uses [`@adobe/aio-lib-telemetry`](https://github.com/adobe/aio-lib-telemetry) to instrument its runtime actions with OpenTelemetry, so you can monitor and trace the app's performance, identify bottlenecks, and understand how its actions interact with Adobe Commerce.

Telemetry is optional and configurable per app: you can enable or disable instrumentation for an action, and configure exporters to forward logs, traces, and metrics to any OTLP-compatible service, such as a collector, Grafana, Datadog, or New Relic. By default, no telemetry data leaves the app until you configure exporters.

For the full configuration reference, including exporter setup, diagnostics, and troubleshooting, refer to the [`@adobe/aio-lib-telemetry` documentation](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/usage.md).

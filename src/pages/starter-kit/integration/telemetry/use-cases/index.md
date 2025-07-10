---
title: Instrument App Builder Apps with OpenTelemetry
description: Documentation providing guides for setting up observability for your App Builder apps using various tools and approaches.
keywords:
  - Extensibility
  - App Builder
  - API Mesh
  - Events
  - REST
  - Starter Kit
  - Tools
---

# Instrument App Builder Apps with OpenTelemetry

This documentation provides guides for setting up observability for your App Builder apps, using various tools and approaches.

<InlineAlert variant="info" slots="text" />

The guides presented here are **example use cases** demonstrating different ways to integrate observability into your App Builder applications. They are not intended as authoritative or one-size-fits-all solutions. Instead, they showcase various possible approaches you can adapt, modify, or combine to fit your specific requirements, infrastructure, and observability goals.

- [Instrument App Builder Apps with OpenTelemetry](#instrument-app-builder-apps-with-opentelemetry)
  - [Use Cases](#use-cases)
  - [Supporting Guides](#supporting-guides)

## Use Cases

Below is a summary table of the documented use cases. Key terms:

- `Local Development`: Runtime actions executed locally using `aio app dev`

- `In Cloud`: Runtime actions deployed to the cloud through `aio app deploy`
  - A `Through Tunneling` indicator shows that the guide demonstrates forwarding telemetry from deployed actions to a local observability stack. This is just one possible approach, you're not required to use tunneling (especially not in production). For instance, with hosted solutions like Grafana, you can configure direct data transmission instead.

| Guide | Method | Protocol | Signals | Local Development | In Cloud |
|-------|--------|----------|---------|-------------------|----------|
| [**Grafana (Tempo, Loki, Prometheus)**](./grafana.md) | OpenTelemetry Collector | HTTP/Protobuf | Traces, Metrics, Logs | Covered ✅ | Through Tunneling ⚠️ |
| [**New Relic**](./new-relic.md) | Direct Export | HTTP/Protobuf | Traces, Metrics, Logs | Covered ✅ | Covered ✅ |

## Supporting Guides

These guides provide additional technical details and setup instructions that complement the main observability guides above.

| Guide | Purpose | Use Case |
|-------|---------|----------|
| [**Tunneling for Local Observability**](../tunnel-forwarding.md) | Forward telemetry from deployed actions to local tools | Development/Testing ⚠️ |
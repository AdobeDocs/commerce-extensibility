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

# Instrument App Builder apps

The use cases pages explain how to set up observability for your App Builder apps, using different tools and approaches.

<InlineAlert variant="info" slots="text" />

These **example use cases** demonstrate different ways to integrate observability into your App Builder applications. They are not intended as authoritative or one-size-fits-all solutions. Instead, they showcase various possible approaches you can adapt, modify, or combine to fit your specific requirements, infrastructure, and observability goals.

## Use cases

The following table is a summary of the documented use cases.

| Guide | Method | Protocol | Signals | Local Development | In Cloud |
|-------|--------|----------|---------|-------------------|----------|
| [**Grafana (Tempo, Loki, Prometheus)**](./grafana.md) | OpenTelemetry Collector | HTTP/Protobuf | Traces, Metrics, Logs | Covered ✅ | Through Tunneling ⚠️ |
| [**New Relic**](./new-relic.md) | Direct Export | HTTP/Protobuf | Traces, Metrics, Logs | Covered ✅ | Covered ✅ |

The preceding table uses the following key terms:

- `Local Development`: Runtime actions executed locally using `aio app dev`
- `In Cloud`: Runtime actions deployed to the cloud through `aio app deploy`
  - `Through Tunneling` indicates that the guide demonstrates forwarding telemetry from deployed actions to a local observability stack. This is one possible approach, you are not required to use tunneling, which is not recommended in production. For example, with hosted solutions like Grafana, you can configure direct data transmission instead.

## Supporting guides

For more information on ancillary topics to complement your observability configuration, see the following:

| Guide | Purpose | Use Case |
|-------|---------|----------|
| [**Tunneling for Local Observability**](../tunnel-forwarding.md) | Forward telemetry from deployed actions to local tools | Development/Testing ⚠️ |

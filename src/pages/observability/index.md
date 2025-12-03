---
title: Observability overview
description: A curated collection of the most important OpenTelemetry concepts and patterns for App Builder applications.
keywords:
  - Extensibility
  - App Builder
  - Events
  - Starter Kit
  - Tools
  - Observability
  - OpenTelemetry
  - Webhooks
---

# Observability overview

Observability is a critical aspect of modern application development and operations, enabling merchants to monitor, analyze, and optimize the performance and reliability of Adobe Commerce and all installed App Builder apps. Observability encompasses the collection, processing, and visualization of telemetry data, including:

**Metrics**: Metrics provide insight to system health. They track quantitative data that measure real-time and historical performance data of applications and infrastructure, allowing for trend analysis and forecasting. Examples include API response times, request and error rates, and resource utilization.

**Logging**: The centralized collection of logs from application, infrastructure, CDN, and integrations.

**Tracing**: Traces can track the flow of a request from the frontend to Commerce and the apps installed on the system. They help pinpoint bottlenecks and failures. For example, a trace might show how a user request travels through different microservices.

By implementing robust observability practices, developers and operators can gain deep insights into application behavior, quickly identify and resolve issues, and ensure optimal user experiences.

In traditional in-process implementations of Adobe Commerce, merchants automatically have access to New Relic, and merchants can [configure observability](https://experienceleague.adobe.com/en/docs/commerce-operations/tools/observation-for-adobe-commerce/intro) to monitor all types of Commerce processes. This is possible because all processes are executing within Commerce.

However, Adobe Commerce as a Cloud Service introduces additional complexity through its composable architecture and out-of-process extensibility model:

* **Distributed architecture**: With App Builder applications running as separate microservices, telemetry data is now scattered across multiple systems and endpoints rather than centralized within Commerce.

* **Multiple data sources**: Merchants must collect and correlate observability data from:

   * The core Commerce application
   * Multiple App Builder applications
   * Third-party integrations
   * API Mesh (if implemented)
   * Event-driven workflows

* **Cross-service tracing**: Understanding the full request flow requires distributed tracing capabilities to follow requests as they traverse from Commerce through various App Builder applications and back.

* **Varied technology stacks**: Different App Builder applications may use different runtime environments, programming languages, and logging frameworks, requiring a standardized approach to telemetry collection.

* **Independent deployment cycles**: Since App Builder applications are deployed independently from Commerce, monitoring and debugging issues requires visibility across separately managed systems.

On premises and Adobe Commerce on Cloud (PaaS) customers also face increased complexity in that their App Builder apps need to be monitored alongside their core Commerce installation.

To handle this complexity, Adobe Commerce as a Cloud Service leverages [OpenTelemetry](https://opentelemetry.io/docs/), an open-source observability framework that provides standardized APIs and SDKs for collecting telemetry data across distributed systems. OpenTelemetry enables consistent observability practices across the following components of the Adobe Commerce ecosystem:

* Eventing
* Webhooks
* App Builder applications
* Integration and checkout starter kits

## OpenTelemetry overview

OpenTelemetry is a vendor-neutral open-source observability framework that provides standardized APIs, libraries, agents, and instrumentation to collect telemetry data (metrics, logs, and traces) from applications and their supporting infrastructure. It is a collaborative project under the Cloud Native Computing Foundation (CNCF) and is widely adopted across the industry.

One of OpenTelemetry's key advantages is its vendor-neutral design, which allows telemetry data to be exported to a wide range of observability platforms and analysis tools. Organizations can send their metrics, logs, and traces to popular services such as New Relic, Splunk, Prometheus, Datadog, and many others through standardized exporters. This flexibility enables merchants to choose the observability backend that best fits their needs without being locked into a specific vendor, and allows for easy migration between platforms if requirements change. OpenTelemetry's standardized data format ensures compatibility across different tools, making it possible to use multiple observability platforms simultaneously or switch between them with minimal code changes.

The following diagram illustrates the high-level architecture of observability is implemented in Adobe Commerce as a Cloud Service and PaaS instances that implement App Builder apps. It shows key components and how they interact to provide comprehensive observability.

![Flowchart](../_images/observability/observability.png)

---
title: Observability overview
description: A curated collection of the most important OpenTelemetry concepts and patterns for App Builder applications.
keywords:
  - Extensibility
  - App Builder
  - Events
  - Starter Kit
  - Tools
---

# Observability overview

Observability is a critical aspect of modern application development and operations, enabling merchants to monitor, analyze, and optimize the performance and reliability of Adobe Commerce and all installed App Builder apps. Observability encompasses the collection, processing, and visualization of telemetry data, including:

* **Metrics**: Track real-time and historical performance data (e.g., API response times, throughput, SLOs).

* **Logging**: Centralized collection of logs from application, infrastructure, CDN, and integrations.

* **Tracing**: Distributed traceability of requests across services to pinpoint bottlenecks or failures.

By implementing robust observability practices, developers and operators can gain deep insights into application behavior, quickly identify and resolve issues, and ensure optimal user experiences.

In traditional in-process implementations of Adobe Commerce, merchants automatically have access to New Relic, and merchants can [configure observability](https://experienceleague.adobe.com/en/docs/commerce-operations/tools/observation-for-adobe-commerce/intro) to monitor all types of Commerce processes. This is possible because all processes are executing within Commerce.

However, Adobe Commerce as a Cloud Service introduces additional complexity through its composable architecture and out-of-process extensibility model:

1. **Distributed architecture**: With App Builder applications running as separate microservices, telemetry data is now scattered across multiple systems and endpoints rather than centralized within Commerce.

1. **Multiple data sources**: Merchants must collect and correlate observability data from:

   * The core Commerce application
   * Multiple App Builder applications
   * Third-party integrations
   * API Mesh (if implemented)
   * Event-driven workflows

1. **Cross-service tracing**: Understanding the full request flow requires distributed tracing capabilities to follow requests as they traverse from Commerce through various App Builder applications and back.

1. **Varied technology stacks**: Different App Builder applications may use different runtime environments, programming languages, and logging frameworks, requiring a standardized approach to telemetry collection.

1. **Independent deployment cycles**: Since App Builder applications are deployed independently from Commerce, monitoring and debugging issues requires visibility across separately managed systems.

To handle this complexity, Adobe Commerce as a Cloud Service leverages OpenTelemetry, an open-source observability framework that provides standardized APIs and SDKs for collecting telemetry data across distributed systems. OpenTelemetry enables consistent observability practices across all components of the Adobe Commerce ecosystem, regardless of language or platform.

## OpenTelemetry overview

![Flowchart](../_images/observability/observability-flow.svg)

This overview serves as a curated collection of the most important concepts and patterns from the official [OpenTelemetry documentation](https://opentelemetry.io/docs/) to help you understand how to implement observability in your App Builder applications.

 achieved through various tools and techniques, including:
When issues arise, it can be time-consuming to pinpoint where the issue is rooted and have the knowledge to fix it. The Adobe support organization has accumulated tribal knowledge built on years of looking at logs and command line outputs while troubleshooting issues. The tool leverages such knowledge to identify important signals against a common timeline. The timeline can be expanded or contracted, allowing you to visualize your log data to help with performance management and issue resolution.

Using Observation for Adobe Commerce, you can analyze complex problems encountered by support to help identify root causes. Instead of tracking disparate data, you can spend your time correlating events and errors to gain deep insights into the causes of performance bottlenecks. The tool is intended to give a clearer view of some of the problems experienced by sites to help you identify potential root causes of problems and keep your sites performing optimally. This includes identifying if and what bots are causing site problems.

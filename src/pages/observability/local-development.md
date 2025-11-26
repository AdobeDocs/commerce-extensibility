---
title: Local development and testing
description: Adobe Commerce observability
keywords:
  - Extensibility
---

# Local development and testing

You can run observability locally to test Commerce extensibility tools and their connection to App Builder. Refer to the [how to run Grafana locally](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/use-cases/grafana.md#local-development) example for more information.

You can use a tunneling service to forward observability data to your local development machine from the Commerce instance and deployed App Builder action. For example, you can use [Ngrok](https://ngrok.com/) to expose your local development environment to the internet. For more information, refer to [tunnel forwarding](https://github.com/adobe/aio-lib-telemetry/blob/main/docs/use-cases/support/tunnel-forwarding.md).

![Grafana logs](../_images/observability/grafana-all-logs.png)

To filter logs for a single request you can use the `trace_id` filter. The `trace_id` is propagated from Commerce to App Builder. Use the `trace_id` to correlate logs from both systems.

![Grafana filtered logs](../_images/observability/grafana-filtered-logs.png)

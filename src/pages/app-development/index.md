---
title: Extensibility in Adobe Commerce
description: Learn about in-process, out-of-process, and hybrid extensibility
contributor_name: Comwrap Reply GmbH
contributor_link: https://www.comwrap.com
keywords:
  - App Builder
  - Extensibility
---

# Extensibility in Adobe Commerce

Adobe Commerce is known for its flexibility and extensibility, allowing businesses to adapt their e-commerce platforms to their unique needs. With the evolving demands of e-commerce, Adobe Commerce offers various methods for extending its capabilities. These methods can be broadly categorized into **in-process, out-of-process, and hybrid** extensibility. Each approach has its own set of advantages and use cases, and understanding them is crucial for developers and businesses looking to maximize their platform's potential.

## In-process extensibility

In-process extensibility refers to the method where custom code or extensions run within the same process as the core Adobe Commerce application. This is the traditional and most commonly used approach for extending Adobe Commerce functionalities.

The advantages of this approach include:

* **Performance** - Since the custom code runs within the same process, it can directly interact with the core application, resulting in lower latency and faster execution times.
* **Simplicity** - In-process extensions are typically easier to develop and deploy, as they leverage the existing infrastructure and codebase.
* **Access to Core Functions** - Developers have direct access to the core functions and data structures of Adobe Commerce, allowing for deep customization.

The in-process model has some considerations that you must account for:

* **Resource contention**. Extensions share the same resources (CPU, memory) with the core application. Performance bottlenecks can be a result if these resources are not managed properly.
* **Stability**. Poorly written extensions can potentially destabilize the entire application. It is crucial to perform extensive testing to ensure this doesn't happen.

In addition, Adobe Commerce has some functionality that you should not extend or build out-of-process:

* Creating new blocks and components for native Adobe Commerce (Luma, Base) templates.
* Modifying existing objects, such as customers, orders, and products.

### Use cases

Developers have long used in-process extensibility solutions to provide additional functionality, such as the following:

* **Customize the default checkout process** - Using in-process extensibility to modify the default checkout workflow allows for seamless integration with the core Adobe Commerce application. This integration enables precise adjustments, such as adding custom fields or changing the sequence of steps to complete the checkout process and better fit business needs.

* **Add new payment gateways** - By integrating new payment gateways within the same process as the core application, businesses can ensure faster and more reliable payment processing, leveraging existing infrastructure for a smoother implementation.

* **Modify product display logic** - In-process adjustments to product display logic enable direct manipulation of the core application's data structures and functions, allowing for real-time updates to how products are presented, which can include adding of new custom attributes or PageBuilder sections.

## Out-of-process extensibility

With out-of-process extensibility, custom code and extensions run in separate processes, often on different servers or services. This approach is increasingly popular with the rise of microservices and serverless architectures.

The advantages of this approach include:

* **Isolation** - Custom code runs independently of the core application, reducing the risk of crashing or slowing down the main site.
* **Scalability** - Out-of-process services can scale independently, allowing for better resource management and scalability.
* **Technology agnostic** - Developers can use different programming languages or frameworks for their extensions, providing greater flexibility.

However, setting up and managing out-of-process extensions can be more complex, requiring additional infrastructure and communication protocols. For example, you might have additional database requirements, Elasticsearch set up, etc.

### Use cases

The following use cases illustrate ideal candidates for out-of-process extensibility:

* Integrating with third-party services, such as Customer Relationship Management (CEM) and marketing automation.

  Running integrations as separate processes allows for seamless communication with external systems like CRM or marketing automation tools. This approach enables efficient data exchange and synchronization without impacting the core application's performance.

* Handling intensive processing tasks, such as data analysis and image processing.

  Offloading resource-intensive tasks such as data analysis or image processing to separate processes ensures these operations do not burden the main application, allowing for better scalability and performance.

* Implementing microservices for specific functionalities, such as search and product recommendations.

  Using microservices to handle specific functions like search or recommendations provides specialized, scalable solutions that can be independently developed, deployed, and maintained, improving overall system modularity and flexibility.

### Example

A typical task for most e-commerce projects is to export orders from Adobe Commerce system to an external Order Management Systems. With Adobe App Builder, you can build an out-of-process microservice to seamlessly transfer this data. (We will name this service _Order Export Service (OES)_.) This service operates independently of the core Commerce application, ensuring efficient data synchronization and reducing the load on the backend. It can leverage APIs and webhooks to facilitate real-time and batch data export, providing a robust solution for keeping the OMS system up to date with the latest order information.

The following diagram illustrates an out-of-process implementation using this service.

![Out of process example](../_images/oms1.svg)

Configure Commerce to trigger [webhooks](https://developer.adobe.com/commerce/extensibility/webhooks/) whenever a customer places an order. These webhooks send order data to the OES. You can achieve this with [Adobe I/O Events for Adobe Commerce](https://developer.adobe.com/commerce/extensibility/events/).

The OES running on App Builder has the following characteristics:

* The service exposes an API endpoint to receive order data from Commerce. This endpoint handles both real-time webhook calls and batch data transmissions.

* The service processes and transforms the incoming order data into a format compatible with the OMS system. This may involve mapping Commerce order fields to corresponding OMS fields, converting data types, and aggregating related information.

* Robust error handling mechanisms are in place to log any issues encountered during data transformation and transmission, ensuring data integrity and providing alerts for troubleshooting.

The service communicates with the OMS system via its API. It transmits order data to the OMS in real-time, depending on the configuration. The service handles API rate limits and retries in case of network or service disruptions.

## Hybrid Extensibility

Hybrid extensibility combines elements of both in-process and out-of-process approaches, leveraging the strengths of each. This method allows for more flexible and resilient extensions while maintaining the performance benefits of in-process code where necessary.

Advantages of this approach include:

* **Flexibility** - Developers can choose the best approach for each specific functionality, allowing for a more tailored solution.
* **Resilience** - Critical functionalities can be isolated to prevent cascading failures, while less critical or performance-sensitive tasks can be handled in-process.
* **Optimization** - Hybrid models can optimize performance and resource utilization by balancing in-process and out-of-process workloads.

Alternatively, management can be more difficult:

* Managing hybrid solutions requires careful coordination to ensure seamless communication and integration between in-process and out-of-process components.
* Efficiently balancing resources between in-process and out-of-process tasks is crucial to avoid bottlenecks and ensure optimal performance.

### Use Cases

The following use cases describe ideal candidates for hybrid extensibility:

* Complex integrations that require both real-time processing and asynchronous tasks.
* Scenarios where maintaining performance is critical, but isolation is also necessary for certain tasks.
* Integrations where API coverage of Adobe Commerce is not sufficient but required.

### Example

Recall the out-of-process extensibility example, where the following processes are carried out.

1. A webhook sends order information to the App Builder instance.
1. App Builder transforms the data to meet the OMS requirements.
1. App Builder sends the data to OMS.

But what if you need to request additional information from Adobe Commerce to complete the order export? For example, you are exporting an order, but the OMS also requires the customer object to be imported before it can accept the order information. In this case, your App Builder application must make an additional call to Commerce to retrieve the customer data. Perhaps the customer object has some custom metadata that is not available via the default GraphQL or REST APIs?

For this use case, you must develop an extension on the Adobe Commerce side that modifies the GraphQL response, performs some custom logic on the Adobe Commerce instance, and delivers the expected results back.

![Hybrid example](../_images/oms2.svg)

## Conclusion

Adobe Commerce's extensibility options provide robust mechanisms for customizing and enhancing e-commerce platforms. In-process extensibility offers simplicity and performance, making it ideal for direct customizations. Out-of-process extensibility provides isolation and scalability, suitable for complex integrations and intensive tasks. Hybrid extensibility offers the best of both worlds, combining flexibility and resilience.

Choosing the right extensibility method depends on the specific needs of the business, the complexity of the required customizations, and the desired performance and scalability outcomes. By leveraging these extensibility approaches, businesses can create a highly customized and efficient e-commerce platform tailored to their unique requirements.

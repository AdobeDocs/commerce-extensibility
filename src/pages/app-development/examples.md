---
title: Adobe Commerce Extensibility Examples
description: Learn how to use API Mesh, Adobe I/O Events, and App Builder to extend Adobe Commerce.
---

# Extensibility examples

There are many ways to extend [Adobe Commerce](../index.md) today, such as [APIs](https://developer.adobe.com/commerce/webapi/) and [extensions](https://developer.adobe.com/commerce/marketplace/guides/sellers/extension-create/). However, these options in isolation only encapsulate a small fraction of possibilities with extensibility. This article speculates on what is possible with new and emergent offerings and more complicated integrations to explore the boundaries of what can be created in the future.

## Understanding the components

Adobe has several new and developing technologies that can further extend the Adobe Commerce platform. Each of the following services has unique features and capabilities, which are important to understand individually before considering more complicated examples.

### Adobe Developer App Builder

[App Builder](https://developer.adobe.com/app-builder/docs/overview/) is a complete framework that allows you to build and deploy custom web applications to extend Adobe Commerce and other Adobe solutions while running on Adobe infrastructure. With [React Spectrum](https://react-spectrum.adobe.com/react-spectrum/index.html) these single-page applications (SPAs) are only limited by your React knowledge.

To learn more about App Builder, follow [this step-by-step tutorial](https://developer.adobe.com/app-builder/docs/getting_started/first_app/) on creating your first app. These instructions provide you with the foundational knowledge of what App Builder is and how it works.

### API Mesh for Adobe Developer App Builder

[API Mesh](https://developer.adobe.com/graphql-mesh-gateway/) is an Adobe service that allows you to take multiple disparate sources, such as GraphQL endpoints, REST APIs, JSON Schemas, and SOAP implementations, and combine them into a single queryable GraphQL endpoint. By creating a mesh, you can connect Adobe Commerce to App Builder, Adobe IO Gateway, and any other service that provides an accessible source. You can further customize your experience by [transforming](https://developer.adobe.com/graphql-mesh-gateway/gateway/transforms/) source data.

![API Mesh diagram](../_images/api-mesh-diagram.png)
<!-- [Link to .mmd file](../_images/api-mesh-diagram.mmd) -->

API Mesh has several features which allow for further extensibility:

- [Hooks](https://developer.adobe.com/graphql-mesh-gateway/gateway/hooks/) - Allow you to invoke composable local or remote functions, which can be used for authenticating or checking for a header before making a request.

- [Custom Resolvers](https://developer.adobe.com/graphql-mesh-gateway/gateway/extending-unified-schema/) - Allow you to upload a JavaScript resolver to your mesh that can modify the schema. In [this example](https://developer.adobe.com/graphql-mesh-gateway/gateway/extending-unified-schema/#programmatic-additionalresolvers), we show how you could use a discounts API to apply discounts to your products.

To learn more about API Mesh, follow [this walkthrough](https://developer.adobe.com/graphql-mesh-gateway/gateway/mesh_walkthrough/) where you create, query, and transform data using a sample mesh.

### Adobe I/O Events

[Adobe I/O Events for Adobe Commerce](https://developer.adobe.com/commerce/events/get-started/) allows you to create event-driven applications that take action when a shopper performs an action on a Commerce storefront, such as adding a product to a cart, clicking the Buy button, or creating an account. Commerce can now make transactional data available to applications created with Adobe App Builder.

In addition, [Conditional Events](https://developer.adobe.com/commerce/events/get-started/conditional-events/) give you the power to define rules that execute workflows when certain thresholds are met. For example, you could create a rule that sends a special coupon code for any new customer from a specified state.

## Combining extensibility components

While App Builder, API Mesh, and Adobe I/O Events provide powerful extensibility on their own, combining them allows Adobe Commerce users to maximize their extensibility. The next few sections describe possible example implementations of this type of integration.

![Integrated Commerce](../_images/integrated-commerce.png)
<!-- [Link to .mmd file](../_images/integrated-commerce.mmd) -->

### Example: Change logging

Consider a scenario where you want to create an accessible log that keeps records of specific changes to your Adobe Commerce products. You could create a conditional event that fires when a product's price is changed beyond a specified threshold. That event is consumed by your App Builder app in a mesh that combines your Adobe Commerce REST endpoint and a third-party logging API. The App Builder app could then serve the logged data through an interactive webpage.

### Example: Tracking efficiency

If you are curious about the quality and turnaround time of your shipping provider, you could trigger the process with a change of shipping status event. Then your App Builder app could use API Mesh to feed that data to a third-party shipping efficiency API, which could return the data to your single-page application for inspection.

### Example: Adding placeholder data

Consider a scenario where you want to create placeholder products, but you do not want the page to be empty and you do not want to manually create placeholder data. You could create an event that fires when a product description contains a string like `<placeholder>`. This event is consumed by your App Builder app, which uses Adobe Commerce's REST API along with a third-party placeholder data app to populate your `stage` storefront with placeholder data.

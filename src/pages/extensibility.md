---
title: Understanding extensbility
description: Learn about in-process and out-of-process offerings provided Adobe Commerce and Magento Open Source.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---

# Understanding extensibility

Extensibility, as a concept, reflects the possibility for growth and the ease of extending functionality in a system. When referring to extensibility in Adobe Commerce, we mean the ability of developers to expand, customize, and control their interactions with Adobe Commerce.

Extensibility generally has two variations, in-process extensibility and out-of-process extensibility. In the context of Adobe Commerce, in-process extensibility refers to extended functionality offerings that are located inside or alongside the Adobe Commerce monolith. Conversely, out-of-process extensibility refers to extended functionality and services that operate outside the core software.

The main benefits of out-of-process extensibility are:

- Scalability - Extensions can be scaled separately from the core software, allowing for greater efficiency.

- Isolation - An isolated environment means that developers can upgrade or modify their extensions however they want and whenever they want without relying on a core release.

- Technological Independence - Developers can choose whichever tech stacks and coding languages that fit their needs.

## In-process offerings

Adobe Commerce and Magento Open Source provide the following in-process extensibile offerings:

- Marketplace Extensions - Create and sell PHP extensions in the [Adobe Commerce Marketplace](https://commercemarketplace.adobe.com)

- [REST](https://developer.adobe.com/commerce/webapi/rest) - Use REST calls to interact with your Adobe Commerce store

- [GraphQL](https://developer.adobe.com/commerce/webapi/graphql/) - Use GraphQL requests to get customizable responses from your Adobe Commerce store

## Out-of-process offerings

Adobe Commerce offers the following out-of-process offerings:

- [Admin UI SDK](admin-ui-sdk/index.md) - Customize and enhance your admin with new pages and features for your merchants

- [API Mesh for Adobe Developer App Builder](https://developer.adobe.com/graphql-mesh-gateway/) - Coordinate and combine multiple API, GraphQL and other sources to a single, queryable GraphQL endpoint

- [Events](./events/index.md) - Use custom event triggers to interact with other extensible offerings

- [Marketplace Apps](./app-development/index.md) - Create and sell custom single-page applications on the [Adobe Commerce Marketplace](https://commercemarketplace.adobe.com)

- [Webhooks](./webhooks/index.md) - Use webhooks to automatically trigger interactions between Adobe Commerce and other extensible offerings

<InlineAlert variant="info" slots="text"/>

Out-of-process offerings are only available with Adobe Commerce and are not available with Magento Open Source.

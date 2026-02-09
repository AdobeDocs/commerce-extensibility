---
title: Services Comparison
description: Learn about the differences in services between Adobe Commerce and App Builder.
contributor_name: Comwrap Reply GmbH
contributor_link: https://www.comwrap.com/en.html
keywords:
  - App Builder
  - Extensibility
---

# Services comparison

This guide highlights key differences and benefits of using Adobe Developer App Builder services over services available within Adobe Commerce. It provides a comparison of services used in both platforms and outlines the differences in their implementation and usage.

For more comparison information, refer to:

- [Out-of-process extensibility overview](../index.md)
- [Coding convention](./app-development-comparison.md#coding-conventions)
- [Integrating third-party modules](./app-development-comparison.md#integrating-third-party-modules)

## Persistent Storage

This section compares the persistent storage solutions used in Commerce to those in App Builder.

### Commerce

**MySQL**

MySQL is a relational database management system (RDBMS) used to store and manage structured data.

<InlineAlert variant="info" slots="text"/>

Modifying the default MySQL database can cause upgrade issues. Adobe recommends using App Builder with state database for simple app-specific data or a third-party database for more complex needs.

Features:

- Supports SQL for querying data.
- ACID (Atomicity, Consistency, Isolation, Durability) compliance ensures reliable transactions.
- Schema-based structure with tables, rows, and columns.
- Powerful indexing and searching capabilities.
- Supports complex joins and relationships between tables.

Use Cases:

- Storing any data you need in persistent storage for your extension business logic.

**Redis**

Redis is an in-memory data structure store used as a database, cache, and message broker.

Features:

- Fast read and write operations.
- Supports multiple data structures like strings, hashes, lists, sets, and sorted sets.
- Persistence options to save data to disk.
- Pub/Sub messaging functionality.
- High availability and partitioning (Redis Cluster).

Use cases:

- Caching frequently accessed data.
- Session management.
- Real-time analytics and leaderboard systems.

### App builder

**App Builder State Storage**

[State Database](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/storage/application-state) is a key-value store provided by [Adobe I/O Runtime](https://developer.adobe.com/runtime/docs/guides/overview/) to store and manage stateful data.

Features:

- Simple key-value storage.
- Supports CRUD operations with APIs.
- Designed for fast read and write operations.
- Integrated with Adobe I/O Runtime, so you can use it within serverless workflows.

Use cases:

State Database allows you to store information required for operational microservices. It is ideal for storing simple, unstructured data. However, for more complex data storage needs, either App Builder Database Storage or an external databases such as MySQL are often necessary.

State Database is a straightforward and efficient way to store basic data in key-value pairs. This type of storage is highly suitable for:
  
- Configuration settings - Storing application configuration parameters.
- Session data - Maintaining session information for users.
- Cache data - Temporarily storing frequently accessed data to improve performance.
- Simple data structures - Handling simple data that does not require complex querying or relational integrity.

These features allow for quick access and retrieval of data, making it an excellent choice for scenarios where the data structure is not complex.

<InlineAlert variant="info" slots="text"/>

The [maximum TTL](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/application_state/#feature-matrix) for all Application State entities is limited to 365 days.

**App Builder Database Storage**

[Database Storage](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/storage/database) is a managed document style database service provided by [Adobe I/O Runtime](https://developer.adobe.com/runtime/docs/guides/overview/). 

Features:

- Fully managed database service with simple self-serve onboarding
- Efficient storage of collections of JSON encoded documents in binary format
- Rich and performant indexing and search capabilities
- Robust and resilient data storage backed by AWS DocumentDB
- Programming interface is a near drop-in replacement for MongoDB database driver

Use cases:

Database Storage provides convenient and robust document storage for your App Builder microservices. It is recommended when an application needs much more than a key-value store for its business logic, but the complexity and operational overhead of a relational database is not needed.

App Builder Database Storage is essential for:

- Rich query support for filtering, sorting, aggregation and pagination over potentially large collections of documents.
- Full CRUD support including atomic and bulk updates.
- Flexible and intuitive data schemas which can evolve along with the application itself without sacrificing performance.

**External Databases for Complex Solutions**

When a microservice requires more advanced data management capabilities, such as intricate querying, transactional support, or relational integrity, consider external databases. MySQL, a widely-used relational database, is a prime example of an external database that can handle these requirements.

External databases are essential for:

- Complex Queries - Running sophisticated SQL queries to retrieve data based on multiple conditions.
- Transactional Support - Ensuring data integrity and consistency through ACID (Atomicity, Consistency, Isolation, Durability) properties.
- Relational Data - Managing relationships between different types of data, which is crucial for maintaining data integrity and reducing redundancy.
- Scalability - Supporting large-scale data storage and processing needs as the application grows.

## File storage

This section compares the file storage solutions between Commerce and App Builder.

### Commerce

Commerce uses local file systems or cloud-based storage solutions to manage files.

Use cases:  

- Media management - Storing images, videos, and other multimedia files used in the e-commerce storefront.
- Product assets - Managing product-related files such as manuals, specifications, and related documents.
- Configuration files - Keeping system and application configuration files that are essential for the proper functioning of the storefront.
- Logs - Storing application log files.

For massive data flows, you can consider external storage as an option.

### App Builder

**Recommended method**

App builder uses an Adobe I/O Runtime service to store and manage files.

Features:

- Supports storing multiple file types (images, documents, and more).  
- Integrated with Adobe I/O Runtime for easy access and manipulation.
- Provides APIs for uploading, downloading, and managing files.
- Suitable for large file storage and media management.

Use cases:

- Storing media assets (images and videos).
- Managing document storage.  
- Large data exports and imports.
- Storing information that is too big for state storage.

For massive data flows, you can consider external storage as an option.

## Search and OpenSearch

This section compares the search capabilities between Adobe Commerce and App Builder.

### Commerce

- OpenSearch - Adobe Commerce utilizes OpenSearch as its primary search engine. OpenSearch is a highly scalable, open-source search and analytics engine, which is a fork of Elasticsearch and provides similar functionalities.  
- Live Search - Adobe Commerce has integrated [Live Search](https://experienceleague.adobe.com/en/docs/commerce-merchant-services/live-search/overview) as a standard feature, which provides advanced search capabilities powered by Adobe Sensei, a suite of AI and machine learning technologies. Live Search delivers more relevant and personalized search results to users, enhancing the shopping experience.
- Third-party integrations - For businesses with specific needs or preferences, Adobe Commerce supports the integration of third-party search solutions.

### App Builder

**Recommended method**

Adobe App Builder does not come with a built-in full-text search service. However, developers can integrate external search services or implement custom search functionalities using multiple tools and technologies:

Integrating OpenSearch: Developers can deploy OpenSearch as an external service and integrate it with their App Builder applications to provide robust search capabilities.

- Adobe Live Search - Live Search provides advanced search capabilities powered by Adobe Sensei, a suite of AI and machine learning technologies.  
- Adobe Experience Manager (AEM): For applications closely integrated with AEM, developers can leverage AEM's search capabilities.
- Custom Search Solutions: Implementing custom search logic using database queries, indexing techniques, and third-party search APIs.

<InlineAlert variant="info" slots="text"/>

By default, App Builder does not have an integrated search solution, you will need to integrate your own solution.

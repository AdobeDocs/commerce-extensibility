---
title: Database storage
description: 
---

# Database storage

The [Adobe I/O Files](https://github.com/adobe/aio-lib-files) and [Adobe I/O State](https://github.com/adobe/aio-lib-state) libraries provide long- and short-term storage for App Builder. The Adobe I/O State library is an npm module that provides a JavaScript abstraction on top of distributed/cloud DBs with a simple key-value store state persistence API. The Adobe I/O Files library provides a JavaScript abstraction on top of cloud blob storages with a simple filesystem-like persistence API.

The state library is meant for storing and accessing small values, while the files library should be used for storing bigger amounts of data.

## Adobe I/O State library

The Amazon Sales Channel app requires the joining of models between Adobe Commerce and Amazon Seller Partner. Functionality within Amazon Sales Channel requires updating data on both sides. Therefore, we need associations to link models to both services.

Attributes are one example where models must be linked. We defined an attribute model that could map data between Commerce and Amazon attributes. The model had the following requirements:

* **Persistence**. The system must be able to track and sync the data on both sides as users pull in the latest values.

* **Fast response times**. We were required to have reasonable load times on the frontend of the application, which could not be achieved by directly querying both resources and mapping the data on the fly.

### Pitfalls

The `lib-state` library has some very clear limitation from both practice and the public documentation. A common misconception is that this library is a replacement for a traditional RDBMS/noSQL database. Instead, it has technical capabilities which are similar to Redis or other caching services. The library [README](https://github.com/adobe/aio-lib-state) lists these limitations:

* Maximum state value size: 2MB
* Maximum state key size: 1024 bytes
* Maximum total state size: 10 GB
* Token expiry (need to re-init after expiry): 1 hour
* Non-supported characters for state keys are: '/', '\', '?', '#'

These limitations also exist:

**No ability to select or filter rows**. For example, querying for the number of cars sold between different models.

This can be avoided by maintaining an index composed of different types. Example, if you want to maintain a list of cars by their color, use an index such as this:

```js
{
  "red": ["id-1", "id-2", "id-3"],
  "blue": ["id-4"],
  "orange": ["id-5", "id-6"]
}
```

You can improve on this further by creating a key/value pair for each type. This results with faster indexing. Retrieve the IDs by type and quickly access the key/value storage to obtain the entities. The downside of this approach is the need the maintain an index.

**No ability to select or query columns or put limit on results returned**.

This can be avoided by maintaining an index of keys. Example would be a simple array of IDs related to the entity:

`const entities = ["id-1", "id-2", "id-3"];`

This will enable you to create some utility functions which would slice the list of entities into separate chunks, a limit on the number of returned items and using the page as a cursor to get the next set of results when queried. Example:

```js
export function findPage<T>(
  collection: Array<T>,
  total: number,
  currentPage: number,
  itemsPerPage: number,
): Array<T> {
  const fromSlice = (currentPage - 1) * itemsPerPage;
  let toSlice = fromSlice + itemsPerPage;

  if (toSlice > total) {
 | toSlice = total;
  }

  return collection.slice(fromSlice, toSlice);
}

export async function pageable<T>(
  ids: Array<ID>,
  repository: PageableRepository<T>,
  options: PageableOptions,
  page?: number,
): Promise<Collection<T>> {
  const { defaultPage, itemsPerPage } = options;

  const total = ids.length;
  const currentPage = page ?? defaultPage;

  const subsetIds = findPage<string>(ids, total, currentPage, itemsPerPage);

  const promises: Array<Promise<T>> = [];
  subsetIds.forEach((id: ID) => {
 | promises.push(repository.getEntity(id));
  });

  const collection: Array<T> = await Promise.all(promises);

  return {
 | total,
 | collection,
 | count: collection.length,
 | pagination: {
 |   currentPage,
 |   lastPage: Math.ceil(total / itemsPerPage),
 | },
  };
}
```

## Adobe I/O File library

Since `lib-files` uses blob storage in the Azure cloud, each user has their own segregated buckets. This is more segregated than `lib-state`, which is a shared Cosmos DB cluster.

We also found that while `lib-state` is great at read/write operations, `lib-files` is not. The file library is a great option for tasks that are not read/write heavy. Since credentials require the utmost security, it did not seem prudent to use `lib-state` for this use case as it's not multi-tenant.Therefore, reading credentials from lib-files was a better option overall.

## Model

### Account

An account is an association between an Adobe Commerce store and an Amazon Selling Partner account.

Param | Type | Description
--- | --- | ---
`id` | | string | uuid4 identifier for the account
`storeName` |string | Name of the Commerce store
`attributeId`| string | |
`countryId` | number | |
`sellerId` | string | |
`emailAddress` | string | Email address for the account
`websiteId` | number | ID of the Commerce website
`websiteName` | string | Name of the Commerce website
`status` | string |  |
`createdAt` | string | DateTime when account was created
`lastUpdatedAt` | string | DateTime when account was updated
`listingSettings` | object | Configuration for listings
`lifetimeSales` | object | Report for lifetime sales
`orderSettings` | object | Configuration for orders and order ingestion

### Attribute

Collection of an attribute with many subsets of different values e.g colour

Param | Type | Description
--- | --- | ---
`id` | string | uuid4 identifier for the Attribute
`marketplaceId` | string | Id for the Amazon marketplace the attribute
`amazonAttributeName` | string | The name of the Attribute that it maps to in Amazon
`productCatalogAttributeCode` | string | The Product catalog attribute code in Commerce
`overwriteMagentoValues` | string | Custom flag that allows Amazon values to overwrite values defined in Adobe Commerce
`status` | Boolean | Active or Inactive
`values` | AttributeValues | Key/value list of values related to the attribute

### Communication error log

Collection of communication errors when sending requests to Amazon Seller Partner API

Param | Type | Description
--- | --- | ---
`id` | string | uuid4 identifier for the account
`storeName` | string | Name of the Commerce store
`marketplaceId` | string | Id for the Amazon marketplace
`region` | CountryName | Region for the Amazon marketplace: `United States` or `Canada`
`sellerId` | string | |
`createdAt` | string | DateTime when log was created
`code` | string | Error code returned from the request
`message` | string | Error message returned from the request

### Listing changes

Collection of listing changes for a product e.g change in price or quantity

Param | Type | Description
--- | --- | ---
`id` | string | uuid4 identifier for the account
`storeName` | string | Name of the Commerce store
`marketplaceId` | string | Id for the Amazon marketplace
`region` | CountryName | Region for the Amazon marketplace. 'United States' or 'Canada'
`sellerId` | string | |
`createdAt` | string | DateTime when listing change was created
`listingAction` | string | Name of the listing action. One of `Price`, `Quantity`, or `Condition`
`sellerSku` | string | SKU for the Listing change
`comments` | string | Comments for the listing change

### Products

Collection of products

Param | Type | Description
--- | --- | ---
`id` | string | uuid4 identifier for the account
`status` | string | Product status
`price` | float | Product price
`stock` | int | Product quantity
`name` | string | Product name
`asin` | string | Amazon Standard Identification Number
`sku` | string | Product identifier
`productType` | string | |
`attributes` | Array&lt;Attribute&gt; | List of attributes for the Product

### Credentials

Credentials for communicating with the Amazon Selling Partner marketplace.

Param | Type | Description
--- | --- | ---
`sellingPartnerAppClientId` | string | Client ID for Amazon Selling Partner App
`sellingPartnerAppClientSecret` | string | Client Secret for Amazon Selling Partner App
`awsAccessKeyId` | string | AWS access key
`awsAccessKeySecret` | string | AWS access key secret
`awsSellingPartnerRole` | string | AWS Selling Partner role

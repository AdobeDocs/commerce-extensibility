---
title: Database storage
description: Learn about the decisions to use the Adobe I/O Files and Adobe I/O State libraries to store data.
---

# Database storage

Adobe Developer App Builder is a cloud native framework that has storage capabilities for both long-term and short-term storage.

The [Adobe I/O Files](https://github.com/adobe/aio-lib-files) and [Adobe I/O State](https://github.com/adobe/aio-lib-state) libraries provide zero-config file and state caching for App Builder. The Adobe I/O State library is an npm module that provides a JavaScript abstraction on top of distributed/cloud databases with a simple key-value store state persistence API. The Adobe I/O Files library provides a JavaScript abstraction on top of cloud blob storage with a simple file-system like persistence API. Use the state library for storing and accessing small values and the files library for storing larger amounts of data.

## Adobe I/O State library

Implementing the Adobe I/O State library has its benefits and limitations.

### Benefits

The Amazon Sales Channel app requires joining the Adobe Commerce and Amazon Seller Partner models. Functionality within Amazon Sales Channel requires updating data on both sides. Therefore, it is essential to link models to both services.

Attributes are one example where models must be linked. The development team defined an attribute model that could map data between Commerce and Amazon attributes. The model had the following requirements:

* **Persistence**. The system must be able to track and sync the data on both sides as users pull in the latest values.

* **Fast response times**. Reasonable load times on the frontend of the application are a requirement. These could not be achieved by directly querying both resources and mapping the data on the fly.

The throttling controls of Amazon's Selling Partner APIs significantly impact application performance. The development team attempted workarounds such as increasing period for repeated calls and investigating Amazon's webhooks functionality. However, the best technical solution was to leverage App Builder's storage capabilities.

### Limitations

The `lib-state` library has clear limitations both in practice and from the public documentation. A common misconception is that this library is a replacement for a traditional RDBMS/noSQL database. Instead, it has technical capabilities that are similar to Redis or other caching services. The library [README](https://github.com/adobe/aio-lib-state) lists these limitations:

* Maximum state value size: 2MB
* Maximum state key size: 1024 bytes
* Maximum total state size: 10 GB
* Token expiry (need to re-init after expiry): 1 hour
* Non-supported characters for state keys are: '/', '\', '?', '#'

These additional limitations should also be considered:

**No ability to select or filter rows**. For example, querying for the number of cars sold between different models.

This limitation can be avoided by maintaining an index composed of different types. For example, if you want to maintain a list of cars by their color, use an index like the following:

```js
{
  "red": ["id-1", "id-2", "id-3"],
  "blue": ["id-4"],
  "orange": ["id-5", "id-6"]
}
```

You can further improve this by creating a key/value pair for each type. This results with faster indexing. Retrieve the IDs by type and quickly access the key/value storage to obtain the entities. The downside of this approach is the need to maintain an index.

**No ability to select or query columns or put limit on results returned**.

This limitation can be avoided by maintaining an index of keys. For example, consider a simple array of IDs related to the entity:

`const entities = ["id-1", "id-2", "id-3"];`

Using an index of keys enables you to create utility functions that would divide the list of entities into separate chunks. This practice limits the number of returned items and uses the page as a cursor to get the next set of results when queried. For example:

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
    promises.push(repository.getEntity(id));
  });

  const collection: Array<T> = await Promise.all(promises);

  return {
    total,
    collection,
    count: collection.length,
    pagination: {
      currentPage,
      lastPage: Math.ceil(total / itemsPerPage),
    },
  };
}
```

## Adobe I/O File library

Consider the following benefits and limitations when using the Adobe I/O File library.

### Benefits

Since `lib-files` uses blob storage in the Azure cloud, each user has their own segregated buckets. This is more segregated than `lib-state`, which is a shared Cosmos DB cluster.

The development team also found that while `lib-state` is great at read/write operations, `lib-files` is not. The file library is a great option for tasks that are not read/write heavy. Since credentials require the utmost security, it did not seem prudent to use `lib-state` for this use case as it's not multi-tenant.Therefore, reading credentials from `lib-files` was a better option overall.

### Limitations

The `lib-files` library has some limitations from both in practice and from the public documentation. Its closest comparison is Amazon S3 storage.

* Read/write operations are not suitable for a high throughput layer. If you need to run a large number of operations, it can take roughly 10 to 20 seconds to return sizable results.

* The development team ran into errors when trying to run an asynchronous version. Additionally, there were issues with simultaneously reading and writing file storage.

* Developers must distinguish between public and non-public folders when modifying bucket permissions.

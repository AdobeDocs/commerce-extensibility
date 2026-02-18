---
title: Database storage
description: Learn about the decisions to use the Adobe I/O State, Adobe I/O Files, and Adobe I/O Database libraries to store data.
keywords:
  - App Builder
  - Extensibility
---

# Database storage

<InlineAlert variant="info" slots="text" />

This topic references the Amazon Sales Channel reference app, which is no longer available. However, the methods described in this topic can be applied to any App Builder application that requires storage.

Adobe Developer App Builder is a cloud native framework that has storage capabilities for both long-term and short-term storage.

The [Adobe I/O Files](https://github.com/adobe/aio-lib-files), [Adobe I/O State](https://github.com/adobe/aio-lib-state), and [Adobe I/O Database](https://github.com/adobe/aio-lib-db) libraries provide managed storage solutions for App Builder applications.

* **Adobe I/O State (`aio-lib-state`)**: An npm module offering a JavaScript abstraction over distributed/cloud databases with a simple key-value store API for state persistence.
* **Adobe I/O Files (`aio-lib-files`)**: A JavaScript abstraction over cloud blob storage, providing a file-system-like API for managing files.
* **Adobe I/O Database (`aio-lib-db`)**: A JavaScript abstraction over a document-style database backed by AWS DocumentDB, with an API modeled after the MongoDB database driver.

## Adobe I/O State library

Implementing the Adobe I/O State library has its benefits and limitations.

### Benefits

The Amazon Sales Channel app requires joining the Adobe Commerce and Amazon Seller Partner models. Functionality within Amazon Sales Channel requires updating data on both sides. Therefore, it is essential to link models to both services.

Attributes are one example where models must be linked. The development team defined an attribute model that could map data between Commerce and Amazon attributes. The model had the following requirements:

* **Persistence**. The system must be able to track and sync the data on both sides as users pull in the latest values.

* **Fast response times**. Reasonable load times on the frontend of the application are a requirement. These could not be achieved by directly querying both resources and mapping the data on the fly.

The throttling controls of Amazon's Selling Partner APIs significantly impact application performance. The development team attempted workarounds such as increasing period for repeated calls and investigating Amazon's webhooks functionality. However, the best technical solution was to leverage App Builder's storage capabilities.

### Limitations

The `aio-lib-state` library has clear limitations both in practice and from the public documentation. A common misconception is that this library is a replacement for a traditional RDBMS/noSQL database. Instead, it has technical capabilities that are similar to Redis or other caching services. The library [README](https://github.com/adobe/aio-lib-state) lists these limitations:

* The namespace must be in the valid AppBuilder format: `amsorg-project(-workspace)`
* Maximum state value size: 1MB
* Maximum state key size: 1024 bytes
* Alphanumeric characters are supported as well as `-` (dash), `_` (underbar), and `.` (period)
* The default TTL value is one day. The maximum is 365 days.

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

Since `aio-lib-files` uses blob storage in the Azure cloud, each user has their own segregated buckets. This is more segregated than `aio-lib-state`, which is a shared Cosmos DB cluster.

The development team also found that while `aio-lib-state` is great at read/write operations, `aio-lib-files` is not. The file library is a great option for tasks that are not read/write heavy. Since credentials require the utmost security, it did not seem prudent to use `aio-lib-state` for this use case as it's not multi-tenant.Therefore, reading credentials from `aio-lib-files` was a better option overall.

### Limitations

The `aio-lib-files` library has some limitations from both in practice and from the public documentation. Its closest comparison is Amazon S3 storage.

* Read/write operations are not suitable for a high throughput layer. If you need to run a large number of operations, it can take roughly 10 to 20 seconds to return sizable results.

* The development team ran into errors when trying to run an asynchronous version. Additionally, there were issues with simultaneously reading and writing file storage.

* Developers must distinguish between public and non-public folders when modifying bucket permissions.

## Adobe I/O Database library

Consider the following benefits and limitations when using the Adobe I/O Database library.

### Benefits

This is the newest addition to the App Builder Storage family. While `aio-lib-state` continues to be the best choice for storing key-value pairs for caching or state management, `aio-lib-db` provides full-fledged document style database storage. Its API is intended to be a near drop-in replacement for the [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/current/).

In reference to the Amazon Sales Channel reference app described elsewhere, the developers would more than likely use `aio-lib-db` if it had been available at the time. It overcomes many of the limitations of `aio-lib-state` that required some complicated workarounds.

`aio-lib-db` offers full CRUD support, and includes additional methods like `findOneAndUpdate` that can update a document and then return it in one operation:

```javascript
const updatedUser = await collection.findOneAndUpdate(
  {email: 'john@example.com'},
  {$set: {lastLogin: new Date()}},
  {returnDocument: 'after'}
)
```

The `bulkWrite` method allows you to execute multiple operations with a single call:

```javascript
const operations = [
  {insertOne: {document: {name: 'Alice'}}},
  {updateOne: {filter: {name: 'Bob'}, update: {$set: {age: 30}}}},
  {deleteOne: {filter: {name: 'Charlie'}}}
]
const result = await collection.bulkWrite(operations)
```

`aio-lib-db` also has extensive querying options including  `sort`, `skip` and `limit` that make pagination easy to implement. As a simple example, the following returns engineers that live in Austin ordered by data of birth:

```javascript
const collection = await persons.find({vocation: "ENGINEER", "address.city": "Austin"})
  .sort({dateofbirth: -1})
  .skip(0)
  .limit(3)
  .project({_id: 0, firstname: 1, lastname: 1, dateofbirth: 1})
```

To get the next "page" of engineers, the `skip` option just needs to be bumped up:

```javascript
const collection = await persons.find({vocation: "ENGINEER", "address.city": "Austin"})
  .sort({dateofbirth: -1})
  .skip(3)
  .limit(3)
  .project({_id: 0, firstname: 1, lastname: 1, dateofbirth: 1})
```

The `aggregate` method can do most everything `find` can do (including `sort`, `skip` and `limit`) and much more. As a sample of what is possible, the following transforms a simple collection of orders into a summary of order values grouped by customer within a given year:

```javascript
    const pipeline = []
    // match orders in a given year
    pipeline.push({
      $match: {
        orderdate: {
          $gte: new Date('2020-01-01T00:00:00Z'),
          $lt: new Date('2021-01-01T00:00:00Z'),
        },
      },
    });
    // sort by order date
    pipeline.push({
      $sort: {
        orderdate: 1,
      },
    });
    // group by customer_id
    pipeline.push({
      $group: {
        _id: '$customer_id',
        // get the date of their first order
        first_purchase_date: {$first: '$orderdate'},
        // calculate the total value and count of their orders
        total_value: {$sum: '$value'},
        total_orders: {$sum: 1},
        orders: {
          // compile a summary list of the customer's orders
          $push: {
            orderdate: '$orderdate',
            value: '$value',
          },
        },
      },
    });
    // sort the whole thing by first order date
    pipeline.push({
      $sort: {
        first_purchase_date: 1,
      },
    })
    const collection = await orders.aggregate(pipeline)
```

The result will look something like this:

```json
[
  {
    "_id": "elise_smith@myemail.com",
    "first_purchase_date": "2020-01-13T09:32:07.000Z",
    "total_value": 436,
    "total_orders": 4,
    "orders": [
      {
        "orderdate": "2020-01-13T09:32:07.000Z",
        "value": 99
      },
      {
        "orderdate": "2020-05-30T08:35:52.000Z",
        "value": 231
      },
      {
        "orderdate": "2020-10-03T13:49:44.000Z",
        "value": 102
      },
      {
        "orderdate": "2020-12-26T08:55:46.000Z",
        "value": 4
      }
    ]
  },
  {
    "_id": "tj@wheresmyemail.com",
    "first_purchase_date": "2020-08-18T23:04:48.000Z",
    "total_value": 191,
    "total_orders": 2,
    "orders": [
      {
        "orderdate": "2020-08-18T23:04:48.000Z",
        "value": 4
      },
      {
        "orderdate": "2020-11-23T22:56:53.000Z",
        "value": 187
      }
    ]
  }
]
```

The above example is adapted from MongoDB's [Complete Aggregation Pipeline Tutorials](https://www.mongodb.com/docs/manual/tutorial/aggregation-complete-examples/). With only a few exceptions (for example, the `$set` and `$unset` stages are not supported) the examples there are valid for App Builder Database Storage.

Lastly, `aio-lib-db` supports a variety of indexes that can greatly improve query performance on even very large collections, including single field indexes, compound indexes (multiple fields), multikey indexes (for indexing arrays), text indexes (including case-insensitive) and 2dsphere for geolocation searches.

### Limitations

Databases provided by App Builder Database Storage are always provisioned and used within one specific AIO Project Workspace in one specific region, and are completely isolated from all other databases. Data from one database cannot be directly transferred from one to another, even within the same IMS Organization and/or Project. A bulk data export and import feature is expected to be developed in the near future but is not yet available.

Databases provided by App Builder Database Storage are completely independent of Adobe Commerce relational databases. In the same way that App Builder applications do not have access to an Adobe Commerce database, Adobe Commerce does not have access to an App Builder database. Migrating custom tables from Adobe Commerce to App Builder requires not only recreating them as collections in App Builder Database Storage but also reimplementing the commerce functionality as an App Builder microservice application.

Although quite powerful, App Builder Database Storage, as a document style database, is not intended as a replacement for relational databases. When an application requires complex and highly structured database storage with formal schemas and extended transactional support, connecting to an external relational database may be the best choice.

App Builder Database Storage, as a hosted service, does not provide direct access to the underlying AWS DocumentDB service. This is done both for the sake of security (it is a multi-tenant service and Adobe must control access to the underlying infrastructure) and for the sake of convenience (there is no need for developers to provision or maintain that infrastructure). As a result, developers do not have as much low level control over their databases in order to leverage advanced features such as sharding and other potential optimizations, but we are confident that in most cases that should not be necessary.

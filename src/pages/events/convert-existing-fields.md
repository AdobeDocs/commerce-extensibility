---
title: Convert payload field values
description: Learn how to convert a field value based on a condition
keywords:
  - Events
  - Extensibility
---

# Convert payload field values

Your custom module might generate data that would be useful to insert into an existing Commerce event. Converters allow you to enrich the data contained in an event before it is transmitted to the eventing service. 

<InlineAlert variant="info" slots="text"/>

You must configure a module's `io_events.xml` or root `app/etc/io_events.xml` file to update the required fields. You can also declare them in the system `config.php` file or add them using the CLI while subsrcibing to an event.

## Command line

The `bin/magento events:subscribe <event_code> --force --fields=<name1> --fields='{"<name>":"<name2>", "converter":"<path\to\converterclass>"}'  --fields='{"<name>":"<name3>", "converter":"<path\to\converterclass>"}'` command creates and registers custom and native Commerce events.

## CLI Example
`bin/magento events:subscribe observer.catalog_category_save_after --fields="name" --fields='{"name":"store_id", "converter": "Magento\AdobeCommerceEventsClient\Event\TestConverterStoreid"}'`

## Configure the `io_events.xml` file

The `converter` attribute defines the converter class that updates the event data field value for the specified event. Only one converter class can be used per field

Attribute | Required | Description
--- | --- | ---
`converter` | No | The fully-qualified class name.


The following example will update the value of the field `name` present in the `observer.catalog_category_save_after` event payload using the converter class `TestConverterName`.

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module-commerce-events-client/etc/io_events.xsd">
    <event name="observer.catalog_category_save_after" >
        <fields>
            <field name="name" converter="Magento\AdobeCommerceEventsClient\Event\TestConverterName"/>
            <field name="store_id"/>
            <field name="is_active"/>
        </fields>
    </event>
</config>
```

The event payload will be similar to the following without converter:

```json
{
    "value": {
       "name": "Men",
       "store_id": "2",
       "is_active": "1"
       
  }
}
```
The event payload will be similar to the following with converter:

```json
{
    "value": {
       "name": "Test Name",
       "store_id": "2",
       "is_active": "1"
       
  }
}
```
## Converter definition

The converter class must implement `FieldConverterInterface`. This interface contains the `convert` method, which accepts the following arguments. It returns a mixed type.

`public function convert(mixed $value, Event $event): mixed`

In the following example, the `TestConverterName` converter class updates the value of the `name` field in the `eventData` array.

In the provided code excerpt, the initial value of the `name` field was `Men` and after applying the converter, the updated value is now `Test Name`
```php
<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
declare(strict_types=1);

namespace Magento\AdobeCommerceEventsClient\Event;

use Magento\AdobeCommerceEventsClient\Event\Filter\FieldConverterInterface;

class TestConverterName implements FieldConverterInterface
{
    /**
     * Method used to convert field value
     *
     * @param mixed $value
     * @return mixed
     */
    public function convert(mixed $value, Event $event): mixed
    {
        return 'Test Name';
    }
}
```

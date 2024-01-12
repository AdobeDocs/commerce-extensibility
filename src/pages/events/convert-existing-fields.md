---
title: Convert payload field values
description: Learn how to convert a field value based on a condition
keywords:
  - Events
  - Extensibility
---

# Convert payload field values

The event payload might include field values that are not easily interpretable for third-party implementations. Building the implementation solely based on identifiers can be challenging. To address this issue, a converter can be implemented, allowing customization for each field in the payload.

## Converter definition

The converter class must implement `FieldConverterInterface`. This interface contains the `convert` method, which accepts the following arguments. It returns a mixed data type.

`public function convert(mixed $value, Event $event): mixed`

## Configure

You must configure a module's `io_events.xml` or root `app/etc/io_events.xml` file to update the required
 fields. You can also declare them in the system `config.php` file or add them using the CLI while subsrcibing to an event.

### Command line 

The `bin/magento events:subscribe <event_code> --force --fields=<name1> --fields='{"<name>":"<name2>", "converter":"<path\to\converterclass>"}'  --fields='{"<name>":"<name3>", "converter":"<path\to\converterclass>"}'` command creates and registers custom and native Commerce events.

   ```bash
   bin/magento events:subscribe observer.catalog_category_save_after --fields="name" --fields='{"name":"store_id", "converter": "Magento\AdobeCommerceEventsClient\Event\TestConverterStoreid"}'`
   ```

### Configure the `io_events.xml` file

The `converter` attribute defines the converter class that updates the event data field value for the specified event. Only one converter class can be used per field

Attribute | Required | Description
--- | --- | ---
`converter` | No | The fully-qualified class name.

The following example updates the value of the field `store_id` present in the `observer.catalog_category_save_after` event payload using the `TestConverterStoreid` converter class.

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module-commerce-events-client/etc/io_events.xsd">
    <event name="observer.catalog_category_save_after" >
        <fields>
            <field name="name" />
            <field name="store_id"converter="Magento\AdobeCommerceEventsClient\Event\TestConverterStoreid"/>
            <field name="is_active"/>
        </fields>
    </event>
</config>
```

The default event payload is similar to the following:

```json
{
    "value": {
       "name": "Men",
       "store_id": "2",
       "is_active": "1"
  }
}
```

The value of the `field` changes after the conversion:

```json
{
    "value": {
       "name": "Men",
       "store_id": "4",
       "is_active": "1"
  }
}
```

In the following example, the `TestConverterStoreid` converter class updates the value of the `store_id` field in the `eventData` array to `4`. In the sample payload above, this value was `2`.

```php
<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
declare(strict_types=1);

namespace Magento\AdobeCommerceEventsClient\Event;

use Magento\AdobeCommerceEventsClient\Event\Filter\FieldConverterInterface;

class TestConverterStoreid implements FieldConverterInterface
{
    /**
     * Method used to convert field value
     *
     * @param mixed $value
     * @return mixed
     */
    public function convert(mixed $value, Event $event): mixed
    {
        return 4;
    }
}
```
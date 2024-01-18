---
title: Convert payload field values
description: Learn how to convert a field value based on a condition
keywords:
  - Events
  - Extensibility
---

# Convert payload field values

The payload of an event often includes field values that are not easily interpretable for third-party implementations. For example, a value might be stored in the Commerce database as an integer, but the external system stores the same information as a string. Alternatively, instead of transforming data types, you might want to change a Commerce-supplied string to a string defined in the external system. To address this issue, you can implement a converter, enabling custom values for any field in the payload.

## Converter definition

Your converter class must implement `FieldConverterInterface`. This interface contains the `convert` method, which accepts `mixed` and `Event` arguments following arguments. The method returns a `mixed` data type. Individual converter classes must be created for each field when aiming to convert multiple fields within a payload. Conversely, the same class can be reused to replace a specific field across multiple events.

```php
interface FieldConverterInterface
{
    /**
     * Converts a field value
     *
     * @param mixed $value
     * @param Event $event
     * @return mixed
     */
    public function convert(mixed $value, Event $event);
}
```

As an example, the `observer.catalog_product_save_after` event contains a top-level `visibility` field, which must contain an integer value. You want to convert these values to strings that match values on the external system. The following table describes these values.

Commerce value | Converted value | Description
--- | --- | ---
1 | NOT_VISIBLE_INDIVIDUALLY | This product should not be displayed if it is part of a configurable product.
2 | CATALOG_ONLY | This product appears in catalog listings, but not in searches.
3 | SEARCH_ONLY | This product appears in searches, but not catalog listings.
4 | CATALOG_AND_SEARCH | This product appears in catalog listings and searches. For most products, this is the default.

In the following example, the `TestConverterVisibility` converter class updates the value of the `visibility` field to a string.

```php
<?php
/**
 * Copyright &copy; Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
declare(strict_types=1);

namespace Magento\AdobeCommerceEventsClient\Event;

use Magento\AdobeCommerceEventsClient\Event\Filter\FieldConverterInterface;

class TestConverterVisibility implements FieldConverterInterface
{
    /**
     * Method used to convert field value
     *
     * @param mixed $value
     * @return mixed
     */
    public function convert(mixed $value, Event $event): mixed
    {
        return match ($value) {
            '1' => 'NOT_VISIBLE_INDIVIDUALLY',
            '2' => 'CATALOG_ONLY',
            '3' => 'SEARCH_ONLY',
            '4' => 'CATALOG_AND_SEARCH'
        };
    }
}
```

The default payload for this event includes the following:

```json
{
   "event":{
      "data":{
         "value":{
            "visibility":"4",
        }
      }
   }
}
```

The converter changes the payload to:

```json
{
   "event":{
      "data":{
         "value":{
            "visibility":"CATALOG_AND_SEARCH",
        }
      }
   }
}
```

## Register the converter

You must configure a module's `io_events.xml` or root `app/etc/io_events.xml` file to update the required fields. You can also declare them in the system `config.php` file or add them using the CLI while subscribing to an event.

### Command line

The [`bin/magento events:subscribe --fields` command](commands.md#subscribe-to-an-event) defines the fields and converters to include in the payload of a subscribed event. The example command adds the `visibility` field and provides the path to the converter class. You can specify multiple fields in the same request.

```bash
bin/magento events:subscribe observer.catalog_product_save_after --fields="store_id" --fields='{"name":"visibility", "converter": "Magento\AdobeCommerceEventsClient\Event\TestConverterVisibility"}'`
```

### `config.php` file

The following example `config.php` is the equivalent of the example `bin/magento events:subscribe` command in the **Command line** example above.

```php
'io_events' => [
        'observer.catalog_product_save_after' => [
            'fields' => [
                'store_id',
                [
                    'name' => 'visibility',
                    'converter' => 'Magento\\AdobeCommerceEventsClient\\Event\\TestConverterVisibility'
                ]
            ],
            'enabled' => 1
        ]
 ]       
```

### Configure an `io_events.xml` file

The `converter` attribute defines the converter class that updates the event data field value for the specified event. Only one converter class can be used per field

Attribute | Required | Description
--- | --- | ---
`converter` | No | The fully-qualified class name.

The following example updates the value of the field `visibility` present in the `observer.catalog_product_save_after` event payload using the `TestConverterVisibility` converter class.

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module-commerce-events-client/etc/io_events.xsd">
    <event name="observer.catalog_product_save_after" >
        <fields>
            <field name="visibility" converter="Magento\AdobeCommerceEventsClient\Event\TestConverterVisibility"/>
        </fields>
    </event>
</config>
```

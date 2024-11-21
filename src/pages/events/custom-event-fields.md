---
title: Add custom fields to an event
description: Learn how to add custom fields to an event.
keywords:
  - Events
  - Extensibility
---

# Add custom fields to an event

Your custom module might generate data that would be useful to insert into an existing Commerce event. Processors allow you to enrich the data contained in an event before it is transmitted to the eventing service. You can optionally assign a priority to each processor. The priority is important in cases when changes from one processor can affect the logic of another processor, or when processors add a new element with the same key.

<InlineAlert variant="info" slots="text"/>

You must configure a module's `io_events.xml` or root `app/etc/io_events.xml` file to add custom fields. You cannot declare them in the system `config.php` file or add them using the CLI.

## Configure the `io_events.xml` file

The `<processors>` element defines the processors that inject custom data into the specified event. This element contains one or more `<processor>` elements, which can contain the following attributes:

Attribute | Required | Description
--- | --- | ---
`class` | Yes | The fully-qualified class name.
`priority` | No | An integer indicating the order in which multiple processors are executed. The system executes unprioritized processors first, in the order listed. All processors with defined priority values are executed in numerical order, from lowest to highest.

The following example adds the `order_status`, `order_id`, and `order_details` fields to the `observer.sales_order_save_after` event payload. The assigned `priority` values indicate the processors will be executed in the following order:

1. TestProcessorOrderStatus
1. TestProcessorOrderDetails
1. TestProcessorOrderId

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module-commerce-events-client/etc/io_events.xsd">
    <event name="observer.sales_order_save_after">
        <fields>
            <field name="entity_id" />
            <field name="base_currency_code" />
            <field name="shipping_method" />
        </fields>
        <processors>
            <processor class="Magento\AdobeCommerceEventsClient\Event\TestProcessorOrderStatus" priority="10"/>
            <processor class="Magento\AdobeCommerceEventsClient\Event\TestProcessorOrderId" priority="30"/>
            <processor class="Magento\AdobeCommerceEventsClient\Event\TestProcessorOrderDetails" priority="20"/>
        </processors>
    </event>
</config>
```

The event payload will be similar to the following:

```json
{
    "value": {
       "entity_id": "3",
       "base_currency_code": "USD",
       "shipping_method": "tablerate_bestway",
       "order_status": "1", 
       "order_details": "test details",
       "order_id": "3"
  }
}
```

## Processor definitions

The processor class must implement `EventDataProcessorInterface`. This interface contains the `process` method, which accepts the following arguments. It returns an array.

`public function process(Event $event, array $eventData): array`

You must create a separate class for each field to be added.

In the following example, the `TestProcessorOrderStatus` class adds the `order_status` field and a value to the `eventData` array.

```php
<?php
/**
 * Copyright Adobe
 * All rights reserved.
 */
declare(strict_types=1);
​
namespace Magento\AdobeCommerceEventsClient\Event;
​
use Magento\AdobeCommerceEventsClient\Event\Processor\EventDataProcessorInterface;
​
class TestProcessorOrderStatus implements EventDataProcessorInterface
{
    public function process(Event $event, array $eventData): array
    {
        $eventData['order_status'] = 1;
        return $eventData;
    }
}
```

---
title: Create conditional webhooks
description: Create conditional webhooks.
keywords:
  - Webhooks
  - Extensibility
---

# Create conditional webhooks

You may decide that you want to trigger webhooks only if the webhooks payload meets the required conditions. For example, you want to calculate taxes in 3rd party service only for specific zip codes, in such case there is no value in triggering webhook for other zip codes. 

A conditional webhooks can significantly reduce the amount of API calls which reduces the waiting time for clients.

Conditional webhooks can have one or more rules.

Each rule contains the following:

*  A field for which the rule is applied. For the nested field use dot-separated format. For example: `data.order.product.id`

*  An operator, which is represented as a comparison statement between the value supplied in the webhook payload and the threshold value.

   The operator must be one of the following:

   | Operator      | Description                                                                                                                                                                     |
   |---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| ----------- |
   | `greaterThan` | Checks whether the value supplied in the payload of the webhook is greater than a specified value. Applicable for integer and float data types.                                 |
   | `lessThan`    | Checks whether the payload value is less than a specified value. Applicable for integer and float data types.                                                                   |
   | `equal`       | Checks whether the payload value matches the specified value. For Boolean data types, use `1` to compare to `true` and `0` to compare to `false`.                               |
   | `notEqual`    | Checks whether the payload value do not match the specified value. Inversion for `equal` operation                                                                              |
   | `regex`       | A regular expression that checks for matches. The specified value must be compatible with the [regular expression match](https://www.php.net/manual/en/function.preg-match.php) |
   | `in`          | Checks whether the payload value is one of multiple specified values. The value must be a comma-separated list. You do not need to provide additional escape characters.        |
   | `isEmpty`     | Checks whether the payload value is empty.                                                                                                                                      |
   | `notEmpty`    | Checks whether the payload value is not empty. Inversion for `isEmpty` operation.                                                                                               |


*  The value to compare against. When you assign the `regex` operator, you must delimit the regular expression value with valid characters, such as forward slashes (/). For example, `/^TV .*/i`, which checks whether the string starts with the string `TV`, ignoring the case of the letters.

## Define conditional webhooks in `webhooks.xml`

The following example creates and registers a conditional webhooks for the event `plugin.magento.tax.api.tax_calculation.calculate_tax`. The webhook will be only triggered when all of the conditions are true:

*  The value of `.quoteDetails.shipping_address.country_id` must be equal to `US`
*  The `quoteDetails.billing_address.postcode` must begin with `123`

```xml
<method name="plugin.magento.tax.api.tax_calculation.calculate_tax" type="after">
   <hooks>
      <batch>
         <hook name="update_order" url="{env:APP_URL}/calculate-taxes" method="POST" timeout="5000" softTimeout="1000" priority="300" required="false" fallbackErrorMessage="The taxes can not be calculated">
            <fields>
               <field name="quoteDetails" />
               <field name="storeId" />
            </fields>
            <rules>
               <rule field="quoteDetails.shipping_address.country_id" operator="equal" value="US" />
               <rule field="quoteDetails.billing_address.postcode" operator="regex" value="/^123/" />
            </rules>
         </hook>
      </batch>
   </hooks>
</method>
```

In the next example, we want to generate a product description when we save a product by 3rd party service, but we don't want to send a webhook if the description is already set.

The webhook will be triggered only if the product short description is empty, the webhook will return the operation with information to update the product short description and the webhook won't be triggered again for the same product.

```xml
       <method name="observer.catalog_product_save_before" type="before">
       <hooks>
           <batch>
               <hook name="generate_description" url="{env:APP_URL}/generate-product-description" timeout="5000" softTimeout="1000" priority="300" required="true" fallbackErrorMessage="The product could not be updated">
                   <fields>
                       <field name="product.name" source="data.product.name" />
                       <field name="product.category_ids" source="data.product.category_ids" />
                       <field name="product.sku" source="data.product.sku" />
                   </fields>
                   <rules>
                       <rule field="product.short_description" operation="isEmpty" />
                   </rules>
               </hook>
           </batch>
       </hooks>
   </method>
```

## Command line

You can use the `bin/magento webhooks:list` command to display the contents of your subscribed webhooks with rules information.

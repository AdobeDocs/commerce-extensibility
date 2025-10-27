You may decide that you want Adobe I/O Events for Adobe Commerce to notify the client application when certain conditions occur. For example, by default, if you register an event that tracks the remaining quantity of a product, the eventing service sends that information to your client application each time Commerce emits the event. However, you might be interested in the remaining quantity only when it reaches a specific threshold, such as 20 units. Conditional events allow you to define exactly when to send events to your application. Otherwise, the client application must include code to filter out the unimportant and unnecessary data.

A conditional event acts as an extension of a custom or native Commerce event. You must specify the source, or parent, event and define one or more rules that evaluate the data that is present in the parent event payload. If all the individual rules defined in a conditional event evaluate as true, then the eventing service sends the conditional event to the application. If one or more rules evaluate as false, the service sends neither the parent event nor the conditional event, unless the parent has been subscribed separately, without any rules.

All conditional events contain the following information:

*  A unique name for the conditional event.

*  The name of the parent event. You must attach a conditional event to a specific registered event.

*  One or more rules.

Each rule contains the following:

*  A field that is defined in the parent event.

*  An operator, which is represented as a comparison statement between the value supplied in the parent event's payload and the threshold value.

   The operator must be one of the following:

   | Operator      | Description |
   | -----------   | ----------- |
   | `greaterThan` | Checks whether the value supplied in the payload of the event is greater than a specified value. Applicable for integer and float data types. |
   | `lessThan`    | Checks whether the payload value is less than a specified value. Applicable for integer and float data types. |
   | `equal`       | Checks whether the payload value matches the specified value. For Boolean data types, use `1` to compare to `true` and `0` to compare to `false`. |
   | `regex`       | A regular expression that checks for matches. The specified value must be compatible with the [regular expression match](https://www.php.net/manual/en/function.preg-match.php). |
   | `in`          | Checks whether the payload value is one of multiple specified values. The value must be a comma-separated list. You do not need to provide additional escape characters. |
   | `onChange`    | Checks whether the provided field's value has changed compared to its previous value. The value attribute is optional. If provided, the operator checks whether the field's new value is equal to the specified value field. |

*  The value to compare against. When you assign the `regex` operator, you must delimit the regular expression value with valid characters, such as forward slashes (/). For example, `/^TV .*/i`, which checks whether the string starts with the string `TV`, ignoring the case of the letters.
*  Tha value in the `onChange` operator is a path to a field to compare against. By default, comparison is done against `field` and `_origData.field` values. In cases the event payload has a different structure, you can provide a custom path to compare against.
